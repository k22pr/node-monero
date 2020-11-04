import Wallet from "./class/wallet";

const wallet = new Wallet();

(async () => {
  await wallet.getBalance([0], 1);
})();
