//libs
import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
import Add from './add';
import Bill from './bill';
import BillModel from '../models/bill';
import ProfileModel from '../models/profile';

export default class Create extends React.Component {
	constructor () {
		super();
		this.state = {
			checked: false,
			style: 'inherit'
		};

		this.profileModel = new ProfileModel;
		this.billModel = new BillModel;
	}

	componentDidMount () {
		const self = this;

		this.billModel.on('change', model => {
			self.props.onUpdateBill(model);
		});

		this.profileModel.on('change', model => {
			self.props.onUpdateProfile(model);
		});
	}

	componentWillUnmount () {
		this.billModel.off(null, null, this);
		this.profileModel.off(null, null, this);
	}

	check (e) {
		if (this.state.style === 'red' && !this.state.checked) {
			this.setState({
				checked: !this.state.checked,
				style: 'inherit'
			});
		} else {
			this.setState({checked: !this.state.checked});
		}

	}

	onSave () {
		this.billModel.trigger('validate');
		this.profileModel.trigger('validate');

		if (!this.state.checked) this.setState({style: 'red'});

		this.props.onSave(this.state.checked);
	}

	render () {
		return (
			<section class="panel">
				<header class="panel-heading">
					Добавить профиль
				</header>
				<div class="panel-body">

					<Add model={this.profileModel} />

					<div class="row">
						<div class="col-xs-7">
                            <div class="form-group">
                                <div class="checkbox">
                                    <label style={{color: this.state.style}}>
                                        <input type="checkbox" onChange={this.check.bind(this)}/> Я согласен с условиями *
                                    </label>
                                </div>
                            </div>
                        </div>
					</div>

					<Bill model={this.billModel} />

					<div class="row">
						<div class="col-xs-12">
                            <div class="form-group">
                                <button class="btn btn-info" onClick={this.onSave.bind(this)}>Сохранить</button>
                            </div>
                        </div>
					</div>
				</div>
			</section>
		);
	}
}