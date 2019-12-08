import React from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Home from "./views/Home/Home"
import {HashLink as Link} from 'react-router-hash-link';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'

const RoutedApp = withRouter(props => <App {...props}/>);

const App = (props) => {
    const {pathname} = props.location;
    const homeLogo = <Link to={'/home'}>
    <img src='/assets/home.png' className= 'home'
         alt='This is replacement text if this does not display.'/>
</Link>;

    return (
        <div>
            <div className='m-auto' id='top'>
                <Switch>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/">
                        <Redirect to="/home"/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default RoutedApp;
