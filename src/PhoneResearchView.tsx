import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Chart from 'chart.js';
Chart.defaults.global.maintainAspectRatio = false;
import {Pie, Bar, Line} from 'react-chartjs-2';
import Button from 'react-bootstrap/Button';

const batteryLifeData = {
	labels: [
		'2 hours',
		'3 hours',
        '4 hours',
        '5 hours',
        '6 hours',
        '7 hours',
        '8 hours'
	],
	datasets: [{
        label: 'People Surveyed',
		data: [ 150, 70, 30, 10, 10, 5, 1 ],
		backgroundColor: '#36A2EB',
	}]
};

const batteryLifeOptions = {
    title: {
        display: true,
        text: 'Battery Life' 
    },
    scales: {
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'People Surveyed'
            }
        }]
    }  
}

const usePerDayData = {
    labels: ['Less than 5', '5 minutes', '10 minutes', '15 minutes', '20 minutes', '25 minutes', '30 minutes'],
    datasets: [
      {
        label: 'People Surveyed',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [40, 55, 80, 80, 10, 5, 0]
      }
    ]
};

const usePerDayOptions = {
    title: {
        display: true,
        text: 'Average Use Per Day' 
    },
    scales: {
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'People Surveyed'
            }
        }]
    }
};

const buttonSizeData = {
	labels: [
		'Needs to be larger',
		'Needs to be much larger',
        'Ok as they are',
        'Could be smaller',
        'No preference'
	],
	datasets: [{
        data: [75, 15, 8, 1, 1],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#63FF84',
            '#EBA2EB',
        ],
	}]
};

const buttonSizeOptions = {
    title: {
        display: true,
        text: 'Button Size' 
    }
};

const weightData = {
	labels: [
		'3 oz/85 g',
		'5 oz/142 g',
        '7 oz/198 g',
        '9 oz/255 g',
	],
	datasets: [
        {
            label: 'Strongly dislike',
            data: [ 140, 20, 15, 130 ],
            backgroundColor: '#36A2EB',
        },
        {
            label: 'Dislike',
            data: [ 20, 40, 70, 40 ],
            backgroundColor: '#FF6384',
        },
        {
            label: 'No opinion',
            data: [ 100, 100, 100, 90 ],
            backgroundColor: '#63FF84',
        },
        {
            label: 'Like',
            data: [ 5, 80, 90, 10 ],
            backgroundColor: '#EBA2EB',
        },
        {
            label: 'Strongly like',
            data: [ 1, 20, 1, 0 ],
            backgroundColor: '#FFCE56',
        },
    ]
};

const weightOptions = {
    title: {
        display: true,
        text: 'Opinions on Weight' 
    },
    scales: {
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Number of People'
            }
        }]
    }  
};

const phoneSizeData = {
	labels: [
		'2 x 1.5 in',
		'4 x 1.75 in',
        '5 x 2.25 in',
        '6.5 x 3 in',
	],
	datasets: [
        {
            label: 'Strongly dislike',
            data: [ 150, 30, 20, 70 ],
            backgroundColor: '#36A2EB',
        },
        {
            label: 'Dislike',
            data: [ 90, 50, 45, 80 ],
            backgroundColor: '#FF6384',
        },
        {
            label: 'No opinion',
            data: [ 50, 100, 110, 90 ],
            backgroundColor: '#63FF84',
        },
        {
            label: 'Like',
            data: [ 2, 70, 85, 30 ],
            backgroundColor: '#EBA2EB',
        },
        {
            label: 'Strongly like',
            data: [ 0, 30, 20, 10 ],
            backgroundColor: '#FFCE56',
        },
    ]
};

const phoneSizeOptions = {
    title: {
        display: true,
        text: 'Opinions on Phone Size' 
    },
    scales: {
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Number of People'
            }
        }]
    }  
};


const PhoneResearchView = (props) => {
    return <div className="bg-light research-view-container">
        <span className="light-instructions">
            Explore the research information available to you. When you're ready to start designing,
            click the "Proceed to Design" button.
        </span>
        <Tabs defaultActiveKey="clientneeds" id="research-view-tabs">
            <Tab eventKey="usage" title="Usage">
                <Tabs defaultActiveKey="batterylife" id="usage-tabs">
                    <Tab eventKey="batterylife" title="Battery Life">
                        <Bar options={batteryLifeOptions} data={batteryLifeData}/>
                    </Tab>
                    <Tab eventKey="usePerDay" title="Use Per Day">
                        <Line options={usePerDayOptions} data={usePerDayData as any}/>
                    </Tab>
                </Tabs>
            </Tab>
            <Tab eventKey="dimensions" title="Dimensions">
                <Tabs defaultActiveKey="buttonSize" id="dimension-tabs">
                    <Tab eventKey="buttonSize" title="Button Size">
                        <Pie options={buttonSizeOptions} data={buttonSizeData}/>
                    </Tab>
                    <Tab eventKey="weight" title="Weight">
                        <Bar options={weightOptions} data={weightData}/>
                    </Tab>
                    <Tab eventKey="size" title="Phone Size">
                        <Bar options={phoneSizeOptions} data={phoneSizeData}/>
                    </Tab>
                </Tabs>
            </Tab>
            <Tab eventKey="researchresults" title="Research Results">
                <Tabs defaultActiveKey="interview1" id="research-tabs">
                    <Tab eventKey="interview1" title="Interview 1">
                        I find modern cell phones quite frustrating, to be honest.
                        The buttons are too small for my eyes and too small for my fingers.
                        Also, I don't need all these functions! I don't even know what to
                        do with most of them, so I'd prefer if you'd just get rid of them.
                    </Tab>
                    <Tab eventKey="interview2" title="Interview 2">
                        I've never really wanted a cell phone because I don't want to learn
                        about all these modern features. All I want to do is call 911 or a
                        friend.
                    </Tab>
                    <Tab eventKey="interview3" title="Interview 3">
                        Why do people spend so much time on their phones nowadays? What happened
                        to face-to-face interaction? I just want a simple phone that can
                        be used to communicate with family and friends when we're not together.
                    </Tab>
                    <Tab eventKey="interview4" title="Interview 4">
                        I'm retired, so I don't need email or texting. I just want something
                        I can use to call people with once in a while. It would be even better
                        if I'm only able to call out - no need to worry about others disturbing
                        my peace! By the way, it'd be great if you could make the buttons bigger.
                    </Tab>
                    <Tab eventKey="interview5" title="Interview 5">
                        The phone I have now is really cumbersome to use. The screen's too small
                        and dim to see easily, and the buttons are more like breadcrumbs. There's
                        also too many icons I don't really understand. I'd probably use this phone more
                        and get a lot more out of it if it was easier to use.
                    </Tab>
                    <Tab eventKey="interview6" title="Interview 6">
                        I'm all for shrinking technology and saving money, but if the technology gets
                        too small to even use, it's time to make it bigger!
                    </Tab>
                </Tabs>
            </Tab>
            <Tab eventKey="clientneeds" className="clearfix" title="Client Needs">
                We want a cell phone that will meet the needs of seniors, 65 and older. The
                product needs to cost less than $100 to produce and have a reasonable battery life.
                Even after we add on other costs and a profit margin, the phone's final retail price
                should still be under $200. Give us something seniors will love!
                <img src="images/businessman.svg" className="businessman" alt="Client"/>
            </Tab>
        </Tabs>
        <p></p>
        <Button variant="primary" onClick={props.onDone}>Proceed to Design</Button>
    </div>;
};

export default PhoneResearchView;