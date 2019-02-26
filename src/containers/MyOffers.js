import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
class MyOffers extends React.Component {
  state = {
    offers: []
  };

  handleDelete = async offer => {
    await axios.get(
      `https://leboncoin-server.herokuapp.com/myoffers/delete/${offer}`
    );
    this.componentDidMount();
  };
  render() {
    return (
      <div>
        <p
          style={{
            color: "#F16B3E",
            fontWeight: "bold",
            fontSize: "26px",
            marginLeft: "150px"
          }}
        >
          Mes offres
        </p>
        <ul className="offersList">
          {this.state.offers.length > 0 ? (
            this.state.offers.map(offer => {
              return (
                <li
                  style={{ justifyContent: "space-between" }}
                  className="offers"
                  key={offer._id}
                >
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/offers/offer/${offer._id}`}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <div className="image">
                        {offer.pictures.length > 0 ? (
                          <img
                            style={{
                              objectFit: "contain",
                              width: "150px",
                              height: "100px"
                            }}
                            alt="offer"
                            src={offer.pictures[0]["secure_url"]}
                          />
                        ) : null}
                      </div>
                      <div className="description">
                        <span
                          style={{
                            marginBottom: "10px",
                            fontWeight: "bold",
                            color: "#416F9A"
                          }}
                        >
                          {offer.title}
                        </span>
                        <span style={{ color: "#f36a35", fontWeight: "bold" }}>
                          {offer.price}
                          {" € "}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingRight: "20px"
                    }}
                  >
                    <button
                      onClick={() => this.handleDelete(offer._id)}
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
                      Supprimer cette annonce
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <div>
              <p style={{ paddingLeft: "10px" }}>
                Vous n'avez publié aucune offre à ce jour
              </p>
            </div>
          )}
        </ul>
      </div>
    );
  }

  componentDidMount = async () => {
    let offers = [...this.state.offers];
    const response = await axios.get(
      `https://leboncoin-server.herokuapp.com/myoffers`,
      {
        headers: {
          authorization: "Bearer " + this.props.token
        }
      }
    );
    offers = response.data;
    console.log(offers);
    this.setState({ offers: offers });
  };
}

export default MyOffers;
