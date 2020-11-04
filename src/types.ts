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
}
