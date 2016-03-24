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
            <div class="col-xs-4">
                <div class="form-group">
                    <Number
                        model={this.props.model}
                        property={this.props.type}
                        base={this.props.base}/>
                </div>
            </div>
        );
    }
}

export default class Bill extends React.Component {
    render () {
        return (
            <div class="row">
                <Item model={this.props.model} type={'rub'} base={base}/>
                <Item model={this.props.model} type={'usd'} base={base}/>
                <Item model={this.props.model} type={'eur'} base={base}/>
            </div>
        );
    }
}