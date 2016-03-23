//libs
import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
import Add from './add';
import Profile from '../models/profile';
import Valute from './valute';
import base from '../models/base';

export default class Create extends React.Component {
    constructor () {
        super();

        this.state = {
            show: '',
            display: 'none'
        };
    }

    open () {
        this.setState(
            {show: 'in', display: 'block'}
        );
    }

    close () {
        this.setState(
            {show: '', display: 'none'}
        );
    }

    remove () {
        _.each(this.props.collection.models, model => {
            if (model.get('bills').length) {
                _.each(model.get('bills').models, m => {
                    if (m) {
                        _.each(m.attributes, (attr, iterator) => {
                            let baseVal = base.get('_base_' + iterator);
                            let newBaseVal = Number(baseVal) + Number(attr);

                            base.set('_base_' + iterator, newBaseVal);
                            base.set(iterator, newBaseVal);
                        });
                    }
                });
            }
        });

        this.props.collection.remove(this.props.page);
        this.close();
        this.props.router.navigate('#profile/c2', {trigger: true, replace: true});
    }

    render () {
        return (
            <div class="col-xs-6">
                <h2>{this.props.name}</h2>
                <p>{this.props.email}</p>


                <div className="row">
                    <Valute collection={this.props.collection.get(this.props.page).get('bills')} _key={'rub'} />
                    <Valute collection={this.props.collection.get(this.props.page).get('bills')} _key={'usd'} />
                    <Valute collection={this.props.collection.get(this.props.page).get('bills')} _key={'eur'} />
                </div>


                <a href={'#profile/' + this.props.page + '/edit'} class="btn btn-info" >Редактировать</a>
                <a href={'#profile/' + this.props.page + '/send'} class="btn btn-info" >Отправить</a>
                <a  class="btn btn-default" onClick={this.open.bind(this)}>Удалить</a>


                <div class={'modal fade ' + this.state.show} style={{'display': this.state.display}} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body">
                                <h3>Вы уверены?</h3>
                            </div>
                            <div class="modal-footer">
                                <button data-dismiss="modal" class="btn btn-default" type="button" onClick={this.close.bind(this)}>Отмена</button>
                                <button class="btn btn-danger" type="button" onClick={this.remove.bind(this)}>Удалить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}