declare var $ :any;


import * as Vue from 'vue';
import * as moment from "moment";


(()=>{
  let vueIf=Vue.directive('if');

  let oldInsert=vueIf.insert;

  vueIf.insert=function(){
    oldInsert.apply(this);
    $ && this.frag && this.frag.node && $.parser && this.vm && $.parser.parse(this.frag.node);
  }

})()


Vue.mixin({
  created: function () {
    //console.log('mixin hook created called')
  },
  
  compiled: function () {
    if ($ && $.parser){
        $.parser.parse(this.$el);
    }
  },
  attached:function(){
    //console.log("attached");
  },
  dettached:function(){
    //console.log("dettached");
  },
  
  destroy:function(){
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

  isFirstCall:true,

  params: ['options'],

  ezClass: "",
    
  initEasyUiComp:function(value){
    let self = this;
    let $el=$(self.el);
    let options=this.params.options || {};

    let oldOnChange=options.onChange;
    options.onChange=function (newVal,_oldVal) {
       if (oldOnChange)
           oldOnChange.apply(this,arguments);

       self.set(newVal);
    }

    this.ezClass=(()=>{
       let cls=$el.attr('class').split(/\s+/).find((it)=>it.indexOf("easyui-")===0);
       return cls.split('-').slice(1).join('-');      
    })(); 
    if (this.ezClass==="datebox" || this.ezClass==="datetimebox"){
       $el[this.ezClass](options);

       setTimeout(()=>this.trySetValue(value,true),0);

       return;  
    }
    
    if (this.ezClass==="calendar"){
      options.current=value;
    }else if (this.ezClass==="switchbutton"){
      options.checked=value;
    } else {
      options.value=value;
    }

    $el[this.ezClass](options);

  },


   trySetValue: function(value,ignoreMultiple){
    let self=this;
    let $el= $(self.el);

    let isMultipleValues=ignoreMultiple?false:!!$el[this.ezClass]("options").multiple;

    let setValMethod=isMultipleValues?"setValues":"setValue";

    if (self.ezClass==="calendar"){
          setValMethod="moveTo";
      }

      try {
        if (self.ezClass==="datebox"){
            value=value && moment(value).format('M/D/Y')
        }else if (self.ezClass==="datetimebox"){
            value=value && moment(value).format('M/D/Y HH:mm:ss')
        }

         $el[this.ezClass](setValMethod, value);
      } catch (error) {
        console.error(error);
      }
  },

  bind: function () {
  },

  update: function (value) {
    if (this.isFirstCall){
       this.isFirstCall=false;
       this.initEasyUiComp(value);
    }else{
      this.trySetValue(value);
    }

  },
  unbind: function () {
    $(this.el)[this.ezClass]('destroy')
  }
})
