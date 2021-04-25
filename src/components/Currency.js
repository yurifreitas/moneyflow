import {
    useParams
} from "react-router-dom";
import React, {useEffect, useState} from "react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import axios from "axios";
import {Card} from "react-bootstrap";

export default function Currency() {
    let {slug} = useParams();
    const [currency, setCurrency] = useState()
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
            console.log()
            var result = res.data.results.currencies
            delete result.source
            setCurrency(result)
            var values= data
            Object.keys(result).map((item, i) => {
                if (item == slug) {
                    console.log(item)
                    values.push({"pv": result[item].buy})
                    /*setData("pv":result[item].buy)*/
                }
            })
            console.log(data)
            setData(values)

        })
    },[]);
    return (
        <>
            <div style={{padding: 20}}>
                <h2 className="text-center">Cotação da moeda</h2>
                {currency?
                    Object.keys(currency).map((item, i) => (
                        item == slug &&
                        (
                            <Card className="mb-4 text-center" key={i}>
                                <Card.Header>{currency[item].name}</Card.Header>
                                <Card.Body >

                                    {data && (
                                        <LineChart  width={300} height={100} data={data}>
                                            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2}/>
                                        </LineChart>
                                        )
                                    }
                                </Card.Body>
                            </Card>)


                    ))
                :""}
            </div>
        </>
    );
}