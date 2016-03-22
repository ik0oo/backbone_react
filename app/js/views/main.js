//libs
import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
//import Modal from 'bootstrap/js/modal';

//files
import Create from './create';
import Edit from './edit';
import Nav from './nav';

export default class Main extends React.Component {
	constructor () {
		super();
	}

	componentDidMount () {
		this.props.router.on('route', this.forceUpdate.bind(this, null));
	}

	componentWillUnmount () {
		this.props.router.off(null, null, this);
	}

	render () {

		if (this.props.router.current == 'edit') {
			return (
				<aside class="right-side">
					<section class="content">
						<div class="row">
							<div class="col-xs-6">
								<Edit collection={this.props.collection} model={this.props.collection.get(this.props.router.page)} router={this.props.router}/>
							</div>
						</div>
					</section>
				</aside>
			);
		}

		if (this.props.router.current == 'id') {
			const model = this.props.collection.get(this.props.router.page);

			return (
				<aside class="right-side">
					<section class="content">
						<div class="row">
							<Nav collection={this.props.collection} name={model.get('name')} email={model.get('email')} page={this.props.router.page} router={this.props.router}/>
						</div>
					</section>
				</aside>
			);
		}

		if (this.props.router.current == 'add') {
			return (
				<aside class="right-side">
					<section class="content">
						<div class="row">
							<div class="col-xs-6">
								<Create collection={this.props.collection} router={this.props.router}/>
							</div>
						</div>
					</section>
				</aside>
			);
		}

		return (
			<aside class="right-side">
				<section class="content">

				</section>
			</aside>
		);
	}
}