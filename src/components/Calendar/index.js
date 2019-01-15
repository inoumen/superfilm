import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import './index.css';

const MONTHS = {
    ru: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ],
};
const FIRST_DAY_OF_WEEK = {
    ru: 1,
};
const LABELS = {
    ru: { nextMonth: 'следующий месяц', previousMonth: 'предыдущий месяц' },
};

class Calendar extends Component {
    render() {
        return (
            <div className="Calendar">
                <DayPicker
                    showOutsideDays
                    locale="ru"
                    months={MONTHS["ru"]}
                    weekdaysLong={[]}
                    weekdaysShort={[]}
                    firstDayOfWeek={FIRST_DAY_OF_WEEK["ru"]}
                    labels={LABELS["ru"]}
                    onDayClick={this.getDay.bind(this)}
                />
            </div>
        );
    }
    getDay = ev => {
        const day = ev.toISOString().substring(0, 10);
        this.props.onRenderListOfMovies(day);
    }
}

export default Calendar;