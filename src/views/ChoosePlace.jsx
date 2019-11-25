import React from "react";
import { Form, FormGroup, Input, Button, Row, Col } from "reactstrap";
import shortid from "shortid";
import API from "../API";

class ChoosePlace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [
        {
          name: "",
          address: "",
          city: ""
        }
      ],
      place: "",
      isPlaces: false
    };
  }

  async componentDidMount() {
    const r = await API.place.get();
    const place = localStorage.getItem("place");
    this.setState({ places: r.data, isPlaces: true, place });
  }

  render() {
    return (
      <div className="content">
        <Form
          id="form"
          onSubmit={e => {
            e.preventDefault();
            window.location.href = "/vote";
          }}
        >
          <Row style={{ justifyContent: "center" }}>
            <Col md="6">
              <FormGroup>
                <label htmlFor="place">Lugar de votación</label>
                <Input
                  type="select"
                  required
                  id="place"
                  name="select"
                  value={this.state.place}
                  onChange={e => {
                    this.setState({ place: e.target.value });
                    localStorage.setItem("place", e.target.value);
                  }}
                >
                  <option></option>
                  {this.state.isPlaces &&
                    this.state.places.map(c => {
                      return (
                        <option key={shortid.generate()} value={c._id} style={{ color: "black" }}>
                          {`${c.name} - ${c.address} - ${c.city}`}
                        </option>
                      );
                    })}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Row style={{ justifyContent: "center" }}>
            <Button className="btn-fill" color="primary" form="form" formTarget="form" type="submit">
              Guardar
            </Button>
          </Row>
        </Form>
      </div>
    );
  }
}

export default ChoosePlace;
