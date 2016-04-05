import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

export default class ProfileView extends React.Component {
	render () {

		let className = 'aside__menu-element' + (this.props.active ? ' active' : '');

		return (
            <div class={className} onClick={this.props.onClick}>
                <i class="fa fa-user"></i>
				<span>{this.props.model.get('name')}</span>
            </div>
		);
	}
}