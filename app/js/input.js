import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

export default class Input extends React.Component {
	constructor () {
		super();
		this.state = {
			message: ''
		}
	}

	componentDidMount () {
		this.props.model.on('change', this.forceUpdate.bind(this, null))
	}

	componentWillUnmount () {
		this.props.model.off(null, null, this);
	}

	handleChange (newValue) {
		this.props.model.set({message: newValue});
	}

	render () {
		const valueLink = {
			value: this.props.model.get('message'),
			requestChange: this.handleChange.bind(this)
		};

		const validate = this.props.model.isValid();

		return (
			<div>
				<input type="number" valueLink={valueLink} />
				<b>{this.props.model.validationError}</b>
			</div>
		);
	}
}