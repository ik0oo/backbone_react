//libs
import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
import Add from './add';
import Profile from '../models/profile';

export default class Create extends React.Component {
    constructor () {
        super();
        this.model = new Profile;
    }

    componentDidMount () {
        const self = this;

        this.model.on('save', () => {
            const model = self.props.collection.get(this.props.model.cid);
            //self.model.set('active', true);
            //self.props.collection.trigger('changeActive', self.model);

            model.set(self.model.toJSON());
            self.props.router.navigate('#profile/' + model.cid, {trigger: true, replace: true});
        });
    }

    componentWillUnmount () {
        this.model.off(null, null, this);
    }

    render () {
        this.model.set(this.props.model.toJSON(), {silent: true});

        return (
            <section class="panel">
                <header class="panel-heading">
                    Редактировать профиль
                </header>
                <div class="panel-body">
                    <Add collection={this.props.collection} model={this.model}/>
                </div>
            </section>
        );
    }
}