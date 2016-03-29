'use strict';

//libs
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//views
import Main from './views/main';
import HeaderItem from './views/header-item';
import ProfileView from './views/profile';

//collections
import Profiles from './collections/profiles';

//router
import RouterView from './router/router-view';

class App extends React.Component {
    constructor () {
        super();

        this.state = {
            base: {
                rub: 1000,
                usd: 1000,
                eur: 1000
            },
            routeView: null,
            collection: new Profiles
        };
    }

    componentDidMount () {
        const self = this;

        // создаем роутинг при создании компонента

        class Router extends Backbone.Router {
            routes () {
                return {
                    '': 'defaultRoute',
                    'profile/c:page': 'profile',
                    'profile/c:page/edit': 'edit',
                    'profile/c:page/send': 'send',
                    'add': 'add'
                };
            }

            defaultRoute (page) {
                self.setState({routeView: 'default'});
            }

            add (page) {
                self.setState({routeView: 'add'});
            }
        }

        this.router = new Router;
        Backbone.history.start();
    }

    addProfile (model) {
        this.state.collection.add(model);
        this.setState({collection: this.state.collection});
    }

    showCreateProfileView () {
        this.router.navigate('#add', {trigger: true, replace: false});
    }

    render () {
        // добавление элементов с отатком денежных средств
        const headerItems = _.map(this.state.base, (item, i) => {
            return <HeaderItem valuta={i} value={item} key={i} />;
        });

        // добавляем профили в сайдбар
        const profiles = _.map(this.state.collection.models, model => {
            return <ProfileView model={model} key= {model.cid} />;
        });


        return (
            <div class="layout">
                <header class="header">
                    <div class="logo">
                        Пользователи
                    </div>
                    <nav class="navbar navbar-static-top">
                        <div class="col-xs-offset-6 col-xs-6">
                            <div class="row">
                                {headerItems}
                            </div>
                        </div>
                    </nav>
                </header>

                <div class="container-fluid">
                    <div class="row">

                        <aside class="right-side">
                            <section class="content">
                                <div class="row">
                                    <div class="col-xs-6">
                                        <RouterView view={this.state.routeView} />
                                    </div>
                                </div>
                            </section>
                        </aside>

                        <aside class="aside left-side sidebar-offcanvas">
                            <section class="sidebar">
                                <ul class="sidebar-menu">
                                    {profiles}
                                </ul>
                                <button class="btn btn-primary btn-addon btn-sm" onClick={this.showCreateProfileView.bind(this)}>Добавить</button>
                            </section>
                        </aside>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />, document.getElementById('app')
);