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
                            <tr key={model.cid + i}>
                                <td>{attr}</td>
                                <td>
                                    <span onClick={this.props.onRemoveBill.bind(this, model, i)}>x</span>
                                </td>
                            </tr>
                        );
                    }
                });
            });
        }

        return (
            <div>
                <h2>{model.get('name')}</h2>
                <p>{model.get('email')}</p>

                <table class="table table-condensed">
                    <tbody>
                        <tr>rub</tr>
                        {rows.rub}
                    </tbody>
                </table>

                <table class="table table-condensed">
                    <tbody>
                    <tr>usd</tr>
                    {rows.usd}
                    </tbody>
                </table>

                <table class="table table-condensed">
                    <tbody>
                    <tr>eur</tr>
                    {rows.eur}
                    </tbody>
                </table>

                 <button class="btn btn-info" onClick={this.props.onEditPforile.bind(this, this.props.model)}>Редактировать</button>
                 <button class="btn btn-info" onClick={this.props.onSendBill.bind(this, this.props.model)}>Отправить</button>
                 <button class="btn btn-default" onClick={this.showConfirm.bind(this)}>Удалить</button>

                <div class={'modal fade ' + this.state.show} style={{'display': this.state.display}} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body">
                                <h3>Вы уверены?</h3>
                            </div>
                            <div class="modal-footer">
                                <button data-dismiss="modal" class="btn btn-default" type="button" onClick={this.onCancel.bind(this)}>Отмена</button>
                                <button class="btn btn-danger" type="button" onClick={this.props.onDelete.bind(this, this.props.model)}>Удалить</button>
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
