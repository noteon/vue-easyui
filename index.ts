declare var $ :any;
import Component from 'vue-class-component'

@Component({
  props: {
    propMessage: String
  },
  template: `
    <div>
      <input v-model="msg">
      <p>prop: {{propMessage}}</p>
      <p>msg: {{msg}}</p>
      <p>computed msg: {{computedMsg}}</p>
      <button @click="greet">Greet</button>
    </div>
  `
})
class App {
  // return initial data
  data () {
    return {
      msg: 123
    }
  }

  // lifecycle hook
  ready () {
    this.greet()
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

// mount
let app=new (App as any)({
    el:'#el'
})

$(()=>{
    $("#easyui-combo").combobox({
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
        }]
});

})
