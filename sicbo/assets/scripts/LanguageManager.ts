import { sys } from "cc";

// 语言类型枚举
export enum LanguageType {
    CN = "cn",//中文
    EN = "en",//英文
    FR = "fr",//法文
    Ar = "ar"//阿拉伯文
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
            "game.1": {
                [LanguageType.CN]: "一",
                [LanguageType.EN]: "One",
                [LanguageType.FR]: "Un",
                [LanguageType.Ar]: "واحد"
            },
            "game.2": {
                [LanguageType.CN]: "二",
                [LanguageType.EN]: "Two",
                [LanguageType.FR]: "Deux",
                [LanguageType.Ar]: "اثنين"
            },
            "game.3": {
                [LanguageType.CN]: "三",
                [LanguageType.EN]: "Three",
                [LanguageType.FR]: "Trois",
                [LanguageType.Ar]: "ثلاثة"
            },
            "game.4": {
                [LanguageType.CN]: "四",
                [LanguageType.EN]: "Four",
                [LanguageType.FR]: "Quatre",
                [LanguageType.Ar]: "أربعة"
            },
            "game.5": {
                [LanguageType.CN]: "五",
                [LanguageType.EN]: "Five",
                [LanguageType.FR]: "Cinq",
                [LanguageType.Ar]: "خمسة"
            },
            "game.6": {
                [LanguageType.CN]: "六",
                [LanguageType.EN]: "Six",
                [LanguageType.FR]: "Six",
                [LanguageType.Ar]: "ستة"
            },
            "game.新一局": {
                [LanguageType.CN]: "新一局",
                [LanguageType.EN]: "New Game",
                [LanguageType.FR]: "Nouvelle partie",
                [LanguageType.Ar]: "لعبة جديدة"
            },
            "game.奇数": {    
                [LanguageType.CN]: "奇数",
                [LanguageType.EN]: "Odd",
                [LanguageType.FR]: "Impair",
                [LanguageType.Ar]: "فردي"
            },
            "game.偶数": {
                [LanguageType.CN]: "偶数",
                [LanguageType.EN]: "Even",
                [LanguageType.FR]: "Pair",
                [LanguageType.Ar]: "زوجي"
            },
            "game.撤销下注": {
                [LanguageType.CN]: "撤销下注",
                [LanguageType.EN]: "Undo Bet",
                [LanguageType.FR]: "Annuler le pari",
                [LanguageType.Ar]: "إلغاء الرهان"
            },
            "game.剩余本金": {
                [LanguageType.CN]: "剩余本金",
                [LanguageType.EN]: "Remaining Balance",
                [LanguageType.FR]: "Solde restant",
                [LanguageType.Ar]: "الرصيد المتبقي"
            },
            "game.任意三": {
                [LanguageType.CN]: "任意三",
                [LanguageType.EN]: "Any Three",
                [LanguageType.FR]: "N'importe quelle trois",
                [LanguageType.Ar]: "أي ثلاثة"
            }
            // ... 添加更多文本配置
        };
    }

    // 从本地存储加载语言设置
    private loadLanguageSettings() {
        const savedLanguage = sys.localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            this.currentLanguage = savedLanguage as LanguageType;
        }
    }

    // 切换语言
    public setLanguage(lang: LanguageType): void {
        if (this.currentLanguage !== lang) {
            this.currentLanguage = lang;
            // 保存到本地存储
            sys.localStorage.setItem('selectedLanguage', lang);
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