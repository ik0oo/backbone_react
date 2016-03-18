import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

export default class Model extends Backbone.Model {
	constructor (options) {
		super();
	}

	defaults () {
		return {
			'message': 0,
			'base': 1000
		}
	}

	validate (attrs, options) {
		if (attrs.message > attrs.base) return 'Сумма превышает';
		if (attrs.message < 0) return 'Самма меньше';
	}
}
