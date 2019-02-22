import React from "react";

class Search extends React.Component {
  render() {
    return (
      <div className="search">
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
          integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
          crossOrigin="anonymous"
        />
        <div>
          <input
            style={{ border: "none", borderRadius: "5px", padding: "5px" }}
            className="searchTitle"
            value={this.props.search}
            onChange={this.props.handleChangeSearch}
            placeholder="Que recherchez-vous ?"
          />
          <div style={{ fontSize: "12px", margin: "10px" }}>
            {" "}
            <span style={{ marginRight: "5px", fontWeight: "bold" }}>
              Prix entre
            </span>
            <input
              style={{ border: "none", borderRadius: "5px", padding: "5px" }}
              value={this.props.priceMin}
              onChange={this.props.handleChangePriceMin}
              placeholder="Prix min"
            />
            <span style={{ margin: "0 5px", fontWeight: "bold" }}>et</span>
            <input
              style={{ border: "none", borderRadius: "5px", padding: "5px" }}
              value={this.props.priceMax}
              onChange={this.props.handleChangePriceMax}
              placeholder="Prix max"
            />
          </div>
        </div>
        <i
          style={{
            color: "#4584d4",
            marginLeft: "50px",
            marginRight: "10px",
            paddingTop: "8px",
            cursor: "pointer"
          }}
          onClick={this.props.refreshSearch}
          className="fas fa-sync-alt"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "20%"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              style={{ width: "100%", fontWeight: "bold" }}
              className="buttonSearch"
              onClick={this.props.handleSearch}
            >
              Rechercher
            </button>
          </div>

          <select
            onChange={this.props.handleChangeSort}
            value={this.props.sort}
          >
            <option value="">Options de recherche</option>
            <option value="date-desc">Tri : plus récentes</option>
            <option value="date-asc">Tri : plus anciennes</option>
            <option value="price-desc">Tri : prix décroissant</option>
            <option value="price-asc">Tri : prix croissant</option>
          </select>
        </div>
      </div>
    );
  }
}

export default Search;
