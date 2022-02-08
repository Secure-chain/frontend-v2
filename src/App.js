import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Playground from './components/playground/Playground'
import NavBar from './components/navBar/NavBar'
import SideNav from './components/sideNav/SideNav'
import OwnedSupplyChains from './pages/dashboard/OwnedSupplyChains'
import ParticipationRequests from './pages/dashboard/ParticipationRequests'
import CreateEntity from './pages/entity/CreateEntity'
import ProductTracking from './pages/tracking/ProductTracking'
function App() {
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
          <Route exact path="/dashboard/participationrequests">
            <ParticipationRequests/>
          </Route>
          <Route exact path="/tracking" component={ProductTracking}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App
