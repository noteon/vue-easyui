/// <reference path="../typings/tsd.d.ts" />


declare var $ :any;
declare var require:any;
declare var _:any;
import Component from 'vue-class-component'
import * as Vue from 'vue';
import {EzInputPassword} from './ezShowPwdButton';
import  '../ezModel';
window["Vue"]=Vue;




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
              date: new Date(),
              calendar: new Date(2015,2,1),
              switch: true,
              replicaReadPreference:"primaryPreferred",
              file: "/tmp/spikes",
              numberspin:100,
              numberSpinnerOptions:{
                    onChange: function(value){
                        console.log("nummbersSpinner onChange called",value)
                    }
                },

              progressValue:60,
              dateboxValue: new Date(2001,8,11),//2011/9/11,
              dateboxOptions:{
                validator: function(date){
                  if (date.getDay() == 1){return true;}
                  else {return false;}
                }
              },
              searchBoxValue:"mongobooster" ,
              combogridValue:1,
              datetimeBoxValue: new Date(),
              timeSpinnerValue:"11:35",

              combotreeValue:[11],
              comboTreeOptions:{
                 multiple:true,
                 onlyLeafCheck:true,
                 data:[{
                  id: 1,
                  text: 'Languages',
                  children: [{
                    id: 11,
                    text: 'Java'
                  },{
                    id: 12,
                    text: 'C++'
                  }]
                }] 
              },
            },
            template:`
<div>

              <input type="checkbox" id="checkbox" v-model="checked">

              <label for="checkbox">Test v-if, Display: {{ checked }}</label>
            
              <part1  v-if="checked" :password="password">            
              </part1>     
              
              <div v-if="checked">
                <input type="text" v-ez-model="num" class="easyui-numberbox" value="100" data-options="min:0,precision:2,groupSeparator:','">
               <hr>
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
                    
            <select v-ez-model="replicaReadPreference" class="easyui-combobox" :options="{editable: false, panelHeight:102, width: '100%'}">
                  <option value="primary">primary</option>
                  <option value="primaryPreferred">primaryPreferred</option>
                  <option value="secondary">secondary</option>
                  <option value="secondaryPreferred">secondaryPreferred</option>
                  <option value="nearest">nearest</option>
            </select>
            <hr>
            <input type="text" v-ez-model="num" class="easyui-numberbox" value="100" data-options="min:0,precision:2,groupSeparator:','">
            <hr>

            <input class="easyui-textbox" v-ez-model="text" data-options="iconCls:'icon-search'" style="width:300px">
            <hr>
            <input class="easyui-datetimespinner" v-ez-model="date" style="width:100%;height:26px;">
            <hr>

            <input class="easyui-switchbutton" v-ez-model="switch">
            <hr>
            <!--<input class="easyui-filebox" v-ez-model="file"  style="width:50%">-->
            <!--<hr>           -->

            <input class="easyui-numberspinner" v-ez-model="numberspin" style="width:100%;height:26px;" :options="numberSpinnerOptions">
            <hr>     

             <div class="easyui-calendar" v-ez-model="calendar"  style="width:250px;height:250px;"></div>
             <hr>        

             <div class="easyui-progressbar" v-ez-model="progressValue" style="width:400px;"></div>

             <hr>
             <input class="easyui-datebox" v-ez-model="dateboxValue"  style="width:100%;height:26px" :options="dateboxOptions">

            <hr>
            <input class="easyui-searchbox"  v-ez-model="searchBoxValue"   data-options="prompt:'Please Input Value'" style="width:300px"></input>

            <hr>
                <select class="easyui-combogrid" v-ez-model="combogridValue"   style="width:100%" data-options="
                    panelWidth: 500,
                    idField: 'id',
                    textField: 'name',
                    data:[
                     { id: 1, name:'name1'},
                     { id: 2, name:'name2'},
                     { id: 3, name:'name3'},
                     { id: 4, name:'name4'},
                    ],
                    method: 'get',
                    columns: [[
                        {field:'id',title:'Item ID',width:80},
                        {field:'name',title:'Product',width:120},
                    ]],
                    fitColumns: true
                ">
            </select>

            <hr>
             <input class="easyui-datetimebox" v-ez-model="datetimeBoxValue"  style="width:100%;height:26px">

            <hr>
            <input class="easyui-timespinner" v-ez-model="timeSpinnerValue" style="width:100%;height:26px">

          <hr>    
          <select class="easyui-combotree" v-ez-model="combotreeValue"  style="width:200px;"
                  :options="comboTreeOptions">
          </select>            

            <pre>{{ $data | json 4}}</pre>
</div>
            `,
            compiled:function(){

            },
            ready:function(){
               

               $('#btn').linkbutton({iconCls:"icon-search"});

               $('.easyui-datebox').datebox().datebox('calendar').calendar({
                validator: function(date){
                    var now = new Date();
                    var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    var d2 = new Date(now.getFullYear(), now.getMonth(), now.getDate()+10);
                    return d1<=date && date<=d2;
                }
            });
              
            }
        })

    },1000)
});

