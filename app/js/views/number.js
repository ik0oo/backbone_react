// libs
import $ from 'jquery';
import React from 'react';

export default class Text extends React.Component {
    constructor () {
        super();
    }

    componentDidMount () {
        this.props.model.on('change:' + this.props.property, this.forceUpdate.bind(this, null));
    }

    componentWillUnmount () {
        this.props.model.off(null, null, this);
    }

    handelChange (newValue) {
        const val = {};
        val[this.props.property] = newValue;

        this.props.model.set(val);

        let base = this.props.base;
        base.set(this.props.property, this.base - newValue);
    }

    render () {
        if (!this.base) this.base = this.props.base.get(this.props.property);

        const valueLink = {
            value: this.props.model.get(this.props.property),
            requestChange: this.handelChange.bind(this)
        };

        return (
            <input class="form-control" type="number" valueLink={valueLink} />
        );
    }
}