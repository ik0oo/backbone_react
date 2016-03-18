// libs
import $ from 'jquery';
import React from 'react';

export default class Text extends React.Component {
	constructor () {
		super();
		this.firstValidate = false;
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
	}

	validate (value) {
		if (!this.firstValidate) {
			this.firstValidate = true;
			return '';
		}

		return $.trim(value) === '' ? 'Поле не заполнено' : '';
	}

	render () {

		const valueLink = {
			value: this.props.model.get(this.props.property),
			requestChange: this.handelChange.bind(this)
		}

		const validate = this.validate(this.props.model.get(this.props.property));

		return (
			<div>
				<label>{this.props.name}</label> <br/>
				<input type="text" valueLink={valueLink}/>
				<span>{validate}</span>
			</div>
		);
	}
}