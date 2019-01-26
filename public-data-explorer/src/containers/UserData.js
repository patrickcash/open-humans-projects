import React, { Component } from 'react';
import { Card, CardBody, CardText, CardLink } from 'reactstrap';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import './UserData.css';

class UserData extends Component {
  
  renderUserData = userData => {
    if(!userData){
      return null;
    }
    return userData.map((dataEntry,index) =>
      <div key={index}>
        <CardText>Name: {dataEntry.basename}</CardText>
        <CardText>Created: {dataEntry.created}</CardText>
        <CardLink>Dwnlaod: {dataEntry.download_url}</CardLink>
        <hr></hr>
      </div>
    );  
  }  

  render() {
    return (
      <Card id="content-card">
        <CardBody id="content-body">
        { isEmpty(this.props.userData)
          ? <CardText>No user data to display for this project</CardText>
          : 
          <div>
            {this.renderUserData(this.props.userData)}
          </div>
        }
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.userData
})

export default connect (mapStateToProps, null)(UserData);