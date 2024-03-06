import React, { useState, useEffect } from 'react';
import "./login.css"
import { useMetaMask } from "metamask-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
function Login() {
  const [userWalletAddress, setUserWalletAddress] = useState(null);
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const navigate = useNavigate();

  useEffect(() => {
    toggleButton();
  }, []);

  function toggleButton() {
    const loginButton = document.getElementById('loginButton');
    if (!window.ethereum) {
      loginButton.innerText = 'MetaMask is not installed';
      loginButton.classList.remove('bg-purple-500', 'text-white');
      loginButton.classList.add('bg-gray-500', 'text-gray-100', 'cursor-not-allowed');
      return false;
    }

    loginButton.addEventListener('click', loginWithMetaMask);
  }

  async function loginWithMetaMask() {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setUserWalletAddress(accounts[0]);
      const userWallet = document.getElementById('userWallet');
      userWallet.innerText = accounts[0];
      const loginButton = document.getElementById('loginButton');
      loginButton.innerText = 'Sign out of MetaMask';
      loginButton.removeEventListener('click', loginWithMetaMask);
      setTimeout(() => {
        loginButton.addEventListener('click', signOutOfMetaMask);
      }, 200);
    } catch (error) {
      console.error(error.message);
    }
  }

  function signOutOfMetaMask() {
    setUserWalletAddress(null);
    const userWallet = document.getElementById('userWallet');
    userWallet.innerText = '';
    const loginButton = document.getElementById('loginButton');
    loginButton.innerText = 'Sign in with MetaMask';
    loginButton.removeEventListener('click', signOutOfMetaMask);
    setTimeout(() => {
      loginButton.addEventListener('click', loginWithMetaMask);
    }, 200);
  }

  // if (status === "initializing") return <div>Synchronisation with MetaMask ongoing...</div>
  // if (status === "unavailable") return <div>MetaMask not available :</div>
  // if (status === "notConnected") return <button onClick={connect}>Connect to MetaMask</button>
  // if (status === "connecting") return <div>Connecting...</div>
  if (status === "connected") {navigate('/Booking')}

  return (
    <div className="login-container">
      <div className="login-box">
        <button id="loginButton" className="login-button">
          Login with MetaMask
        </button>
        <p id="userWallet" className="user-wallet">
          {userWalletAddress}
        </p>
      </div>
    </div>
  );
}

export default Login;
