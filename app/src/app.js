import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Datetime from 'react-datetime';

import './styles.css';
import './fontawesome.min.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    let d = new Date();
    let minutes = (d.getMinutes()+100);
    minutes = minutes.toString().substring(1, 3);

    let initialDate = d.getHours() + ":" + minutes + " - " + (d.getMonth()+1) + "/" + d.getDate()  + "/" + d.getFullYear();

    this.state = {
      username: '',
      name: '',
      twitText: '',
      twitDate: initialDate,
      srcImage: 'https://avatars.io/twitter/',
      retweets: '100',
      likes: '200',
      faces: '5',
      replys: '20',
      dms: '1',
      facesArr: []
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleTwitInput = this.handleTwitInput.bind(this);
    this.handleDateInput = this.handleDateInput.bind(this);
    this.fetchUserData = this.fetchUserData.bind(this);
    this.handleRetweetInput = this.handleRetweetInput.bind(this);
    this.handleLikesInput = this.handleLikesInput.bind(this);
    this.handleFacesInput = this.handleFacesInput.bind(this);
    this.handleFacesInputBlur = this.handleFacesInputBlur.bind(this);
    this.handleReplysInput = this.handleReplysInput.bind(this);
    this.handleDmsInput = this.handleDmsInput.bind(this);


    let previousNotes = this.state.facesArr;

    axios.get('https://randomuser.me/api/?results=' + this.state.faces)
      .then(res => {
        // console.log(res.data.results);
        // console.log(JSON.parse(JSON.stringify(res.data.results)));

        let result = JSON.parse(JSON.stringify(res.data.results));

        previousNotes = result.slice();
        // console.log(previousNotes);

        this.setState({
          facesArr: previousNotes
        });

        //redraw

      });

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
    var minutes = value._d.getMinutes();
    minutes = minutes > 9 ? minutes : '0' + minutes;
    var newDate = value._d.getHours() + ':' + minutes + ' - ' + value._d.toLocaleDateString();
    this.setState({
      twitDate: newDate
    });
  }

  handleRetweetInput(e) {
    this.setState({
      retweets: e.target.value
    });
  }
  handleLikesInput(e) {
    this.setState({
      likes: e.target.value
    });
  }

  handleFacesInput(e) {
    this.setState({
      faces: e.target.value,
    },() => {
        this.handleFacesInputBlur();
    });
  }

  handleFacesInputBlur() {

    let previousNotes = this.state.facesArr;

    axios.get('https://randomuser.me/api/?results=' + this.state.faces)
      .then(res => {
        // console.log(res.data.results);
        // console.log(JSON.parse(JSON.stringify(res.data.results)));

        let result = JSON.parse(JSON.stringify(res.data.results));

        previousNotes = result.slice();
        // console.log(previousNotes);

        this.setState({
          facesArr: previousNotes
        });

      });

  }

  handleReplysInput(e) {
    this.setState({
      replys: e.target.value,
    });
  }

  handleDmsInput(e) {
    this.setState({
      dms: e.target.value,
    });
  }

  fetchUserData() {

    var url = "https://cors-anywhere.herokuapp.com/https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=" + this.state.username;

    axios.get(url, {
        headers: { 'Access-Control-Allow-Origin': '*'}
      })
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
              <span>Date:</span>
              <Datetime value={this.props.value} defaultValue={new Date()} dateFormat="MMM DD, YYYY" timeFormat="hh:mm A" onChange={this.handleDateInput} />
            </div>
          </div>
        </div>
        <div className="mainWrapper">
          <div className="formWrapper">
            <div className="retweetsInputWrapper">
              Retweets: <input className="retweetsInput" value={this.state.retweets} onChange={this.handleRetweetInput} />
            </div>
            <div className="likesInputWrapper">
              Likes: <input className="likesInput" value={this.state.likes} onChange={this.handleLikesInput} />
            </div>
            <div className="facesInputWrapper">
              Faces:
              <select className="facesInput" value={this.state.faces} onChange={this.handleFacesInput} >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
              </select>
            </div>
            <div className="replysInputWrapper">
              Replys: <input className="replysInput" value={this.state.replys} onChange={this.handleReplysInput} />
            </div>
            <div className="dmsInputWrapper">
              DMs: <input className="dmsInput" value={this.state.dms} onChange={this.handleDmsInput} />
            </div>
          </div>
        </div>
        <div className="mainWrapper">
          <div className="twitWrapper" id="capture">
            <div className="twiTtop">
              <img src={this.state.srcImage} alt="Twitter profile img" width="48" />
              <p className="userNameInfo">
                <span  className="userLongName">{this.state.name}</span>
                <br />
                <span  className="userName">@{this.state.username}</span>
              </p>
            </div>
            <div className="twitCenter">
              <p className="twitText">{this.state.twitText}</p>
            </div>
            <div className="twitBottom">
              <p className="twitDate">{this.state.twitDate}</p>
              <div className="mainWrapper boxWrapper">
                <div className="twitRetweets">
                  <p><span>{this.state.retweets}</span> Retweets&nbsp;&nbsp;&nbsp;<span>{this.state.likes}</span> Likes</p>
                </div>
                <div className="twitFaces">
                  <ul>
                    {this.state.facesArr.map(function(el, index) {
                      return <li key={ index }><img src={el.picture.thumbnail} alt="thumb"/></li>;
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="twitBottom2">
              <div className="iconsBottom">
                <i className="far fa-comment"></i><p>{this.state.replys}</p>
              </div>
              <div className="iconsBottom">
                <i className="fa fa-retweet"></i><p>{this.state.retweets}</p>
              </div>
              <div className="iconsBottom">
                <i className="far fa-heart"></i><p>{this.state.likes}</p>
              </div>
              <div className="iconsBottom">
                <i className="far fa-envelope"></i><p>{this.state.dms}</p>
              </div>
              <div className="iconsBottomSpacer">
                &nbsp;
              </div>
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
