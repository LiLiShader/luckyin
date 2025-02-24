import Deck from './Deck';
import Player from './Player';
import Betting from './Betting';
import Hand from './Hand';
// import Card, { Rank, Suit } from './Card';
import LanguageManager, { LanguageType } from './LanguageManager';
import HttpRequest from '../scriptHttp/HttpRequest';
import Card from './Card';

const { ccclass, property } = cc._decorator;


/**
 * Game 类负责控制整个游戏的流程
 */
@ccclass
export default class Game extends cc.Component {
    private deck: Deck;  // 牌堆
    private betting: Betting;  // 下注系统

    @property(cc.Prefab)
    pre_card: cc.Prefab = null!;  // 卡牌预制体

    @property(cc.Prefab)
    CardBack: cc.Prefab = null!;  // 用于遮罩庄家第二张牌的卡背

    @property(cc.Node)
    dealerNode: cc.Node = null!;  // 庄家节点

    @property(cc.Node)
    playerNode: cc.Node = null!;  // 玩家节点
    @property(cc.Node)
    playerNodeLeft: cc.Node = null!;  // 玩家分牌左节点
    @property(cc.Node)
    playerNodeRight: cc.Node = null!;  // 玩家分牌右节点

    @property(cc.Label)
    playerScoreLabel: cc.Label = null!;  // 显示玩家分数的 Label

    @property(cc.Label)
    dealerScoreLabel: cc.Label = null!;  // 显示庄家分数的 Label


    @property(cc.Label)
    playerLeftScoreLabel: cc.Label = null!;  // 显示玩家分牌左分数的 Label
    @property(cc.Label)
    playerRightScoreLabel: cc.Label = null!;  // 显示玩家分牌右分数的 Label


    dealer: Player;  // 庄家实例
    player: Player;  // 玩家实例
    playerLeft: Player;  // 玩家分牌左实例
    playerRight: Player;  // 玩家分牌右实例
    playerLeftisOver: boolean=false; //玩家分牌左是否结束
    playerRightisOver: boolean=false; //玩家分牌右是否结束

    nowWho:string="player"; //当前轮到谁
    divideCard:any=null; //分牌的牌值
    divideCardMian:string=""; //分牌的牌面

    @property(cc.Button)
    betButton: cc.Button = null!;       // 投注按钮

    @property(cc.Button)
    hitButton: cc.Button = null!;       // 要牌按钮

    @property(cc.Button)
    standButton: cc.Button = null!;    // 牌按钮

    @property(cc.Button)
    doubleDownButton: cc.Button = null!;  // 双倍下注按钮

    @property(cc.Button)
    divideButton: cc.Button = null!; // “分牌” 按钮

    private isDoubleDown: boolean = false;  // 标记是否双倍下注


    @property(cc.Label)
    currentBetLabel: cc.Label = null!;  // 用于显示当前投注额的 Label

    @property(cc.Button)
    halfBetButton: cc.Button = null!;   // “1/2” 按钮

    @property(cc.Button)
    doubleBetButton: cc.Button = null!; // “2x” 按钮

    @property(cc.Button)
    insuranceButton: cc.Button = null!; // “买保险” 按钮

    @property(cc.Button)
    noInsuranceButton: cc.Button = null!; // “不买保险” 按钮


    private currentBet: number = 0.00;  // 当前投注额，初始为 0.00
    private insuranceBet: number = 0.00; // 保险金额
    private player21: boolean=false; // 玩家是否开局为21
    private playerLeft21: boolean=false; // 玩家分牌左是否开局为21
    private playerRight21: boolean=false; // 玩家分牌右是否开局为21
    // token ="tt0476n0x2icejru16p10ufy5695zd5b"
    // time_zone ="Asia/Shanghai"
    recordId=-1
    private saveRecordId(): void {
        cc.sys.localStorage.setItem('blackjack_recordId', this.recordId.toString());
    }
    private loadRecordId(): void {
        const savedId = cc.sys.localStorage.getItem('blackjack_recordId');
        if (savedId !== null) {
            // this.recordId = parseInt(savedId);
            this.recordId = -1
        }
    }
    bankerCardList:any=[]//bet后返回的数组
    playerCardList:any=[]//bet后返回的数组

    isActive=false

    token:string="jm4zl5m97uz99m4sjd8sj9tx0rnv5ns6";
    
