import React from "react";
import classNames from "classnames";
import { Collapse, DropdownToggle, DropdownMenu, UncontrolledDropdown, Input, NavbarBrand, Navbar, NavLink, Nav, Container, Form, Button } from "reactstrap";
import API from "../../API";

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "navbar-transparent",
      identification: 0
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }

  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-white"
      });
    } else {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };

  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent"
      });
    } else {
      this.setState({
        color: "bg-white"
      });
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };

  login = async () => {
    const { identification } = this.state;
    if (identification === 0) {
      window.localStorage.setItem("type", "admin");
      window.location.reload();
      return;
    }
    const r = await API.voter.get("identification=" + identification);
    if (r.data.length) {
      window.localStorage.setItem("user", JSON.stringify(r.data[0]));
      window.localStorage.setItem("type", "voter");
      window.location.reload();
    }
  };

  render() {
    const type = window.localStorage.getItem("type");
    const user = JSON.parse(window.localStorage.getItem("user"));
    return (
      <>
        <Navbar className={classNames("navbar-absolute", this.state.color)} expand="lg">
          <Container fluid>
            <div className="navbar-wrapper">
              <div
                className={classNames("navbar-toggle d-inline", {
                  toggled: this.props.sidebarOpened
                })}
              >
                <button className="navbar-toggler" type="button" onClick={this.props.toggleSidebar}>
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand href="/" onClick={e => e.preventDefault()}>
                {this.props.brandText}
              </NavbarBrand>
            </div>
            <button
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navigation"
              data-toggle="collapse"
              id="navigation"
              type="button"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            <Collapse navbar isOpen={this.state.collapseOpen}>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle caret color="default" data-toggle="dropdown" nav onClick={e => e.preventDefault()}>
                    <div className="photo">
                      <img alt="..." src={require("assets/img/anime3.png")} />
                    </div>
                    <b className="caret d-none d-lg-block d-xl-block" />
                    <p className="d-lg-none">Log out</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    <NavLink tag="li">
                      {type ? (
                        <>
                          <h2 style={{ textAlign: "center", color: "black", marginBottom: 0 }}>{user ? user.name : "Admin"}</h2>
                          <Button
                            color="link"
                            onClick={() => {
                              window.localStorage.removeItem("user");
                              window.localStorage.removeItem("type");
                              window.location.reload();
                            }}
                          >
                            Cerrar sesión
                          </Button>
                        </>
                      ) : (
                        <Form
                          onSubmit={e => {
                            e.preventDefault();
                            this.login();
                          }}
                        >
                          <Input
                            style={{ color: "black" }}
                            placeholder="SEARCH"
                            type="number"
                            value={this.state.identification}
                            onChange={e => this.setState({ identification: e.target.value })}
                          />
                        </Form>
                      )}
                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <li className="separator d-lg-none" />
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
