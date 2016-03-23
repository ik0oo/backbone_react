//libs
import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
import Add from './add';
import Profile from '../models/profile';
import Bill from './bill';
import base from '../models/base';

export default class Create extends React.Component {
	constructor () {
		super();
		this.model = new Profile;
		this.valuteModel = new Backbone.Model;
	}

	add () {
		const self = this;

		_.each(base.attributes, (attr, iterator, array) => {
			if (!~iterator.indexOf('_')) {
				array['_base_' + iterator] = attr;
			}
		});

		self.model.set('active', true);
		const newModel = self.props.collection.add(self.model.toJSON());

		self.model.clear();
		self.props.router.navigate('#profile/' + newModel.cid, {trigger: true, replace: true});
	}

	render () {
		return (

			<section class="panel">
				<header class="panel-heading">
					Добавить профиль
				</header>
				<div class="panel-body">
					<Add collection={this.props.collection} model={this.model}/>
					<Bill collection={this.props.collection} model={this.model.get('bills').add(this.valuteModel)}/>


					<div class="row">
						<div class="col-xs-12">
                            <div class="form-group">
                                <button type="submit" class="btn btn-info" onClick={this.add.bind(this)}>Сохранить</button>
                            </div>
                        </div>
					</div>
				</div>
			</section>
		);
	}
}