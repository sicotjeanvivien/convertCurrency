import axios from 'axios';

export default class AlphaVantage {

    static get(params, callback) {
        const options = {
            method: "GET",
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: params,
            headers: {
                'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
                'x-rapidapi-key': 'c2aa852be0msh8eac83396bc7c90p104e01jsn02f9db063a6a'
            }
        };
        axios.request(options).then((res) => {
            callback(res.data);
        }).catch((error) => {
            console.error(error);
        })
    }

    
}


