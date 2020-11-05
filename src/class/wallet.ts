import axios from "axios";
var rpc = require("node-json-rpc");

import { WalletTypes } from "../types/types";

class MoneroWallet {
  private client: any;
  private hostname: string;
  private port: number;
  private user: string;
  private password: string;

  //init
  constructor(
    hostname: string = "127.0.0.1",
    port: number | string = 18082,
    user: string = "",
    password: string = ""
  ) {
    this.hostname = hostname;
    this.port = Number(port);
    this.user = user;
    this.password = password;
    this.client = new rpc.Client({
      host: hostname,
      port,
      path: "/json_rpc",
    });
    // this.client = rpc.Client.$create(this.port, this.hostname);
  }

  public async request<T>(method: string, params?: any) {
    let options = { jsonrpc: "2.0", id: "0", method, params };

    const res = await this.client.call(options);
    console.log(res);
    if (res.status == 200 && res.status.hasOwnProperty("result")) {
      return res.data as T;
    } else {
      return null;
    }
  }

  // public async setDemon(){
  //   return await this.request()
  // }

  /**
   * Return the wallet's balance.
   * @param account_index unsigned int; Return balance for this account.
   * @param address_indicesarray of unsigned int; (Optional) Return balance detail for those subaddresses.
   */
  public async getBalance(account_index: number[], address_indices: number) {
    return await this.request<WalletTypes.IResult<WalletTypes.IBalance>>("get_balance", {
      account_index,
      address_indices,
    });
  }

  /**
   * Return the wallet's addresses for an account. Optionally filter for specific set of subaddresses.
   * @param account_index unsigned int; Return subaddresses for this account.
   * @param address_index array of unsigned int; (Optional) List of subaddresses to return from an account.
   */
  public async getAddress(account_index: number, address_index: number[]) {
    return await this.request<WalletTypes.IResult<WalletTypes.Index>>("get_address_index", {
      account_index,
      address_index,
    });
  }

  /**
   * Get account and address indexes from a specific (sub)address
   */
  public async getAddressIndex() {
    return await this.request<WalletTypes.IResult<WalletTypes.Index>>("get_address_index");
  }

  /**
   * Create a new address for an account. Optionally, label the new address.
   * @param account_index unsigned int; Create a new address for this account.
   * @param [label] string; (Optional) Label for the new address.
   */
  public async createAddress(account_index: number, label?: string) {
    return await this.request<WalletTypes.IResult<WalletTypes.ICreateWallet>>("create_address", {
      account_index,
      label,
    });
  }

  /**
   * Label an address.
   * @param index subaddress index; JSON Object containing the major & minor address index:
   * @param label string; Label for the address.
   */
  public async labelAddress(index: WalletTypes.Index, label: string) {
    return await this.request<WalletTypes.IResult<null>>("label_address", {
      index,
      label,
    });
  }

  /**
   * Analyzes a string to determine whether it is a valid monero wallet address and returns the result and the address specifications.
   * @param address string; The address to validate.
   * @param [any_net_type] boolean (Optional); If true, consider addresses belonging to any of the three Monero networks (mainnet, stagenet, and testnet) valid. Otherwise, only consider an address valid if it belongs to the network on which the rpc-wallet's current daemon is running (Defaults to false).
   * @param [allow_openalias]  boolean (Optional); If true, consider OpenAlias-formatted addresses valid (Defaults to false).
   */
  public async validateAddress(
    address: string,
    any_net_type?: boolean,
    allow_openalias: boolean = false
  ) {
    return await this.request<WalletTypes.IResult<WalletTypes.IValidateAddress>>(
      "validate_address",
      {
        address,
        any_net_type,
        allow_openalias,
      }
    );
  }

  /**
   * Get all accounts for a wallet. Optionally filter accounts by tag.
   * @param [tag] string; (Optional) Tag for filtering accounts.
   */
  public async getAccounts(tag?: string) {
    return await this.request<WalletTypes.IResult<WalletTypes.IGetAccounts>>("get_accounts", {
      tag,
    });
  }

  /**
   * Create a new account with an optional label.
   * @param [label] string; (Optional) Label for the account.
   */
  public async createAccount(label?: string) {
    return await this.request<WalletTypes.IResult<WalletTypes.ICreateAccount>>("create_account", {
      label,
    });
  }

  /**
   * Label an account.
   * @param account_index unsigned int; Apply label to account at this index.
   * @param label  string; Label for the account.
   */
  public async labelAccount(account_index: number, label: string) {
    return await this.request<WalletTypes.IResult<WalletTypes.ILabelAccount>>("label_account", {
      account_index,
      label,
    });
  }

  /**
   * Get a list of user-defined account tags.
   */
  public async getAccountTags() {
    return await this.request<WalletTypes.IResult<WalletTypes.ILabelAccount>>(
      "get_account_tags",
      {}
    );
  }

  /**
   * Apply a filtering tag to a list of accounts.
   * @param tag string; Tag for the accounts.
   * @param accounts array of unsigned int; Tag this list of accounts.
   * @returns
   */
  public async tagAccounts(tag: string, accounts: number[]) {
    return await this.request<WalletTypes.IResult<null>>("tag_accounts", {
      tag,
      accounts,
    });
  }

