//libs
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

export default class Base extends Backbone.Model {
    defaults () {
        return {
            rub: 1000,
            usd: 1000,
            eur: 1000,
            _base_rub: 1000,
            _base_usd: 1000,
            _base_eur: 1000
        }
    }

    //validate (attrs, options) {
    //    if (attrs.order.rub <= 0 || attrs.order.eur <= 0 || attrs.order.eur <= 0) return 'На счету ничего нет';
    //    if (attrs.order.rub < attrs.bill.rub || attrs.order.usd < attrs.bill.usd || attrs.order.eur < attrs.bill.eur) return 'Сумма превышает';
    //}
}

const base = new Base;
window.base = base;

export default base;
