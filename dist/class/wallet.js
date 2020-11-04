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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class MoneroWallet {
    //init
    constructor(hostname = "127.0.0.1", port = 18082, user = "", password = "") {
        this.hostname = hostname;
        this.port = Number(port);
        this.user = user;
        this.password = password;
        // this.client = rpc.Client.$create(this.port, this.hostname);
    }
    request(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = { jsonrpc: "2.0", id: "0", method, params };
            const res = yield axios_1.default.post(`http://${this.hostname}:${this.port}/json_rpc`, options);
            if (res.status == 200) {
                return res.data;
            }
            else {
                return null;
            }
        });
    }
    // public async setDemon(){
    //   return await this.request()
    // }
    /**
     * Return the wallet's balance.
     * @param account_index unsigned int; Return balance for this account.
     * @param address_indicesarray of unsigned int; (Optional) Return balance detail for those subaddresses.
     */
    getBalance(account_index, address_indices) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("get_balance", {
                account_index,
                address_indices,
            });
        });
    }
    /**
     * Return the wallet's addresses for an account. Optionally filter for specific set of subaddresses.
     * @param account_index unsigned int; Return subaddresses for this account.
     * @param address_index array of unsigned int; (Optional) List of subaddresses to return from an account.
     */
    getAddress(account_index, address_index) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("get_address_index", {
                account_index,
                address_index,
            });
        });
    }
    /**
     * Get account and address indexes from a specific (sub)address
     */
    getAddressIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("get_address_index");
        });
    }
    /**
     * Create a new address for an account. Optionally, label the new address.
     * @param account_index unsigned int; Create a new address for this account.
     * @param [label] string; (Optional) Label for the new address.
     */
    createAddress(account_index, label) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("create_address", {
                account_index,
                label,
            });
        });
    }
    /**
     * Label an address.
     * @param index subaddress index; JSON Object containing the major & minor address index:
     * @param label string; Label for the address.
     */
    labelAddress(index, label) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("label_address", {
                index,
                label,
            });
        });
    }
    /**
     * Analyzes a string to determine whether it is a valid monero wallet address and returns the result and the address specifications.
     * @param address string; The address to validate.
     * @param [any_net_type] boolean (Optional); If true, consider addresses belonging to any of the three Monero networks (mainnet, stagenet, and testnet) valid. Otherwise, only consider an address valid if it belongs to the network on which the rpc-wallet's current daemon is running (Defaults to false).
     * @param [allow_openalias]  boolean (Optional); If true, consider OpenAlias-formatted addresses valid (Defaults to false).
     */
    validateAddress(address, any_net_type, allow_openalias = false) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("validate_address", {
                address,
                any_net_type,
                allow_openalias,
            });
        });
    }
    /**
     * Get all accounts for a wallet. Optionally filter accounts by tag.
     * @param [tag] string; (Optional) Tag for filtering accounts.
     */
    getAccounts(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("get_accounts", {
                tag,
            });
        });
    }
    /**
     * Create a new account with an optional label.
     * @param [label] string; (Optional) Label for the account.
     */
    createAccount(label) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("create_account", {
                label,
            });
        });
    }
    /**
     * Label an account.
     * @param account_index unsigned int; Apply label to account at this index.
     * @param label  string; Label for the account.
     */
    labelAccount(account_index, label) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("label_account", {
                account_index,
                label,
            });
        });
    }
    /**
     * Get a list of user-defined account tags.
     */
    getAccountTags() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("get_account_tags", {});
        });
    }
    /**
     * Apply a filtering tag to a list of accounts.
     * @param tag string; Tag for the accounts.
     * @param accounts array of unsigned int; Tag this list of accounts.
     * @returns
     */
    tagAccounts(tag, accounts) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("tag_accounts", {
                tag,
                accounts,
            });
        });
    }
    /**
     * Remove filtering tag from a list of accounts.
     * @param accounts array of unsigned int; Remove tag from this list of accounts.
     */
    untagAccounts(accounts) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("untag_accounts", {
                accounts,
            });
        });
    }
    /**
     * Set description for an account tag.
     * @param tag string; Set a description for this tag.
     * @param description string; Description for the tag.
     */
    setAccountTagDescruption(tag, description) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("set_account_tag_description", {
                tag,
                description,
            });
        });
    }
    /**
     * Returns the wallet's current block height.
     */
    getHeight() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("get_height", {});
        });
    }
    /**
     * Send monero to a number of recipients.
     * @param params
     * @returns
     */
    transfer(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("transfer", Object.assign({}, params));
        });
    }
    /**
     * Same as transfer, but can split into more than one tx if necessary.
     * @param params
     * @returns
     */
    transferSplit(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("transfer_split", Object.assign({}, params));
        });
    }
    /**
     * Sign a transaction created on a read-only wallet (in cold-signing process)
     * @param unsigned_txset  string. Set of unsigned tx returned by "transfer" or "transfer_split" methods.
     * @param [export_raw] boolean; (Optional) If true, return the raw transaction data. (Defaults to false)
     * @returns
     */
    signTransfer(unsigned_txset, export_raw) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("sign_transfer", {
                unsigned_txset,
                export_raw,
            });
        });
    }
    /**
     * Submit a previously signed transaction on a read-only wallet (in cold-signing process).
     * @param tx_data_hex string; Set of signed tx returned by "sign_transfer"
     * @returns
     */
    submitTransfer(tx_data_hex) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("submit_transfer", {
                tx_data_hex,
            });
        });
    }
    /**
     * Send all dust outputs back to the wallet's, to make them easier to spend (and mix).
     * @param params
     * @returns
     */
    sweepDust(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("sweep_dust", Object.assign({}, params));
        });
    }
    /**
     * Send all unlocked balance to an address.
     * @param params
     * @returns
     */
    sweepAll(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("sweep_all", Object.assign({}, params));
        });
    }
    /**
     * Send all of a specific unlocked output to an address.
     * @param params
     * @returns
     */
    sweepSingle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("sweep_single", Object.assign({}, params));
        });
    }
    /**
     * Relay a transaction previously created with "do_not_relay":true.
     * @param hex string; transaction metadata returned from a transfer method with get_tx_metadata set to true.
     * @returns
     */
    relayTx(hex) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("relay_tx", {
                hex,
            });
        });
    }
    /**
     * Save the wallet file.
     * @returns
     */
    store() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("store", {});
        });
    }
    /**
     * Get a list of incoming payments using a given payment id.
     * @param payment_id string; Payment ID used to find the payments (16 characters hex).
     * @returns
     */
    getPayment(payment_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("get_payments", {
                payment_id,
            });
        });
    }
    /**
     * Get a list of incoming payments using a given payment id, or a list of payments ids, from a given height. This method is the preferred method over get_payments because it has the same functionality but is more extendable. Either is fine for looking up transactions by a single payment ID.
     * @param payment_ids array of: string; Payment IDs used to find the payments (16 characters hex).
     * @param min_block_height unsigned int; The block height at which to start looking for payments.
     * @returns
     */
    getBulkPayments(payment_ids, min_block_height) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("get_bulk_payments", {
                payment_ids,
                min_block_height,
            });
        });
    }
    /**
     * Return a list of incoming transfers to the wallet.
     * @param params
     * @returns
     */
    incomingTransfers(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("incoming_transfers", Object.assign({}, params));
        });
    }
    /**
     * Return the spend or view private key.
     * @param key_type string; Which key to retrieve: "mnemonic" - the mnemonic seed (older wallets do not have one) OR "view_key" - the view key
     * @returns
     */
    queryKey(key_type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("query_key", {
                key_type,
            });
        });
    }
}
exports.default = MoneroWallet;
//# sourceMappingURL=wallet.js.map