//libs
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
//import profiles from '../collections/profiles';

export default class Router extends Backbone.Router {
    routes () {
        return {
            '': 'defaultRoute',
            'profile/c:page': 'profile',
            'profile/c:page/edit': 'edit',
            'profile/c:page/send': 'send',
            'add': 'add'
        }
    }

    /*** functions
     */

    //emptyRoute (id) {
    //    return profiles.get(id);
    //}
    //
    //defaultBehaviour (page) {
    //    this.page = 'c' + page;
    //
    //    if (!this.emptyRoute(this.page)) return this.defaultRoute();
    //    profiles.trigger('changeActive', profiles.get(this.page));
    //}

    /*** routes
     */

    defaultRoute (page) {
        this.current = 'default';
        //profiles.trigger('changeActive', null);
    }

    profile (page) {
        this.current = 'id';
        //this.defaultBehaviour(page);
    }

    edit (page) {
        this.current = 'edit';
        //this.defaultBehaviour(page);
    }

    send (page) {
        this.current = 'send';
        //this.defaultBehaviour(page)
    }

    add () {
        this.current = 'add';
        //profiles.trigger('changeActive', null);
    }
}

//const router = new Router;
//
//export default router;
