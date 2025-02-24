// 语言类型枚举
export enum LanguageType {
    CN = "cn",
    EN = "en",
    JP = "jp",
    FR = "fr",
    Ar = "ar"
}

// 语言配置接口
interface LanguageConfig {
    [key: string]: {
        [key: string]: string
    }
}

export default class LanguageManager {
    private static instance: LanguageManager;
    private currentLanguage: LanguageType = LanguageType.CN;
    private languageData: LanguageConfig = {};
    private observers: Array<(lang: LanguageType) => void> = [];

    // 单例模式
    public static getInstance(): LanguageManager {
        if (!this.instance) {
            this.instance = new LanguageManager();
        }
        return this.instance;
    }

    private constructor() {
        // 初始化语言配置
        this.initLanguageConfig();
        // 从本地存储加载上次使用的语言设置
        this.loadLanguageSettings();
    }
    // 在 LanguageManager 中添加获取下一个语言的方法
public getNextLanguage(currentLang: LanguageType): LanguageType {
    const languages = [
        LanguageType.CN,
        LanguageType.EN,
        LanguageType.JP,
        LanguageType.Ar,
        LanguageType.FR
    ];
    
    const currentIndex = languages.indexOf(currentLang);
    const nextIndex = (currentIndex + 1) % languages.length;
    return languages[nextIndex];
}
    // 初始化语言配置
    private initLanguageConfig() {
        this.languageData = {
            "game.start": {
                [LanguageType.CN]: "投注",
                [LanguageType.EN]: "Bet",
                [LanguageType.JP]: "ベット",
                [LanguageType.FR]: "Mise",
                [LanguageType.Ar]: "الرهان"
            },
            "game.hit": {
                [LanguageType.CN]: "叫牌",
                [LanguageType.EN]: "Hit",
                [LanguageType.JP]: "ヒット",
                [LanguageType.FR]: "Frapper",
                [LanguageType.Ar]: "اضرب"
            },
            "game.stand": {
                [LanguageType.CN]: "停牌",
                [LanguageType.EN]: "Stand",
                [LanguageType.JP]: "スタンド",
                [LanguageType.FR]: "Rester debout",
                [LanguageType.Ar]: "الوقوف"
            },
            "game.double": {
                [LanguageType.CN]: "加倍",
                [LanguageType.EN]: "Double",
                [LanguageType.JP]: "ダブル",
                [LanguageType.FR]: "Doubler",
                [LanguageType.Ar]: "مضاعفة"
            },
            "game.divide": {
                [LanguageType.CN]: "分牌",
                [LanguageType.EN]: "Divide",
                [LanguageType.JP]: "ディバイド",
                [LanguageType.FR]: "Diviser",
                [LanguageType.Ar]: "القسمة"
            },
            "game.BetAmount": {
                [LanguageType.CN]: "投注额",
                [LanguageType.EN]: "Bet amount",
                [LanguageType.JP]: "ベット金額",
                [LanguageType.FR]: "Montant du pari",
                [LanguageType.Ar]: "مبلغ الرهان"
            },
            "game.BuyInsurance": {
                [LanguageType.CN]: "买保险",
                [LanguageType.EN]: "Buy Insurance",
                [LanguageType.JP]: "保険を買う",
                [LanguageType.FR]: "Cheter une assurance",
                [LanguageType.Ar]: "شراء التأمين"
            },
            "game.NotBuyingInsurance": {
                [LanguageType.CN]: "不买保险",
                [LanguageType.EN]: "Not Buying Insurance",
                [LanguageType.JP]: "保険を買わない",
                [LanguageType.FR]: "Ne pas acheter d'assurance",
                [LanguageType.Ar]: "عدم شراء التأمين"
            },
            "game.LanguageSwitching": {
                [LanguageType.CN]: "语言切换",
                [LanguageType.EN]: "Language Switching",
                [LanguageType.JP]: "言語切り替え",
                [LanguageType.FR]: "Changement de langue",
                [LanguageType.Ar]: "تبديل اللغة"
            },
            "game.divideButton": {
                [LanguageType.CN]: "分牌",
                [LanguageType.EN]: "Divide",
                [LanguageType.JP]: "ディバイド",
                [LanguageType.FR]: "Diviser",
                [LanguageType.Ar]: "القسمة"
            },
            "game.noDivideButton": {
                [LanguageType.CN]: "不分牌",
                [LanguageType.EN]: "No Divide",
                [LanguageType.JP]: "ディバイドしない",
                [LanguageType.FR]: "Ne pas diviser",
                [LanguageType.Ar]: "لا يقسم"
            }
            // ... 添加更多文本配置
        };
    }

    // 从本地存储加载语言设置
    private loadLanguageSettings() {
        const savedLanguage = cc.sys.localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            this.currentLanguage = savedLanguage as LanguageType;
        }
    }

    // 切换语言
    public setLanguage(lang: LanguageType): void {
        if (this.currentLanguage !== lang) {
            this.currentLanguage = lang;
            // 保存到本地存储
            cc.sys.localStorage.setItem('selectedLanguage', lang);
            // 通知所有观察者
            this.notifyObservers();
        }
    }

    // 获取当前语言
    public getCurrentLanguage(): LanguageType {
        return this.currentLanguage;
    }

    // 获取翻译文本
    public getText(key: string): string {
        if (this.languageData[key] && this.languageData[key][this.currentLanguage]) {
            return this.languageData[key][this.currentLanguage];
        }
        return key; // 如果找不到翻译，返回key
    }

    // 添加语言变化观察者
    public addObserver(callback: (lang: LanguageType) => void): void {
        this.observers.push(callback);
    }

    // 移除观察者
    public removeObserver(callback: (lang: LanguageType) => void): void {
        const index = this.observers.indexOf(callback);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    // 通知所有观察者
    private notifyObservers(): void {
        this.observers.forEach(callback => callback(this.currentLanguage));
    }
} 