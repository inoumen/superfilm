import React, {Component} from 'react';

class MovieCard extends Component {
    state = {
        showOriginal: false,
    };
    render() {
        return (
            <div className="MovieCard">
                <div className="MovieCardImage--wrapper" style={ this.state.showOriginal ? {width: '100%'} : {width: ''}}>
                    <img
                        onClick={this.onClickImgHandler}
                        src={this.state.showOriginal ? this.props.originalImage : this.props.mediumImage }
                        alt="123"/>
                </div>

                {!this.state.showOriginal &&
                <div className="MovieCardInfoWrapper">
                    <div className="nameYear">
                        <span>{this.props.allInfo.show.name}</span>
                        <span>{new Date(this.props.allInfo.show.premiered).getFullYear()}</span>
                    </div>
                    <div className="seasonEpisode">
                        <span>Сезон: {this.props.allInfo.season}</span>
                        <span>Эпизод: {this.props.allInfo.number}</span>
                    </div>
                </div>}
            </div>
        );
    }
    onClickImgHandler = () => {
        this.setState({showOriginal: !this.state.showOriginal});
    };
}

export default MovieCard;