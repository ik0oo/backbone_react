//libs
import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
import Add from './create/add';
import Profile from '../models/profile';

export default class Nav extends React.Component {
    constructor () {
        super();

        this.state = {
            show: '',
            display: 'none'
        };
    }

    showConfirm () {
        this.setState({show: 'in', display: 'block'});
    }

    onCancel () {
        this.setState({show: '', display: 'none'});
    }

    render () {
        console.log(this);
        const model = this.props.model;
        const rows = {
            rub: [],
            usd: [],
            eur: []
        };

        if (this.props.bills && this.props.bills.length) {
            _.each(this.props.bills.models, model => {
                _.each(model.attributes, (attr, i) => {
                    if (attr > 0) {
                        rows[i].push(
                            <div class="table__item" key={model.cid + i}>
                                <div class="table__item-sum">{attr}</div>
                                <div class="table__item-close" onClick={this.props.onRemoveBill.bind(this, model, i)}>
                                    <span>x</span>
                                </div>
                            </div>
                        );
                    }
                });
            });
        }

        return (
            <div>
                <h2>{model.get('name')}</h2>
                <p class="grey">{model.get('email')}</p>

                <div className="table" style={{display: rows.rub.length ? 'block' : 'none'}}>
                    <div className="table__header">rub</div>
                    {rows.rub}
                </div>

                <div className="table" style={{display: rows.usd.length ? 'block' : 'none'}}>
                    <div className="table__header">usd</div>
                    {rows.usd}
                </div>

                <div className="table" style={{display: rows.eur.length ? 'block' : 'none'}}>
                    <div className="table__header">eur</div>
                    {rows.eur}
                </div>


                <div className="btn-block">
                    <button class="btn btn--blue" onClick={this.props.onEditPforile.bind(this, this.props.model)}>Редактировать</button>
                    <button class="btn btn--blue" onClick={this.props.onSendBill.bind(this, this.props.model)}>Отправить</button>
                    <button class="btn btn--red" onClick={this.showConfirm.bind(this)}>Удалить</button>
                </div>


                <div class={'modal fade ' + this.state.show} style={{'display': this.state.display}}>
                    <div class="modal__dialog">
                        <h2>Вы уверены?</h2>
                        <div class="btn-block">
                            <button class="btn" type="button" onClick={this.onCancel.bind(this)}>Отмена</button>
                            <button class="btn btn--red" onClick={this.props.onDelete.bind(this, this.props.model)}>Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
