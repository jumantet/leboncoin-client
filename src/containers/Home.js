import React from "react";
import { Link } from "react-router-dom";
class Home extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
          integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
          crossorigin="anonymous"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <h5>
            Trouvez la bonne affaire parmi 27 000 000 de petites annonces sur
            leboncoin
          </h5>
          <Link to={this.props.token ? "/publish" : "/connect"}>
            <button
              style={{
                color: "white",
                backgroundColor: "#4584d4",
                borderRadius: "5px",
                height: "50px",
                width: "300px",
                fontWeight: "bold",
                fontSize: "18px"
              }}
            >
              <i
                style={{ marginRight: "5px" }}
                className="far fa-plus-square"
              />
              Déposer une annonce
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
