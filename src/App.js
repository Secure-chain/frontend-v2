import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Playground from './components/playground/Playground'
import SideNav from './components/sideNav/SideNav'
import CreateEntity from './pages/entity/CreateEntity'
function App() {
  return (
    <div>
      <Router>
      <SideNav/>
        <Switch>
          {/* <Route exact path="/" component={Home}/> */}
          <Route exact path="/createEntity" component={CreateEntity}/>
          <Route exact path="/test" component={Playground}/>
        </Switch>
      </Router>

    </div>
  )
}

export default App
