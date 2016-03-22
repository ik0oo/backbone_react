//libs
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
import Bills from '../collections/bills';

//const valute = [
//	{name: 'rub', value: 0},
//	{name: 'usd', value: 0},
//	{name: 'eur', value: 0}
//];

export default class Profile extends Backbone.Model {
	defaults () {
		return {
			photo: '#',
			name: '',
			email: '',
			active: false,
			bills: new Bills
		}
	}

	validate (attrs, options) {
		if ($.trim(attrs.name) === '') return 'Поле не заполнено';
		if ($.trim(attrs.email) === '') return 'Поле не заполнено';
	}
}