//libs
import React from 'react';

export default class HeaderItem extends React.Component {
    color (valuta) {
        const valutaColor = {
            'rub': 'red',
            'usd': 'blue',
            'eur': 'green'
        };

        return valutaColor[valuta];
    }

    render () {

        return (
            <div class="col-xs-4">
                <span class={'sm-st-icon st-' + this.color(this.props.valuta)}>
                    <i class={'fa fa-' + this.props.valuta}></i>
                </span>

                <div class="sm-st-info">
                    <span>{this.props.value}</span>
                </div>
            </div>
        );
    }
}
