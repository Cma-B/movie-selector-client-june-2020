import React, { Component } from 'react'
import axios from 'axios';
import { storeAuthCredentials, getAuthHeaders } from "../modules/auth"

class MovieSearch extends Component {
  state = {
    movies: []
  }

  search = async (event) => {
    event.preventDefault()

    let headers = getAuthHeaders()

    let response = await axios.get('/movies', {
      params: { query: event.target.query.value }
    }, {
      headers: headers
    })

    await storeAuthCredentials(response)
    this.setState({
      movies: response.data.results
    })
  }

  render() {
    let movies;
    this.state.movies && (
      movies = this.state.movies.map(movie => {
        return (
          <>
            <label>Title:</label>
            <p>{movie.title}</p>

            <label>Overview:</label>
            <p>{movie.overview}</p>

            <label>Release date:</label>
            <p>{movie.release_date}</p>
            <br />
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
