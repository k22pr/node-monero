import Wallet from "./class/wallet";

const wallet = new Wallet();

(async () => {
  await wallet.getHeight();
  await wallet.getHeight();
})();
