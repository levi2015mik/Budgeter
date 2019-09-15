import React from 'react';
import Header from './components/Header'
import HomeWraper from './components/home/HomeWraper'
import Categories from "./components/Categories";
import List from "./components/List";
import Help from "./components/Help";
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
                    <Route path="/list" render={List}/>
                    <Route path="/help" render={Help}/>
                </div>
            </HashRouter>
        </div>
    );
}
export default App;
