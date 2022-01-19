import './App.css';
import axios from 'axios';

import NewFeed from './Components/NewFeed/NewFeed';
import CurrencyConverter from './Components/CurrencyConverter/CurrencyConverter';
import ExchangeRate from './Components/ExchangeRate/ExchangeRate';

import digitalCurrencyList from './data/digital_currency_list.json';
import physicalCurrencyList from './data/physical_currency_list.json';
import { useCallback, useState } from 'react';

const App = () => {
  const [amountCurrency, setAmountCurrency] = useState(1);
  const [primaryCurrencySelected, setPrimaryCurrencySelected] = useState("EUR");
  const [secondaryCurrencySelected, setSecondaryCurrencySelected] = useState("BTC");
  const [exchangeRate, setExchangeRate] = useState([]);
  const [amontCurrencyConverting, setAmountCurrencyConverting] = useState(0);

  const handleChange = useCallback(() => {
    setAmountCurrency(document.getElementById("amountCurrency").value);
    setPrimaryCurrencySelected(document.getElementById("primaryCurrencySelected").value);
    setSecondaryCurrencySelected(document.getElementById("secondaryCurrencySelected").value);
  }, [])

  const convertingCurrency = useCallback(() => {
    const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params: {
        to_currency: secondaryCurrencySelected,
        function: 'CURRENCY_EXCHANGE_RATE',
        from_currency: primaryCurrencySelected 
      },
      headers: {
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        'x-rapidapi-key': 'c2aa852be0msh8eac83396bc7c90p104e01jsn02f9db063a6a'
      }
    };
    axios.request(options).then((res) => {
      console.log(res.data);
      setExchangeRate(res.data);
      setAmountCurrencyConverting(res.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amountCurrency);
      
    }).catch((error) => {
      console.error(error);
    })
  })

  console.log(amountCurrency, primaryCurrencySelected, secondaryCurrencySelected);
  return (
    <div className="App container">
      <div className='row'>
        <div className='col-12'>
          <CurrencyConverter
            digitalCurrencyList={digitalCurrencyList}
            physicalCurrencyList={physicalCurrencyList}
            amountCurrency={amountCurrency}
            primaryCurrencySelected={primaryCurrencySelected}
            secondaryCurrencySelected={secondaryCurrencySelected}
            onChange={handleChange}
            convertingCurrency={convertingCurrency}
          />
        </div>
        <div className='col-12'>
          <NewFeed />
        </div>
        <div className="col-12">
          <ExchangeRate amontCurrencyConverting={amontCurrencyConverting} />
        </div>
      </div>
    </div>
  );
}

export default App;
