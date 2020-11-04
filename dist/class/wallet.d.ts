declare class MoneroWallet {
    private client;
    private hostname;
    private port;
    private user;
    private password;
    constructor(hostname?: string, port?: number | string, user?: string, password?: string);
    request<T>(method: string, params?: any): Promise<T | null>;
    /**
     * Return the wallet's balance.
     * @param account_index unsigned int; Return balance for this account.
     * @param address_indicesarray of unsigned int; (Optional) Return balance detail for those subaddresses.
     */
    getBalance(account_index: number[], address_indices: number): Promise<WalletTypes.IResult<WalletTypes.IBalance> | null>;
    /**
     * Return the wallet's addresses for an account. Optionally filter for specific set of subaddresses.
     * @param account_index unsigned int; Return subaddresses for this account.
     * @param address_index array of unsigned int; (Optional) List of subaddresses to return from an account.
     */
    getAddress(account_index: number, address_index: number[]): Promise<WalletTypes.IResult<WalletTypes.Index> | null>;
    /**
     * Get account and address indexes from a specific (sub)address
     */
    getAddressIndex(): Promise<WalletTypes.IResult<WalletTypes.Index> | null>;
    /**
     * Create a new address for an account. Optionally, label the new address.
     * @param account_index unsigned int; Create a new address for this account.
     * @param [label] string; (Optional) Label for the new address.
     */
    createAddress(account_index: number, label?: string): Promise<WalletTypes.IResult<WalletTypes.ICreateWallet> | null>;
    /**
     * Label an address.
     * @param index subaddress index; JSON Object containing the major & minor address index:
     * @param label string; Label for the address.
     */
    labelAddress(index: WalletTypes.Index, label: string): Promise<WalletTypes.IResult<null> | null>;
    /**
     * Analyzes a string to determine whether it is a valid monero wallet address and returns the result and the address specifications.
     * @param address string; The address to validate.
     * @param [any_net_type] boolean (Optional); If true, consider addresses belonging to any of the three Monero networks (mainnet, stagenet, and testnet) valid. Otherwise, only consider an address valid if it belongs to the network on which the rpc-wallet's current daemon is running (Defaults to false).
     * @param [allow_openalias]  boolean (Optional); If true, consider OpenAlias-formatted addresses valid (Defaults to false).
     */
    validateAddress(address: string, any_net_type?: boolean, allow_openalias?: boolean): Promise<WalletTypes.IResult<WalletTypes.IValidateAddress> | null>;
    /**
     * Get all accounts for a wallet. Optionally filter accounts by tag.
     * @param [tag] string; (Optional) Tag for filtering accounts.
     */
    getAccounts(tag?: string): Promise<WalletTypes.IResult<WalletTypes.IGetAccounts> | null>;
    /**
     * Create a new account with an optional label.
     * @param [label] string; (Optional) Label for the account.
     */
    createAccount(label?: string): Promise<WalletTypes.IResult<WalletTypes.ICreateAccount> | null>;
    /**
     * Label an account.
     * @param account_index unsigned int; Apply label to account at this index.
     * @param label  string; Label for the account.
     */
    labelAccount(account_index: number, label: string): Promise<WalletTypes.IResult<WalletTypes.ILabelAccount> | null>;
    /**
     * Get a list of user-defined account tags.
     */
    getAccountTags(): Promise<WalletTypes.IResult<WalletTypes.ILabelAccount> | null>;
    /**
     * Apply a filtering tag to a list of accounts.
     * @param tag string; Tag for the accounts.
     * @param accounts array of unsigned int; Tag this list of accounts.
     * @returns
     */
    tagAccounts(tag: string, accounts: number[]): Promise<WalletTypes.IResult<null> | null>;
    /**
     * Remove filtering tag from a list of accounts.
     * @param accounts array of unsigned int; Remove tag from this list of accounts.
     */
    untagAccounts(accounts: number[]): Promise<WalletTypes.IResult<null> | null>;
    /**
     * Set description for an account tag.
     * @param tag string; Set a description for this tag.
     * @param description string; Description for the tag.
     */
    setAccountTagDescruption(tag: string, description: string): Promise<WalletTypes.IResult<null> | null>;
    /**
     * Returns the wallet's current block height.
     */
    getHeight(): Promise<WalletTypes.IResult<WalletTypes.IHeight> | null>;
    /**
     * Send monero to a number of recipients.
     * @param params
     * @returns
     */
    transfer(params: WalletTypes.IRequestTransfer): Promise<WalletTypes.IResult<WalletTypes.ITransfer> | null>;
    /**
     * Same as transfer, but can split into more than one tx if necessary.
     * @param params
     * @returns
     */
    transferSplit(params: WalletTypes.IRequestTransfer): Promise<WalletTypes.IResult<WalletTypes.ITransferSplit> | null>;
    /**
     * Sign a transaction created on a read-only wallet (in cold-signing process)
     * @param unsigned_txset  string. Set of unsigned tx returned by "transfer" or "transfer_split" methods.
     * @param [export_raw] boolean; (Optional) If true, return the raw transaction data. (Defaults to false)
     * @returns
     */
    signTransfer(unsigned_txset: string, export_raw?: boolean): Promise<WalletTypes.IResult<WalletTypes.ISignTransfer> | null>;
    /**
     * Submit a previously signed transaction on a read-only wallet (in cold-signing process).
     * @param tx_data_hex string; Set of signed tx returned by "sign_transfer"
     * @returns
     */
    submitTransfer(tx_data_hex: string): Promise<WalletTypes.IResult<WalletTypes.ISubmitTransfer> | null>;
    /**
     * Send all dust outputs back to the wallet's, to make them easier to spend (and mix).
     * @param params
     * @returns
     */
    sweepDust(params: WalletTypes.IRequestSweepDust): Promise<WalletTypes.IResult<WalletTypes.ISweep> | null>;
    /**
     * Send all unlocked balance to an address.
     * @param params
     * @returns
     */
    sweepAll(params: WalletTypes.IRequestSweep): Promise<WalletTypes.IResult<WalletTypes.ISweep> | null>;
    /**
     * Send all of a specific unlocked output to an address.
     * @param params
     * @returns
     */
    sweepSingle(params: WalletTypes.IRequestSweep): Promise<WalletTypes.IResult<WalletTypes.ISweep> | null>;
    /**
     * Relay a transaction previously created with "do_not_relay":true.
     * @param hex string; transaction metadata returned from a transfer method with get_tx_metadata set to true.
     * @returns
     */
    relayTx(hex: string): Promise<WalletTypes.IResult<WalletTypes.ITxHash> | null>;
    /**
     * Save the wallet file.
     * @returns
     */
    store(): Promise<WalletTypes.IResult<null> | null>;
    /**
     * Get a list of incoming payments using a given payment id.
     * @param payment_id string; Payment ID used to find the payments (16 characters hex).
     * @returns
     */
    getPayment(payment_id: string): Promise<WalletTypes.IResult<WalletTypes.IPayments> | null>;
    /**
     * Get a list of incoming payments using a given payment id, or a list of payments ids, from a given height. This method is the preferred method over get_payments because it has the same functionality but is more extendable. Either is fine for looking up transactions by a single payment ID.
     * @param payment_ids array of: string; Payment IDs used to find the payments (16 characters hex).
     * @param min_block_height unsigned int; The block height at which to start looking for payments.
     * @returns
     */
    getBulkPayments(payment_ids: string[], min_block_height: number): Promise<WalletTypes.IResult<WalletTypes.IPayments> | null>;
    /**
     * Return a list of incoming transfers to the wallet.
     * @param params
     * @returns
     */
    incomingTransfers(params: WalletTypes.IRequestIncomingTransfers): Promise<WalletTypes.IResult<WalletTypes.ITransfers> | null>;
    /**
     * Return the spend or view private key.
     * @param key_type string; Which key to retrieve: "mnemonic" - the mnemonic seed (older wallets do not have one) OR "view_key" - the view key
     * @returns
     */
    queryKey(key_type: string): Promise<WalletTypes.IResult<WalletTypes.IQuerykey> | null>;
}
export default MoneroWallet;
//# sourceMappingURL=wallet.d.ts.map