    //币种
    currency:number=1;
    currencyName:string="BTC";
    /**
     * 初始化游戏，设置玩家、庄家及牌堆
     */
    onLoad() {
        this.loadRecordId(); // 加载保存的 recordId

        this.deck = new Deck();
        this.betting = new Betting();

        this.dealer = this.dealerNode.getComponent(Player)!;
        this.player = this.playerNode.getComponent(Player)!;
        this.playerLeft = this.playerNodeLeft.getComponent(Player)!;
        this.playerRight = this.playerNodeRight.getComponent(Player)!;

        

        let currentUrl: string = window.location.href;
        console.log("当前游戏的URL:", currentUrl);
        let value = currentUrl.substring(currentUrl.lastIndexOf("=") + 1);
        switch(value){
            case "zh":
                LanguageManager.getInstance().setLanguage(LanguageType.CN);
                break;
            case "en":
                LanguageManager.getInstance().setLanguage(LanguageType.EN);
                break;
            case "ar":
                LanguageManager.getInstance().setLanguage(LanguageType.Ar);
                break;
            case "fr":
                LanguageManager.getInstance().setLanguage(LanguageType.FR);
                break;
            case "jp":
                LanguageManager.getInstance().setLanguage(LanguageType.JP);
                break;
            default:
                LanguageManager.getInstance().setLanguage(LanguageType.EN);
                break;
        }

        this.token = this.getTokenFromUrl(currentUrl);
        this.currency = this.getCurrencyFromUrl(currentUrl);
        this.currencyName=this.getCurrencyNameFromUrl(currentUrl);
        console.log("获取到的token:", this.token);
        console.log("获取到的currency:", this.currency);
        console.log("获取到的currencyName:", this.currencyName);
        HttpRequest.getInstance().token=this.token;

        cc.resources.load("icon/"+this.currencyName,cc.SpriteFrame, (err, spriteFrame) => {
            cc.find("Canvas/UI/BG/NumBG/icon").getComponent(cc.Sprite).spriteFrame=spriteFrame;
        });
        if(this.token==""){
            cc.find("Canvas/NotLoggedIn").active=true;
        }

        // this.startNewRound();  // 启动新一轮游戏
        this.initTextLabel();

        console.log("当前的recordId:", this.recordId);
        if(this.recordId!=-1){
            HttpRequest.getInstance().info(this.recordId).then(response => {
                console.log('获取的响应:', response);
                this.continueGame(response.data.playerCardList,response.data.bankerCardList);
            })
            .catch(error => {
                console.error('处理请求时出错:', error);
                return
            })
        }

        HttpRequest.getInstance().getgameDetail(29).then((res)=>{
            console.log(res);
            this.maxStake=res.data.maxStake;
            this.minStake=res.data.minStake;
        });
    }
    maxStake=100
    minStake=1
    private getTokenFromUrl(url: string): string {
        try {
            // 使用正则表达式匹配token=后面的值，直到遇到&或结束
            const tokenMatch = url.match(/token=([^&]*)/);
            if (tokenMatch && tokenMatch[1]) {
                return tokenMatch[1];
            }
            return '';
        } catch (error) {
            console.error('解析token失败:', error);
            return '';
        }
    }
    private getCurrencyFromUrl(url: string): number {
        try {
            // 使用正则表达式匹配currency=后面的数值
            const currencyMatch = url.match(/currency=(\d+)/);
            if (currencyMatch && currencyMatch[1]) {
                return parseInt(currencyMatch[1]);
            }
            return 1; // 如果没有找到，返回默认值1
        } catch (error) {
            console.error('解析currency失败:', error);
            return 1; // 发生错误时返回默认值1
        }
    }
    private getCurrencyNameFromUrl(url: string): string {
        try {
            const currencyNameMatch = url.match(/currencyName=([^&]*)/);
            if (currencyNameMatch && currencyNameMatch[1]) {
                const value = currencyNameMatch[1];
                // 验证货币名称是否合法（例如：只允许大写字母）
                if (/^[A-Z]+$/.test(value)) {
                    return value;
                }
            }
            return 'BTC';
        } catch (error) {
            console.error('解析 currencyName 失败:', error);
            return 'BTC';
        }
    }
    //继续游戏
    async continueGame(playerCardList:any,bankerCardList:any){
        this.updateButtonStates(false, false, false, false);
        this.playerCardList=playerCardList;
        this.bankerCardList=bankerCardList;
        // 发牌
        for(let i=0;i<this.playerCardList.length;i++){
            await this.player.hand.addCard(new Card(1,this.playerCardList[i].num), this.player.isDealer, this.pre_card);
        }     
        await this.dealer.hand.addCard(new Card(1,this.bankerCardList[0].num), this.dealer.isDealer, this.pre_card);
        await this.dealer.hand.addCard(new Card(0,0), this.dealer.isDealer, this.pre_card);

        // 检查庄家第一张牌是否为 A
        if (this.dealer.hand.cards[0].getValue() === 11&&!this.player.hand.isBlackjack()) {  // 假设 A 的值为 11
            this.showInsuranceOptions();  // 弹出保险选项
        } else {
            this.updateButtonStates(true, true, true, false);  // 启用正常游戏按钮
        }
        this.updateScores();  // 每次发牌后更新分数显示
    }
    /**
     * 开始新一轮游戏，发初始的四张牌
     */
    startNewRound(): void {
        this.isActive=false
        this.playerCardList=[]
        this.bankerCardList=[]
        this.player21=false;
        this.playerLeft21=false;
        this.playerRight21=false;
        this.nowWho="player";
        cc.find("Canvas/playerScoreNode").color=cc.color(47,69,83,255);
        cc.find("Canvas/playerScoreNode/playerScoreLabel").getComponent(cc.Label).string="0";
        cc.find("Canvas/dealerScoreNode/dealerScoreLabel").getComponent(cc.Label).string="0";
        this.playerLeftScoreLabel.node.parent.active=false;
        this.playerRightScoreLabel.node.parent.active=false;
        this.playerScoreLabel.node.parent.active=true;
        // 重置牌堆和手牌
        this.updateBetDisplay();  // 更新显示
        this.dealer.resetHand();
        this.player.resetHand();
        this.playerLeft.resetHand();
        this.playerRight.resetHand();
        this.isDoubleDown = false;  // 重置双倍下注状态
        // 启用操作按钮，包括加倍按钮
        this.updateButtonStates(true, true, true, false);
        // 发牌顺序：玩家两张、庄家一张明牌，再一张暗牌
        
        // this.player.hand.addCard(new Card(Suit["Clubs"], Rank["Ace"]),this.player.isDealer,this.pre_card);

        this.dealCard();
        
        // this.checkBlackjack();  // 检查是否有初始牌的 Blackjack
    }
    // 新增一个类方法
    private async dealCard(): Promise<void> {
        this.updateButtonStates(false, false, false, false);
        let isInsufficient=false;
        //29
        await HttpRequest.getInstance().bet(this.betnum,this.currency,29).then(response => {
            if(response.msg=="insufficient funds"){
                console.log("余额不足")
                cc.find("Canvas/Insufficient Balance").active=true;
                isInsufficient = true;
                return;
            }
            console.log('获取的响应:', response);
            this.playerCardList.push(response.data.playerCardList[0])
            this.playerCardList.push(response.data.playerCardList[1])
            // this.bankerCardList.push(response.data.bankerCardList[0])
            this.bankerCardList=response.data.bankerCardList

            this.recordId=response.data.id
            this.saveRecordId(); // 保存更新后的 recordId
        })
        .catch(error => {
            console.error('处理请求时出错:', error);
            return
        })
        if(isInsufficient){
            return
        }
        // 发牌顺序：玩家两张、庄家一张明牌，再一张暗牌
        await this.player.hand.addCard(new Card(1,this.playerCardList[0].num), this.player.isDealer, this.pre_card);
        await this.player.hand.addCard(new Card(1,this.playerCardList[1].num), this.player.isDealer, this.pre_card);
        await this.dealer.hand.addCard(new Card(1,this.bankerCardList[0].num), this.dealer.isDealer, this.pre_card);
        await this.dealer.hand.addCard(new Card(0,0), this.dealer.isDealer, this.pre_card);

        
        // 遮罩庄家第二张牌
        // const cardBack = cc.instantiate(this.CardBack);
        // cardBack.parent = this.dealerNode.children[1];  // 将 CardBack 设为庄家第二张牌的子节点
        // cardBack.setPosition(0, 0);

        // 检查庄家第一张牌是否为 A
        if (this.dealer.hand.cards[0].getValue() === 11&&!this.player.hand.isBlackjack()) {  // 假设 A 的值为 11
            this.showInsuranceOptions();  // 弹出保险选项
        } else {
            this.updateButtonStates(true, true, true, false);  // 启用正常游戏按钮
        }
        //检查玩家的两张初始手牌Rank数值是否相等
        let one= cc.find("Canvas/Player Node").children[0].getChildByName("Card").getChildByName("Label").getComponent(cc.Label).string
        let twe= cc.find("Canvas/Player Node").children[1].getChildByName("Card").getChildByName("Label").getComponent(cc.Label).string
        if(one===twe){
            this.divideCard=this.player.hand.cards[0].rank;
            this.divideCardMian=one;
            //触发分牌面板
            this.updateButtonStates(true, true, true, false,true);  // 启用正常游戏按钮
        }
        this.updateScores();  // 每次发牌后更新分数显示
    }

