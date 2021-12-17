import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import routes from "./routes";
import { Admin } from "./screens/Admin";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";
import { MyPage } from "./screens/MyPage";
import { MyPagePlus } from "./screens/MyPagePlus";
import { Signup } from "./screens/Signup";

function App() {
  const isLoggedIn = true;
  return (
    <div>
      <Router>
        <Switch>
          <Route path={routes.home} exact>
            {isLoggedIn ? <Home/> : <Login/>}
          </Route>
          <Route path={routes.signUp}>
            <Signup/>
          </Route>
          <Route path={routes.myPage} exact>
            <MyPage/>
          </Route>
          <Route path={routes.add}>
            <MyPagePlus/>
          </Route>
          <Route path={routes.admin}>
            {isLoggedIn ? <Admin/> : <Login/>}
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}
 
export default App;