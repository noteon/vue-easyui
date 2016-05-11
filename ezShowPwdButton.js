"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="./typings/tsd.d.ts" />
var vue_class_component_1 = require("vue-class-component");
var EzInputPassword = (function () {
    function EzInputPassword() {
    }
    // lifecycle hook
    EzInputPassword.prototype.ready = function () {
        var self = this;
        var $el = $(self.$el);
        var config = {
            plain: true,
            iconCls: self.showIconClass,
            onClick: function () {
                var $this = $(this);
                var $password = $this.prev().find("input");
                var $icon = $this.find("span.l-btn-icon").eq(0);
                if ($icon.hasClass(self.showIconClass)) {
                    $password.attr({ type: "text" });
                    $icon.removeClass(self.showIconClass).addClass(self.hideIconClass);
                }
                else {
                    $password.attr({ type: "password" });
                    $icon.removeClass(self.hideIconClass).addClass(self.showIconClass);
                }
            }
        };
        $el.find('.ez-vue-toggle-btn').linkbutton(config);
    };
    EzInputPassword = __decorate([
        vue_class_component_1.default({
            props: {
                passwordField: {
                    twoWay: true,
                    type: String,
                    default: "password"
                },
                passwordLabel: {
                    type: String,
                    default: "Password"
                },
                labelClass: {
                    type: String,
                    default: "pure-u-5-24"
                },
                spanClass: {
                    type: String,
                    default: "pure-u-16-24"
                },
                inputClass: {
                    type: String,
                    default: "pure-u-1"
                },
                showIconClass: {
                    type: String,
                    default: "icon-show-pass"
                },
                hideIconClass: {
                    type: String,
                    default: "icon-hide-pass"
                }
            },
            template: "\n<div>\n    <label class=\"{{labelClass}}\">{{passwordLabel}}</label>\n    <span class=\"{{spanClass}}\"><input class=\"{{inputClass}}\" type=\"password\" v-model=\"passwordField\"/></span>\n    <a href=\"#\" class=\"easyui-linkbutton ez-vue-toggle-btn\"></a>\n</div> \n  "
        })
    ], EzInputPassword);
    return EzInputPassword;
}());
exports.EzInputPassword = EzInputPassword;