    /**
     * 显示保险选项并隐藏其他按钮
     */
    private showInsuranceOptions(): void {
        // 显示“买保险”和“不买保险”按钮
        this.insuranceButton.node.active = true;
        this.noInsuranceButton.node.active = true;

        // 隐藏“要牌”“停牌”“双倍下注”按钮
        this.hitButton.node.active = false;
        this.standButton.node.active = false;
        this.doubleDownButton.node.active = false;
    }
    leftArray:any={}
    rightArray:any={}
    async divide():Promise<void>{
        await HttpRequest.getInstance().divide(this.recordId).then(response => {
            this.leftArray=response.data[1]
            this.rightArray=response.data[0]
            console.log('获取的响应:', response);
        })
        .catch(error => {
            console.error('处理请求时出错:', error);
            return
        })
        console.log(this.leftArray.playerCardList[1].num,this.rightArray.playerCardList[1].num)
        this.playerLeftScoreLabel.node.parent.active=true;
        this.playerRightScoreLabel.node.parent.active=true;
        this.playerScoreLabel.node.parent.active=false;
        this.playerLeftScoreLabel.node.parent.color=cc.color(47,69,83,255);
        this.playerRightScoreLabel.node.parent.color=cc.color(47,69,83,255);
        this.updateButtonStates(false, false, false, false,false);  // 启用正常游戏按钮
        for (let index = cc.find("Canvas/Player Node").childrenCount-1; index >= 0; index--) {
            cc.find("Canvas/Player Node").children[index].parent=null;
        }
        //TODO 分牌逻辑
        //将playerLeft和playerRight手牌设置为player手牌的一半
        await this.playerLeft.hand.addCard(new Card(1, this.divideCard), this.player.isDealer, this.pre_card,"left");
        await this.playerRight.hand.addCard(new Card(1, this.divideCard), this.player.isDealer, this.pre_card,"right");
        await this.playerLeft.hand.addCard(new Card(1,this.leftArray.playerCardList[1].num), this.player.isDealer, this.pre_card,"left");
        await this.playerRight.hand.addCard(new Card(1,this.rightArray.playerCardList[1].num), this.player.isDealer, this.pre_card,"right");
        this.updateButtonStates(true, false, true, false,false);  // 启用正常游戏按钮
        //清空player手牌
        this.player.hand.clear();

        this.nowWho="playerRight";

        this.updateScores();  // 每次发牌后更新分数显示

        this.divideColor();
    }
    divideColor(){
        if(this.nowWho=="playerRight"){
            for (let index = cc.find("Canvas/Player Node right").childrenCount-1; index >= 0; index--) {
                cc.find("Canvas/Player Node right").children[index].getChildByName("Signn").active=true;
                cc.find("Canvas/Player Node right").children[index].getChildByName("Signn").color=cc.color(0,148,255,255);
            }
        }else{
            for (let index = cc.find("Canvas/Player Node right").childrenCount-1; index >= 0; index--) {
                cc.find("Canvas/Player Node right").children[index].getChildByName("Signn").active=false;
            }
            for (let index = cc.find("Canvas/Player Node left").childrenCount-1; index >= 0; index--) {
                cc.find("Canvas/Player Node left").children[index].getChildByName("Signn").active=true;
                cc.find("Canvas/Player Node left").children[index].getChildByName("Signn").color=cc.color(0,148,255,255);
            }
        }
    }
/**
 * 玩家选择“买保险”
 */
async buyInsurance(): Promise<void> {
    await HttpRequest.getInstance().buyInsurance(this.recordId).then(response => {
        this.bankerCardList=response.data.bankerCardList
        // this.dealer.hand.cards[1].suit=response.data.bankerCardList[1].suit
        // this.dealer.hand.cards[1].rank=response.data.bankerCardList[1].num
        console.log('获取的响应:', response,this.dealer.hand.cards[1],response.data.bankerCardList[1]);
    })
    .catch(error => {
        console.error('处理请求时出错:', error);
        return
    })

    this.insuranceBet = this.currentBet / 2;  // 保险金是当前投注额的一半
    this.hideInsuranceOptions();  // 隐藏保险选项

    // 检查庄家是否为 Blackjack
    if (this.dealer.hand.isBlackjack()) {
        // 显示庄家第二张牌
        this.dealerNode.children[1].getChildByName("CardBack").active=false;
        // 庄家是 Blackjack，玩家只输掉保险金
        this.currentBet -= this.insuranceBet;  // 扣除保险金
        this.updateBetDisplay();               // 更新投注额显示
        this.endRound('insurance');            // 特殊结算：只输保险金
    } else {
        // 庄家不是 Blackjack，庄家收走保险金，继续正常游戏
        this.currentBet -= this.insuranceBet;  // 扣除保险金
        this.updateBetDisplay();               // 更新投注额显示
        this.updateButtonStates(true, true, true, false);  // 启用正常游戏按钮
        if(this.player.hand.cards[0].getValue()===this.player.hand.cards[1].getValue()){
            //触发分牌面板
            this.updateButtonStates(true, true, true, false,true);  // 启用正常游戏按钮
        }
    }
    this.updateScores();  // 每次发牌后更新分数显示
}


/**
 * 玩家选择“不买保险”
 */
async noInsurance(): Promise<void> {
    await HttpRequest.getInstance().notBuyInsurance(this.recordId).then(response => {
        this.bankerCardList=response.data.bankerCardList

        // this.bankerCardList.push(response.data.bankerCardList[1])
        // this.dealer.hand.cards[1].suit=response.data.bankerCardList[1].suit
        // this.dealer.hand.cards[1].rank=response.data.bankerCardList[1].num
        console.log('获取的响应:', response);
    })
    .catch(error => {
        console.error('处理请求时出错:', error);
        return
    })
    this.hideInsuranceOptions();  // 隐藏保险选项

    // 检查庄家是否为 Blackjack
    if (this.dealer.hand.isBlackjack()) {
        // 显示庄家第二张牌
        this.dealerNode.children[1].getChildByName("CardBack").active=false;
        // 庄家是 Blackjack，庄家赢得玩家全部赌注
        this.endRound('dealer');  // 庄家胜利
    } else {
        // 庄家不是 Blackjack，继续正常游戏
        this.updateButtonStates(true, true, true, false);  // 启用正常游戏按钮
        if(this.player.hand.cards[0].getValue()===this.player.hand.cards[1].getValue()){
            //触发分牌面板
            this.updateButtonStates(true, true, true, false,true);  // 启用正常游戏按钮
        }
    }
    this.updateScores();  // 每次发牌后更新分数显示
}

/**
 * 隐藏保险选项并恢复正常按钮显示
 */
private hideInsuranceOptions(): void {
    
    // 隐藏“买保险”和“不买保险”按钮
    this.insuranceButton.node.active = false;
    this.noInsuranceButton.node.active = false;

    {
        // 恢复“要牌”“停牌”“双倍下注”按钮显示
        this.hitButton.node.active = true;
        this.standButton.node.active = true;
        this.doubleDownButton.node.active = true;
    }
}

