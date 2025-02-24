"use strict";
cc._RF.push(module, '04c7bq+V/JBpbm4w7DhH/UT', 'Card');
// scripts/Card.ts

"use strict";
/**
 * 定义扑克牌的花色
 */
// export enum Suit {
//     Spades,
//     Hearts,
//     Diamonds,
//     Clubs
// }
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 定义扑克牌的点数
 */
// export enum Rank {
//     Two = 2, Three, Four, Five, Six, Seven, Eight, Nine, Ten,
//     Jack = 10, Queen = 10, King = 10, Ace = 11
// }
/**
 * Card 类表示一张牌的对象
 */
var Card = /** @class */ (function () {
    function Card(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
    /**
     * 获取牌的数值
     * J、Q、K 都视为 10 点，其他按点数值计算
     */
    Card.prototype.getValue = function () {
        var num;
        switch (this.rank) {
            case 1:
                num = 11;
                break;
            case 11:
            case 12:
            case 13:
                num = 10;
                break;
            default:
                num = this.rank;
                break;
        }
        return num;
    };
    /**
     * 判断这张牌是否是 A
     */
    Card.prototype.isAce = function () {
        return this.rank === 1;
    };
    return Card;
}());
exports.default = Card;

cc._RF.pop();