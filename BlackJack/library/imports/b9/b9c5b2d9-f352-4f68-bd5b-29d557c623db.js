"use strict";
cc._RF.push(module, 'b9c5bLZ81JPaL1bKdVXxiPb', 'Game');
// scripts/Game.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Deck_1 = require("./Deck");
var Player_1 = require("./Player");
var Betting_1 = require("./Betting");
// import Card, { Rank, Suit } from './Card';
var LanguageManager_1 = require("./LanguageManager");
var HttpRequest_1 = require("../scriptHttp/HttpRequest");
var Card_1 = require("./Card");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * Game 类负责控制整个游戏的流程
 */
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pre_card = null; // 卡牌预制体
        _this.CardBack = null; // 用于遮罩庄家第二张牌的卡背
        _this.dealerNode = null; // 庄家节点
        _this.playerNode = null; // 玩家节点
        _this.playerNodeLeft = null; // 玩家分牌左节点
        _this.playerNodeRight = null; // 玩家分牌右节点
        _this.playerScoreLabel = null; // 显示玩家分数的 Label
        _this.dealerScoreLabel = null; // 显示庄家分数的 Label
        _this.playerLeftScoreLabel = null; // 显示玩家分牌左分数的 Label
        _this.playerRightScoreLabel = null; // 显示玩家分牌右分数的 Label
        _this.playerLeftisOver = false; //玩家分牌左是否结束
        _this.playerRightisOver = false; //玩家分牌右是否结束
        _this.nowWho = "player"; //当前轮到谁
        _this.divideCard = null; //分牌的牌值
        _this.divideCardMian = ""; //分牌的牌面
        _this.betButton = null; // 投注按钮
        _this.hitButton = null; // 要牌按钮
        _this.standButton = null; // 牌按钮
        _this.doubleDownButton = null; // 双倍下注按钮
        _this.divideButton = null; // “分牌” 按钮
        _this.isDoubleDown = false; // 标记是否双倍下注
        _this.currentBetLabel = null; // 用于显示当前投注额的 Label
        _this.halfBetButton = null; // “1/2” 按钮
        _this.doubleBetButton = null; // “2x” 按钮
        _this.insuranceButton = null; // “买保险” 按钮
        _this.noInsuranceButton = null; // “不买保险” 按钮
        _this.currentBet = 0.00; // 当前投注额，初始为 0.00
        _this.insuranceBet = 0.00; // 保险金额
        _this.player21 = false; // 玩家是否开局为21
        _this.playerLeft21 = false; // 玩家分牌左是否开局为21
        _this.playerRight21 = false; // 玩家分牌右是否开局为21
        // token ="tt0476n0x2icejru16p10ufy5695zd5b"
        // time_zone ="Asia/Shanghai"
        _this.recordId = -1;
        _this.bankerCardList = []; //bet后返回的数组
        _this.playerCardList = []; //bet后返回的数组
        _this.isActive = false;
        _this.token = "jm4zl5m97uz99m4sjd8sj9tx0rnv5ns6";
        //币种
        _this.currency = 1;
        _this.currencyName = "BTC";
        _this.maxStake = 100;
        _this.minStake = 1;
        _this.leftArray = {};
        _this.rightArray = {};
        /**
         * 庄家的要牌逻辑
         * 庄家根据 Blackjack 规则持续要牌，直到满足停牌条件
         */
        _this.iserror = false;
        _this.betnum = 0; //下注金额
        _this.TEXT_LABEL = null;
        return _this;
    }
    Game.prototype.saveRecordId = function () {
        cc.sys.localStorage.setItem('blackjack_recordId', this.recordId.toString());
    };
    Game.prototype.loadRecordId = function () {
        var savedId = cc.sys.localStorage.getItem('blackjack_recordId');
        if (savedId !== null) {
            // this.recordId = parseInt(savedId);
            this.recordId = -1;
        }
    };
    /**
     * 初始化游戏，设置玩家、庄家及牌堆
     */
    Game.prototype.onLoad = function () {
        var _this = this;
        this.loadRecordId(); // 加载保存的 recordId
        this.deck = new Deck_1.default();
        this.betting = new Betting_1.default();
        this.dealer = this.dealerNode.getComponent(Player_1.default);
        this.player = this.playerNode.getComponent(Player_1.default);
        this.playerLeft = this.playerNodeLeft.getComponent(Player_1.default);
        this.playerRight = this.playerNodeRight.getComponent(Player_1.default);
        var currentUrl = window.location.href;
        console.log("当前游戏的URL:", currentUrl);
        var value = currentUrl.substring(currentUrl.lastIndexOf("=") + 1);
        switch (value) {
            case "zh":
                LanguageManager_1.default.getInstance().setLanguage(LanguageManager_1.LanguageType.CN);
                break;
            case "en":
                LanguageManager_1.default.getInstance().setLanguage(LanguageManager_1.LanguageType.EN);
                break;
            case "ar":
                LanguageManager_1.default.getInstance().setLanguage(LanguageManager_1.LanguageType.Ar);
                break;
            case "fr":
                LanguageManager_1.default.getInstance().setLanguage(LanguageManager_1.LanguageType.FR);
                break;
            case "jp":
                LanguageManager_1.default.getInstance().setLanguage(LanguageManager_1.LanguageType.JP);
                break;
            default:
                LanguageManager_1.default.getInstance().setLanguage(LanguageManager_1.LanguageType.EN);
                break;
        }
        this.token = this.getTokenFromUrl(currentUrl);
        this.currency = this.getCurrencyFromUrl(currentUrl);
        this.currencyName = this.getCurrencyNameFromUrl(currentUrl);
        console.log("获取到的token:", this.token);
        console.log("获取到的currency:", this.currency);
        console.log("获取到的currencyName:", this.currencyName);
        HttpRequest_1.default.getInstance().token = this.token;
        cc.resources.load("icon/" + this.currencyName, cc.SpriteFrame, function (err, spriteFrame) {
            cc.find("Canvas/UI/BG/NumBG/icon").getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        if (this.token == "") {
            cc.find("Canvas/NotLoggedIn").active = true;
        }
        // this.startNewRound();  // 启动新一轮游戏
        this.initTextLabel();
        console.log("当前的recordId:", this.recordId);
        if (this.recordId != -1) {
            HttpRequest_1.default.getInstance().info(this.recordId).then(function (response) {
                console.log('获取的响应:', response);
                _this.continueGame(response.data.playerCardList, response.data.bankerCardList);
            })
                .catch(function (error) {
                console.error('处理请求时出错:', error);
                return;
            });
        }
        HttpRequest_1.default.getInstance().getgameDetail(29).then(function (res) {
            console.log(res);
            _this.maxStake = res.data.maxStake;
            _this.minStake = res.data.minStake;
        });
    };
    Game.prototype.getTokenFromUrl = function (url) {
        try {
            // 使用正则表达式匹配token=后面的值，直到遇到&或结束
            var tokenMatch = url.match(/token=([^&]*)/);
            if (tokenMatch && tokenMatch[1]) {
                return tokenMatch[1];
            }
            return '';
        }
        catch (error) {
            console.error('解析token失败:', error);
            return '';
        }
    };
    Game.prototype.getCurrencyFromUrl = function (url) {
        try {
            // 使用正则表达式匹配currency=后面的数值
            var currencyMatch = url.match(/currency=(\d+)/);
            if (currencyMatch && currencyMatch[1]) {
                return parseInt(currencyMatch[1]);
            }
            return 1; // 如果没有找到，返回默认值1
        }
        catch (error) {
            console.error('解析currency失败:', error);
            return 1; // 发生错误时返回默认值1
        }
    };
    Game.prototype.getCurrencyNameFromUrl = function (url) {
        try {
            var currencyNameMatch = url.match(/currencyName=([^&]*)/);
            if (currencyNameMatch && currencyNameMatch[1]) {
                var value = currencyNameMatch[1];
                // 验证货币名称是否合法（例如：只允许大写字母）
                if (/^[A-Z]+$/.test(value)) {
                    return value;
                }
            }
            return 'BTC';
        }
        catch (error) {
            console.error('解析 currencyName 失败:', error);
            return 'BTC';
        }
    };
    //继续游戏
    Game.prototype.continueGame = function (playerCardList, bankerCardList) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.updateButtonStates(false, false, false, false);
                        this.playerCardList = playerCardList;
                        this.bankerCardList = bankerCardList;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.playerCardList.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.player.hand.addCard(new Card_1.default(1, this.playerCardList[i].num), this.player.isDealer, this.pre_card)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this.dealer.hand.addCard(new Card_1.default(1, this.bankerCardList[0].num), this.dealer.isDealer, this.pre_card)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.dealer.hand.addCard(new Card_1.default(0, 0), this.dealer.isDealer, this.pre_card)];
                    case 6:
                        _a.sent();
                        // 检查庄家第一张牌是否为 A
                        if (this.dealer.hand.cards[0].getValue() === 11 && !this.player.hand.isBlackjack()) { // 假设 A 的值为 11
                            this.showInsuranceOptions(); // 弹出保险选项
                        }
                        else {
                            this.updateButtonStates(true, true, true, false); // 启用正常游戏按钮
                        }
                        this.updateScores(); // 每次发牌后更新分数显示
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 开始新一轮游戏，发初始的四张牌
     */
    Game.prototype.startNewRound = function () {
        this.isActive = false;
        this.playerCardList = [];
        this.bankerCardList = [];
        this.player21 = false;
        this.playerLeft21 = false;
        this.playerRight21 = false;
        this.nowWho = "player";
        cc.find("Canvas/playerScoreNode").color = cc.color(47, 69, 83, 255);
        cc.find("Canvas/playerScoreNode/playerScoreLabel").getComponent(cc.Label).string = "0";
        cc.find("Canvas/dealerScoreNode/dealerScoreLabel").getComponent(cc.Label).string = "0";
        this.playerLeftScoreLabel.node.parent.active = false;
        this.playerRightScoreLabel.node.parent.active = false;
        this.playerScoreLabel.node.parent.active = true;
        // 重置牌堆和手牌
        this.updateBetDisplay(); // 更新显示
        this.dealer.resetHand();
        this.player.resetHand();
        this.playerLeft.resetHand();
        this.playerRight.resetHand();
        this.isDoubleDown = false; // 重置双倍下注状态
        // 启用操作按钮，包括加倍按钮
        this.updateButtonStates(true, true, true, false);
        // 发牌顺序：玩家两张、庄家一张明牌，再一张暗牌
        // this.player.hand.addCard(new Card(Suit["Clubs"], Rank["Ace"]),this.player.isDealer,this.pre_card);
        this.dealCard();
        // this.checkBlackjack();  // 检查是否有初始牌的 Blackjack
    };
    // 新增一个类方法
    Game.prototype.dealCard = function () {
        return __awaiter(this, void 0, Promise, function () {
            var isInsufficient, one, twe;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.updateButtonStates(false, false, false, false);
                        isInsufficient = false;
                        //29
                        return [4 /*yield*/, HttpRequest_1.default.getInstance().bet(this.betnum, this.currency, 29).then(function (response) {
                                if (response.msg == "insufficient funds") {
                                    console.log("余额不足");
                                    cc.find("Canvas/Insufficient Balance").active = true;
                                    isInsufficient = true;
                                    return;
                                }
                                console.log('获取的响应:', response);
                                _this.playerCardList.push(response.data.playerCardList[0]);
                                _this.playerCardList.push(response.data.playerCardList[1]);
                                // this.bankerCardList.push(response.data.bankerCardList[0])
                                _this.bankerCardList = response.data.bankerCardList;
                                _this.recordId = response.data.id;
                                _this.saveRecordId(); // 保存更新后的 recordId
                            })
                                .catch(function (error) {
                                console.error('处理请求时出错:', error);
                                return;
                            })];
                    case 1:
                        //29
                        _a.sent();
                        if (isInsufficient) {
                            return [2 /*return*/];
                        }
                        // 发牌顺序：玩家两张、庄家一张明牌，再一张暗牌
                        return [4 /*yield*/, this.player.hand.addCard(new Card_1.default(1, this.playerCardList[0].num), this.player.isDealer, this.pre_card)];
                    case 2:
                        // 发牌顺序：玩家两张、庄家一张明牌，再一张暗牌
                        _a.sent();
                        return [4 /*yield*/, this.player.hand.addCard(new Card_1.default(1, this.playerCardList[1].num), this.player.isDealer, this.pre_card)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.dealer.hand.addCard(new Card_1.default(1, this.bankerCardList[0].num), this.dealer.isDealer, this.pre_card)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.dealer.hand.addCard(new Card_1.default(0, 0), this.dealer.isDealer, this.pre_card)];
                    case 5:
                        _a.sent();
                        // 遮罩庄家第二张牌
                        // const cardBack = cc.instantiate(this.CardBack);
                        // cardBack.parent = this.dealerNode.children[1];  // 将 CardBack 设为庄家第二张牌的子节点
                        // cardBack.setPosition(0, 0);
                        // 检查庄家第一张牌是否为 A
                        if (this.dealer.hand.cards[0].getValue() === 11 && !this.player.hand.isBlackjack()) { // 假设 A 的值为 11
                            this.showInsuranceOptions(); // 弹出保险选项
                        }
                        else {
                            this.updateButtonStates(true, true, true, false); // 启用正常游戏按钮
                        }
                        one = cc.find("Canvas/Player Node").children[0].getChildByName("Card").getChildByName("Label").getComponent(cc.Label).string;
                        twe = cc.find("Canvas/Player Node").children[1].getChildByName("Card").getChildByName("Label").getComponent(cc.Label).string;
                        if (one === twe) {
                            this.divideCard = this.player.hand.cards[0].rank;
                            this.divideCardMian = one;
                            //触发分牌面板
                            this.updateButtonStates(true, true, true, false, true); // 启用正常游戏按钮
                        }
                        this.updateScores(); // 每次发牌后更新分数显示
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 显示保险选项并隐藏其他按钮
     */
    Game.prototype.showInsuranceOptions = function () {
        // 显示“买保险”和“不买保险”按钮
        this.insuranceButton.node.active = true;
        this.noInsuranceButton.node.active = true;
        // 隐藏“要牌”“停牌”“双倍下注”按钮
        this.hitButton.node.active = false;
        this.standButton.node.active = false;
        this.doubleDownButton.node.active = false;
    };
    Game.prototype.divide = function () {
        return __awaiter(this, void 0, Promise, function () {
            var index;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, HttpRequest_1.default.getInstance().divide(this.recordId).then(function (response) {
                            _this.leftArray = response.data[1];
                            _this.rightArray = response.data[0];
                            console.log('获取的响应:', response);
                        })
                            .catch(function (error) {
                            console.error('处理请求时出错:', error);
                            return;
                        })];
                    case 1:
                        _a.sent();
                        console.log(this.leftArray.playerCardList[1].num, this.rightArray.playerCardList[1].num);
                        this.playerLeftScoreLabel.node.parent.active = true;
                        this.playerRightScoreLabel.node.parent.active = true;
                        this.playerScoreLabel.node.parent.active = false;
                        this.playerLeftScoreLabel.node.parent.color = cc.color(47, 69, 83, 255);
                        this.playerRightScoreLabel.node.parent.color = cc.color(47, 69, 83, 255);
                        this.updateButtonStates(false, false, false, false, false); // 启用正常游戏按钮
                        for (index = cc.find("Canvas/Player Node").childrenCount - 1; index >= 0; index--) {
                            cc.find("Canvas/Player Node").children[index].parent = null;
                        }
                        //TODO 分牌逻辑
                        //将playerLeft和playerRight手牌设置为player手牌的一半
                        return [4 /*yield*/, this.playerLeft.hand.addCard(new Card_1.default(1, this.divideCard), this.player.isDealer, this.pre_card, "left")];
                    case 2:
                        //TODO 分牌逻辑
                        //将playerLeft和playerRight手牌设置为player手牌的一半
                        _a.sent();
                        return [4 /*yield*/, this.playerRight.hand.addCard(new Card_1.default(1, this.divideCard), this.player.isDealer, this.pre_card, "right")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.playerLeft.hand.addCard(new Card_1.default(1, this.leftArray.playerCardList[1].num), this.player.isDealer, this.pre_card, "left")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.playerRight.hand.addCard(new Card_1.default(1, this.rightArray.playerCardList[1].num), this.player.isDealer, this.pre_card, "right")];
                    case 5:
                        _a.sent();
                        this.updateButtonStates(true, false, true, false, false); // 启用正常游戏按钮
                        //清空player手牌
                        this.player.hand.clear();
                        this.nowWho = "playerRight";
                        this.updateScores(); // 每次发牌后更新分数显示
                        this.divideColor();
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.divideColor = function () {
        if (this.nowWho == "playerRight") {
            for (var index = cc.find("Canvas/Player Node right").childrenCount - 1; index >= 0; index--) {
                cc.find("Canvas/Player Node right").children[index].getChildByName("Signn").active = true;
                cc.find("Canvas/Player Node right").children[index].getChildByName("Signn").color = cc.color(0, 148, 255, 255);
            }
        }
        else {
            for (var index = cc.find("Canvas/Player Node right").childrenCount - 1; index >= 0; index--) {
                cc.find("Canvas/Player Node right").children[index].getChildByName("Signn").active = false;
            }
            for (var index = cc.find("Canvas/Player Node left").childrenCount - 1; index >= 0; index--) {
                cc.find("Canvas/Player Node left").children[index].getChildByName("Signn").active = true;
                cc.find("Canvas/Player Node left").children[index].getChildByName("Signn").color = cc.color(0, 148, 255, 255);
            }
        }
    };
    /**
     * 玩家选择“买保险”
     */
    Game.prototype.buyInsurance = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, HttpRequest_1.default.getInstance().buyInsurance(this.recordId).then(function (response) {
                            _this.bankerCardList = response.data.bankerCardList;
                            // this.dealer.hand.cards[1].suit=response.data.bankerCardList[1].suit
                            // this.dealer.hand.cards[1].rank=response.data.bankerCardList[1].num
                            console.log('获取的响应:', response, _this.dealer.hand.cards[1], response.data.bankerCardList[1]);
                        })
                            .catch(function (error) {
                            console.error('处理请求时出错:', error);
                            return;
                        })];
                    case 1:
                        _a.sent();
                        this.insuranceBet = this.currentBet / 2; // 保险金是当前投注额的一半
                        this.hideInsuranceOptions(); // 隐藏保险选项
                        // 检查庄家是否为 Blackjack
                        if (this.dealer.hand.isBlackjack()) {
                            // 显示庄家第二张牌
                            this.dealerNode.children[1].getChildByName("CardBack").active = false;
                            // 庄家是 Blackjack，玩家只输掉保险金
                            this.currentBet -= this.insuranceBet; // 扣除保险金
                            this.updateBetDisplay(); // 更新投注额显示
                            this.endRound('insurance'); // 特殊结算：只输保险金
                        }
                        else {
                            // 庄家不是 Blackjack，庄家收走保险金，继续正常游戏
                            this.currentBet -= this.insuranceBet; // 扣除保险金
                            this.updateBetDisplay(); // 更新投注额显示
                            this.updateButtonStates(true, true, true, false); // 启用正常游戏按钮
                            if (this.player.hand.cards[0].getValue() === this.player.hand.cards[1].getValue()) {
                                //触发分牌面板
                                this.updateButtonStates(true, true, true, false, true); // 启用正常游戏按钮
                            }
                        }
                        this.updateScores(); // 每次发牌后更新分数显示
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 玩家选择“不买保险”
     */
    Game.prototype.noInsurance = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, HttpRequest_1.default.getInstance().notBuyInsurance(this.recordId).then(function (response) {
                            _this.bankerCardList = response.data.bankerCardList;
                            // this.bankerCardList.push(response.data.bankerCardList[1])
                            // this.dealer.hand.cards[1].suit=response.data.bankerCardList[1].suit
                            // this.dealer.hand.cards[1].rank=response.data.bankerCardList[1].num
                            console.log('获取的响应:', response);
                        })
                            .catch(function (error) {
                            console.error('处理请求时出错:', error);
                            return;
                        })];
                    case 1:
                        _a.sent();
                        this.hideInsuranceOptions(); // 隐藏保险选项
                        // 检查庄家是否为 Blackjack
                        if (this.dealer.hand.isBlackjack()) {
                            // 显示庄家第二张牌
                            this.dealerNode.children[1].getChildByName("CardBack").active = false;
                            // 庄家是 Blackjack，庄家赢得玩家全部赌注
                            this.endRound('dealer'); // 庄家胜利
                        }
                        else {
                            // 庄家不是 Blackjack，继续正常游戏
                            this.updateButtonStates(true, true, true, false); // 启用正常游戏按钮
                            if (this.player.hand.cards[0].getValue() === this.player.hand.cards[1].getValue()) {
                                //触发分牌面板
                                this.updateButtonStates(true, true, true, false, true); // 启用正常游戏按钮
                            }
                        }
                        this.updateScores(); // 每次发牌后更新分数显示
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 隐藏保险选项并恢复正常按钮显示
     */
    Game.prototype.hideInsuranceOptions = function () {
        // 隐藏“买保险”和“不买保险”按钮
        this.insuranceButton.node.active = false;
        this.noInsuranceButton.node.active = false;
        {
            // 恢复“要牌”“停牌”“双倍下注”按钮显示
            this.hitButton.node.active = true;
            this.standButton.node.active = true;
            this.doubleDownButton.node.active = true;
        }
    };
    /**
     * 双倍下注 - 玩家只能抽一张牌并立即进入结算
     */
    Game.prototype.doubleDown = function () {
        return __awaiter(this, void 0, Promise, function () {
            var playerScore;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isDoubleDown)
                            return [2 /*return*/]; // 确保双倍下注只能执行一次
                        this.betting.doubleBet(); // 翻倍下注
                        return [4 /*yield*/, HttpRequest_1.default.getInstance().redouble(this.recordId).then(function (response) {
                                _this.playerCardList.push(response.data.playerCardList[2]);
                                var list = response.data.bankerCardList;
                                for (var i = 1; i < list.length; i++) {
                                    _this.bankerCardList.push(list[i]);
                                }
                                console.log('获取的响应:', response);
                            })
                                .catch(function (error) {
                                console.error('处理请求时出错:', error);
                                return;
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.player.hand.addCard(new Card_1.default(this.playerCardList[2].suit, this.playerCardList[2].num), this.player.isDealer, this.pre_card)];
                    case 2:
                        _a.sent(); // 玩家抽一张牌
                        this.isDoubleDown = true; // 设置双倍下注标记
                        this.updateScores(); // 每次发牌后更新分数显示
                        playerScore = this.player.hand.getScore();
                        // 检查玩家是否爆牌
                        if (playerScore > 21) {
                            this.updateButtonStates(false, false, false, true); // 禁用所有按钮，只启用“投注”按钮
                            this.endRound('dealer'); // 玩家爆牌，庄家胜，直接结束回合
                        }
                        else {
                            // 玩家没有爆牌，无论分数是否为21，都让庄家进入回合
                            this.updateButtonStates(false, false, false, true); // 禁用所有按钮，只启用“投注”按钮
                            this.dealerTurn(null, true); // 玩家回合结束，庄家抽牌
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 投注并重新开始游戏
     */
    Game.prototype.placeBet = function () {
        for (var index = cc.find("Canvas/Dealer Node").childrenCount - 1; index >= 0; index--) {
            cc.find("Canvas/Dealer Node").children[index].parent = null;
        }
        for (var index = cc.find("Canvas/Player Node").childrenCount - 1; index >= 0; index--) {
            cc.find("Canvas/Player Node").children[index].parent = null;
        }
        for (var index = cc.find("Canvas/Player Node left").childrenCount - 1; index >= 0; index--) {
            cc.find("Canvas/Player Node left").children[index].parent = null;
        }
        for (var index = cc.find("Canvas/Player Node right").childrenCount - 1; index >= 0; index--) {
            cc.find("Canvas/Player Node right").children[index].parent = null;
        }
        this.betting.placeBet(this.currentBet); // 设置默认下注金额（可以根据需要调整或设置为用户输入值）
        this.startNewRound(); // 启动新一轮游戏
    };
    /**
     * 玩家选择要牌
     * 玩家可以多次要牌，直到爆牌或选择停牌
     */
    Game.prototype.playerHit = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a, playerLeftScore, playerRightScore, playerScore;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // 禁用加倍按钮，因为玩家已经选择要牌
                        this.doubleDownButton.interactable = false;
                        this.divideButton.interactable = false;
                        return [4 /*yield*/, HttpRequest_1.default.getInstance().deal(this.recordId).then(function (response) {
                                _this.playerCardList.push(response.data.playerCardList[response.data.playerCardList.length - 1]);
                                // this.bankerCardList.push(response.data.bankerCardList[response.data.bankerCardList.length-1])
                                _this.bankerCardList = response.data.bankerCardList;
                                console.log('获取的响应:', response);
                            })
                                .catch(function (error) {
                                console.error('处理请求时出错:', error);
                                return;
                            })
                            // 玩家抽一张新牌
                        ];
                    case 1:
                        _b.sent();
                        _a = this.nowWho;
                        switch (_a) {
                            case "player": return [3 /*break*/, 2];
                            case "playerLeft": return [3 /*break*/, 4];
                            case "playerRight": return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 8];
                    case 2: return [4 /*yield*/, this.player.hand.addCard(new Card_1.default(this.playerCardList[this.playerCardList.length - 1].suit, this.playerCardList[this.playerCardList.length - 1].num), this.player.isDealer, this.pre_card)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 4: return [4 /*yield*/, this.playerLeft.hand.addCard(new Card_1.default(this.playerCardList[this.playerCardList.length - 1].suit, this.playerCardList[this.playerCardList.length - 1].num), this.player.isDealer, this.pre_card, "left")];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 6: return [4 /*yield*/, this.playerRight.hand.addCard(new Card_1.default(this.playerCardList[this.playerCardList.length - 1].suit, this.playerCardList[this.playerCardList.length - 1].num), this.player.isDealer, this.pre_card, "right")];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 8: return [3 /*break*/, 9];
                    case 9:
                        this.updateScores(); // 每次发牌后更新分数显示
                        console.log(this.nowWho);
                        switch (this.nowWho) {
                            case "playerLeft":
                                playerLeftScore = this.playerLeft.hand.getScore();
                                if (playerLeftScore > 21) {
                                    this.playerLeftisOver = true;
                                    this.endRound('playerLeftLose', true);
                                    //变红
                                    this.dealerTurn(null);
                                }
                                else if (playerLeftScore === 21) {
                                    this.playerLeftisOver = true;
                                    this.endRound('playerLeftWin', true);
                                    this.dealerTurn(null); // 自动进入庄家回合
                                }
                                break;
                            case "playerRight":
                                playerRightScore = this.playerRight.hand.getScore();
                                if (playerRightScore > 21) {
                                    //变红
                                    this.playerRightisOver = true;
                                    this.endRound('playerRightLose', true);
                                    this.nowWho = "playerLeft";
                                    this.recordId += 1;
                                    this.saveRecordId();
                                    this.divideColor();
                                }
                                else if (playerRightScore === 21) {
                                    this.playerRightisOver = true;
                                    this.endRound('playerRightWin', true);
                                    this.nowWho = "playerLeft";
                                    this.recordId += 1;
                                    this.saveRecordId();
                                    this.divideColor();
                                }
                                break;
                            default:
                                playerScore = this.player.hand.getScore();
                                // 如果玩家爆牌（分数大于21），直接结束回合
                                if (playerScore > 21) {
                                    this.updateButtonStates(false, false, false, true); // 禁用所有按钮，只启用“投注”按钮
                                    this.endRound('dealer'); // 玩家输
                                }
                                // 如果玩家分数等于 21，进入庄家回合
                                else if (playerScore === 21) {
                                    this.updateButtonStates(false, false, false, true); // 禁用所有按钮，只启用“投注”按钮
                                    console.log("21");
                                    this.dealerTurn(null); // 自动进入庄家回合
                                }
                                break;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 更新操作按钮的启用状态
     * @param enableHit {boolean} 是否启用“要牌”按钮
     * @param enableDouble {boolean} 是否启用“双倍下注”按钮
     * @param enableStand {boolean} 是否启用“停牌”按钮
     * @param enableBet {boolean} 是否启用“投注”按钮
     */
    Game.prototype.updateButtonStates = function (enableHit, enableDouble, enableStand, enableBet, enableDivide) {
        if (enableDivide === void 0) { enableDivide = false; }
        this.hitButton.interactable = enableHit;
        this.doubleDownButton.interactable = enableDouble;
        this.standButton.interactable = enableStand;
        this.betButton.interactable = enableBet;
        this.divideButton.interactable = enableDivide;
    };
    Game.prototype.dealerTurn = function (any, isDouble) {
        if (isDouble === void 0) { isDouble = false; }
        return __awaiter(this, void 0, Promise, function () {
            var ifError;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ifError = false;
                        if (!(this.nowWho == "player" || this.nowWho == "playerLeft")) return [3 /*break*/, 2];
                        if (!!isDouble) return [3 /*break*/, 2];
                        return [4 /*yield*/, HttpRequest_1.default.getInstance().stop(this.recordId).then(function (response) {
                                console.log('获取的响应:', response);
                                if (cc.find("Canvas/playerrightScoreNode").active && response.msg === "order status error") {
                                    console.log("order status error");
                                    _this.recordId--;
                                    _this.dealerTurn(null);
                                }
                                else {
                                    // let list=response.data.bankerCardList
                                    // for(let i=1;i<list.length;i++){
                                    //     this.bankerCardList.push(list[i])
                                    // }
                                    _this.bankerCardList = response.data.bankerCardList;
                                    _this.recordId = -1;
                                    _this.saveRecordId();
                                }
                            })
                                .catch(function (error) {
                                console.error('处理请求时出错:', error);
                                ifError = true;
                                return;
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (ifError) {
                            this.updateButtonStates(false, false, false, true);
                            return [2 /*return*/];
                        }
                        this.luoji();
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.luoji = function () {
        return __awaiter(this, void 0, void 0, function () {
            var index, dealerScore, playerLeftScore, playerRightScore, playerScore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.nowWho == "player" || this.nowWho == "playerLeft")) return [3 /*break*/, 5];
                        // 庄家在点数未达标时自动要牌
                        this.updateButtonStates(false, false, false, false); // 禁用所有操作按钮
                        // 显示庄家第二张牌
                        // await this.flipDealerCard();
                        this.updateScores(true); // 每次发牌后更新分数显示
                        // while (this.dealer.shouldHit()) {
                        //     await this.dealer.hand.addCard(new Card(1,1),this.dealer.isDealer,this.pre_card);
                        //     this.updateScores(true);  // 每次抽牌后更新分数显示
                        // }
                        if (cc.find("Canvas/Dealer Node").children[1]) {
                            cc.find("Canvas/Dealer Node").children[1].active = false;
                            cc.find("Canvas/Dealer Node").children[1].parent = null;
                        }
                        console.log(this.bankerCardList);
                        index = 1;
                        _a.label = 1;
                    case 1:
                        if (!(index < this.bankerCardList.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.dealer.hand.addCard(new Card_1.default(this.bankerCardList[index].suit, this.bankerCardList[index].num), this.dealer.isDealer, this.pre_card)];
                    case 2:
                        _a.sent();
                        this.updateScores(true); // 每次发牌后更新分数显示
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4:
                        dealerScore = this.dealer.hand.getScore();
                        switch (this.nowWho) {
                            case "playerLeft":
                                playerLeftScore = this.playerLeft.hand.getScore();
                                if (!this.playerLeftisOver) {
                                    if (dealerScore > 21) {
                                        this.endRound('playerLeftWin');
                                    }
                                    else if (dealerScore > playerLeftScore) {
                                        this.endRound('playerLeftLose');
                                    }
                                    else if (dealerScore < playerLeftScore) {
                                        this.endRound('playerLeftWin');
                                    }
                                    else {
                                        this.endRound('playerLeftPush');
                                    }
                                }
                                playerRightScore = this.playerRight.hand.getScore();
                                if (!this.playerRightisOver) {
                                    if (dealerScore > 21) {
                                        this.endRound('playerRightWin');
                                    }
                                    else if (dealerScore > playerRightScore) {
                                        this.endRound('playerRightLose');
                                    }
                                    else if (dealerScore < playerRightScore) {
                                        this.endRound('playerRightWin');
                                    }
                                    else {
                                        this.endRound('playerRightPush');
                                    }
                                }
                                if (this.playerRightisOver && this.playerLeftisOver) {
                                    this.updateButtonStates(false, false, false, true);
                                }
                                break;
                            default:
                                playerScore = this.player.hand.getScore();
                                if (dealerScore > 21) {
                                    // 如果庄家爆牌，玩家胜
                                    this.endRound('player');
                                }
                                else if (dealerScore > playerScore) {
                                    // 庄家分数更高，庄家胜
                                    this.endRound('dealer');
                                }
                                else if (dealerScore < playerScore) {
                                    // 玩家分数更高，玩家胜
                                    this.endRound('player');
                                }
                                else {
                                    // 平局
                                    this.endRound('push');
                                }
                                break;
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        this.nowWho = "playerLeft";
                        this.recordId += 1;
                        this.saveRecordId();
                        this.divideColor();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.flipDealerCard = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        cc.tween(_this.dealerNode.children[1])
                            .to(0.2, { scaleX: 0 })
                            .call(function () {
                            _this.dealerNode.children[1].getChildByName("CardBack").active = false;
                        })
                            .to(0.2, { scaleX: 1 })
                            .call(function () {
                            resolve(); // 动画完成后解析 Promise
                        })
                            .start();
                    })];
            });
        });
    };
    /**
     * 检查是否有 Blackjack
     * 在初始发牌后调用，如果玩家或庄家有 Blackjack 则直接结束游戏
     */
    Game.prototype.checkBlackjack = function () {
        // 判断玩家和庄家是否同时拥有 Blackjack
        if (this.player.hand.isBlackjack() && this.dealer.hand.isBlackjack()) {
            this.endRound('push'); // 平局状态
        }
        else if (this.player.hand.isBlackjack()) {
            this.betting.winBlackjack(); // 玩家 Blackjack 胜利
            this.endRound('player'); // 以玩家胜利结束
        }
        else if (this.dealer.hand.isBlackjack()) {
            this.betting.lose(); // 玩家失败，庄家胜利
            this.endRound('dealer');
        }
    };
    /**
     * 结束当前回合并计算结果
     * @param result {'player' | 'dealer' | 'push' | 'insurance'} 根据游戏结果进行相应的结算
     */
    Game.prototype.endRound = function (result, bujieshu) {
        if (bujieshu === void 0) { bujieshu = false; }
        if (result === 'player') {
            this.betting.win(); // 玩家赢得正常对局
        }
        else if (result === 'dealer') {
            this.betting.lose(); // 玩家输掉对局，庄家赢得全部赌注
        }
        else if (result === 'push') {
            this.betting.push(); // 平局，返还赌注
        }
        else if (result === 'insurance') {
            // 玩家选择了“买保险”且庄家 Blackjack，玩家只输保险金
            // 不再进一步扣除 `currentBet`
        }
        if (result === 'playerLeftWin') {
            this.betting.winLeft();
        }
        else if (result === 'playerLeftLose') {
            this.betting.loseLeft();
        }
        else if (result === 'playerLeftPush') {
            this.betting.pushLeft();
        }
        if (result === 'playerRightWin') {
            this.betting.winRight();
        }
        else if (result === 'playerRightLose') {
            this.betting.loseRight();
        }
        else if (result === 'playerRightPush') {
            this.betting.pushRight();
        }
        // 禁用所有操作按钮，准备下一轮
        if (!bujieshu) {
            this.updateButtonStates(false, false, false, true);
            this.recordId = -1;
            this.saveRecordId();
        }
    };
    /**
     * 更新玩家和庄家的分数显示
     * 在每次抽牌后调用，确保分数显示同步更新
     * @param showFullDealerScore {boolean} 是否显示庄家的完整分数
     */
    Game.prototype.updateScores = function (showFullDealerScore) {
        if (showFullDealerScore === void 0) { showFullDealerScore = false; }
        return __awaiter(this, void 0, void 0, function () {
            var playerScore, index, dealerScore_1, playerLeftScore_1, playerRightScore_1, playerScore_1, playerLeftScore, playerRightScore, dealerScore;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        playerScore = this.player.hand.isBlackjack() ? 21 : this.player.hand.getPossibleScores();
                        this.playerScoreLabel.string = "" + (Array.isArray(playerScore) ? playerScore.join(' , ') : playerScore);
                        if (!(this.player.hand.isBlackjack() || this.player.hand.getPossibleScores()[0] == 21 || this.player.hand.getPossibleScores()[1] == 21)) return [3 /*break*/, 6];
                        if (!(this.nowWho == "player" || this.nowWho == "playerLeft")) return [3 /*break*/, 5];
                        this.updateButtonStates(false, false, false, false); // 禁用所有操作按钮
                        cc.find("Canvas/Dealer Node").children[1].active = false;
                        cc.find("Canvas/Dealer Node").children[1].parent = null;
                        console.log(this.bankerCardList);
                        index = 1;
                        _a.label = 1;
                    case 1:
                        if (!(index < this.bankerCardList.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.dealer.hand.addCard(new Card_1.default(this.bankerCardList[index].suit, this.bankerCardList[index].num), this.dealer.isDealer, this.pre_card)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.scheduleOnce(function () {
                            _this.dealerScoreLabel.string = _this.dealer.hand.getScore() + "";
                        });
                        dealerScore_1 = this.dealer.hand.getScore();
                        switch (this.nowWho) {
                            case "playerLeft":
                                playerLeftScore_1 = this.playerLeft.hand.getScore();
                                if (!this.playerLeftisOver) {
                                    if (dealerScore_1 > 21) {
                                        this.endRound('playerLeftWin');
                                    }
                                    else if (dealerScore_1 > playerLeftScore_1) {
                                        this.endRound('playerLeftLose');
                                    }
                                    else if (dealerScore_1 < playerLeftScore_1) {
                                        this.endRound('playerLeftWin');
                                    }
                                    else {
                                        this.endRound('playerLeftPush');
                                    }
                                }
                                playerRightScore_1 = this.playerRight.hand.getScore();
                                if (!this.playerRightisOver) {
                                    if (dealerScore_1 > 21) {
                                        this.endRound('playerRightWin');
                                    }
                                    else if (dealerScore_1 > playerRightScore_1) {
                                        this.endRound('playerRightLose');
                                    }
                                    else if (dealerScore_1 < playerRightScore_1) {
                                        this.endRound('playerRightWin');
                                    }
                                    else {
                                        this.endRound('playerRightPush');
                                    }
                                }
                                if (this.playerRightisOver && this.playerLeftisOver) {
                                    this.updateButtonStates(false, false, false, true);
                                }
                                break;
                            default:
                                playerScore_1 = this.player.hand.getScore();
                                if (dealerScore_1 > 21) {
                                    // 如果庄家爆牌，玩家胜
                                    this.endRound('player');
                                }
                                else if (dealerScore_1 > playerScore_1) {
                                    // 庄家分数更高，庄家胜
                                    this.endRound('dealer');
                                }
                                else if (dealerScore_1 < playerScore_1) {
                                    // 玩家分数更高，玩家胜
                                    this.endRound('player');
                                }
                                else {
                                    // 平局
                                    this.endRound('push');
                                }
                                break;
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        this.nowWho = "playerLeft";
                        this.recordId += 1;
                        this.saveRecordId();
                        this.divideColor();
                        _a.label = 6;
                    case 6:
                        playerLeftScore = this.playerLeft.hand.isBlackjack() ? 21 : this.playerLeft.hand.getPossibleScores();
                        this.playerLeftScoreLabel.string = "" + (Array.isArray(playerLeftScore) ? playerLeftScore.join(' , ') : playerLeftScore);
                        if (!this.playerLeft21 && this.playerLeft.hand.isBlackjack()) {
                            this.nowWho = "playerLeft", this.recordId += 1, this.saveRecordId(), this.playerLeft21 = true;
                        } //
                        playerRightScore = this.playerRight.hand.isBlackjack() ? 21 : this.playerRight.hand.getPossibleScores();
                        this.playerRightScoreLabel.string = "" + (Array.isArray(playerRightScore) ? playerRightScore.join(' , ') : playerRightScore);
                        if (!this.playerRight21 && this.playerRight.hand.isBlackjack()) {
                            this.dealerTurn(null), this.playerRight21 = true;
                        } //
                        dealerScore = (this.dealer.hand.isBlackjack() && !this.insuranceButton.node.active) ? 21 : (showFullDealerScore ? this.dealer.hand.getPossibleScores() : [this.dealer.hand.cards[0].getValue()]);
                        this.dealerScoreLabel.string = "" + (Array.isArray(dealerScore) ? dealerScore.join(' , ') : dealerScore);
                        this.divideColor();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 更新投注额显示
     */
    Game.prototype.updateBetDisplay = function () {
        // 将投注额格式化为两位小数显示
        this.currentBetLabel.string = "" + this.currentBet.toFixed(2);
        this.betting.placeBet(this.currentBet); // 设置默认下注金额（可以根据需要调整或设置为用户输入值）
    };
    /**
     * 减半投注额
     */
    Game.prototype.halfBet = function () {
        // 只有当投注额大于 0 时才减半
        if (this.currentBet > 0) {
            if (this.currentBet == 0.01)
                this.currentBet = 0.00;
            else
                this.currentBet /= 2;
            this.updateBetDisplay(); // 更新显示
        }
    };
    /**
     * 翻倍投注额
     */
    Game.prototype.doubleBet = function () {
        this.currentBet *= 2;
        if (this.currentBet == 0)
            this.currentBet = 0.01;
        this.updateBetDisplay(); // 更新显示
    };
    // 切换语言方法
    Game.prototype.switchLanguage = function () {
        var currentLang = LanguageManager_1.default.getInstance().getCurrentLanguage();
        var nextLang = LanguageManager_1.default.getInstance().getNextLanguage(currentLang);
        LanguageManager_1.default.getInstance().setLanguage(nextLang);
    };
    Game.prototype.initTextLabel = function () {
        var _this = this;
        var editBox = this.TEXT_LABEL.node.parent.getComponent(cc.EditBox);
        if (editBox) {
            // 添加 TEXT_CHANGED 事件监听
            editBox.node.on('text-changed', function (editbox) {
                var text = editbox.string;
                // 允许数字和小数点，但要处理特殊情况
                var numericValue = text.replace(/[^0-9.]/g, '');
                // 处理多个小数点的情况，只保留第一个小数点
                var dotIndex = numericValue.indexOf('.');
                if (dotIndex !== -1) {
                    var beforeDot = numericValue.substring(0, dotIndex + 1);
                    var afterDot = numericValue.substring(dotIndex + 1).replace(/\./g, '');
                    numericValue = beforeDot + afterDot;
                }
                // 如果第一个字符是小数点，在前面添加0
                if (numericValue.startsWith('.')) {
                    numericValue = '0' + numericValue;
                }
                // 转换为数字进行范围检查
                var numberValue = Number(numericValue);
                // 限制最小值和最大值
                if (numberValue < _this.minStake) {
                    numberValue = _this.minStake;
                    numericValue = _this.minStake + '';
                }
                else if (numberValue > _this.maxStake) {
                    numberValue = _this.maxStake;
                    numericValue = _this.maxStake + '';
                }
                if (text !== numericValue) {
                    editbox.string = numericValue;
                }
                _this.betnum = numberValue;
            });
            // 设置初始值
            editBox.string = this.minStake + '';
            this.betnum = this.minStake;
        }
    };
    Game.prototype.ChengOrChu = function (event, string) {
        var newValue;
        if (string == "1") {
            // 乘2
            this.betnum = Number(this.TEXT_LABEL.string);
            newValue = this.betnum * 2;
        }
        else {
            // 除2
            this.betnum = Number(this.TEXT_LABEL.string);
            newValue = Number((this.betnum / 2).toFixed(2)); // 保留两位小数
        }
        // 限制最大最小值
        if (newValue < this.minStake) {
            newValue = this.minStake;
        }
        else if (newValue > this.maxStake) {
            newValue = this.maxStake;
        }
        // 更新值
        this.betnum = newValue;
        this.TEXT_LABEL.string = newValue.toString();
    };
    Game.prototype.newgame = function () {
        cc.director.loadScene("mainSceneHttp");
    };
    Game.prototype.openOrclose = function (any, str) {
        if (str == "1") {
            cc.find("Canvas/Guize").active = true;
        }
        else {
            cc.find("Canvas/Guize").active = false;
        }
    };
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "pre_card", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "CardBack", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "dealerNode", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "playerNode", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "playerNodeLeft", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "playerNodeRight", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "playerScoreLabel", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "dealerScoreLabel", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "playerLeftScoreLabel", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "playerRightScoreLabel", void 0);
    __decorate([
        property(cc.Button)
    ], Game.prototype, "betButton", void 0);
    __decorate([
        property(cc.Button)
    ], Game.prototype, "hitButton", void 0);
    __decorate([
        property(cc.Button)
    ], Game.prototype, "standButton", void 0);
    __decorate([
        property(cc.Button)
    ], Game.prototype, "doubleDownButton", void 0);
    __decorate([
        property(cc.Button)
    ], Game.prototype, "divideButton", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "currentBetLabel", void 0);
    __decorate([
        property(cc.Button)
    ], Game.prototype, "halfBetButton", void 0);
    __decorate([
        property(cc.Button)
    ], Game.prototype, "doubleBetButton", void 0);
    __decorate([
        property(cc.Button)
    ], Game.prototype, "insuranceButton", void 0);
    __decorate([
        property(cc.Button)
    ], Game.prototype, "noInsuranceButton", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "TEXT_LABEL", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.default = Game;

cc._RF.pop();