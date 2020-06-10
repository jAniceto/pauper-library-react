import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Container from 'react-bootstrap/Container';
// import Modal from 'react-bootstrap/Modal';
// import Spinner from 'react-bootstrap/Spinner';
// import InfiniteScroll from 'react-infinite-scroller';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  useParams
} from 'react-router-dom';

import './App.css';
import DeckShowcase from './pages';
import DeckIndex from './pages/deck-index';
import AboutPage from './pages/about';
import RandomDeckPage from './pages/random';
import DeckPage from './pages/deck-detail';
import PageNotFound from './pages/404';
import Header from './components/Header';
import Footer from './components/Footer';


class App extends React.Component {
  

  render() {
    return (<>
      <Router>
        <Header />
        
        <Switch>
          <Route exact path="/">
            <DeckShowcase />
          </Route>
          <Route exact path="/deck-index">
            <DeckIndex />
          </Route>
          <Route exact path="/about">
            <AboutPage />
          </Route>
          <Route exact path="/random">
            <RandomDeckPage />
          </Route>
          <Route path="/deck/:deckName">
            <DeckPage />
          </Route>  
          <Route exact path="/404">
            <PageNotFound />
          </Route>
          <Redirect to="/404" />
        </Switch>

        <Footer />
      </Router>
    </>);
  }
}

export default App;
