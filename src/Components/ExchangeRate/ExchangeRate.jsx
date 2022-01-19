import "./ExchangeRate.css";

const ExchangeRate = ({amontCurrencyConverting}) => {
    return(
        <div className="exchange-rate">
            <h2>Exchange Rate</h2>
            <div>{amontCurrencyConverting}</div>
        </div>
    )
}

export default ExchangeRate;