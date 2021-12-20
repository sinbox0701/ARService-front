import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { client, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme } from "./styles";
import routes from "./routes";
import { Admin } from "./screens/Admin";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";
import { MyPage } from "./screens/MyPage";
import { MyPagePlus } from "./screens/MyPagePlus";
import { Signup } from "./screens/Signup";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <ApolloProvider client={client}>
          <HelmetProvider>
          <ThemeProvider theme={lightTheme}>
          <GlobalStyles/>
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                {isLoggedIn ? <Home/> : <Login/>}
              </Route>
              {!isLoggedIn ? (
                <Route path={routes.signUp}>
                <Signup/>
              </Route>
              ) : null}
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
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}
 
export default App;