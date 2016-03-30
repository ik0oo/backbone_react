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

//models
import Profile from './models/profile';
import BillModel from './models/bill';

//collections
import Profiles from './collections/profiles';

//routes
import Create from './views/create'
import Nav from './views/nav';


class App extends React.Component {
    constructor (options) {
        super(options);

        this.state = {
            base: {
                rub: options.rub,
                usd: options.usd,
                eur: options.eur
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
                self.router.current = page;
                self.setState({routeView: 'default'});
            }

            add (page) {
                self.router.current = page;
                self.setState({routeView: 'add'});
            }

            profile (page) {
                self.router.current = page;
                self.setState({routeView: 'id'});
            }
        }

        this.router = new Router;
        Backbone.history.start();
    }

    addProfile (model, isChecked) {
        if (isChecked && model.isValid()) {
            let newModel = this.state.collection.add(model);

            this.setState({collection: this.state.collection});
            this.router.navigate('#profile/' + newModel.cid, {trigger: true, replace: false});

        } else {
            return false;
        }
    }

    deleteProfile () {

    }

    cancelEditing () {

    }

    updateBill (model, billModel) {
        !model.get('bills') && model.set('bills', new Backbone.Collection);

        model.get('bills').add(billModel);
        this.updateBase(billModel);
    }

    updateProfile (model, profileModel) {
        model.set(profileModel.toJSON(), {silent: true})
    }

    updateBase (model) {
        if (model) {
            _.each(model.attributes, (attr, i) => {
                let sum = this.props[i]- attr;

                if (sum <= this.props[i] && sum >= 0) {
                    this.state.base[i] = sum;
                }
            });

            this.setState({base: this.state.base});

        } else {
            _.each(this.state.collection.models, model => {
                console.log(model);
            });
        }
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

        // routing
        let routeView;
        if (this.state.routeView === 'add') {
            let model = new Profile;

            routeView =
                <Create
                    onSave={this.addProfile.bind(this, model)}
                    onUpdateBill={this.updateBill.bind(this, model)}
                    onUpdateProfile={this.updateProfile.bind(this, model)}
                />
            ;
        }
        if (this.state.routeView === 'id') {
            let id = 'c' + this.router.current;
            let model = this.state.collection.get(id);

            routeView =
                <Nav
                    model={model}
                    onCancel={this.cancelEditing.bind(this)}
                    onDelete={this.deleteProfile.bind(this)}
                />;
        }

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
                                        {routeView}
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
    <App rub={1000} eur={1000} usd={1000}/>, document.getElementById('app')
);