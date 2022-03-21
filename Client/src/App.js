import "./App.css";
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Surface from "./components/surface/surface";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [user, setLoginUser] = useState({});
  const [isSeller, setIsSeller] = useState({});
  console.log("isSeller from App: " + isSeller);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {user && user._id ? (
              <Homepage
                setLoginUser={setLoginUser}
                Seller={isSeller}
                user={user}
              />
            ) : (
              <Login setIsSeller={setIsSeller} setLoginUser={setLoginUser} />
            )}
            
          </Route>
          <Route path="/login">
            <Login setIsSeller={setIsSeller} setLoginUser={setLoginUser} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
