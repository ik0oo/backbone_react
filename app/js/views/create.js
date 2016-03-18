//libs
import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
import Add from './add';
import Profile from '../models/profile';

export default class Create extends React.Component {
	constructor () {
		super();
		this.model = new Profile;
	}

	componentDidMount () {
		const self = this;

		this.model.on('save', () => {
			self.props.collection.add(self.model.toJSON());
			self.model.clear();
			self.forceUpdate.bind(self, null)
		});
	}

	componentWillUnmount () {
		this.model.off(null, null, this);
	}

	render () {
		return (
			<div class="col-xs-12">
				<Add collection={this.props.collection} model={this.model}/>
			</div>
		);
	}
}