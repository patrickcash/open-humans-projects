import React, { Component }  from 'react';
import { Container, Row, Col, Navbar, NavbarBrand } from 'reactstrap';
import ProjectSidebar from './containers/ProjectSidebar.js'
import UserList from './containers/UserList.js'
import UserData from './containers/UserData.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {

  render() {
    return (
      <Container fluid={true} className="app-container">
          <Row>
            <Col md={12} className="navbar-column">
              <Navbar className="navbar">
                <NavbarBrand>
                  OpenHumans Public Data Explorer
                </NavbarBrand>
              </Navbar>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="sidebar-column">
              <ProjectSidebar className="sidebar"/>
            </Col>
            <Col md={3} className="items-column">
              <UserList className="item-list"/>
            </Col>
            <Col md={6} className="content-column">
              <UserData className="item-content"/>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="footer-column">
              <div className="navbar footer"></div>
            </Col>
          </Row>
        </Container> 
    );
  }
}

export default App;