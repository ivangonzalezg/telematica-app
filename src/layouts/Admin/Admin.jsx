import React from "react";
import { Route, Switch } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import routes from "routes.js";
import logo from "assets/img/react-logo.png";
import shortid from "shortid";

var ps;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue",
      sidebarOpened: document.documentElement.className.indexOf("nav-open") !== -1
    };
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    if (window.location.pathname === "/") window.location.href = "/home";
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }

  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };

  getRoutes = routes => {
    const type = window.localStorage.getItem("type");
    return routes.map(prop => {
      if (prop.layout === "both" || type === prop.layout) {
        return <Route path={prop.path} component={prop.component} key={shortid.generate()} />;
      }
      return null;
    });
  };

  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };

  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (path === routes[i].path) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          bgColor={this.state.backgroundColor}
          logo={{
            outterLink: "/",
            text: "Creative Tim",
            imgSrc: logo
          }}
          toggleSidebar={this.toggleSidebar}
        />
        <div className="main-panel" ref="mainPanel" data={this.state.backgroundColor}>
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(window.location.pathname)}
            toggleSidebar={this.toggleSidebar}
            sidebarOpened={this.state.sidebarOpened}
          />
          <Switch>{this.getRoutes(routes)}</Switch>
        </div>
      </div>
    );
  }
}

export default Admin;
