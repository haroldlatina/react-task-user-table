import React, { Component } from 'react';
import UsersTable from './Components/UsersTable';
import TextField from './Components/TextField';
import Header from './Components/Header';
import UsersChart from './Components/UsersChart';
import Container from './Components/Container';
import { Col, Row } from 'react-bootstrap';
import { Chart } from 'chart.js'
import './App.css';

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

const userList = [
  { "id": 1, "name": "User 1", "gender": "male", "age": 22 },
  { "id": 2, "name": "User 2", "gender": "male", "age": 25 },
  { "id": 3, "name": "User 3", "gender": "female", "age": 32 },
  { "id": 4, "name": "User 4", "gender": "female", "age": 52 },
  { "id": 5, "name": "User 5", "gender": "male", "age": 62 }
]

const tableHeader = ["Name", "Gender", "Age"]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      tableHeader: [],
      userListToShow: [],
      maleCount: null,
      femaleCount: null,
      searchValue: "",
    }
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData = () => {
    this.setState({
      userListToShow: userList,
      userList: userList
    }, function () {
      this.filterData();
    })
  }

  onChangeSearchField = (e) => {
    let searchValue = e.target.value.toLowerCase();
    this.setState({ searchValue }, function () {
      this.filterData();
    })
  }

  filterData = () => {
    let userList = [...this.state.userList]
      , tempUserList = []
      , maleCount = 0
      , femaleCount = 0;

    for (let i = 0; i < userList.length; i++) {
      if (userList[i].name.toLowerCase().includes(this.state.searchValue)) {
        tempUserList.push(userList[i])
        if (userList[i].gender === "male") { maleCount++ }
        else if (userList[i].gender === "female") { femaleCount++ }
      }
    }

    this.setState({
      userListToShow: tempUserList,
      maleCount: maleCount,
      femaleCount: femaleCount
    }, function () {
      this.generateChart();
    })
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
    return (
      <div className="App">
        <div>
          <Row>
            <Header />
          </Row>
          <Row className="app-text-field" >
            <TextField
              onChange={this.onChangeSearchField}
            />
          </Row>
          <Row>
            <Col md={6}>
              <Container title="List of Users">
                <UsersTable
                  userList={this.state.userListToShow}
                  tableHeader={tableHeader}
                />
              </Container>
            </Col>
            <Col md={6}>
              <Container title="Users By Gender">
                <UsersChart userList={this.state.userListToShow} />
              </Container>
            </Col>
          </Row>
        </div>
      </div >
    );
  }
}

export default App;
