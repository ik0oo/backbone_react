'use strict';

//libs
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//header
import HeaderItem from './views/header/header-item';
import Header from './views/header/header';

import ProfileView from './views/profile';

//models
import Profile from './models/profile';
import BillModel from './models/bill';

//collections
import Profiles from './collections/profiles';

//routes
import Create from './views/create/create'
import Nav from './views/nav';
import Add from './views/create/add';
import Bill from './views/create/bill';


class App extends React.Component {
    constructor (options) {
        super(options);

        const storageData = this.localStorageRestoreData(options);

        this.state = {
            routeView: null,
            collection: new Profiles(storageData.collection)
        };

        this.base = storageData.base;

        this.headerModel = new Backbone.Model().set(this.base)
    }

    localStorageRestoreData (options) {
        // возвращает массив данных из localStorage
        if (!localStorage) return false;

        let base = {
            rub: options.rub,
            usd: options.usd,
            eur: options.eur
        };

        let data = JSON.parse(localStorage.getItem('Profiles'));

        const collection =  _.map(data, item => {
            if (item.bills) {
                item.bills = new Backbone.Collection(item.bills);

                _.each(item.bills.models, m => {
                    _.each(m.attributes, (attr, i) => {
                        base[i] -= Number(attr);
                    });
                }) ;

            }

            return new Profile().set(item);
        });

        return {
            collection: collection.length ? collection : false,
            base: base
        }
    }

    componentDidUpdate () {
        _.each(this.base, (attr, i) => {
            this.base[i] = this.headerModel.get(i);
        });
    }


    componentWillUnmount () {
        if (localStorage) {
            this.state.collection.off(null, null, this);
        }
    }

    componentDidMount () {
        const self = this;

        // запись данных в localStorage
        if (localStorage) {
            this.state.collection.on('change add remove', () => {
                let json = JSON.stringify(self.state.collection.toJSON());
                localStorage.setItem('Profiles', json);
            }, this);
        }

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
            let bills = model.get('bills');
            if (bills && bills.length) {
                let billsValid;
                _.each(bills.models, m => {
                    billsValid = _.every(m.attributes, (attr, i) => {
                        return this.base[i] >= attr;
                    });
                });

                if (!billsValid) return false;
            }

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
        this.state.collection.trigger('change'); // для записи в localStorage
        this.toProfile(model);
    }

    removeBill (updateModel, valute) {
        let newValue = Number(this.headerModel.get(valute)) + Number(updateModel.get(valute));
        this.headerModel.set(valute, newValue);

        updateModel.set(valute, 0, {silent: true});
        this.state.collection.trigger('change'); // для записи в localStorage
        this.setState({collection: this.state.collection});
    }

    deleteProfile (model) {
        let bills = model.get('bills');
        if (bills && bills.length) {
            _.each(bills.models, m => {
                _.each(m.attributes, (attr, i) => {
                    let hm = Number(this.headerModel.get(i)) + Number(attr);
                    this.headerModel.set(i, hm, {silent: true});
                });
            });
            this.headerModel.trigger('change');
        }

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
            let active;
            if (this.router) {
                active = model.cid === 'c' + this.router.current ? true : false;
            }

            return <ProfileView model={model} active={active} key={model.cid} />;
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
                    score={this.base}
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
                    bills={model.get('bills')}
                    onRemoveBill={this.removeBill.bind(this)}
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