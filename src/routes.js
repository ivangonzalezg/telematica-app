import Dashboard from "views/Dashboard.jsx";
import AddCandidate from "views/AddCandidate.jsx";
import AddPlace from "views/AddPlace.jsx";
import AddParty from "views/AddParty.jsx";
import Vote from "views/Vote.jsx";
import AddVoter from "views/AddVoter.jsx";
import AddCharge from "views/AddCharge.jsx";
import ChoosePlace from "views/ChoosePlace";

var routes = [
  {
    path: "/home",
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
    component: AddCharge,
    layout: "superadmin"
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
    component: AddVoter,
    layout: "admin"
  },
  {
    path: "/choose-location",
    name: "Elegir lugar de votación",
    icon: "tim-icons icon-square-pin",
    component: ChoosePlace,
    layout: "both"
  },
  {
    path: "/vote",
    name: "Votar",
    icon: "tim-icons icon-book-bookmark",
    component: Vote,
    layout: "both"
  }
];
export default routes;
