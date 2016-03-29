//libs
import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

//files
//import Create from './create';
//import Edit from './edit';
//import Send from './send';
//import Nav from './nav';
//import base from '../models/base';

export default class RouterView extends React.Component {
    render () {

        console.log(this.props.view);

        return false;
        //if (this.props.view == 'edit') {
        //    return (
        //        <aside class="right-side">
        //            <section class="content">
        //                <div class="row">
        //                    <div class="col-xs-6">
        //                        <Edit collection={this.props.collection} model={model} router={this.props.router}/>
        //                    </div>
        //                </div>
        //            </section>
        //        </aside>
        //    );
        //}
        //
        //if (this.props.view == 'send') {
        //    return (
        //        <aside class="right-side">
        //            <section class="content">
        //                <div class="row">
        //                    <div class="col-xs-6">
        //                        <Send collection={this.props.collection} model={model} router={this.props.router}/>
        //                    </div>
        //                </div>
        //            </section>
        //        </aside>
        //    );
        //}
        //
        //if (this.props.view == 'id') {
        //    return (
        //        <aside class="right-side">
        //            <section class="content">
        //                <div class="row">
        //                    <Nav collection={this.props.collection} name={model.get('name')} email={model.get('email')} page={this.props.router.page} router={this.props.router}/>
        //                </div>
        //            </section>
        //        </aside>
        //    );
        //}

        if (this.props.view == 'add') {
            return (
                <Create collection={this.props.collection} router={this.props.router}/>
            );
        }

        return false;
    }
}