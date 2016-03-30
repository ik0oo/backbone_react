//libs
import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
import Text from './text';
import Bill from './bill';

export default class Add extends Bill {
    componentDidMount () {
        const self = this;
        Bill.prototype.componentDidMount.call(this);

        this.props.model.on('validate', () => {
            self.collection.trigger('validate');
        });
    }

    componentWillUnmount () {
        Bill.prototype.componentWillUnmount.call(this);

        this.props.model.off(null, null, this);
    }

    render () {
        const items = _.map(this.collection.models, model => {
            return (
                <div className="row" key={model.cid}>
                    <div className="col-xs-7">
                        <div className="form-group">
                            <Text model={model}/>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="row">
                {items}
            </div>
        );
    }
}
