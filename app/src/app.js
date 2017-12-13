import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Datetime from 'react-datetime';
import './styles.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      twitText: '',
      twitDate: '',
      srcImage: 'https://avatars.io/twitter/'
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleTwitInput = this.handleTwitInput.bind(this);
    this.handleDateInput = this.handleDateInput.bind(this);
    this.fetchUserData = this.fetchUserData.bind(this);
  }

  handleUserInput(e) {
    this.setState({
      username: e.target.value,
      srcImage: 'https://avatars.io/twitter/' + e.target.value
    });

  }

  handleTwitInput(e) {
    this.setState({
      twitText: e.target.value
    });
  }

  handleDateInput(e) {
    this.setState({
      twitDate: e._d
    });
  }

  fetchUserData() {

    var url = "https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=" + this.state.username;

    axios.get(url)
      .then(res => {
        this.setState({
          name: res.data[0].name
        });
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  render() {

    return (
      <div>
        <div className="formWrapper">
          <div className="userInputWrapper">
            @<input className="userInput" placeholder="Twitter username..." value={this.state.username} onChange={this.handleUserInput} onBlur={this.fetchUserData} />
          </div>
          <div className="twitInputWrapper">
            Twit text: <input className="twitInput" placeholder="Twit text..." value={this.state.twitText} onChange={this.handleTwitInput} />
          </div>
          <Datetime onChange={this.handleDateInput} />
          <br />
          <button className="userButton" onClick={this.fetchUserData}>Fetch user long name</button>
        </div>
        <div className="twitWrapper">
          <img src={this.state.srcImage} alt="Twitter profile img" width="48" />
          <p>Name: {this.state.name}</p>
        </div>
        <div className="twitWrapper">
          <p>{this.state.twitText}</p>
          <p>Date: {this.state.twitDate.toString()}</p>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)
