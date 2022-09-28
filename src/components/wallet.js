import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import pic from "../../src/Liquid-logo.svg";
import WalletIcon from "@mui/icons-material/Wallet";
// import Torus from "@toruslabs/torus-embed";
// import WalletConnectProvider from "@walletconnect/web3-provider";

const styles = {
  media: {
    padding: "20px",
  },
};

function Wallet() {
  const [web3Modal, setWeb3Modal] = useState(null);
  const [address, setAddress] = useState("");
  useEffect(() => {
    const providerOptions = {
      binancechainwallet: {
        package: true,
      },
      // walletconnect: {
      //   package: WalletConnectProvider,
      //   options: {
      //     infuraId:
      //       "https://rinkeby.infura.io/v3/2c7bc78c35e8462daaa6020d1f47496ac", // required
      //   },
      // },
      // torusOptions: {
      //   package: Torus, // required
      //   options: {
      //     networkParams: {
      //       chainId: 4,
      //     },
      //   },
      // },
      coninbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
          appName: "kyc-wallet",
          infuraId:
            "https://rinkeby.infura.io/v3/2c7bc78c35e8462daaa6020d1f47496ac",
          chainId: 4,
        },
      },
    };

    const web3Modal = new Web3Modal({
      disableInjectedProvider: false,
      cacheProvider: false,
      providerOptions,
      network: "rinkeby",
    });

    setWeb3Modal(web3Modal);
  }, []);

  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [web3Modal]);

  async function connectWallet() {
    try {
      const web3ModalInstance = await web3Modal.connect();
      addListeners(web3ModalInstance);
      const web3ModalProvider = new ethers.providers.Web3Provider(
        web3ModalInstance
      );
      const userAddress = await web3ModalProvider.getSigner().getAddress();
      setAddress(userAddress);
      console.log(userAddress);
    } catch (error) {
      console.log(error);
    }
  }

  async function addListeners(web3ModalProvider) {
    web3ModalProvider.on("accountsChanged", (accounts) => {
      window.location.reload();
    });

    // Subscribe to chainId change
    web3ModalProvider.on("chainChanged", (chainId) => {
      window.location.reload();
    });
  }
  return (
    <div>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          style={styles.media}
          // height="120"
          // width="80"
          image={pic}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Access to your wallet.
          </Typography>
          <Typography variant="body1" color="text.primary">
            Wallet Address:
            <b>
              {" "}
              {address?.substring(0, 10)}...
              {address?.substring(address.length - 10)}
            </b>
          </Typography>
        </CardContent>
        <CardActions>
          {!address ? (
            <Button
              sx={{
                height: "35px",
                width: "110px",
                backgroundColor: "#10193A",
              }}
              variant="contained"
              size="small"
              onClick={connectWallet}
              startIcon={<WalletIcon />}
            >
              <b>Connect</b>
            </Button>
          ) : (
            <Typography variant="body1" color="text.primary">
              Wallet is Connected !
            </Typography>
          )}
        </CardActions>
      </Card>
    </div>
  );
}

export default Wallet;
