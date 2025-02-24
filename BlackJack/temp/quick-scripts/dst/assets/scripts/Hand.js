
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Hand.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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S0FBSyxDQUFDO1lBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXZDLGtCQUFrQjtRQUNsQixJQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBRSxZQUFZO1FBQ3pDLElBQU0sU0FBUyxHQUFHLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBRSxjQUFjO1FBRWpELDZCQUE2QjtRQUM3QixPQUFPLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRDs7O09BR0c7SUFDSCwwQkFBVyxHQUFYO1FBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxxQkFBTSxHQUFOO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7T0FFRztJQUNILG9CQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ0wsV0FBQztBQUFELENBL0tBLEFBK0tDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ2FyZCBmcm9tICcuL0NhcmQnO1xuaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcblxuLyoqXG4gKiBIYW5kIOexu+ihqOekuueOqeWutuaIluW6hOWutueahOaJi+eJjFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYW5kIHtcbiAgICBwdWJsaWMgY2FyZHM6IENhcmRbXSA9IFtdOyAgLy8g5a2Y5YKo5b2T5YmN55qE5omL54mMXG5cbiAgICAvKipcbiAgICAgKiDmt7vliqDkuIDlvKDniYzliLDmiYvniYxcbiAgICAgKiBAcGFyYW0gY2FyZCB7Q2FyZH0g6ZyA6KaB5re75Yqg55qE54mMXG4gICAgICovXG4gICAgYWRkQ2FyZChjYXJkOiBDYXJkLGlzRGVhbGVyOmJvb2xlYW4scHJlX2NhcmQ6Y2MuUHJlZmFiLGRldmljZTpzdHJpbmc9XCJub1wiKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgLy8g5Yib5bu65Y2h54mM5a6e5L6LXG4gICAgICAgICAgICBsZXQgaW5zX2NhcmQgPSBjYy5pbnN0YW50aWF0ZShwcmVfY2FyZCk7XG4gICAgICAgICAgICBjb25zdCBzdGFydFBvcyA9IGNjLnYyKDU1MCwgMTAwMCk7IC8vIOeJjOWghuS9jee9rlxuXG4gICAgICAgICAgICAvLyDorr7nva7niLboioLngrlcbiAgICAgICAgICAgIGlmKGlzRGVhbGVyKXtcbiAgICAgICAgICAgICAgICBpbnNfY2FyZC5wYXJlbnQgPSBjYy5maW5kKFwiQ2FudmFzL0RlYWxlciBOb2RlXCIpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYoZGV2aWNlPT1cImxlZnRcIil7XG4gICAgICAgICAgICAgICAgICAgIGluc19jYXJkLnBhcmVudCA9IGNjLmZpbmQoXCJDYW52YXMvUGxheWVyIE5vZGUgbGVmdFwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoZGV2aWNlPT1cInJpZ2h0XCIpe1xuICAgICAgICAgICAgICAgICAgICBpbnNfY2FyZC5wYXJlbnQgPSBjYy5maW5kKFwiQ2FudmFzL1BsYXllciBOb2RlIHJpZ2h0XCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgaW5zX2NhcmQucGFyZW50ID0gY2MuZmluZChcIkNhbnZhcy9QbGF5ZXIgTm9kZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIOiuvue9ruWIneWni+S9jee9ruWSjOmaj+acuuWNoemdolxuICAgICAgICAgICAgaW5zX2NhcmQuc2V0UG9zaXRpb24oc3RhcnRQb3MpO1xuICAgICAgICAgICAgbGV0IGE9TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjQpXG4gICAgICAgICAgICBpbnNfY2FyZC5nZXRDaGlsZEJ5TmFtZShcIkNhcmRcIikuY2hpbGRyZW5bYV0uYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8g6K6h566X55uu5qCH5L2N572uXG4gICAgICAgICAgICBsZXQgdGFyZ2V0UG9zID0gY2MudjIoMCwgMCk7XG4gICAgICAgICAgICBpZihpbnNfY2FyZC5wYXJlbnQuY2hpbGRyZW5Db3VudD4xKXtcbiAgICAgICAgICAgICAgICB0YXJnZXRQb3MgPSBjYy52MigoaW5zX2NhcmQucGFyZW50LmNoaWxkcmVuQ291bnQtMSkqNDksaW5zX2NhcmQucGFyZW50LmNoaWxkcmVuW2luc19jYXJkLnBhcmVudC5jaGlsZHJlbkNvdW50LTJdLmdldFBvc2l0aW9uKCkueS0zMClcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRhcmdldFBvcyA9IGNjLnYyKDAsMClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8g6K6+572u5Y2h54mM5pWw5YC8XG5cbiAgICAgICAgICAgIGNjLmZpbmQoXCIvQ2FyZC9MYWJlbFwiLGluc19jYXJkKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz10aGlzLmNsaWNrUmFuayhjYXJkLnJhbmspXG4gICAgICAgICAgICBpZihjYy5maW5kKFwiQ2FudmFzL0dhbWUgTm9kZVwiKS5nZXRDb21wb25lbnQoR2FtZSkuaXNBY3RpdmUmJmlzRGVhbGVyJiZjYy5maW5kKFwiQ2FudmFzL0RlYWxlciBOb2RlXCIpLmNoaWxkcmVuQ291bnQ9PT0yKXtcbiAgICAgICAgICAgICAgICBpbnNfY2FyZC5zZXRQb3NpdGlvbih0YXJnZXRQb3MpO1xuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGluc19jYXJkKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvKDAuMiwgeyBzY2FsZVg6IDAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNfY2FyZC5nZXRDaGlsZEJ5TmFtZShcIkNhcmRCYWNrXCIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50bygwLjIsIHsgc2NhbGVYOiAxIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJkcy5wdXNoKGNhcmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTsgLy8g5Yqo55S75a6M5oiQ5ZCO6Kej5p6QIFByb21pc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vIOaJp+ihjOenu+WKqOWKqOeUu1xuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGluc19jYXJkKVxuICAgICAgICAgICAgICAgICAgICAudG8oMC41LCB7IHBvc2l0aW9uOiBjYy52Myh0YXJnZXRQb3MpIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGluc19jYXJkLnBhcmVudC5jaGlsZHJlbkNvdW50IT0yfHxpbnNfY2FyZC5wYXJlbnQubmFtZSE9XCJEZWFsZXIgTm9kZVwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihpbnNfY2FyZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG8oMC4yLCB7IHNjYWxlWDogMCB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zX2NhcmQuZ2V0Q2hpbGRCeU5hbWUoXCJDYXJkQmFja1wiKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50bygwLjIsIHsgc2NhbGVYOiAxIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmRzLnB1c2goY2FyZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTsgLy8g5Yqo55S75a6M5oiQ5ZCO6Kej5p6QIFByb21pc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9HYW1lIE5vZGVcIikuZ2V0Q29tcG9uZW50KEdhbWUpLmlzQWN0aXZlPXRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmRzLnB1c2goY2FyZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7IFxuICAgIH1cbiAgICAvKipcbiAgICAgKiDmoLnmja5yYW5r5pWw5YC8XG4gICAgICog5Y+N5o6o54mM6Z2iXG4gICAgICovXG4gICAgY2xpY2tSYW5rKHJhbms6bnVtYmVyKTpzdHJpbmd7XG4gICAgICAgIGlmKGNjLmZpbmQoXCJDYW52YXMvcGxheWVyU2NvcmVOb2RlXCIpLmFjdGl2ZSl7XG4gICAgICAgICAgICBzd2l0Y2ggKHJhbmspIHtcbiAgICAgICAgICAgICAgICBjYXNlIDE6cmV0dXJuIFwiQVwiXG4gICAgICAgICAgICAgICAgY2FzZSAxMTpyZXR1cm4gXCJKXCJcbiAgICAgICAgICAgICAgICBjYXNlIDEyOnJldHVybiBcIlFcIlxuICAgICAgICAgICAgICAgIGNhc2UgMTM6cmV0dXJuIFwiS1wiXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpyZXR1cm4gcmFuay50b1N0cmluZygpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgc3dpdGNoIChyYW5rKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxOnJldHVybiBcIkFcIlxuICAgICAgICAgICAgICAgIGNhc2UgMTE6cmV0dXJuIFwiSlwiXG4gICAgICAgICAgICAgICAgY2FzZSAxMjpyZXR1cm4gXCJRXCJcbiAgICAgICAgICAgICAgICBjYXNlIDEzOnJldHVybiBcIktcIlxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6cmV0dXJuIHJhbmsudG9TdHJpbmcoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6h566X5omL54mM55qE5oC754K55pWwXG4gICAgICog5qC55o2uIEEg55qE5oOF5Ya15Yqo5oCB6LCD5pW054K55pWwXG4gICAgICovXG4gICAgZ2V0U2NvcmUoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHNjb3JlID0gMDtcbiAgICAgICAgbGV0IGFjZUNvdW50ID0gMDtcblxuICAgICAgICAvLyDpgY3ljobmiYvniYzorqHnrpfmgLvngrnmlbBcbiAgICAgICAgdGhpcy5jYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgICAgICAgc2NvcmUgKz0gY2FyZC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgaWYgKGNhcmQuaXNBY2UoKSkgYWNlQ291bnQrKztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8g5aaC5p6c54K55pWw6LaF6L+HMjHkuJTmnIlB77yM5YiZQeWPr+S7peeul+S9nDHngrlcbiAgICAgICAgd2hpbGUgKHNjb3JlID4gMjEgJiYgYWNlQ291bnQgPiAwKSB7XG4gICAgICAgICAgICBzY29yZSAtPSAxMDtcbiAgICAgICAgICAgIGFjZUNvdW50LS07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNjb3JlO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiDojrflj5bmiYDmnInlj6/og73nmoTliIbmlbDliJfooajvvIzogIPomZEgQSDnmoTlj4zph43lgLxcbiAgICAgKiDlpoLmnpzmnIkgQe+8jOi/lOWbniBb5L2O5YiGLCDpq5jliIZd77yb5rKh5pyJIEEg5YiZ6L+U5ZueIFvliIbmlbBdXG4gICAgICovXG4gICAgIGdldFBvc3NpYmxlU2NvcmVzKCk6IG51bWJlcltdIHtcbiAgICAgICAgbGV0IGJhc2VTY29yZSA9IDA7XG4gICAgICAgIGxldCBhY2VDb3VudCA9IDA7XG5cbiAgICAgICAgLy8g5bCG5omA5pyJIEEg5Yid5aeL6K6h5L2cIDEg5YiG77yM6K6h566X5Z+656GA5YiG5pWwXG4gICAgICAgIHRoaXMuY2FyZHMuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY2FyZC5pc0FjZSgpID8gMSA6IGNhcmQuZ2V0VmFsdWUoKTsgIC8vIEEg5Yid5aeL5oyJIDEg6K6h566XXG4gICAgICAgICAgICBiYXNlU2NvcmUgKz0gdmFsdWU7XG4gICAgICAgICAgICBpZiAoY2FyZC5pc0FjZSgpKSBhY2VDb3VudCsrO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyDlpoLmnpzmsqHmnIkgQe+8jOebtOaOpei/lOWbnuWUr+S4gOeahOWIhuaVsFxuICAgICAgICBpZiAoYWNlQ291bnQgPT09IDApIHJldHVybiBbYmFzZVNjb3JlXTtcblxuICAgICAgICAvLyDlpoLmnpzmnIkgQe+8jOiuoeeul+S4pOenjeWPr+iDveeahOWIhuaVsFxuICAgICAgICBjb25zdCBsb3dTY29yZSA9IGJhc2VTY29yZTsgIC8vIOaJgOaciSBBIOiuoeS4uiAxXG4gICAgICAgIGNvbnN0IGhpZ2hTY29yZSA9IGJhc2VTY29yZSArIDEwOyAgLy8g5bCG5LiA5LiqIEEg6K6h5Li6IDExXG5cbiAgICAgICAgLy8g5aaC5p6c6auY5YiG5pWw6LaF6L+HIDIx77yM5Y+q6L+U5Zue5L2O5YiG5pWw77yb5ZCm5YiZ6L+U5Zue5Lik56eN5YiG5pWwXG4gICAgICAgIHJldHVybiBoaWdoU2NvcmUgPiAyMSA/IFtsb3dTY29yZV0gOiBbbG93U2NvcmUsIGhpZ2hTY29yZV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yik5pat5piv5ZCm5Li6IEJsYWNramFja++8iDIx54K577yJXG4gICAgICog5aaC5p6c5Lik5byg54mM5oC75pWw5Li6IDIx77yM5Y2z5Li6IEJsYWNramFja1xuICAgICAqL1xuICAgIGlzQmxhY2tqYWNrKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jYXJkcy5sZW5ndGggPT09IDIgJiYgdGhpcy5nZXRTY29yZSgpID09PSAyMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliKTmlq3mmK/lkKbniIbniYzvvIjngrnmlbDotoXov4cgMjHvvIlcbiAgICAgKi9cbiAgICBpc0J1c3QoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNjb3JlKCkgPiAyMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmuIXnqbrmiYvniYxcbiAgICAgKi9cbiAgICBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jYXJkcyA9IFtdO1xuICAgIH1cbn1cbiJdfQ==