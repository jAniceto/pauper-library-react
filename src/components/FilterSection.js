import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { getDeckFamilies, getFamiliesSymbolsHTML } from '../utils/families.js';
import { getManaHTML } from '../utils/mana.js';
import { capitalizeString } from '../utils/capitalize.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';


class FilterSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterSectionExpanded: true,
      colors: {
        "w": false,
        "u": false,
        "b": false,
        "r": false,
        "g": false,
        "c": false
      },
      allColors: false,
      allColorsLabel: "Contains at least one of the selected colors",
      family: "none",
      deckName: "",
      tag: "",
      card: ""
    };

    this.handleFilterExpand = this.handleFilterExpand.bind(this);
    this.handleDeckNameInput = this.handleDeckNameInput.bind(this);
    this.handleTagInput = this.handleTagInput.bind(this);
    this.handleCardInput = this.handleCardInput.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleColorSwitch = this.handleColorSwitch.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResetButton = this.handleResetButton.bind(this);
  }

  handleFilterExpand(event) {
    this.setState({
      filterSectionExpanded: !this.state.filterSectionExpanded
    });
  }

  handleDeckNameInput(event) {
    this.setState({
      deckName: event.target.value
    });
  }

  handleTagInput(event) {
    this.setState({
      tag: event.target.value
    });
  }

  handleCardInput(event) {
    this.setState({
      card: event.target.value
    });
  }

  handleChangeColor(event) {
    const changedColor = event.target.name;
    const newColors = {...this.state.colors};
    newColors[changedColor] = !this.state.colors[changedColor];

    this.setState({
      colors: newColors
    });
  }

  handleColorSwitch(event) {
    if (this.state.allColors) {
      this.setState({
        allColors: false,
        allColorsLabel: "Contains at least one of the selected colors"
      });
    } else {
      this.setState({
        allColors: true,
        allColorsLabel: "Contains all of the selected colors"
      });
    }
  }

  handleSelectChange(event) {
    this.setState({ 
      family: event.target.value
     });
  };

  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.state.colors);
    this.props.handleFilterSubmit(this.state);
  }
  
  handleResetButton(event) {
    this.setState({
      colors: {
        "w": false,
        "u": false,
        "b": false,
        "r": false,
        "g": false,
        "c": false
      },
      allColors: false,
      allColorsLabel: "Contains at least one of the selected colors",
      family: "none",
      deckName: "",
      tag: "",
      card: ""
    }, this.props.handleFilterReset(this.state));
  }

  componentDidMount() {
    // Get the <datalist> and <input> elements.
    var dataList = document.getElementById('mtgo-card-names');
    var input = document.getElementById('name-input');

    // Create a new XMLHttpRequest.
    var request = new XMLHttpRequest();

    // Handle state changes for the request.
    request.onreadystatechange = function(response) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          // Parse the JSON
          var jsonOptions = JSON.parse(request.responseText);

          // Loop over the JSON array.
          jsonOptions['data'].forEach(function(item) {
            // Create a new <option> element.
            var option = document.createElement('option');
            // Set the value using the item in the JSON array.
            option.value = item;
            // Add the <option> element to the <datalist>.
            dataList.appendChild(option);
          });

          // Update the placeholder text.
          input.placeholder = "Rancor";
        } else {
          // An error occured :(
          input.placeholder = "Couldn't load datalist options.";
        }
      }
    };

    // Update the placeholder text.
    input.placeholder = "Loading options...";

    // Set up and make the request.
    request.open('GET', 'https://api.scryfall.com/catalog/card-names', true);
    request.send();
  }

  render() {
    const colors = ['w', 'u', 'b', 'r', 'g', 'c'];

    // Filter section header
    let filterSectionHeader;
    if (this.state.filterSectionExpanded) {
      filterSectionHeader = <div><FontAwesomeIcon icon={faAngleUp} /> Filter Decks <FontAwesomeIcon icon={faAngleUp} /></div>;
    } else {
      filterSectionHeader = <div><FontAwesomeIcon icon={faAngleDown} /> Filter Decks <FontAwesomeIcon icon={faAngleDown} /></div>;
    }

    return (
      <Accordion defaultActiveKey="0" className="mt-5">
        <Card className="">
          <Accordion.Toggle as={Card.Header} eventKey="0" className="text-center" onClick={this.handleFilterExpand} style={{cursor: 'pointer'}}>
            {filterSectionHeader}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              
            <Form onSubmit={this.handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} md={6} controlId="formGridName">
                  <Form.Label>By Deck Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Stompy" 
                    value={this.state.deckName} 
                    onChange={this.handleDeckNameInput}
                  />
                </Form.Group>

                <Form.Group as={Col} md={6} controlId="formGridTag">
                  <Form.Label>By Tag</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Mill"
                    value={this.state.tag} 
                    onChange={this.handleTagInput} 
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md={6}>  {/*controlId="formGridCardName"*/}
                  <Form.Label>By Card</Form.Label>
                  <Form.Control 
                    type="text" 
                    id="name-input" 
                    list="mtgo-card-names"
                    value={this.state.card} 
                    onChange={this.handleCardInput} 
                  />
                  <datalist id="mtgo-card-names"></datalist>
                </Form.Group>

                <Form.Group as={Col} md={6} controlId="formGridFamily">
                  <Form.Label>By Guild/Shard/Clan</Form.Label>
                  <Form.Control as="select" onChange={this.handleSelectChange} value={this.state.family}>
                    <option value="none">
                      Choose...
                    </option>
                    {getDeckFamilies().map((family, index) =>
                      <option key={family} value={family}>
                        {capitalizeString(family)}
                      </option>
                    )}
                  </Form.Control>
                </Form.Group>

              </Form.Row>

              <Form.Group id="colorCheckboxes">
                <Form.Label className="pr-md-5 d-none d-md-block">By Color</Form.Label>
                {colors.map((color, index) => (
                  <Form.Check custom inline
                    key={index} 
                    id={"color" + index} 
                    type="checkbox" 
                    name={color}
                    label={<i className={"ms ms-cost ms-" + color}></i>} 
                    checked={this.state.colors[color]}
                    onChange={this.handleChangeColor}
                  />
                ))}

                <span className="pr-4 pl-4"></span>

                <Form.Check inline 
                  id="anyAllSwitch"
                  type="switch" 
                  name="anyAll"
                  checked={this.state.allColors}
                  label={this.state.allColorsLabel} 
                  onChange={this.handleColorSwitch}
                />
              </Form.Group>

              <Form.Row>
                <Col md="10" className="mb-1 mb-md-0">
                  <Button variant="dark" type="submit" className="w-100" onClick={this.handleSubmit}>
                    <FontAwesomeIcon icon={faSearch} /> Filter!
                  </Button>
                </Col>

                <Col md="2" className="mb-1 mb-md-0">
                  <Button variant="outline-dark" className="w-100" onClick={this.handleResetButton}>
                    Reset filters
                  </Button>
                </Col>
              </Form.Row>

            </Form>

            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }

}

export default FilterSection;
