import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../images/logo.svg";

class Header extends React.Component {
  state = {
    width: null,
    height: null,
    isModalHeaderOpened: true
  };
  handleOpenModal() {
    this.setState({ isModalHeaderOpened: true });
  }

  handleCloseModal() {
    this.setState({ isModalHeaderOpened: false });
  }

  updateDimensions = async () => {
    await this.setState({
      width: window.innerWidth,
      height: window.innerHeigh
    });
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <>
        <div className="header">
          <div className="onglets">
            <Link to="/">
              <Logo />
            </Link>
            {this.state.width > 1000 ? (
              <div className="onglets">
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
                  <h3 style={{ color: "white", fontSize: "14px" }}>
                    MES OFFRES
                  </h3>
                </Link>
              </div>
            ) : null}
          </div>
          {this.state.width > 1000 ? (
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
                  <h4 style={{ color: "white", fontSize: "14px" }}>
                    Se connecter
                  </h4>
                )}
              </Link>
            </div>
          ) : (
            <div className="identification">
              {!this.state.isModalHeaderOpened ? (
                <i
                  onClick={() => this.handleOpenModal()}
                  className="fas fa-bars"
                  style={{
                    color: "white",
                    fontSize: "30px",
                    cursor: "pointer"
                  }}
                />
              ) : (
                <i
                  onClick={() => this.handleCloseModal()}
                  className="fas fa-times"
                  style={{
                    color: "white",
                    fontSize: "30px",
                    cursor: "pointer"
                  }}
                />
              )}
            </div>
          )}
        </div>
        <div
          className={
            this.state.isModalHeaderOpened && this.state.width < 1000
              ? "modalHeaderActive"
              : "modalHeaderInactive"
          }
        >
          <Link
            style={{ textDecoration: "none" }}
            to={this.props.token ? `/publish` : `/connect`}
          >
            <h4
              style={{ color: "white", fontSize: "20px", alignSelf: "center" }}
            >
              DEPOSER UNE OFFRE
            </h4>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/offers">
            <h4 style={{ color: "white", fontSize: "20px" }}>OFFRES</h4>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            to={this.props.token ? `/myoffers` : `/connect`}
          >
            <h4 style={{ color: "white", fontSize: "20px" }}>MES OFFRES</h4>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/sign_up`}
          >
            <h4 style={{ color: "white", fontSize: "20px" }}>
              CREER UN COMPTE
            </h4>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/connect`}
          >
            {this.props.token ? (
              <h4
                onClick={this.props.deconnect}
                style={{ color: "white", fontSize: "20px" }}
              >
                SE DECONNECTER
              </h4>
            ) : (
              <h4 style={{ color: "white", fontSize: "20px" }}>SE CONNECTER</h4>
            )}
          </Link>
        </div>
      </>
    );
  }
}

export default Header;
