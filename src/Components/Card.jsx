import React from "react";
import "materialize-css/dist/css/materialize.min.css";
// import "./Card.css";
import { Link } from "react-router-dom";

// Import Materialize
// import M from "materialize-css";

const Card = props => {
  // componentDidMount() {
  //   // Auto initialize all the things!
  //   M.AutoInit();
  // }
  const { title, description, key, image, id, author } = props;
  return (
    <div>
      <div className="col s12 m3" style={{}}>
        <div
          className="card z-depth-5"
          style={{ borderRadius: "12px 12px 12px 12px" }}
        >
          <div className="card-image ">
            {/* waves-effect waves-block waves-light */}
            <img
              style={{
                width: "100%",
                height: "20rem",
                objectFit: "cover",
                borderRadius: "12px 12px 0 0"
              }}
              className=""
              // className="activator"
              src={props.image}
            />
          </div>
          <div
            className="card-content"
            style={{
              borderRadius: "0 0 12px 12px"
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                display: "block",
                textOverflow: "ellipsis",
                overflow: "hidden",
                height: "30px"
              }}
              className="card-title grey-text text-darken-4"
              // className="card-title activator grey-text text-darken-4"
            >
              {" "}
              <i
                style={{ marginRight: "-9px" }}
                className="material-icons right"
              >
                more_vert
              </i>
              {title}
            </span>
            <p>
              <Link to={props.to}>Detail</Link>
            </p>
          </div>
          <div
            className="card-reveal"
            style={{
              width: "100%",
              height: "101%",
              objectFit: "cover",
              borderRadius: "12px 12px 0 0"
            }}
          >
            <span className="card-title grey-text text-darken-4">
              {title}
              <i className="material-icons right">close</i>
            </span>
            <p>
              <b>
                <i>{author}</i>
              </b>
            </p>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
