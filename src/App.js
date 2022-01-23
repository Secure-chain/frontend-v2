import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CreateEntity from './pages/entity/CreateEntity'
function App() {
  return (
    <div>
      <Router>
        <Switch>
          {/* <Route exact path="/" component={Home}/> */}
          <Route exact path="/createEntity" component={CreateEntity}/>
        </Switch>
      </Router>

    </div>
  )
}

export default App
