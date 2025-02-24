"use strict";
cc._RF.push(module, '2b8a2ctXGZOVYUaVgnOL8BX', 'Player');
// scripts/Player.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var Hand_1 = require("./Hand");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * Player 类表示游戏中的玩家
 * 可以作为庄家或闲家使用
 */
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hand = new Hand_1.default(); // 当前手牌
        _this.isDealer = false; // 是否为庄家
        return _this;
    }
    /**
     * 重置玩家的手牌
     */
    Player.prototype.resetHand = function () {
        this.hand.clear();
    };
    /**
     * 庄家判断是否需要继续要牌
     * 庄家需至少到17点，软17（含A）需继续拿牌
     */
    Player.prototype.shouldHit = function () {
        if (this.isDealer) {
            var score = this.hand.getScore();
            return score < 17 || (score === 17 && this.hasSoft17());
        }
        return false;
    };
    /**
     * 判断是否是软17
     * @returns {boolean} 是否为软17（含A）
     */
    Player.prototype.hasSoft17 = function () {
        return this.hand.getScore() === 17 && this.hand.cards.some(function (card) { return card.isAce(); });
    };
    __decorate([
        property
    ], Player.prototype, "isDealer", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.default = Player;

cc._RF.pop();