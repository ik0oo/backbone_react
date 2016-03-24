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
		this.state = {
			validate: true
		};
		this.checked = false;
		this.style = {color: 'inherit'};
	}

	add () {
		this.style = this.checked ? {color: 'inherit'} : {color: 'red'};

		if (!this.model.isValid() || !this.checked) {

			this.setState({validate: false});
			return false;
		}

		_.each(base.attributes, (attr, iterator, array) => {
			if (!~iterator.indexOf('_')) {
				array['_base_' + iterator] = attr;
			}
		});

		this.model.set('active', true);
		this.model.get('bills').add(this.valuteModel);
		const newModel = this.props.collection.add(this.model.toJSON());

		this.props.router.navigate('#profile/' + newModel.cid, {trigger: true, replace: true});
	}

	check (e) {
		let checked = this.checked ? false : true;

		this.checked = checked;
	}

	render () {
		return (
			<section class="panel">
				<header class="panel-heading">
					Добавить профиль
				</header>
				<div class="panel-body">
					<Add collection={this.props.collection} model={this.model} validate={this.state.validate}/>

					<div class="row">
						<div class="col-xs-7">
                            <div class="form-group">
                                <div class="checkbox">
                                    <label style={this.style}>
                                        <input type="checkbox" onChange={this.check.bind(this)}/> Я согласен с условиями *
                                    </label>
                                </div>
                            </div>
                        </div>
					</div>

					<Bill model={this.valuteModel}/>

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