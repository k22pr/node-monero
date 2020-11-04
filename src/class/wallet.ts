import axios from "axios";

class MoneroWallet {
  client: any;
  hostname: string;
  port: number;
  user: string;
  password: string;

  //init
  constructor(hostname: string, port: number | string, user: string = "", password: string = "") {
    this.hostname = hostname;
    this.port = Number(port);
    this.user = user;
    this.password = password;
    // this.client = rpc.Client.$create(this.port, this.hostname);
  }

  public async request<T>(method: string, params?: any) {
    let options = { jsonrpc: "2.0", id: "0", method, params };

    const res = await axios.post(`http://${this.hostname}:${this.port}/json_rpc`, options);
    if (res.status == 200) {
      return res.data as T;
    } else {
      return null;
    }
  }

  // public async setDemon(){
  //   return await this.request()
  // }

  public async getBalance(account_index: number[], address_indices: number) {
    return await this.request<WalletTypes.IResult<WalletTypes.IBalance>>("get_balance", {
      account_index,
      address_indices,
    });
  }

  public async getAddressIndex() {
    return await this.request<WalletTypes.IResult<WalletTypes.Index>>("get_address_index");
  }

  public async createAddress(account_index: number, label?: string) {
    return await this.request<WalletTypes.IResult<WalletTypes.ICreateWallet>>("create_address", {
      account_index,
      label,
    });
  }

  public async labelAddress(index: WalletTypes.Index, label: string) {
    return await this.request<WalletTypes.IResult<null>>("label_address", {
      index,
      label,
    });
  }

  public async validateAddress(address: string, any_net_type?: boolean, allow_openalias: boolean = false) {
    return await this.request<WalletTypes.IResult<WalletTypes.IValidateAddress>>("validate_address", {
      address,
      any_net_type,
      allow_openalias,
    });
  }

  public async getAccounts(tag?: string) {
    return await this.request<WalletTypes.IResult<WalletTypes.IGetAccounts>>("get_accounts", {
      tag,
    });
  }

  public async createAccount(label?: string) {
    return await this.request<WalletTypes.IResult<WalletTypes.ICreateAccount>>("create_account", {
      label,
    });
  }

  public async labelAccount(account_index: number, label: string) {
    return await this.request<WalletTypes.IResult<WalletTypes.ILabelAccount>>("label_account", {
      account_index,
      label,
    });
  }

  public async getAccountTags() {
    return await this.request<WalletTypes.IResult<WalletTypes.ILabelAccount>>("get_account_tags", {});
  }

  public async tagAccounts(tag: string, accounts: number[]) {
    return await this.request<WalletTypes.IResult<null>>("tag_accounts", {
      tag,
      accounts,
    });
  }

  public async untagAccounts(accounts: number[]) {
    return await this.request<WalletTypes.IResult<null>>("untag_accounts", {
      accounts,
    });
  }
}

export default MoneroWallet;
