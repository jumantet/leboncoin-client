import React from "react";
import axios from "axios";

class Offer extends React.Component {
  state = {
    offer: {},
    user: ""
  };
  render() {
    return (
      <div className="offertotal">
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
          integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
          crossorigin="anonymous"
        />
        <div className="offer">
          <div className="imageOffer" />
          <div className="title">
            <h2>{this.state.offer.title}</h2>
            <span style={{ fontWeight: "bold", color: "#f36a35" }}>
              {this.state.offer.price}
              {" € "}
            </span>
          </div>
          <h5 style={{ fontWeight: "bold" }}>Description</h5>
          <span>{this.state.offer.description}</span>
        </div>
        <div className="user">
          <i
            style={{ color: "#f36a35", fontSize: "50px" }}
            class="fas fa-user"
          />
          <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
            {this.state.user}
          </span>
        </div>
      </div>
    );
  }
  componentDidMount = async () => {
    let offer = { ...offer };
    const response = await axios.get(
      `https://leboncoin-api.herokuapp.com/api/offer/${
        this.props.match.params.id
      }`
    );

    offer = response.data;
    this.setState(
      {
        offer: offer,
        user: offer.creator.account.username
      },
      () => {
        console.log(this.state.user);
      }
    );
  };
}

export default Offer;
