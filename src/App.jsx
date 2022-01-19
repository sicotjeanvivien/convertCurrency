import { useCallback, useState } from 'react';
import './App.css';

// Component
import NewFeed from './Components/NewFeed/NewFeed';
import CurrencyConverter from './Components/CurrencyConverter/CurrencyConverter';
import ExchangeRate from './Components/ExchangeRate/ExchangeRate';
// Utils
import AlphaVantage from './Utils/API/AlphaVantage';
// DATA
import digitalCurrencyList from './Store/digital_currency_list.json';
import physicalCurrencyList from './Store/physical_currency_list.json';
import Graph from './Components/Graph/Graph';

const App = () => {
  const [amountCurrency, setAmountCurrency] = useState(1);
  const [primaryCurrencySelected, setPrimaryCurrencySelected] = useState("EUR");
  const [secondaryCurrencySelected, setSecondaryCurrencySelected] = useState("BTC");
  const [exchangeRate, setExchangeRate] = useState({});
  const [amontCurrencyConverting, setAmountCurrencyConverting] = useState(0);

  const handleChange = useCallback(() => {
    setAmountCurrency(document.getElementById("amountCurrency").value);
    setPrimaryCurrencySelected(document.getElementById("primaryCurrencySelected").value);
    setSecondaryCurrencySelected(document.getElementById("secondaryCurrencySelected").value);
  }, [])

  const convertingCurrency = useCallback(() => {
    const params = {
      to_currency: secondaryCurrencySelected,
      function: "CURRENCY_EXCHANGE_RATE",
      from_currency: primaryCurrencySelected
    };
    AlphaVantage.get(params, (res) => {
      setAmountCurrencyConverting(0);
      if ("Error Message" in res) {
        return alert(res["Error Message"]);
      }
      setExchangeRate(res['Realtime Currency Exchange Rate']);
      setAmountCurrencyConverting(res['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amountCurrency);
    });
  })

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
        <div className="col-12">
          <ExchangeRate amontCurrencyConverting={amontCurrencyConverting} exchangeRate={exchangeRate} />
        </div>
        <div className="col-12">
          <Graph />
        </div>
        <div className='col-12'>
          <NewFeed />
        </div>
      </div>
    </div>
  );
}

export default App;
