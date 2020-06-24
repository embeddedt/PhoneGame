import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React from 'react';
import classnames from 'classnames';
import { PhoneViewProps, PhoneViewPropsMapping, shuffle, getPhoneInfo } from './utils';
import { Brightness, PhoneShape, ItemSize, SoftwareType, PhoneColor, RubberGrip } from './PhoneEnums';


const Email = (props) => {
    const [ read, setRead ] = React.useState(false);
    const [ emailContentVisible, setEmailContentVisible ] = React.useState(false);
    React.useEffect(() => {
        if(emailContentVisible)
            setRead(true);
    }, [ emailContentVisible ]);
    const handleClose = () => setEmailContentVisible(false);

    return <>
        <tr onClick={() => setEmailContentVisible(true)} className={classnames(read && "read", "email-row")}>   
            <td className="action"></td>
            <td className="action"><i className="fa fa-star-o"></i></td>
            <td className="action"><i className="fa fa-bookmark-o"></i></td>
            <td className="name">{props.name}</td>
            <td className="subject">{props.subject}</td>
            <td className="time">{props.time}</td>
        </tr>
        <Modal show={emailContentVisible} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.subject}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>OK</Button>
            </Modal.Footer>
        </Modal>
    </>;
}


function itemSizeComplaints(name: string, qualifier: string) {
    const verb = name.charAt(name.length-1) == 's' ? 'are' : 'is';
    const a = name.charAt(name.length-1) == 's' ? ' ' : ' a';
    const invertedEr = qualifier == 'small' ? 'larger' : 'smaller';
    return [
        `The ${name} ${verb} a bit ${qualifier}.`,
        `Can you make the ${name} ${invertedEr}?`,
        `I think you need${a} ${invertedEr} ${name}.`,
        `How about making the ${name} ${invertedEr}?`,
        `The ${name} ${verb} a bit ${qualifier}.`,
    ];
}
const sentencePool = {
    subjectPositive: [
        "This phone looks awesome!",
        "High-quality phone",
        "Unbeatable value!",
        "A top-tier product",
        "Great phone design!",
        "Re: Please test this phone prototype"
    ],
    subjectNegative: [
        "This phone could use some work...",
        "Some improvements are needed",
        "Re: Please test this phone prototype",
        "I wouldn't sell this...",
        "A few concerns"
    ],
    screenBrightnessTooLow: [
        "It would help if the screen was a bit brighter.",
        "It was hard to see the text on the screen.",
        "I'm hoping that the dim backlight on this screen is just the result of rushed manufacturing!",
        "You should really consider increasing the screen brightness. I don't think most people will be able to read this.",
        "I'm not really a fan of such a dim screen."
    ],
    screenBrightnessTooHigh: [
        "Are you trying to put the sun in my eyes? This screen is too bright; I don't feel comfortable staring at it for long periods.",
        "The backlight is really powerful. Do seniors really want this much light in their face? I'm not so sure.",
        "Dim the screen, please!",
        "This is too bright for me.",
        "What were you young folks thinking, putting such a bright backlight on a mostly decent screen?"
    ],
    screenSizeTooLow: itemSizeComplaints("screen", "small"),
    buttonSizeTooLow: itemSizeComplaints("buttons", "small"),
    phoneSizeTooLow: itemSizeComplaints("phone", "small"),
    screenSizeTooHigh: itemSizeComplaints("screen", "large"),
    buttonSizeTooHigh: itemSizeComplaints("buttons", "large"),
    phoneSizeTooHigh: itemSizeComplaints("phone", "large"),
    perfectPhone: [
        "Overall, this is a great design, and I'd certainly recommend that you get it on the market as soon as possible.",
        "This is an excellent phone, and I can't wait to see it on store shelves!",
        "I look forward to seeing this phone on store shelves.",
        "This is an excellent design.",
        "Good luck with getting this phone out on the market!"
    ],
    signOffFeedback: [
        "Again, thank you for involving me in the development of this phone.",
        "I look forward to hearing from you when you have an improved design ready.",
        "I look forward to hearing your feedback.",
        "Give it another shot! This is a viable product idea; it just needs some more refactoring.",
        "These shouldn't be difficult to fix; I'm confident that you can make this a world-class phone for seniors!"
    ],
    signOffPerfect: [
        "Again, thank you for involving me in the development of this phone.",
        "I look forward to seeing this phone on the market!",
        "Great work! I'll be buying one of these for sure when it comes out!",
        "Nice job! I'm glad I was able to help you with your testing.",
        "Excellent work! I'm confident that this will become a world-class phone for seniors!"
    ],
    softwareTypeTooLow: [
        "This phone is too boring to use.",
        "The phone needs more features to be useful.",
        "It would be great if you could play games on this and not just call.",
        "This is not the most convenient phone for me, as I can't do anything besides call people with it.",
        "Adding more features would make this a much more useful phone."
    ],
    softwareTypeTooHigh: [
        "I don't understand why all these features are needed. Can't you just make a simple calling device?",
        "You young folks don't understand how difficult it is for us seniors to work with modern-day technology. Rethink your design to fit our needs better. This has too many features.",
        "Please make the phone interface simpler.",
        "We don't need all these features. Just make something simple that we can use to call people.",
        "I think this phone's software is too complicated for its target audience."
    ],
    noGrip: [
        "It's hard to hold this phone.",
        "Seniors with shaky hands will probably have a hard time holding this.",
        "How are you going to handle seniors with hand tremors?",
        "Can you make the phone easier to hold?",
        "It would be great if this phone was easier to hold."
    ],
    moreBattery: [
        "The phone would be more useful if it had a longer battery life.",
        "Right now the phone's battery dies too quickly.",
        "See if you can redesign the phone to last longer while still maintaining usability.",
        "Can you make the phone's battery last longer?",
        "I had to hang up a call with my friend earlier because the phone was running out of battery."
    ]
}

