//libs
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

export default class BillModel extends Backbone.Model {
    defaults () {
        return {
            rub: 0,
            usd: 0,
            eur: 0
        }
    }
}