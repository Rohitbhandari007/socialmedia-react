import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import Feed from './components/main/Feed'
import Auth from './components/auth/Auth'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Feed />
          </Route>
          <Route path='/auth'>
            <Auth />
          </Route>
        </Switch>

      </Router>
    </ChakraProvider>
  );
}

export default App;
