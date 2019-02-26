import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../images/logo.svg";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="onglets">
          <Link to="/">
            <Logo />
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            to={this.props.token ? `/publish` : `/connect`}
          >
            <h3 style={{ color: "white", fontSize: "14px" }}>
              DEPOSER UNE OFFRE
            </h3>
          </Link>

          <Link style={{ textDecoration: "none" }} to="/offers">
            <h3 style={{ color: "white", fontSize: "14px" }}>OFFRES</h3>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            to={this.props.token ? `/myoffers` : `/connect`}
          >
            <h3 style={{ color: "white", fontSize: "14px" }}>MES OFFRES</h3>
          </Link>
        </div>
        <div className="identification">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/sign_up`}
          >
            <h4 style={{ color: "white", fontSize: "14px" }}>
              Créer un compte
            </h4>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/connect`}
          >
            {this.props.token ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <h4 style={{ color: "white", fontSize: "14px" }}>
                  Bienvenue {this.props.userName}
                </h4>
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
              <h4 style={{ color: "white", fontSize: "14px" }}>Se connecter</h4>
            )}
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
