import Link from "components/Link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  IconButton,
  Box,
  Button,
  MenuItem,
  Menu,
  Container
} from "@material-ui/core";
import { Link as Linking } from 'react-scroll'
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import MenuIcon from "@material-ui/icons/Menu";

import { routes } from "data/routes";

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Config from '../../public/config/Config.json';
import Web3 from 'web3'
import { useDispatch, useSelector } from 'react-redux';
import WalletConnectActions from '../../store/actions/walletconnect.actions';

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.up("xs")]: {
      minHeight: "74px",
    },
    [theme.breakpoints.down("xs")]: {
      // minHeight: "74px",
    },
  },
  logo: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
      marginRight: "0px",
    }
  },
  drawerIconContainer: {
    marginLeft: "auto",
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  toolbar: {
    maxWidth: "1920px",
    margin: "0 auto",
    width: "100%",
    minHeight: "74px",
    boxShadow: "6px 4px 20px -10px rgb(54 54 54 / 15%)",
    [theme.breakpoints.down("xs")]: {
      padding: "16px"
    }
  },
  drawerIcon: {
    height: `50px`,
    width: `50px`,
    color: `#fff`,
    [theme.breakpoints.down("xs")]: {
      height: `40px`,
      width: `40px`,
    },
  },
  drawer: {
    backgroundColor: theme.palette.secondary.main,
    width: "50%",
  },
  link: {
    fontSize: '27px !important',
    padding: "30px 0px 30px 0px",
    color: "#d29f4d",
    textTransform: 'uppercase',
    fontStyle: 'italic',
    "&:hover": {
      color: "#fff",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "10px 0px 10px 0px",
    }
  },
  connectBtn: {
    color: "#fff",
    background: "#000",
    border: "1px solid white",
    padding: "8px 20px",
    textTransform: "none",
    textAlign: "center",
    borderRadius: "52px",
    fontSize: "0.85rem",
  },
  coinBalance: {
    background: "#5B6900",
    border: "2px solid #CCE919",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    color: "#CCE919",
    marginRight: "10px"
  },
  tokenBalance: {
    color: "#A4A6A4",
    fontWeight: "bold",
    marginRight: "27.7px"
  },
  settingIcon: {
    color: "#A4A6A4",
    marginRight: "32px"
  },
  welcomTitle: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "30px",
    lineHeight: "39px",
    color: "#FFFFFF",
    marginBottom: "6px"
  },
  welcomeMsg: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "20px",
    lineHeight: "26px",
    color: "#DADADA"
  },
  tooltip: {
    padding: '25px 28px 27px 30px'
  },
  appBar: {
    background: "#974a26",
    zIndex: 1000,
    boxShadow: "rgb(0 0 0 / 2%) 0px 0px 0px 1px, rgb(0 0 0 / 5%) 5px 5px 15px, rgb(0 0 0 / 5%) -5px -5px 15px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.33)"
  }
}));

const Header = () => {
  const classes = useStyles();

  const {
    web3,
    provider,
    address,
    chainId,
    web3Modal,
    balance,
  } = useSelector(state => state.ConnectWallet);

  const {
    user
  } = useSelector(state => state.Auth);

  const reduxDispatch = useDispatch()

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('Please install and active the metamask extension!');
      return;
    }

    try {
      // check if the chain to connect to is installed
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x89' }], // chainId must be in hexadecimal numbers
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: 'Polygon Mainnet!',
                chainId: '0x89',
                rpcUrls: ['https://polygon-rpc.com'],
                nativeCurrency: {
                  symbol: 'MATIC',
                  decimals: 18
                },
                blockExplorerUrls: ['https://polygonscan.com']
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
      console.error(error);
    }

    const networkId = await ethereum.request({
      method: "net_version",
    });
    if (networkId != Config.NETWORK_ID) {
      toast.error("Please select correct network");
      return;
    }

    const providerOptions = {
      walletconnect: {
        display: {
          name: "Mobile"
        },
        package: WalletConnectProvider,
        options: {
          infuraId: Config.INFURA_ID // required,
        }
      }
    };

    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions // required
    })
    web3Modal.clearCachedProvider();
    //var provider

    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);

    provider.on('connect', (info) => {
      toast.success(`Connected wallet`);
    });
    const address = await web3.eth.getAccounts();
    const network = await web3.eth.getChainId(); // get chain ID
    const gwei = await web3.eth.getBalance(address[0]);
    const balance = web3.utils.fromWei(gwei.toString(), 'ether')

    reduxDispatch(WalletConnectActions.connectWallet(
      web3,
      provider,
      address[0],
      network,
      web3Modal,
      parseFloat(balance).toFixed(3),
    ));
  }

  const disconnetWallet = async () => {
    await web3Modal.clearCachedProvider();
    reduxDispatch(WalletConnectActions.disconnectWallet())
    walletBtnHandleClose();
  };

  const formatAddress = (str) => {
    return str ? str.slice(0, 5) + '...' + str.slice(str.length - 5) : '';
  }

  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDrawer, setOpenDrawer] = useState(false);

  const router = useRouter();

  const path = routes;

  const [anchorEl, setAnchorEl] = useState(null);

  const walletBtnHandleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const walletBtnHandleClose = () => {
    setAnchorEl(null);
  };

  const tabs = (
    <>
      <Box display='flex' alignItems='center'>
        <Box mr={4}>
          <Link target="_blank" href="https://www.weloveguac.org/">
            <Typography className={classes.logo}><img height={50} src="logo-chip.png"></img></Typography>
          </Link>
        </Box>
        <Box>
          <Grid container spacing={4}>
            {path.map(({ name, link }) => (
              <Grid item key={link}>
                <Link target="_blank" href={link} style={{ textDecoration: "none", cursor: "pointer" }}>
                  <Typography
                    className={classes.link}
                    variant="h1"
                  >
                    {name}
                  </Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" style={{ paddingRight: "40px" }}>
        {address ? (
          <Box>
            <Button onClick={disconnetWallet} aria-haspopup="true" className={classes.connectBtn}>
              <Box display="flex" pr="4px">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path></svg>
              </Box>
              {formatAddress(address)}
            </Button>
          </Box>
        ) : (
          <Button onClick={connectWallet} className={classes.connectBtn}>
            Connect
          </Button>
        )}
      </Box>
    </>
  );
  const drawer = (
    <>
      <Box display='flex' alignItems='center'>
        <Box mr={5}>
          <Link target="_blank" href="https://www.weloveguac.org/">
            <Typography className={classes.logo}><img height={50} src="logo-chip.png"></img></Typography>
          </Link>
        </Box>
        <Box>
          <Grid container spacing={4}>
            {path.map(({ name, link }) => (
              <Grid item key={link}>
                <Link target="_blank" href={link} style={{ textDecoration: "none", cursor: "pointer" }}>
                  <Typography
                    className={classes.link}
                    variant="h1"
                  >
                    {name}
                  </Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
        anchor="right"
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          <Box display="flex" justifyContent="center">
            {address ? (
              <Button onClick={disconnetWallet} aria-haspopup="true" className={classes.connectBtn}>
                <Box display="flex" pr="4px">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path></svg>
                </Box>
                {formatAddress(address)}
              </Button>
            ) : (
              <Button onClick={connectWallet} className={classes.connectBtn}>
                Connect
              </Button>
            )}
          </Box>
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );
  return (
    <>
      <ElevationScroll>
        <AppBar className={classes.appBar}>
          <Toolbar
            disableGutters
            className={classes.toolbar}
          >
            <Container style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              {matches ? drawer : tabs}
            </Container>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};
export default Header;
