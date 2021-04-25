import {
    useParams
} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card} from "react-bootstrap";
import {Line, LineChart} from "recharts";

export default function Currency() {
    let {slug} = useParams();
    const [stock, setStock] = useState()
    const [data, setData] = useState(
        []
    )
    setData([
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
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
                    values.push({"pv": res.data.results.stocks[item].buy})
                    /*setData("pv":result[item].buy)*/
                }
            })
            console.log(data)
            setData(values)

        })
    }, []);
    return (
        <>
            <div style={{padding: 20}}>
                <h2 className="text-center">Cotação da ação</h2>
                {stock ?
                    Object.keys(stock).map((item, i) => (
                        item == slug &&
                        (
                            <Card className="mb-4 text-center" key={i}>
                                <Card.Header>{stock[item].name}</Card.Header>
                                <Card.Body>
                                    {data && (
                                        <LineChart  width={300} height={100} data={data}>
                                            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2}/>
                                        </LineChart>
                                    )
                                    }
                                </Card.Body>
                            </Card>)


                    ))
                    : ""}
            </div>
        </>
    );
}