
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/LanguageManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a1b14Qp4HBH24WR0GSTbPk7', 'LanguageManager');
// scripts/LanguageManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageType = void 0;
// 语言类型枚举
var LanguageType;
(function (LanguageType) {
    LanguageType["CN"] = "cn";
    LanguageType["EN"] = "en";
    LanguageType["JP"] = "jp";
    LanguageType["FR"] = "fr";
    LanguageType["Ar"] = "ar";
})(LanguageType = exports.LanguageType || (exports.LanguageType = {}));
var LanguageManager = /** @class */ (function () {
    function LanguageManager() {
        this.currentLanguage = LanguageType.CN;
        this.languageData = {};
        this.observers = [];
        // 初始化语言配置
        this.initLanguageConfig();
        // 从本地存储加载上次使用的语言设置
        this.loadLanguageSettings();
    }
    // 单例模式
    LanguageManager.getInstance = function () {
        if (!this.instance) {
            this.instance = new LanguageManager();
        }
        return this.instance;
    };
    // 在 LanguageManager 中添加获取下一个语言的方法
    LanguageManager.prototype.getNextLanguage = function (currentLang) {
        var languages = [
            LanguageType.CN,
            LanguageType.EN,
            LanguageType.JP,
            LanguageType.Ar,
            LanguageType.FR
        ];
        var currentIndex = languages.indexOf(currentLang);
        var nextIndex = (currentIndex + 1) % languages.length;
        return languages[nextIndex];
    };
    // 初始化语言配置
    LanguageManager.prototype.initLanguageConfig = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        this.languageData = {
            "game.start": (_a = {},
                _a[LanguageType.CN] = "投注",
                _a[LanguageType.EN] = "Bet",
                _a[LanguageType.JP] = "ベット",
                _a[LanguageType.FR] = "Mise",
                _a[LanguageType.Ar] = "الرهان",
                _a),
            "game.hit": (_b = {},
                _b[LanguageType.CN] = "叫牌",
                _b[LanguageType.EN] = "Hit",
                _b[LanguageType.JP] = "ヒット",
                _b[LanguageType.FR] = "Frapper",
                _b[LanguageType.Ar] = "اضرب",
                _b),
            "game.stand": (_c = {},
                _c[LanguageType.CN] = "停牌",
                _c[LanguageType.EN] = "Stand",
                _c[LanguageType.JP] = "スタンド",
                _c[LanguageType.FR] = "Rester debout",
                _c[LanguageType.Ar] = "الوقوف",
                _c),
            "game.double": (_d = {},
                _d[LanguageType.CN] = "加倍",
                _d[LanguageType.EN] = "Double",
                _d[LanguageType.JP] = "ダブル",
                _d[LanguageType.FR] = "Doubler",
                _d[LanguageType.Ar] = "مضاعفة",
                _d),
            "game.divide": (_e = {},
                _e[LanguageType.CN] = "分牌",
                _e[LanguageType.EN] = "Divide",
                _e[LanguageType.JP] = "ディバイド",
                _e[LanguageType.FR] = "Diviser",
                _e[LanguageType.Ar] = "القسمة",
                _e),
            "game.BetAmount": (_f = {},
                _f[LanguageType.CN] = "投注额",
                _f[LanguageType.EN] = "Bet amount",
                _f[LanguageType.JP] = "ベット金額",
                _f[LanguageType.FR] = "Montant du pari",
                _f[LanguageType.Ar] = "مبلغ الرهان",
                _f),
            "game.BuyInsurance": (_g = {},
                _g[LanguageType.CN] = "买保险",
                _g[LanguageType.EN] = "Buy Insurance",
                _g[LanguageType.JP] = "保険を買う",
                _g[LanguageType.FR] = "Cheter une assurance",
                _g[LanguageType.Ar] = "شراء التأمين",
                _g),
            "game.NotBuyingInsurance": (_h = {},
                _h[LanguageType.CN] = "不买保险",
                _h[LanguageType.EN] = "Not Buying Insurance",
                _h[LanguageType.JP] = "保険を買わない",
                _h[LanguageType.FR] = "Ne pas acheter d'assurance",
                _h[LanguageType.Ar] = "عدم شراء التأمين",
                _h),
            "game.LanguageSwitching": (_j = {},
                _j[LanguageType.CN] = "语言切换",
                _j[LanguageType.EN] = "Language Switching",
                _j[LanguageType.JP] = "言語切り替え",
                _j[LanguageType.FR] = "Changement de langue",
                _j[LanguageType.Ar] = "تبديل اللغة",
                _j),
            "game.divideButton": (_k = {},
                _k[LanguageType.CN] = "分牌",
                _k[LanguageType.EN] = "Divide",
                _k[LanguageType.JP] = "ディバイド",
                _k[LanguageType.FR] = "Diviser",
                _k[LanguageType.Ar] = "القسمة",
                _k),
            "game.noDivideButton": (_l = {},
                _l[LanguageType.CN] = "不分牌",
                _l[LanguageType.EN] = "No Divide",
                _l[LanguageType.JP] = "ディバイドしない",
                _l[LanguageType.FR] = "Ne pas diviser",
                _l[LanguageType.Ar] = "لا يقسم",
                _l)
            // ... 添加更多文本配置
        };
    };
    // 从本地存储加载语言设置
    LanguageManager.prototype.loadLanguageSettings = function () {
        var savedLanguage = cc.sys.localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            this.currentLanguage = savedLanguage;
        }
    };
    // 切换语言
    LanguageManager.prototype.setLanguage = function (lang) {
        if (this.currentLanguage !== lang) {
            this.currentLanguage = lang;
            // 保存到本地存储
            cc.sys.localStorage.setItem('selectedLanguage', lang);
            // 通知所有观察者
            this.notifyObservers();
        }
    };
    // 获取当前语言
    LanguageManager.prototype.getCurrentLanguage = function () {
        return this.currentLanguage;
    };
    // 获取翻译文本
    LanguageManager.prototype.getText = function (key) {
        if (this.languageData[key] && this.languageData[key][this.currentLanguage]) {
            return this.languageData[key][this.currentLanguage];
        }
        return key; // 如果找不到翻译，返回key
    };
    // 添加语言变化观察者
    LanguageManager.prototype.addObserver = function (callback) {
        this.observers.push(callback);
    };
    // 移除观察者
    LanguageManager.prototype.removeObserver = function (callback) {
        var index = this.observers.indexOf(callback);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    };
    // 通知所有观察者
    LanguageManager.prototype.notifyObservers = function () {
        var _this = this;
        this.observers.forEach(function (callback) { return callback(_this.currentLanguage); });
    };
    return LanguageManager;
}());
exports.default = LanguageManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcTGFuZ3VhZ2VNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVM7QUFDVCxJQUFZLFlBTVg7QUFORCxXQUFZLFlBQVk7SUFDcEIseUJBQVMsQ0FBQTtJQUNULHlCQUFTLENBQUE7SUFDVCx5QkFBUyxDQUFBO0lBQ1QseUJBQVMsQ0FBQTtJQUNULHlCQUFTLENBQUE7QUFDYixDQUFDLEVBTlcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFNdkI7QUFTRDtJQWNJO1FBWlEsb0JBQWUsR0FBaUIsWUFBWSxDQUFDLEVBQUUsQ0FBQztRQUNoRCxpQkFBWSxHQUFtQixFQUFFLENBQUM7UUFDbEMsY0FBUyxHQUF3QyxFQUFFLENBQUM7UUFXeEQsVUFBVTtRQUNWLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBYkQsT0FBTztJQUNPLDJCQUFXLEdBQXpCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1NBQ3pDO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFRRCxrQ0FBa0M7SUFDL0IseUNBQWUsR0FBdEIsVUFBdUIsV0FBeUI7UUFDNUMsSUFBTSxTQUFTLEdBQUc7WUFDZCxZQUFZLENBQUMsRUFBRTtZQUNmLFlBQVksQ0FBQyxFQUFFO1lBQ2YsWUFBWSxDQUFDLEVBQUU7WUFDZixZQUFZLENBQUMsRUFBRTtZQUNmLFlBQVksQ0FBQyxFQUFFO1NBQ2xCLENBQUM7UUFFRixJQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELElBQU0sU0FBUyxHQUFHLENBQUMsWUFBWSxHQUFHLENBQUMs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LGVBQWUsQ0FBQyxFQUE5QixDQUE4QixDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0F2S0EsQUF1S0MsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIOivreiogOexu+Wei+aemuS4vlxuZXhwb3J0IGVudW0gTGFuZ3VhZ2VUeXBlIHtcbiAgICBDTiA9IFwiY25cIixcbiAgICBFTiA9IFwiZW5cIixcbiAgICBKUCA9IFwianBcIixcbiAgICBGUiA9IFwiZnJcIixcbiAgICBBciA9IFwiYXJcIlxufVxuXG4vLyDor63oqIDphY3nva7mjqXlj6NcbmludGVyZmFjZSBMYW5ndWFnZUNvbmZpZyB7XG4gICAgW2tleTogc3RyaW5nXToge1xuICAgICAgICBba2V5OiBzdHJpbmddOiBzdHJpbmdcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExhbmd1YWdlTWFuYWdlciB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IExhbmd1YWdlTWFuYWdlcjtcbiAgICBwcml2YXRlIGN1cnJlbnRMYW5ndWFnZTogTGFuZ3VhZ2VUeXBlID0gTGFuZ3VhZ2VUeXBlLkNOO1xuICAgIHByaXZhdGUgbGFuZ3VhZ2VEYXRhOiBMYW5ndWFnZUNvbmZpZyA9IHt9O1xuICAgIHByaXZhdGUgb2JzZXJ2ZXJzOiBBcnJheTwobGFuZzogTGFuZ3VhZ2VUeXBlKSA9PiB2b2lkPiA9IFtdO1xuXG4gICAgLy8g5Y2V5L6L5qih5byPXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBMYW5ndWFnZU1hbmFnZXIge1xuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgTGFuZ3VhZ2VNYW5hZ2VyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8g5Yid5aeL5YyW6K+t6KiA6YWN572uXG4gICAgICAgIHRoaXMuaW5pdExhbmd1YWdlQ29uZmlnKCk7XG4gICAgICAgIC8vIOS7juacrOWcsOWtmOWCqOWKoOi9veS4iuasoeS9v+eUqOeahOivreiogOiuvue9rlxuICAgICAgICB0aGlzLmxvYWRMYW5ndWFnZVNldHRpbmdzKCk7XG4gICAgfVxuICAgIC8vIOWcqCBMYW5ndWFnZU1hbmFnZXIg5Lit5re75Yqg6I635Y+W5LiL5LiA5Liq6K+t6KiA55qE5pa55rOVXG5wdWJsaWMgZ2V0TmV4dExhbmd1YWdlKGN1cnJlbnRMYW5nOiBMYW5ndWFnZVR5cGUpOiBMYW5ndWFnZVR5cGUge1xuICAgIGNvbnN0IGxhbmd1YWdlcyA9IFtcbiAgICAgICAgTGFuZ3VhZ2VUeXBlLkNOLFxuICAgICAgICBMYW5ndWFnZVR5cGUuRU4sXG4gICAgICAgIExhbmd1YWdlVHlwZS5KUCxcbiAgICAgICAgTGFuZ3VhZ2VUeXBlLkFyLFxuICAgICAgICBMYW5ndWFnZVR5cGUuRlJcbiAgICBdO1xuICAgIFxuICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IGxhbmd1YWdlcy5pbmRleE9mKGN1cnJlbnRMYW5nKTtcbiAgICBjb25zdCBuZXh0SW5kZXggPSAoY3VycmVudEluZGV4ICsgMSkgJSBsYW5ndWFnZXMubGVuZ3RoO1xuICAgIHJldHVybiBsYW5ndWFnZXNbbmV4dEluZGV4XTtcbn1cbiAgICAvLyDliJ3lp4vljJbor63oqIDphY3nva5cbiAgICBwcml2YXRlIGluaXRMYW5ndWFnZUNvbmZpZygpIHtcbiAgICAgICAgdGhpcy5sYW5ndWFnZURhdGEgPSB7XG4gICAgICAgICAgICBcImdhbWUuc3RhcnRcIjoge1xuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuQ05dOiBcIuaKleazqFwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuRU5dOiBcIkJldFwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuSlBdOiBcIuODmeODg+ODiFwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuRlJdOiBcIk1pc2VcIixcbiAgICAgICAgICAgICAgICBbTGFuZ3VhZ2VUeXBlLkFyXTogXCLYp9mE2LHZh9in2YZcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2FtZS5oaXRcIjoge1xuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuQ05dOiBcIuWPq+eJjFwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuRU5dOiBcIkhpdFwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuSlBdOiBcIuODkuODg+ODiFwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuRlJdOiBcIkZyYXBwZXJcIixcbiAgICAgICAgICAgICAgICBbTGFuZ3VhZ2VUeXBlLkFyXTogXCLYp9i22LHYqFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnYW1lLnN0YW5kXCI6IHtcbiAgICAgICAgICAgICAgICBbTGFuZ3VhZ2VUeXBlLkNOXTogXCLlgZzniYxcIixcbiAgICAgICAgICAgICAgICBbTGFuZ3VhZ2VUeXBlLkVOXTogXCJTdGFuZFwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuSlBdOiBcIuOCueOCv+ODs+ODiVwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuRlJdOiBcIlJlc3RlciBkZWJvdXRcIixcbiAgICAgICAgICAgICAgICBbTGFuZ3VhZ2VUeXBlLkFyXTogXCLYp9mE2YjZgtmI2YFcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2FtZS5kb3VibGVcIjoge1xuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuQ05dOiBcIuWKoOWAjVwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuRU5dOiBcIkRvdWJsZVwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuSlBdOiBcIuODgOODluODq1wiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuRlJdOiBcIkRvdWJsZXJcIixcbiAgICAgICAgICAgICAgICBbTGFuZ3VhZ2VUeXBlLkFyXTogXCLZhdi22KfYudmB2KlcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2FtZS5kaXZpZGVcIjoge1xuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuQ05dOiBcIuWIhueJjFwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuRU5dOiBcIkRpdmlkZVwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuSlBdOiBcIuODh+OCo+ODkOOCpOODiVwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuRlJdOiBcIkRpdmlzZXJcIixcbiAgICAgICAgICAgICAgICBbTGFuZ3VhZ2VUeXBlLkFyXTogXCLYp9mE2YLYs9mF2KlcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2FtZS5CZXRBbW91bnRcIjoge1xuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuQ05dOiBcIuaKleazqOminVwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuRU5dOiBcIkJldCBhbW91bnRcIixcbiAgICAgICAgICAgICAgICBbTGFuZ3VhZ2VUeXBlLkpQXTogXCLjg5njg4Pjg4jph5HpoY1cIixcbiAgICAgICAgICAgICAgICBbTGFuZ3VhZ2VUeXBlLkZSXTogXCJNb250YW50IGR1IHBhcmlcIixcbiAgICAgICAgICAgICAgICBbTGFuZ3VhZ2VUeXBlLkFyXTogXCLZhdio2YTYuiDYp9mE2LHZh9in2YZcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2FtZS5CdXlJbnN1cmFuY2VcIjoge1xuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuQ05dOiBcIuS5sOS/nemZqVwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuRU5dOiBcIkJ1eSBJbnN1cmFuY2VcIixcbiAgICAgICAgICAgICAgICBbTGFuZ3VhZ2VUeXBlLkpQXTogXCLkv53pmbrjgpLosrfjgYZcIixcbiAgICAgICAgICAgICAgICBbTGFuZ3VhZ2VUeXBlLkZSXTogXCJDaGV0ZXIgdW5lIGFzc3VyYW5jZVwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuQXJdOiBcIti02LHYp9ihINin2YTYqtij2YXZitmGXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdhbWUuTm90QnV5aW5nSW5zdXJhbmNlXCI6IHtcbiAgICAgICAgICAgICAgICBbTGFuZ3VhZ2VUeXBlLkNOXTogXCLkuI3kubDkv53pmalcIixcbiAgICAgICAgICAgICAgICBbTGFuZ3VhZ2VUeXBlLkVOXTogXCJOb3QgQnV5aW5nIEluc3VyYW5jZVwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuSlBdOiBcIuS/nemZuuOCkuiyt+OCj+OBquOBhFwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuRlJdOiBcIk5lIHBhcyBhY2hldGVyIGQnYXNzdXJhbmNlXCIsXG4gICAgICAgICAgICAgICAgW0xhbmd1YWdlVHlwZS5Bcl06IFwi2LnYr9mFINi02LHYp9ihINin2YTYqtij2YXZitmGXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdhbWUuTGFuZ3VhZ2VTd2l0Y2hpbmdcIjoge1xuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuQ05dOiBcIuivreiogOWIh+aNolwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuRU5dOiBcIkxhbmd1YWdlIFN3aXRjaGluZ1wiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuSlBdOiBcIuiogOiqnuWIh+OCiuabv+OBiFwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuRlJdOiBcIkNoYW5nZW1lbnQgZGUgbGFuZ3VlXCIsXG4gICAgICAgICAgICAgICAgW0xhbmd1YWdlVHlwZS5Bcl06IFwi2KrYqNiv2YrZhCDYp9mE2YTYutipXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdhbWUuZGl2aWRlQnV0dG9uXCI6IHtcbiAgICAgICAgICAgICAgICBbTGFuZ3VhZ2VUeXBlLkNOXTogXCLliIbniYxcIixcbiAgICAgICAgICAgICAgICBbTGFuZ3VhZ2VUeXBlLkVOXTogXCJEaXZpZGVcIixcbiAgICAgICAgICAgICAgICBbTGFuZ3VhZ2VUeXBlLkpQXTogXCLjg4fjgqPjg5DjgqTjg4lcIixcbiAgICAgICAgICAgICAgICBbTGFuZ3VhZ2VUeXBlLkZSXTogXCJEaXZpc2VyXCIsXG4gICAgICAgICAgICAgICAgW0xhbmd1YWdlVHlwZS5Bcl06IFwi2KfZhNmC2LPZhdipXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdhbWUubm9EaXZpZGVCdXR0b25cIjoge1xuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuQ05dOiBcIuS4jeWIhueJjFwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuRU5dOiBcIk5vIERpdmlkZVwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuSlBdOiBcIuODh+OCo+ODkOOCpOODieOBl+OBquOBhFwiLFxuICAgICAgICAgICAgICAgIFtMYW5ndWFnZVR5cGUuRlJdOiBcIk5lIHBhcyBkaXZpc2VyXCIsXG4gICAgICAgICAgICAgICAgW0xhbmd1YWdlVHlwZS5Bcl06IFwi2YTYpyDZitmC2LPZhVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAuLi4g5re75Yqg5pu05aSa5paH5pys6YWN572uXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8g5LuO5pys5Zyw5a2Y5YKo5Yqg6L296K+t6KiA6K6+572uXG4gICAgcHJpdmF0ZSBsb2FkTGFuZ3VhZ2VTZXR0aW5ncygpIHtcbiAgICAgICAgY29uc3Qgc2F2ZWRMYW5ndWFnZSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2VsZWN0ZWRMYW5ndWFnZScpO1xuICAgICAgICBpZiAoc2F2ZWRMYW5ndWFnZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TGFuZ3VhZ2UgPSBzYXZlZExhbmd1YWdlIGFzIExhbmd1YWdlVHlwZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIOWIh+aNouivreiogFxuICAgIHB1YmxpYyBzZXRMYW5ndWFnZShsYW5nOiBMYW5ndWFnZVR5cGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudExhbmd1YWdlICE9PSBsYW5nKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRMYW5ndWFnZSA9IGxhbmc7XG4gICAgICAgICAgICAvLyDkv53lrZjliLDmnKzlnLDlrZjlgqhcbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2VsZWN0ZWRMYW5ndWFnZScsIGxhbmcpO1xuICAgICAgICAgICAgLy8g6YCa55+l5omA5pyJ6KeC5a+f6ICFXG4gICAgICAgICAgICB0aGlzLm5vdGlmeU9ic2VydmVycygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8g6I635Y+W5b2T5YmN6K+t6KiAXG4gICAgcHVibGljIGdldEN1cnJlbnRMYW5ndWFnZSgpOiBMYW5ndWFnZVR5cGUge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50TGFuZ3VhZ2U7XG4gICAgfVxuXG4gICAgLy8g6I635Y+W57+76K+R5paH5pysXG4gICAgcHVibGljIGdldFRleHQoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5sYW5ndWFnZURhdGFba2V5XSAmJiB0aGlzLmxhbmd1YWdlRGF0YVtrZXldW3RoaXMuY3VycmVudExhbmd1YWdlXSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VEYXRhW2tleV1bdGhpcy5jdXJyZW50TGFuZ3VhZ2VdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrZXk7IC8vIOWmguaenOaJvuS4jeWIsOe/u+ivke+8jOi/lOWbnmtleVxuICAgIH1cblxuICAgIC8vIOa3u+WKoOivreiogOWPmOWMluinguWvn+iAhVxuICAgIHB1YmxpYyBhZGRPYnNlcnZlcihjYWxsYmFjazogKGxhbmc6IExhbmd1YWdlVHlwZSkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9ic2VydmVycy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvLyDnp7vpmaTop4Llr5/ogIVcbiAgICBwdWJsaWMgcmVtb3ZlT2JzZXJ2ZXIoY2FsbGJhY2s6IChsYW5nOiBMYW5ndWFnZVR5cGUpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLm9ic2VydmVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDpgJrnn6XmiYDmnInop4Llr5/ogIVcbiAgICBwcml2YXRlIG5vdGlmeU9ic2VydmVycygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMuZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjayh0aGlzLmN1cnJlbnRMYW5ndWFnZSkpO1xuICAgIH1cbn0gIl19