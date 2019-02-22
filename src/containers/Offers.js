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
    search: Cookies.get("search") || null,
    priceMin: Cookies.get("priceMin") || null,
    priceMax: Cookies.get("priceMax") || null,
    sort: Cookies.get("sort") || null
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
    console.log(this.state);
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
      `http://localhost:3100/offer/with-count?${filters}`
    );
    console.log(response.data);
    offers = response.data;
    this.setState({ offers: offers });
  };

  calculPages = () => {
    let pages = [];
    for (let i = 0; i < Math.floor(271 / 25); i++) {
      pages.push(i);
    }
    return (
      pages,
      pages.map((x, index) => {
        return (
          <span
            key={index}
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
      `http://localhost:3100/offer/with-count?skip=${this.state.page *
        25}&limit=25`
    );
    offers = response.data.offers;
    this.setState({ offers: offers });
  };

  render() {
    // console.log("offer", this.state.offers);
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
                style={{ textDecoration: "none" }}
                to={`/offers/offer/${offer._id}`}
              >
                <li className="offers" key={offer._id}>
                  <div className="image">
                    {offer.pictures.length > 0 ? (
                      <img
                        style={{
                          objectFit: "contain",
                          width: "150px",
                          height: "100px"
                        }}
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
    await this.handleSearch();
    //   let offers = [...this.state.offers];
    //   const response = await axios.get(
    //     `https://leboncoin-server.herokuapp.com/offer/with-count?skip=${this.state
    //       .page * 25}&limit=25`
    //   );
    //   offers = response.data.offers;
    //   this.setState({ offers: offers });
  };
}

export default Offers;
