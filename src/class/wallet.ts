class MoneroWallet {
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
  }

  public async request(method: string, params: any) {
    let option = { jsonrpc: "2.0", id: "0", method, params };
  }
}

export default MoneroWallet;
