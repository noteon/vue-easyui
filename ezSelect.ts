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
Vue.directive('ez-select', {
  twoWay: true,
  priority: 1000,

  params: ['options'],
    
  bind: function () {
    var self = this;
    let options=this.params.options || {};
    if (!options.onSelect){
         options.onSelect=(record) => {
           //console.log("select",record);
           self.set(record&& record.value);
         }
    }
     
    
    
    let comboBox=$(this.el).combobox(options);
  },
  update: function (value) {
    $(this.el).combobox('setValue', value);
  },
  unbind: function () {
    $(this.el).combobox('destroy')
  }
})
