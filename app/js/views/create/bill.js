//libs
import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
import Number from '../input/number';

export default class Bill extends React.Component {
    constructor () {
        super();

        this.collection = new Backbone.Collection;
    }

    componentDidMount () {
        const self = this;
        const collection = [];
        _.each(this.props.model.attributes, (attr, i) => {
            if (typeof attr !== 'object') {

                let model = new Backbone.Model().set({
                    attr: i,
                    value: attr
                });
                if (self.props.score && self.props.score[i]) model.set('_max', self.props.score[i]);

                collection.push(model);
            }
        });

        this.collection.add(collection);

        this.collection.on('change', model => {
            let parentModel = self.props.model;
            let attr = model.get('attr');
            let value = model.get('value');

            parentModel.set(attr, value);
        });

        this.forceUpdate();
    }

    componentWillUnmount () {
        this.collection.off(null, null, this);
    }

    render () {
        const items = _.map(this.collection.models, model => {
            return (
               <div class="col-xs-4" key={model.cid}>
                    <div class="form-group">
                        <Number
                            model={model}
                            min={0}
                            max={model.get('_max')}
                            />
                    </div>
                </div>
            );
        });

        return (
            <div class="row">
                {items}
            </div>
        );
    }
}