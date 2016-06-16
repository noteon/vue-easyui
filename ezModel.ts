declare var $ :any;


import * as Vue from 'vue';
import * as moment from "moment";


(()=>{
  let vueIf=Vue.directive('if');

  let oldInsert=vueIf.insert;

  vueIf.insert=function(){
    oldInsert.apply(this);
    $ && $.parser && this.vm && $.parser.parse(this.vm.$el);
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
    
  bind: function () {
    let self = this;
    let $el=$(self.el);
    let options=this.params.options || {};

    let oldOnChange=options.onChange;
    options.onChange=function (newVal,oldVal) {
       if (oldOnChange)
           oldOnChange.apply(this,arguments);

       self.set(newVal);
    }

    this.ezClass=(()=>{
       let cls=$el.attr('class').split(/\s+/).find((it)=>it.indexOf("easyui-")===0);
       return cls.split('-').slice(1).join('-');      
    })(); 
    //console.log({ezClass:this.ezClass});

    $el[this.ezClass](options);
},

  update: function (value) {
    let self=this;
    let $el= $(self.el);
    

    let trySetValue=()=>{
      let isMultipleValues= !!$el[this.ezClass]("options").multiple;
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
    }

    if (this.isFirstCall){
       this.isFirstCall=false;
       setTimeout(()=>{
         trySetValue();
       })
    }else{
      trySetValue();
    }

  },
  unbind: function () {
    $(this.el)[this.ezClass]('destroy')
  }
})
