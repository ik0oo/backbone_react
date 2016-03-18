//libs
import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
import Create from './create';

export default class Main extends React.Component {

	render () {
		return (
			<div class="col-xs-8">
				<div class="row">
					<div class="col-xs-12">
						<header>rub eur usd</header>
					</div>

					<Create collection={this.props.collection}/>

				</div>
			</div>
		);
	}
}