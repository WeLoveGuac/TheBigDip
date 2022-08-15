import { WalletConnectConstants } from '../constants/walletconnect.constants';

export function ConnectWallet(
  state = {
    web3: null,
    provider: null,
    address: null,
    chainId: null,
    web3Modal: null,
    balance: null,
  },
  action
) {
  switch (action.type) {
    case WalletConnectConstants.WALLETCONNECTED: {
      return {
        ...state,
        web3: action.web3,
        provider: action.provider,
        address: action.address,
        chainId: action.chainId,
        web3Modal: action.web3Modal,
        balance: action.balance,
      };
    }
    case WalletConnectConstants.WALLETDISCONNECTED: {
      return {
        ...state,
        web3: null,
        provider: null,
        address: null,
        chainId: null,
        web3Modal: null,
        balance: null,
      };
    }
    default: {
      return state;
    }
  }
}
