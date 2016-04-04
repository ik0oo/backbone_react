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

		if (this.props.onUpdateBill) {
			this.billModel.on('change', model => {
				self.props.onUpdateBill(model);
			});
		}

		if (this.props.onUpdateProfile) {
			this.profileModel.on('change:name change:email', model => {
				self.props.onUpdateProfile(model);
			});
		}
	}

	componentWillUnmount () {
		if (this.props.onUpdateBill) {
			this.billModel.off(null, null, this);
		}

		if (this.props.onUpdateProfile) {
			this.profileModel.off(null, null, this);
		}
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
		if (this.props.type !== 'edit') {
			this.billModel.trigger('validate');
		}
		if (this.props.type !== 'send') {
			this.profileModel.trigger('validate');
		}

		if (!this.props.type) {
			if (!this.state.checked) this.setState({style: 'red'});
			this.props.onSave(this.state.checked);
		}

		if (this.props.type && this.props.type === 'edit') {
			this.props.onSave(this.profileModel);
		}

		if (this.props.type && this.props.type === 'send') {
			this.props.onSave(this.billModel);
		}
	}

	render () {
		if (this.props.type === 'edit') {
			this.profileModel.set(this.props.model);

			return (
				<section class="panel">
					<header class="panel-heading">
						{this.props.header}
					</header>
					<div class="panel-body">
						<Add model={this.profileModel} />

						<div class="row">
							<div class="col-xs-12">
								<div class="form-group">
									<button class="btn btn-info" onClick={this.onSave.bind(this)}>Сохранить</button>
									<button class="btn btn-info" onClick={this.props.onCancel}>Отмена</button>
								</div>
							</div>
						</div>
					</div>
				</section>
			);
		}

		if (this.props.type === 'send') {
			return (
                <section class="panel">
                    <header class="panel-heading">
                        {this.props.header}
                    </header>
                    <div class="panel-body">

                        <Bill model={this.billModel} score={this.props.score}/>

                        <div class="row">
                            <div class="col-xs-12">
                                <div class="form-group">
                                    <button class="btn btn-info" onClick={this.onSave.bind(this)}>Сохранить</button>
									<button class="btn btn-info" onClick={this.props.onCancel}>Отмена</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            );
		}

		return (
			<section class="panel">
				<header class="panel-heading">
					{this.props.header}
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

					<Bill model={this.billModel} score={this.props.score}/>

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