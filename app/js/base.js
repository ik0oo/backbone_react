import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

export default class Base extends React.Component {
	componentDidMount () {
		this.props.model.on('change', this.forceUpdate.bind(this, null))
	}

	componentWillUnmount () {
		this.props.model.off(null, null, this);
	}


	render () {
		var base = this.props.model.get('base');
		if (this.props.model.isValid()) {
			base = this.props.model.get('base') - this.props.model.get('message');
		}

		return (
			<div>
				<b>{base}</b>
			</div>
		);
	}
}