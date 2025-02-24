import { _decorator, Component, Label } from "cc";
import LanguageManager from "./LanguageManager";

const { ccclass, property } = _decorator;

@ccclass
export default class LanguageLabel extends Component {
    @property
    textKey: string = "";

    private label: Label | null = null;

    onLoad() {
        this.label = this.getComponent(Label);
        // 注册语言变化监听
        LanguageManager.getInstance().addObserver(this.updateText.bind(this));
        // 初始化文本
        this.updateText();
    }

    private updateText() {
        if (this.label && this.textKey) {
            this.label.string = LanguageManager.getInstance().getText(this.textKey);
        }
    }

    onDestroy() {
        // 移除监听
        LanguageManager.getInstance().removeObserver(this.updateText.bind(this));
    }
} 