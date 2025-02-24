
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Card.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSCxxQkFBcUI7QUFDckIsY0FBYztBQUNkLGNBQWM7QUFDZCxnQkFBZ0I7QUFDaEIsWUFBWTtBQUNaLElBQUk7O0FBRUo7O0dBRUc7QUFDSCxxQkFBcUI7QUFDckIsZ0VBQWdFO0FBQ2hFLGlEQUFpRDtBQUNqRCxJQUFJO0FBRUo7O0dBRUc7QUFDSDtJQUNJLGNBQW1CLElBQVksRUFBUyxJQUFZO1FBQWpDLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO0lBQUcsQ0FBQztJQUV4RDs7O09BR0c7SUFDSCx1QkFBUSxHQUFSO1FBQ0ksSUFBSSxHQUFHLENBQUE7UUFDUCxRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZixLQUFLLENBQUM7Z0JBQ0YsR0FBRyxHQUFDLEVBQUUsQ0FBQTtnQkFDTixNQUFNO1lBQ1YsS0FBSyxFQUFFLENBQUM7WUFDUixLQUFLLEVBQUUsQ0FBQztZQUNSLEtBQUssRUFBRTtnQkFDSCxHQUFHLEdBQUMsRUFBRSxDQUFBO2dCQUNOLE1BQU07WUFDVjtnQkFDSSxHQUFHLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQTtnQkFDYixNQUFNO1NBQ2I7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7T0FFRztJQUNILG9CQUFLLEdBQUw7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFZTCxXQUFDO0FBQUQsQ0ExQ0EsQUEwQ0MsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICog5a6a5LmJ5omR5YWL54mM55qE6Iqx6ImyXG4gKi9cbi8vIGV4cG9ydCBlbnVtIFN1aXQge1xuLy8gICAgIFNwYWRlcyxcbi8vICAgICBIZWFydHMsXG4vLyAgICAgRGlhbW9uZHMsXG4vLyAgICAgQ2x1YnNcbi8vIH1cblxuLyoqXG4gKiDlrprkuYnmiZHlhYvniYznmoTngrnmlbBcbiAqL1xuLy8gZXhwb3J0IGVudW0gUmFuayB7XG4vLyAgICAgVHdvID0gMiwgVGhyZWUsIEZvdXIsIEZpdmUsIFNpeCwgU2V2ZW4sIEVpZ2h0LCBOaW5lLCBUZW4sXG4vLyAgICAgSmFjayA9IDEwLCBRdWVlbiA9IDEwLCBLaW5nID0gMTAsIEFjZSA9IDExXG4vLyB9XG5cbi8qKlxuICogQ2FyZCDnsbvooajnpLrkuIDlvKDniYznmoTlr7nosaFcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHN1aXQ6IG51bWJlciwgcHVibGljIHJhbms6IG51bWJlcikge31cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlueJjOeahOaVsOWAvFxuICAgICAqIErjgIFR44CBSyDpg73op4bkuLogMTAg54K577yM5YW25LuW5oyJ54K55pWw5YC86K6h566XXG4gICAgICovXG4gICAgZ2V0VmFsdWUoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IG51bVxuICAgICAgICBzd2l0Y2ggKHRoaXMucmFuaykge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIG51bT0xMVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgIG51bT0xMFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBudW09dGhpcy5yYW5rXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliKTmlq3ov5nlvKDniYzmmK/lkKbmmK8gQVxuICAgICAqL1xuICAgIGlzQWNlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yYW5rID09PSAxO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOi/lOWbnuWNoeeJjOeahOWtl+espuS4suihqOekuu+8jOS+i+WmgiBcIlNwYWRlcyBBXCIg5oiWIFwiSGVhcnRzIDEwXCJcbiAgICAgKi9cbiAgICAvLyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIC8vICAgICAvLyDkvb/nlKjmnprkuL7nmoTlrZfnrKbkuLLooajnpLpcbiAgICAvLyAgICAgY29uc3Qgc3VpdE5hbWUgPSBTdWl0W3RoaXMuc3VpdF07XG4gICAgLy8gICAgIGNvbnN0IHJhbmtOYW1lID0gdGhpcy5yYW5rID09PSAxMCA/ICcxMCcgOiBSYW5rW3RoaXMucmFua107XG4gICAgLy8gICAgIC8vIHJldHVybiBgJHtzdWl0TmFtZX0gJHtyYW5rTmFtZX1gO1xuICAgIC8vICAgICByZXR1cm4gYCR7c3VpdE5hbWV9YDtcbiAgICAvLyB9XG59XG4iXX0=