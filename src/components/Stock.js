import {
    Link,
    useParams
} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import "./style.css"
import {Card, Row} from "react-bootstrap";
import {Legend, Line, LineChart, ResponsiveContainer, Tooltip} from "recharts";

export default function Currency() {
    let {slug} = useParams();
    const [stock, setStock] = useState()
    const [data, setData] = useState([
        {
            name: 'Page A',
            uv: 4000,
            preco: 5.000,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            preco: 5.998,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            preco: 6.000,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            preco: 6.500,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            preco: 4.800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            preco: 3.800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            preco: 4.300,
            amt: 2100,
        },
        {
            name: 'Page G',
            uv: 3490,
            preco: 5.000,
            amt: 2100,
        },
        {
            name: 'Page G',
            uv: 3490,
            preco: 3.000,
            amt: 2100,
        },
    ])

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',

        };
        axios.get("https://api.hgbrasil.com/finance?format=json-cors&key=45bc7fec", {headers}
        ).then(res => {
            console.log(res.data.results)
            setStock(res.data.results.stocks)
            var values= data
            Object.keys(res.data.results.stocks).map((item, i) => {
                if (item == slug) {
                    console.log(item)
                    values.push({"preco": res.data.results.stocks[item].buy})
                    /*setData("preco":result[item].buy)*/
                }
            })
            console.log(data)
            setData(values)

        })
    }, []);
    return (
        <>
            <div style={{padding: 20}}>
                <Row className="mb-4">
                    <Link to="/">VOLTAR</Link>
                </Row>
                <h2 className="text-center">Cotação da ação</h2>
                {stock ?
                    Object.keys(stock).map((item, i) => (
                        item == slug &&
                        (
                            <Card className="mb-4 text-center" key={i} border={stock[item].variation == 0 ? "primary" : stock[item].variation > 0 ? "success" : "danger"}>
                                <Card.Header>{stock[item].name}</Card.Header>
                                <Card.Body className="overflow-auto">

                                    {data && (

                                        <LineChart  width={300} height={100} data={data}>
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="preco" stroke="#8884d8" strokeWidth={2}/>
                                        </LineChart>

                                    )
                                    }
                                </Card.Body>
                                <Card.Footer className="text-muted">
                                    <span
                                        className={"input-label " + (stock[item].variation == 0 ? "text-primary" : stock[item].variation < 0 ? "text-danger" : "text-success")}> Pontos: {stock[item].points}<br/>{stock[item].variation}%</span>
                                </Card.Footer>
                            </Card>)


                    ))
                    : ""}
            </div>
        </>
    );
}