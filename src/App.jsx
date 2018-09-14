import React, { Component } from 'react'
import './App.css'

const currencies = [
  'AUD',
  'BGN',
  'BRL',
  'CAD',
  'CHF',
  'CNY',
  'CZK',
  'DKK',
  'GBP',
  'EUR',
  'HKD',
  'HRK',
  'HUF',
  'IDR',
  'ILS',
  'INR',
  'ISK',
  'JPY',
  'KRW',
  'MXN',
  'MYR',
  'NOK',
  'NZD',
  'PHP',
  'PLN',
  'RON',
  'RUB',
  'SEK',
  'SGD',
  'THB',
  'TRY',
  'USD',
  'ZAR'
]

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      from: 'USD',
      to: 'EUR',
      value: 100,
    }
  }

  componentDidMount() {
    this.props.onConvert(this.state)
  }

  render() {
    return (
      <form>
        Convert

        <input
          className="conversion__input"
          defaultValue="100"
          onChange={(event) => {
            this.setState({value: event.target.value}, () => {
              this.props.onConvert(this.state)
            })
          }}
        />

        <select
          className="conversion__from"
          defaultValue="USD"
          onChange={(event) => {
            this.setState({from: event.target.value}, () => {
              this.props.onConvert(this.state)
            })
          }}
        >
          <option></option>
          {currencies.map((currency) => {
            return <option
              key={currency}
              value={currency}
            >{currency}</option>
          })}
        </select>

        to

        <select
          className="conversion__to"
          defaultValue="EUR"
          onChange={(event) => {
            this.setState({from: event.target.value}, () => {
              this.props.onConvert(this.state)
            })
          }}
        >
          {currencies.map((currency) => {
            return <option
              key={currency}
              value={currency}
            >{currency}</option>
          })}
        </select>
      </form>
    )
  }
}

function Result (props) {
  if(!props.result) {
    return null
  }

  return (
    <div className="conversion__result">
      <span className="conversion__prefix">=></span>
      <span className="conversion__value">
        {parseFloat(props.result).toFixed(4)}
      </span>
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  convert = (params) => {
    let url = new URL('http://localhost:4567')
    Object.keys(params).forEach((key) => {
      url.searchParams.append(key, params[key])
    })

    fetch(url).then(response => response.text()).then((text) => {
      this.setState({result: text})
    })
  }

  render() {
    return (
      <div className="conversion">
        <Form onConvert={this.convert} />
        <Result result={this.state.result} />
      </div>
    )
  }
}

export default App
