import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Profile from '../models/profile';

export default class Profiles extends Backbone.Collection {
    model = Profile;

    constructor (options) {
        super(options);
        const self = this;

        //if (!localStorage) return false;
        //
        //this.on('change add remove', (e) => {
        //    let c = JSON.stringify(self.toJSON());
        //    localStorage.setItem('Profiles', c);
        //});
    }
}

//function storageData () {
//    if (!localStorage) return [];
//
//    let data = JSON.parse(localStorage.getItem('Profiles'));
//    return data = _.map(data, item => {
//        if (item.bills) {
//            item.bills = new Backbone.Collection(item.bills);
//        }
//
//        return new Profile().set(item);
//    });
//}

//const data = storageData();
//const profiles = new Profiles(data);
//
//export default profiles