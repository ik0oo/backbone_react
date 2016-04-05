import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Profile from '../models/profile';

export default class Profiles extends Backbone.Collection {
    model = Profile;
}
