import React from "react";
import { Button, Card, CardHeader, CardBody, CardFooter, CardTitle, Table, FormGroup, Input, Row, Col, Form } from "reactstrap";
import API from "../API";

const { hostname, protocol } = window.location;
const APIURL = `${protocol}//${hostname}:5000/api`;
class UserProfile extends React.Component {
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
          charge: {
            _id: "",
            name: ""
          },
          createdAt: "2019-11-23T20:19:00.719Z",
          updatedAt: "2019-11-23T20:23:31.977Z"
        }
      ],
      isEditing: false,
      isReady: true,
      id: "",
      name: "",
      identification: "",
      party: "",
      resume: "",
      charge: "",
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
          _id: "",
          name: ""
        }
      ]
    };
  }

  async componentDidMount() {
    const r = await API.candidate.get();
    const rp = await API.party.get();
    const rc = await API.charge.get();
    this.setState({ candidates: r.data, parties: rp.data, charges: rc.data });
  }

  onClick = async () => {
    const { name, isEditing, id, identification, charge, party, photo, plan, resume } = this.state;
    try {
      if (isEditing) {
        await API.candidate.patch(id, name, identification, charge, party, photo, plan, resume);
      } else {
        await API.candidate.post(name, identification, charge, party, photo, plan, resume);
      }
      window.location.reload();
    } catch (error) {
      alert("Error, por favor recargue la página o verifique los datos. No se puede repetir la cédula o aplicar al mismo cargo con un partido que ya aplicó");
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
                        <th>Partido</th>
                        <th>Foto</th>
                        <th>Plan</th>
                        <th>Creado</th>
                        <th>Actualizado</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.candidates.map((c, i) => {
                        return (
                          <tr key={i}>
                            <td>{c.name}</td>
                            <td>{c.identification}</td>
                            <td>{c.charge.name}</td>
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
                                    charge: c.charge._id,
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
                            {this.state.charges.map((c, i) => {
                              return (
                                <option key={i} value={c._id} style={{ color: "black" }}>
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
                            {this.state.parties.map((c, i) => {
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
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label htmlFor="resume">Resume</label>
                          <Input type="textarea" id="resume" value={this.state.resume} onChange={e => this.setState({ resume: e.target.value })} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label htmlFor="photo">Foto</label>
                          <input
                            type="file"
                            id="photo"
                            required
                            accept="image/*"
                            style={{ opacity: 1, position: "relative" }}
                            onChange={async e => {
                              this.setState({ isReady: false });
                              const photo = await this.toBase64(e.target.files[0]);
                              this.setState({ photo, isReady: true });
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label htmlFor="plan">Plan</label>
                          <input
                            type="file"
                            id="plan"
                            required
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

export default UserProfile;
