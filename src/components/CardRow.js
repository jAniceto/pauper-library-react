import React from 'react';
import './CardRow.css';
import '../css/mana.css';
import {getManaHTML} from '../utils/mana.js'


class CardRow extends React.Component {
  constructor(props) {
    super(props);
    this.toggleHover = this.toggleHover.bind(this);
    this.state = {
      hover: false
    }
  }

  render() {
    const cardImage = (
      <div>
        <img 
        className="cardImage" 
        height="310" 
        src={this.props.cardInfo['image_uris']['normal']} 
        alt={'Image of ' + this.props.cardInfo['card_name']}
        />
      </div>
    );

    const card_price = () => {
      if (this.props.cardInfo['is_land']) {
        return "";
      } else {
        try {
          return this.props.cardInfo['best_price'][1];
        }
        catch(err) {
          return "";
        }
      }
    }

    return (
      <tr>
        <td>
          { this.props.cardInfo['quantity'] }
        </td>
        <td onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
          <span data-image={ this.props.cardInfo['image_uris']['normal'] }>{ this.props.cardInfo['card_name'] }</span>
          {this.state.hover ? cardImage : ''}
        </td>
        <td className="manaCost">
          { getManaHTML(this.props.cardInfo['mana_cost']).map((symbol) => symbol) }
        </td>
        <td className="bestPrice">
          {card_price()}
        </td>
      </tr>
    );
  }

  toggleHover() {
    this.setState({
      hover: !this.state.hover
    })
  }

}

export default CardRow;
