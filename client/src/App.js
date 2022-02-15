import React, { useState, useEffect } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Playground from './components/playground/Playground'
import NavBar from './components/navBar/NavBar'
import SideNav from './components/sideNav/SideNav'
import OwnedSupplyChains from './pages/dashboard/OwnedSupplyChains'
import ParticipationRequests from './pages/dashboard/ParticipationRequests'
import CreateEntity from './pages/entity/CreateEntity'
import ProductTracking from './pages/tracking/ProductTracking'
import EnrollInSupplyChain from './pages/enrollInSupplyChain/EnrollInSupplyChain'
import SupplyChainManagement from "./contracts/SupplyChainManagement.json"
import EnrolledSupplyChains from './pages/dashboard/EnrolledSupplyChain'
import TransferProduct from "./pages/transfer/TransferProduct.js"
import getWeb3 from "./getWeb3"
import CreateProduct from './pages/product/CreateProduct'
function App() {

  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState();
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productsCount, setProductsCount] = useState('')
  // const [products, setProducts] = useState([])

  const setup = async () => {
    try {

      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      console.log("setup");

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log("accounts", accounts);
      setAccount(accounts[0]);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SupplyChainManagement.networks[networkId];
      const contract = new web3.eth.Contract(
        SupplyChainManagement.abi,
        "0x6151829A7927745Df986664Bcd72C4824d19f12e",
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      setWeb3(web3);
      setAccounts(accounts);
      setContract(contract);

      setLoading(false);

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  useEffect(async () => {
    console.log("setup");
    setup();
  }, [])

  // function to add new product
  const addProduct = async (productNo, productName, noOfBatches, unitsPerBatch, supplyChainId, ownerName, timestamp) => {
    setLoading(true)
    console.log(productNo, productName, noOfBatches, unitsPerBatch, supplyChainId, ownerName, timestamp, account)
    contract.methods.addProduct(productNo, productName, noOfBatches, unitsPerBatch, supplyChainId, ownerName, timestamp).send({ from: account }).on('transactionHash', (hash) => {
      setLoading(false)
    })
  }

  // fuunction to transfer batches of a product
  const transferProduct = async (productNo, productName, batchesToTransfer, supplyChainId, transferTo, transferToName, timestamp, notificationId) => {
    setLoading(true)
    contract.methods.transferProduct(productNo, productName, batchesToTransfer, supplyChainId, transferTo, transferToName, timestamp, notificationId).send({ from: account }).on('transactionHash', (hash) => {
      setLoading(false)
    })
  }

  // function to request the transfer of batches of a product
  const requestTransfer = async (productNo, productName, batchesToTransfer, supplyChainId, currentOwnerName, transferTo, transferToName, timestamp) => {
    setLoading(true)
    contract.methods.requestTransfer(productNo, productName, batchesToTransfer, supplyChainId, currentOwnerName, transferTo, transferToName, timestamp).send({ from: account }).on('transactionHash', (hash) => {
      setLoading(false)
    })
  }

  // function to get the current no. of batches of a product in ownership
  const currentBatchesInOwnership = async (productNo, supplyChainId) => {
    const batches = await contract.methods.batchesInOwnership(productNo, account).call()
    console.log("bathches", batches)
    return batches;
  }

  // function to get the current no. of units of a product in ownership
  const currentUnitsInOwnership = async (productNo, supplyChainId) => {
    const units = await contract.methods.currentUnitsInOwnership(productNo, supplyChainId).call();
    console.log("units", units)
    return units;
  }

  // func
  const getProductName = async (productNo) => {
    const productName = await contract.methods.getProductName(productNo).call();
    console.log(productName)
    return productName;
  }

  const productsInSupplyChain = async (supplyChainId) => {
    //this.setState({ products: [] })
    const productsCount = await contract.methods.productCountInSupplyChain(supplyChainId).call()
    console.log(productsCount)
    setProductsCount(productsCount)
    let products = []
    // setProducts([])
    for (var i = 1; i <= productsCount; i++) {
      const product = await contract.methods.productBySupplyChain(supplyChainId, i).call()
      // setProducts(products => [...products, product])
      products.push(product)
      console.log("Debug Products", products);
      console.log("Data type", typeof product);
      //products = [...products, product]
    }
    return products;
  }

  const getNotificationsOfUser = async () => {
    const notificationsCount = await contract.methods.getNotificationsCount(accounts[0]).call();
    let notifications = []
    for (var i = 1; i <= notificationsCount; i++) {
      const notification = await contract.methods.getNotifications(accounts[0], i).call()
      notifications = [...notifications, notification]
    }
    return notifications;
  }

  const acceptTransfer = async (notificationId, timestamp) => {
    setLoading(true)
    console.log(contract)
    contract.methods.acceptTransfer(notificationId, timestamp).send({ from: account }).on('transactionHash', (hash) => {
      setLoading(false)
    })
  }

  return (
    <div>
      <Router>
        <NavBar/>
        <SideNav/>
        <Switch>
          <Route exact path="/createEntity" component={CreateEntity}/>
          <Route exact path="/test" component={Playground}/>
          <Route exact path="/dashboard/ownedsupplychains">
            <OwnedSupplyChains/>
          </Route>
          <Route exact path="/dashboard/enrolledsupplychains">
            <EnrolledSupplyChains/>
          </Route>
          <Route exact path="/dashboard/participationrequests">
            <ParticipationRequests
              getNotificationsOfUser={getNotificationsOfUser}
              acceptTransfer={acceptTransfer}
            />
          </Route>
          <Route exact path="/enroll" component={EnrollInSupplyChain} />
          <Route exact path="/transfer">
            <TransferProduct
              getProductName={getProductName}
              productsInSupplyChain={productsInSupplyChain}
              currentBatchesInOwnership={currentBatchesInOwnership}
              currentUnitsInOwnership={currentUnitsInOwnership}
              transferProduct={transferProduct}
              requestTransfer={requestTransfer}
            />
          </Route>
          <Route exact path="/tracking" component={ProductTracking}/>
          <Route exact path="/createProduct">
            <CreateProduct
              addProduct={addProduct}
              // currentBatchesInOwnership={currentBatchesInOwnership}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
