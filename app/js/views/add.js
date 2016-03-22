//libs
import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
import Text from './text';

export default class Create extends React.Component {

	add (e) {
		this.props.model.isValid() && this.props.model.trigger('save');
        e.preventDefault();
	}

	render () {
		return (
            <form class="form-horizontal" role="form">
                <div class="form-group">
                    <div class="col-xs-6">
						<Text name={'Имя'} model={this.props.model} property={'name'} type={'text'}/>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-xs-6">
                        <Text name={'Email'} model={this.props.model} property={'email'} type={'email'}/>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-xs-6">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" /> Я согласен с условиями
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-xs-6">
                        <button type="submit" class="btn btn-info" onClick={this.add.bind(this)}>Сохранить</button>
                    </div>
                </div>
            </form>
		);
	}
}