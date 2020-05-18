import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
// import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


class FilterSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: {
        "w": false,
        "u": false,
        "b": false,
        "r": false,
        "g": false,
        "c": false
      },
      allColors: false,
      allColorsLabel: "Contains at lest one of the selected colors"
    };

    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleColorSwitch = this.handleColorSwitch.bind(this);
  }

  handleChangeColor(event) {
    const changedColor = event.target.name;
    const newColors = {...this.state.colors};
    newColors[changedColor] = !this.state.colors[changedColor];

    this.setState({
      colors: newColors
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.state.colors);
    this.props.handleFilterSubmit(this.state);
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

  render() {
    const colors = ['w', 'u', 'b', 'r', 'g', 'c'];

    return (
      <Accordion defaultActiveKey="0" className="mt-5">
        <Card className="">
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Filter Decks
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
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control as="select" value="Choose...">
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control />
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
                  label={this.state.allColorsLabel} 
                  onChange={this.handleColorSwitch}
                />
              </Form.Group>

              <Button variant="dark" type="submit" className="w-100" onClick={this.handleSubmit}>
                Filter!
              </Button>
            </Form>

            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }

}

export default FilterSection;
