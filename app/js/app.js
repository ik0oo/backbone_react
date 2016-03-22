'use strict';

//libs
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
import Aside from './views/aside';
import Main from './views/main';
import Profile from './models/profile'
import Header from './views/header';


class Profiles extends Backbone.Collection {
	model = Profile;
}

let test = ['john', 'larry', 'jane', 'genry'];
test = _.map(test, item => {
	return new Profile().set({'name': item});
});

const profiles = new Profiles(test);

class Router extends Backbone.Router {
	routes () {
		return {
			'profile/c:page': 'profile',
			'profile/c:page/edit': 'edit',
			'add': 'add'
		}
	}

	profile (page) {
		this.current = 'id';
		this.page = 'c' + page;

		profiles.trigger('changeActive', profiles.get(this.page));
	}

	edit (page) {
		this.current = 'edit';
		this.page = 'c' + page;

		profiles.trigger('changeActive', profiles.get(this.page));
	}

	add () {
		this.current = 'add';

		profiles.trigger('changeActive', null);
	}
}

const router = new Router;

ReactDOM.render(
	<div class="layout">
		<Header />
        <div class="container-fluid">
            <div class="row">

                <Aside collection={profiles} />
                <Main collection={profiles} router={router}/>
            </div>
        </div>
	</div>

, document.getElementById('app')
);


Backbone.history.start();
// <Input model={model}/>
// <Base model={model}/>