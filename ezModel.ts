declare var $ :any;

import Component from "vue-class-component";
import * as Vue from 'vue';
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
    let $el= $(this.el);

    let trySetValue=()=>{
      try {
        $el[this.ezClass]('setValue', value);
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
