import React, { Component } from 'react';
import UsersTable from './Components/UsersTable';
import TextField from './Components/TextField';
import Header from './Components/Header';
import UsersChart from './Components/UsersChart';
import Container from './Components/Container';
import { Col, Row } from 'react-bootstrap';
import './App.css';

const jsonData = require('./data/users.json');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      filteredUserList: [],
      searchValue: "",
    }
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData = () => {
    this.setState({
      userList: jsonData,
      filteredUserList: jsonData
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
    this.setState({
      filteredUserList: [...this.state.userList.filter(user => user.name.toLowerCase().includes(this.state.searchValue))]
    })
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
                  userList={this.state.filteredUserList}
                />
              </Container>
            </Col>
            <Col md={6}>
              <Container title="Users By Gender">
                <UsersChart userList={this.state.filteredUserList} />
              </Container>
            </Col>
          </Row>
        </div>
      </div >
    );
  }
}

export default App;
