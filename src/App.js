import React from 'react';
import Header from './components/Header'
import HomeWraper from './components/home/HomeWraper'
import Categories from "./components/categories/Categories";
import InfoContainer from "./components/info/InfoContainer"
import Help from "./components/Help";
import Account from "./components/Account/accountContainer";
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
                    <Route path="/info" render={()=><InfoContainer store={store} />}/>
                    <Route path="/help" render={Help}/>
                    <Route path="/account/:id?" render={()=><Account store={store}/>} />
                </div>
            </HashRouter>
        </div>
    );
}
export default App;
