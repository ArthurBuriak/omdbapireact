import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import "./Omdb.css";

export default class Omdb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieName: "",
      allMovie: [],
      hintMovie: [],
      errorSymbol: false,
      hintError: false,
    };
  }

  handleSearch = (event) => {
    if (
      event.target.value.match("^[a-zA-Z ]{1,20}$") != null ||
      event.target.value === ""
    ) {
      this.setState({ errorSymbol: false });
      this.setState({ movieName: event.target.value }, () => {
        fetch(
          `http://www.omdbapi.com/?apikey=f8be42f2&s=${this.state.movieName.toLocaleLowerCase()}`
        )
          .then((success) => success.json())
          .then((movies) => {
            this.setState({ hintError: false });

            if (movies.Search !== undefined) {
              this.setState(
                {
                  hintMovie: this.state.hintMovie.concat(movies.Search),
                  hintError: true,
                },
                () => {
                  console.log(this.state.hintMovie);
                }
              );
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      this.setState({ errorSymbol: true });
    }
  };

  searchMovie = () => {
    this.setState({ hintError: false, allMovie: [] });
    fetch(
      `http://www.omdbapi.com/?apikey=f8be42f2&s=${this.state.movieName.toLocaleLowerCase()}`
    )
      .then((success) => success.json())
      .then((movies) => {
        if(movies.Search !== undefined){
          console.log(movies);
        this.setState({ allMovie: this.state.allMovie.concat(movies.Search) });
        }else{
          this.setState({ errorSymbol: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   async componentDidMount() {
  //     console.log("Create component");
  //   }

  render() {
    return (
      <div className="omdb">
        <div className="omdb-search">
          <Container>
            {this.state.errorSymbol ? (
              <div className="omdb-form_error">
                Please enter valid movie name
              </div>
            ) : null}
            <div className="omdb-form">
              <Form.Control
                type="text"
                onChange={this.handleSearch}
                placeholder="Enter movie name"
              />
              {this.state.hintError ? (
                <div className="movie-list">
                  {this.state.hintError
                    ? this.state.hintMovie.map((movie, id) => (
                        <div className="movie-hint" key={id}>
                          {movie.Title}
                        </div>
                      ))
                    : null}
                </div>
              ) : null}
              <Button
                variant="primary"
                onClick={this.searchMovie}
                className="omdb-search-btn"
              >
                Search
              </Button>
            </div>
          </Container>
        </div>
        <div className="omdb-show">
          <Container>
            <Row>
              <div className="omdb-show_body">
                {this.state.allMovie.map((movie, id) => (
                  <Card
                    className="omdb-show_card"
                    key={id}
                    style={{ width: "18rem" }}
                  >
                    <Card.Img variant="top" src={movie.Poster} />
                    <Card.Body>
                      <Card.Title>{movie.Title}</Card.Title>
                      <Card.Text>{movie.Year}</Card.Text>
                      <Card.Text>{movie.Type}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
