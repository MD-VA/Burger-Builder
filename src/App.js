import React, { Component, Fragment } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import Orders from './container/Orders/Orders';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {

     let routes = (
            <Fragment>
              <Route path='/Auth' component={Auth}/>
              <Route path='/' exact component={BurgerBuilder}/>
              <Redirect to='/'/>
            </Fragment>      
     );

     if (this.props.isAuth) {
       routes = (
        <Fragment>
              <Route path='/Orders' component={Orders}/>
              <Route path='/checkout' component={Checkout}/>
              <Route path='/logout' component={Logout}/>
              <Route path='/' exact component={BurgerBuilder}/>
              <Redirect to='/'/>
        </Fragment>
       )
     }

    return (
      <div>
          <Layout>
            <Switch>
              {routes}
            </Switch>
          </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
