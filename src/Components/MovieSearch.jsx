import React, { Component } from 'react'
import axios from 'axios';
import { storeAuthCredentials, getAuthHeaders } from "../modules/auth"

class MovieSearch extends Component {
  state = {
    movies: [],
    watchlistMessage: {
      id: 0
    }
  }

  search = async (event) => {
    event.preventDefault()
    let query = event.target.query.value

    let response = await axios.get('/movies', {
      params: { query: query }
    })

    this.setState({
      movies: response.data.results
    })
  }

  addToWatchlist = async (movie) => {
    try {
      let headers = await getAuthHeaders()
      let response = await axios.post("/watchlist_items", {
        movie_db_id: movie.id,
        title: movie.title
      }, {
        headers: headers
      })

      await storeAuthCredentials(response)

      this.setState({
        watchlistMessage: {
          message: response.data.message,
          id: movie.id
        }
      })
    } catch (error) {
      let errorMessage = error.response.data.errors == undefined ?
        error.response.data.message :
        error.response.data.errors[0]

      this.setState({
        watchlistMessage: {
          message: errorMessage,
          id: movie.id
        }
      })
    }
  }

  render() {
    let movies;
    this.state.movies && (
      movies = this.state.movies.map(movie => {
        let isMovieAlreadyAddedToWatchlist = parseInt(this.state.watchlistMessage.id) === movie.id
        return (
          <>
            <label>Title:</label>
            <p>{movie.title}</p>

            <label>Overview:</label>
            <p>{movie.overview}</p>

            <label>Release date:</label>
            <p>{movie.release_date}</p>
            <br />


            {this.props.authenticated && (
              <button onClick={() => this.addToWatchlist(movie)}>Add to my watchlist</button>
            )}

            {isMovieAlreadyAddedToWatchlist && (
              <p>{this.state.watchlistMessage.message}</p>
            )}
            <br />

          </>
        )
      })
    )

    return (
      <>
        <form onSubmit={this.search}>
          <label>Find a movie</label>
          <input name='query' id='query' />

          <button type="submit">Search!</button>
        </form>
        <br />
        <br />

        {movies}
      </>
    )
  }
}

export default MovieSearch
