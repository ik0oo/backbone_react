import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

export default class Profile extends React.Component {
	render () {

		const active = this.props.model.get('active') ? ' active' : '';

		return (
			<div class="col-xs-12">
				<a href={'#' + this.props.model.cid} class={'profile' + active}>{this.props.model.get('name')}</a>
				<span>{this.props.model.get('email')}</span>
			</div>
		);
	}
}