let index: any = {};

Object.keys(sentencePool).forEach(key => {
    shuffle(sentencePool[key]);
    if(sentencePool[key].length < 5)
        console.warn("Only", sentencePool[key].length, "sentence" + (sentencePool[key].length == 1 ? "" : "s") + " for", key);
});

function fetchNextSentence(key: keyof typeof sentencePool): string {
    const pool = sentencePool[key];
    if(typeof pool != 'undefined') {
        if(typeof index[key] == 'undefined')
            index[key] = 0;
        const sentence = pool[index[key]];

        index[key]++;
        if(typeof sentence != 'undefined')
            return sentence;
        else
            return "out of sentences: " + key;
    } else
        return "no sentence: " + key;
}

interface TestFeedback {
    idealPhone: Partial<PhoneViewProps>;
    name: string;
    idealBatteryLife?: number;
    testerIntroduction: string;
}

const larry: TestFeedback = {
    name: "Larry Gardner",
    testerIntroduction: "Thanks so much for inviting me to test this phone. As a 60-year-old with hearing and vision difficulties, having a phone designed specifically for my needs is very important to me.",
    idealPhone: {
        screenBrightness: Brightness.Bright,
        screenSize: ItemSize.Large,
        buttonSize: ItemSize.Large,
        softwareType: SoftwareType.Simple,
        phoneColor: PhoneColor.White
    }
}

const margaret: TestFeedback = {
    name: "Margaret Bakerfield",
    testerIntroduction: "Well, when I heard my son James was testing this new phone of yours, I had to step in before he sent you off on a wild goose chase. We seniors don't want fancy features and tiny phones, we want something useful!",
    idealPhone: {
        screenBrightness: Brightness.Medium,
        phoneSize: ItemSize.Large,
        screenSize: ItemSize.Large,
        buttonSize: ItemSize.Large,
        softwareType: SoftwareType.Simple,
    }
}

const mark: TestFeedback = {
    name: "Mark Krampf",
    testerIntroduction: "Cell phones... one of the worst inventions to ever grace humanity. I sure hope you folks are bringing me something special here, because as far as I'm concerned, the best phone is no phone at all.",
    idealPhone: {
        screenBrightness: Brightness.Bright,
        screenSize: ItemSize.Large,
        buttonSize: ItemSize.Large,
        softwareType: SoftwareType.Simple,
        phoneColor: PhoneColor.White
    },
    idealBatteryLife: 4,
}

const james: TestFeedback = {
    name: "James Bakerfield",
    testerIntroduction: "Yo, what's up? I'm super pumped to be testing out this new phone of yours. I hope you put all the latest gizmos and gadgets in this thing because I've been wanting a fancy phone for quite a while! Oh, and don't mind my grandmother. She just doesn't like technology whatsoever.",
    idealPhone: {
        softwareType: SoftwareType.Smartphone,
        screenSize: ItemSize.Small,
        buttonSize: ItemSize.Small,
        phoneSize: ItemSize.Small,
        phoneColor: PhoneColor.Orange,
    }
};

