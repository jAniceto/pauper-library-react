import React from 'react';
import Button from 'react-bootstrap/Button';


class DeckDownload extends React.Component {
  constructor(props) {
    super(props);
  }

  downloadDeckTxt = () => {
    let deckMainboardText = this.props.mainboard.map((card) => 
      `${card["quantity"]} ${card["name"]} \n`
    )
    let deckSideboardText = this.props.sideboard.map((card) => 
      `${card["quantity"]} ${card["name"]} \n`
    )
    let fullDeckTxt = deckMainboardText.concat(["\n"]).concat(deckSideboardText).join("");

    const element = document.createElement("a");
    const file = new Blob([fullDeckTxt], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${this.props.deckName}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  render() {
    return (
      <Button variant="outline-dark" block onClick={this.downloadDeckTxt}>Download .txt</Button>
    );
  }

}

export default DeckDownload;
