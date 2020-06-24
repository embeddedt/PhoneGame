

import Modal from 'react-bootstrap/Modal';
import React from 'react';
import Chart from 'chart.js';
import {Bar} from 'react-chartjs-2';
import Button from 'react-bootstrap/Button';

const salesOptions = {
    title: {
        display: true,
        text: 'Phones Sold out of 50,000' 
    },
    tooltips: {
        enabled: false
    },
    hover: {mode: null},
    events: [],
    legend: { display: false},
    scales: {
        xAxes: [{
            stacked: true
        }],
        yAxes: [{
            ticks: {
                suggestedMin: 0,
                suggestedMax: 25000
            },
            scaleLabel: {
                display: true,
                labelString: 'People Surveyed'
            }
        }]
    },
    animation: {
        onComplete: function () {
            var chartInstance = this.chart;
            var ctx = chartInstance.ctx;
            var height = chartInstance.controller.boxes[0].bottom;
            ctx.textAlign = "center";
            const _this = this;
            Chart.helpers.each(_this.data.datasets.forEach(function (dataset, i) {
                if(i != (_this.data.datasets.length-1))
                    return;
                var meta = chartInstance.controller.getDatasetMeta(i);
                Chart.helpers.each(meta.data.forEach(function (bar, index) {
                    ctx.fillText("GOAL", bar._model.x, height - ((height - bar._model.y)) + 12);
                }),this)
            }),this);
        }
    }
}

const salesDataSet = [
    /* perfect */
    [ 11000, 14000, 23000 ],
    /* perfect-ish */
    [ 11000, 14000, 23000 ],
    /* bad */
    [ 9100, 9380, 11260 ]
];
const PhoneSales = (props) => {
    const remainingFeedback = Math.min(2, props.remainingFeedback);
    console.log(remainingFeedback);
    return <Modal show>
        <Modal.Header>
            <Modal.Title>Sales Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Take a look at these sales results.
            <p></p>
            <Bar options={salesOptions} data={{
                labels: [
                    'Month 1',
                    'Month 2',
                    'Month 3'
                ],
                datasets: [
                    {
                        data: salesDataSet[remainingFeedback],
                        backgroundColor: '#ff0000',
                    },
                    {
                        data: [ 10000, 15000, 20000 ],
                        backgroundColor: '#ccc',
                    }
                ]
            }}/>
            {remainingFeedback > 1 && <>
                Was your phone successful? Did you see anything you could improve on?
                <p></p>
                Some of your testers had {remainingFeedback} thing{remainingFeedback == 1 ? "" : "s"} they
                thought you could improve on. Maybe you should address more of their feedback next time.
            </>}
            <p></p>
            Thanks for helping us with this cell phone project. If you'd like to play again,
            click the button below.
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={() => window.location.reload(false)}>Play again</Button>
        </Modal.Footer>
    </Modal>;
};

export default PhoneSales;