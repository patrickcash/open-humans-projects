import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardText, CardLink, Table } from 'reactstrap';
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
        <CardText>Description: {dataEntry.metadata.description}</CardText>
        <CardText>Tags: {dataEntry.metadata.tags.map((tag, tagindex) => 
          "\"" + tag + "\" " 
        )}
        </CardText>
        <img width="100%" src={require('../assets/placeholder_visualization.png')} alt="User data visualization"/>
        <Table bordered striped>
          <thead>
            <tr>
              <th></th>
              <th>Column A</th>
              <th>Column B</th>
              <th>Column C</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Row 1</th>
              <td>A1</td>
              <td>B1</td>
              <td>C1</td>
            </tr>
            <tr>
              <th scope="row">Row 2</th>
                <td>A2</td>
                <td>B2</td>
                <td>C2</td>
              </tr>
            <tr>
              <th scope="row">Row 3</th>
              <td>A3</td>
              <td>B3</td>
              <td>C3</td>
            </tr>
          </tbody>
        </Table>
        <CardLink href={dataEntry.download_url}>Download Data</CardLink>
        <hr/>
      </div>
    );  
  }  

  render() {
    return (
      <Card id="content-card">
        <CardHeader id="content-header">User Data Entries</CardHeader>
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