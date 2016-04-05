// libs
import React from 'react';
import Backbone from 'backbone';

export default class Text extends React.Component {
    constructor () {
        super();

        this.valid = 'none';
    }

    componentDidMount () {
        this.props.model.on('change:value', this.forceUpdate.bind(this, null));
    }

    componentWillUnmount () {
        this.props.model.off(null, null, this);
    }

    handelChange (newValue) {
        let max = this.props.max;
        let min = this.props.min;

        if (newValue <= min || newValue > max) {
            this.valid = 'block';
        } else {
            this.valid = 'none';
        }

        this.props.model.set('value', newValue);
    }

    render () {
        const valueLink = {
            value: this.props.model.get('value'),
            requestChange: this.handelChange.bind(this)
        };

        return (
            <div>
                <div class="input-group m-b-10">
                    <span class="input-group-addon">
                        <i class={'fa fa-' + this.props.model.get('attr')}></i>
                    </span>
                    <input class="form-control" type="number" valueLink={valueLink} min={this.props.min}/>
                </div>
                <small class="help-block validMessage" data-field="username" style={{display: this.valid, color: 'red'}}>Указано не верное занчение</small>
            </div>
        );
    }
}