  /**
   * Remove filtering tag from a list of accounts.
   * @param accounts array of unsigned int; Remove tag from this list of accounts.
   */
  public async untagAccounts(accounts: number[]) {
    return await this.request<WalletTypes.IResult<null>>("untag_accounts", {
      accounts,
    });
  }

  /**
   * Set description for an account tag.
   * @param tag string; Set a description for this tag.
   * @param description string; Description for the tag.
   */
  public async setAccountTagDescruption(tag: string, description: string) {
    return await this.request<WalletTypes.IResult<null>>("set_account_tag_description", {
      tag,
      description,
    });
  }

  /**
   * Returns the wallet's current block height.
   */
  public async getHeight() {
    return await this.request<WalletTypes.IResult<WalletTypes.IHeight>>("get_height", {});
  }

  /**
   * Send monero to a number of recipients.
   * @param params
   * @returns
   */
  public async transfer(params: WalletTypes.IRequestTransfer) {
    return await this.request<WalletTypes.IResult<WalletTypes.ITransfer>>("transfer", {
      ...params,
    });
  }

  /**
   * Same as transfer, but can split into more than one tx if necessary.
   * @param params
   * @returns
   */
  public async transferSplit(params: WalletTypes.IRequestTransfer) {
    return await this.request<WalletTypes.IResult<WalletTypes.ITransferSplit>>("transfer_split", {
      ...params,
    });
  }

  /**
   * Sign a transaction created on a read-only wallet (in cold-signing process)
   * @param unsigned_txset  string. Set of unsigned tx returned by "transfer" or "transfer_split" methods.
   * @param [export_raw] boolean; (Optional) If true, return the raw transaction data. (Defaults to false)
   * @returns
   */
  public async signTransfer(unsigned_txset: string, export_raw?: boolean) {
    return await this.request<WalletTypes.IResult<WalletTypes.ISignTransfer>>("sign_transfer", {
      unsigned_txset,
      export_raw,
    });
  }

  /**
   * Submit a previously signed transaction on a read-only wallet (in cold-signing process).
   * @param tx_data_hex string; Set of signed tx returned by "sign_transfer"
   * @returns
   */
  public async submitTransfer(tx_data_hex: string) {
    return await this.request<WalletTypes.IResult<WalletTypes.ISubmitTransfer>>("submit_transfer", {
      tx_data_hex,
    });
  }

  /**
   * Send all dust outputs back to the wallet's, to make them easier to spend (and mix).
   * @param params
   * @returns
   */
  public async sweepDust(params: WalletTypes.IRequestSweepDust) {
    return await this.request<WalletTypes.IResult<WalletTypes.ISweep>>("sweep_dust", {
      ...params,
    });
  }

  /**
   * Send all unlocked balance to an address.
   * @param params
   * @returns
   */
  public async sweepAll(params: WalletTypes.IRequestSweep) {
    return await this.request<WalletTypes.IResult<WalletTypes.ISweep>>("sweep_all", {
      ...params,
    });
  }

  /**
   * Send all of a specific unlocked output to an address.
   * @param params
   * @returns
   */
  public async sweepSingle(params: WalletTypes.IRequestSweep) {
    return await this.request<WalletTypes.IResult<WalletTypes.ISweep>>("sweep_single", {
      ...params,
    });
  }

  /**
   * Relay a transaction previously created with "do_not_relay":true.
   * @param hex string; transaction metadata returned from a transfer method with get_tx_metadata set to true.
   * @returns
   */
  public async relayTx(hex: string) {
    return await this.request<WalletTypes.IResult<WalletTypes.ITxHash>>("relay_tx", {
      hex,
    });
  }

  /**
   * Save the wallet file.
   * @returns
   */
  public async store() {
    return await this.request<WalletTypes.IResult<null>>("store", {});
  }

  /**
   * Get a list of incoming payments using a given payment id.
   * @param payment_id string; Payment ID used to find the payments (16 characters hex).
   * @returns
   */
  public async getPayment(payment_id: string) {
    return await this.request<WalletTypes.IResult<WalletTypes.IPayments>>("get_payments", {
      payment_id,
    });
  }

  /**
   * Get a list of incoming payments using a given payment id, or a list of payments ids, from a given height. This method is the preferred method over get_payments because it has the same functionality but is more extendable. Either is fine for looking up transactions by a single payment ID.
   * @param payment_ids array of: string; Payment IDs used to find the payments (16 characters hex).
   * @param min_block_height unsigned int; The block height at which to start looking for payments.
   * @returns
   */
  public async getBulkPayments(payment_ids: string[], min_block_height: number) {
    return await this.request<WalletTypes.IResult<WalletTypes.IPayments>>("get_bulk_payments", {
      payment_ids,
      min_block_height,
    });
  }

  /**
   * Return a list of incoming transfers to the wallet.
   * @param params
   * @returns
   */
  public async incomingTransfers(params: WalletTypes.IRequestIncomingTransfers) {
    return await this.request<WalletTypes.IResult<WalletTypes.ITransfers>>("incoming_transfers", {
      ...params,
    });
  }

  /**
   * Return the spend or view private key.
   * @param key_type string; Which key to retrieve: "mnemonic" - the mnemonic seed (older wallets do not have one) OR "view_key" - the view key
   * @returns
   */
  public async queryKey(key_type: string) {
    return await this.request<WalletTypes.IResult<WalletTypes.IQuerykey>>("query_key", {
      key_type,
    });
  }
}

export default MoneroWallet;
