
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scriptHttp/HttpRequest.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1ccb2HGmURBlbdYofq9mFB8', 'HttpRequest');
// scriptHttp/HttpRequest.ts

"use strict";
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
var HttpClient_1 = require("./HttpClient");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var apiClient = new HttpClient_1.default('https://testapi.luckyin.com');
// const apiClient = new HttpClient('http://10.6.16.27:8100');
// const token ="tt0476n0x2icejru16p10ufy5695zd5b"
var time_zone = "Asia/Shanghai";
var HttpRequest = /** @class */ (function () {
    function HttpRequest() {
        this.token = "";
        // 私有构造函数
    }
    HttpRequest_1 = HttpRequest;
    HttpRequest.getInstance = function () {
        if (this.instance === null) {
            this.instance = new HttpRequest_1();
        }
        return this.instance;
    };
    HttpRequest.prototype.bet = function (betAmount, currency, gameId) {
        return __awaiter(this, void 0, Promise, function () {
            var apiUrl, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiUrl = "/pc/api/v1/blackjack/bet?betAmount=" + betAmount + "&currency=" + currency + "&gameId=" + gameId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, apiClient.post(apiUrl, {}, this.token, time_zone)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        error_1 = _a.sent();
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HttpRequest.prototype.deal = function (recordId) {
        return __awaiter(this, void 0, Promise, function () {
            var apiUrl, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiUrl = "/pc/api/v1/blackjack/deal?recordId=" + recordId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, apiClient.post(apiUrl, {}, this.token, time_zone)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        error_2 = _a.sent();
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HttpRequest.prototype.stop = function (recordId) {
        return __awaiter(this, void 0, Promise, function () {
            var apiUrl, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiUrl = "/pc/api/v1/blackjack/stop?recordId=" + recordId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, apiClient.post(apiUrl, {}, this.token, time_zone)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        error_3 = _a.sent();
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HttpRequest.prototype.redouble = function (recordId) {
        return __awaiter(this, void 0, Promise, function () {
            var apiUrl, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiUrl = "/pc/api/v1/blackjack/redouble?recordId=" + recordId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, apiClient.post(apiUrl, {}, this.token, time_zone)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        error_4 = _a.sent();
                        throw error_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HttpRequest.prototype.buyInsurance = function (recordId) {
        return __awaiter(this, void 0, Promise, function () {
            var apiUrl, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiUrl = "/pc/api/v1/blackjack/buyInsurance?recordId=" + recordId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, apiClient.post(apiUrl, {}, this.token, time_zone)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        error_5 = _a.sent();
                        throw error_5;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HttpRequest.prototype.notBuyInsurance = function (recordId) {
        return __awaiter(this, void 0, Promise, function () {
            var apiUrl, response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiUrl = "/pc/api/v1/blackjack/notBuyInsurance?recordId=" + recordId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, apiClient.post(apiUrl, {}, this.token, time_zone)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        error_6 = _a.sent();
                        throw error_6;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HttpRequest.prototype.divide = function (recordId) {
        return __awaiter(this, void 0, Promise, function () {
            var apiUrl, response, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiUrl = "/pc/api/v1/blackjack/divide?recordId=" + recordId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, apiClient.post(apiUrl, {}, this.token, time_zone)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        error_7 = _a.sent();
                        throw error_7;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HttpRequest.prototype.info = function (recordId) {
        return __awaiter(this, void 0, Promise, function () {
            var apiUrl, response, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiUrl = "/pc/api/v1/blackjack/info?recordId=" + recordId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, apiClient.post(apiUrl, {}, this.token, time_zone)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        error_8 = _a.sent();
                        throw error_8;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HttpRequest.prototype.getgameDetail = function (gameId) {
        return __awaiter(this, void 0, Promise, function () {
            var apiUrl, response, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiUrl = "/pc/api/v1/game/gameDetail?gameId=" + gameId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, apiClient.post(apiUrl, {}, this.token, time_zone)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        error_9 = _a.sent();
                        throw error_9;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    var HttpRequest_1;
    HttpRequest.instance = null;
    HttpRequest = HttpRequest_1 = __decorate([
        ccclass
    ], HttpRequest);
    return HttpRequest;
}());
exports.default = HttpRequest;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0SHR0cFxcSHR0cFJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBc0M7QUFDaEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUMsSUFBTSxTQUFTLEdBQUcsSUFBSSxvQkFBVSxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDaEUsOERBQThEO0FBQzlELGtEQUFrRDtBQUNsRCxJQUFNLFNBQVMsR0FBRSxlQUFlLENBQUE7QUFFaEM7SUFLSTtRQUZBLFVBQUssR0FBUSxFQUFFLENBQUM7UUFHWixTQUFTO0lBQ2IsQ0FBQztvQkFQZ0IsV0FBVztJQVNkLHVCQUFXLEdBQXpCO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtZQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksYUFBVyxFQUFFLENBQUM7U0FDckM7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVZLHlCQUFHLEdBQWhCLFVBQWlCLFNBQWdCLEVBQUMsUUFBZSxFQUFDLE1BQWE7dUNBQUcsT0FBTzs7Ozs7d0JBQy9ELE1BQU0sR0FBRyx3Q0FBc0MsU0FBUyxrQkFBYSxRQUFRLGdCQUFXLE1BQVEsQ0FBQzs7Ozt3QkFFbEYscUJBQU0sU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQ3hDLEVBQUUsRUFBQyxJQUFJLENBQUMsS0FBSyxFQUFDLFNBQVMsQ0FDMUIsRUFBQTs7d0JBRkssUUFBUSxHQUFHLFNBRWhCO3dCQUNELHNCQUFPLFFBQVEsRUFBQzs7O3dCQUVoQixNQUFNLE9BQUssQ0FBQzs7Ozs7S0FFbkI7SUFDWSwwQkFBSSxHQUFqQixVQUFrQixRQUFlO3VDQUFHLE9BQU87Ozs7O3dCQUNqQyxNQUFN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QyxNQUFNLEVBQ3hDLEVBQUUsRUFBQyxJQUFJLENBQUMsS0FBSyxFQUFDLFNBQVMsQ0FDMUIsRUFBQTs7d0JBRkssUUFBUSxHQUFHLFNBRWhCO3dCQUNELHNCQUFPLFFBQVEsRUFBQzs7O3dCQUVoQixNQUFNLE9BQUssQ0FBQzs7Ozs7S0FFbkI7O0lBaEhjLG9CQUFRLEdBQXVCLElBQUksQ0FBQztJQUZsQyxXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBbUgvQjtJQUFELGtCQUFDO0NBbkhELEFBbUhDLElBQUE7a0JBbkhvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEh0dHBDbGllbnQgZnJvbSAnLi9IdHRwQ2xpZW50JztcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuY29uc3QgYXBpQ2xpZW50ID0gbmV3IEh0dHBDbGllbnQoJ2h0dHBzOi8vdGVzdGFwaS5sdWNreWluLmNvbScpO1xuLy8gY29uc3QgYXBpQ2xpZW50ID0gbmV3IEh0dHBDbGllbnQoJ2h0dHA6Ly8xMC42LjE2LjI3OjgxMDAnKTtcbi8vIGNvbnN0IHRva2VuID1cInR0MDQ3Nm4weDJpY2VqcnUxNnAxMHVmeTU2OTV6ZDViXCJcbmNvbnN0IHRpbWVfem9uZSA9XCJBc2lhL1NoYW5naGFpXCJcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdHRwUmVxdWVzdHtcblxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBIdHRwUmVxdWVzdCB8IG51bGwgPSBudWxsO1xuICAgIHRva2VuOnN0cmluZz1cIlwiO1xuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8g56eB5pyJ5p6E6YCg5Ye95pWwXG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBIdHRwUmVxdWVzdCB7XG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGJldChiZXRBbW91bnQ6bnVtYmVyLGN1cnJlbmN5Om51bWJlcixnYW1lSWQ6bnVtYmVyKSA6UHJvbWlzZTxhbnk+e1xuICAgICAgICBjb25zdCBhcGlVcmwgPSBgL3BjL2FwaS92MS9ibGFja2phY2svYmV0P2JldEFtb3VudD0ke2JldEFtb3VudH0mY3VycmVuY3k9JHtjdXJyZW5jeX0mZ2FtZUlkPSR7Z2FtZUlkfWA7IC8vIOaWsOWinuWPmOmHj1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGlDbGllbnQucG9zdChhcGlVcmwsIFxuICAgICAgICAgICAgICAgIHt9LHRoaXMudG9rZW4sdGltZV96b25lXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGFzeW5jIGRlYWwocmVjb3JkSWQ6bnVtYmVyKSA6UHJvbWlzZTxhbnk+e1xuICAgICAgICBjb25zdCBhcGlVcmwgPSBgL3BjL2FwaS92MS9ibGFja2phY2svZGVhbD9yZWNvcmRJZD0ke3JlY29yZElkfWA7IC8vIOaWsOWinuWPmOmHj1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGlDbGllbnQucG9zdChhcGlVcmwsIFxuICAgICAgICAgICAgICAgIHt9LHRoaXMudG9rZW4sdGltZV96b25lXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGFzeW5jIHN0b3AocmVjb3JkSWQ6bnVtYmVyKSA6UHJvbWlzZTxhbnk+e1xuICAgICAgICBjb25zdCBhcGlVcmwgPSBgL3BjL2FwaS92MS9ibGFja2phY2svc3RvcD9yZWNvcmRJZD0ke3JlY29yZElkfWA7IC8vIOaWsOWinuWPmOmHj1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGlDbGllbnQucG9zdChhcGlVcmwsIFxuICAgICAgICAgICAgICAgIHt9LHRoaXMudG9rZW4sdGltZV96b25lXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGFzeW5jIHJlZG91YmxlKHJlY29yZElkOm51bWJlcikgOlByb21pc2U8YW55PntcbiAgICAgICAgY29uc3QgYXBpVXJsID0gYC9wYy9hcGkvdjEvYmxhY2tqYWNrL3JlZG91YmxlP3JlY29yZElkPSR7cmVjb3JkSWR9YDsgLy8g5paw5aKe5Y+Y6YePXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaUNsaWVudC5wb3N0KGFwaVVybCwgXG4gICAgICAgICAgICAgICAge30sdGhpcy50b2tlbix0aW1lX3pvbmVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgYXN5bmMgYnV5SW5zdXJhbmNlKHJlY29yZElkOm51bWJlcikgOlByb21pc2U8YW55PntcbiAgICAgICAgY29uc3QgYXBpVXJsID0gYC9wYy9hcGkvdjEvYmxhY2tqYWNrL2J1eUluc3VyYW5jZT9yZWNvcmRJZD0ke3JlY29yZElkfWA7IC8vIOaWsOWinuWPmOmHj1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGlDbGllbnQucG9zdChhcGlVcmwsIFxuICAgICAgICAgICAgICAgIHt9LHRoaXMudG9rZW4sdGltZV96b25lXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9ICAgXG4gICAgcHVibGljIGFzeW5jIG5vdEJ1eUluc3VyYW5jZShyZWNvcmRJZDpudW1iZXIpIDpQcm9taXNlPGFueT57XG4gICAgICAgIGNvbnN0IGFwaVVybCA9IGAvcGMvYXBpL3YxL2JsYWNramFjay9ub3RCdXlJbnN1cmFuY2U/cmVjb3JkSWQ9JHtyZWNvcmRJZH1gOyAvLyDmlrDlop7lj5jph49cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpQ2xpZW50LnBvc3QoYXBpVXJsLCBcbiAgICAgICAgICAgICAgICB7fSx0aGlzLnRva2VuLHRpbWVfem9uZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfSAgXG4gICAgcHVibGljIGFzeW5jIGRpdmlkZShyZWNvcmRJZDpudW1iZXIpIDpQcm9taXNlPGFueT57XG4gICAgICAgIGNvbnN0IGFwaVVybCA9IGAvcGMvYXBpL3YxL2JsYWNramFjay9kaXZpZGU/cmVjb3JkSWQ9JHtyZWNvcmRJZH1gOyAvLyDmlrDlop7lj5jph49cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpQ2xpZW50LnBvc3QoYXBpVXJsLCBcbiAgICAgICAgICAgICAgICB7fSx0aGlzLnRva2VuLHRpbWVfem9uZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfSAgXG4gICAgcHVibGljIGFzeW5jIGluZm8ocmVjb3JkSWQ6bnVtYmVyKSA6UHJvbWlzZTxhbnk+e1xuICAgICAgICBjb25zdCBhcGlVcmwgPSBgL3BjL2FwaS92MS9ibGFja2phY2svaW5mbz9yZWNvcmRJZD0ke3JlY29yZElkfWA7IC8vIOaWsOWinuWPmOmHj1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGlDbGllbnQucG9zdChhcGlVcmwsIFxuICAgICAgICAgICAgICAgIHt9LHRoaXMudG9rZW4sdGltZV96b25lXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9ICBcbiAgICBwdWJsaWMgYXN5bmMgZ2V0Z2FtZURldGFpbChnYW1lSWQ6bnVtYmVyKSA6UHJvbWlzZTxhbnk+e1xuICAgICAgICBjb25zdCBhcGlVcmwgPSBgL3BjL2FwaS92MS9nYW1lL2dhbWVEZXRhaWw/Z2FtZUlkPSR7Z2FtZUlkfWA7IC8vIOaWsOWinuWPmOmHj1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGlDbGllbnQucG9zdChhcGlVcmwsIFxuICAgICAgICAgICAgICAgIHt9LHRoaXMudG9rZW4sdGltZV96b25lXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=