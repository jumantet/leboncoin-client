import React from "react";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import queryString from "query-string";

class Offers extends React.Component {
  state = {
    offers: [],
    page: 0,
    pageNumber: [],
    search: Cookies.get("search") || "",
    priceMin: Cookies.get("priceMin") || "",
    priceMax: Cookies.get("priceMax") || "",
    sort: Cookies.get("sort") || ""
  };

  refreshSearch = async () => {
    await Cookies.remove("search");
    await Cookies.remove("priceMin");
    await Cookies.remove("priceMax");
    await Cookies.remove("sort");
    await this.setState({
      search: "",
      priceMin: "",
      priceMax: "",
      sort: ""
    });
    this.handleSearch();
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
  handleChangeSort = async event => {
    const value = event.target.value;
    await this.setState({ sort: value });
    this.handleSearch();
  };

  handleSearch = async () => {
    let filters = "";
    const parsed = queryString.parse(this.state.filters);
    let search = this.state.search;
    let priceMin = this.state.priceMin;
    let priceMax = this.state.priceMax;
    let sort = this.state.sort;
    let skip = this.state.page;
    let limit = 25;

    parsed.skip = skip * 25;

    if (skip > 0) {
      await Cookies.set("page", skip);
    }
    parsed.limit = limit;

    if (search) {
      parsed.title = search;
      await Cookies.set("search", search);
    }

    if (priceMin) {
      parsed.priceMin = priceMin;
      await Cookies.set("priceMin", priceMin);
    }

    if (priceMax) {
      parsed.priceMax = priceMax;
      await Cookies.set("priceMax", priceMin);
    }

    if (sort) {
      parsed.sort = sort;
      await Cookies.set("sort", sort);
    }

    const stringified = queryString.stringify(parsed);

    filters = stringified;

    let offers = [...this.state.offers];

    const response = await axios.get(
      `https://leboncoin-server.herokuapp.com/offer/with-count?${filters}`
    );
    offers = response.data;
    this.setState({ offers: offers });
  };

  calculPages = async () => {
    let pageNumber = [...this.state.pageNumber];

    const response = await axios.get(
      "https://leboncoin-server.herokuapp.com/offer/with-count"
    );
    let offers = response.data;
    for (let i = 0; i < Math.floor(offers.length / 25); i++) {
      pageNumber.push(i);
    }
    this.setState({ pageNumber: pageNumber });
  };

  render() {
    return (
      <div>
        <Search
          refreshSearch={this.refreshSearch}
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
                key={offer._id}
                style={{ textDecoration: "none" }}
                to={`/offers/offer/${offer._id}`}
              >
                <li className="offers">
                  <div className="image">
                    {offer.pictures.length > 0 ? (
                      <img
                        style={{
                          objectFit: "contain",
                          width: "150px",
                          height: "100px"
                        }}
                        alt="offer"
                        src={offer.pictures[0]}
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
                </li>
              </Link>
            );
          })}
        </ul>
        <div className="footer">
          {this.state.pageNumber.map((number, index) =>
            number === this.state.page ? (
              <p key={index} style={{ fontWeight: "bold", marginRight: "5px" }}>
                {number}
              </p>
            ) : (
              <p
                key={index}
                onClick={async () => {
                  await this.setState({ page: number });
                  this.handleSearch();
                }}
                style={{ marginRight: "5px", cursor: "pointer" }}
              >
                {number}
              </p>
            )
          )}
        </div>
      </div>
    );
  }
  componentDidMount = async () => {
    await this.handleSearch();
    await this.calculPages();
  };
}

export default Offers;
