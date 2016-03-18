import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

export default class Bill extends Backbone.Model {
	defaults () {
		return {
			value: 1000
		}
	}
}