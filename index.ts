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

Vue.directive('ez-if',function(val,oldVal){
  console.log('ez-if changed',val,oldVal)
  // $.parser.parse(); 
 } 
)

Vue.mixin({
  created: function () {
    console.log('mixin hook created called')
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

(()=>{
  let vueIf=Vue.directive('if');

  let oldInsert=vueIf.insert;

  vueIf.insert=function(){
    oldInsert.apply(this);
    
    $.parser.parse(this.vm.$el);
  }

})();

$(()=>{
    setTimeout(()=>{
        // mount
        window['vueComp']=new Vue({
            el:'#app',
            
            components:{
               'ez-input-password': EzInputPassword,
               'part1':{
                 props:["password"],
                 template:`
                 <div>Password:{{password}}</div>
  <select id="cc" class="easyui-combobox" name="dept" style="width:200px;">
      <option value="aa">aitem1</option>
      <option>bitem2</option>
      <option>bitem3</option>
      <option>ditem4</option>
      <option>eitem5</option>
  </select>
                 
                 `
               }
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
              password:"www.123.com",
              checked:false,
            },
            template:`<div><select v-ez-select="selected" :options="{editable: false,panelHeight: 42,width: 400}">
                <option v-for="item in items" :value="item.value">{{item.text}}</option>
            </select><p>selected:{{selected|json}}</p>
            <br>
            <br>
            <input class="easyui-combobox" name="language"
        data-options="
            valueField:'id',
            textField:'text',
            panelHeight:'auto',
            onSelect:function(record){
                alert(record.text)
            }">
            <br>
            <a id="btn" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-save'">easyui</a>
            <br>
            <br>
            
            
            
            <br>
            
                <input type="checkbox" id="checkbox" v-model="checked">
            <label for="checkbox">Display: {{ checked }}</label>
            
<part1  v-if="checked" :password="password">            
</part1>        
            <br>
            
            <span>My Password:{{password}}</span>
            
            
            
             <!--<ez-input-password :password-field.sync="password" show-icon-class="icon-ok" hide-icon-class="icon-no" password-label="Passphrase" v-if="checked"></ez-input-password>-->
            </div>
            `,
            compiled:function(){
            },
            ready:function(){
               
               $('#btn').linkbutton({iconCls:"icon-search"});
            }
        })

    },1000)
});

