/* eslint-disable no-self-compare */
import React from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Input } from "reactstrap";
import shortid from "shortid";
import { getChartData } from "../variables/charts";
import API from "../API";
import Cities from "../API/Cities";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGovernors: false,
      governors: [
        {
          charge: "GOBERNADOR",
          location: "Atlántico",
          name: "Rodolfo Hernandez",
          party: {
            name: "CENTRO DEMOCRÁTICO"
          },
          votes: 2
        }
      ],
      isMayors: false,
      mayors: [
        {
          charge: "GOBERNADOR",
          location: "Atlántico",
          name: "Rodolfo Hernandez",
          party: {
            name: "CENTRO DEMOCRÁTICO"
          },
          votes: 2
        }
      ],
      locationGovernor: "",
      isLocationGovernors: false,
      locationGovernors: {
        data: [],
        label: []
      },
      locationMayor: "",
      isLocationMayors: false,
      locationMayors: {
        data: [],
        label: []
      }
    };
  }

  async componentDidMount() {
    const paramsg = API.getParams({ charge: "GOBERNADOR" });
    const rg = await API.vote.get(paramsg);
    let governors = rg.data.sort((a, b) => b.votes - a.votes);
    governors = governors.filter((thing, index, self) => index === self.findIndex(t => t.location === thing.location));
    const paramsa = API.getParams({ charge: "ALCALDE" });
    const ra = await API.vote.get(paramsa);
    let mayors = ra.data.sort((a, b) => b.votes - a.votes);
    mayors = mayors.filter((thing, index, self) => index === self.findIndex(t => t.location === thing.location));
    this.setState({ governors, isGovernors: true, mayors, isMayors: true });
  }

  getLocationGovernors = async location => {
    const params = API.getParams({ charge: "GOBERNADOR", location });
    const r = await API.vote.get(params);
    if (r.data.length === 0) return this.setState({ isLocationGovernors: false });
    const label = r.data.map(g => {
      return g.name;
    });
    const data = r.data.map(g => {
      return g.votes;
    });
    const locationGovernors = {
      data,
      label
    };
    this.setState({ locationGovernors, isLocationGovernors: true });
  };

  getLocationMayors = async location => {
    const params = API.getParams({ charge: "ALCALDE", location });
    const r = await API.vote.get(params);
    if (r.data.length === 0) return this.setState({ isLocationMayors: false });
    const label = r.data.map(g => {
      return g.name;
    });
    const data = r.data.map(g => {
      return g.votes;
    });
    const locationMayors = {
      data,
      label
    };
    this.setState({ locationMayors, isLocationMayors: true });
  };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="6">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h3">Gobernación</CardTitle>
                </CardHeader>
                <CardBody>
                  <Input
                    type="select"
                    required
                    id="state"
                    name="select"
                    value={this.state.locationGovernor}
                    onChange={e => {
                      this.setState({ locationGovernor: e.target.value });
                      this.getLocationGovernors(e.target.value);
                    }}
                  >
                    <option></option>
                    {Cities.map(c => {
                      return (
                        <option key={shortid.generate()} value={c.state} style={{ color: "black" }}>
                          {c.state}
                        </option>
                      );
                    })}
                  </Input>
                  <br />
                  {this.state.isLocationGovernors && (
                    <div className="chart-area">
                      <Bar
                        data={getChartData(this.state.locationGovernors.label, this.state.locationGovernors.data).data}
                        options={getChartData(this.state.locationGovernors.label, this.state.locationGovernors.data).options}
                      />
                    </div>
                  )}
                  {!this.state.isLocationGovernors && this.state.locationGovernor !== "" && <h5 style={{ paddingLeft: "15px" }}>No hay datos aún</h5>}
                </CardBody>
              </Card>
            </Col>
            <Col lg="6">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h3">Alcaldía</CardTitle>
                </CardHeader>
                <CardBody>
                  <Input
                    type="select"
                    required
                    id="city"
                    name="select"
                    value={this.state.locationMayor}
                    onChange={e => {
                      this.setState({ locationMayor: e.target.value });
                      this.getLocationMayors(e.target.value);
                    }}
                  >
                    <option></option>
                    {Cities.map(c => {
                      return c.cities.map(s => {
                        return (
                          <option key={shortid.generate()} value={`${s}##${c.state}`} style={{ color: "black" }}>
                            {`${c.state} - ${s}`}
                          </option>
                        );
                      });
                    })}
                  </Input>
                  <br />
                  {this.state.isLocationMayors && (
                    <div className="chart-area">
                      <Bar
                        data={getChartData(this.state.locationMayors.label, this.state.locationMayors.data).data}
                        options={getChartData(this.state.locationMayors.label, this.state.locationMayors.data).options}
                      />
                    </div>
                  )}
                  {!this.state.isLocationMayors && this.state.locationMayor !== "" && <h5 style={{ paddingLeft: "15px" }}>No hay datos aún</h5>}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="12" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Ganadores actuales</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="6">
                      <h4>Gobernadores</h4>
                      <Table className="tablesorter" responsive>
                        <thead className="text-primary">
                          <tr>
                            <th>Nombre</th>
                            <th>Departamento</th>
                            <th>Votos</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.isGovernors &&
                            this.state.governors.map(v => {
                              return (
                                <tr key={shortid.generate()}>
                                  <td>{v.name}</td>
                                  <td>{v.location}</td>
                                  <td>{v.votes}</td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                    </Col>
                    <Col sm="6">
                      <h4>Alcaldes</h4>
                      <Table className="tablesorter" responsive>
                        <thead className="text-primary">
                          <tr>
                            <th>Nombre</th>
                            <th>Ciudad</th>
                            <th>Votos</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.isMayors &&
                            this.state.mayors.map(v => {
                              return (
                                <tr key={shortid.generate()}>
                                  <td>{v.name}</td>
                                  <td>{v.location}</td>
                                  <td>{v.votes}</td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