    /**
     * 双倍下注 - 玩家只能抽一张牌并立即进入结算
     */
    async doubleDown(): Promise<void> {
            if (this.isDoubleDown) return;  // 确保双倍下注只能执行一次
    
            this.betting.doubleBet();  // 翻倍下注

            await HttpRequest.getInstance().redouble(this.recordId).then(response => {
                this.playerCardList.push(response.data.playerCardList[2])
                let list=response.data.bankerCardList
                for(let i=1;i<list.length;i++){
                    this.bankerCardList.push(list[i])
                }
                console.log('获取的响应:', response);
            })
            .catch(error => {
                console.error('处理请求时出错:', error);
                return
            })
            
            await this.player.hand.addCard(new Card(this.playerCardList[2].suit,this.playerCardList[2].num), this.player.isDealer, this.pre_card); // 玩家抽一张牌
            this.isDoubleDown = true;  // 设置双倍下注标记
            this.updateScores();  // 每次发牌后更新分数显示
            
            const playerScore = this.player.hand.getScore();

            // 检查玩家是否爆牌
            if (playerScore > 21) {
                this.updateButtonStates(false, false, false, true);  // 禁用所有按钮，只启用“投注”按钮
                this.endRound('dealer');  // 玩家爆牌，庄家胜，直接结束回合
            } else {
                // 玩家没有爆牌，无论分数是否为21，都让庄家进入回合
                this.updateButtonStates(false, false, false, true);  // 禁用所有按钮，只启用“投注”按钮
                this.dealerTurn(null,true);  // 玩家回合结束，庄家抽牌
            }
        }
    /**
     * 投注并重新开始游戏
     */
    placeBet(): void {
        for (let index = cc.find("Canvas/Dealer Node").childrenCount-1; index >= 0; index--) {
            cc.find("Canvas/Dealer Node").children[index].parent=null;
        }
        for (let index = cc.find("Canvas/Player Node").childrenCount-1; index >= 0; index--) {
            cc.find("Canvas/Player Node").children[index].parent=null;
        }
        for (let index = cc.find("Canvas/Player Node left").childrenCount-1; index >= 0; index--) {
            cc.find("Canvas/Player Node left").children[index].parent=null;
        }
        for (let index = cc.find("Canvas/Player Node right").childrenCount-1; index >= 0; index--) {
            cc.find("Canvas/Player Node right").children[index].parent=null;
        }
        this.betting.placeBet(this.currentBet);  // 设置默认下注金额（可以根据需要调整或设置为用户输入值）
        this.startNewRound();       // 启动新一轮游戏
    }

