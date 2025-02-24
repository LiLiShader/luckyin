"use strict";
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