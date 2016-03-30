//libs
import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
import Add from './add';
import Profile from '../models/profile';
import Valute from './valutes';

export default class Nav extends React.Component {
    constructor () {
        super();

        this.state = {
            show: '',
            display: 'none'
        };
    }

    //open () {
    //    this.setState(
    //        {show: 'in', display: 'block'}
    //    );
    //}
    //
    //close () {
    //    this.setState(
    //        {show: '', display: 'none'}
    //    );
    //}
    //
    //remove () {
    //    const collection = this.props.collection;
    //    let bills = collection.get(this.props.page).get('bills');
    //
    //    if (bills.length) {
    //        // прибавляем в базовую модель хранящиеся в текущей модели суммы
    //        _.each(bills.models, model => {
    //            if (model) {
    //                _.each(model.attributes, (attr, iterator) => {
    //                    let v = Number(base.get('_base_' + iterator)) + Number(attr);
    //
    //                    base.set('_base_' + iterator, v, {silent: true});
    //                    base.set(iterator, v);
    //                });
    //            }
    //        });
    //    }
    //
    //    this.props.collection.remove(this.props.page, {silent: true});
    //    this.props.router.navigate('/', {trigger: true, replace: true});
    //}

    render () {
        const model = this.props.model;
        console.log(model);

        return (
            <div>
                <h2>{model.get('name')}</h2>
                <p>{model.get('email')}</p>

                 <button class="btn btn-info" >Редактировать</button>
                 <button class="btn btn-info" >Отправить</button>
                 <button class="btn btn-default" >Удалить</button>



                <div class={'modal fade ' + this.state.show} style={{'display': this.state.display}} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body">
                                <h3>Вы уверены?</h3>
                            </div>
                            <div class="modal-footer">
                                <button data-dismiss="modal" class="btn btn-default" type="button" onClick={this.props.onCancel()}>Отмена</button>
                                <button class="btn btn-danger" type="button" onClick={this.props.onDelete()}>Удалить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//<div className="row">
//    <Valute collection={model.get('bills')} _key={'rub'} />
//    <Valute collection={model.get('bills')} _key={'usd'} />
//    <Valute collection={model.get('bills')} _key={'eur'} />
//</div>

                            //<a href={'#profile/' + this.props.id + '/edit'} class="btn btn-info" >Редактировать</a>
                            //<a href={'#profile/' + this.props.id + '/send'} class="btn btn-info" >Отправить</a>
                            //<a  class="btn btn-default" onClick={this.open.bind(this)}>Удалить</a>
