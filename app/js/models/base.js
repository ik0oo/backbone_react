//libs
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

export default class Base extends Backbone.Model {
    defaults () {
        return {
            rub: 0,
            usd: 0,
            eur: 0
        };
    }

    validate () {}
}

////files
//import profiles from '../collections/profiles';
//
//let data = {
//    rub: Number(),
//    usd: Number(),
//    eur: Number()
//};
//
//// получаем сколько денег висит в моделях
//_.each(profiles.models, model => {
//    let bills = model.get('bills');
//    if (bills.length) {
//        _.each(bills.models, m => {
//            _.each(m.attributes, (attr, iterator) => {
//                data[iterator] += Number(attr);
//            });
//        });
//    }
//});
//
//export default class Base extends Backbone.Model {
//    defaults () {
//        return {
//            rub: 1000,
//            usd: 1000,
//            eur: 1000,
//            _base_rub: 1000,
//            _base_usd: 1000,
//            _base_eur: 1000
//        }
//    }
//
//    constructor (options) {
//        super();
//        const self = this;
//
//        // вычитаем из дефолтных значених сохраненные суммы валют
//        _.each(options, (attr, iterator) => {
//            if (attr > 0) {
//                let value = self.attributes[iterator] - attr;
//
//                self.attributes[iterator] = value;
//                self.attributes['_base_' + iterator] = value;
//            }
//        });
//    }
//}
//
//const base = new Base(data);
//
//export default base;
