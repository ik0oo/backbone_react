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
            <div class="valute">
                <span class={'valute__icon' + ' valute__icon--' + this.color(this.props.valuta)}>
                    <i class={'fa fa-' + this.props.valuta}></i>
                </span>

                <span class="valute__data">{this.props.value}</span>
            </div>
        );
    }
}
