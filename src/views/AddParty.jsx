import React from "react";
import { Button, Card, CardHeader, CardBody, CardFooter, CardTitle, Table, FormGroup, Input, Row, Col, Form } from "reactstrap";
import API from "../API";
import shortid from "shortid";

class AddParty extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      parties: [
        {
          _id: "",
          name: "",
          createdAt: "",
          updatedAt: ""
        }
      ],
      isEditing: false,
      isData: false,
      name: "",
      id: ""
    };
  }

  async componentDidMount() {
    const r = await API.party.get();
    this.setState({ parties: r.data, isData: true });
  }

  onClick = async () => {
    const { name, isEditing, id } = this.state;
    try {
      if (isEditing) {
        await API.party.patch(id, name);
      } else {
        await API.party.post(name);
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
                    Cargos
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
                        Nuevo cargo
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Nombre</th>
                        <th>Creado</th>
                        <th>Actualizado</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.isData &&
                        this.state.parties.map(c => {
                          return (
                            <tr key={shortid.generate()}>
                              <td>{c.name}</td>
                              <td>{new Date(c.createdAt).toLocaleString()}</td>
                              <td>{new Date(c.updatedAt).toLocaleString()}</td>
                              <td style={{ justifyContent: "space-around", display: "flex" }}>
                                <Button
                                  className="btn-round"
                                  size="sm"
                                  color="info"
                                  onClick={() => {
                                    this.setState({ isEditing: true, id: c._id, name: c.name });
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
                                      const isDelete = confirm(`¿Seguro que quierer borrar el cargo de ${c.name}?`);
                                      if (isDelete) {
                                        await API.party.delete(c._id);
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
                  <h5 className="title">{this.state.isEditing ? "Editar cargo" : "Añadir cargo"}</h5>
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

export default AddParty;
