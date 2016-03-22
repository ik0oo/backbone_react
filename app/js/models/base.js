//libs
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

export default class Base extends Backbone.Model {
    defaults () {
        return {
            //bill: {
            //    rub: 0,
            //    usd: 0,
            //    eur: 0
            //},
            //order: {
                rub: 1000,
                usd: 1000,
                eur: 1000
            //}
        }
    }

    //validate (attrs, options) {
    //    if (attrs.order.rub <= 0 || attrs.order.eur <= 0 || attrs.order.eur <= 0) return 'На счету ничего нет';
    //    if (attrs.order.rub < attrs.bill.rub || attrs.order.usd < attrs.bill.usd || attrs.order.eur < attrs.bill.eur) return 'Сумма превышает';
    //}
}

const base = new Base;

export default base;
