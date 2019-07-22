import React, { Component } from 'react';
import { Chart } from 'chart.js'
import PropTypes from 'prop-types';

const chartAxesOptions = {
    fontColor: "white",
    fontSize: 14,
    beginAtZero: true,
    stepSize: 1,
}

const chartLabelOptions = {
    display: true,
    fontColor: "white",
    fontSize: 14
}

const colorArray = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)'
]

class UsersChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maleCount: 0,
            femaleCount: 0,
            userList: []
        }
    }

    componentWillUnmount() {
        if (window.chartInstance != null) {
            window.chartInstance.destroy();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.userList) !== JSON.stringify(nextProps.userList)) {
            this.setState({
                userList: nextProps.userList
            }, function () {
                this.prepareChartValues();
            })
        }
    }

    prepareChartValues = () => {
        let userList = [...this.state.userList]
            , maleCount = 0
            , femaleCount = 0;

        for (let i = 0; i < this.state.userList.length; i++) {
            if (userList[i].gender === "male") maleCount++
            else if (userList[i].gender === "female") femaleCount++
        }
        this.setState({ maleCount, femaleCount }, function () { this.generateChart() })
    }

    generateChart = () => {
        let { maleCount, femaleCount } = this.state;

        if (window.chartInstance != null) {
            window.chartInstance.destroy();
        };

        var chart = document.getElementById('asc-rightCanvas').getContext('2d');

        window.chartInstance = new Chart(chart, {
            type: 'bar',
            data: {
                labels: ['Male', 'Female'],
                datasets: [{
                    label: 'Number of Users',
                    data: [maleCount, femaleCount],
                    backgroundColor: [...colorArray],
                    borderColor: [...colorArray],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    labels: {
                        fontColor: "white",
                        fontSize: 15
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            ...chartAxesOptions
                            , min: 0
                            , max: 10
                        },
                        scaleLabel: {
                            ...chartLabelOptions
                            , labelString: 'Number of Users',

                        }
                    }],
                    xAxes: [{
                        ticks: {
                            ...chartAxesOptions
                        },
                        scaleLabel: {
                            ...chartLabelOptions
                            , labelString: 'Gender'
                        }
                    }]
                }
            }
        });
    }

    render() {
        return <canvas id="asc-rightCanvas" width="290" height="200" />

    }
}

UsersChart.propTypes = {
    userList: PropTypes.array.isRequired
};


export default UsersChart;