function createTestFeedback(feedback: TestFeedback, actualPhone: PhoneViewProps): string[] {
    let feedbackEntries: string[] = [];
    Object.keys(feedback.idealPhone).forEach((key: keyof PhoneViewProps) => {
        const actualValueIndex = Object.values(PhoneViewPropsMapping[key]).indexOf(actualPhone[key]);
        const idealValueIndex = Object.values(PhoneViewPropsMapping[key]).indexOf(feedback.idealPhone[key]);
        if(idealValueIndex != actualValueIndex) {
            if(key == "phoneColor") {
                feedbackEntries.push("This isn't really the phone color I'd like. I prefer " + (Object.keys(PhoneColor)[idealValueIndex].toLowerCase()) + ".");
            } else if(key == "rubberGrip") {
                if(feedback.idealPhone.rubberGrip != RubberGrip.Off && actualPhone.rubberGrip == RubberGrip.Off)
                    feedbackEntries.push(fetchNextSentence("noGrip"));
            } else {
                if(idealValueIndex < actualValueIndex)
                    feedbackEntries.push(fetchNextSentence((key + "TooHigh") as any));
                else if(idealValueIndex > actualValueIndex) {
                    feedbackEntries.push(fetchNextSentence((key + "TooLow") as any));
                }
            }
        }
    });
    if(feedback.idealBatteryLife) {
        if(getPhoneInfo(actualPhone).batteryLife < feedback.idealBatteryLife)
            feedbackEntries.push(fetchNextSentence("moreBattery"));
    }
    return feedbackEntries;
}
function genTestFeedback(feedback: TestFeedback, actualPhone: PhoneViewProps, feedbackRef) {
    const feedbackEntries = createTestFeedback(feedback, actualPhone);
    if(!feedback.name.startsWith("James"))
        feedbackRef.current.num = Math.max(feedbackRef.current.num, feedbackEntries.length);

    return <Email name={feedback.name} subject={fetchNextSentence(feedbackEntries.length < 3 ? "subjectPositive" : "subjectNegative")}>
        {feedback.testerIntroduction}
        <p></p>
        {feedbackEntries.length > 0 && <>Here's what I think you could improve on:<p></p></>}
        <ul>
            {feedbackEntries.map((entry, i) => <li key={i}>{entry}</li>)}
        </ul>
        {feedbackEntries.length < 2 && <><p></p>{fetchNextSentence("perfectPhone")}</>}
        <p></p>
        {fetchNextSentence(feedbackEntries.length > 0 ? "signOffFeedback" : "signOffPerfect")}
        <p></p>
        Sincerely,
        <br/>
        {feedback.name.split(" ")[0]}
    </Email>;
}

class TestFeedbackComponent extends React.PureComponent<{ feedbackRef: { current: { num: number } }; tester: TestFeedback; designedPhone: PhoneViewProps; }> {
    constructor(props) {
        super(props);
    }
    render() {
        return genTestFeedback(this.props.tester, this.props.designedPhone, this.props.feedbackRef);
    }
}

const PhoneTestView = (props) => {
    const [ initialModalShown, setInitialModalShown ] = React.useState(true);
    const [canRenderTests, setCanRenderTests] = React.useState(false);
    const feedbackTotalRef = React.useRef({ num: 0 });
    const handleClose = () => setInitialModalShown(false);
    const onClick = () => props.onTestFinished(feedbackTotalRef.current.num);
    React.useLayoutEffect(() => {
        index = {};
        setCanRenderTests(true);
    }, []);
    return <div className="phone-tester-inbox">
        <Modal show={initialModalShown} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Alright!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                We sent your design to the factory and got a few prototypes. The testers have
                just replied with their feedback. Let's take a look!
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
        <Button onClick={onClick} variant="primary" className="continue-button">Continue</Button>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 email-container-col">
                    <div className="grid email">
                        <div className="grid-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <h2 className="grid-title"><i className="fa fa-inbox"></i> Inbox</h2>
                                </div>

                                <div className="col-md-9">
                                    <div className="row feedback-info-row">
                                        Click on each tester's email to read their feedback.
                                    </div>

                                    <div className="col-md-6 search-form">
                                        </div>
                                    </div>
                                    
                                    <div className="padding"></div>
                                    
                                    <div className="table-responsive">
                                        <table className="table">
                                            {canRenderTests && <tbody>
                                                <TestFeedbackComponent feedbackRef={feedbackTotalRef} tester={larry} designedPhone={props.designedPhone}/>
                                                <TestFeedbackComponent feedbackRef={feedbackTotalRef} tester={james} designedPhone={props.designedPhone}/>
                                                <TestFeedbackComponent feedbackRef={feedbackTotalRef} tester={mark} designedPhone={props.designedPhone}/>
                                                <TestFeedbackComponent feedbackRef={feedbackTotalRef} tester={margaret} designedPhone={props.designedPhone}/>
                                            </tbody>}
                                        </table>
                                    </div>					
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
};

export default PhoneTestView;