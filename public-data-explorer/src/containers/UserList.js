import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import { connect } from 'react-redux';
import { getUserData } from '../actions/OHActions';
import isEmpty from 'lodash/isEmpty';

import './UserList.css';

class UserList extends Component {

  constructor(){
    super();
    this.state = {
      activeUser: 0
    };
  }

  componentDidUpdate(prevProps){
    if(isEmpty(prevProps.projectUsers)){
      this.props.getUserData("https://www.openhumans.org/api/public-data/?format=json&source="+this.props.source+"&username="+this.props.projectUsers[0]);
    }
  }

  handleUserClick = index => {
    this.props.getUserData("https://www.openhumans.org/api/public-data/?format=json&source="+this.props.source+"&username="+this.props.projectUsers[index]);
    this.setState({activeUser: index});
  }

  renderUsers = users => {
    return users.map((user,index) =>
      <ListGroupItem id="user-item" key={"item"+index} active={index === this.state.activeUser} onClick={() => this.handleUserClick(index)}>
        <ListGroupItemHeading id="user-item-heading">User: {user}</ListGroupItemHeading>
      </ListGroupItem>
    );  
  }  

  render() {
    return (
      <Card id="item-card">
          <ListGroup id="item-list">
          { isEmpty(this.props.projectUsers)
            ? <ListGroup id="item-list">
            <ListGroupItem id="project-item">Select a Project</ListGroupItem>
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