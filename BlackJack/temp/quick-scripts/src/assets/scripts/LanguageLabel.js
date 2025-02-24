"use strict";
cc._RF.push(module, '65d9fhr7xlMYqso+szk7OSt', 'LanguageLabel');
// scripts/LanguageLabel.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var LanguageManager_1 = require("./LanguageManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LanguageLabel = /** @class */ (function (_super) {
    __extends(LanguageLabel, _super);
    function LanguageLabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textKey = "";
        _this.label = null;
        return _this;
    }
    LanguageLabel.prototype.onLoad = function () {
        this.label = this.getComponent(cc.Label);
        // 注册语言变化监听
        LanguageManager_1.default.getInstance().addObserver(this.updateText.bind(this));
        // 初始化文本
        this.updateText();
    };
    LanguageLabel.prototype.updateText = function () {
        if (this.label && this.textKey) {
            this.label.string = LanguageManager_1.default.getInstance().getText(this.textKey);
        }
    };
    LanguageLabel.prototype.onDestroy = function () {
        // 移除监听
        LanguageManager_1.default.getInstance().removeObserver(this.updateText.bind(this));
    };
    __decorate([
        property
    ], LanguageLabel.prototype, "textKey", void 0);
    LanguageLabel = __decorate([
        ccclass
    ], LanguageLabel);
    return LanguageLabel;
}(cc.Component));
exports.default = LanguageLabel;

cc._RF.pop();