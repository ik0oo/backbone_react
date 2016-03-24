//libs
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

export default class Profile extends Backbone.Model {
	defaults () {
		return {
			photo: '#',
			name: '',
			email: '',
			active: false,
			bills: new Backbone.Collection
		}
	}

	validate (attrs, options) {
		if ($.trim(attrs.name) === '') return 'Поле не заполнено';
		if ($.trim(attrs.email) === '') return 'Поле не заполнено';
	}
}