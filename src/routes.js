import Dashboard from "views/Dashboard.jsx";
import AddCandidate from "views/AddCandidate.jsx";
import AddPlace from "views/AddPlace.jsx";
import AddParty from "views/AddParty.jsx";
import TableList from "views/TableList.jsx";
import UserProfile from "views/AddCharge.jsx";

var routes = [
  {
    path: "/results",
    name: "Resultados",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "both"
  },
  {
    path: "/add-location",
    name: "Añadir lugar de votación",
    icon: "tim-icons icon-square-pin",
    component: AddPlace,
    layout: "admin"
  },
  {
    path: "/add-party",
    name: "Añadir partido",
    icon: "tim-icons icon-bullet-list-67",
    component: AddParty,
    layout: "admin"
  },
  {
    path: "/add-charge",
    name: "Añadir cargos",
    icon: "tim-icons icon-bank",
    component: UserProfile,
    layout: "admin"
  },
  {
    path: "/add-candidate",
    name: "Añadir Candidato",
    icon: "tim-icons icon-single-02",
    component: AddCandidate,
    layout: "admin"
  },
  {
    path: "/add-voter",
    name: "Añadir votante",
    icon: "tim-icons icon-simple-add",
    component: TableList,
    layout: "admin"
  },
  {
    path: "/vote",
    name: "Votar",
    icon: "tim-icons icon-book-bookmark",
    component: TableList,
    layout: "voter"
  }
];
export default routes;
