import React from "react";
import { Button, Card, CardHeader, CardBody, CardFooter, CardTitle, Table, FormGroup, Input, Row, Col, Form } from "reactstrap";
import API from "../API";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      voters: [
        {
          _id: "",
          name: "",
          identification: "",
          city: "",
          place: {
            _id: "",
            name: "",
            address: "",
            city: ""
          },
          createdAt: "",
          updatedAt: ""
        }
      ],
      isEditing: false,
      name: "",
      id: "",
      identification: "",
      city: "",
      place: "",
      places: []
    };
  }

  async componentDidMount() {
    const r = await API.voter.get();
    const rp = await API.place.get();
    this.setState({ voters: r.data, places: rp.data });
  }

  onClick = async () => {
    const { name, isEditing, id, identification, city, place } = this.state;
    try {
      if (isEditing) {
        await API.voter.patch(id, name, identification, city, place);
      } else {
        await API.voter.post(name, identification, city, place);
      }
      window.location.reload();
    } catch (error) {
      alert("Error, por favor recargue la página");
    }
  };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    Votantes
                    {this.state.isEditing && (
                      <Button
                        className="btn-round"
                        style={{ float: "right" }}
                        size="sm"
                        color="success"
                        onClick={() => {
                          this.setState({ isEditing: false, id: "", name: "" });
                        }}
                      >
                        Nuevo votante
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Nombre</th>
                        <th>Cédula</th>
                        <th>Ciudad</th>
                        <th>Lugar de votación</th>
                        <th>Creado</th>
                        <th>Actualizado</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.voters.map((c, i) => {
                        return (
                          <tr key={i}>
                            <td>{c.name}</td>
                            <td>{c.identification}</td>
                            <td>{c.city}</td>
                            <td>{`${c.place.name} - ${c.place.address}`}</td>
                            <td>{new Date(c.createdAt).toLocaleString()}</td>
                            <td>{new Date(c.updatedAt).toLocaleString()}</td>
                            <td>
                              <Button
                                className="btn-round"
                                size="sm"
                                color="info"
                                onClick={() => {
                                  this.setState({
                                    isEditing: true,
                                    id: c._id,
                                    name: c.name,
                                    identification: c.identification,
                                    city: c.city,
                                    place: c.place._id
                                  });
                                }}
                              >
                                Editar
                              </Button>
                              <Button
                                className="btn-round"
                                size="sm"
                                color="danger"
                                onClick={async () => {
                                  try {
                                    // eslint-disable-next-line no-restricted-globals
                                    const isDelete = confirm(`¿Seguro que quierer borrar el votante ${c.name}?`);
                                    if (isDelete) {
                                      await API.voter.delete(c._id);
                                      window.location.reload();
                                    }
                                  } catch (error) {
                                    alert(error);
                                  }
                                }}
                              >
                                Eliminar
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h5 className="title">{this.state.isEditing ? "Editar votante" : "Añadir votante"}</h5>
                </CardHeader>
                <CardBody>
                  <Form
                    id="form"
                    onSubmit={e => {
                      e.preventDefault();
                      this.onClick();
                    }}
                  >
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label htmlFor="name">Nombre</label>
                          <Input
                            required
                            placeholder="Nombre"
                            id="name"
                            type="text"
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label htmlFor="identification">Cédula</label>
                          <Input
                            required
                            placeholder="Cédula"
                            id="identification"
                            type="number"
                            value={this.state.identification}
                            onChange={e => this.setState({ identification: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label htmlFor="city">Ciudad</label>
                          <Input
                            required
                            placeholder="Nombre"
                            id="city"
                            type="text"
                            value={this.state.city}
                            onChange={e => this.setState({ city: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
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
                            }}
                          >
                            <option></option>
                            {this.state.places.map((c, i) => {
                              return (
                                <option key={i} value={c._id} style={{ color: "black" }}>
                                  {c.name}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" form="form" formTarget="form" type="submit">
                    {this.state.isEditing ? "Guardar" : "Añadir"}
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default UserProfile;
