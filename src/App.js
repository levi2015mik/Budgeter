import React from 'react';
import Header from './components/Header'
import HomeWraper from './components/home/HomeWraper'
import Categories from "./components/Categories";
import Help from "./components/Help";
import Account from "./components/Account/Account";
import { HashRouter, Route} from "react-router-dom";
import css from './app.module.css';
import store from './redux/mystore'

function App() {
    window.store=store;
    return (
        <div className={css.App}>
            <HashRouter>
                <Header/>
                <div className={css.content}>
                    <Route exact path="/" render={()=><HomeWraper store={store} />} />
                    <Route path="/categories" render={Categories}/>
                    <Route path="/help" render={Help}/>
                    <Route path="/account/:id" render={Account} />
                </div>
            </HashRouter>
        </div>
    );
}
export default App;
