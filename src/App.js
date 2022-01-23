import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import SideNav from './components/sideNav/SideNav'
import CreateEntity from './pages/entity/CreateEntity'
function App() {
  return (
    <div>
      <Router>
      <SideNav/>
      <CreateEntity/>
        <Switch>
          {/* <Route exact path="/" component={Home}/> */}
        </Switch>
      </Router>

    </div>
  )
}

export default App
