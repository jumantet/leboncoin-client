import React from "react";
import axios from "axios";

class SignUp extends React.Component {
  state = {
    pseudo: "",
    mail: "",
    mdp: "",
    mdpconfirm: "",
    salesconditions: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  checkBox = () => {
    let salesconditions = this.state.salesconditions;
    let isAccepted;
    if (salesconditions === false) {
      isAccepted = true;
    } else if (salesconditions === true) {
      isAccepted = false;
    }
    this.setState({ salesconditions: isAccepted }, () => {
      console.log(this.state);
    });
  };
  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
          integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
          crossorigin="anonymous"
        />
        <div
          style={{
            display: "flex",
            margin: "20px 150px",
            padding: "20px 40px",
            backgroundColor: "white"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "1",
              marginRight: "10px"
            }}
          >
            <h3 style={{ margin: "0" }}>Pourquoi créer un compte ?</h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div>
                <i
                  style={{
                    color: "#4183D7",
                    fontSize: "50px"
                  }}
                  className="far fa-clock"
                />
              </div>
              <div style={{ width: "350px", marginTop: "10px" }}>
                {" "}
                <h5>Gagnez du temps</h5>
                <p style={{ fontSize: "14px" }}>
                  Publiez vos annonces rapidement, avec vos informations
                  pré-remplies chaque fois que vous souhaitez déposer une
                  nouvelle annonce.
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div>
                <i
                  style={{
                    color: "#4183D7",
                    fontSize: "50px"
                  }}
                  className="fas fa-bell"
                />
              </div>
              <div style={{ width: "350px" }}>
                {" "}
                <h5>Soyez les premiers informés</h5>
                <p style={{ fontSize: "14px" }}>
                  Créez des alertes Immo ou Emploi et ne manquez jamais
                  l'annonce qui vous intéresse.
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div style={{ textAlign: "center" }}>
                <i
                  style={{
                    color: "#4183D7",
                    fontSize: "50px"
                  }}
                  className="far fa-eye"
                />
              </div>
              <div style={{ width: "350px" }}>
                {" "}
                <h5>Visibilité</h5>
                <p style={{ fontSize: "14px" }}>
                  Suivez les statistiques de vos annonces (nombre de fois où
                  votre annonce a été vue, nombre de contact reçus).
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
            <h3
              style={{
                margin: "0",
                paddingBottom: "10px",
                textAlign: "center",
                borderBottom: "solid 2px #F56B2A "
              }}
            >
              Créez un compte
            </h3>
            <form
              onSubmit={event => {
                event.preventDefault();
                this.props.signUpTo({
                  username: this.state.pseudo,
                  email: this.state.mail,
                  password: this.state.mdp
                });
                this.props.history.push("/offers");
              }}
            >
              <div style={{ marginTop: "20px" }}>
                <h5 style={{ margin: 0 }}>Pseudo</h5>
                <input
                  style={{
                    width: "100%",
                    height: "30px",
                    border: "solid 1px #EAEAEA",
                    borderRadius: "5px",
                    margin: "10px 0"
                  }}
                  onChange={this.handleChange}
                  value={this.state.pseudo}
                  name="pseudo"
                />
                <h5 style={{ margin: 0 }}>Adresse email</h5>
                <input
                  style={{
                    width: "100%",
                    height: "30px",
                    border: "solid 1px #EAEAEA",
                    borderRadius: "5px",
                    margin: "10px 0"
                  }}
                  onChange={this.handleChange}
                  value={this.state.mail}
                  name="mail"
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "48%"
                  }}
                >
                  <h5 style={{ margin: 0 }}>Mot de passe</h5>
                  <input
                    type="password"
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "solid 1px #EAEAEA",
                      borderRadius: "5px",
                      margin: "10px 0"
                    }}
                    onChange={this.handleChange}
                    value={this.state.mdp}
                    name="mdp"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "48%"
                  }}
                >
                  <h5 style={{ margin: 0 }}>Confirmer le mot de passe</h5>
                  <input
                    type="password"
                    style={{
                      width: "100%",
                      height: "30px",
                      border: "solid 1px #EAEAEA",
                      borderRadius: "5px",
                      margin: "10px 0"
                    }}
                    onChange={this.handleChange}
                    value={this.state.mdpconfirm}
                    name="mdpconfirm"
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px"
                }}
              >
                <input
                  onClick={this.checkBox}
                  value={this.state.salesconditions}
                  name="salesconditions"
                  type="checkbox"
                />
                <p style={{ fontSize: "14px" }}>
                  "J'accepte les Conditions Générales de Vente"
                </p>
              </div>
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
                  cursor: "pointer"
                }}
                type="submit"
                value="Créer mon compte personnel"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
