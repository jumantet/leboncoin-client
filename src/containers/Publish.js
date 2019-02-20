import React from "react";
import ReactFileReader from "react-file-reader";
import axios from "axios";
class Publish extends React.Component {
  state = {
    title: null,
    description: null,
    price: null,
    files: []
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFiles = files => {
    const newFiles = [...this.state.files, ...files.base64];
    console.log("newFiles", newFiles);
    this.setState({ files: newFiles });
  };

  handlePublish = async () => {
    const response = await axios.post(
      "https://leboncoin-api.herokuapp.com/api/offer/publish",
      {
        title: this.state.title,
        description: this.state.description,
        files: this.state.files,
        price: Number(this.state.price)
      },
      {
        headers: {
          authorization: "Bearer " + this.props.token
        }
      }
    );
    console.log(response.data);
    this.props.history.push(`/offers/offer/${response.data._id}`);
  };
  render() {
    const filesArray = [];
    for (let i = 0; i < this.state.files.length; i++) {
      filesArray.push(
        <div style={{ display: "flex" }}>
          <img
            key={i}
            style={{
              height: "70px",
              width: "70px",
              objectFit: "cover",
              margin: "5px 5px"
            }}
            src={this.state.files[i]}
            alt="Annonce"
          />
          <i
            onClick={() => {
              const newFiles = [...this.state.files];
              newFiles.splice(i, 1);
              this.setState({ files: newFiles });
            }}
            style={{ color: "red", cursor: "pointer" }}
            className="fas fa-times"
          />
        </div>
      );
    }
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
          integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
          crossorigin="anonymous"
        />
        <div style={{ margin: "50px 150px 0 150px", backgroundColor: "white" }}>
          <div
            style={{
              backgroundColor: "#666666",
              height: "40px",
              paddingLeft: "10px",
              display: "flex",
              alignItems: "center"
            }}
          >
            <h5 style={{ color: "white" }}>Votre annonce</h5>
          </div>
          <form style={{ paddingLeft: "10px", width: "50%" }}>
            <h5>Titre de l'annonce</h5>
            <input
              style={{
                width: "100%",
                height: "30px",
                borderRadius: "5px",
                border: "solid 1px #DADADA"
              }}
              onChange={this.handleChange}
              name="title"
              value={this.state.title}
              type="text"
            />
            <h5>Description de l'annonce</h5>
            <textarea
              onChange={this.handleChange}
              name="description"
              style={{
                resize: "none",
                borderRadius: "5px",
                paddingRight: "5px",
                border: "solid 1px #DADADA"
              }}
              value={this.state.description}
              rows="15"
              cols="77"
            />
            <h5 style={{ color: "#F36B35", marginTop: "10px" }}>
              Ajouter des photos
            </h5>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap"
              }}
            >
              <ReactFileReader
                fileTypes={[".png", ".jpg"]}
                base64={true}
                multipleFiles={true} // `false si une seule image`
                handleFiles={this.handleFiles}
              >
                {filesArray[0] ? (
                  filesArray[0]
                ) : (
                  <i
                    style={{
                      color: "#F36B35",
                      fontSize: "60px",
                      marginTop: "10px"
                    }}
                    className="fas fa-camera"
                  />
                )}
              </ReactFileReader>
              <ReactFileReader
                fileTypes={[".png", ".jpg"]}
                base64={true}
                multipleFiles={true} // `false si une seule image`
                handleFiles={this.handleFiles}
              >
                {filesArray[1] ? (
                  filesArray[1]
                ) : (
                  <i
                    style={{
                      color: "#F36B35",
                      fontSize: "60px",
                      marginTop: "10px"
                    }}
                    className="fas fa-camera"
                  />
                )}
              </ReactFileReader>
              <ReactFileReader
                fileTypes={[".png", ".jpg"]}
                base64={true}
                multipleFiles={true} // `false si une seule image`
                handleFiles={this.handleFiles}
              >
                {filesArray[2] ? (
                  filesArray[2]
                ) : (
                  <i
                    style={{
                      color: "#F36B35",
                      fontSize: "60px",
                      marginTop: "10px"
                    }}
                    className="fas fa-camera"
                  />
                )}
              </ReactFileReader>
              <ReactFileReader
                fileTypes={[".png", ".jpg"]}
                base64={true}
                multipleFiles={true} // `false si une seule image`
                handleFiles={this.handleFiles}
              >
                {filesArray[3] ? (
                  filesArray[3]
                ) : (
                  <i
                    style={{
                      color: "#F36B35",
                      fontSize: "60px",
                      marginTop: "10px"
                    }}
                    className="fas fa-camera"
                  />
                )}
              </ReactFileReader>
              <ReactFileReader
                fileTypes={[".png", ".jpg"]}
                base64={true}
                multipleFiles={true} // `false si une seule image`
                handleFiles={this.handleFiles}
              >
                {filesArray[4] ? (
                  filesArray[4]
                ) : (
                  <i
                    style={{
                      color: "#F36B35",
                      fontSize: "60px",
                      marginTop: "10px"
                    }}
                    className="fas fa-camera"
                  />
                )}
              </ReactFileReader>
            </div>

            <h5>Prix</h5>
            <input
              style={{
                width: "100%",
                height: "30px",
                borderRadius: "5px",
                border: "solid 1px #DADADA",
                marginBottom: "10px"
              }}
              onChange={this.handleChange}
              name="price"
              value={this.state.number}
              type="number"
            />
          </form>
        </div>
        <button
          style={{
            margin: "10px 150px",
            backgroundColor: "#4584d4",
            borderRadius: "5px",
            color: "white",
            height: "30px",
            width: "200px",
            fontWeight: "bold"
          }}
          onClick={this.handlePublish}
        >
          Valider
        </button>
      </div>
    );
  }
}

export default Publish;
