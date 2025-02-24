"use strict";
cc._RF.push(module, 'db1c7eUXvtK4KduieLNMWfv', 'Hand');
// scripts/Hand.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
/**
 * Hand 类表示玩家或庄家的手牌
 */
var Hand = /** @class */ (function () {
    function Hand() {
        this.cards = []; // 存储当前的手牌
    }
    /**
     * 添加一张牌到手牌
     * @param card {Card} 需要添加的牌
     */
    Hand.prototype.addCard = function (card, isDealer, pre_card, device) {
        var _this = this;
        if (device === void 0) { device = "no"; }
        return new Promise(function (resolve) {
            // 创建卡牌实例
            var ins_card = cc.instantiate(pre_card);
            var startPos = cc.v2(550, 1000); // 牌堆位置
            // 设置父节点
            if (isDealer) {
                ins_card.parent = cc.find("Canvas/Dealer Node");
            }
            else {
                if (device == "left") {
                    ins_card.parent = cc.find("Canvas/Player Node left");
                }
                else if (device == "right") {
                    ins_card.parent = cc.find("Canvas/Player Node right");
                }
                else {
                    ins_card.parent = cc.find("Canvas/Player Node");
                }
            }
            // 设置初始位置和随机卡面
            ins_card.setPosition(startPos);
            var a = Math.floor(Math.random() * 4);
            ins_card.getChildByName("Card").children[a].active = true;
            // 计算目标位置
            var targetPos = cc.v2(0, 0);
            if (ins_card.parent.childrenCount > 1) {
                targetPos = cc.v2((ins_card.parent.childrenCount - 1) * 49, ins_card.parent.children[ins_card.parent.childrenCount - 2].getPosition().y - 30);
            }
            else {
                targetPos = cc.v2(0, 0);
            }
            // 设置卡牌数值
            cc.find("/Card/Label", ins_card).getComponent(cc.Label).string = _this.clickRank(card.rank);
            if (cc.find("Canvas/Game Node").getComponent(Game_1.default).isActive && isDealer && cc.find("Canvas/Dealer Node").childrenCount === 2) {
                ins_card.setPosition(targetPos);
                cc.tween(ins_card)
                    .to(0.2, { scaleX: 0 })
                    .call(function () {
                    ins_card.getChildByName("CardBack").active = false;
                })
                    .to(0.2, { scaleX: 1 })
                    .call(function () {
                    _this.cards.push(card);
                    resolve(); // 动画完成后解析 Promise
                })
                    .start();
            }
            else {
                // 执行移动动画
                cc.tween(ins_card)
                    .to(0.5, { position: cc.v3(targetPos) })
                    .call(function () {
                    if (ins_card.parent.childrenCount != 2 || ins_card.parent.name != "Dealer Node") {
                        cc.tween(ins_card)
                            .to(0.2, { scaleX: 0 })
                            .call(function () {
                            ins_card.getChildByName("CardBack").active = false;
                        })
                            .to(0.2, { scaleX: 1 })
                            .call(function () {
                            _this.cards.push(card);
                            resolve(); // 动画完成后解析 Promise
                        })
                            .start();
                    }
                    else {
                        cc.find("Canvas/Game Node").getComponent(Game_1.default).isActive = true;
                        _this.cards.push(card);
                        resolve();
                    }
                })
                    .start();
            }
        });
    };
    /**
     * 根据rank数值
     * 反推牌面
     */
    Hand.prototype.clickRank = function (rank) {
        if (cc.find("Canvas/playerScoreNode").active) {
            switch (rank) {
                case 1: return "A";
                case 11: return "J";
                case 12: return "Q";
                case 13: return "K";
                default: return rank.toString();
            }
        }
        else {
            switch (rank) {
                case 1: return "A";
                case 11: return "J";
                case 12: return "Q";
                case 13: return "K";
                default: return rank.toString();
            }
        }
    };
    /**
     * 计算手牌的总点数
     * 根据 A 的情况动态调整点数
     */
    Hand.prototype.getScore = function () {
        var score = 0;
        var aceCount = 0;
        // 遍历手牌计算总点数
        this.cards.forEach(function (card) {
            score += card.getValue();
            if (card.isAce())
                aceCount++;
        });
        // 如果点数超过21且有A，则A可以算作1点
        while (score > 21 && aceCount > 0) {
            score -= 10;
            aceCount--;
        }
        return score;
    };
    /**
    * 获取所有可能的分数列表，考虑 A 的双重值
    * 如果有 A，返回 [低分, 高分]；没有 A 则返回 [分数]
    */
    Hand.prototype.getPossibleScores = function () {
        var baseScore = 0;
        var aceCount = 0;
        // 将所有 A 初始计作 1 分，计算基础分数
        this.cards.forEach(function (card) {
            var value = card.isAce() ? 1 : card.getValue(); // A 初始按 1 计算
            baseScore += value;
            if (card.isAce())
                aceCount++;
        });
        // 如果没有 A，直接返回唯一的分数
        if (aceCount === 0)
            return [baseScore];
        // 如果有 A，计算两种可能的分数
        var lowScore = baseScore; // 所有 A 计为 1
        var highScore = baseScore + 10; // 将一个 A 计为 11
        // 如果高分数超过 21，只返回低分数；否则返回两种分数
        return highScore > 21 ? [lowScore] : [lowScore, highScore];
    };
    /**
     * 判断是否为 Blackjack（21点）
     * 如果两张牌总数为 21，即为 Blackjack
     */
    Hand.prototype.isBlackjack = function () {
        return this.cards.length === 2 && this.getScore() === 21;
    };
    /**
     * 判断是否爆牌（点数超过 21）
     */
    Hand.prototype.isBust = function () {
        return this.getScore() > 21;
    };
    /**
     * 清空手牌
     */
    Hand.prototype.clear = function () {
        this.cards = [];
    };
    return Hand;
}());
exports.default = Hand;

cc._RF.pop();