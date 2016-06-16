"use strict";
var Vue = require('vue');
var moment = require("moment");
(function () {
    var vueIf = Vue.directive('if');
    var oldInsert = vueIf.insert;
    vueIf.insert = function () {
        oldInsert.apply(this);
        $ && $.parser && this.vm && $.parser.parse(this.vm.$el);
    };
})();
Vue.mixin({
    created: function () {
        //console.log('mixin hook created called')
    },
    compiled: function () {
        if ($ && $.parser) {
            $.parser.parse(this.$el);
        }
    },
    attached: function () {
        //console.log("attached");
    },
    dettached: function () {
        //console.log("dettached");
    },
    destroy: function () {
        //console.log("called destroyed");
    }
});
//e.g.
// new Vue({
//       el:'#app',
//       data:{
//         selected:1,
//         items:[{ value:0,text:"default" },
//         {value:1, text:"value1" },
//         {value:2, text:"value2" }]
//       },
//       template:`<div><select v-ez-model="selected" :options="{editable: false,panelHeight: 42}">
//           <option v-for="item in items" :value="item.value">{{item.text}}</option>
//         </select>  <p>selected:{{selected|json}}</p></div>`
Vue.directive('ez-model', {
    twoWay: true,
    priority: 1000,
    isFirstCall: true,
    params: ['options'],
    ezClass: "",
    bind: function () {
        var self = this;
        var $el = $(self.el);
        var options = this.params.options || {};
        var oldOnChange = options.onChange;
        options.onChange = function (newVal, oldVal) {
            if (oldOnChange)
                oldOnChange.apply(this, arguments);
            self.set(newVal);
        };
        this.ezClass = (function () {
            var cls = $el.attr('class').split(/\s+/).find(function (it) { return it.indexOf("easyui-") === 0; });
            return cls.split('-').slice(1).join('-');
        })();
        //console.log({ezClass:this.ezClass});
        $el[this.ezClass](options);
    },
    update: function (value) {
        var _this = this;
        var self = this;
        var $el = $(self.el);
        var trySetValue = function () {
            var isMultipleValues = !!$el[_this.ezClass]("options").multiple;
            var setValMethod = isMultipleValues ? "setValues" : "setValue";
            if (self.ezClass === "calendar") {
                setValMethod = "moveTo";
            }
            try {
                if (self.ezClass === "datebox") {
                    value = value && moment(value).format('M/D/Y');
                }
                else if (self.ezClass === "datetimebox") {
                    value = value && moment(value).format('M/D/Y HH:mm:ss');
                }
                $el[_this.ezClass](setValMethod, value);
            }
            catch (error) {
                console.error(error);
            }
        };
        if (this.isFirstCall) {
            this.isFirstCall = false;
            setTimeout(function () {
                trySetValue();
            });
        }
        else {
            trySetValue();
        }
    },
    unbind: function () {
        $(this.el)[this.ezClass]('destroy');
    }
});
