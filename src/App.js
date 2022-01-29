import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import SideNav from './components/sideNav/SideNav'
import CreateEntity from './pages/entity/CreateEntity'
import ProductTracking from './pages/tracking/ProductTracking'
function App() {
  return (
    <div>
      <Router>
        <SideNav/>
          <Switch>
          <Route exact path="/createEntity" component={CreateEntity} />
            <Route exact path="/tracking" component={ProductTracking}/>
          </Switch>
      </Router>

    </div>
  )
}

export default App
