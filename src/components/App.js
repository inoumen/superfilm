import React, { Component } from 'react';
import Header from './Header';
import HelloMessage from './HelloMessage';
import Calendar from './Calendar';
import ListOfMovies from "./ListOfMovies";


class App extends Component {
    state = {
        showMovies: false,
        date: null,
    };

    render() {
        return (
            <div className="App" style={ this.state.showMovies ? {display: 'block'} : {display: ''}}>
                {<Header
                    showMovies={this.state.showMovies}
                    renderListOfMovies={this.renderListOfMovies.bind(this)}
                />}
                {this.state.showMovies && <ListOfMovies
                    onRenderListOfMovies={this.renderListOfMovies.bind(this)}
                    date={this.state.date}
                />}
                {!this.state.showMovies && <HelloMessage/>}
                {!this.state.showMovies && <Calendar
                    onRenderListOfMovies = {this.renderListOfMovies.bind(this)}
                />}
            </div>
        );
    }

    renderListOfMovies = (day) => {
        this.setState({"showMovies": !this.state.showMovies, "date": day});
    };
}

export default App;
