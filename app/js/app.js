'use strict';

//libs
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//views
import Aside from './views/aside';
import Main from './views/main';
import Header from './views/header';

//collections
import profiles from './collections/profiles';

//router
import router from './router/router';

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
