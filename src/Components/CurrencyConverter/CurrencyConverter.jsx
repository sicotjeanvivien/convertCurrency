import "./CurrencyConverter.css";

const CurrencyConverter = ({ digitalCurrencyList, physicalCurrencyList, amountCurrency, primaryCurrencySelected, secondaryCurrencySelected, onChange, convertingCurrency }) => {

    const renderOptionPhycicalCurrent = physicalCurrencyList.map((currency, key) => {
        return (<option key={key} value={currency.currencyCode} >{currency.currencyCode} - {currency.currencyName}</option>);
    });

    const renderOptionDigitalCurrency = digitalCurrencyList.map((currency, key) => {
        return (<option key={key} value={currency.currencyCode} >{currency.currencyCode} - {currency.currencyName}</option>);
    });

    return (
        <form className="currency-converter">
            <h2>Currency converter</h2>
            <div className="row">
                <div className="col-3">
                    <label htmlFor="amountCurrency" className="form-label">Amount Currency</label>
                    <input type="number" className="form-control" id="amountCurrency"
                        onChange={onChange}
                        defaultValue={amountCurrency}
                    />
                </div>
                <div className="col-3">
                    <label htmlFor="primaryCurrencySelected" className="form-label">Primary Currency</label>
                    <select className="form-select" id="primaryCurrencySelected"
                        defaultValue={primaryCurrencySelected}
                        onChange={onChange}
                    >
                        {renderOptionDigitalCurrency}
                    </select>
                </div>
                <div className="col-3">
                    <label htmlFor="secondaryCurrencySelected" className="form-label">Secondary Currency</label>
                    <select className="form-select" id="secondaryCurrencySelected"
                        defaultValue={secondaryCurrencySelected}
                        onChange={onChange}
                    >
                        {renderOptionPhycicalCurrent}
                    </select>
                </div>
                <div className="col-3 d-flex align-items-end">
                    <button type="button" className="btn btn-light" onClick={convertingCurrency}>Converting</button>
                </div>
            </div>
        </form >
    )
}
export default CurrencyConverter;