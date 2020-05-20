import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { getDeckFamilies, getFamiliesSymbolsHTML } from '../utils/families.js';
import { getManaHTML } from '../utils/mana.js'
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
      allColorsLabel: "Contains at lest one of the selected colors",
      family: "none"
    };

    this.handleFilterExpand = this.handleFilterExpand.bind(this);
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
        allColorsLabel: "Contains at lest one of the selected colors"
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
      allColorsLabel: "Contains at lest one of the selected colors",
      family: "none"
    }, this.props.handleFilterReset(this.state));
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
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="burn" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridTag">
                  <Form.Label>Tag</Form.Label>
                  <Form.Control type="text" placeholder="aggro" />
                </Form.Group>
              </Form.Row>

              {/* <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
              </Form.Group> */}

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCardName">
                  <Form.Label>Card name</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridFamily">
                  <Form.Label>Deck Family</Form.Label>
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

                <Form.Group as={Col} controlId="formGridCardName">
                  {/* <Form.Label>Card name</Form.Label>
                  <Form.Control /> */}
                </Form.Group>
              </Form.Row>

              <Form.Group id="colorCheckboxes">
                <Form.Label className="pr-md-5 d-none d-md-block">Color:</Form.Label>
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
                {/* <Form.Group as={Col} column="md" md={8} controlId="formGridButtons"> */}
                <Col md="10" className="mb-1 mb-md-0">
                  <Button variant="dark" type="submit" className="w-100" onClick={this.handleSubmit}>
                    <FontAwesomeIcon icon={faSearch} /> Filter!
                  </Button>
                </Col>
                {/* </Form.Group> */}

                {/* <Form.Group as={Col} column="md" md={8} controlId="formGridButtons"> */}
                <Col md="2" className="mb-1 mb-md-0">
                  <Button variant="outline-dark" className="w-100" onClick={this.handleResetButton}>
                    Reset filters
                  </Button>
                </Col>
                {/* </Form.Group> */}
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
