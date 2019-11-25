import React from "react";
import { Button, Card, CardHeader, CardBody, CardFooter, CardTitle, Table, FormGroup, Input, Row, Col, Form } from "reactstrap";
import API from "../API";
import Cities from "../API/Cities";
import shortid from "shortid";

const { hostname, protocol } = window.location;
const APIURL = `${protocol}//${hostname}:5000/api`;
class AddCandidate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      candidates: [
        {
          _id: "",
          name: "",
          identification: 0,
          party: {
            _id: "",
            name: ""
          },
          resume: "",
          charge: "",
          location: "",
          createdAt: "",
          updatedAt: ""
        }
      ],
      isEditing: false,
      isReady: true,
      isData: false,
      id: "",
      name: "",
      identification: "",
      party: "",
      resume: "",
      charge: "",
      location: "",
      photo: "",
      plan: "",
      parties: [
        {
          _id: "",
          name: ""
        }
      ],
      charges: [
        {
          name: "ALCALDE"
        },
        {
          name: "GOBERNADOR"
        }
      ]
    };
  }

  async componentDidMount() {
    const r = await API.candidate.get();
    const rp = await API.party.get();
    this.setState({ candidates: r.data, parties: rp.data, isData: true });
  }

  onClick = async () => {
    const { name, isEditing, id, identification, charge, party, photo, plan, resume, location } = this.state;
    try {
      if (isEditing) {
        await API.candidate.patch(id, name, identification, charge, party, photo, plan, resume, location);
      } else {
        await API.candidate.post(name, identification, charge, party, photo, plan, resume, location);
      }
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    Candidatos
                    {this.state.isEditing && (
                      <Button
                        className="btn-round"
                        style={{ float: "right" }}
                        size="sm"
                        color="success"
                        onClick={() => {
                          this.setState({ isEditing: false, id: "", name: "", identification: "", charge: "", party: "", photo: "", plan: "", resume: " " });
                        }}
                      >
                        Nuevo candidato
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
                        <th>Cargo</th>
                        <th>Ubicación</th>
                        <th>Partido</th>
                        <th>Foto</th>
                        <th>Plan</th>
                        <th>Creado</th>
                        <th>Actualizado</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.isData &&
                        this.state.candidates.map(c => {
                          return (
                            <tr key={shortid.generate()}>
                              <td>{c.name}</td>
                              <td>{c.identification}</td>
                              <td>{c.charge}</td>
                              <td>{c.location}</td>
                              <td>{c.party.name}</td>
                              <td>
                                <a href={`${APIURL}/photo/${c._id}.png`} target="_blank" rel="noopener noreferrer">
                                  Click aquí
                                </a>
                              </td>
                              <td>
                                <a href={`${APIURL}/plan/${c._id}.pdf`} target="_blank" rel="noopener noreferrer">
                                  Click aquí
                                </a>
                              </td>
                              <td>{new Date(c.createdAt).toLocaleString()}</td>
                              <td>{new Date(c.updatedAt).toLocaleString()}</td>
                              <td style={{ justifyContent: "space-around", display: "flex" }}>
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
                                      charge: c.charge,
                                      location: c.location,
                                      party: c.party._id,
                                      photo: c.photo,
                                      plan: c.plan,
                                      resume: c.resume
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
                                      const isDelete = confirm(`¿Seguro que quierer borrar el candidato de ${c.name} con id ${c._id}?`);
                                      if (isDelete) {
                                        await API.candidate.delete(c._id);
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
                  <h5 className="title">{this.state.isEditing ? "Editar candidato" : "Añadir candidato"}</h5>
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
                          <label htmlFor="charge">Cargo</label>
                          <Input
                            type="select"
                            required
                            id="charge"
                            name="select"
                            value={this.state.charge}
                            onChange={e => {
                              this.setState({ charge: e.target.value });
                            }}
                          >
                            <option></option>
                            {this.state.charges.map(c => {
                              return (
                                <option key={shortid.generate()} value={c._id} style={{ color: "black" }}>
                                  {c.name}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label htmlFor="party">Partido</label>
                          <Input
                            type="select"
                            required
                            id="party"
                            name="select"
                            value={this.state.party}
                            onChange={e => {
                              this.setState({ party: e.target.value });
                            }}
                          >
                            <option></option>
                            {this.state.parties.map(c => {
                              return (
                                <option key={shortid.generate()} value={c._id} style={{ color: "black" }}>
                                  {c.name}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label htmlFor="resume">Resume</label>
                          <Input
                            style={{ maxHeight: "unset", height: "300px" }}
                            type="textarea"
                            id="resume"
                            value={this.state.resume}
                            onChange={e => this.setState({ resume: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label htmlFor="photo">Ubicación</label>
                          <Input
                            type="select"
                            required
                            id="city"
                            name="select"
                            value={this.state.location}
                            onChange={e => {
                              this.setState({ location: e.target.value });
                            }}
                          >
                            <option></option>
                            {this.state.charge === "ALCALDE" &&
                              Cities.map(c => {
                                return c.cities.map(s => {
                                  return (
                                    <option key={shortid.generate()} value={s} style={{ color: "black" }}>
                                      {`${s} - ${c.state}`}
                                    </option>
                                  );
                                });
                              })}
                            {this.state.charge === "GOBERNADOR" &&
                              Cities.map(c => {
                                return (
                                  <option key={shortid.generate()} value={c.state} style={{ color: "black" }}>
                                    {c.state}
                                  </option>
                                );
                              })}
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <label htmlFor="photo">Foto</label>
                          <input
                            type="file"
                            id="photo"
                            required={!this.state.isEditing}
                            accept="image/*"
                            style={{ opacity: 1, position: "relative" }}
                            onChange={async e => {
                              this.setState({ isReady: false });
                              const photo = await this.toBase64(e.target.files[0]);
                              this.setState({ photo, isReady: true });
                            }}
                          />
                        </FormGroup>
                        <FormGroup>
                          <label htmlFor="plan">Plan</label>
                          <input
                            type="file"
                            id="plan"
                            required={!this.state.isEditing}
                            accept="application/pdf"
                            style={{ opacity: 1, position: "relative" }}
                            onChange={async e => {
                              this.setState({ isReady: false });
                              const plan = await this.toBase64(e.target.files[0]);
                              this.setState({ plan, isReady: true });
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button disabled={!this.state.isReady} className="btn-fill" color="primary" form="form" formTarget="form" type="submit">
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

export default AddCandidate;
