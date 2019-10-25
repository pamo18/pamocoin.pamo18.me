/*eslint max-len: ["error", { "code": 150 }]*/

import React, { Component } from 'react';
import utils from '../../models/utils.js';

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.onMonthChange = this.onMonthChange.bind(this);
        this.onYearChange = this.onYearChange.bind(this);
        this.initMonth = this.initMonth.bind(this);
        this.state = {
            date: new Date(),
            monthPicker: "",
            monthName: "",
            monthNumber: "",
            year: ""
        };
    }
    componentDidMount() {
        this.setState({
            monthPicker: this.initMonth()
        }, () => {
            this.setState({
                monthName: this.state.date.toLocaleString('default', { month: 'long' }),
                monthNumber: this.state.date.getMonth(),
                year: this.state.date.getFullYear()
            });
        });
    }
    getMonths() {
        let options = [],
            allMonths = utils.getMonthNames();

        // eslint-disable-next-line no-unused-vars
        for (let month in allMonths) {
            if (this.state.monthName === month) {
                options.push(<option selected value={allMonths[month]}>{month}</option>);
            } else {
                options.push(<option value={allMonths[month]}>{month}</option>);
            }
        }
        return options;
    }
    getYears() {
        let currentDate = new Date(),
            currentYear = currentDate.getFullYear(),
            allYears = [];

        for (let y = 0; y <= 150; y++) {
            let year = currentYear - y;

            if (this.state.date.getFullYear() === year) {
                allYears.push(<option selected value={year}>{year}</option>);
            } else {
                allYears.push(<option value={year}>{year}</option>);
            }
        }
        return allYears;
    }
    selectDate(selected) {
        let dob = document.getElementById("birthday");

        dob.value = selected;
    }
    onMonthChange(e) {
        let y = this.state.year,
            m = parseInt(e.target.value);

        this.setState({
            date: new Date(y, m, 1),
        }, () => {
            this.setState({
                monthPicker: this.initMonth(),
                monthName: this.state.date.toLocaleString('default', { month: 'long' }),
                monthNumber: this.state.date.getMonth(),
                year: this.state.date.getFullYear()
            });
        });
    }
    onYearChange(e) {
        console.log(this.state.monthName);
        const y = e.target.value;
        const m = this.state.monthNumber;

        this.setState({
            date: new Date(y, m, 1),
        }, () => {
            this.setState({
                monthPicker: this.initMonth(),
                monthName: this.state.date.toLocaleString('default', { month: 'long' }),
                monthNumber: this.state.date.getMonth(),
                year: this.state.date.getFullYear()
            });
        });
    }
    initMonth() {
        let current = this.state.date,
            selectedMonth = current.getMonth(),
            selectedYear = current.getFullYear(),
            currentMonth = utils.getMonthSetup(selectedYear, selectedMonth),
            startDay = utils.getDayPos(currentMonth.start),
            endDay = currentMonth.end,
            day,
            week,
            weeks = {
                1: [],
                2: [],
                3: [],
                4: [],
                5: [],
                6: []
            };

        for (let i = 0; i < startDay; i++) {
            weeks[1].push(<td className="dates empty"></td>);
        }
        for (day = 1; day <= (7 - startDay); day++) {
            let currentDate = this.state.date;

            currentDate.setDate(day);
            let dateSting = utils.getDateAsString(currentDate);

            if (utils.isToday(currentDate)) {
                weeks[1].push(<td className="dates today" onClick={() => this.selectDate(dateSting)}>{currentDate.getDate()}</td>);
            } else {
                weeks[1].push(<td className="dates" onClick={() => this.selectDate(dateSting)}>{currentDate.getDate()}</td>);
            }
        }

        for (week = 2; week <= 6; week++) {
            for (let i = 1; i <= 7; i++) {
                if (day <= endDay) {
                    let currentDate = this.state.date;

                    currentDate.setDate(day);
                    let dateSting = utils.getDateAsString(currentDate);

                    if (utils.isToday(currentDate)) {
                        weeks[week].push(<td className="dates today" onClick={() => this.selectDate(dateSting)}>{currentDate.getDate()}</td>);
                    } else {
                        weeks[week].push(<td className="dates" onClick={() => this.selectDate(dateSting)}>{currentDate.getDate()}</td>);
                    }
                } else {
                    weeks[week].push(<td className="dates empty"></td>);
                }
                day++;
            }
        }
        return weeks;
    }
    render() {
        return (
            <div id="date-picker" className="date-wrapper">
                <table className="date-picker">
                    <thead>
                        <tr>
                            <th className="left" colSpan="5">
                                <select name="months" onChange={this.onMonthChange}>
                                    { this.getMonths() }
                                </select>
                            </th>
                            <th className="right" colSpan="2">
                                <select name="years" onChange={this.onYearChange}>
                                    { this.getYears() }
                                </select>
                            </th>
                        </tr>
                    </thead>
                    <tr>
                        <td width="14.286%">Mon</td>
                        <td width="14.286%">Tue</td>
                        <td width="14.286%">Wed</td>
                        <td width="14.286%">Thu</td>
                        <td width="14.286%">Fri</td>
                        <td width="14.286%">Sat</td>
                        <td width="14.286%">Sun</td>
                    </tr>
                    <tr>{ this.state.monthPicker[1] }</tr>
                    <tr>{ this.state.monthPicker[2] }</tr>
                    <tr>{ this.state.monthPicker[3] }</tr>
                    <tr>{ this.state.monthPicker[4] }</tr>
                    <tr>{ this.state.monthPicker[5] }</tr>
                    <tr>{ this.state.monthPicker[6] }</tr>
                </table>
            </div>
        );
    }
}

export default DatePicker;
