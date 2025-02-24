"use strict";
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