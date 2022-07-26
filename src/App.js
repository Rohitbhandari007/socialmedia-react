import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { AuthProvider } from './context/AuthContext'
import Login from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PrivateRoute from './utils/PrivateRoute';
import Register from './components/auth/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


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

          </Switch>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
