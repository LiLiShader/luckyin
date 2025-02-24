
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Deck.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fddc5FD1u1PsJbYg7fQzWZX', 'Deck');
// scripts/Deck.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Deck 类表示一个牌堆，包含多副扑克牌
 */
var Deck = /** @class */ (function () {
    function Deck() {
        this.cards = []; // 牌堆
    }
    return Deck;
}());
exports.default = Deck;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRGVjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztHQUVHO0FBQ0g7SUFHSTtRQUZRLFVBQUssR0FBVyxFQUFFLENBQUMsQ0FBRSxLQUFLO0lBSWxDLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FOQSxBQU1DLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ2FyZCBmcm9tICcuL0NhcmQnO1xuXG4vKipcbiAqIERlY2sg57G76KGo56S65LiA5Liq54mM5aCG77yM5YyF5ZCr5aSa5Ymv5omR5YWL54mMXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlY2sge1xuICAgIHByaXZhdGUgY2FyZHM6IENhcmRbXSA9IFtdOyAgLy8g54mM5aCGXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgXG4gICAgfVxufVxuIl19