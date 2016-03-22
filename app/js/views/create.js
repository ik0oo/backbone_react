//libs
import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
import Add from './add';
import Profile from '../models/profile';
import Bill from './bill';

export default class Create extends React.Component {
	constructor () {
		super();
		this.model = new Profile;
	}

	componentDidMount () {
		const self = this;

		this.model.on('save', () => {
			self.model.set('active', true);
			const newModel = self.props.collection.add(self.model.toJSON());
			self.model.clear();
			self.props.router.navigate('#profile/' + newModel.cid, {trigger: true, replace: true});
		});
	}

	componentWillUnmount () {
		this.model.off(null, null, this);
	}

	render () {
		return (

			<section class="panel">
				<header class="panel-heading">
					Добавить профиль
				</header>
				<div class="panel-body">
					<Add collection={this.props.collection} model={this.model}/>
					<Bill collection={this.props.collection} model={this.model}/>
				</div>
			</section>
		);
	}
}