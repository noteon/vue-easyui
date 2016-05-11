/// <reference path="./typings/tsd.d.ts" />
declare var $ :any;

import Component from "vue-class-component";
import * as Vue from 'vue';

@Component({
  props: {
    passwordField:{
      twoWay: true,
      type: String,
      default: "password"
    },
    passwordLabel:{
        type:String,
        default:"Password"
    },
    labelClass:{
        type:String,
        default:"pure-u-5-24"
    },
    spanClass:{
        type:String,
        default:"pure-u-16-24"
    },
    inputClass:{
        type:String,
        default:"pure-u-1"
    },
    showIconClass:{
        type:String,
        default:"icon-show-pass"
    },
    hideIconClass:{
        type:String,
        default:"icon-hide-pass"
    }
  },
  template: `
<div>
    <label class="{{labelClass}}">{{passwordLabel}}</label>
    <span class="{{spanClass}}"><input class="{{inputClass}}" type="password" v-model="passwordField"/></span>
    <a href="#" class="easyui-linkbutton ez-vue-toggle-btn"></a>
</div> 
  `
})
export class EzInputPassword {
  // lifecycle hook
  ready () {
    let self=this as any;
    let $el=$(self.$el);
    let config={
        plain: true,
        iconCls:self.showIconClass,
        onClick: function() {
            let $this=$(this);
            
            let $password=$this.prev().find("input");
            let $icon=$this.find("span.l-btn-icon").eq(0);
            if($icon.hasClass(self.showIconClass)){
                $password.attr({type:"text"});
                $icon.removeClass(self.showIconClass).addClass(self.hideIconClass);
            }else{
                $password.attr({type:"password"});
                $icon.removeClass(self.hideIconClass).addClass(self.showIconClass);
            }
        }
    };
    
    $el.find('.ez-vue-toggle-btn').linkbutton(config);        
  }
}

