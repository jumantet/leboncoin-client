import React from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
class Offer extends React.Component {
  state = {
    offer: {},
    user: "",
    pictures: []
  };

  displayImages = () => {
    let display = [];
    for (let i = 0; i < this.state.pictures.length; i++) {
      display.push(
        <div key={i} style={{ backgroundColor: "#D3D3D3" }}>
          <img
            alt={i}
            className="imageOfferSelected"
            src={this.state.pictures[i]}
          />
        </div>
      );
    }
    return display;
  };

  render() {
    return (
      <div className="offertotal">
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
          integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
          crossOrigin="anonymous"
        />
        <div className="offer">
          {this.state.pictures.length > 0 ? (
            <Carousel>{this.displayImages()}</Carousel>
          ) : null}
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
            className="fas fa-user"
          />
          <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
            {this.state.user}
          </span>
        </div>
      </div>
    );
  }
  componentDidMount = async () => {
    let offer = { ...this.state.offer };

    const response = await axios.get(
      `https://leboncoin-server.herokuapp.com/offer/${
        this.props.match.params.id
      }`
    );

    offer = response.data;

    this.setState({
      offer: offer,
      user: offer.creator.account.username,
      pictures: offer.pictures
    });
  };
}

export default Offer;
