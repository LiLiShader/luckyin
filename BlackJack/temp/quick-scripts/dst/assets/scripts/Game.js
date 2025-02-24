
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBMEI7QUFDMUIsbUNBQThCO0FBQzlCLHFDQUFnQztBQUVoQyw2Q0FBNkM7QUFDN0MscURBQWtFO0FBQ2xFLHlEQUFvRDtBQUNwRCwrQkFBMEI7QUFFcEIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7O0dBRUc7QUFFSDtJQUFrQyx3QkFBWTtJQUE5QztRQUFBLHFFQStqQ0M7UUExakNHLGNBQVEsR0FBYyxJQUFLLENBQUMsQ0FBRSxRQUFRO1FBR3RDLGNBQVEsR0FBYyxJQUFLLENBQUMsQ0FBRSxnQkFBZ0I7UUFHOUMsZ0JBQVUsR0FBWSxJQUFLLENBQUMsQ0FBRSxPQUFPO1FBR3JDLGdCQUFVLEdBQVksSUFBSyxDQUFDLENBQUUsT0FBTztRQUVyQyxvQkFBYyxHQUFZLElBQUssQ0FBQyxDQUFFLFVBQVU7UUFFNUMscUJBQWUsR0FBWSxJQUFLLENBQUMsQ0FBRSxVQUFVO1FBRzdDLHNCQUFnQixHQUFhLElBQUssQ0FBQyxDQUFFLGdCQUFnQjtRQUdyRCxzQkFBZ0IsR0FBYSxJQUFLLENBQUMsQ0FBRSxnQkFBZ0I7UUFJckQsMEJBQW9CLEdBQWEsSUFBSyxDQUFDLENBQUUsbUJBQW1CO1FBRTVELDJCQUFxQixHQUFhLElBQUssQ0FBQyxDQUFFLG1CQUFtQjtRQU83RCxzQkFBZ0IsR0FBVSxLQUFLLENBQUMsQ0FBQyxXQUFXO1FBQzVDLHVCQUFpQixHQUFVLEtBQUssQ0FBQyxDQUFDLFdBQVc7UUFFN0MsWUFBTSxHQUFRLFFBQVEsQ0FBQyxDQUFDLE9BQU87UUFDL0IsZ0JBQVUsR0FBSyxJQUFJLENBQUMsQ0FBQyxPQUFPO1FBQzVCLG9CQUFjLEdB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eEI7SUFBRCxXQUFDO0NBL2pDRCxBQStqQ0MsQ0EvakNpQyxFQUFFLENBQUMsU0FBUyxHQStqQzdDO2tCQS9qQ29CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGVjayBmcm9tICcuL0RlY2snO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL1BsYXllcic7XG5pbXBvcnQgQmV0dGluZyBmcm9tICcuL0JldHRpbmcnO1xuaW1wb3J0IEhhbmQgZnJvbSAnLi9IYW5kJztcbi8vIGltcG9ydCBDYXJkLCB7IFJhbmssIFN1aXQgfSBmcm9tICcuL0NhcmQnO1xuaW1wb3J0IExhbmd1YWdlTWFuYWdlciwgeyBMYW5ndWFnZVR5cGUgfSBmcm9tICcuL0xhbmd1YWdlTWFuYWdlcic7XG5pbXBvcnQgSHR0cFJlcXVlc3QgZnJvbSAnLi4vc2NyaXB0SHR0cC9IdHRwUmVxdWVzdCc7XG5pbXBvcnQgQ2FyZCBmcm9tICcuL0NhcmQnO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5cbi8qKlxuICogR2FtZSDnsbvotJ/otKPmjqfliLbmlbTkuKrmuLjmiI/nmoTmtYHnqItcbiAqL1xuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIHByaXZhdGUgZGVjazogRGVjazsgIC8vIOeJjOWghlxuICAgIHByaXZhdGUgYmV0dGluZzogQmV0dGluZzsgIC8vIOS4i+azqOezu+e7n1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBwcmVfY2FyZDogY2MuUHJlZmFiID0gbnVsbCE7ICAvLyDljaHniYzpooTliLbkvZNcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgQ2FyZEJhY2s6IGNjLlByZWZhYiA9IG51bGwhOyAgLy8g55So5LqO6YGu572p5bqE5a6256ys5LqM5byg54mM55qE5Y2h6IOMXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBkZWFsZXJOb2RlOiBjYy5Ob2RlID0gbnVsbCE7ICAvLyDluoTlrrboioLngrlcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHBsYXllck5vZGU6IGNjLk5vZGUgPSBudWxsITsgIC8vIOeOqeWutuiKgueCuVxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHBsYXllck5vZGVMZWZ0OiBjYy5Ob2RlID0gbnVsbCE7ICAvLyDnjqnlrrbliIbniYzlt6boioLngrlcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwbGF5ZXJOb2RlUmlnaHQ6IGNjLk5vZGUgPSBudWxsITsgIC8vIOeOqeWutuWIhueJjOWPs+iKgueCuVxuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHBsYXllclNjb3JlTGFiZWw6IGNjLkxhYmVsID0gbnVsbCE7ICAvLyDmmL7npLrnjqnlrrbliIbmlbDnmoQgTGFiZWxcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBkZWFsZXJTY29yZUxhYmVsOiBjYy5MYWJlbCA9IG51bGwhOyAgLy8g5pi+56S65bqE5a625YiG5pWw55qEIExhYmVsXG5cblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwbGF5ZXJMZWZ0U2NvcmVMYWJlbDogY2MuTGFiZWwgPSBudWxsITsgIC8vIOaYvuekuueOqeWutuWIhueJjOW3puWIhuaVsOeahCBMYWJlbFxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwbGF5ZXJSaWdodFNjb3JlTGFiZWw6IGNjLkxhYmVsID0gbnVsbCE7ICAvLyDmmL7npLrnjqnlrrbliIbniYzlj7PliIbmlbDnmoQgTGFiZWxcblxuXG4gICAgZGVhbGVyOiBQbGF5ZXI7ICAvLyDluoTlrrblrp7kvotcbiAgICBwbGF5ZXI6IFBsYXllcjsgIC8vIOeOqeWutuWunuS+i1xuICAgIHBsYXllckxlZnQ6IFBsYXllcjsgIC8vIOeOqeWutuWIhueJjOW3puWunuS+i1xuICAgIHBsYXllclJpZ2h0OiBQbGF5ZXI7ICAvLyDnjqnlrrbliIbniYzlj7Plrp7kvotcbiAgICBwbGF5ZXJMZWZ0aXNPdmVyOiBib29sZWFuPWZhbHNlOyAvL+eOqeWutuWIhueJjOW3puaYr+WQpue7k+adn1xuICAgIHBsYXllclJpZ2h0aXNPdmVyOiBib29sZWFuPWZhbHNlOyAvL+eOqeWutuWIhueJjOWPs+aYr+WQpue7k+adn1xuXG4gICAgbm93V2hvOnN0cmluZz1cInBsYXllclwiOyAvL+W9k+WJjei9ruWIsOiwgVxuICAgIGRpdmlkZUNhcmQ6YW55PW51bGw7IC8v5YiG54mM55qE54mM5YC8XG4gICAgZGl2aWRlQ2FyZE1pYW46c3RyaW5nPVwiXCI7IC8v5YiG54mM55qE54mM6Z2iXG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIGJldEJ1dHRvbjogY2MuQnV0dG9uID0gbnVsbCE7ICAgICAgIC8vIOaKleazqOaMiemSrlxuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICBoaXRCdXR0b246IGNjLkJ1dHRvbiA9IG51bGwhOyAgICAgICAvLyDopoHniYzmjInpkq5cblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgc3RhbmRCdXR0b246IGNjLkJ1dHRvbiA9IG51bGwhOyAgICAvLyDniYzmjInpkq5cblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgZG91YmxlRG93bkJ1dHRvbjogY2MuQnV0dG9uID0gbnVsbCE7ICAvLyDlj4zlgI3kuIvms6jmjInpkq5cblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgZGl2aWRlQnV0dG9uOiBjYy5CdXR0b24gPSBudWxsITsgLy8g4oCc5YiG54mM4oCdIOaMiemSrlxuXG4gICAgcHJpdmF0ZSBpc0RvdWJsZURvd246IGJvb2xlYW4gPSBmYWxzZTsgIC8vIOagh+iusOaYr+WQpuWPjOWAjeS4i+azqFxuXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgY3VycmVudEJldExhYmVsOiBjYy5MYWJlbCA9IG51bGwhOyAgLy8g55So5LqO5pi+56S65b2T5YmN5oqV5rOo6aKd55qEIExhYmVsXG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIGhhbGZCZXRCdXR0b246IGNjLkJ1dHRvbiA9IG51bGwhOyAgIC8vIOKAnDEvMuKAnSDmjInpkq5cblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgZG91YmxlQmV0QnV0dG9uOiBjYy5CdXR0b24gPSBudWxsITsgLy8g4oCcMnjigJ0g5oyJ6ZKuXG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIGluc3VyYW5jZUJ1dHRvbjogY2MuQnV0dG9uID0gbnVsbCE7IC8vIOKAnOS5sOS/nemZqeKAnSDmjInpkq5cblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgbm9JbnN1cmFuY2VCdXR0b246IGNjLkJ1dHRvbiA9IG51bGwhOyAvLyDigJzkuI3kubDkv53pmanigJ0g5oyJ6ZKuXG5cblxuICAgIHByaXZhdGUgY3VycmVudEJldDogbnVtYmVyID0gMC4wMDsgIC8vIOW9k+WJjeaKleazqOmine+8jOWIneWni+S4uiAwLjAwXG4gICAgcHJpdmF0ZSBpbnN1cmFuY2VCZXQ6IG51bWJlciA9IDAuMDA7IC8vIOS/nemZqemHkeminVxuICAgIHByaXZhdGUgcGxheWVyMjE6IGJvb2xlYW49ZmFsc2U7IC8vIOeOqeWutuaYr+WQpuW8gOWxgOS4ujIxXG4gICAgcHJpdmF0ZSBwbGF5ZXJMZWZ0MjE6IGJvb2xlYW49ZmFsc2U7IC8vIOeOqeWutuWIhueJjOW3puaYr+WQpuW8gOWxgOS4ujIxXG4gICAgcHJpdmF0ZSBwbGF5ZXJSaWdodDIxOiBib29sZWFuPWZhbHNlOyAvLyDnjqnlrrbliIbniYzlj7PmmK/lkKblvIDlsYDkuLoyMVxuICAgIC8vIHRva2VuID1cInR0MDQ3Nm4weDJpY2VqcnUxNnAxMHVmeTU2OTV6ZDViXCJcbiAgICAvLyB0aW1lX3pvbmUgPVwiQXNpYS9TaGFuZ2hhaVwiXG4gICAgcmVjb3JkSWQ9LTFcbiAgICBwcml2YXRlIHNhdmVSZWNvcmRJZCgpOiB2b2lkIHtcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdibGFja2phY2tfcmVjb3JkSWQnLCB0aGlzLnJlY29yZElkLnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgICBwcml2YXRlIGxvYWRSZWNvcmRJZCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc2F2ZWRJZCA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmxhY2tqYWNrX3JlY29yZElkJyk7XG4gICAgICAgIGlmIChzYXZlZElkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyB0aGlzLnJlY29yZElkID0gcGFyc2VJbnQoc2F2ZWRJZCk7XG4gICAgICAgICAgICB0aGlzLnJlY29yZElkID0gLTFcbiAgICAgICAgfVxuICAgIH1cbiAgICBiYW5rZXJDYXJkTGlzdDphbnk9W10vL2JldOWQjui/lOWbnueahOaVsOe7hFxuICAgIHBsYXllckNhcmRMaXN0OmFueT1bXS8vYmV05ZCO6L+U5Zue55qE5pWw57uEXG5cbiAgICBpc0FjdGl2ZT1mYWxzZVxuXG4gICAgdG9rZW46c3RyaW5nPVwiam00emw1bTk3dXo5OW00c2pkOHNqOXR4MHJudjVuczZcIjtcbiAgICBcbiAgICAvL+W4geenjVxuICAgIGN1cnJlbmN5Om51bWJlcj0xO1xuICAgIGN1cnJlbmN5TmFtZTpzdHJpbmc9XCJCVENcIjtcbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJbmuLjmiI/vvIzorr7nva7njqnlrrbjgIHluoTlrrblj4rniYzloIZcbiAgICAgKi9cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMubG9hZFJlY29yZElkKCk7IC8vIOWKoOi9veS/neWtmOeahCByZWNvcmRJZFxuXG4gICAgICAgIHRoaXMuZGVjayA9IG5ldyBEZWNrKCk7XG4gICAgICAgIHRoaXMuYmV0dGluZyA9IG5ldyBCZXR0aW5nKCk7XG5cbiAgICAgICAgdGhpcy5kZWFsZXIgPSB0aGlzLmRlYWxlck5vZGUuZ2V0Q29tcG9uZW50KFBsYXllcikhO1xuICAgICAgICB0aGlzLnBsYXllciA9IHRoaXMucGxheWVyTm9kZS5nZXRDb21wb25lbnQoUGxheWVyKSE7XG4gICAgICAgIHRoaXMucGxheWVyTGVmdCA9IHRoaXMucGxheWVyTm9kZUxlZnQuZ2V0Q29tcG9uZW50KFBsYXllcikhO1xuICAgICAgICB0aGlzLnBsYXllclJpZ2h0ID0gdGhpcy5wbGF5ZXJOb2RlUmlnaHQuZ2V0Q29tcG9uZW50KFBsYXllcikhO1xuXG4gICAgICAgIFxuXG4gICAgICAgIGxldCBjdXJyZW50VXJsOiBzdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgY29uc29sZS5sb2coXCLlvZPliY3muLjmiI/nmoRVUkw6XCIsIGN1cnJlbnRVcmwpO1xuICAgICAgICBsZXQgdmFsdWUgPSBjdXJyZW50VXJsLnN1YnN0cmluZyhjdXJyZW50VXJsLmxhc3RJbmRleE9mKFwiPVwiKSArIDEpO1xuICAgICAgICBzd2l0Y2godmFsdWUpe1xuICAgICAgICAgICAgY2FzZSBcInpoXCI6XG4gICAgICAgICAgICAgICAgTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0TGFuZ3VhZ2UoTGFuZ3VhZ2VUeXBlLkNOKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJlblwiOlxuICAgICAgICAgICAgICAgIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldExhbmd1YWdlKExhbmd1YWdlVHlwZS5FTik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYXJcIjpcbiAgICAgICAgICAgICAgICBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRMYW5ndWFnZShMYW5ndWFnZVR5cGUuQXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImZyXCI6XG4gICAgICAgICAgICAgICAgTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0TGFuZ3VhZ2UoTGFuZ3VhZ2VUeXBlLkZSKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJqcFwiOlxuICAgICAgICAgICAgICAgIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldExhbmd1YWdlKExhbmd1YWdlVHlwZS5KUCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldExhbmd1YWdlKExhbmd1YWdlVHlwZS5FTik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRva2VuID0gdGhpcy5nZXRUb2tlbkZyb21VcmwoY3VycmVudFVybCk7XG4gICAgICAgIHRoaXMuY3VycmVuY3kgPSB0aGlzLmdldEN1cnJlbmN5RnJvbVVybChjdXJyZW50VXJsKTtcbiAgICAgICAgdGhpcy5jdXJyZW5jeU5hbWU9dGhpcy5nZXRDdXJyZW5jeU5hbWVGcm9tVXJsKGN1cnJlbnRVcmwpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIuiOt+WPluWIsOeahHRva2VuOlwiLCB0aGlzLnRva2VuKTtcbiAgICAgICAgY29uc29sZS5sb2coXCLojrflj5bliLDnmoRjdXJyZW5jeTpcIiwgdGhpcy5jdXJyZW5jeSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi6I635Y+W5Yiw55qEY3VycmVuY3lOYW1lOlwiLCB0aGlzLmN1cnJlbmN5TmFtZSk7XG4gICAgICAgIEh0dHBSZXF1ZXN0LmdldEluc3RhbmNlKCkudG9rZW49dGhpcy50b2tlbjtcblxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZChcImljb24vXCIrdGhpcy5jdXJyZW5jeU5hbWUsY2MuU3ByaXRlRnJhbWUsIChlcnIsIHNwcml0ZUZyYW1lKSA9PiB7XG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VJL0JHL051bUJHL2ljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9c3ByaXRlRnJhbWU7XG4gICAgICAgIH0pO1xuICAgICAgICBpZih0aGlzLnRva2VuPT1cIlwiKXtcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvTm90TG9nZ2VkSW5cIikuYWN0aXZlPXRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGlzLnN0YXJ0TmV3Um91bmQoKTsgIC8vIOWQr+WKqOaWsOS4gOi9rua4uOaIj1xuICAgICAgICB0aGlzLmluaXRUZXh0TGFiZWwoKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIuW9k+WJjeeahHJlY29yZElkOlwiLCB0aGlzLnJlY29yZElkKTtcbiAgICAgICAgaWYodGhpcy5yZWNvcmRJZCE9LTEpe1xuICAgICAgICAgICAgSHR0cFJlcXVlc3QuZ2V0SW5zdGFuY2UoKS5pbmZvKHRoaXMucmVjb3JkSWQpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bnmoTlk43lupQ6JywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGludWVHYW1lKHJlc3BvbnNlLmRhdGEucGxheWVyQ2FyZExpc3QscmVzcG9uc2UuZGF0YS5iYW5rZXJDYXJkTGlzdCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCflpITnkIbor7fmsYLml7blh7rplJk6JywgZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIEh0dHBSZXF1ZXN0LmdldEluc3RhbmNlKCkuZ2V0Z2FtZURldGFpbCgyOSkudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgIHRoaXMubWF4U3Rha2U9cmVzLmRhdGEubWF4U3Rha2U7XG4gICAgICAgICAgICB0aGlzLm1pblN0YWtlPXJlcy5kYXRhLm1pblN0YWtlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbWF4U3Rha2U9MTAwXG4gICAgbWluU3Rha2U9MVxuICAgIHByaXZhdGUgZ2V0VG9rZW5Gcm9tVXJsKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIOS9v+eUqOato+WImeihqOi+vuW8j+WMuemFjXRva2VuPeWQjumdoueahOWAvO+8jOebtOWIsOmBh+WIsCbmiJbnu5PmnZ9cbiAgICAgICAgICAgIGNvbnN0IHRva2VuTWF0Y2ggPSB1cmwubWF0Y2goL3Rva2VuPShbXiZdKikvKTtcbiAgICAgICAgICAgIGlmICh0b2tlbk1hdGNoICYmIHRva2VuTWF0Y2hbMV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW5NYXRjaFsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+ino+aekHRva2Vu5aSx6LSlOicsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIGdldEN1cnJlbmN5RnJvbVVybCh1cmw6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyDkvb/nlKjmraPliJnooajovr7lvI/ljLnphY1jdXJyZW5jeT3lkI7pnaLnmoTmlbDlgLxcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbmN5TWF0Y2ggPSB1cmwubWF0Y2goL2N1cnJlbmN5PShcXGQrKS8pO1xuICAgICAgICAgICAgaWYgKGN1cnJlbmN5TWF0Y2ggJiYgY3VycmVuY3lNYXRjaFsxXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChjdXJyZW5jeU1hdGNoWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAxOyAvLyDlpoLmnpzmsqHmnInmib7liLDvvIzov5Tlm57pu5jorqTlgLwxXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCfop6PmnpBjdXJyZW5jeeWksei0pTonLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gMTsgLy8g5Y+R55Sf6ZSZ6K+v5pe26L+U5Zue6buY6K6k5YC8MVxuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgZ2V0Q3VycmVuY3lOYW1lRnJvbVVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW5jeU5hbWVNYXRjaCA9IHVybC5tYXRjaCgvY3VycmVuY3lOYW1lPShbXiZdKikvKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW5jeU5hbWVNYXRjaCAmJiBjdXJyZW5jeU5hbWVNYXRjaFsxXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3VycmVuY3lOYW1lTWF0Y2hbMV07XG4gICAgICAgICAgICAgICAgLy8g6aqM6K+B6LSn5biB5ZCN56ew5piv5ZCm5ZCI5rOV77yI5L6L5aaC77ya5Y+q5YWB6K645aSn5YaZ5a2X5q+N77yJXG4gICAgICAgICAgICAgICAgaWYgKC9eW0EtWl0rJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnQlRDJztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+ino+aekCBjdXJyZW5jeU5hbWUg5aSx6LSlOicsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiAnQlRDJztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL+e7p+e7rea4uOaIj1xuICAgIGFzeW5jIGNvbnRpbnVlR2FtZShwbGF5ZXJDYXJkTGlzdDphbnksYmFua2VyQ2FyZExpc3Q6YW55KXtcbiAgICAgICAgdGhpcy51cGRhdGVCdXR0b25TdGF0ZXMoZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLnBsYXllckNhcmRMaXN0PXBsYXllckNhcmRMaXN0O1xuICAgICAgICB0aGlzLmJhbmtlckNhcmRMaXN0PWJhbmtlckNhcmRMaXN0O1xuICAgICAgICAvLyDlj5HniYxcbiAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLnBsYXllckNhcmRMaXN0Lmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbGF5ZXIuaGFuZC5hZGRDYXJkKG5ldyBDYXJkKDEsdGhpcy5wbGF5ZXJDYXJkTGlzdFtpXS5udW0pLCB0aGlzLnBsYXllci5pc0RlYWxlciwgdGhpcy5wcmVfY2FyZCk7XG4gICAgICAgIH0gICAgIFxuICAgICAgICBhd2FpdCB0aGlzLmRlYWxlci5oYW5kLmFkZENhcmQobmV3IENhcmQoMSx0aGlzLmJhbmtlckNhcmRMaXN0WzBdLm51bSksIHRoaXMuZGVhbGVyLmlzRGVhbGVyLCB0aGlzLnByZV9jYXJkKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kZWFsZXIuaGFuZC5hZGRDYXJkKG5ldyBDYXJkKDAsMCksIHRoaXMuZGVhbGVyLmlzRGVhbGVyLCB0aGlzLnByZV9jYXJkKTtcblxuICAgICAgICAvLyDmo4Dmn6XluoTlrrbnrKzkuIDlvKDniYzmmK/lkKbkuLogQVxuICAgICAgICBpZiAodGhpcy5kZWFsZXIuaGFuZC5jYXJkc1swXS5nZXRWYWx1ZSgpID09PSAxMSYmIXRoaXMucGxheWVyLmhhbmQuaXNCbGFja2phY2soKSkgeyAgLy8g5YGH6K6+IEEg55qE5YC85Li6IDExXG4gICAgICAgICAgICB0aGlzLnNob3dJbnN1cmFuY2VPcHRpb25zKCk7ICAvLyDlvLnlh7rkv53pmanpgInpoblcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGVzKHRydWUsIHRydWUsIHRydWUsIGZhbHNlKTsgIC8vIOWQr+eUqOato+W4uOa4uOaIj+aMiemSrlxuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlU2NvcmVzKCk7ICAvLyDmr4/mrKHlj5HniYzlkI7mm7TmlrDliIbmlbDmmL7npLpcbiAgICB9XG4gICAgLyoqXG4gICAgICog5byA5aeL5paw5LiA6L2u5ri45oiP77yM5Y+R5Yid5aeL55qE5Zub5byg54mMXG4gICAgICovXG4gICAgc3RhcnROZXdSb3VuZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc0FjdGl2ZT1mYWxzZVxuICAgICAgICB0aGlzLnBsYXllckNhcmRMaXN0PVtdXG4gICAgICAgIHRoaXMuYmFua2VyQ2FyZExpc3Q9W11cbiAgICAgICAgdGhpcy5wbGF5ZXIyMT1mYWxzZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJMZWZ0MjE9ZmFsc2U7XG4gICAgICAgIHRoaXMucGxheWVyUmlnaHQyMT1mYWxzZTtcbiAgICAgICAgdGhpcy5ub3dXaG89XCJwbGF5ZXJcIjtcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9wbGF5ZXJTY29yZU5vZGVcIikuY29sb3I9Y2MuY29sb3IoNDcsNjksODMsMjU1KTtcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9wbGF5ZXJTY29yZU5vZGUvcGxheWVyU2NvcmVMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIjBcIjtcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9kZWFsZXJTY29yZU5vZGUvZGVhbGVyU2NvcmVMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIjBcIjtcbiAgICAgICAgdGhpcy5wbGF5ZXJMZWZ0U2NvcmVMYWJlbC5ub2RlLnBhcmVudC5hY3RpdmU9ZmFsc2U7XG4gICAgICAgIHRoaXMucGxheWVyUmlnaHRTY29yZUxhYmVsLm5vZGUucGFyZW50LmFjdGl2ZT1mYWxzZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJTY29yZUxhYmVsLm5vZGUucGFyZW50LmFjdGl2ZT10cnVlO1xuICAgICAgICAvLyDph43nva7niYzloIblkozmiYvniYxcbiAgICAgICAgdGhpcy51cGRhdGVCZXREaXNwbGF5KCk7ICAvLyDmm7TmlrDmmL7npLpcbiAgICAgICAgdGhpcy5kZWFsZXIucmVzZXRIYW5kKCk7XG4gICAgICAgIHRoaXMucGxheWVyLnJlc2V0SGFuZCgpO1xuICAgICAgICB0aGlzLnBsYXllckxlZnQucmVzZXRIYW5kKCk7XG4gICAgICAgIHRoaXMucGxheWVyUmlnaHQucmVzZXRIYW5kKCk7XG4gICAgICAgIHRoaXMuaXNEb3VibGVEb3duID0gZmFsc2U7ICAvLyDph43nva7lj4zlgI3kuIvms6jnirbmgIFcbiAgICAgICAgLy8g5ZCv55So5pON5L2c5oyJ6ZKu77yM5YyF5ous5Yqg5YCN5oyJ6ZKuXG4gICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGVzKHRydWUsIHRydWUsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgLy8g5Y+R54mM6aG65bqP77ya546p5a625Lik5byg44CB5bqE5a625LiA5byg5piO54mM77yM5YaN5LiA5byg5pqX54mMXG4gICAgICAgIFxuICAgICAgICAvLyB0aGlzLnBsYXllci5oYW5kLmFkZENhcmQobmV3IENhcmQoU3VpdFtcIkNsdWJzXCJdLCBSYW5rW1wiQWNlXCJdKSx0aGlzLnBsYXllci5pc0RlYWxlcix0aGlzLnByZV9jYXJkKTtcblxuICAgICAgICB0aGlzLmRlYWxDYXJkKCk7XG4gICAgICAgIFxuICAgICAgICAvLyB0aGlzLmNoZWNrQmxhY2tqYWNrKCk7ICAvLyDmo4Dmn6XmmK/lkKbmnInliJ3lp4vniYznmoQgQmxhY2tqYWNrXG4gICAgfVxuICAgIC8vIOaWsOWinuS4gOS4quexu+aWueazlVxuICAgIHByaXZhdGUgYXN5bmMgZGVhbENhcmQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGVzKGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgbGV0IGlzSW5zdWZmaWNpZW50PWZhbHNlO1xuICAgICAgICAvLzI5XG4gICAgICAgIGF3YWl0IEh0dHBSZXF1ZXN0LmdldEluc3RhbmNlKCkuYmV0KHRoaXMuYmV0bnVtLHRoaXMuY3VycmVuY3ksMjkpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgaWYocmVzcG9uc2UubXNnPT1cImluc3VmZmljaWVudCBmdW5kc1wiKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS9memineS4jei2s1wiKVxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvSW5zdWZmaWNpZW50IEJhbGFuY2VcIikuYWN0aXZlPXRydWU7XG4gICAgICAgICAgICAgICAgaXNJbnN1ZmZpY2llbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bnmoTlk43lupQ6JywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYXJkTGlzdC5wdXNoKHJlc3BvbnNlLmRhdGEucGxheWVyQ2FyZExpc3RbMF0pXG4gICAgICAgICAgICB0aGlzLnBsYXllckNhcmRMaXN0LnB1c2gocmVzcG9uc2UuZGF0YS5wbGF5ZXJDYXJkTGlzdFsxXSlcbiAgICAgICAgICAgIC8vIHRoaXMuYmFua2VyQ2FyZExpc3QucHVzaChyZXNwb25zZS5kYXRhLmJhbmtlckNhcmRMaXN0WzBdKVxuICAgICAgICAgICAgdGhpcy5iYW5rZXJDYXJkTGlzdD1yZXNwb25zZS5kYXRhLmJhbmtlckNhcmRMaXN0XG5cbiAgICAgICAgICAgIHRoaXMucmVjb3JkSWQ9cmVzcG9uc2UuZGF0YS5pZFxuICAgICAgICAgICAgdGhpcy5zYXZlUmVjb3JkSWQoKTsgLy8g5L+d5a2Y5pu05paw5ZCO55qEIHJlY29yZElkXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCflpITnkIbor7fmsYLml7blh7rplJk6JywgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH0pXG4gICAgICAgIGlmKGlzSW5zdWZmaWNpZW50KXtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIC8vIOWPkeeJjOmhuuW6j++8mueOqeWutuS4pOW8oOOAgeW6hOWutuS4gOW8oOaYjueJjO+8jOWGjeS4gOW8oOaal+eJjFxuICAgICAgICBhd2FpdCB0aGlzLnBsYXllci5oYW5kLmFkZENhcmQobmV3IENhcmQoMSx0aGlzLnBsYXllckNhcmRMaXN0WzBdLm51bSksIHRoaXMucGxheWVyLmlzRGVhbGVyLCB0aGlzLnByZV9jYXJkKTtcbiAgICAgICAgYXdhaXQgdGhpcy5wbGF5ZXIuaGFuZC5hZGRDYXJkKG5ldyBDYXJkKDEsdGhpcy5wbGF5ZXJDYXJkTGlzdFsxXS5udW0pLCB0aGlzLnBsYXllci5pc0RlYWxlciwgdGhpcy5wcmVfY2FyZCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZGVhbGVyLmhhbmQuYWRkQ2FyZChuZXcgQ2FyZCgxLHRoaXMuYmFua2VyQ2FyZExpc3RbMF0ubnVtKSwgdGhpcy5kZWFsZXIuaXNEZWFsZXIsIHRoaXMucHJlX2NhcmQpO1xuICAgICAgICBhd2FpdCB0aGlzLmRlYWxlci5oYW5kLmFkZENhcmQobmV3IENhcmQoMCwwKSwgdGhpcy5kZWFsZXIuaXNEZWFsZXIsIHRoaXMucHJlX2NhcmQpO1xuXG4gICAgICAgIFxuICAgICAgICAvLyDpga7nvanluoTlrrbnrKzkuozlvKDniYxcbiAgICAgICAgLy8gY29uc3QgY2FyZEJhY2sgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLkNhcmRCYWNrKTtcbiAgICAgICAgLy8gY2FyZEJhY2sucGFyZW50ID0gdGhpcy5kZWFsZXJOb2RlLmNoaWxkcmVuWzFdOyAgLy8g5bCGIENhcmRCYWNrIOiuvuS4uuW6hOWutuesrOS6jOW8oOeJjOeahOWtkOiKgueCuVxuICAgICAgICAvLyBjYXJkQmFjay5zZXRQb3NpdGlvbigwLCAwKTtcblxuICAgICAgICAvLyDmo4Dmn6XluoTlrrbnrKzkuIDlvKDniYzmmK/lkKbkuLogQVxuICAgICAgICBpZiAodGhpcy5kZWFsZXIuaGFuZC5jYXJkc1swXS5nZXRWYWx1ZSgpID09PSAxMSYmIXRoaXMucGxheWVyLmhhbmQuaXNCbGFja2phY2soKSkgeyAgLy8g5YGH6K6+IEEg55qE5YC85Li6IDExXG4gICAgICAgICAgICB0aGlzLnNob3dJbnN1cmFuY2VPcHRpb25zKCk7ICAvLyDlvLnlh7rkv53pmanpgInpoblcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGVzKHRydWUsIHRydWUsIHRydWUsIGZhbHNlKTsgIC8vIOWQr+eUqOato+W4uOa4uOaIj+aMiemSrlxuICAgICAgICB9XG4gICAgICAgIC8v5qOA5p+l546p5a6255qE5Lik5byg5Yid5aeL5omL54mMUmFua+aVsOWAvOaYr+WQpuebuOetiVxuICAgICAgICBsZXQgb25lPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllciBOb2RlXCIpLmNoaWxkcmVuWzBdLmdldENoaWxkQnlOYW1lKFwiQ2FyZFwiKS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nXG4gICAgICAgIGxldCB0d2U9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyIE5vZGVcIikuY2hpbGRyZW5bMV0uZ2V0Q2hpbGRCeU5hbWUoXCJDYXJkXCIpLmdldENoaWxkQnlOYW1lKFwiTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmdcbiAgICAgICAgaWYob25lPT09dHdlKXtcbiAgICAgICAgICAgIHRoaXMuZGl2aWRlQ2FyZD10aGlzLnBsYXllci5oYW5kLmNhcmRzWzBdLnJhbms7XG4gICAgICAgICAgICB0aGlzLmRpdmlkZUNhcmRNaWFuPW9uZTtcbiAgICAgICAgICAgIC8v6Kem5Y+R5YiG54mM6Z2i5p2/XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlcyh0cnVlLCB0cnVlLCB0cnVlLCBmYWxzZSx0cnVlKTsgIC8vIOWQr+eUqOato+W4uOa4uOaIj+aMiemSrlxuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlU2NvcmVzKCk7ICAvLyDmr4/mrKHlj5HniYzlkI7mm7TmlrDliIbmlbDmmL7npLpcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmL7npLrkv53pmanpgInpobnlubbpmpDol4/lhbbku5bmjInpkq5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNob3dJbnN1cmFuY2VPcHRpb25zKCk6IHZvaWQge1xuICAgICAgICAvLyDmmL7npLrigJzkubDkv53pmanigJ3lkozigJzkuI3kubDkv53pmanigJ3mjInpkq5cbiAgICAgICAgdGhpcy5pbnN1cmFuY2VCdXR0b24ubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLm5vSW5zdXJhbmNlQnV0dG9uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICAvLyDpmpDol4/igJzopoHniYzigJ3igJzlgZzniYzigJ3igJzlj4zlgI3kuIvms6jigJ3mjInpkq5cbiAgICAgICAgdGhpcy5oaXRCdXR0b24ubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGFuZEJ1dHRvbi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRvdWJsZURvd25CdXR0b24ubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gICAgbGVmdEFycmF5OmFueT17fVxuICAgIHJpZ2h0QXJyYXk6YW55PXt9XG4gICAgYXN5bmMgZGl2aWRlKCk6UHJvbWlzZTx2b2lkPntcbiAgICAgICAgYXdhaXQgSHR0cFJlcXVlc3QuZ2V0SW5zdGFuY2UoKS5kaXZpZGUodGhpcy5yZWNvcmRJZCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxlZnRBcnJheT1yZXNwb25zZS5kYXRhWzFdXG4gICAgICAgICAgICB0aGlzLnJpZ2h0QXJyYXk9cmVzcG9uc2UuZGF0YVswXVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+iOt+WPlueahOWTjeW6lDonLCByZXNwb25zZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCflpITnkIbor7fmsYLml7blh7rplJk6JywgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGVmdEFycmF5LnBsYXllckNhcmRMaXN0WzFdLm51bSx0aGlzLnJpZ2h0QXJyYXkucGxheWVyQ2FyZExpc3RbMV0ubnVtKVxuICAgICAgICB0aGlzLnBsYXllckxlZnRTY29yZUxhYmVsLm5vZGUucGFyZW50LmFjdGl2ZT10cnVlO1xuICAgICAgICB0aGlzLnBsYXllclJpZ2h0U2NvcmVMYWJlbC5ub2RlLnBhcmVudC5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJTY29yZUxhYmVsLm5vZGUucGFyZW50LmFjdGl2ZT1mYWxzZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJMZWZ0U2NvcmVMYWJlbC5ub2RlLnBhcmVudC5jb2xvcj1jYy5jb2xvcig0Nyw2OSw4MywyNTUpO1xuICAgICAgICB0aGlzLnBsYXllclJpZ2h0U2NvcmVMYWJlbC5ub2RlLnBhcmVudC5jb2xvcj1jYy5jb2xvcig0Nyw2OSw4MywyNTUpO1xuICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlcyhmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSxmYWxzZSk7ICAvLyDlkK/nlKjmraPluLjmuLjmiI/mjInpkq5cbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllciBOb2RlXCIpLmNoaWxkcmVuQ291bnQtMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9QbGF5ZXIgTm9kZVwiKS5jaGlsZHJlbltpbmRleF0ucGFyZW50PW51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy9UT0RPIOWIhueJjOmAu+i+kVxuICAgICAgICAvL+WwhnBsYXllckxlZnTlkoxwbGF5ZXJSaWdodOaJi+eJjOiuvue9ruS4unBsYXllcuaJi+eJjOeahOS4gOWNilxuICAgICAgICBhd2FpdCB0aGlzLnBsYXllckxlZnQuaGFuZC5hZGRDYXJkKG5ldyBDYXJkKDEsIHRoaXMuZGl2aWRlQ2FyZCksIHRoaXMucGxheWVyLmlzRGVhbGVyLCB0aGlzLnByZV9jYXJkLFwibGVmdFwiKTtcbiAgICAgICAgYXdhaXQgdGhpcy5wbGF5ZXJSaWdodC5oYW5kLmFkZENhcmQobmV3IENhcmQoMSwgdGhpcy5kaXZpZGVDYXJkKSwgdGhpcy5wbGF5ZXIuaXNEZWFsZXIsIHRoaXMucHJlX2NhcmQsXCJyaWdodFwiKTtcbiAgICAgICAgYXdhaXQgdGhpcy5wbGF5ZXJMZWZ0LmhhbmQuYWRkQ2FyZChuZXcgQ2FyZCgxLHRoaXMubGVmdEFycmF5LnBsYXllckNhcmRMaXN0WzFdLm51bSksIHRoaXMucGxheWVyLmlzRGVhbGVyLCB0aGlzLnByZV9jYXJkLFwibGVmdFwiKTtcbiAgICAgICAgYXdhaXQgdGhpcy5wbGF5ZXJSaWdodC5oYW5kLmFkZENhcmQobmV3IENhcmQoMSx0aGlzLnJpZ2h0QXJyYXkucGxheWVyQ2FyZExpc3RbMV0ubnVtKSwgdGhpcy5wbGF5ZXIuaXNEZWFsZXIsIHRoaXMucHJlX2NhcmQsXCJyaWdodFwiKTtcbiAgICAgICAgdGhpcy51cGRhdGVCdXR0b25TdGF0ZXModHJ1ZSwgZmFsc2UsIHRydWUsIGZhbHNlLGZhbHNlKTsgIC8vIOWQr+eUqOato+W4uOa4uOaIj+aMiemSrlxuICAgICAgICAvL+a4heepunBsYXllcuaJi+eJjFxuICAgICAgICB0aGlzLnBsYXllci5oYW5kLmNsZWFyKCk7XG5cbiAgICAgICAgdGhpcy5ub3dXaG89XCJwbGF5ZXJSaWdodFwiO1xuXG4gICAgICAgIHRoaXMudXBkYXRlU2NvcmVzKCk7ICAvLyDmr4/mrKHlj5HniYzlkI7mm7TmlrDliIbmlbDmmL7npLpcblxuICAgICAgICB0aGlzLmRpdmlkZUNvbG9yKCk7XG4gICAgfVxuICAgIGRpdmlkZUNvbG9yKCl7XG4gICAgICAgIGlmKHRoaXMubm93V2hvPT1cInBsYXllclJpZ2h0XCIpe1xuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllciBOb2RlIHJpZ2h0XCIpLmNoaWxkcmVuQ291bnQtMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvUGxheWVyIE5vZGUgcmlnaHRcIikuY2hpbGRyZW5baW5kZXhdLmdldENoaWxkQnlOYW1lKFwiU2lnbm5cIikuYWN0aXZlPXRydWU7XG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9QbGF5ZXIgTm9kZSByaWdodFwiKS5jaGlsZHJlbltpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJTaWdublwiKS5jb2xvcj1jYy5jb2xvcigwLDE0OCwyNTUsMjU1KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyIE5vZGUgcmlnaHRcIikuY2hpbGRyZW5Db3VudC0xOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9QbGF5ZXIgTm9kZSByaWdodFwiKS5jaGlsZHJlbltpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJTaWdublwiKS5hY3RpdmU9ZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyIE5vZGUgbGVmdFwiKS5jaGlsZHJlbkNvdW50LTE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1BsYXllciBOb2RlIGxlZnRcIikuY2hpbGRyZW5baW5kZXhdLmdldENoaWxkQnlOYW1lKFwiU2lnbm5cIikuYWN0aXZlPXRydWU7XG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9QbGF5ZXIgTm9kZSBsZWZ0XCIpLmNoaWxkcmVuW2luZGV4XS5nZXRDaGlsZEJ5TmFtZShcIlNpZ25uXCIpLmNvbG9yPWNjLmNvbG9yKDAsMTQ4LDI1NSwyNTUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuLyoqXG4gKiDnjqnlrrbpgInmi6nigJzkubDkv53pmanigJ1cbiAqL1xuYXN5bmMgYnV5SW5zdXJhbmNlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IEh0dHBSZXF1ZXN0LmdldEluc3RhbmNlKCkuYnV5SW5zdXJhbmNlKHRoaXMucmVjb3JkSWQpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICB0aGlzLmJhbmtlckNhcmRMaXN0PXJlc3BvbnNlLmRhdGEuYmFua2VyQ2FyZExpc3RcbiAgICAgICAgLy8gdGhpcy5kZWFsZXIuaGFuZC5jYXJkc1sxXS5zdWl0PXJlc3BvbnNlLmRhdGEuYmFua2VyQ2FyZExpc3RbMV0uc3VpdFxuICAgICAgICAvLyB0aGlzLmRlYWxlci5oYW5kLmNhcmRzWzFdLnJhbms9cmVzcG9uc2UuZGF0YS5iYW5rZXJDYXJkTGlzdFsxXS5udW1cbiAgICAgICAgY29uc29sZS5sb2coJ+iOt+WPlueahOWTjeW6lDonLCByZXNwb25zZSx0aGlzLmRlYWxlci5oYW5kLmNhcmRzWzFdLHJlc3BvbnNlLmRhdGEuYmFua2VyQ2FyZExpc3RbMV0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcign5aSE55CG6K+35rGC5pe25Ye66ZSZOicsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuXG4gICAgfSlcblxuICAgIHRoaXMuaW5zdXJhbmNlQmV0ID0gdGhpcy5jdXJyZW50QmV0IC8gMjsgIC8vIOS/nemZqemHkeaYr+W9k+WJjeaKleazqOmineeahOS4gOWNilxuICAgIHRoaXMuaGlkZUluc3VyYW5jZU9wdGlvbnMoKTsgIC8vIOmakOiXj+S/nemZqemAiemhuVxuXG4gICAgLy8g5qOA5p+l5bqE5a625piv5ZCm5Li6IEJsYWNramFja1xuICAgIGlmICh0aGlzLmRlYWxlci5oYW5kLmlzQmxhY2tqYWNrKCkpIHtcbiAgICAgICAgLy8g5pi+56S65bqE5a6256ys5LqM5byg54mMXG4gICAgICAgIHRoaXMuZGVhbGVyTm9kZS5jaGlsZHJlblsxXS5nZXRDaGlsZEJ5TmFtZShcIkNhcmRCYWNrXCIpLmFjdGl2ZT1mYWxzZTtcbiAgICAgICAgLy8g5bqE5a625pivIEJsYWNramFja++8jOeOqeWutuWPqui+k+aOieS/nemZqemHkVxuICAgICAgICB0aGlzLmN1cnJlbnRCZXQgLT0gdGhpcy5pbnN1cmFuY2VCZXQ7ICAvLyDmiaPpmaTkv53pmanph5FcbiAgICAgICAgdGhpcy51cGRhdGVCZXREaXNwbGF5KCk7ICAgICAgICAgICAgICAgLy8g5pu05paw5oqV5rOo6aKd5pi+56S6XG4gICAgICAgIHRoaXMuZW5kUm91bmQoJ2luc3VyYW5jZScpOyAgICAgICAgICAgIC8vIOeJueauiue7k+eul++8muWPqui+k+S/nemZqemHkVxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOW6hOWutuS4jeaYryBCbGFja2phY2vvvIzluoTlrrbmlLbotbDkv53pmanph5HvvIznu6fnu63mraPluLjmuLjmiI9cbiAgICAgICAgdGhpcy5jdXJyZW50QmV0IC09IHRoaXMuaW5zdXJhbmNlQmV0OyAgLy8g5omj6Zmk5L+d6Zmp6YeRXG4gICAgICAgIHRoaXMudXBkYXRlQmV0RGlzcGxheSgpOyAgICAgICAgICAgICAgIC8vIOabtOaWsOaKleazqOmineaYvuekulxuICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlcyh0cnVlLCB0cnVlLCB0cnVlLCBmYWxzZSk7ICAvLyDlkK/nlKjmraPluLjmuLjmiI/mjInpkq5cbiAgICAgICAgaWYodGhpcy5wbGF5ZXIuaGFuZC5jYXJkc1swXS5nZXRWYWx1ZSgpPT09dGhpcy5wbGF5ZXIuaGFuZC5jYXJkc1sxXS5nZXRWYWx1ZSgpKXtcbiAgICAgICAgICAgIC8v6Kem5Y+R5YiG54mM6Z2i5p2/XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlcyh0cnVlLCB0cnVlLCB0cnVlLCBmYWxzZSx0cnVlKTsgIC8vIOWQr+eUqOato+W4uOa4uOaIj+aMiemSrlxuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMudXBkYXRlU2NvcmVzKCk7ICAvLyDmr4/mrKHlj5HniYzlkI7mm7TmlrDliIbmlbDmmL7npLpcbn1cblxuXG4vKipcbiAqIOeOqeWutumAieaLqeKAnOS4jeS5sOS/nemZqeKAnVxuICovXG5hc3luYyBub0luc3VyYW5jZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBIdHRwUmVxdWVzdC5nZXRJbnN0YW5jZSgpLm5vdEJ1eUluc3VyYW5jZSh0aGlzLnJlY29yZElkKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgdGhpcy5iYW5rZXJDYXJkTGlzdD1yZXNwb25zZS5kYXRhLmJhbmtlckNhcmRMaXN0XG5cbiAgICAgICAgLy8gdGhpcy5iYW5rZXJDYXJkTGlzdC5wdXNoKHJlc3BvbnNlLmRhdGEuYmFua2VyQ2FyZExpc3RbMV0pXG4gICAgICAgIC8vIHRoaXMuZGVhbGVyLmhhbmQuY2FyZHNbMV0uc3VpdD1yZXNwb25zZS5kYXRhLmJhbmtlckNhcmRMaXN0WzFdLnN1aXRcbiAgICAgICAgLy8gdGhpcy5kZWFsZXIuaGFuZC5jYXJkc1sxXS5yYW5rPXJlc3BvbnNlLmRhdGEuYmFua2VyQ2FyZExpc3RbMV0ubnVtXG4gICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bnmoTlk43lupQ6JywgcmVzcG9uc2UpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcign5aSE55CG6K+35rGC5pe25Ye66ZSZOicsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuXG4gICAgfSlcbiAgICB0aGlzLmhpZGVJbnN1cmFuY2VPcHRpb25zKCk7ICAvLyDpmpDol4/kv53pmanpgInpoblcblxuICAgIC8vIOajgOafpeW6hOWutuaYr+WQpuS4uiBCbGFja2phY2tcbiAgICBpZiAodGhpcy5kZWFsZXIuaGFuZC5pc0JsYWNramFjaygpKSB7XG4gICAgICAgIC8vIOaYvuekuuW6hOWutuesrOS6jOW8oOeJjFxuICAgICAgICB0aGlzLmRlYWxlck5vZGUuY2hpbGRyZW5bMV0uZ2V0Q2hpbGRCeU5hbWUoXCJDYXJkQmFja1wiKS5hY3RpdmU9ZmFsc2U7XG4gICAgICAgIC8vIOW6hOWutuaYryBCbGFja2phY2vvvIzluoTlrrbotaLlvpfnjqnlrrblhajpg6jotYzms6hcbiAgICAgICAgdGhpcy5lbmRSb3VuZCgnZGVhbGVyJyk7ICAvLyDluoTlrrbog5zliKlcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyDluoTlrrbkuI3mmK8gQmxhY2tqYWNr77yM57un57ut5q2j5bi45ri45oiPXG4gICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGVzKHRydWUsIHRydWUsIHRydWUsIGZhbHNlKTsgIC8vIOWQr+eUqOato+W4uOa4uOaIj+aMiemSrlxuICAgICAgICBpZih0aGlzLnBsYXllci5oYW5kLmNhcmRzWzBdLmdldFZhbHVlKCk9PT10aGlzLnBsYXllci5oYW5kLmNhcmRzWzFdLmdldFZhbHVlKCkpe1xuICAgICAgICAgICAgLy/op6blj5HliIbniYzpnaLmnb9cbiAgICAgICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGVzKHRydWUsIHRydWUsIHRydWUsIGZhbHNlLHRydWUpOyAgLy8g5ZCv55So5q2j5bi45ri45oiP5oyJ6ZKuXG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy51cGRhdGVTY29yZXMoKTsgIC8vIOavj+asoeWPkeeJjOWQjuabtOaWsOWIhuaVsOaYvuekulxufVxuXG4vKipcbiAqIOmakOiXj+S/nemZqemAiemhueW5tuaBouWkjeato+W4uOaMiemSruaYvuekulxuICovXG5wcml2YXRlIGhpZGVJbnN1cmFuY2VPcHRpb25zKCk6IHZvaWQge1xuICAgIFxuICAgIC8vIOmakOiXj+KAnOS5sOS/nemZqeKAneWSjOKAnOS4jeS5sOS/nemZqeKAneaMiemSrlxuICAgIHRoaXMuaW5zdXJhbmNlQnV0dG9uLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5ub0luc3VyYW5jZUJ1dHRvbi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAge1xuICAgICAgICAvLyDmgaLlpI3igJzopoHniYzigJ3igJzlgZzniYzigJ3igJzlj4zlgI3kuIvms6jigJ3mjInpkq7mmL7npLpcbiAgICAgICAgdGhpcy5oaXRCdXR0b24ubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnN0YW5kQnV0dG9uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kb3VibGVEb3duQnV0dG9uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbiAgICAvKipcbiAgICAgKiDlj4zlgI3kuIvms6ggLSDnjqnlrrblj6rog73mir3kuIDlvKDniYzlubbnq4vljbPov5vlhaXnu5PnrpdcbiAgICAgKi9cbiAgICBhc3luYyBkb3VibGVEb3duKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNEb3VibGVEb3duKSByZXR1cm47ICAvLyDnoa7kv53lj4zlgI3kuIvms6jlj6rog73miafooYzkuIDmrKFcbiAgICBcbiAgICAgICAgICAgIHRoaXMuYmV0dGluZy5kb3VibGVCZXQoKTsgIC8vIOe/u+WAjeS4i+azqFxuXG4gICAgICAgICAgICBhd2FpdCBIdHRwUmVxdWVzdC5nZXRJbnN0YW5jZSgpLnJlZG91YmxlKHRoaXMucmVjb3JkSWQpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyQ2FyZExpc3QucHVzaChyZXNwb25zZS5kYXRhLnBsYXllckNhcmRMaXN0WzJdKVxuICAgICAgICAgICAgICAgIGxldCBsaXN0PXJlc3BvbnNlLmRhdGEuYmFua2VyQ2FyZExpc3RcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MTtpPGxpc3QubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFua2VyQ2FyZExpc3QucHVzaChsaXN0W2ldKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W55qE5ZON5bqUOicsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+WkhOeQhuivt+axguaXtuWHuumUmTonLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsYXllci5oYW5kLmFkZENhcmQobmV3IENhcmQodGhpcy5wbGF5ZXJDYXJkTGlzdFsyXS5zdWl0LHRoaXMucGxheWVyQ2FyZExpc3RbMl0ubnVtKSwgdGhpcy5wbGF5ZXIuaXNEZWFsZXIsIHRoaXMucHJlX2NhcmQpOyAvLyDnjqnlrrbmir3kuIDlvKDniYxcbiAgICAgICAgICAgIHRoaXMuaXNEb3VibGVEb3duID0gdHJ1ZTsgIC8vIOiuvue9ruWPjOWAjeS4i+azqOagh+iusFxuICAgICAgICAgICAgdGhpcy51cGRhdGVTY29yZXMoKTsgIC8vIOavj+asoeWPkeeJjOWQjuabtOaWsOWIhuaVsOaYvuekulxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJTY29yZSA9IHRoaXMucGxheWVyLmhhbmQuZ2V0U2NvcmUoKTtcblxuICAgICAgICAgICAgLy8g5qOA5p+l546p5a625piv5ZCm54iG54mMXG4gICAgICAgICAgICBpZiAocGxheWVyU2NvcmUgPiAyMSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGVzKGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUpOyAgLy8g56aB55So5omA5pyJ5oyJ6ZKu77yM5Y+q5ZCv55So4oCc5oqV5rOo4oCd5oyJ6ZKuXG4gICAgICAgICAgICAgICAgdGhpcy5lbmRSb3VuZCgnZGVhbGVyJyk7ICAvLyDnjqnlrrbniIbniYzvvIzluoTlrrbog5zvvIznm7TmjqXnu5PmnZ/lm57lkIhcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g546p5a625rKh5pyJ54iG54mM77yM5peg6K665YiG5pWw5piv5ZCm5Li6MjHvvIzpg73orqnluoTlrrbov5vlhaXlm57lkIhcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlcyhmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlKTsgIC8vIOemgeeUqOaJgOacieaMiemSru+8jOWPquWQr+eUqOKAnOaKleazqOKAneaMiemSrlxuICAgICAgICAgICAgICAgIHRoaXMuZGVhbGVyVHVybihudWxsLHRydWUpOyAgLy8g546p5a625Zue5ZCI57uT5p2f77yM5bqE5a625oq954mMXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAvKipcbiAgICAgKiDmipXms6jlubbph43mlrDlvIDlp4vmuLjmiI9cbiAgICAgKi9cbiAgICBwbGFjZUJldCgpOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSBjYy5maW5kKFwiQ2FudmFzL0RlYWxlciBOb2RlXCIpLmNoaWxkcmVuQ291bnQtMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9EZWFsZXIgTm9kZVwiKS5jaGlsZHJlbltpbmRleF0ucGFyZW50PW51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllciBOb2RlXCIpLmNoaWxkcmVuQ291bnQtMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9QbGF5ZXIgTm9kZVwiKS5jaGlsZHJlbltpbmRleF0ucGFyZW50PW51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllciBOb2RlIGxlZnRcIikuY2hpbGRyZW5Db3VudC0xOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1BsYXllciBOb2RlIGxlZnRcIikuY2hpbGRyZW5baW5kZXhdLnBhcmVudD1udWxsO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXIgTm9kZSByaWdodFwiKS5jaGlsZHJlbkNvdW50LTE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvUGxheWVyIE5vZGUgcmlnaHRcIikuY2hpbGRyZW5baW5kZXhdLnBhcmVudD1udWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYmV0dGluZy5wbGFjZUJldCh0aGlzLmN1cnJlbnRCZXQpOyAgLy8g6K6+572u6buY6K6k5LiL5rOo6YeR6aKd77yI5Y+v5Lul5qC55o2u6ZyA6KaB6LCD5pW05oiW6K6+572u5Li655So5oi36L6T5YWl5YC877yJXG4gICAgICAgIHRoaXMuc3RhcnROZXdSb3VuZCgpOyAgICAgICAvLyDlkK/liqjmlrDkuIDova7muLjmiI9cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnjqnlrrbpgInmi6nopoHniYxcbiAgICAgKiDnjqnlrrblj6/ku6XlpJrmrKHopoHniYzvvIznm7TliLDniIbniYzmiJbpgInmi6nlgZzniYxcbiAgICAgKi9cbiAgICBhc3luYyBwbGF5ZXJIaXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIC8vIOemgeeUqOWKoOWAjeaMiemSru+8jOWboOS4uueOqeWutuW3sue7j+mAieaLqeimgeeJjFxuICAgICAgICB0aGlzLmRvdWJsZURvd25CdXR0b24uaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGl2aWRlQnV0dG9uLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICBhd2FpdCBIdHRwUmVxdWVzdC5nZXRJbnN0YW5jZSgpLmRlYWwodGhpcy5yZWNvcmRJZCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsYXllckNhcmRMaXN0LnB1c2gocmVzcG9uc2UuZGF0YS5wbGF5ZXJDYXJkTGlzdFtyZXNwb25zZS5kYXRhLnBsYXllckNhcmRMaXN0Lmxlbmd0aC0xXSlcbiAgICAgICAgICAgIC8vIHRoaXMuYmFua2VyQ2FyZExpc3QucHVzaChyZXNwb25zZS5kYXRhLmJhbmtlckNhcmRMaXN0W3Jlc3BvbnNlLmRhdGEuYmFua2VyQ2FyZExpc3QubGVuZ3RoLTFdKVxuICAgICAgICAgICAgdGhpcy5iYW5rZXJDYXJkTGlzdD1yZXNwb25zZS5kYXRhLmJhbmtlckNhcmRMaXN0XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W55qE5ZON5bqUOicsIHJlc3BvbnNlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+WkhOeQhuivt+axguaXtuWHuumUmTonLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfSlcblxuICAgICAgICAvLyDnjqnlrrbmir3kuIDlvKDmlrDniYxcbiAgICAgICAgc3dpdGNoICh0aGlzLm5vd1dobykge1xuICAgICAgICAgICAgY2FzZSBcInBsYXllclwiOlxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGxheWVyLmhhbmQuYWRkQ2FyZChuZXcgQ2FyZCh0aGlzLnBsYXllckNhcmRMaXN0W3RoaXMucGxheWVyQ2FyZExpc3QubGVuZ3RoLTFdLnN1aXQsdGhpcy5wbGF5ZXJDYXJkTGlzdFt0aGlzLnBsYXllckNhcmRMaXN0Lmxlbmd0aC0xXS5udW0pLHRoaXMucGxheWVyLmlzRGVhbGVyLHRoaXMucHJlX2NhcmQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBsYXllckxlZnRcIjpcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsYXllckxlZnQuaGFuZC5hZGRDYXJkKG5ldyBDYXJkKHRoaXMucGxheWVyQ2FyZExpc3RbdGhpcy5wbGF5ZXJDYXJkTGlzdC5sZW5ndGgtMV0uc3VpdCx0aGlzLnBsYXllckNhcmRMaXN0W3RoaXMucGxheWVyQ2FyZExpc3QubGVuZ3RoLTFdLm51bSksdGhpcy5wbGF5ZXIuaXNEZWFsZXIsdGhpcy5wcmVfY2FyZCxcImxlZnRcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicGxheWVyUmlnaHRcIjpcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsYXllclJpZ2h0LmhhbmQuYWRkQ2FyZChuZXcgQ2FyZCh0aGlzLnBsYXllckNhcmRMaXN0W3RoaXMucGxheWVyQ2FyZExpc3QubGVuZ3RoLTFdLnN1aXQsdGhpcy5wbGF5ZXJDYXJkTGlzdFt0aGlzLnBsYXllckNhcmRMaXN0Lmxlbmd0aC0xXS5udW0pLHRoaXMucGxheWVyLmlzRGVhbGVyLHRoaXMucHJlX2NhcmQsXCJyaWdodFwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVTY29yZXMoKTsgIC8vIOavj+asoeWPkeeJjOWQjuabtOaWsOWIhuaVsOaYvuekulxuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubm93V2hvKVxuICAgICAgICBzd2l0Y2ggKHRoaXMubm93V2hvKSB7XG4gICAgICAgICAgICBjYXNlIFwicGxheWVyTGVmdFwiOlxuICAgICAgICAgICAgICAgIGNvbnN0IHBsYXllckxlZnRTY29yZSA9IHRoaXMucGxheWVyTGVmdC5oYW5kLmdldFNjb3JlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXllckxlZnRTY29yZSA+IDIxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTGVmdGlzT3Zlcj10cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFJvdW5kKCdwbGF5ZXJMZWZ0TG9zZScsdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIC8v5Y+Y57qiXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVhbGVyVHVybihudWxsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwbGF5ZXJMZWZ0U2NvcmUgPT09IDIxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyTGVmdGlzT3Zlcj10cnVlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kUm91bmQoJ3BsYXllckxlZnRXaW4nLHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlYWxlclR1cm4obnVsbCk7ICAvLyDoh6rliqjov5vlhaXluoTlrrblm57lkIhcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicGxheWVyUmlnaHRcIjpcbiAgICAgICAgICAgICAgICBjb25zdCBwbGF5ZXJSaWdodFNjb3JlID0gdGhpcy5wbGF5ZXJSaWdodC5oYW5kLmdldFNjb3JlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXllclJpZ2h0U2NvcmUgPiAyMSkge1xuICAgICAgICAgICAgICAgICAgICAvL+WPmOe6olxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllclJpZ2h0aXNPdmVyPXRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kUm91bmQoJ3BsYXllclJpZ2h0TG9zZScsdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm93V2hvPVwicGxheWVyTGVmdFwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY29yZElkKz0xO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVSZWNvcmRJZCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpdmlkZUNvbG9yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBsYXllclJpZ2h0U2NvcmUgPT09IDIxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyUmlnaHRpc092ZXI9dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRSb3VuZCgncGxheWVyUmlnaHRXaW4nLHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vd1dobz1cInBsYXllckxlZnRcIjsgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY29yZElkKz0xO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVSZWNvcmRJZCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpdmlkZUNvbG9yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zdCBwbGF5ZXJTY29yZSA9IHRoaXMucGxheWVyLmhhbmQuZ2V0U2NvcmUoKTtcblxuICAgICAgICAgICAgICAgIC8vIOWmguaenOeOqeWutueIhueJjO+8iOWIhuaVsOWkp+S6jjIx77yJ77yM55u05o6l57uT5p2f5Zue5ZCIXG4gICAgICAgICAgICAgICAgaWYgKHBsYXllclNjb3JlID4gMjEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVCdXR0b25TdGF0ZXMoZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7ICAvLyDnpoHnlKjmiYDmnInmjInpkq7vvIzlj6rlkK/nlKjigJzmipXms6jigJ3mjInpkq5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRSb3VuZCgnZGVhbGVyJyk7ICAvLyDnjqnlrrbovpNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c546p5a625YiG5pWw562J5LqOIDIx77yM6L+b5YWl5bqE5a625Zue5ZCIXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocGxheWVyU2NvcmUgPT09IDIxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGVzKGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUpOyAgLy8g56aB55So5omA5pyJ5oyJ6ZKu77yM5Y+q5ZCv55So4oCc5oqV5rOo4oCd5oyJ6ZKuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiMjFcIilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWFsZXJUdXJuKG51bGwpOyAgLy8g6Ieq5Yqo6L+b5YWl5bqE5a625Zue5ZCIXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbiAgICAvKipcbiAgICAgKiDmm7TmlrDmk43kvZzmjInpkq7nmoTlkK/nlKjnirbmgIFcbiAgICAgKiBAcGFyYW0gZW5hYmxlSGl0IHtib29sZWFufSDmmK/lkKblkK/nlKjigJzopoHniYzigJ3mjInpkq5cbiAgICAgKiBAcGFyYW0gZW5hYmxlRG91YmxlIHtib29sZWFufSDmmK/lkKblkK/nlKjigJzlj4zlgI3kuIvms6jigJ3mjInpkq5cbiAgICAgKiBAcGFyYW0gZW5hYmxlU3RhbmQge2Jvb2xlYW59IOaYr+WQpuWQr+eUqOKAnOWBnOeJjOKAneaMiemSrlxuICAgICAqIEBwYXJhbSBlbmFibGVCZXQge2Jvb2xlYW59IOaYr+WQpuWQr+eUqOKAnOaKleazqOKAneaMiemSrlxuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlQnV0dG9uU3RhdGVzKGVuYWJsZUhpdDogYm9vbGVhbiwgZW5hYmxlRG91YmxlOiBib29sZWFuLCBlbmFibGVTdGFuZDogYm9vbGVhbiwgZW5hYmxlQmV0OiBib29sZWFuLGVuYWJsZURpdmlkZTpib29sZWFuPWZhbHNlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaGl0QnV0dG9uLmludGVyYWN0YWJsZSA9IGVuYWJsZUhpdDtcbiAgICAgICAgdGhpcy5kb3VibGVEb3duQnV0dG9uLmludGVyYWN0YWJsZSA9IGVuYWJsZURvdWJsZTtcbiAgICAgICAgdGhpcy5zdGFuZEJ1dHRvbi5pbnRlcmFjdGFibGUgPSBlbmFibGVTdGFuZDtcbiAgICAgICAgdGhpcy5iZXRCdXR0b24uaW50ZXJhY3RhYmxlID0gZW5hYmxlQmV0O1xuICAgICAgICB0aGlzLmRpdmlkZUJ1dHRvbi5pbnRlcmFjdGFibGUgPSBlbmFibGVEaXZpZGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW6hOWutueahOimgeeJjOmAu+i+kVxuICAgICAqIOW6hOWutuagueaNriBCbGFja2phY2sg6KeE5YiZ5oyB57ut6KaB54mM77yM55u05Yiw5ruh6Laz5YGc54mM5p2h5Lu2XG4gICAgICovXG4gICAgaXNlcnJvcj1mYWxzZVxuICAgIGFzeW5jIGRlYWxlclR1cm4oYW55OmFueSxpc0RvdWJsZTpib29sZWFuPWZhbHNlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGxldCBpZkVycm9yPWZhbHNlO1xuICAgICAgICBpZih0aGlzLm5vd1dobz09XCJwbGF5ZXJcInx8dGhpcy5ub3dXaG89PVwicGxheWVyTGVmdFwiKXtcbiAgICAgICAgICAgIGlmKCFpc0RvdWJsZSl7XG4gICAgICAgICAgICAgICAgYXdhaXQgSHR0cFJlcXVlc3QuZ2V0SW5zdGFuY2UoKS5zdG9wKHRoaXMucmVjb3JkSWQpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W55qE5ZON5bqUOicsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKGNjLmZpbmQoXCJDYW52YXMvcGxheWVycmlnaHRTY29yZU5vZGVcIikuYWN0aXZlJiZyZXNwb25zZS5tc2c9PT1cIm9yZGVyIHN0YXR1cyBlcnJvclwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3JkZXIgc3RhdHVzIGVycm9yXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY29yZElkLS1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVhbGVyVHVybihudWxsKVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBsaXN0PXJlc3BvbnNlLmRhdGEuYmFua2VyQ2FyZExpc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvcihsZXQgaT0xO2k8bGlzdC5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmJhbmtlckNhcmRMaXN0LnB1c2gobGlzdFtpXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgdGhpcy5iYW5rZXJDYXJkTGlzdD1yZXNwb25zZS5kYXRhLmJhbmtlckNhcmRMaXN0XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVjb3JkSWQ9LTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVSZWNvcmRJZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCflpITnkIbor7fmsYLml7blh7rplJk6JywgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICBpZkVycm9yPXRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoaWZFcnJvcil7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlcyhmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sdW9qaSgpXG4gICAgfVxuICAgIGFzeW5jIGx1b2ppKCl7XG4gICAgICAgIGlmKHRoaXMubm93V2hvPT1cInBsYXllclwifHx0aGlzLm5vd1dobz09XCJwbGF5ZXJMZWZ0XCIpe1xuICAgICAgICAgICAgLy8g5bqE5a625Zyo54K55pWw5pyq6L6+5qCH5pe26Ieq5Yqo6KaB54mMXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlcyhmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7ICAvLyDnpoHnlKjmiYDmnInmk43kvZzmjInpkq5cbiAgICAgICAgICAgIC8vIOaYvuekuuW6hOWutuesrOS6jOW8oOeJjFxuICAgICAgICAgICAgLy8gYXdhaXQgdGhpcy5mbGlwRGVhbGVyQ2FyZCgpO1xuICAgIFxuICAgICAgICAgICAgdGhpcy51cGRhdGVTY29yZXModHJ1ZSk7ICAvLyDmr4/mrKHlj5HniYzlkI7mm7TmlrDliIbmlbDmmL7npLpcbiAgICAgICAgICAgIC8vIHdoaWxlICh0aGlzLmRlYWxlci5zaG91bGRIaXQoKSkge1xuICAgICAgICAgICAgLy8gICAgIGF3YWl0IHRoaXMuZGVhbGVyLmhhbmQuYWRkQ2FyZChuZXcgQ2FyZCgxLDEpLHRoaXMuZGVhbGVyLmlzRGVhbGVyLHRoaXMucHJlX2NhcmQpO1xuICAgICAgICAgICAgLy8gICAgIHRoaXMudXBkYXRlU2NvcmVzKHRydWUpOyAgLy8g5q+P5qyh5oq954mM5ZCO5pu05paw5YiG5pWw5pi+56S6XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBpZihjYy5maW5kKFwiQ2FudmFzL0RlYWxlciBOb2RlXCIpLmNoaWxkcmVuWzFdKXtcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0RlYWxlciBOb2RlXCIpLmNoaWxkcmVuWzFdLmFjdGl2ZT1mYWxzZVxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvRGVhbGVyIE5vZGVcIikuY2hpbGRyZW5bMV0ucGFyZW50PW51bGxcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYmFua2VyQ2FyZExpc3QpXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDwgdGhpcy5iYW5rZXJDYXJkTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcblxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZGVhbGVyLmhhbmQuYWRkQ2FyZChuZXcgQ2FyZCh0aGlzLmJhbmtlckNhcmRMaXN0W2luZGV4XS5zdWl0LHRoaXMuYmFua2VyQ2FyZExpc3RbaW5kZXhdLm51bSksdGhpcy5kZWFsZXIuaXNEZWFsZXIsdGhpcy5wcmVfY2FyZCk7ICBcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjb3Jlcyh0cnVlKTsgIC8vIOavj+asoeWPkeeJjOWQjuabtOaWsOWIhuaVsOaYvuekulxuICAgICAgICAgICAgfSAgIFxuICAgIFxuICAgICAgICAgICAgLy8g5Yik5pat5bqE5a625ZKM546p5a6255qE5pyA57uI5YiG5pWw5p2l5Yaz5a6a5ri45oiP57uT5p6cXG4gICAgICAgICAgICBjb25zdCBkZWFsZXJTY29yZSA9IHRoaXMuZGVhbGVyLmhhbmQuZ2V0U2NvcmUoKTtcbiAgICBcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5ub3dXaG8pIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwicGxheWVyTGVmdFwiOlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxheWVyTGVmdFNjb3JlID0gdGhpcy5wbGF5ZXJMZWZ0LmhhbmQuZ2V0U2NvcmUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXllckxlZnRpc092ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWFsZXJTY29yZSA+IDIxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRSb3VuZCgncGxheWVyTGVmdFdpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkZWFsZXJTY29yZSA+IHBsYXllckxlZnRTY29yZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kUm91bmQoJ3BsYXllckxlZnRMb3NlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlYWxlclNjb3JlIDwgcGxheWVyTGVmdFNjb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRSb3VuZCgncGxheWVyTGVmdFdpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFJvdW5kKCdwbGF5ZXJMZWZ0UHVzaCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsYXllclJpZ2h0U2NvcmUgPSB0aGlzLnBsYXllclJpZ2h0LmhhbmQuZ2V0U2NvcmUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXllclJpZ2h0aXNPdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVhbGVyU2NvcmUgPiAyMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kUm91bmQoJ3BsYXllclJpZ2h0V2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlYWxlclNjb3JlID4gcGxheWVyUmlnaHRTY29yZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kUm91bmQoJ3BsYXllclJpZ2h0TG9zZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkZWFsZXJTY29yZSA8IHBsYXllclJpZ2h0U2NvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFJvdW5kKCdwbGF5ZXJSaWdodFdpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFJvdW5kKCdwbGF5ZXJSaWdodFB1c2gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnBsYXllclJpZ2h0aXNPdmVyJiZ0aGlzLnBsYXllckxlZnRpc092ZXIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVCdXR0b25TdGF0ZXMoZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICBcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwbGF5ZXJTY29yZSA9IHRoaXMucGxheWVyLmhhbmQuZ2V0U2NvcmUoKTtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlYWxlclNjb3JlID4gMjEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOW6hOWutueIhueJjO+8jOeOqeWutuiDnFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRSb3VuZCgncGxheWVyJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVhbGVyU2NvcmUgPiBwbGF5ZXJTY29yZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5bqE5a625YiG5pWw5pu06auY77yM5bqE5a626IOcXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFJvdW5kKCdkZWFsZXInKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkZWFsZXJTY29yZSA8IHBsYXllclNjb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDnjqnlrrbliIbmlbDmm7Tpq5jvvIznjqnlrrbog5xcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kUm91bmQoJ3BsYXllcicpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5bmz5bGAXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFJvdW5kKCdwdXNoJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLm5vd1dobz1cInBsYXllckxlZnRcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29yZElkKz0xO1xuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZVJlY29yZElkKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXZpZGVDb2xvcigpO1xuICAgICAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIGFzeW5jIGZsaXBEZWFsZXJDYXJkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuZGVhbGVyTm9kZS5jaGlsZHJlblsxXSlcbiAgICAgICAgICAgICAgICAudG8oMC4yLCB7IHNjYWxlWDogMCB9KVxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWFsZXJOb2RlLmNoaWxkcmVuWzFdLmdldENoaWxkQnlOYW1lKFwiQ2FyZEJhY2tcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudG8oMC4yLCB7IHNjYWxlWDogMSB9KVxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpOyAvLyDliqjnlLvlrozmiJDlkI7op6PmnpAgUHJvbWlzZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmo4Dmn6XmmK/lkKbmnIkgQmxhY2tqYWNrXG4gICAgICog5Zyo5Yid5aeL5Y+R54mM5ZCO6LCD55So77yM5aaC5p6c546p5a625oiW5bqE5a625pyJIEJsYWNramFjayDliJnnm7TmjqXnu5PmnZ/muLjmiI9cbiAgICAgKi9cbiAgICBjaGVja0JsYWNramFjaygpOiB2b2lkIHtcbiAgICAgICAgLy8g5Yik5pat546p5a625ZKM5bqE5a625piv5ZCm5ZCM5pe25oul5pyJIEJsYWNramFja1xuICAgICAgICBpZiAodGhpcy5wbGF5ZXIuaGFuZC5pc0JsYWNramFjaygpICYmIHRoaXMuZGVhbGVyLmhhbmQuaXNCbGFja2phY2soKSkge1xuICAgICAgICAgICAgdGhpcy5lbmRSb3VuZCgncHVzaCcpOyAgLy8g5bmz5bGA54q25oCBXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wbGF5ZXIuaGFuZC5pc0JsYWNramFjaygpKSB7XG4gICAgICAgICAgICB0aGlzLmJldHRpbmcud2luQmxhY2tqYWNrKCk7ICAvLyDnjqnlrrYgQmxhY2tqYWNrIOiDnOWIqVxuICAgICAgICAgICAgdGhpcy5lbmRSb3VuZCgncGxheWVyJyk7ICAvLyDku6Xnjqnlrrbog5zliKnnu5PmnZ9cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRlYWxlci5oYW5kLmlzQmxhY2tqYWNrKCkpIHtcbiAgICAgICAgICAgIHRoaXMuYmV0dGluZy5sb3NlKCk7ICAvLyDnjqnlrrblpLHotKXvvIzluoTlrrbog5zliKlcbiAgICAgICAgICAgIHRoaXMuZW5kUm91bmQoJ2RlYWxlcicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOe7k+adn+W9k+WJjeWbnuWQiOW5tuiuoeeul+e7k+aenFxuICAgICAqIEBwYXJhbSByZXN1bHQgeydwbGF5ZXInIHwgJ2RlYWxlcicgfCAncHVzaCcgfCAnaW5zdXJhbmNlJ30g5qC55o2u5ri45oiP57uT5p6c6L+b6KGM55u45bqU55qE57uT566XXG4gICAgICovXG4gICAgZW5kUm91bmQocmVzdWx0OiAncGxheWVyJyB8ICdkZWFsZXInIHwgJ3B1c2gnIHwgJ2luc3VyYW5jZSd8J3BsYXllckxlZnRXaW4nfCdwbGF5ZXJSaWdodFdpbid8J3BsYXllckxlZnRMb3NlJ3wncGxheWVyUmlnaHRMb3NlJ3wncGxheWVyTGVmdFB1c2gnfCdwbGF5ZXJSaWdodFB1c2gnLGJ1amllc2h1OmJvb2xlYW49ZmFsc2UpOiB2b2lkIHtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gJ3BsYXllcicpIHtcbiAgICAgICAgICAgIHRoaXMuYmV0dGluZy53aW4oKTsgIC8vIOeOqeWutui1ouW+l+ato+W4uOWvueWxgFxuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gJ2RlYWxlcicpIHtcbiAgICAgICAgICAgIHRoaXMuYmV0dGluZy5sb3NlKCk7ICAvLyDnjqnlrrbovpPmjonlr7nlsYDvvIzluoTlrrbotaLlvpflhajpg6jotYzms6hcbiAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT09ICdwdXNoJykge1xuICAgICAgICAgICAgdGhpcy5iZXR0aW5nLnB1c2goKTsgIC8vIOW5s+WxgO+8jOi/lOi/mOi1jOazqFxuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gJ2luc3VyYW5jZScpIHtcbiAgICAgICAgICAgIC8vIOeOqeWutumAieaLqeS6huKAnOS5sOS/nemZqeKAneS4lOW6hOWutiBCbGFja2phY2vvvIznjqnlrrblj6rovpPkv53pmanph5FcbiAgICAgICAgICAgIC8vIOS4jeWGjei/m+S4gOatpeaJo+mZpCBgY3VycmVudEJldGBcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXN1bHQgPT09ICdwbGF5ZXJMZWZ0V2luJykge1xuICAgICAgICAgICAgdGhpcy5iZXR0aW5nLndpbkxlZnQoKTtcbiAgICAgICAgfWVsc2UgaWYgKHJlc3VsdCA9PT0gJ3BsYXllckxlZnRMb3NlJykge1xuICAgICAgICAgICAgdGhpcy5iZXR0aW5nLmxvc2VMZWZ0KCk7XG4gICAgICAgIH1lbHNlIGlmIChyZXN1bHQgPT09ICdwbGF5ZXJMZWZ0UHVzaCcpIHtcbiAgICAgICAgICAgIHRoaXMuYmV0dGluZy5wdXNoTGVmdCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAocmVzdWx0ID09PSAncGxheWVyUmlnaHRXaW4nKSB7XG4gICAgICAgICAgICB0aGlzLmJldHRpbmcud2luUmlnaHQoKTtcbiAgICAgICAgfWVsc2UgaWYgKHJlc3VsdCA9PT0gJ3BsYXllclJpZ2h0TG9zZScpIHtcbiAgICAgICAgICAgIHRoaXMuYmV0dGluZy5sb3NlUmlnaHQoKTtcbiAgICAgICAgfWVsc2UgaWYgKHJlc3VsdCA9PT0gJ3BsYXllclJpZ2h0UHVzaCcpIHtcbiAgICAgICAgICAgIHRoaXMuYmV0dGluZy5wdXNoUmlnaHQoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8g56aB55So5omA5pyJ5pON5L2c5oyJ6ZKu77yM5YeG5aSH5LiL5LiA6L2uXG5cbiAgICAgICAgaWYoIWJ1amllc2h1KSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlcyhmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMucmVjb3JkSWQ9LTE7XG4gICAgICAgICAgICB0aGlzLnNhdmVSZWNvcmRJZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDmm7TmlrDnjqnlrrblkozluoTlrrbnmoTliIbmlbDmmL7npLpcbiAgICAgKiDlnKjmr4/mrKHmir3niYzlkI7osIPnlKjvvIznoa7kv53liIbmlbDmmL7npLrlkIzmraXmm7TmlrBcbiAgICAgKiBAcGFyYW0gc2hvd0Z1bGxEZWFsZXJTY29yZSB7Ym9vbGVhbn0g5piv5ZCm5pi+56S65bqE5a6255qE5a6M5pW05YiG5pWwXG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlU2NvcmVzKHNob3dGdWxsRGVhbGVyU2NvcmU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICAvLyDnjqnlrrbliIbmlbDmmL7npLrvvJrlpoLmnpzmmK8gQmxhY2tqYWNr77yM55u05o6l5pi+56S6IDIxXG4gICAgICAgIGNvbnN0IHBsYXllclNjb3JlID0gdGhpcy5wbGF5ZXIuaGFuZC5pc0JsYWNramFjaygpID8gMjEgOiB0aGlzLnBsYXllci5oYW5kLmdldFBvc3NpYmxlU2NvcmVzKCk7XG5cbiAgICAgICAgdGhpcy5wbGF5ZXJTY29yZUxhYmVsLnN0cmluZyA9IGAke0FycmF5LmlzQXJyYXkocGxheWVyU2NvcmUpID8gcGxheWVyU2NvcmUuam9pbignICwgJykgOiBwbGF5ZXJTY29yZX1gO1xuXG4gICAgICAgIC8vIGlmKCF0aGlzLnBsYXllcjIxICYmIHRoaXMucGxheWVyLmhhbmQuaXNCbGFja2phY2soKSl7XG4gICAgICAgIC8vICAgICB0aGlzLnBsYXllcjIxPXRydWVcbiAgICAgICAgLy8gICAgIHRoaXMuZGVhbGVyVHVybihudWxsLHRydWUpLFxuXG4gICAgICAgIC8vICAgICB0aGlzLmx1b2ppKClcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIGlmKCF0aGlzLnBsYXllcjIxICYmIHRoaXMucGxheWVyLmhhbmQuZ2V0UG9zc2libGVTY29yZXMoKVswXT09MjEpe1xuICAgICAgICAvLyAgICAgdGhpcy5kZWFsZXJUdXJuKG51bGwsdHJ1ZSlcbiAgICAgICAgLy8gICAgIHRoaXMucGxheWVyMjE9dHJ1ZVxuICAgICAgICAvLyAgICAgcmV0dXJuXG4gICAgICAgIC8vIH1cbiAgICAgICAgaWYodGhpcy5wbGF5ZXIuaGFuZC5pc0JsYWNramFjaygpfHx0aGlzLnBsYXllci5oYW5kLmdldFBvc3NpYmxlU2NvcmVzKClbMF09PTIxfHx0aGlzLnBsYXllci5oYW5kLmdldFBvc3NpYmxlU2NvcmVzKClbMV09PTIxKXtcbiAgICAgICAgICAgIGlmKHRoaXMubm93V2hvPT1cInBsYXllclwifHx0aGlzLm5vd1dobz09XCJwbGF5ZXJMZWZ0XCIpe1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGVzKGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTsgIC8vIOemgeeUqOaJgOacieaTjeS9nOaMiemSrlxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvRGVhbGVyIE5vZGVcIikuY2hpbGRyZW5bMV0uYWN0aXZlPWZhbHNlXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9EZWFsZXIgTm9kZVwiKS5jaGlsZHJlblsxXS5wYXJlbnQ9bnVsbFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYmFua2VyQ2FyZExpc3QpXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IHRoaXMuYmFua2VyQ2FyZExpc3QubGVuZ3RoOyBpbmRleCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5kZWFsZXIuaGFuZC5hZGRDYXJkKG5ldyBDYXJkKHRoaXMuYmFua2VyQ2FyZExpc3RbaW5kZXhdLnN1aXQsdGhpcy5iYW5rZXJDYXJkTGlzdFtpbmRleF0ubnVtKSx0aGlzLmRlYWxlci5pc0RlYWxlcix0aGlzLnByZV9jYXJkKTsgIFxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnVwZGF0ZVNjb3Jlcyh0cnVlKTsgIC8vIOavj+asoeWPkeeJjOWQjuabtOaWsOWIhuaVsOaYvuekulxuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWFsZXJTY29yZUxhYmVsLnN0cmluZz10aGlzLmRlYWxlci5oYW5kLmdldFNjb3JlKCkrXCJcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgY29uc3QgZGVhbGVyU2NvcmUgPSB0aGlzLmRlYWxlci5oYW5kLmdldFNjb3JlKCk7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLm5vd1dobykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicGxheWVyTGVmdFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwbGF5ZXJMZWZ0U2NvcmUgPSB0aGlzLnBsYXllckxlZnQuaGFuZC5nZXRTY29yZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXllckxlZnRpc092ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVhbGVyU2NvcmUgPiAyMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFJvdW5kKCdwbGF5ZXJMZWZ0V2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkZWFsZXJTY29yZSA+IHBsYXllckxlZnRTY29yZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFJvdW5kKCdwbGF5ZXJMZWZ0TG9zZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVhbGVyU2NvcmUgPCBwbGF5ZXJMZWZ0U2NvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRSb3VuZCgncGxheWVyTGVmdFdpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kUm91bmQoJ3BsYXllckxlZnRQdXNoJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwbGF5ZXJSaWdodFNjb3JlID0gdGhpcy5wbGF5ZXJSaWdodC5oYW5kLmdldFNjb3JlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMucGxheWVyUmlnaHRpc092ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVhbGVyU2NvcmUgPiAyMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFJvdW5kKCdwbGF5ZXJSaWdodFdpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVhbGVyU2NvcmUgPiBwbGF5ZXJSaWdodFNjb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kUm91bmQoJ3BsYXllclJpZ2h0TG9zZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVhbGVyU2NvcmUgPCBwbGF5ZXJSaWdodFNjb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kUm91bmQoJ3BsYXllclJpZ2h0V2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRSb3VuZCgncGxheWVyUmlnaHRQdXNoJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5wbGF5ZXJSaWdodGlzT3ZlciYmdGhpcy5wbGF5ZXJMZWZ0aXNPdmVyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlcyhmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxheWVyU2NvcmUgPSB0aGlzLnBsYXllci5oYW5kLmdldFNjb3JlKCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlYWxlclNjb3JlID4gMjEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlpoLmnpzluoTlrrbniIbniYzvvIznjqnlrrbog5xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFJvdW5kKCdwbGF5ZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVhbGVyU2NvcmUgPiBwbGF5ZXJTY29yZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOW6hOWutuWIhuaVsOabtOmrmO+8jOW6hOWutuiDnFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kUm91bmQoJ2RlYWxlcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkZWFsZXJTY29yZSA8IHBsYXllclNjb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g546p5a625YiG5pWw5pu06auY77yM546p5a626IOcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRSb3VuZCgncGxheWVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOW5s+WxgFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kUm91bmQoJ3B1c2gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMubm93V2hvPVwicGxheWVyTGVmdFwiO1xuICAgICAgICAgICAgICAgIHRoaXMucmVjb3JkSWQrPTE7XG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlUmVjb3JkSWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpdmlkZUNvbG9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyDnjqnlrrbliIbniYzlt6bliIbmlbDmmL7npLrvvJrlpoLmnpzmmK8gQmxhY2tqYWNr77yM55u05o6l5pi+56S6IDIxXG4gICAgICAgIGNvbnN0IHBsYXllckxlZnRTY29yZSA9IHRoaXMucGxheWVyTGVmdC5oYW5kLmlzQmxhY2tqYWNrKCkgPyAyMSA6IHRoaXMucGxheWVyTGVmdC5oYW5kLmdldFBvc3NpYmxlU2NvcmVzKCk7XG4gICAgICAgIHRoaXMucGxheWVyTGVmdFNjb3JlTGFiZWwuc3RyaW5nID0gYCR7QXJyYXkuaXNBcnJheShwbGF5ZXJMZWZ0U2NvcmUpID8gcGxheWVyTGVmdFNjb3JlLmpvaW4oJyAsICcpIDogcGxheWVyTGVmdFNjb3JlfWA7XG4gICAgICAgIGlmKCF0aGlzLnBsYXllckxlZnQyMSAmJiB0aGlzLnBsYXllckxlZnQuaGFuZC5pc0JsYWNramFjaygpKXt0aGlzLm5vd1dobz1cInBsYXllckxlZnRcIix0aGlzLnJlY29yZElkKz0xLHRoaXMuc2F2ZVJlY29yZElkKCksdGhpcy5wbGF5ZXJMZWZ0MjE9dHJ1ZX0vL1xuICAgICAgICAvLyDnjqnlrrbliIbniYzlj7PliIbmlbDmmL7npLrvvJrlpoLmnpzmmK8gQmxhY2tqYWNr77yM55u05o6l5pi+56S6IDIxXG4gICAgICAgIGNvbnN0IHBsYXllclJpZ2h0U2NvcmUgPSB0aGlzLnBsYXllclJpZ2h0LmhhbmQuaXNCbGFja2phY2soKSA/IDIxIDogdGhpcy5wbGF5ZXJSaWdodC5oYW5kLmdldFBvc3NpYmxlU2NvcmVzKCk7XG4gICAgICAgIHRoaXMucGxheWVyUmlnaHRTY29yZUxhYmVsLnN0cmluZyA9IGAke0FycmF5LmlzQXJyYXkocGxheWVyUmlnaHRTY29yZSkgPyBwbGF5ZXJSaWdodFNjb3JlLmpvaW4oJyAsICcpIDogcGxheWVyUmlnaHRTY29yZX1gO1xuICAgICAgICBpZighdGhpcy5wbGF5ZXJSaWdodDIxICYmIHRoaXMucGxheWVyUmlnaHQuaGFuZC5pc0JsYWNramFjaygpKXt0aGlzLmRlYWxlclR1cm4obnVsbCksdGhpcy5wbGF5ZXJSaWdodDIxPXRydWV9Ly9cbiAgICAgICAgLy8g5bqE5a625YiG5pWw5pi+56S677ya5aaC5p6c5pivIEJsYWNramFja++8jOebtOaOpeaYvuekuiAyMVxuICAgICAgICBjb25zdCBkZWFsZXJTY29yZSA9ICh0aGlzLmRlYWxlci5oYW5kLmlzQmxhY2tqYWNrKCkmJiF0aGlzLmluc3VyYW5jZUJ1dHRvbi5ub2RlLmFjdGl2ZSk/IDIxIDogKHNob3dGdWxsRGVhbGVyU2NvcmUgPyB0aGlzLmRlYWxlci5oYW5kLmdldFBvc3NpYmxlU2NvcmVzKCkgOiBbdGhpcy5kZWFsZXIuaGFuZC5jYXJkc1swXS5nZXRWYWx1ZSgpXSk7XG4gICAgICAgIHRoaXMuZGVhbGVyU2NvcmVMYWJlbC5zdHJpbmcgPSBgJHtBcnJheS5pc0FycmF5KGRlYWxlclNjb3JlKSA/IGRlYWxlclNjb3JlLmpvaW4oJyAsICcpIDogZGVhbGVyU2NvcmV9YDtcblxuICAgICAgICB0aGlzLmRpdmlkZUNvbG9yKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOabtOaWsOaKleazqOmineaYvuekulxuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlQmV0RGlzcGxheSgpOiB2b2lkIHtcbiAgICAgICAgLy8g5bCG5oqV5rOo6aKd5qC85byP5YyW5Li65Lik5L2N5bCP5pWw5pi+56S6XG4gICAgICAgIHRoaXMuY3VycmVudEJldExhYmVsLnN0cmluZyA9IGAke3RoaXMuY3VycmVudEJldC50b0ZpeGVkKDIpfWA7XG4gICAgICAgIHRoaXMuYmV0dGluZy5wbGFjZUJldCh0aGlzLmN1cnJlbnRCZXQpOyAgLy8g6K6+572u6buY6K6k5LiL5rOo6YeR6aKd77yI5Y+v5Lul5qC55o2u6ZyA6KaB6LCD5pW05oiW6K6+572u5Li655So5oi36L6T5YWl5YC877yJXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YeP5Y2K5oqV5rOo6aKdXG4gICAgICovXG4gICAgaGFsZkJldCgpOiB2b2lkIHtcbiAgICAgICAgLy8g5Y+q5pyJ5b2T5oqV5rOo6aKd5aSn5LqOIDAg5pe25omN5YeP5Y2KXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRCZXQgPiAwKSB7XG4gICAgICAgICAgICBpZih0aGlzLmN1cnJlbnRCZXQgPT0gMC4wMSkgdGhpcy5jdXJyZW50QmV0PTAuMDA7XG4gICAgICAgICAgICBlbHNlIHRoaXMuY3VycmVudEJldCAvPSAyO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVCZXREaXNwbGF5KCk7ICAvLyDmm7TmlrDmmL7npLpcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDnv7vlgI3mipXms6jpop1cbiAgICAgKi9cbiAgICBkb3VibGVCZXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3VycmVudEJldCAqPSAyO1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50QmV0ID09IDApIHRoaXMuY3VycmVudEJldD0wLjAxO1xuICAgICAgICB0aGlzLnVwZGF0ZUJldERpc3BsYXkoKTsgIC8vIOabtOaWsOaYvuekulxuICAgIH1cbiAgICAvLyDliIfmjaLor63oqIDmlrnms5VcbiAgICBzd2l0Y2hMYW5ndWFnZSgpIHtcbiAgICAgICAgY29uc3QgY3VycmVudExhbmcgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDdXJyZW50TGFuZ3VhZ2UoKTtcbiAgICAgICAgY29uc3QgbmV4dExhbmcgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROZXh0TGFuZ3VhZ2UoY3VycmVudExhbmcpO1xuICAgICAgICBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRMYW5ndWFnZShuZXh0TGFuZyk7XG4gICAgfVxuXG4gICAgYmV0bnVtOm51bWJlcj0wOy8v5LiL5rOo6YeR6aKdXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIFRFWFRfTEFCRUw6Y2MuTGFiZWw9bnVsbDtcbiAgICBwcml2YXRlIGluaXRUZXh0TGFiZWwoKSB7XG4gICAgICAgIGNvbnN0IGVkaXRCb3ggPSB0aGlzLlRFWFRfTEFCRUwubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpO1xuICAgICAgICBpZiAoZWRpdEJveCkge1xuICAgICAgICAgICAgLy8g5re75YqgIFRFWFRfQ0hBTkdFRCDkuovku7bnm5HlkKxcbiAgICAgICAgICAgIGVkaXRCb3gubm9kZS5vbigndGV4dC1jaGFuZ2VkJywgKGVkaXRib3g6IGNjLkVkaXRCb3gpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gZWRpdGJveC5zdHJpbmc7XG4gICAgICAgICAgICAgICAgLy8g5YWB6K645pWw5a2X5ZKM5bCP5pWw54K577yM5L2G6KaB5aSE55CG54m55q6K5oOF5Ya1XG4gICAgICAgICAgICAgICAgbGV0IG51bWVyaWNWYWx1ZSA9IHRleHQucmVwbGFjZSgvW14wLTkuXS9nLCAnJyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8g5aSE55CG5aSa5Liq5bCP5pWw54K555qE5oOF5Ya177yM5Y+q5L+d55WZ56ys5LiA5Liq5bCP5pWw54K5XG4gICAgICAgICAgICAgICAgY29uc3QgZG90SW5kZXggPSBudW1lcmljVmFsdWUuaW5kZXhPZignLicpO1xuICAgICAgICAgICAgICAgIGlmIChkb3RJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmVmb3JlRG90ID0gbnVtZXJpY1ZhbHVlLnN1YnN0cmluZygwLCBkb3RJbmRleCArIDEpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZnRlckRvdCA9IG51bWVyaWNWYWx1ZS5zdWJzdHJpbmcoZG90SW5kZXggKyAxKS5yZXBsYWNlKC9cXC4vZywgJycpO1xuICAgICAgICAgICAgICAgICAgICBudW1lcmljVmFsdWUgPSBiZWZvcmVEb3QgKyBhZnRlckRvdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c56ys5LiA5Liq5a2X56ym5piv5bCP5pWw54K577yM5Zyo5YmN6Z2i5re75YqgMFxuICAgICAgICAgICAgICAgIGlmIChudW1lcmljVmFsdWUuc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgICAgICAgICAgICAgICAgIG51bWVyaWNWYWx1ZSA9ICcwJyArIG51bWVyaWNWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8g6L2s5o2i5Li65pWw5a2X6L+b6KGM6IyD5Zu05qOA5p+lXG4gICAgICAgICAgICAgICAgbGV0IG51bWJlclZhbHVlID0gTnVtYmVyKG51bWVyaWNWYWx1ZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8g6ZmQ5Yi25pyA5bCP5YC85ZKM5pyA5aSn5YC8XG4gICAgICAgICAgICAgICAgaWYgKG51bWJlclZhbHVlIDwgdGhpcy5taW5TdGFrZSkge1xuICAgICAgICAgICAgICAgICAgICBudW1iZXJWYWx1ZSA9IHRoaXMubWluU3Rha2U7XG4gICAgICAgICAgICAgICAgICAgIG51bWVyaWNWYWx1ZSA9IHRoaXMubWluU3Rha2UrJyc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChudW1iZXJWYWx1ZSA+IHRoaXMubWF4U3Rha2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbnVtYmVyVmFsdWUgPSB0aGlzLm1heFN0YWtlO1xuICAgICAgICAgICAgICAgICAgICBudW1lcmljVmFsdWUgPSB0aGlzLm1heFN0YWtlKycnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodGV4dCAhPT0gbnVtZXJpY1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVkaXRib3guc3RyaW5nID0gbnVtZXJpY1ZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmJldG51bSA9IG51bWJlclZhbHVlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8g6K6+572u5Yid5aeL5YC8XG4gICAgICAgICAgICBlZGl0Qm94LnN0cmluZyA9IHRoaXMubWluU3Rha2UrJyc7XG4gICAgICAgICAgICB0aGlzLmJldG51bSA9IHRoaXMubWluU3Rha2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQ2hlbmdPckNodShldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCwgc3RyaW5nOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IG5ld1ZhbHVlOiBudW1iZXI7XG4gICAgICAgIFxuICAgICAgICBpZiAoc3RyaW5nID09IFwiMVwiKSB7XG4gICAgICAgICAgICAvLyDkuZgyXG4gICAgICAgICAgICB0aGlzLmJldG51bSA9IE51bWJlcih0aGlzLlRFWFRfTEFCRUwuc3RyaW5nKTtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdGhpcy5iZXRudW0gKiAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8g6ZmkMlxuICAgICAgICAgICAgdGhpcy5iZXRudW0gPSBOdW1iZXIodGhpcy5URVhUX0xBQkVMLnN0cmluZyk7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IE51bWJlcigodGhpcy5iZXRudW0gLyAyKS50b0ZpeGVkKDIpKTsgLy8g5L+d55WZ5Lik5L2N5bCP5pWwXG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgLy8g6ZmQ5Yi25pyA5aSn5pyA5bCP5YC8XG4gICAgICAgIGlmIChuZXdWYWx1ZSA8IHRoaXMubWluU3Rha2UpIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdGhpcy5taW5TdGFrZTtcbiAgICAgICAgfSBlbHNlIGlmIChuZXdWYWx1ZSA+IHRoaXMubWF4U3Rha2UpIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdGhpcy5tYXhTdGFrZTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICAvLyDmm7TmlrDlgLxcbiAgICAgICAgdGhpcy5iZXRudW0gPSBuZXdWYWx1ZTtcbiAgICAgICAgdGhpcy5URVhUX0xBQkVMLnN0cmluZyA9IG5ld1ZhbHVlLnRvU3RyaW5nKCk7XG4gICAgXG4gICAgfVxuICAgIG5ld2dhbWUoKXtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwibWFpblNjZW5lSHR0cFwiKTtcbiAgICB9XG4gICAgb3Blbk9yY2xvc2UoYW55LHN0cil7XG4gICAgICAgIGlmKHN0cj09XCIxXCIpe1xuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9HdWl6ZVwiKS5hY3RpdmU9dHJ1ZVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3VpemVcIikuYWN0aXZlPWZhbHNlXG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=