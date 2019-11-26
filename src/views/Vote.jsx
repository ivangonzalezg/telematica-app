import React from "react";
import { Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import API from "../API";
import shortid from "shortid";

class Vote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      places: [
        {
          name: "",
          address: "",
          city: ""
        }
      ],
      place: "",
      isPlaces: false,
      identification: "",
      voter: {
        _id: "",
        name: "",
        identification: "",
        city: "",
        state: ""
      },
      isGovernors: false,
      governors: [
        {
          _id: "",
          name: "",
          identification: "",
          charge: "",
          party: {
            name: ""
          },
          resume: "",
          location: ""
        }
      ],
      governor: {
        _id: "",
        location: "",
        name: ""
      },
      isMayors: false,
      mayors: [
        {
          _id: "",
          name: "",
          identification: "",
          charge: "",
          party: {
            name: ""
          },
          resume: "",
          location: ""
        }
      ],
      mayor: {
        _id: "",
        location: "",
        name: ""
      }
    };
  }

  async componentDidMount() {
    const r = await API.place.get();
    const place = localStorage.getItem("place");
    if (!place) window.location.pathname = "/choose-location";
    this.setState({ places: r.data, isPlaces: true, place });
  }

  getGovernors = async () => {
    const { voter } = this.state;
    const params = API.getParams({ location: voter.state, charge: "GOBERNADOR" });
    const r = await API.candidate.get(params);
    this.setState({ governors: r.data, isGovernors: true });
  };

  getMayors = async () => {
    const { voter } = this.state;
    const params = API.getParams({ location: voter.city, charge: "ALCALDE" });
    const r = await API.candidate.get(params);
    this.setState({ mayors: r.data, isMayors: true });
  };

  sendVote = async () => {
    const { mayor, governor, voter, place } = this.state;
    try {
      if (governor._id) await API.vote.post(voter._id, governor._id, "GOBERNADOR", voter.state, place);
      if (mayor._id) await API.vote.post(voter._id, mayor._id, "ALCALDE", voter.city, place);
      alert("!Gracias por votar!");
      window.location.reload();
    } catch (e) {
      alert(e);
    }
  };

  nextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  ChangePlace = () => {
    return this.state.places
      .filter(p => p._id === this.state.place)
      .map(p => {
        return (
          <div
            key={shortid.generate()}
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <h4 style={{ display: "inline" }}>
              Lugar de votación: <b>{p.name}</b>
            </h4>
            <Button
              className="btn-round"
              size="sm"
              color="success"
              onClick={() => {
                window.location.href = "choose-location";
              }}
            >
              Cambiar
            </Button>
          </div>
        );
      });
  };

  InsertIdentification = () => {
    return (
      <div className="content">
        {this.ChangePlace()}
        <br />
        <Form
          id="form"
          onSubmit={e => {
            e.preventDefault();
            const params = API.getParams({ place: this.state.place, identification: this.state.identification });
            API.voter
              .get(params)
              .then(v => {
                const voter = v.data[0];
                if (voter) {
                  const query = API.getParams({ voter: voter._id });
                  API.vote
                    .get(query)
                    .then(r => {
                      if (!r.data.length) {
                        this.setState({ voter }, () => {
                          this.getGovernors();
                          this.nextStep();
                        });
                      } else {
                        alert("Votante ya ejerció su derecho al voto");
                      }
                    })
                    .catch(e => {
                      alert(e);
                    });
                } else {
                  alert("Votante no encontrado. Verifique su mesa o número de cédula");
                }
              })
              .catch(e => {
                alert(e);
              });
          }}
        >
          <Row style={{ justifyContent: "center" }}>
            <Col md="6">
              <FormGroup>
                <label htmlFor="identification">Cédula</label>
                <Input
                  required
                  id="identification"
                  name="select"
                  type="number"
                  value={this.state.identification}
                  onChange={e => {
                    this.setState({ identification: e.target.value });
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Row style={{ justifyContent: "center" }}>
            <Button className="btn-fill" color="primary" form="form" formTarget="form" type="submit">
              Continuar
            </Button>
          </Row>
        </Form>
      </div>
    );
  };

  ReinsertIdentification = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <h4 style={{ display: "inline" }}>
          Nombre: <b>{this.state.voter.name}</b>
        </h4>
        <Button
          className="btn-round"
          size="sm"
          color="success"
          onClick={() => {
            this.setState({ step: 0 });
          }}
        >
          Cambiar
        </Button>
      </div>
    );
  };

  ChooseGovernor = () => {
    return (
      <div className="content">
        {this.ChangePlace()}
        {this.ReinsertIdentification()}
        <br />
        <Form
          id="form"
          onSubmit={e => {
            e.preventDefault();
            this.nextStep();
            this.getMayors();
          }}
        >
          <Row style={{ justifyContent: "center" }}>
            <Col md="8">
              {this.state.isGovernors && this.state.governors.length > 0 && <h3>Elige Gobernador</h3>}
              {this.state.isGovernors &&
                this.state.governors.map(g => {
                  return (
                    <Row key={shortid.generate()} className="governor">
                      <Col md="3">
                        <img src={`${API.baseURL}/photo/${g._id}`} alt={g.name} />
                      </Col>
                      <Col md="9">
                        <h3 style={{ marginBottom: 0 }}>{g.name}</h3>
                        <h5 style={{ marginBottom: 0 }}>{g.party.name}</h5>
                        <a href={`${API.baseURL}/plan/${g._id}`} target="_blank" rel="noopener noreferrer">
                          Ver plan de gobierno
                        </a>
                        <br />
                        <Button
                          className="btn-round"
                          size="sm"
                          color="info"
                          onClick={() => {
                            const { state } = this.state.voter;
                            this.setState({
                              governor: {
                                _id: g._id,
                                location: state,
                                name: g.name
                              }
                            });
                            this.nextStep();
                            this.getMayors();
                          }}
                        >
                          Votar
                        </Button>
                      </Col>
                    </Row>
                  );
                })}
              {this.state.isGovernors && this.state.governors.length === 0 && (
                <Row>
                  <Col md="12" style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
                    <h4>No hay gobernadores inscritos</h4>
                    <Button className="btn-fill" color="primary" form="form" formTarget="form" type="submit">
                      Continuar
                    </Button>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Form>
      </div>
    );
  };

  ChangeGovernor = () => {
    if (this.state.governor.name) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <h4 style={{ display: "inline" }}>
            <span>
              Para Gobernador: <b>{this.state.governor.name}</b>
            </span>
          </h4>
          <Button
            className="btn-round"
            size="sm"
            color="success"
            onClick={() => {
              this.setState({ step: 1 });
            }}
          >
            Cambiar
          </Button>
        </div>
      );
    } else {
      return null;
    }
  };

  ChooseMayor = () => {
    return (
      <div className="content">
        {this.ChangePlace()}
        {this.ReinsertIdentification()}
        {this.ChangeGovernor()}
        <br />
        <Form
          id="form"
          onSubmit={e => {
            e.preventDefault();
            this.nextStep();
          }}
        >
          <Row style={{ justifyContent: "center" }}>
            <Col md="8">
              {this.state.isMayors && this.state.mayors.length > 0 && <h3>Elige Alcalde</h3>}
              {this.state.isMayors &&
                this.state.mayors.map(m => {
                  return (
                    <Row key={shortid.generate()} className="governor">
                      <Col md="3">
                        <img src={`${API.baseURL}/photo/${m._id}`} alt={m.name} />
                      </Col>
                      <Col md="9">
                        <h3 style={{ marginBottom: 0 }}>{m.name}</h3>
                        <h5 style={{ marginBottom: 0 }}>{m.party.name}</h5>
                        <a href={`${API.baseURL}/plan/${m._id}`} target="_blank" rel="noopener noreferrer">
                          Ver plan de gobierno
                        </a>
                        <br />
                        <Button
                          className="btn-round"
                          size="sm"
                          color="info"
                          onClick={() => {
                            const { city } = this.state.voter;
                            this.setState({
                              mayor: {
                                _id: m._id,
                                location: city,
                                name: m.name
                              }
                            });
                            this.nextStep();
                          }}
                        >
                          Votar
                        </Button>
                      </Col>
                    </Row>
                  );
                })}
              {this.state.isMayors && this.state.mayors.length === 0 && (
                <Row>
                  <Col md="12" style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
                    <h4>No hay alcaldes inscritos</h4>
                    <Button className="btn-fill" color="primary" form="form" formTarget="form" type="submit">
                      Continuar
                    </Button>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Form>
      </div>
    );
  };

  ChangeMayor = () => {
    if (this.state.mayor.name) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <h4 style={{ display: "inline" }}>
            <span>
              Para Alcalde: <b>{this.state.mayor.name}</b>
            </span>
          </h4>
          <Button
            className="btn-round"
            size="sm"
            color="success"
            onClick={() => {
              this.setState({ step: 2 });
            }}
          >
            Cambiar
          </Button>
        </div>
      );
    } else {
      return null;
    }
  };

  ConfirmateVote = () => {
    return (
      <div className="content">
        {this.ChangePlace()}
        {this.ReinsertIdentification()}
        {this.ChangeGovernor()}
        {this.ChangeMayor()}
        {this.state.mayor.name !== "" || this.state.governor.name !== "" ? (
          <Row>
            <Col md="12" style={{ justifyContent: "center", display: "flex" }}>
              <h4>
                Señor {this.state.voter.name} C.C {this.state.voter.identification}
              </h4>
            </Col>
            {this.state.governor.name !== "" && (
              <Col md="12" style={{ justifyContent: "center", display: "flex" }}>
                <h4>Va a votar por Gobernación por: {this.state.governor.name}</h4>
              </Col>
            )}
            {this.state.mayor.name !== "" && (
              <Col md="12" style={{ justifyContent: "center", display: "flex" }}>
                <h4>Y Alcaldía por: {this.state.mayor.name}</h4>
              </Col>
            )}
            <Col md="12" style={{ justifyContent: "center", display: "flex" }}>
              <h4>¿Está seguro?</h4>
            </Col>
            <Col md="12" style={{ justifyContent: "center", display: "flex" }}>
              <Button className="btn-round" size="sm" color="info" onClick={this.sendVote}>
                SI
              </Button>
              <Button
                className="btn-round"
                size="sm"
                color="warning"
                onClick={() => {
                  window.location.reload();
                }}
              >
                NO
              </Button>
            </Col>
          </Row>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h4>Intente nuevamente</h4>
            <Button
              className="btn-fill"
              color="primary"
              onClick={() => {
                window.location.reload();
              }}
            >
              Recargar
            </Button>
          </div>
        )}
      </div>
    );
  };

  render() {
    switch (this.state.step) {
      case 1:
        return this.ChooseGovernor();
      case 2:
        return this.ChooseMayor();
      case 3:
        return this.ConfirmateVote();
      default:
        return this.InsertIdentification();
    }
  }
}

export default Vote;
