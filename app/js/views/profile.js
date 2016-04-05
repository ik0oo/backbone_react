import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

export default class ProfileView extends React.Component {
	render () {

		return (
            <li class={this.props.active ? 'active' : ''}>
                <a href={'#profile/' + this.props.model.cid}>
                    <i class="fa fa-user"></i> <span>{this.props.model.get('name')}</span>
                </a>
            </li>
		);
	}
}