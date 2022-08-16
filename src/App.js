import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { AuthProvider } from './context/AuthContext'
import Login from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PrivateRoute from './utils/PrivateRoute';
import ProfilePage from './pages/ProfilePage';
import PublicProfilePage from './pages/PublicProfilePage';
import Register from './components/auth/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PostDetail from './components/PostDetail';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AuthProvider>

          <Switch>
            <PrivateRoute exact path='/'>
              <HomePage />
            </PrivateRoute>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
            <Route path='/profile'>
              <ProfilePage />
            </Route>
            <Route path='/user/:username/:id'>
              <PublicProfilePage />
            </Route>
            <Route path='/posts/:author/:id'>
              <PostDetail></PostDetail>
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
