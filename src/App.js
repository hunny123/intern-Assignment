import React, { Component } from "react";
import Slider from "react-input-slider";
import Particles from "react-particles-js";
import "./App.css";
//Particle-js Param Json
const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  //State of a App
  state = {
    data: [],
    month: 0,
    amount: 0,
    dataChange: false
  };
// Function to Handle month value
  monthQueryHandler = query => {
    this.setState({ month: query, dataChange: true });
  };
 //Function to Handle Amount value 
  amountQueryHandler = query => {
    this.setState({ amount: query, dataChange: true });
  };
  // Function to handle UI Update
  componentDidUpdate() {
    if (this.state.dataChange) {
      //Funtion to Avoid Infinite Loops
      this.calculateSimpleInteset();
    }
  }
//Function to call Api
  calculateSimpleInteset = () => {
    let month = this.state.month;
    let amount = this.state.amount;
    if (month >= 6 && month <= 24 && (amount >= 500 && amount <= 5000)) {
      let url = `https://ftl-frontend-test.herokuapp.com/interest?amount=${amount}&numMonths=${month}`;
      fetch(url)
        .then(res => res.json())
        .then(result => {
          this.setState({
            data: result,
            dataChange: false
          });
        }).catch(function() {
          alert("Something went wrong");
      });;
    }
  };
  //Function for condition rendering
  checkData = () => {
    let data = this.state.data;
    if (data.interestRate) {
      return (
        <p>
          Interest Rate: {data.interestRate} <br /> Monthly Payment : ${
            data.monthlyPayment.amount
          }
        </p>
      );
    } else {
      return <p>Set the values of amount and month</p>;
    }
  };

  render() {
    return (
      <div className="background">
        <Particles className="particles" params={particlesOptions} />

        <h1 className="p-3 heading ">Interest Calculator</h1>
        <div className="container p-5">
          <div className="row">
            <div className="col-md-2 " />
            <div className="col-md-4 mt-4 heading py-5">
              <div>
                <p className="text-white">{"Amount: " + this.state.amount}</p>
              </div>
              <Slider
                axis="x"
                xstep={1}
                xmin={500}
                xmax={5000}
                x={this.state.amount}
                onChange={event => this.amountQueryHandler(event.x)}
                className="touchAction my-2"
              />
              <div>
                <p className="text-white">{"Month: " + this.state.month}</p>
              </div>
              <Slider
                axis="x"
                xmin={6}
                xmax={24}
                x={this.state.month}
                onChange={event => this.monthQueryHandler(event.x)}
                className="touchAction my-2"
              />
            </div>
            <div className="col-md-5 mt-4 heading py-5 ">
              <h4> Details </h4>
              <div className="card p-2 h-100">{this.checkData()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
