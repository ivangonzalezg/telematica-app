import React from "react";
import { Button, Card, CardHeader, CardBody, CardFooter, CardTitle, Table, FormGroup, Input, Row, Col, Form } from "reactstrap";
import API from "../API";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      charges: [
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
      id: "",
      name: "",
      identification: 0,
      party: "",
      resume: "",
      charge: ""
    };
  }

  async componentDidMount() {
    const r = await API.charge.get();
    this.setState({ charges: r.data });
  }

  onClick = async () => {
    const { name, isEditing, id } = this.state;
    try {
      if (isEditing) {
        await API.charge.patch(id, name);
      } else {
        await API.charge.post(name);
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
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Creado</th>
                        <th>Actualizado</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.charges.map((c, i) => {
                        return (
                          <tr key={i}>
                            <td>{c._id}</td>
                            <td>{c.name}</td>
                            <td>{new Date(c.createdAt).toLocaleString()}</td>
                            <td>{new Date(c.updatedAt).toLocaleString()}</td>
                            <td>
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
                                      await API.charge.delete(c._id);
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
                      <Col className="" md="6">
                        <FormGroup>
                          <label>Nombre</label>
                          <Input required placeholder="Nombre" type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
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
