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
// import Input from './input';
// import Base from './base';
// import Model from './model';
import Profile from './models/profile'

class Profiles extends Backbone.Collection {
	model: Profile
}

let test = ['john', 'larry', 'jane', 'genry'];
test = _.map(test, item => {
	return new Profile().set({'name': item});
})

const profiles = new Profiles(test);



ReactDOM.render(
	<div class="container-fluid">
		<div class="row">
			<Aside collection={profiles} />
			<Main collection={profiles} />
		</div>
	</div>
, document.getElementById('app')
);


// <Input model={model}/>
// <Base model={model}/>