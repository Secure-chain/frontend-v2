import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavBar from './components/navBar/NavBar'
import SideNav from './components/sideNav/SideNav'
import OwnedSupplyChains from './pages/dashboard/OwnedSupplyChains'
import CreateEntity from './pages/entity/CreateEntity'
function App() {
  return (
    <div>
      <Router>
        <NavBar/>
        <SideNav/>
          <Switch>
            <Route exact path='/'>
              <CreateEntity/>
            </Route>
            <Route exact path="/dashboard/ownedsupplychains">
              <OwnedSupplyChains/>
            </Route>
          </Switch>
      </Router>

    </div>
  )
}

export default App
