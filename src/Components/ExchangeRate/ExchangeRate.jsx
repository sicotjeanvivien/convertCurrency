import "./ExchangeRate.css";

const ExchangeRate = ({ amontCurrencyConverting, exchangeRate }) => {
    return (
        <div className="exchange-rate">
            <h2>Exchange Rate</h2>
            {amontCurrencyConverting ?

                <div className="row fs-4">
                    <div className="col-6">
                        <div> Result : {amontCurrencyConverting} {exchangeRate["3. To_Currency Code"]}</div>
                    </div>
                    <div className="col-6">
                        1 {exchangeRate["1. From_Currency Code"]} = {exchangeRate["5. Exchange Rate"]} {exchangeRate["3. To_Currency Code"]}
                        {/* {JSON.stringify(exchangeRate)} */}
                    </div>
                </div>
                :
                <div>...</div>
            }
        </div>
    )
}

export default ExchangeRate;

// {"Realtime Currency Exchange Rate":{"1. From_Currency Code":"XTZ","2. From_Currency Name":"Tezos","3. To_Currency Code":"BTC","4. To_Currency Name":"Bitcoin","5. Exchange Rate":"0.00009686","6. Last Refreshed":"2022-01-19 02:19:56","7. Time Zone":"UTC","8. Bid Price":"0.00009684","9. Ask Price":"0.00009693"}}