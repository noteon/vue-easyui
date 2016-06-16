"use strict";
var Vue = require('vue');
//e.g.
// new Vue({
//       el:'#app',
//       data:{
//         selected:1,
//         items:[{ value:0,text:"default" },
//         {value:1, text:"value1" },
//         {value:2, text:"value2" }]
//       },
//       template:`<div><select v-ez-select="selected" :options="{editable: false,panelHeight: 42}">
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
        console.log({ ezClass: this.ezClass });
        $el[this.ezClass](options);
    },
    update: function (value) {
        var _this = this;
        var $el = $(this.el);
        if (this.isFirstCall) {
            this.isFirstCall = false;
            setTimeout(function () {
                $el[_this.ezClass]('setValue', value);
            });
        }
        else {
            $el[this.ezClass]('setValue', value);
        }
    },
    unbind: function () {
        $(this.el)[this.ezClass]('destroy');
    }
});
