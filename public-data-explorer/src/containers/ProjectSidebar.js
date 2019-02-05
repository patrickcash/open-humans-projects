import React, { Component } from 'react';
import { Card, CardHeader, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import { getProjectList, getUsers } from '../actions/OHActions';
import isEmpty from 'lodash/isEmpty';

import './ProjectSidebar.css';

/*
 * Displays all of the projects available in the Open Humans public data api as a list
 */
class ProjectSidebar extends Component {

  constructor(){
    super();
    this.state = {
      activeProjectIndex: 0
    };
  }

  /*
  * Load the initial project list into the side bar
  */
  componentDidMount(){
    this.props.getProjectList();
  }

  /*
  * Select the initial project and load the users
  */
  componentDidUpdate(prevProps){
    if(isEmpty(prevProps.projectList)){
      this.props.getUsers("https://www.openhumans.org/api/public-data/members-by-source/?format=json&source="+this.props.projectList[0].source);
    }
  }

  /*
  * Load the users for the project the user selected
  */
  handleProjectClick = index => {
    this.props.getUsers("https://www.openhumans.org/api/public-data/members-by-source/?format=json&source="+this.props.projectList[index].source);
    this.setState({activeProjectIndex: index});
  }

  renderProjectList = projectList => {
    if(projectList) {
      return projectList.map((item,index) =>
        <ListGroupItem id="project" key={index} active={index === this.state.activeProjectIndex} onClick={() => this.handleProjectClick(index)}>{item.name}</ListGroupItem>
      );  
    }
  }  
  
  render() {
    return (
      <Card id="project-card">
        <CardHeader id="project-header">Projects</CardHeader>
        <ListGroup flush id="project-list">
          {isEmpty(this.props.projectList)
            ? <ListGroup id="item-list">
              <ListGroupItem id="project-item">Loading Projects</ListGroupItem>
            </ListGroup>
            : <ListGroup id="item-list">
            {this.renderProjectList(this.props.projectList)}
            </ListGroup>
          }
        </ListGroup>
      </Card>    
    );
  }
}

const mapStateToProps = state => ({
  projectList: state.projectList
})

const mapDispatchToProps = dispatch => ({
  getProjectList: () => {dispatch(getProjectList())},
  getUsers: (url) => {dispatch(getUsers(url))}
})

export default connect (mapStateToProps, mapDispatchToProps)(ProjectSidebar);