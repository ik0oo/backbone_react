//libs
import React from 'react';

//files
import base from '../models/base';

class Item extends React.Component {
    componentDidMount () {
        this.props.model.on('prev change:' + this.props.valute, this.forceUpdate.bind(this, null));
    }

    componentWillUnmount () {
        this.props.model.off(null, null, this);
    }

    render () {
        return (
            <div class="col-xs-4">
                <span class={'sm-st-icon st-' + this.props.color}>
                    <i class="fa fa-check-square-o"></i>
                </span>

                <div class="sm-st-info">
                    <span>{this.props.model.get(this.props.valute)}</span>
                </div>
            </div>
        );
    }
}

export default class Header extends React.Component {
    render () {
        return (

            <header class="header">
                <div class="logo">
                    Пользователи
                </div>

                <nav class="navbar navbar-static-top">
                    <div class="col-xs-offset-6 col-xs-6">
                        <div class="row">

                            <Item color={'red'} valute={'rub'} model={base}/>
                            <Item color={'green'} valute={'usd'} model={base}/>
                            <Item color={'blue'} valute={'eur'} model={base}/>

                        </div>
                    </div>
                </nav>
            </header>

        );
    }
}