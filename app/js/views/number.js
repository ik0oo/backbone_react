// libs
import $ from 'jquery';
import React from 'react';

export default class Text extends React.Component {
    constructor () {
        super();
        this.state = {
            valid: 'none',
            value: 0
        };
    }

    handelChange (newValue) {
        const val = {};
        let base = this.props.base;
        let base_const = base.get('_base_' + this.props.property);
        let valid = 'none';

        if (newValue < 0 || newValue > base.get('_base_' + this.props.property)) {
            valid = 'block';
            val[this.props.property] = 0;

            base.set(this.props.property, base_const);
        } else {
            val[this.props.property] = newValue;

            base.set(this.props.property, base_const - newValue);
        }

        this.props.model.set(val, {silent: true});

        this.setState({
            value: newValue,
            valid: valid
        });
    }

    render () {
        const valueLink = {
            value: this.state.value,
            requestChange: this.handelChange.bind(this)
        };

        return (
            <div>
                <div class="input-group m-b-10">
                    <span class="input-group-addon">@</span>
                    <input class="form-control" type="number" valueLink={valueLink} min="0"/>
                </div>
                <small class="help-block validMessage" data-field="username" style={{display: this.state.valid, color: 'red'}}>Указано не верное занчение</small>
            </div>
        );
    }
}