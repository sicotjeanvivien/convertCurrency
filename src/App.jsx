import { useCallback, useEffect, useState } from 'react';
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
	const [primaryCurrencySelected, setPrimaryCurrencySelected] = useState("BAT");
	const [secondaryCurrencySelected, setSecondaryCurrencySelected] = useState("USD");
	const [exchangeRate, setExchangeRate] = useState({});
	const [amountCurrencyConverting, setAmountCurrencyConverting] = useState(0);
	const [digitalCurrencyMonthly, setDigitalCurrencyMonthly] = useState([])

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
	}, [primaryCurrencySelected, secondaryCurrencySelected, amountCurrency])

	useEffect(() => {
		let isPossible = true;
		if (isPossible) {
			const params = {
				function: 'DIGITAL_CURRENCY_MONTHLY',
				market: secondaryCurrencySelected,
				symbol: primaryCurrencySelected
			};
			AlphaVantage.get(params, (res) => {
				if ("Error Message" in res) {
					return alert(res["Error Message"]);
				}
				setDigitalCurrencyMonthly({
					"metaData": res["Meta Data"],
					"data": res["Time Series (Digital Currency Monthly)"]
				})
			});
		}
	}, [amountCurrencyConverting])

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
					<ExchangeRate amontCurrencyConverting={amountCurrencyConverting} exchangeRate={exchangeRate} />
				</div>
				<div className="col-12">
					<Graph digitalCurrencyMonthly={digitalCurrencyMonthly} />
				</div>
				<div className='col-12'>
					<NewFeed />
				</div>
			</div>
		</div>
	);
}

export default App;
