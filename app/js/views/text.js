// libs
import $ from 'jquery';
import React from 'react';

export default class Text extends React.Component {
	constructor () {
		super();
		this.firstValid = true;

		this.valid = 'none';
	}

	componentDidMount () {
		const self = this;

		this.props.model.on('change:value', this.forceUpdate.bind(this, null));

		this.props.model.collection.on('validate', () => {
			self.firstValid = false;
			if ($.trim(this.props.model.get('value')) === '') {
				this.valid = 'block';
				self.forceUpdate();
			}
		});
	}

	componentWillUnmount () {
		this.props.model.off(null, null, this);
	}

	handelChange (newValue) {
		if ($.trim(newValue) === '' && !this.firstValid) {
			this.valid = 'block';
		} else {
			this.valid = 'none';
		}

		this.firstValid = false;

		this.props.model.set('value', newValue);
	}

	render () {
		let valid = 'none';
		const valueLink = {
			value: this.props.model.get('value'),
			requestChange: this.handelChange.bind(this)
		};

		//if ($.trim(valueLink.value) === '' && !this.firstValid || !this.props.validate && $.trim(valueLink.value) === '') {
		//	valid = 'block';
		//}

		return (
			<div>
				<label>{this.props.model.get('attr')}</label> <br/>
				<input class="form-control" type="text" valueLink={valueLink}/>
				<small class="help-block validMessage" data-field="username" style={{display: this.valid, color: 'red'}}>Поле не заполнено</small>
			</div>
		);
	}
}