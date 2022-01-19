import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { curveCardinal } from 'd3-shape';

import './Graph.css';

const Graph = ({ digitalCurrencyMonthly }) => {
    let data = [];

    if (digitalCurrencyMonthly) {
        if ("data" in digitalCurrencyMonthly) {
            Object.entries(digitalCurrencyMonthly["data"]).map((value, key) => {
                data = [{
                    name: value[0],
                    open: value[1]["1b. open (USD)"],
                    high: value[1]["2b. high (USD)"],
                    close: value[1]["4b. close (USD)"],
                }, ...data]

            })
        }
    }
    return (
        <div className='graph d-flex'>
            <ResponsiveContainer width={"100%"} height="80%" minHeight={400} minWidth={"100%"}>
                <LineChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="open" stroke="#8884d8" />
                    <Line type="monotone" dataKey="high" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="close" stroke="#ffc658" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Graph;

