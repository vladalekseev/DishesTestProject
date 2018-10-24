import React, { Component } from 'react';
import { BarChart, PieChart, LineChart } from 'react-d3-components';
import './Charts.scss';
import { getPopularDishes } from '../../utils/dishes-api';
import { getPopularUsers } from '../../utils/user-api';
import { fetchDays } from '../../utils/order-api';

class Charts extends Component {
    constructor() {
        super();

        this.state = {
            dayValues: [{x: 0, y: 0}],
            dishValues: [{x: '', y: 0}],
            userValues: [{x: '', y: 0}]
        };
    }

    componentDidMount() {

        getPopularDishes()
            .then((res) => res.json())
            .then(values => {
                this.setState({
                    dishValues: values
                });
            })
            .catch(err => err);

        getPopularUsers()
            .then((res) => res.json())
            .then(values => {
                this.setState({
                    userValues: values
                });
            })
            .catch(err => err);

        fetchDays()
            .then(res => res.json())
            .then(days => {
                const data = [];

                for (let i = 1; i < 31; i++) {
                    data.push({ x: i, y: 0 })
                }

                days.forEach((el) => {
                    data[el.day - 1].y++;
                });

                this.setState({
                    dayValues: data
                });
            })
            .catch(err => err);
    }

    render() {
        return (
            <div className="chart">
                <section className="chart__section">
                    <h3 className="chart__title chart__title--users">Most active users</h3>
                    <div className="chart__bar">
                        <BarChart
                            data={{ values: this.state.userValues }}
                            width={700}
                            height={380}
                            margin={{top: 30, bottom: 50, left: 50, right: 30}}
                        />
                    </div>
                </section>
                <section className="chart__section">
                    <h3 className="chart__title chart__title--dishes">Most popular dishes</h3>
                    <div className="chart__pie">
                        <PieChart
                            data={{ values: this.state.dishValues }}
                            width={800}
                            height={400}
                            margin={{top: 30, bottom: 10, left: 100, right: 100}}
                        />
                    </div>
                </section>
                <section className="chart__section">
                    <h3 className="chart__title">Number of dishes per day</h3>
                    <div className="chart__pie">
                        <LineChart
                            data={ [{ values: this.state.dayValues }] }
                            width={700}
                            height={400}
                            margin={{top: 30, bottom: 50, left: 50, right: 10}}
                        />
                    </div>
                </section>
            </div>
        )
    }
}

export default Charts;
