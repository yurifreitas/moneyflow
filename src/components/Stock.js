import {
    useParams
} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card} from "react-bootstrap";

export default function Currency() {
    let {slug} = useParams();
    const [stock, setStock] = useState()
    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',

        };
        axios.get("https://api.hgbrasil.com/finance?format=json-cors&key=00cd6864", {headers}
        ).then(res => {
            console.log(res.data.results)
            setStock(res.data.results.stocks)

        })
    },[]);
    return (
        <>
            <div style={{padding: 20}}>
                <h2 className="text-center">Cotação da ação</h2>
                {stock?
                    Object.keys(stock).map((item, i) => (
                        item == slug &&
                        (
                            <Card className="mb-4 text-center" key={i}>
                                <Card.Header>{stock[item].name}</Card.Header>
                            </Card>)


                    ))
                    :""}
            </div>
        </>
    );
}