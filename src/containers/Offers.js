import React from "react";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";

class Offers extends React.Component {
  state = {
    offers: [],
    page: 0,
    search: "",
    priceMin: "",
    priceMax: "",
    sort: ""
  };

  handleChangeSearch = event => {
    const value = event.target.value;
    this.setState({ search: value });
  };
  handleChangePriceMin = event => {
    const value = event.target.value;
    this.setState({ priceMin: Number(value) });
  };
  handleChangePriceMax = event => {
    const value = event.target.value;
    this.setState({ priceMax: Number(value) });
  };
  handleChangeSort = event => {
    console.log("hello");
    const value = event.target.value;
    this.setState({ sort: value });
  };

  handleSearch = async () => {
    let filters = "";
    const parsed = queryString.parse(this.state.filters);
    let search = this.state.search;
    let priceMin = this.state.priceMin;
    let priceMax = this.state.priceMax;
    let sort = this.state.sort;

    if (search) {
      parsed.title = search;
    }

    if (priceMin) {
      parsed.priceMin = priceMin;
    }

    if (priceMax) {
      parsed.priceMax = priceMax;
    }

    if (sort) {
      parsed.sort = sort;
    }

    const stringified = queryString.stringify(parsed);

    filters = stringified;

    let offers = [...this.state.offers];
    const response = await axios.get(
      `https://leboncoin-api.herokuapp.com/api/offer/with-count?${filters}`
    );
    offers = response.data.offers;
    this.setState({ offers: offers });
  };

  calculPages = () => {
    let pages = [];
    for (let i = 0; i < Math.floor(271 / 25); i++) {
      pages.push(i);
    }
    return (
      pages,
      pages.map(x => {
        return (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => this.handleChangePage(x)}
            className="page"
          >
            {x}
          </span>
        );
      })
    );
  };

  handleChangePage = async page => {
    let copypage = this.state.page;
    copypage = page;
    this.setState({ page: copypage }, () => console.log(this.state.page));
    let offers = [...this.state.offers];
    const response = await axios.get(
      `https://leboncoin-api.herokuapp.com/api/offer/with-count?skip=${this
        .state.page * 25}&limit=25`
    );
    offers = response.data.offers;
    this.setState({ offers: offers });
  };

  render() {
    // console.log("offer", this.state.offers);
    return (
      <div>
        <Search
          handleChangePriceMin={this.handleChangePriceMin}
          handleChangePriceMax={this.handleChangePriceMax}
          handleChangeSort={this.handleChangeSort}
          offers={this.state.offers}
          priceMin={this.state.priceMin}
          priceMax={this.state.priceMax}
          sort={this.state.sort}
          handleChangeSearch={event => this.handleChangeSearch(event)}
          handleSearch={this.handleSearch}
          search={this.state.search}
        />
        <ul className="offersList">
          {this.state.offers.map(offer => {
            return (
              <Link
                style={{ textDecoration: "none" }}
                to={`/offers/offer/${offer._id}`}
              >
                <li className="offers" key={offer._id}>
                  <div className="image" />
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
                </li>
              </Link>
            );
          })}
        </ul>
        <div className="footer">{this.calculPages()}</div>
      </div>
    );
  }
  componentDidMount = async () => {
    let offers = [...this.state.offers];
    const response = await axios.get(
      `https://leboncoin-api.herokuapp.com/api/offer/with-count?skip=${this
        .state.page * 25}&limit=25`
    );
    offers = response.data.offers;
    this.setState({ offers: offers });
  };
}

export default Offers;
