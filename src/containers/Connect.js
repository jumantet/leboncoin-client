import React from "react";
import { Link } from "react-router-dom";

class Connect extends React.Component {
  state = {
    mail: "",
    password: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",

            flexDirection: "column",
            alignItems: "center",
            margin: "20px 150px",
            padding: "20px 40px",
            backgroundColor: "white"
          }}
        >
          <div style={{ width: "50%" }}>
            <h4
              style={{
                margin: 0,
                textAlign: "center",
                paddingBottom: "10px",
                borderBottom: "solid 2px #F56B2A"
              }}
            >
              Connexion
            </h4>
            <form
              onSubmit={async event => {
                event.preventDefault();
                await this.props.connectTo({
                  email: this.state.mail,
                  password: this.state.password
                });
                this.props.history.push("/offers");
              }}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h5 style={{ margin: "20px 0 0 0" }}>Adresse email</h5>
              <input
                style={{
                  width: "100%",
                  height: "30px",
                  border: "solid 1px #EAEAEA",
                  borderRadius: "5px",
                  margin: "10px 0"
                }}
                name="mail"
                onChange={this.handleChange}
                value={this.state.mail}
              />
              <h5 style={{ margin: 0 }}>Mot de passe</h5>
              <input
                style={{
                  width: "100%",
                  height: "30px",
                  border: "solid 1px #EAEAEA",
                  borderRadius: "5px",
                  margin: "10px 0"
                }}
                type="password"
                onChange={this.handleChange}
                name="password"
                value={this.state.password}
              />
              <input
                style={{
                  backgroundColor: "#4183D7",
                  width: "100%",
                  height: "30px",
                  fontSize: "12px",
                  color: "white",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginBottom: "10px"
                }}
                type="submit"
                value="Se connecter"
              />
            </form>
            <h4
              style={{
                textAlign: "center",
                padding: "10px 0",
                borderTop: "solid 1px #DDDDDD"
              }}
            >
              Vous n'avez pas de compte ?
            </h4>
            <Link to="/sign_up">
              <button
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "30px",
                  fontSize: "12px",
                  color: "#4183D7",
                  fontWeight: "bold",
                  border: "solid 1px #4183D7",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginBottom: "10px"
                }}
              >
                Créer un compte
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Connect;
