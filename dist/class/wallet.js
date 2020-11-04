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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var MoneroWallet = /** @class */ (function () {
    //init
    function MoneroWallet(hostname, port, user, password) {
        if (user === void 0) { user = ""; }
        if (password === void 0) { password = ""; }
        this.hostname = hostname;
        this.port = Number(port);
        this.user = user;
        this.password = password;
        // this.client = rpc.Client.$create(this.port, this.hostname);
    }
    MoneroWallet.prototype.request = function (method, params) {
        return __awaiter(this, void 0, void 0, function () {
            var options, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = { jsonrpc: "2.0", id: "0", method: method, params: params };
                        return [4 /*yield*/, axios_1.default.post("http://" + this.hostname + ":" + this.port + "/json_rpc", options)];
                    case 1:
                        res = _a.sent();
                        if (res.status == 200) {
                            return [2 /*return*/, res.data];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // public async setDemon(){
    //   return await this.request()
    // }
    /**
     * Return the wallet's balance.
     * @param account_index unsigned int; Return balance for this account.
     * @param address_indicesarray of unsigned int; (Optional) Return balance detail for those subaddresses.
     */
    MoneroWallet.prototype.getBalance = function (account_index, address_indices) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("get_balance", {
                            account_index: account_index,
                            address_indices: address_indices,
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Return the wallet's addresses for an account. Optionally filter for specific set of subaddresses.
     * @param account_index unsigned int; Return subaddresses for this account.
     * @param address_index array of unsigned int; (Optional) List of subaddresses to return from an account.
     */
    MoneroWallet.prototype.getAddress = function (account_index, address_index) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("get_address_index", {
                            account_index: account_index,
                            address_index: address_index,
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get account and address indexes from a specific (sub)address
     */
    MoneroWallet.prototype.getAddressIndex = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("get_address_index")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Create a new address for an account. Optionally, label the new address.
     * @param account_index unsigned int; Create a new address for this account.
     * @param [label] string; (Optional) Label for the new address.
     */
    MoneroWallet.prototype.createAddress = function (account_index, label) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("create_address", {
                            account_index: account_index,
                            label: label,
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Label an address.
     * @param index subaddress index; JSON Object containing the major & minor address index:
     * @param label string; Label for the address.
     */
    MoneroWallet.prototype.labelAddress = function (index, label) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("label_address", {
                            index: index,
                            label: label,
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Analyzes a string to determine whether it is a valid monero wallet address and returns the result and the address specifications.
     * @param address string; The address to validate.
     * @param [any_net_type] boolean (Optional); If true, consider addresses belonging to any of the three Monero networks (mainnet, stagenet, and testnet) valid. Otherwise, only consider an address valid if it belongs to the network on which the rpc-wallet's current daemon is running (Defaults to false).
     * @param [allow_openalias]  boolean (Optional); If true, consider OpenAlias-formatted addresses valid (Defaults to false).
     */
    MoneroWallet.prototype.validateAddress = function (address, any_net_type, allow_openalias) {
        if (allow_openalias === void 0) { allow_openalias = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("validate_address", {
                            address: address,
                            any_net_type: any_net_type,
                            allow_openalias: allow_openalias,
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get all accounts for a wallet. Optionally filter accounts by tag.
     * @param [tag] string; (Optional) Tag for filtering accounts.
     */
    MoneroWallet.prototype.getAccounts = function (tag) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("get_accounts", {
                            tag: tag,
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Create a new account with an optional label.
     * @param [label] string; (Optional) Label for the account.
     */
    MoneroWallet.prototype.createAccount = function (label) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("create_account", {
                            label: label,
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Label an account.
     * @param account_index unsigned int; Apply label to account at this index.
     * @param label  string; Label for the account.
     */
    MoneroWallet.prototype.labelAccount = function (account_index, label) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("label_account", {
                            account_index: account_index,
                            label: label,
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get a list of user-defined account tags.
     */
    MoneroWallet.prototype.getAccountTags = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("get_account_tags", {})];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Apply a filtering tag to a list of accounts.
     * @param tag string; Tag for the accounts.
     * @param accounts array of unsigned int; Tag this list of accounts.
     * @returns
     */
    MoneroWallet.prototype.tagAccounts = function (tag, accounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("tag_accounts", {
                            tag: tag,
                            accounts: accounts,
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Remove filtering tag from a list of accounts.
     * @param accounts array of unsigned int; Remove tag from this list of accounts.
     * @returns
     */
    MoneroWallet.prototype.untagAccounts = function (accounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("untag_accounts", {
                            accounts: accounts,
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return MoneroWallet;
}());
exports.default = MoneroWallet;
