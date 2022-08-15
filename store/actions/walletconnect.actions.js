import { WalletConnectConstants } from '../constants/walletconnect.constants';

const WalletConnectActions = {
  connectWallet,
  disconnectWallet,
};

function connectWallet(web3, provider, address, chainId, web3Modal, balance) {
  return dispatch => {
    dispatch(_connectWallet(web3, provider, address, chainId, web3Modal, balance));
  };
}

const _connectWallet = (web3, provider, address, chainId, web3Modal, balance) => {
  return {
    type: WalletConnectConstants.WALLETCONNECTED,
    web3,
    provider,
    address,
    chainId,
    web3Modal,
    balance,
  };
};

function disconnectWallet() {
  return dispatch => {
    dispatch(_disconnectWallet());
  };
}

const _disconnectWallet = () => {
  return {
    type: WalletConnectConstants.WALLETDISCONNECTED,
  };
};

export default WalletConnectActions;
