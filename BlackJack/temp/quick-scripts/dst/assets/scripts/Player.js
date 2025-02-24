
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUEwQjtBQUNwQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1Qzs7O0dBR0c7QUFFSDtJQUFvQywwQkFBWTtJQUFoRDtRQUFBLHFFQWdDQztRQS9CVSxVQUFJLEdBQVMsSUFBSSxjQUFJLEVBQUUsQ0FBQyxDQUFFLE9BQU87UUFHeEMsY0FBUSxHQUFZLEtBQUssQ0FBQyxDQUFFLFFBQVE7O0lBNEJ4QyxDQUFDO0lBMUJHOztPQUVHO0lBQ0gsMEJBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILDBCQUFTLEdBQVQ7UUFDSSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25DLE9BQU8sS0FBSyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7U0FDM0Q7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssMEJBQVMsR0FBakI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBWixDQUFZLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBM0JEO1FBREMsUUFBUTs0Q0FDaUI7SUFKVCxNQUFNO1FBRDFCLE9BQU87T0FDYSxNQUFNLENBZ0MxQjtJQUFELGFBQUM7Q0FoQ0QsQUFnQ0MsQ0FoQ21DLEVBQUUsQ0FBQyxTQUFTLEdBZ0MvQztrQkFoQ29CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGFuZCBmcm9tICcuL0hhbmQnO1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuLyoqXG4gKiBQbGF5ZXIg57G76KGo56S65ri45oiP5Lit55qE546p5a62XG4gKiDlj6/ku6XkvZzkuLrluoTlrrbmiJbpl7Llrrbkvb/nlKhcbiAqL1xuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgcHVibGljIGhhbmQ6IEhhbmQgPSBuZXcgSGFuZCgpOyAgLy8g5b2T5YmN5omL54mMXG5cbiAgICBAcHJvcGVydHlcbiAgICBpc0RlYWxlcjogYm9vbGVhbiA9IGZhbHNlOyAgLy8g5piv5ZCm5Li65bqE5a62XG5cbiAgICAvKipcbiAgICAgKiDph43nva7njqnlrrbnmoTmiYvniYxcbiAgICAgKi9cbiAgICByZXNldEhhbmQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaGFuZC5jbGVhcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOW6hOWutuWIpOaWreaYr+WQpumcgOimgee7p+e7reimgeeJjFxuICAgICAqIOW6hOWutumcgOiHs+WwkeWIsDE354K577yM6L2vMTfvvIjlkKtB77yJ6ZyA57un57ut5ou/54mMXG4gICAgICovXG4gICAgc2hvdWxkSGl0KCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5pc0RlYWxlcikge1xuICAgICAgICAgICAgY29uc3Qgc2NvcmUgPSB0aGlzLmhhbmQuZ2V0U2NvcmUoKTtcbiAgICAgICAgICAgIHJldHVybiBzY29yZSA8IDE3IHx8IChzY29yZSA9PT0gMTcgJiYgdGhpcy5oYXNTb2Z0MTcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIpOaWreaYr+WQpuaYr+i9rzE3XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IOaYr+WQpuS4uui9rzE377yI5ZCrQe+8iVxuICAgICAqL1xuICAgIHByaXZhdGUgaGFzU29mdDE3KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYW5kLmdldFNjb3JlKCkgPT09IDE3ICYmIHRoaXMuaGFuZC5jYXJkcy5zb21lKGNhcmQgPT4gY2FyZC5pc0FjZSgpKTtcbiAgICB9XG59XG4iXX0=