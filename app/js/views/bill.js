//libs
import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
import Number from './number';
import base from '../models/base';

class Item extends React.Component {
    render () {

        !this.props.model.get(this.props.type) && this.props.model.set(this.props.type, 0);

        return (
            <div class="form-group">
                <div class="col-xs-4">
                    <div class="input-group m-b-10">
                        <span class="input-group-addon">@</span>
                        <Number property={this.props.type} model={this.props.model} base={this.props.base}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default class Bill extends React.Component {
    constructor () {
        super();

        this.model = new Backbone.Model;
    }

    render () {
        return (
            <form class="form-vertical" role="form">

                <Item model={this.model} type={'rub'} base={base}/>
                <Item model={this.model} type={'usd'} base={base}/>
                <Item model={this.model} type={'eur'} base={base}/>

                <div class="form-group">
                    <div class="col-xs-6">
                        <button type="submit" class="btn btn-info" >Отправить</button>
                    </div>
                </div>
            </form>
        );
    }
}