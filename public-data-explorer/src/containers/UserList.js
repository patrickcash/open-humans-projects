import React, { Component } from 'react';
import { Card, CardHeader, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import { getUserData } from '../actions/OHActions';
import isEmpty from 'lodash/isEmpty';

import './UserList.css';

/*
 * Displays all of the users registered for a project
 */
class UserList extends Component {

  constructor(){
    super();
    this.state = {
      activeUser: 0
    };
  }

  /*
  * Select the first user and load the user's data entries
  */
  componentDidUpdate(prevProps){
    if(prevProps.projectUsers !== this.props.projectUsers){
      this.props.getUserData("https://www.openhumans.org/api/public-data/?format=json&source="+this.props.source+"&username="+this.props.projectUsers[0]);
      if(this.state.activeUser !== 0){
        this.setState({activeUser: 0});
      }
    }
  }

  /*
  * Load the user's data entries for the project
  */
  handleUserClick = index => {
    this.props.getUserData("https://www.openhumans.org/api/public-data/?format=json&source="+this.props.source+"&username="+this.props.projectUsers[index]);
    this.setState({activeUser: index});
  }

  renderUsers = users => {
    return users.map((user,index) =>
      <ListGroupItem id="user" key={"item"+index} active={index === this.state.activeUser} onClick={() => this.handleUserClick(index)}>{user}</ListGroupItem>
    );  
  }  

  render() {
    return (
      <Card id="item-card">
        <CardHeader id="user-header">Project Users</CardHeader>
        <ListGroup id="user-list">
        { isEmpty(this.props.projectUsers)
          ? <ListGroup id="user-list">
            <ListGroupItem id="user">Select a Project</ListGroupItem>
          </ListGroup>
          : <ListGroup id="item-list">
          {this.renderUsers(this.props.projectUsers)}
          </ListGroup>
        }
        </ListGroup>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  source: state.source,
  projectUsers: state.projectUsers
})

const mapDispatchToProps = dispatch => ({
  getUserData: (url) => {dispatch(getUserData(url))},
})

export default connect (mapStateToProps, mapDispatchToProps)(UserList);