import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

export default class ProfileView extends React.Component {
	render () {

		const active = this.props.model.get('active') ? ' active' : '';

		return (
            <li class={active}>
                <a href={'#profile/' + this.props.model.cid}>
                    <i class="fa fa-user"></i> <span>{this.props.model.get('name')}</span>
                </a>
            </li>
		);
	}
}