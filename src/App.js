/*import logo from "./assets/spendcoin.png";*/
import React, {useState, useEffect, useCallback} from "react";
// import "bootstrap/dist/css/bootstrap.css";
import Web3 from "web3";
import "./App.css";

//Json import
import chainsList from "./chains/chains.json"
import tokenList from "./tokensList/tokens.json"
// import Abi...

//Components import
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {

  //INIT
  const [web3] = useState(new Web3(Web3.givenProvider || "ws://localhost:8545"));
  const [isConnectedWeb3, setIsConnectedWeb3] = useState(false);
  const [networkId, setNetworkId] = useState(null)
  const [network, setNetwork] = useState({})
  const [isRinkeby, setIsRinkeby] = useState(false)
  const [addressContract] = useState("0x46da4441623da04f50f12bb9bba487ffe48f2218")
  // const [tokenId, setTokenId] = useState("")

  //SET GENERAL
  const [accounts, setAccounts] = useState([])
  const [price, setPrice] = useState(2)

  //SEND ETH
  // const [balance, setBalance] = useState(0)
  // const [weiToSend, setWeiToSend] = useState(0)

  //SEND ERC20
  // const [balanceOf, setBalanceOf] = useState(0)
  // const [decimals, setDecimals] = useState(0)
  // const [isMinedToken, setIsMinedToken] = useState(false)
  // const [isLoadingToken, setIsLoadingToken] = useState(false)
  // const [addressToSendToken, setAddressToSendToken] = useState("")
  // const [tokenToSend, setTokenToSend] = useState(0)
  // const [symbol, setSymbol] = useState("")
  // const [amountUSDC, setAmountUSDC] = useState(2)
   // const [addressUSDC] = useState("")
  const [nameToken, setNameToken] = useState("")
  // const [addressER20, setAddressERC20] = useState("")

  const [amountIn, setAmountIn]= useState(0)
  const [priceCalculated, setPriceCalculated] = useState(0)

  const connectToWeb3 =
  async () => {
    let currentChainID = await web3.eth.net.getId() //diff avec getchainid() ?
    setNetworkId(currentChainID)

    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        console.log('connected')
        setIsConnectedWeb3(true)
      } catch (err) {
        console.error(err)
      }
    } else {
      alert("Install Metamask")
    }
  }

const verifyNetwork = async () => {
  let currentChainID = await web3.eth.getChainId() //diff avec getid() ?
  setNetworkId(currentChainID)
  for (let i = 0; i < chainsList.length; i++) {
    if (currentChainID === chainsList[i].chainId)
      setNetwork(chainsList[i])
  }
    console.log(currentChainID);

  if (currentChainID == 4) {
    setIsRinkeby(true)
  } else {
    setIsRinkeby(false)
  }
}

/*
  Connection au chargement de la page
*/
useEffect(async () => {
  // Connection
  const displayAccConnect = () => {
    console.log("connect");
    verifyNetwork()
  }
  // Changement de chaine
  const displayChainChanged = () => {
    console.log("chainChanged");
    verifyNetwork()
  }
  const displayAccChanged = () => {
    const getAccounts = async () => setAccounts(await web3.eth.getAccounts())

    const acc = getAccounts()
    console.log(acc)
    if (acc.length === 0)
      setIsConnectedWeb3(false)
  }

  window.ethereum.on('connect', displayAccConnect)
  window.ethereum.on('chainChanged', displayChainChanged)
  window.ethereum.on('accountsChanged', displayAccChanged)

  verifyNetwork()

  return () => {
    if (window.ethereum.removeListener) {
      window.ethereum.removeListener('connect', displayAccConnect)
      window.ethereum.removeListener('chainChanged', displayAccChanged)
      window.ethereum.removeListener('accountsChanged', displayAccChanged)
    }
  }
}, [])

  const handleAmoutIn = async() => {
    const contract = new web3.eth.Contract(Abi, addressContract)
    return setAmountIn(await addressContract.methods.getAmountInMax(target.value, addressUSDC, price))
  }

// const sendToken = async () => {
//   // const contract = new web3.eth.Contract(Abi, addressContract)
//     if(tokenList.symbol == "ETH") {
//     
//         try {
//                 await contract.methods.swapETH(price)
//                 .on('receipt', () => {
//                 
//                 })
//             }
//             catch(error){
              /* if (await contract.methods.getPair()) {
                const reserves= await contract.methods.getReserves()
                  if (reserves < 1) {
                    alert("pas assez de liquidité")
                  }
              }
              else {
                alert("Pair doesn't exist")
              } */
    //             setIsLoadingToken(null)
    //             alert("Wrong Address")
    //         }
    // }
    // else {
    //   try {
    //     await contract.methods.swapToken(addressERC20, price)
    //     .on('receipt', () => {
    //     setIsLoadingToken(false)
    //     setIsMinedToken(true)
    //     })
    // }
    // catch(error){
      /* if (await contract.methods.getPair()) {
                const reserves =await contract.methods.getReserves()
                  if (reserves < 1) {
                    alert("pas assez de liquidité")
                  }
              }
              else {
                alert("Pair doesn't exist")
              } */
  //       setIsLoadingToken(null)
  //       alert("Wrong Address")
  //   }
  //   } 
  // }

// useEffect( async () => {

//   function loadBlockchainData() {
//     const web3 = window.web3;
//     // Load account
//     const accounts = await web3.eth.getAccounts();
//     setAccount(accounts[0])
//     const networkId = await web3.eth.net.getId();
//   }

//   loadBlockchainData();
// }, [])
/**
 * Rend JSX
 */

    return (
      <div className={"container"}>
        
        <Header handleClick={() => connectToWeb3()} network={network} />
          
          <div id="mainContent">
              <div id="swap-interface">
                  <form id="swap-box">
                      
                      <div class="first-price">
                          <h2>Price :&nbsp;{price}$</h2>
                      </div>
                      
                      <h3 class="pay-with">Pay with :</h3>
                      
                      <div class="group-top">
                          
                          <select name="listErc20">
                            {for(let i= 0 ; i < tokenList.length; i++){
                              <option value="{tokenList[i].symbol}">{tokenList[i].symbol}</option>
                            }}
                          
                          </select>
                          <span class="group-text"> <img src="{tokenList.logoURI}" alt=""/> </span>
                      
                      </div>
                      

                      <p><span class="italic">Slipage tolerance :</span>&nbsp;&nbsp;3% </p>
                      
                      <p class="margin-bottom-p"><span class="italic">maximum payed :</span>&nbsp;&nbsp;<span class="bold sizeERC20">{handleAmountIn()}{symbol}</span></p>
                      
                      <h2>Max Price : {calulatedPrice}</h2>
                      
                      <button class="btn-buy">BUY</button>
                  

                  </form>
              </div>
          </div>

        <Footer />
    </div>
    );
  }

export default App;
