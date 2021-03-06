import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { fetchApi } from '../src/data/api';
import styles from './App.module.css'

function ChartsList() {
    const [chartData, updateChartData] = useState([])
    console.log("chartData",chartData);
    // console.log("updateChartData",updateChartData);
    useEffect(() => {
        fetchLaunchData()
    }, [])
    async function fetchLaunchData() {
        try {
          const request = await fetchApi()
          for (let i = 0; i < request.length; i++) {
          // console.log("request", request[i].Number);
          updateChartData(request);
          // console.log("updateChartData",updateChartData);
          }
          
        } catch (error) {
          console.log(error);
        }
    }
    function renderBarChartData(barChartData) {
        return (
            <BarChart
                width={1000}
                height={500}
                data={barChartData}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="number" fill="#FFC300" name="Value of Chart"/>
            </BarChart>
        )
    }
    function renderChartData() {
        if (chartData.length) {
          // console.log("chartData",chartData);
            const chartGenData = chartData.map((item) => {
              console.log(item);
                return {
                    'date': item.Date,
                    'number': item.Number,
                    'type': item.Type
                }
            })
            return (
                <div className={styles.container}>
                    {renderBarChartData(chartGenData)}
                </div>
            )
        }
    }
    return (
        <div className={styles.container}>
            {renderChartData()}
        </div>
    );
}

export default ChartsList;