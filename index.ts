/// <reference path="./typings/tsd.d.ts" />


declare var $ :any;
declare var require:any;
import Component from 'vue-class-component'
import * as Vue from 'vue';
import {EzInputPassword} from './ezShowPwdButton';
window["Vue"]=Vue;



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



$(()=>{
    setTimeout(()=>{
        // mount
        window['vueComp']=new Vue({
            el:'#app',
            components:{
               'ez-input-password': EzInputPassword
            },
            data:{
              selected:1,
              items:[{
                value:0,
                text:"default"
              },
              {
                value:1,
                text:"value1"
              },
              {
                value:2,
                text:"value2"
              }],
              password:"www.123.com"
            },
            template:`<div><select v-ez-select="selected" :options="{editable: false,panelHeight: 42,width: 400}">
                <option v-for="item in items" :value="item.value">{{item.text}}</option>
            </select><p>selected:{{selected|json}}</p>
            <br>
            
            <span>My Password:{{password}}</span>
            
            <ez-input-password :password-field.sync="password" show-icon-class="icon-ok" hide-icon-class="icon-no" password-label="Passphrase"></ez-input-password>
            </div>
            `
        })

    },1000)
});