    /**
     * 玩家选择要牌
     * 玩家可以多次要牌，直到爆牌或选择停牌
     */
    async playerHit(): Promise<void> {
        // 禁用加倍按钮，因为玩家已经选择要牌
        this.doubleDownButton.interactable = false;
        this.divideButton.interactable = false;
        await HttpRequest.getInstance().deal(this.recordId).then(response => {
            this.playerCardList.push(response.data.playerCardList[response.data.playerCardList.length-1])
            // this.bankerCardList.push(response.data.bankerCardList[response.data.bankerCardList.length-1])
            this.bankerCardList=response.data.bankerCardList
            console.log('获取的响应:', response);
        })
        .catch(error => {
            console.error('处理请求时出错:', error);
            return
        })

        // 玩家抽一张新牌
        switch (this.nowWho) {
            case "player":
                await this.player.hand.addCard(new Card(this.playerCardList[this.playerCardList.length-1].suit,this.playerCardList[this.playerCardList.length-1].num),this.player.isDealer,this.pre_card);
                break;
            case "playerLeft":
                await this.playerLeft.hand.addCard(new Card(this.playerCardList[this.playerCardList.length-1].suit,this.playerCardList[this.playerCardList.length-1].num),this.player.isDealer,this.pre_card,"left");
                break;
            case "playerRight":
                await this.playerRight.hand.addCard(new Card(this.playerCardList[this.playerCardList.length-1].suit,this.playerCardList[this.playerCardList.length-1].num),this.player.isDealer,this.pre_card,"right");
                break;
            default:
                break;
        }
        this.updateScores();  // 每次发牌后更新分数显示

        console.log(this.nowWho)
        switch (this.nowWho) {
            case "playerLeft":
                const playerLeftScore = this.playerLeft.hand.getScore();
                if (playerLeftScore > 21) {
                    this.playerLeftisOver=true;
                    this.endRound('playerLeftLose',true);
                    //变红
                    this.dealerTurn(null)
                }
                else if (playerLeftScore === 21) {
                    this.playerLeftisOver=true
                    this.endRound('playerLeftWin',true);
                    this.dealerTurn(null);  // 自动进入庄家回合
                }
                break;
            case "playerRight":
                const playerRightScore = this.playerRight.hand.getScore();
                if (playerRightScore > 21) {
                    //变红
                    this.playerRightisOver=true;
                    this.endRound('playerRightLose',true);
                    this.nowWho="playerLeft";
                    this.recordId+=1;
                    this.saveRecordId();
                    this.divideColor();
                }
                else if (playerRightScore === 21) {
                    this.playerRightisOver=true;
                    this.endRound('playerRightWin',true);
                    this.nowWho="playerLeft";  
                    this.recordId+=1;
                    this.saveRecordId();
                    this.divideColor();
                }
                break;
            default:
                const playerScore = this.player.hand.getScore();

                // 如果玩家爆牌（分数大于21），直接结束回合
                if (playerScore > 21) {
                    this.updateButtonStates(false, false, false, true);  // 禁用所有按钮，只启用“投注”按钮
                    this.endRound('dealer');  // 玩家输
                }
                // 如果玩家分数等于 21，进入庄家回合
                else if (playerScore === 21) {
                    this.updateButtonStates(false, false, false, true);  // 禁用所有按钮，只启用“投注”按钮
                    console.log("21")
                    this.dealerTurn(null);  // 自动进入庄家回合
                }
                break;
        }
        
    }
    /**
     * 更新操作按钮的启用状态
     * @param enableHit {boolean} 是否启用“要牌”按钮
     * @param enableDouble {boolean} 是否启用“双倍下注”按钮
     * @param enableStand {boolean} 是否启用“停牌”按钮
     * @param enableBet {boolean} 是否启用“投注”按钮
     */
    private updateButtonStates(enableHit: boolean, enableDouble: boolean, enableStand: boolean, enableBet: boolean,enableDivide:boolean=false): void {
        this.hitButton.interactable = enableHit;
        this.doubleDownButton.interactable = enableDouble;
        this.standButton.interactable = enableStand;
        this.betButton.interactable = enableBet;
        this.divideButton.interactable = enableDivide;
    }
    /**
     * 庄家的要牌逻辑
     * 庄家根据 Blackjack 规则持续要牌，直到满足停牌条件
     */
    iserror=false
    async dealerTurn(any:any,isDouble:boolean=false): Promise<void> {
        let ifError=false;
        if(this.nowWho=="player"||this.nowWho=="playerLeft"){
            if(!isDouble){
                await HttpRequest.getInstance().stop(this.recordId).then(response => {
                    console.log('获取的响应:', response);
                    
                    if(cc.find("Canvas/playerrightScoreNode").active&&response.msg==="order status error"){
                        console.log("order status error")
                        this.recordId--
                        this.dealerTurn(null)
                    }else{
                        // let list=response.data.bankerCardList
                        // for(let i=1;i<list.length;i++){
                        //     this.bankerCardList.push(list[i])
                        // }
        this.bankerCardList=response.data.bankerCardList

                        this.recordId=-1;
                        this.saveRecordId();
                    }
                })
                .catch(error => {
                    console.error('处理请求时出错:', error);
                    ifError=true;
                    return
                })
            }
        }
        if(ifError){
            this.updateButtonStates(false, false, false, true)
            return
        }
        this.luoji()
    }
    async luoji(){
        if(this.nowWho=="player"||this.nowWho=="playerLeft"){
            // 庄家在点数未达标时自动要牌
            this.updateButtonStates(false, false, false, false);  // 禁用所有操作按钮
            // 显示庄家第二张牌
            // await this.flipDealerCard();
    
            this.updateScores(true);  // 每次发牌后更新分数显示
            // while (this.dealer.shouldHit()) {
            //     await this.dealer.hand.addCard(new Card(1,1),this.dealer.isDealer,this.pre_card);
            //     this.updateScores(true);  // 每次抽牌后更新分数显示
            // }
            if(cc.find("Canvas/Dealer Node").children[1]){
                cc.find("Canvas/Dealer Node").children[1].active=false
                cc.find("Canvas/Dealer Node").children[1].parent=null
            } 
            
            console.log(this.bankerCardList)
            for (let index = 1; index < this.bankerCardList.length; index++) {

                await this.dealer.hand.addCard(new Card(this.bankerCardList[index].suit,this.bankerCardList[index].num),this.dealer.isDealer,this.pre_card);  
                this.updateScores(true);  // 每次发牌后更新分数显示
            }   
    
            // 判断庄家和玩家的最终分数来决定游戏结果
            const dealerScore = this.dealer.hand.getScore();
    
            switch (this.nowWho) {
                case "playerLeft":
                    
                    const playerLeftScore = this.playerLeft.hand.getScore();
                    if (!this.playerLeftisOver) {
                        if (dealerScore > 21) {
                            this.endRound('playerLeftWin');
                        } else if (dealerScore > playerLeftScore) {
                            this.endRound('playerLeftLose');
                        } else if (dealerScore < playerLeftScore) {
                            this.endRound('playerLeftWin');
                        } else {
                            this.endRound('playerLeftPush');
                        }
                    }
    
                
                    const playerRightScore = this.playerRight.hand.getScore();
                    if (!this.playerRightisOver) {
                        if (dealerScore > 21) {
                            this.endRound('playerRightWin');
                        } else if (dealerScore > playerRightScore) {
                            this.endRound('playerRightLose');
                        } else if (dealerScore < playerRightScore) {
                            this.endRound('playerRightWin');
                        } else {
                            this.endRound('playerRightPush');
                        }
                    }
                    if(this.playerRightisOver&&this.playerLeftisOver){
                        this.updateButtonStates(false, false, false, true)
                    }
                    break;
    
                default:
                    const playerScore = this.player.hand.getScore();
    
                    if (dealerScore > 21) {
                        // 如果庄家爆牌，玩家胜
                        this.endRound('player');
                    } else if (dealerScore > playerScore) {
                        // 庄家分数更高，庄家胜
                        this.endRound('dealer');
                    } else if (dealerScore < playerScore) {
                        // 玩家分数更高，玩家胜
                        this.endRound('player');
                    } else {
                        // 平局
                        this.endRound('push');
                    }
                    break;
            }
            }else{
                this.nowWho="playerLeft";
                this.recordId+=1;
                this.saveRecordId();
                this.divideColor();
            }
    }
    private async flipDealerCard(): Promise<void> {
        return new Promise((resolve) => {
            cc.tween(this.dealerNode.children[1])
                .to(0.2, { scaleX: 0 })
                .call(() => {
                    this.dealerNode.children[1].getChildByName("CardBack").active = false;
                })
                .to(0.2, { scaleX: 1 })
                .call(() => {
                    resolve(); // 动画完成后解析 Promise
                })
                .start();
        });
    }
    /**
     * 检查是否有 Blackjack
     * 在初始发牌后调用，如果玩家或庄家有 Blackjack 则直接结束游戏
     */
    checkBlackjack(): void {
        // 判断玩家和庄家是否同时拥有 Blackjack
        if (this.player.hand.isBlackjack() && this.dealer.hand.isBlackjack()) {
            this.endRound('push');  // 平局状态
        } else if (this.player.hand.isBlackjack()) {
            this.betting.winBlackjack();  // 玩家 Blackjack 胜利
            this.endRound('player');  // 以玩家胜利结束
        } else if (this.dealer.hand.isBlackjack()) {
            this.betting.lose();  // 玩家失败，庄家胜利
            this.endRound('dealer');
        }
    }
    /**
     * 结束当前回合并计算结果
     * @param result {'player' | 'dealer' | 'push' | 'insurance'} 根据游戏结果进行相应的结算
     */
    endRound(result: 'player' | 'dealer' | 'push' | 'insurance'|'playerLeftWin'|'playerRightWin'|'playerLeftLose'|'playerRightLose'|'playerLeftPush'|'playerRightPush',bujieshu:boolean=false): void {
        if (result === 'player') {
            this.betting.win();  // 玩家赢得正常对局
        } else if (result === 'dealer') {
            this.betting.lose();  // 玩家输掉对局，庄家赢得全部赌注
        } else if (result === 'push') {
            this.betting.push();  // 平局，返还赌注
        } else if (result === 'insurance') {
            // 玩家选择了“买保险”且庄家 Blackjack，玩家只输保险金
            // 不再进一步扣除 `currentBet`
        }

        if (result === 'playerLeftWin') {
            this.betting.winLeft();
        }else if (result === 'playerLeftLose') {
            this.betting.loseLeft();
        }else if (result === 'playerLeftPush') {
            this.betting.pushLeft();
        }
        
        if (result === 'playerRightWin') {
            this.betting.winRight();
        }else if (result === 'playerRightLose') {
            this.betting.loseRight();
        }else if (result === 'playerRightPush') {
            this.betting.pushRight();
        }
        
        // 禁用所有操作按钮，准备下一轮

        if(!bujieshu) {
            this.updateButtonStates(false, false, false, true);
            this.recordId=-1;
            this.saveRecordId();
        }
    }


