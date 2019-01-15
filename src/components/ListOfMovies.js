import React, { Component } from 'react';
import MovieCard from './MovieCard';
import navUp from '../images/navUp.png';
import navDown from '../images/navDown.png';

class ListOfMovies extends Component {
    state = {
        dataFromApi: null,
        dataPlusOnaDayFromApi: null,
        showMore: false,
        showMain: false,
    };

    render() {
        return (
            <div className="ListOfMovies">
                <div className="MoviesDateHeader">{this.ordinaryDate(this.props.date)}</div>
                <div className="thisDateMovies">
                   {this.state.dataFromApi && this.state.dataFromApi.map( (child, i) =>
                       (i < 2 || this.state.showMore) &&
                            (child.show.image &&
                                <MovieCard
                                    key={child.id}
                                       mediumImage={this.typeRightUrl(child.show.image.medium)}
                                       originalImage={this.typeRightUrl(child.show.image.original)}
                                    allInfo={child}
                                />
                            )
                        )
                   }
                </div>
                <div className="MoviesShowTumbler" onClick={this.showMore}>
                    <div className="MoviesShowTumbler--wrapper">
                        {this.state.showMore ?
                            "Свернуть" : `Ещё ${this.state.dataFromApi && this.sayRight(this.state.dataFromApi.length-2)}`
                        }
                        <img src={navDown} alt="down navigation"/>
                    </div>
                </div>


                <div className="nextDateMovies">
                    {!this.state.showMain ?
                        <div>
                            <div className="MoviesDateHeader">{this.ordinaryDate(this.plusOneDay(this.props.date))}</div>
                            <div>
                                {this.state.dataPlusOnaDayFromApi && this.state.dataPlusOnaDayFromApi.map( (child,  i) =>
                                    i < 4 &&
                                        (child.show.image && <MovieCard
                                                key={child.id}
                                                mediumImage={this.typeRightUrl(child.show.image.medium)}
                                                originalImage={this.typeRightUrl(child.show.image.original)}
                                                allInfo={child}
                                        />
                                        )
                                    )
                                }
                            </div>
                        </div> : ""
                    }
                    <div className="MoviesShowTumbler" onClick={this.showMain}>
                        <div className="MoviesShowTumbler--wrapper">
                            {this.state.showMain ? "Показать дополнительные" : "Показать основные"}
                            <img src={navUp} alt="down navigation"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    showMain = () => {
        this.setState({showMain: !this.state.showMain});
    };
    showMore = () => {
        this.setState({showMore: !this.state.showMore});
    };
    plusOneDay = (date) => {
        let biggerDate = new Date(date);
        biggerDate.setDate(biggerDate.getDate()+1);
        return biggerDate.toISOString().substring(0, 10);
    };
    sayRight = (number) => {
        // I know I could use some library like
        // https://github.com/ukrbublik/numeralize-rus-ukr#numeralizepluralizecount-forms
        // but I've decided to write it by myself because it's interesting and I had time.
        const theStringNum = number.toString();
        return `${theStringNum} ${getRightSpelling(
            theStringNum
        )}`;
        function getRightSpelling(num){
            if (num > 9 && num < 20) {
                return "сериалов";
            } else if(num.length === 3 && (num[1] + num[2]) > 9 && (num[1] + num[2]) < 20){
                return "сериалов";
            } else {
                const lastNum = +( num.charAt(num.length-1) );
                if (lastNum === 1) return "сериал";
                else if (lastNum > 1 && lastNum < 5) return "сериала";
                else if ((lastNum >= 5 && lastNum < 10) || lastNum === 0) return "сериалов";
            }
        }
    };
    ordinaryDate = date => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC',
        };
        let newDate = new Date(date).toLocaleString("ru", options);
        newDate = newDate.split("").splice(0, newDate.length-3).join("");
        return newDate;
    };
    typeRightUrl = url => "https" + url.split("").splice(4, url.length-1).join("");
    fetchData = (dateForFetch, stateToUse) => {
        fetch(`https://api.tvmaze.com/schedule?country=US&date=${dateForFetch}`)
            .then(response => response.json())
            .then(data =>{
                this.setState({[stateToUse]: data});
            });
    };

    componentDidMount(){
        this.fetchData(this.props.date, "dataFromApi");
        this.fetchData(this.plusOneDay(this.props.date), "dataPlusOnaDayFromApi");
    }

}

export default ListOfMovies;
