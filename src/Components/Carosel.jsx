import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import "./../Assets/Carosel.css";
// Import Materialize
// import M from "materialize-css";
const Carosel = props => {
  // class Carosel extends Component {
  //   componentDidMount() {
  //     // Auto initialize all the things!
  //     M.AutoInit();
  //   }

  return (
    <a className="carousel-item z-depth-5" href="#">
      <img
        className="z-depth-5"
        style={{
          marginTop: "-15rem",
          borderRadius: "25px 25px 25px 25px"
        }}
        src={props.image}
      />
      <h3
        style={{
          borderRadius: "15px 15px 15px 15px",
          marginTop: "-200px",
          color: "white"
        }}
      >
        {props.title}
      </h3>
    </a>
  );
};

export default Carosel;
