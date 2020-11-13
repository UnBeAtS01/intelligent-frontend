import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/navigation.js';
import Logo from './components/logo/logo.js';
import Detect from './components/detect/detect.js';
import Search from './components/search/search.js';
import Rank from './components/Rank/rank.js';
import Particles from 'react-particles-js';
import Signin from './components/sigin/signin';
import Signup from './components/signup/signup';

const particlesbro = {

  particles: {
    value: 30,
    density: {
      enable: true,
      value_area: 400
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
}
const intialState =
{
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  Issignedin: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''

  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = intialState;
  }


  /* componentDidMount(){
      fetch('http://localhost:4000/')
      .then(response=>response.json())
      .then(data=>console.log(data));
   }*/
  Loaduser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculatefacelocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;//present on doc of clarifai api//XD
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  }
  onInputChange = (event) => {
    console.log(event);
    this.setState({ input: event.target.value });
  }
  onButtonSubmit = () => {//picture submit to get face recogination
    //console.log('click');
    this.setState({ imageUrl: this.state.input });
    fetch(` https://fathomless-plateau-82518.herokuapp.com/imageurl`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        if (response.outputs[0].data.regions) {
          fetch(`https://fathomless-plateau-82518.herokuapp.com/image`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            })
          }).then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch((err) => console.log("enter invalid address"));

        }
        this.displayFaceBox(this.calculatefacelocation(response))
      })
      .catch(err => console.log("opps enter vallid url"));

  }


  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(intialState);
    }
    else if (route === 'home') {
      this.setState({ Issignedin: true });
    }
    this.setState({ route: route });
  }



  render() {
    return (
      <div className="App" >
        <Particles
          className='particles'
          params={particlesbro}
          style={{
            width: '100%',

          }}


        />
        <Navigation isSignin={this.state.Issignedin} onRouteChange={this.onRouteChange} />
        { this.state.route === 'signin' ?
          <Signin Loaduser={this.Loaduser} onRouteChange={this.onRouteChange} />
          :
          (
            this.state.route === 'home' ?
              <div>
                <Logo />
                <Rank name={this.state.user.name} entries=
                  {this.state.user.entries} />
                <Search onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                />
                <Detect box={this.state.box} imageUrl={this.state.imageUrl} />

              </div>
              :
              <Signup Loaduser={this.Loaduser} onRouteChange={this.onRouteChange} />

          )



        }

      </div >
    );
  }
}

export default App;
