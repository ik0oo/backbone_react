//libs
import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
import Text from './text';

export default class Create extends React.Component {
	render () {
		return (
            <div class="row">
                <div class="col-xs-7">
                    <div class="form-group">
                        <Text name={'Имя'} model={this.props.model} property={'name'} type={'text'}/>
                    </div>
                </div>


                <div class="col-xs-7">
                    <div class="form-group">
                        <Text name={'Email'} model={this.props.model} property={'email'} type={'email'}/>
                    </div>
                </div>

                <div class="col-xs-7">
                    <div class="form-group">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" /> Я согласен с условиями
                            </label>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}