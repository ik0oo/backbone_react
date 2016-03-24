// libs
import $ from 'jquery';
import React from 'react';

export default class Text extends React.Component {
	constructor () {
		super();
		this.firstValid = true;
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

		this.firstValid = false;
		this.props.model.set(val);
	}

	render () {

		let valid = 'none';
		const valueLink = {
			value: this.props.model.get(this.props.property),
			requestChange: this.handelChange.bind(this)
		};

		if ($.trim(valueLink.value) === '' && !this.firstValid || !this.props.validate && $.trim(valueLink.value) === '') {
			valid = 'block';
		}

		return (
			<div>
				<label>{this.props.name}</label> <br/>
				<input class="form-control" type={this.props.type} valueLink={valueLink}/>
				<small class="help-block validMessage" data-field="username" style={{display: valid, color: 'red'}}>Поле не заполнено</small>
			</div>
		);
	}
}