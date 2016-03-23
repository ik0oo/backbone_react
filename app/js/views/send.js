//libs
import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
import Add from './add';
import Profile from '../models/profile';
import Bill from './bill';
import base from '../models/base';

export default class Send extends React.Component {
    constructor () {
        super();
        this.model = new Profile;
        this.valuteModel = new Backbone.Model;
    }

    send () {
        _.each(base.attributes, (attr, iterator, array) => {
            if (!~iterator.indexOf('_')) {
                array['_base_' + iterator] = attr;
            }
        });

        this.props.model.get('bills').add(this.valuteModel, {silent: true});
        this.props.router.navigate('#profile/' + this.props.model.cid, {trigger: true, replace: true});
    }

    cancel () {
        this.props.router.navigate('#profile/' + this.props.model.cid, {trigger: true, replace: true});
    }

    render () {
        return (

            <section class="panel">
                <header class="panel-heading">
                    Отправить
                </header>
                <div class="panel-body">
                    <Bill collection={this.props.collection} model={this.model.get('bills').add(this.valuteModel)}/>

                    <div class="row">
                        <div class="col-xs-12">
                            <div class="form-group">
                                <a class="btn btn-info" onClick={this.send.bind(this)}>Отправить</a>
                                <a class="btn btn-default" onClick={this.cancel.bind(this)}>Отмена</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}