"use strict";
cc._RF.push(module, '8f2046y5rVP5qGWDNdEghmS', 'Betting');
// scripts/Betting.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Betting 类处理下注金额和余额的计算
 */
var Betting = /** @class */ (function () {
    function Betting() {
        this.betAmount = 10; // 每轮下注金额
        this.playerBalance = 100; // 玩家初始余额
        //吕布：真实伤害
        //马超：队友部分经济转化为自身经济
        //关羽：把敌人往队友身边撞
        //程咬金：持续恢复最大生命值，生命值越低伤害越高
        //韩信：敌人部分经济转换为自身经济
        //
        //诸葛亮：斩杀200距离内30生命值以下的敌人
        //貂蝉：真实伤害 概率无敌
        //安其拉：往400距离内的敌人丢一个很痛的大火球
        //后裔：往生命值最低的敌人方向丢一个大鸟，命中第一个敌人眩晕，
        //马克：真实伤害，被瑶附身的概率大
        //守约：狙击
        //瑶：附身队友，加护盾
        //蔡文姬：给附近的队友恢复大量生命值
        //张飞：给附近的队友增加大量护盾
        //太乙真人：队友复活
    }
    /**
     * 设置下注金额
     * @param amount {number} 设置的赌注金额
     */
    Betting.prototype.placeBet = function (amount) {
        this.betAmount = amount;
    };
    /**
     * 玩家赢得普通对局
     * 奖励 2 倍的赌注
     */
    Betting.prototype.win = function () {
        this.playerBalance += this.betAmount * 2;
        var playerNode = cc.find("Canvas/Player Node");
        for (var i = 0; i < playerNode.childrenCount; i++) {
            playerNode.children[i].getChildByName("Sign").active = true;
            playerNode.children[i].getChildByName("Sign").color = cc.color(0, 255, 56, 255);
        }
        cc.find("Canvas/playerScoreNode").color = cc.color(0, 255, 56, 255);
    };
    Betting.prototype.winLeft = function () {
        this.playerBalance += this.betAmount * 2;
        var playerNode = cc.find("Canvas/Player Node left");
        for (var i = 0; i < playerNode.childrenCount; i++) {
            playerNode.children[i].getChildByName("Sign").active = true;
            playerNode.children[i].getChildByName("Sign").color = cc.color(0, 255, 56, 255);
        }
        cc.find("Canvas/playerleftScoreNode").color = cc.color(0, 255, 56, 255);
    };
    Betting.prototype.winRight = function () {
        this.playerBalance += this.betAmount * 2;
        var playerNode = cc.find("Canvas/Player Node right");
        for (var i = 0; i < playerNode.childrenCount; i++) {
            playerNode.children[i].getChildByName("Sign").active = true;
            playerNode.children[i].getChildByName("Sign").color = cc.color(0, 255, 56, 255);
        }
        cc.find("Canvas/playerrightScoreNode").color = cc.color(0, 255, 56, 255);
    };
    Betting.prototype.loseLeft = function () {
        this.playerBalance -= this.betAmount;
        var playerNode = cc.find("Canvas/Player Node left");
        for (var i = 0; i < playerNode.childrenCount; i++) {
            playerNode.children[i].getChildByName("Sign").active = true;
            playerNode.children[i].getChildByName("Sign").color = cc.color(255, 0, 0, 255);
        }
        cc.find("Canvas/playerleftScoreNode").color = cc.color(255, 0, 0, 255);
    };
    Betting.prototype.loseRight = function () {
        this.playerBalance -= this.betAmount;
        var playerNode = cc.find("Canvas/Player Node right");
        for (var i = 0; i < playerNode.childrenCount; i++) {
            playerNode.children[i].getChildByName("Sign").active = true;
            playerNode.children[i].getChildByName("Sign").color = cc.color(255, 0, 0, 255);
        }
        cc.find("Canvas/playerrightScoreNode").color = cc.color(255, 0, 0, 255);
    };
    Betting.prototype.pushLeft = function () {
        var playerNode = cc.find("Canvas/Player Node left");
        for (var i = 0; i < playerNode.childrenCount; i++) {
            playerNode.children[i].getChildByName("Sign").active = true;
            playerNode.children[i].getChildByName("Sign").color = cc.color(255, 255, 0, 255);
        }
        cc.find("Canvas/playerleftScoreNode").color = cc.color(255, 255, 0, 255);
    };
    Betting.prototype.pushRight = function () {
        var playerNode = cc.find("Canvas/Player Node right");
        for (var i = 0; i < playerNode.childrenCount; i++) {
            playerNode.children[i].getChildByName("Sign").active = true;
            playerNode.children[i].getChildByName("Sign").color = cc.color(255, 255, 0, 255);
        }
        cc.find("Canvas/playerrightScoreNode").color = cc.color(255, 255, 0, 255);
    };
    /**
     * 玩家赢得 Blackjack，对局奖励 2.5 倍赌注
     */
    Betting.prototype.winBlackjack = function () {
        this.playerBalance += this.betAmount * 2.5;
    };
    /**
     * 玩家输掉对局，扣除赌注
     */
    Betting.prototype.lose = function () {
        this.playerBalance -= this.betAmount;
        console.log("lose", this.playerBalance);
        var playerNode = cc.find("Canvas/Player Node");
        for (var i = 0; i < playerNode.childrenCount; i++) {
            playerNode.children[i].getChildByName("Sign").active = true;
            playerNode.children[i].getChildByName("Sign").color = cc.color(255, 0, 0, 255);
        }
        cc.find("Canvas/playerScoreNode").color = cc.color(255, 0, 0, 255);
    };
    /**
     * 平局时退还赌注
     */
    Betting.prototype.push = function () {
        console.log("push", this.playerBalance);
        var playerNode = cc.find("Canvas/Player Node");
        for (var i = 0; i < playerNode.childrenCount; i++) {
            playerNode.children[i].getChildByName("Sign").active = true;
            playerNode.children[i].getChildByName("Sign").color = cc.color(255, 255, 0, 255);
        }
        cc.find("Canvas/playerScoreNode").color = cc.color(255, 255, 0, 255);
        // 无变化，退还赌注
    };
    // 双倍下注，将当前赌注金额翻倍
    Betting.prototype.doubleBet = function () {
        this.betAmount *= 2;
    };
    /**
     * 获取当前余额
     * @returns {number} 玩家当前余额
     */
    Betting.prototype.getBalance = function () {
        return this.playerBalance;
    };
    return Betting;
}());
exports.default = Betting;

cc._RF.pop();