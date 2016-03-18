//libs
import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
import Profile from './profile';

export default class Aside extends React.Component {
	componentDidMount () {
		this.props.collection.on('add', this.forceUpdate.bind(this, null));
	}

	componentWillUnMount () {
		this.props.collection.off(null, null, this);
	}

	render () {

		const profiles = [];
		_.each(this.props.collection.models, model => {
			profiles.push(<Profile model={model} key= {model.cid} />);
		});

		return (
			<div class="col-xs-4">
				<div class="row">
					<div class="col-xs-12">
						<h1>Пользователи</h1>
					</div>
					{profiles}
				</div>
			</div>
		);
	}
}