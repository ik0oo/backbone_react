import React from 'react';
import _ from 'underscore';
import Backbone from 'backbone';

import HeaderItem from './header-item';

export default class Header extends React.Component {

    componentDidMount () {
        this.props.model.on('change', this.forceUpdate.bind(this, null));
    }

    componentWillUnmount () {
        this.props.model.off(null, null, this);
    }


    render () {
        // добавление элементов с отатком денежных средств
        const headerItems = _.map(this.props.model.attributes, (item, i) => {
            return <HeaderItem valuta={i} value={item} key={i} />;
        });

        return (
            <header class="main__header">
                {headerItems}
            </header>
        );
    }
}

