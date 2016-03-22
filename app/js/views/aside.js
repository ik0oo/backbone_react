//libs
import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
import Profile from './profile';

export default class Aside extends React.Component {
	componentWillMount () {
		const collection = this.props.collection;

		collection.on('changeActive', m => {
            _.each(collection.models, model => {
                model.set('active', false, {silent: true});
            });

            m ? m.set('active', true) : collection.trigger('change');
		});
	}

	componentDidMount () {
		this.props.collection.on('add change remove', this.forceUpdate.bind(this, null));
	}

	componentWillUnMount () {
		this.props.collection.off(null, null, this);
	}

	render () {

		const profiles = [];
		_.each(this.props.collection.models, model => {
			profiles.push(<Profile model={model} key= {model.cid} />);
		});

		return (

            <aside class="<aside left-side sidebar-offcanvas">
                <section class="sidebar">
                    <ul class="sidebar-menu">
						{profiles}
                    </ul>

                    <a href="#add" class="btn btn-primary btn-addon btn-sm">
                        <i class="fa fa-plus"></i>
                        Добавить
                    </a>
                </section>
            </aside>
		);
	}
}