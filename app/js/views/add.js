//libs
import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
import Text from './text';

export default class Create extends React.Component {

	add () {
		this.props.model.isValid() && this.props.model.trigger('save');
	}

	render () {
		return (
			<div class="col-xs-8">
				<div class="row">
					<div class="col-xs-12">
						<h2>Добавить профиль</h2>

						<Text name={'Имя'} model={this.props.model} property={'name'}/>
						<Text name={'Email'} model={this.props.model} property={'email'}/>

						<a class="btn btn-default" onClick={this.add.bind(this)}>Сохранить</a>
					</div>
				</div>
			</div>
		);
	}
}