    /**
     * 更新玩家和庄家的分数显示
     * 在每次抽牌后调用，确保分数显示同步更新
     * @param showFullDealerScore {boolean} 是否显示庄家的完整分数
     */
    async updateScores(showFullDealerScore: boolean = false) {
        // 玩家分数显示：如果是 Blackjack，直接显示 21
        const playerScore = this.player.hand.isBlackjack() ? 21 : this.player.hand.getPossibleScores();

        this.playerScoreLabel.string = `${Array.isArray(playerScore) ? playerScore.join(' , ') : playerScore}`;

        // if(!this.player21 && this.player.hand.isBlackjack()){
        //     this.player21=true
        //     this.dealerTurn(null,true),

        //     this.luoji()
        // }

        // if(!this.player21 && this.player.hand.getPossibleScores()[0]==21){
        //     this.dealerTurn(null,true)
        //     this.player21=true
        //     return
        // }
        if(this.player.hand.isBlackjack()||this.player.hand.getPossibleScores()[0]==21||this.player.hand.getPossibleScores()[1]==21){
            if(this.nowWho=="player"||this.nowWho=="playerLeft"){
                this.updateButtonStates(false, false, false, false);  // 禁用所有操作按钮
                cc.find("Canvas/Dealer Node").children[1].active=false
                cc.find("Canvas/Dealer Node").children[1].parent=null
                
                console.log(this.bankerCardList)
                for (let index = 1; index < this.bankerCardList.length; index++) {

                    await this.dealer.hand.addCard(new Card(this.bankerCardList[index].suit,this.bankerCardList[index].num),this.dealer.isDealer,this.pre_card);  
                    // this.updateScores(true);  // 每次发牌后更新分数显示
                } 
                this.scheduleOnce(()=>{
                    this.dealerScoreLabel.string=this.dealer.hand.getScore()+""
                })
                const dealerScore = this.dealer.hand.getScore();
                switch (this.nowWho) {
                    case "playerLeft":
                        
                        const playerLeftScore = this.playerLeft.hand.getScore();
                        if (!this.playerLeftisOver) {
                            if (dealerScore > 21) {
                                this.endRound('playerLeftWin');
                            } else if (dealerScore > playerLeftScore) {
                                this.endRound('playerLeftLose');
                            } else if (dealerScore < playerLeftScore) {
                                this.endRound('playerLeftWin');
                            } else {
                                this.endRound('playerLeftPush');
                            }
                        }
        
                    
                        const playerRightScore = this.playerRight.hand.getScore();
                        if (!this.playerRightisOver) {
                            if (dealerScore > 21) {
                                this.endRound('playerRightWin');
                            } else if (dealerScore > playerRightScore) {
                                this.endRound('playerRightLose');
                            } else if (dealerScore < playerRightScore) {
                                this.endRound('playerRightWin');
                            } else {
                                this.endRound('playerRightPush');
                            }
                        }
                        if(this.playerRightisOver&&this.playerLeftisOver){
                            this.updateButtonStates(false, false, false, true)
                        }
                        break;
        
                    default:
                        const playerScore = this.player.hand.getScore();
        
                        if (dealerScore > 21) {
                            // 如果庄家爆牌，玩家胜
                            this.endRound('player');
                        } else if (dealerScore > playerScore) {
                            // 庄家分数更高，庄家胜
                            this.endRound('dealer');
                        } else if (dealerScore < playerScore) {
                            // 玩家分数更高，玩家胜
                            this.endRound('player');
                        } else {
                            // 平局
                            this.endRound('push');
                        }
                        break;
                }
            }else{
                this.nowWho="playerLeft";
                this.recordId+=1;
                this.saveRecordId();
                this.divideColor();
            }
        }

        // 玩家分牌左分数显示：如果是 Blackjack，直接显示 21
        const playerLeftScore = this.playerLeft.hand.isBlackjack() ? 21 : this.playerLeft.hand.getPossibleScores();
        this.playerLeftScoreLabel.string = `${Array.isArray(playerLeftScore) ? playerLeftScore.join(' , ') : playerLeftScore}`;
        if(!this.playerLeft21 && this.playerLeft.hand.isBlackjack()){this.nowWho="playerLeft",this.recordId+=1,this.saveRecordId(),this.playerLeft21=true}//
        // 玩家分牌右分数显示：如果是 Blackjack，直接显示 21
        const playerRightScore = this.playerRight.hand.isBlackjack() ? 21 : this.playerRight.hand.getPossibleScores();
        this.playerRightScoreLabel.string = `${Array.isArray(playerRightScore) ? playerRightScore.join(' , ') : playerRightScore}`;
        if(!this.playerRight21 && this.playerRight.hand.isBlackjack()){this.dealerTurn(null),this.playerRight21=true}//
        // 庄家分数显示：如果是 Blackjack，直接显示 21
        const dealerScore = (this.dealer.hand.isBlackjack()&&!this.insuranceButton.node.active)? 21 : (showFullDealerScore ? this.dealer.hand.getPossibleScores() : [this.dealer.hand.cards[0].getValue()]);
        this.dealerScoreLabel.string = `${Array.isArray(dealerScore) ? dealerScore.join(' , ') : dealerScore}`;

        this.divideColor();
    }
    /**
     * 更新投注额显示
     */
    private updateBetDisplay(): void {
        // 将投注额格式化为两位小数显示
        this.currentBetLabel.string = `${this.currentBet.toFixed(2)}`;
        this.betting.placeBet(this.currentBet);  // 设置默认下注金额（可以根据需要调整或设置为用户输入值）
    }

