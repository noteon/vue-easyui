/// <reference path="./typings/tsd.d.ts" />


declare var $ :any;
declare var require:any;
declare var _:any;
import Component from 'vue-class-component'
import * as Vue from 'vue';
import {EzInputPassword} from './ezShowPwdButton';
import  './ezModel';
window["Vue"]=Vue;



// Vue.directive('ez-select', {
//   twoWay: true,
//   priority: 1000,

//   params: ['options'],
    
//   bind: function () {
//     var self = this;
//     let options=this.params.options || {};
//     if (!options.onSelect){
//          options.onSelect=(record) => {
//            //console.log("select",record);
//            self.set(record&& record.value);
//          }
//     }
     
    
    
//     let comboBox=$(this.el).combobox(options);
//   },
//   update: function (value) {
//     $(this.el).combobox('setValue', value);
//   },
//   unbind: function () {
//     $(this.el).combobox('destroy')
//   }
// })

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
               },
               "my-datalist":{
                 template:`<ul id="dl" class="easyui-datalist" title="Basic DataList">
                <li value="AL">Alabama</li>
                <li value="AK">Alaska</li>
                <li value="AZ">Arizona</li>
              </ul>`,
                ready:function(){
                    console.log($('#dl').length);
                    $('#dl').datalist({
                      title:"myBasic",
                      checkbox: true,
                      lines: true                
                    })
                }
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
              num:5555555,
              text:"textbox",
              replicaReadPreference:"primaryPreferred"
            },
            template:`
<div>
               <!--<input type="checkbox" id="checkbox" v-model="checked">
              <label for="checkbox">Display: {{ checked }}</label>
            
              <part1  v-if="checked" :password="password">            
              </part1>     
              
              <div v-if="checked">
                <div>Password:{{password}}</div>
                <select id="cc" class="easyui-combobox" name="dept" style="width:'100%';">
                    <option value="aa">aitem1</option>
                    <option>bitem2</option>
                    <option>bitem3</option>
                    <option>ditem4</option>
                    <option>eitem5</option>
                </select>
             </div>   
             
             
            <div class="pure-u-1 no-gutter" v-if="checked">
                <label class='pure-u-4-24'>Read Preference</label>
                <div class="pure-u-20-24">
                  <select v-ez-model="replicaReadPreference" class="easyui-combobox" :options="{editable: false, panelHeight:102, width: '100%'}">
                        <option value="primary">primary</option>
                        <option value="primaryPreferred">primaryPreferred</option>
                        <option value="secondary">secondary</option>
                        <option value="secondaryPreferred">secondaryPreferred</option>
                        <option value="nearest">nearest</option>
                  </select>
                </div>
               
                <my-datalist></my-datalist>

          </div>
                    -->
            <select v-ez-model="replicaReadPreference" class="easyui-combobox" :options="{editable: false, panelHeight:102, width: '100%'}">
                  <option value="primary">primary</option>
                  <option value="primaryPreferred">primaryPreferred</option>
                  <option value="secondary">secondary</option>
                  <option value="secondaryPreferred">secondaryPreferred</option>
                  <option value="nearest">nearest</option>
            </select>
            <br>
            <input type="text" v-ez-model="num" class="easyui-numberbox" value="100" data-options="min:0,precision:2,groupSeparator:','">
	          <br>

            <input class="easyui-textbox" v-ez-model="text" data-options="iconCls:'icon-search'" style="width:300px">
            <br>

            <pre>{{ $data | json 4}}</pre>
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

