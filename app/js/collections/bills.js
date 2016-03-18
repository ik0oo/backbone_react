import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Bill from '../models/bill';

export default class Bills extends Backbone.Collection {
	model: Bill
}