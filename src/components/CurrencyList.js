import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card, Button, Alert} from "react-bootstrap"
import {Link} from "react-router-dom";
export default function CurrencyList() {
    const [currency, setCurrency] = useState(
        {
            "currencies": {
                "USD": {"name": "Dollar", "buy": 5.493, "sell": 5.4927, "variation": -1.05},
                "EUR": {"name": "Euro", "buy": 6.596, "sell": 6.5965, "variation": -1.23},
                "GBP": {"name": "Pound Sterling", "buy": 7.61, "sell": null, "variation": -1.69},
                "ARS": {"name": "Argentine Peso", "buy": 0.059, "sell": null, "variation": -1.18},
                "CAD": {"name": "Canadian Dollar", "buy": 4.4015, "sell": null, "variation": -1.228},
                "AUD": {"name": "Australian Dollar", "buy": 4.2436, "sell": null, "variation": -1.731},
                "JPY": {"name": "Japanese Yen", "buy": 0.0508, "sell": null, "variation": -1.439},
                "CNY": {"name": "Renminbi", "buy": 0.8461, "sell": null, "variation": -1.393},
                "BTC": {"name": "Bitcoin", "buy": 319746.922, "sell": 319746.922, "variation": -0.055}
            }
        }
    )
    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',

        };
        /*https://api.hgbrasil.com/finance?key=8c8d7bd9*/
        axios.get("https://api.hgbrasil.com/finance?format=json-cors&key=bfdbe6e0", {headers}
        ).then(res => {
            console.log(res);
        })
    });
    return (
        <>
            <div style={{padding: 20}}>
                <h2>CurrencyList</h2>
                {
                    Object.keys(currency.currencies).map((item, i) => (



                        <Card className="mb-4" key={i}>
                            <Card.Header>{currency.currencies[item].name}</Card.Header>
                            <Card.Body>
                                    <span className="input-label">{currency.currencies[item].name}</span>
                            </Card.Body>
                            <Link to={"/currency/"+item} className="btn btn-primary w-100 mt-3">ver mais</Link>
                        </Card>


                    ))
                }
            </div>
        </>
    );
}