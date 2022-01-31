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
import { Layout } from "./components/Layout";
import { QuestionList } from "./components/add/QuestionList";
import { Notification } from "./components/add/Notification";
import { Information } from "./components/add/Information";
import { AdminContainer } from "./components/Admin/AdminContainer";
import io from 'socket.io-client';
import { VideoCall } from "./screens/VideoCall";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                {isLoggedIn ? (<Layout> <Home /> </Layout>) : <Login />}
              </Route>
              {!isLoggedIn ? (
                <Route path={routes.signUp}>
                  <Signup />
                </Route>
              ) : null}
              <Route path={`${routes.myPage}/:nickname`} exact>
                <Layout>
                  <MyPage />
                </Layout>
              </Route>
              <Route path={`${routes.myPage}/:nickname/video`}>
                <Layout>
                  <VideoCall />
                </Layout>
              </Route>
              <Route path={`${routes.myPage}/:nickname/add`}>
                <Layout>
                  <MyPagePlus />
                </Layout>
              </Route>
              <Route path={`${routes.myPage}/:nickname/notification`}>
                <Layout>
                  <Notification />
                </Layout>
              </Route>
              <Route path={`${routes.myPage}/:nickname/question`}>
                <Layout>
                  <QuestionList />
                </Layout>
              </Route>
              <Route path={`${routes.myPage}/:nickname/information`}>
                <Layout>
                  <Information />
                </Layout>
              </Route>
              <Route path={routes.admin}>
                {isLoggedIn ? <AdminContainer><Admin /></AdminContainer> : <Login />}
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