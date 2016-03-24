//libs
import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
import base from '../models/base';

class Item extends React.Component {
    remove () {
        let baseVal = base.get('_base_' + this.props._key);
        let newBaseVal = Number(baseVal) + Number(this.props.model.get(this.props._key));

        base.set('_base_' + this.props._key, newBaseVal, {silent: true});
        base.set(this.props._key, newBaseVal);
        this.props.model.set(this.props._key, 0);
    }

    render () {
        return (
            <tr>
                <td>{this.props.value}</td>
                <td>
                    <span onClick={this.remove.bind(this)} style={{cursor: 'pointer'}}>x</span>
                </td>
            </tr>
        );
    }
}

export default class Valute extends React.Component {
    componentDidMount () {
        this.props.collection.on('change:' + this.props._key, this.forceUpdate.bind(this, null));
    }

    componentWillUnmount () {
        this.props.collection.off(null, null, this);
    }

    render () {
        const items = [];
        _.each(this.props.collection.models, (model) => {
            if (model.get(this.props._key) > 0) {
                items.push(<Item value={model.get(this.props._key)} model={model} _key={this.props._key} key={model.cid + this.props._key}/>)
            }
        });

        if (items.length) {
            return (
                <div class="col-xs-3">
                    <table class="table table-condensed">
                        <tbody>
                        <tr>
                            <td><h4>{this.props._key}</h4></td>
                        </tr>
                        {items}
                        </tbody>
                    </table>
                </div>
            );
        }

        return false;

    }
}