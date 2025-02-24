
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/LanguageLabel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcTGFuZ3VhZ2VMYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBZ0Q7QUFFMUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUF3QkM7UUF0QkcsYUFBTyxHQUFXLEVBQUUsQ0FBQztRQUViLFdBQUssR0FBb0IsSUFBSSxDQUFDOztJQW9CMUMsQ0FBQztJQWxCRyw4QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QyxXQUFXO1FBQ1gseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN0RSxRQUFRO1FBQ1IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTyxrQ0FBVSxHQUFsQjtRQUNJLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMzRTtJQUNMLENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQ0ksT0FBTztRQUNQLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQXJCRDtRQURDLFFBQVE7a0RBQ1k7SUFGSixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBd0JqQztJQUFELG9CQUFDO0NBeEJELEFBd0JDLENBeEIwQyxFQUFFLENBQUMsU0FBUyxHQXdCdEQ7a0JBeEJvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi9MYW5ndWFnZU1hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYW5ndWFnZUxhYmVsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBAcHJvcGVydHlcbiAgICB0ZXh0S2V5OiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgcHJpdmF0ZSBsYWJlbDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5sYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgLy8g5rOo5YaM6K+t6KiA5Y+Y5YyW55uR5ZCsXG4gICAgICAgIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZE9ic2VydmVyKHRoaXMudXBkYXRlVGV4dC5iaW5kKHRoaXMpKTtcbiAgICAgICAgLy8g5Yid5aeL5YyW5paH5pysXG4gICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVGV4dCgpIHtcbiAgICAgICAgaWYgKHRoaXMubGFiZWwgJiYgdGhpcy50ZXh0S2V5KSB7XG4gICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRleHQodGhpcy50ZXh0S2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgLy8g56e76Zmk55uR5ZCsXG4gICAgICAgIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbW92ZU9ic2VydmVyKHRoaXMudXBkYXRlVGV4dC5iaW5kKHRoaXMpKTtcbiAgICB9XG59ICJdfQ==