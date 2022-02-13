import React, { useState, useEffect } from 'react'
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
function App() {

  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState();
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

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
        "0x9331eEb6b5a3080E8F3ad08d946865a7127CDf75",
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
  addProduct = (productNo, productName, noOfBatches, unitsPerBatch, supplyChainId, ownerName, timestamp) => {
    setLoading(true)
    console.log(productNo, productName, noOfBatches, unitsPerBatch, supplyChainId, ownerName, timestamp, this.state.account)
    contract.methods.addProduct(productNo, productName, noOfBatches, unitsPerBatch, supplyChainId, ownerName, timestamp).send({ from: account }).on('transactionHash', (hash) => {
      setLoading(false)
    })
  }

  // fuunction to transfer batches of a product
  transferProduct = (productNo, productName, batchesToTransfer, supplyChainId, transferTo, transferToName, timestamp, notificationId) => {
    setLoading(true)
    contract.methods.transferProduct(productNo, productName, batchesToTransfer, supplyChainId, transferTo, transferToName, timestamp, notificationId).send({ from: account }).on('transactionHash', (hash) => {
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
            <ParticipationRequests/>
          </Route>
          <Route exact path="/enroll" component={EnrollInSupplyChain} />
          <Route exact path="/transfer" component={TransferProduct} />
          <Route exact path="/tracking" component={ProductTracking}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App
