declare module WalletTypes {
  export interface IResult<T> {
    id: string;
    jsonrpc: string;
    result: T;
  }

  export interface PerSubaddress {
    address: string;
    address_index: number;
    balance: any;
    label: string;
    num_unspent_outputs: number;
    unlocked_balance: any;
  }

  export interface IBalance {
    balance: number;
    multisig_import_needed: boolean;
    per_subaddress: PerSubaddress[];
    unlocked_balance: number;
  }

  export interface Index {
    index: IAddressIndex;
  }

  export interface IAddressIndex {
    major: number;
    minor: number;
  }

  export interface ICreateWallet {
    address: string;
    address_index: number;
  }

  export interface IValidateAddress {
    valid: boolean;
    integrated: boolean;
    subaddress: boolean;
    nettype: string;
    openalias_address: boolean;
  }

  export interface ISubaddressAccount {
    account_index: number;
    balance: number;
    base_address: string;
    label: string;
    tag: string;
    unlocked_balance: number;
  }

  export interface IGetAccounts {
    subaddress_accounts: ISubaddressAccount[];
    total_balance: number;
    total_unlocked_balance: number;
  }

  export interface ICreateAccount {
    account_index: number;
    address: string;
  }

  export interface IAccountTag {
    accounts: number[];
    label: string;
    tag: string;
  }

  export interface ILabelAccount {
    account_tags: IAccountTag[];
  }

  export interface IHeight {
    height: number;
  }

  export interface IDestination {
    amount: any;
    address: string;
  }

  export interface IRequestTransfer {
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

  export interface ITransfer {
    amount: number;
    fee: number;
    multisig_txset: string;
    tx_blob: string;
    tx_hash: string;
    tx_key: string;
    tx_metadata: string;
    unsigned_txset: string;
  }

  export interface ITransferSplit {
    amount_list: number[];
    fee_list: number[];
    multisig_txset: string;
    tx_hash_list: string[];
    tx_key_list: string[];
    unsigned_txset: string;
  }

  export interface ISignTransfer {
    amount: number;
    fee: number;
    multisig_txset: string;
    tx_blob: string;
    tx_hash: string;
    tx_key: string;
    tx_metadata: string;
    unsigned_txset: string;
  }

  export interface ISubmitTransfer {
    tx_hash_list: string[];
  }
}
