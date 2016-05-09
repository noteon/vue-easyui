/// <reference path="./typings/tsd.d.ts" />


declare var $ :any;
declare var require:any;
import Component from 'vue-class-component'
import * as Vue from 'vue';


var easyComboBox = {
  template: '<div><select id="easyui-combo" ></select></div>',
  ready: function() {
    let self=this as any;
    //self.greet();
    let $el=$(self.$el);
    
        
    $el.find("#easyui-combo").combobox({
        width:500,
        valueField:"id",
        textField:"text",
        data:[{
            "id":1,
            "text":"text1"
        },{
            "id":2,
            "text":"text2"
        },{
            "id":3,
            "text":"text3",
            "selected":true
        },{
            "id":4,
            "text":"text4"
        },{
            "id":5,
            "text":"text5"
        }],
        onChange:(newValue,oldValue)=>{
            console.log("onChange", newValue, oldValue);
           //self.val=$el.find("#easyui-combo").combobox("getText",newValue); 
        }
    });
  }}

@Component({
  props: {
    propMessage: String
  },
  watch:{
    'val':(oldValue,value)=>{
        console.log({oldValue,value})
    }
  },
  components: {
    easyComboBox
  },
  
  template: `
    <div>
      <input v-model="msg">
      <p>prop: {{propMessage}}</p>
      <p>msg: {{msg}}</p>
      <p>computed msg: {{computedMsg}}</p>
      <button @click="greet">Greet</button>
      <br>
      
      <input v-model="val">
      
      <easy-combo-box></easy-combo-box>
    </div>
  `
})
class App{
  // return initial data
  data () {
    return {
      msg: 123,
      val:"text3",
    }
}

  // lifecycle hook
  ready () {
    
  }

  // computed
  get computedMsg () {
    return 'computed ' + this["msg"]
  }

  // method
  greet () {
    console.log('greeting: ' + this["msg"])
  }
}


$(()=>{
    setTimeout(()=>{
        // mount
        window['vueComp']=new (App as any)({
            el:$('#el')[0]
        })

    },1000)
});