    /**
     * 减半投注额
     */
    halfBet(): void {
        // 只有当投注额大于 0 时才减半
        if (this.currentBet > 0) {
            if(this.currentBet == 0.01) this.currentBet=0.00;
            else this.currentBet /= 2;
            this.updateBetDisplay();  // 更新显示
        }
    }
    /**
     * 翻倍投注额
     */
    doubleBet(): void {
        this.currentBet *= 2;
        if (this.currentBet == 0) this.currentBet=0.01;
        this.updateBetDisplay();  // 更新显示
    }
    // 切换语言方法
    switchLanguage() {
        const currentLang = LanguageManager.getInstance().getCurrentLanguage();
        const nextLang = LanguageManager.getInstance().getNextLanguage(currentLang);
        LanguageManager.getInstance().setLanguage(nextLang);
    }

    betnum:number=0;//下注金额
    @property(cc.Label)
    TEXT_LABEL:cc.Label=null;
    private initTextLabel() {
        const editBox = this.TEXT_LABEL.node.parent.getComponent(cc.EditBox);
        if (editBox) {
            // 添加 TEXT_CHANGED 事件监听
            editBox.node.on('text-changed', (editbox: cc.EditBox) => {
                const text = editbox.string;
                // 允许数字和小数点，但要处理特殊情况
                let numericValue = text.replace(/[^0-9.]/g, '');
                
                // 处理多个小数点的情况，只保留第一个小数点
                const dotIndex = numericValue.indexOf('.');
                if (dotIndex !== -1) {
                    const beforeDot = numericValue.substring(0, dotIndex + 1);
                    const afterDot = numericValue.substring(dotIndex + 1).replace(/\./g, '');
                    numericValue = beforeDot + afterDot;
                }
                
                // 如果第一个字符是小数点，在前面添加0
                if (numericValue.startsWith('.')) {
                    numericValue = '0' + numericValue;
                }
                
                // 转换为数字进行范围检查
                let numberValue = Number(numericValue);
                
                // 限制最小值和最大值
                if (numberValue < this.minStake) {
                    numberValue = this.minStake;
                    numericValue = this.minStake+'';
                } else if (numberValue > this.maxStake) {
                    numberValue = this.maxStake;
                    numericValue = this.maxStake+'';
                }
                
                if (text !== numericValue) {
                    editbox.string = numericValue;
                }
                this.betnum = numberValue;
            
            });
            
            // 设置初始值
            editBox.string = this.minStake+'';
            this.betnum = this.minStake;
        }
    }
    ChengOrChu(event: cc.Event.EventTouch, string: string) {
        let newValue: number;
        
        if (string == "1") {
            // 乘2
            this.betnum = Number(this.TEXT_LABEL.string);
            newValue = this.betnum * 2;
        } else {
            // 除2
            this.betnum = Number(this.TEXT_LABEL.string);
            newValue = Number((this.betnum / 2).toFixed(2)); // 保留两位小数
        }
    
        // 限制最大最小值
        if (newValue < this.minStake) {
            newValue = this.minStake;
        } else if (newValue > this.maxStake) {
            newValue = this.maxStake;
        }
    
        // 更新值
        this.betnum = newValue;
        this.TEXT_LABEL.string = newValue.toString();
    
    }
    newgame(){
        cc.director.loadScene("mainSceneHttp");
    }
    openOrclose(any,str){
        if(str=="1"){
            cc.find("Canvas/Guize").active=true
        }else{
            cc.find("Canvas/Guize").active=false
        }
    }
}
