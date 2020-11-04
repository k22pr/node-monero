declare module WalletTypes {
    interface IResult<T> {
        id: string;
        jsonrpc: string;
        result: T;
    }
    interface PerSubaddress {
        address: string;
        address_index: number;
        balance: any;
        label: string;
        num_unspent_outputs: number;
        unlocked_balance: any;
    }
    interface IBalance {
        balance: number;
        multisig_import_needed: boolean;
        per_subaddress: PerSubaddress[];
        unlocked_balance: number;
    }
    interface Index {
        index: IAddressIndex;
    }
    interface IAddressIndex {
        major: number;
        minor: number;
    }
    interface ICreateWallet {
        address: string;
        address_index: number;
    }
    interface IValidateAddress {
        valid: boolean;
        integrated: boolean;
        subaddress: boolean;
        nettype: string;
        openalias_address: boolean;
    }
    interface ISubaddressAccount {
        account_index: number;
        balance: number;
        base_address: string;
        label: string;
        tag: string;
        unlocked_balance: number;
    }
    interface IGetAccounts {
        subaddress_accounts: ISubaddressAccount[];
        total_balance: number;
        total_unlocked_balance: number;
    }
    interface ICreateAccount {
        account_index: number;
        address: string;
    }
    interface IAccountTag {
        accounts: number[];
        label: string;
        tag: string;
    }
    interface ILabelAccount {
        account_tags: IAccountTag[];
    }
    interface IHeight {
        height: number;
    }
    interface IDestination {
        amount: any;
        address: string;
    }
    interface IRequestTransfer {
        destinations: IDestination[];
        account_index: number;
        subaddr_indices: number[];
        mixin?: number;
        priority: number;
        ring_size: number;
        get_tx_key: boolean;
        unlock_time?: number;
        do_not_relay?: boolean;
        get_tx_hex?: boolean;
        get_tx_metadata?: boolean;
    }
    interface ITransfer {
        amount: number;
        fee: number;
        multisig_txset: string;
        tx_blob: string;
        tx_hash: string;
        tx_key: string;
        tx_metadata: string;
        unsigned_txset: string;
    }
    interface ITransferSplit {
        amount_list: number[];
        fee_list: number[];
        multisig_txset: string;
        tx_hash_list: string[];
        tx_key_list: string[];
        unsigned_txset: string;
    }
    interface ISignTransfer {
        amount: number;
        fee: number;
        multisig_txset: string;
        tx_blob: string;
        tx_hash: string;
        tx_key: string;
        tx_metadata: string;
        unsigned_txset: string;
    }
    interface ISubmitTransfer {
        tx_hash_list: string[];
    }
    interface IRequestSweepDust {
        get_tx_keys?: boolean;
        do_not_relay?: boolean;
        get_tx_hex?: boolean;
        get_tx_metadata?: boolean;
    }
    interface ISweep {
        tx_hash_list?: string[];
        tx_key_list?: string[];
        amount_list?: number[];
        fee_list?: number[];
        tx_metadata_list?: string[];
        multisig_txset: string;
        unsigned_txset: string;
    }
    interface IRequestSweep {
        address: string;
        account_index: number;
        subaddr_indices?: number[];
        priority?: number;
        mixin?: number;
        ring_size?: number;
        unlock_time?: number;
        get_tx_keys?: boolean;
        below_amount?: number;
        do_not_relay?: boolean;
        get_tx_hex?: boolean;
        get_tx_metadata?: boolean;
    }
    interface ITxHash {
        tx_hash: string;
    }
    interface Payment {
        address: string;
        amount: number;
        block_height: number;
        payment_id: string;
        subaddr_index: IAddressIndex;
        tx_hash: string;
        unlock_time: number;
    }
    interface IPayments {
        payments: Payment[];
    }
    interface IRequestIncomingTransfers {
        transfer_type: string;
        account_index?: number;
        subaddr_indices?: number[];
        verbose?: boolean;
    }
    interface Transfer {
        amount: any;
        global_index: number;
        key_image: string;
        spent: boolean;
        subaddr_index: number;
        tx_hash: string;
        tx_size: number;
    }
    interface ITransfers {
        transfers: Transfer[];
    }
    interface IQuerykey {
        key: string;
    }
}
//# sourceMappingURL=types.d.ts.map