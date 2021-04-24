import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card, Button, Alert, Row} from "react-bootstrap"
import {Link} from "react-router-dom";
export default function CurrencyList() {
    const [currency, setCurrency] = useState()
    const [stock, setStock] = useState()
    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',

        };
        axios.get("https://api.hgbrasil.com/finance?format=json-cors&key=00cd6864", {headers}
        ).then(res => {
            var result = res.data.results.currencies
            delete result.source
            setCurrency(result)
            setStock(res.data.results.stocks)

        })
    }, []);
    return (
        <>
            <div style={{padding: 20}}>
                <h2 className="mb-4 text-center">Cotação de moedas</h2>
                {currency ? Object.keys(currency).map((item, i) => (



                    <Card border={currency[item].variation ==0?"primary": currency[item].variation > 0 ?"success":"danger"} className="mb-4 text-center" key={i}>
                        <Card.Header>{currency[item].name}</Card.Header>
                        <Card.Body >
                            <Row className="justify-content-center">
                            <span className="input-label">Compra :R$ {currency[item].buy}</span>
                            </Row>
                            <Row className="justify-content-center">
                                {currency[item].sell !== null &&
                                <span className="input-label">Venda:R$ {currency[item].sell}</span>
                                }
                            </Row>
                            <Row className="justify-content-center">
                            <span className={"input-label " +(currency[item].variation ==0?"text-primary":currency[item].variation <0?"text-danger":"text-success")}> {currency[item].variation}%</span>
                            </Row>
                        </Card.Body>
                        <Link to={"/currency/"+item} className={"btn "+ (currency[item].variation ==0?"btn-primary":currency[item].variation >0? "btn-success":"btn-danger")+ " w-100 mt-3"}>ver mais</Link>
                    </Card>


                )):""}
            </div>
            <div style={{padding: 20}}>
                <h2 className="mb-4 text-center">Ações</h2>
                {stock ? Object.keys(stock).map((item, i) => (



                    <Card border={stock[item].variation ==0?"primary": stock[item].variation > 0 ?"success":"danger"} className="mb-4 text-center" key={i}>
                        <Card.Header>{stock[item].name}</Card.Header>
                        <Card.Body >
                            <Row className="justify-content-center">
                                <span className="input-label">Local : {stock[item].location}</span>
                            </Row>
                            <Row className="justify-content-center">
                                {stock[item].points &&
                                <span className="input-label">Pontos: {stock[item].points}</span>
                                }
                            </Row>
                            <Row className="justify-content-center">
                                <span className={"input-label " +(stock[item].variation <0?"text-danger":"text-success")}> {stock[item].variation}%</span>
                            </Row>
                        </Card.Body>
                        <Link to={"/stock/"+item} className={"btn "+ (stock[item].variation >0? "btn-success":"btn-danger")+ " w-100 mt-3"}>ver mais</Link>
                    </Card>


                )):""}
            </div>
        </>
    );
}