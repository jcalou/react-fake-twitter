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

  handleDateInput(value) {
    var newDate = value._d.toLocaleDateString() + ' - ' + value._d.getHours() + ':' + value._d.getMinutes();
    this.setState({
      twitDate: newDate
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
      <h1>Fake twit generator</h1>
      <div className="mainWrapper">
        <div className="formWrapper">
          <div className="userInputWrapper">
            @<input className="userInput" placeholder="Twitter username..." value={this.state.username} onChange={this.handleUserInput} onBlur={this.fetchUserData} />
          </div>
          <div className="twitInputWrapper">
            Twit text: <input className="twitInput" placeholder="Twit text..." value={this.state.twitText} onChange={this.handleTwitInput} />
          </div>
          <div className="dateInputWrapper">
            <span>Twit date:</span>
            <Datetime value={this.props.value} dateFormat="MMM DD, YYYY" timeFormat="hh:mm A" onChange={this.handleDateInput} />
          </div>
        </div>
      </div>
      <div className="mainWrapper">
        <div className="twitWrapper">
          <div className="twiTtop">
            <img src={this.state.srcImage} alt="Twitter profile img" width="48" />
            <p>{this.state.name}</p>
            <p>@{this.state.username}</p>
          </div>
          <div className="twitCenter">
            <p>{this.state.twitText}</p>
          </div>
          <div className="twitBottom">
            <p>{this.state.twitDate.toString()}</p>
            <p>111 Retweets&nbsp;&nbsp;&nbsp;333 Likes</p>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)
