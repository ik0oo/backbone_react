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
import Header from './views/header';

//models
import Profile from './models/profile';
import BillModel from './models/bill';

//collections
import Profiles from './collections/profiles';

//routes
import Create from './views/create'
import Nav from './views/nav';
import Add from './views/add';
import Bill from './views/bill';


class App extends React.Component {
    constructor (options) {
        super(options);

        this.state = {
            routeView: null,
            collection: new Profiles
        };

        window.collection = this.state.collection;

        this.base = {
            rub: options.rub,
            usd: options.usd,
            eur: options.eur
        };

        this.headerModel = new Backbone.Model().set(this.base)
    }

    componentDidUpdate () {
        _.each(this.base, (attr, i) => {
            this.base[i] = this.headerModel.get(i);
        });
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

            emptyRoute (id) {
                return self.state.collection.get('c' + id);
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
                if (!this.emptyRoute(page)) return this.defaultRoute();
                self.router.current = page;
                self.setState({routeView: 'id'});
            }

            send (page) {
                if (!this.emptyRoute(page)) return this.defaultRoute();
                self.router.current = page;
                self.setState({routeView: 'send'});
            }

            edit (page) {
                if (!this.emptyRoute(page)) return this.defaultRoute();
                self.router.current = page;
                self.setState({routeView: 'edit'});
            }
        }

        this.router = new Router;
        Backbone.history.start();
    }

    addProfile (model, isChecked) {
        if (isChecked && model.isValid()) {
            let newModel = this.state.collection.add(model);

            this.setState({collection: this.state.collection});
            this.toProfile(newModel);

        } else {
            return false;
        }
    }

    saveProfile (model, profileModel) {
        model.set(profileModel.toJSON(), {silent: true});
        this.toProfile(model);
    }

    saveBill (model, billModel) {
        !model.get('bills') && model.set('bills', new Backbone.Collection);

        model.get('bills').add(billModel);
        this.toProfile(model);
    }

    deleteProfile (model) {
        this.state.collection.remove(model.cid);

        this.setState({collection: this.state.collection});
        this.router.navigate('/', {trigger: true, replace: false});
    }

    sendBill (model) {
        this.router.navigate('#profile/' + model.cid + '/send', {trigger: true, replace: false});
    }

    editProfile (model) {
        this.router.navigate('#profile/' + model.cid + '/edit', {trigger: true, replace: false});
    }

    toProfile (model) {
        this.router.navigate('#profile/' + model.cid, {trigger: true, replace: false});
    }

    updateBill (model, billModel) {
        !model.get('bills') && model.set('bills', new Backbone.Collection);

        model.get('bills').add(billModel);
        this.updateBase(billModel);
    }

    updateProfile (model, profileModel) {
        model.set(profileModel.attributes, {silent: true})
    }

    updateBase (model) {
        if (model) {
            _.each(model.attributes, (attr, i) => {
                let sum = this.base[i]- attr;

                if (sum <= this.base[i] && sum >= 0) {
                    this.headerModel.set(i, sum);
                }
            });

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
                    header={'Добавить пользователя'}
                    onSave={this.addProfile.bind(this, model)}
                    onUpdateBill={this.updateBill.bind(this, model)}
                    onUpdateProfile={this.updateProfile.bind(this, model)}
                    scores={this.base}
                />
            ;
        }
        if (this.state.routeView === 'edit') {
            let id = 'c' + this.router.current;
            let model = this.state.collection.get(id);

            routeView =
                <Create
                    type={'edit'}
                    model={model.toJSON()}
                    header={'Редактировать пользователя'}
                    onSave={this.saveProfile.bind(this, model)}
                    onCancel={this.toProfile.bind(this, model)}
                />
            ;
        }
        if (this.state.routeView === 'send') {
            let id = 'c' + this.router.current;
            let model = this.state.collection.get(id);

            routeView =
                <Create
                    type={'send'}
                    header={'Отправить перевод'}
                    onSave={this.saveBill.bind(this, model)}
                    onCancel={this.toProfile.bind(this, model)}
                    onUpdateBill={this.updateBill.bind(this, model)}
                    score={this.base}
                />
            ;
        }
        if (this.state.routeView === 'id') {
            let id = 'c' + this.router.current;
            let model = this.state.collection.get(id);

            routeView =
                <Nav
                    model={model}
                    onDelete={this.deleteProfile.bind(this)}
                    onEditPforile={this.editProfile.bind(this)}
                    onSendBill={this.sendBill.bind(this)}
                />;
        }

        return (
            <div class="layout">
                <Header
                    model={this.headerModel}
                />

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