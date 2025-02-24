
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scriptHttp/HttpClient.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4de84l2QRJCIY5yLmVAbvtO', 'HttpClient');
// scripts/HttpClient.ts

"use strict";
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
var HttpClient = /** @class */ (function () {
    function HttpClient(baseUrl) {
        this.baseUrl = baseUrl;
    }
    // GET 请求
    HttpClient.prototype.get = function (endpoint, params) {
        return __awaiter(this, void 0, Promise, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.buildUrl(endpoint, params);
                        return [4 /*yield*/, fetch(url, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    // POST 请求
    HttpClient.prototype.post = function (endpoint, body, token, timeZone) {
        return __awaiter(this, void 0, Promise, function () {
            var url, headers, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "" + this.baseUrl + endpoint;
                        headers = {
                            'Content-Type': 'application/json',
                        };
                        if (token) {
                            headers['Authorization'] = "Bearer " + token;
                        }
                        if (timeZone) {
                            headers['time-zone'] = timeZone;
                        }
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: headers,
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                }
            });
        });
    };
    // 构建请求 URL
    HttpClient.prototype.buildUrl = function (endpoint, params) {
        var url = "" + this.baseUrl + endpoint;
        if (params) {
            var queryString = new URLSearchParams(params).toString();
            url += "?" + queryString;
        }
        return url;
    };
    // 处理响应
    HttpClient.prototype.handleResponse = function (response) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                // if (!response.ok) {
                //     throw new Error(`HTTP error! status: ${response.status}`);
                // }
                return [2 /*return*/, response.json()];
            });
        });
    };
    return HttpClient;
}());
exports.default = HttpClient;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcSHR0cENsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBSUksb0JBQVksT0FBZTtRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRUQsU0FBUztJQUNJLHdCQUFHLEdBQWhCLFVBQWlCLFFBQWdCLEVBQUUsTUFBNEI7dUNBQUcsT0FBTzs7Ozs7d0JBQy9ELEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDM0IscUJBQU0sS0FBSyxDQUFDLEdBQUcsRUFBRTtnQ0FDOUIsTUFBTSxFQUFFLEtBQUs7Z0NBQ2IsT0FBTyxFQUFFO29DQUNMLGNBQWMsRUFBRSxrQkFBa0I7aUNBQ3JDOzZCQUNKLENBQUMsRUFBQTs7d0JBTEksUUFBUSxHQUFHLFNBS2Y7d0JBRUYsc0JBQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBQzs7OztLQUN4QztJQUVELFVBQVU7SUFDRyx5QkFBSSxHQUFqQixVQUFrQixRQUFnQixFQUFFLElBQXlCLEVBQUUsS0FBYyxFQUFFLFFBQWlCO3VDQUFHLE9BQU87Ozs7O3dCQUNoRyxHQUFHLEdBQUcsS0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVUsQ0FBQzt3QkFDbkMsT0FBTyxHQUFnQjs0QkFDekIsY0FBYyxFQUFFLGtCQUFrQjt5QkFDckMsQ0FBQzt3QkFFRixJQUFJLEtBQUssRUFBRTs0QkFDUCxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsWUFBVSxLQUFPLENBQUM7eUJBQ2hEO3dCQUVELElBQUksUUFBUSxFQUFFOzRCQUNWLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxRQUFRLENBQUM7eUJBQ25DO3dCQUVnQixxQkFBTSxLQUFLLENBQUMsR0FBRyxFQUFFO2dDQUM5QixNQUFNLEVBQUUsTUFBTTtnQ0FDZCxPQUFPLEVBQUUsT0FBTzs2QkFFbkIsQ0FBQyxFQUFBOzt3QkFKSSxRQUFRLEdBQUcsU0FJZjt3QkFFRixzQkFBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFDOzs7O0tBQ3hDO0lBRUQsV0FBVztJQUNILDZCQUFRLEdBQWhCLFVBQWlCLFFBQWdCLEVBQUUsTUFBNEI7UUFDM0QsSUFBSSxHQUFHLEdBQUcsS0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVUsQ0FBQztRQUN2QyxJQUFJLE1BQU0sRUFBRTtZQUNSLElBQU0sV0FBVyxHQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzNELEdBQUcsSUFBSSxNQUFJLFdBQWEsQ0FBQztTQUM1QjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELE9BQU87SUFDTyxtQ0FBYyxHQUE1QixVQUE2QixRQUFrQjt1Q0FBRyxPQUFPOztnQkFDckQsc0JBQXNCO2dCQUN0QixpRUFBaUU7Z0JBQ2pFLElBQUk7Z0JBQ0osc0JBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxFQUFDOzs7S0FDMUI7SUFDTCxpQkFBQztBQUFELENBOURBLEFBOERDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBIdHRwQ2xpZW50IHtcbiAgICAvLyDln7rnoYAgVVJMXG4gICAgcHJpdmF0ZSBiYXNlVXJsOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihiYXNlVXJsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gYmFzZVVybDtcbiAgICB9XG5cbiAgICAvLyBHRVQg6K+35rGCXG4gICAgcHVibGljIGFzeW5jIGdldChlbmRwb2ludDogc3RyaW5nLCBwYXJhbXM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5idWlsZFVybChlbmRwb2ludCwgcGFyYW1zKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICAvLyBQT1NUIOivt+axglxuICAgIHB1YmxpYyBhc3luYyBwb3N0KGVuZHBvaW50OiBzdHJpbmcsIGJvZHk6IFJlY29yZDxzdHJpbmcsIGFueT4sIHRva2VuPzogc3RyaW5nLCB0aW1lWm9uZT86IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYmFzZVVybH0ke2VuZHBvaW50fWA7XG4gICAgICAgIGNvbnN0IGhlYWRlcnM6IEhlYWRlcnNJbml0ID0ge1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgIGhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRpbWVab25lKSB7XG4gICAgICAgICAgICBoZWFkZXJzWyd0aW1lLXpvbmUnXSA9IHRpbWVab25lO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgICAgICAgIC8vIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZShyZXNwb25zZSk7XG4gICAgfVxuXG4gICAgLy8g5p6E5bu66K+35rGCIFVSTFxuICAgIHByaXZhdGUgYnVpbGRVcmwoZW5kcG9pbnQ6IHN0cmluZywgcGFyYW1zPzogUmVjb3JkPHN0cmluZywgYW55Pik6IHN0cmluZyB7XG4gICAgICAgIGxldCB1cmwgPSBgJHt0aGlzLmJhc2VVcmx9JHtlbmRwb2ludH1gO1xuICAgICAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgICAgICBjb25zdCBxdWVyeVN0cmluZyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1zKS50b1N0cmluZygpO1xuICAgICAgICAgICAgdXJsICs9IGA/JHtxdWVyeVN0cmluZ31gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG4gICAgLy8g5aSE55CG5ZON5bqUXG4gICAgcHJpdmF0ZSBhc3luYyBoYW5kbGVSZXNwb25zZShyZXNwb25zZTogUmVzcG9uc2UpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICAvLyBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIC8vICAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIHN0YXR1czogJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9XG59ICJdfQ==