import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="onglets">
          <img className="logo" src={require("../images/leboncoin.png")} />
          <h3 style={{ color: "#f36a35", fontSize: "16px" }}>
            DEPOSER UNE OFFRE
          </h3>
          <Link style={{ textDecoration: "none" }} to="/offers">
            <h3 style={{ color: "#f36a35", fontSize: "16px" }}>OFFRES</h3>
          </Link>
        </div>
        <div className="identification">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/sign_up`}
          >
            <h4>Créer un compte</h4>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/connect`}
          >
            {this.props.token ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <h4>Bienvenue {this.props.userName}</h4>
                <button
                  onClick={this.props.deconnect}
                  style={{
                    backgroundColor: "#4183D7",
                    height: "30px",
                    fontSize: "12px",
                    color: "white",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Se déconnecter
                </button>
              </div>
            ) : (
              <h4>Se connecter</h4>
            )}
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
