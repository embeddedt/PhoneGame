import 'core-js/features/object/assign';
import 'core-js/features/object/values';
import 'core-js/features/object/keys';
import 'core-js/features/math/sign';
import 'core-js/features/promise';
import ReactDOM from 'react-dom';
import React, { Suspense, lazy } from 'react';
import { PhoneViewProps } from './utils';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const PhoneCreationView = lazy(() => import(/* webpackPrefetch: true */ "./PhoneCreationView"));
const PhoneResearchView = lazy(() => import(/* webpackPrefetch: true */ "./PhoneResearchView"));
const PhoneTestView = lazy(() => import("./PhoneTestView"));
const PhoneSales = lazy(() => import("./PhoneSales"));

function LoadingComponent() {
    return <div className="loader">
        <Spinner animation="border" variant="primary" />
        <span className="font-weight-bolder">Loading...</span>
    </div>;
}
function GameController() {
    const [ designedPhone, setDesignedPhone ] = React.useState<PhoneViewProps>(null);
    const [ overrideAndRedesign, setTestOverride ] = React.useState(false);
    const [ finishedTesting, setFinishedTesting ] = React.useState(false);
    const [ designConfirmed, setDesignConfirmed ] = React.useState(false);
    const [researchConducted, setResearchConducted] = React.useState(false);
    const [ introDialogShown, setIntroShown ] = React.useState(false);
    const [remainingFeedback, setRemainingFeedback] = React.useState(0);
    const onConfirmDesign = () => setDesignConfirmed(true);
    const onIntroShown = () => setIntroShown(true);
    const onSkipResearch = () => {
        setIntroShown(true);
        setResearchConducted(true);
    }
    const doSetDesignedPhone = (p: PhoneViewProps) => {
        setDesignedPhone(p);
        setTestOverride(false);
    }
    const redesign = () => {
        setTestOverride(true);
        setFinishedTesting(false);
        setDesignConfirmed(false);
    }
    if(!introDialogShown)
        return <Modal show={!introDialogShown}>
            <Modal.Header>
                <Modal.Title>Welcome to Phone Production!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                In this game, your job is to design and market a phone for senior citizens.
                <p></p>
                Choose an option to get started!
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onIntroShown}>
                    Conduct research
                </Button>
                <Button variant="secondary" onClick={onSkipResearch}>
                    Start designing
                </Button>
            </Modal.Footer>
        </Modal>;
    if(!researchConducted)
        return <PhoneResearchView onDone={() => setResearchConducted(true)}/>;
    if(designedPhone == null || overrideAndRedesign)
        return <PhoneCreationView initialPhone={designedPhone} onDesign={doSetDesignedPhone}/>;
    else if(!finishedTesting)
        return <PhoneTestView onTestFinished={(rf) => { setRemainingFeedback(rf); setFinishedTesting(true)}} designedPhone={designedPhone}/>;
    else if(!designConfirmed)
        return <Modal show={!designConfirmed}>
            <Modal.Header>
                <Modal.Title>Are you ready?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Alright! You've designed a new phone from the ground up and conducted tests
                with some willing volunteers to validate your design.
                <p></p>
                With the feedback you've been given, are you confident that it is worth our efforts
                to mass-produce and market this phone?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onConfirmDesign}>
                    Yes; proceed to market
                </Button>
                <Button variant="secondary" onClick={redesign}>
                    No; go back and redesign
                </Button>
            </Modal.Footer>
        </Modal>;
    else
        return <PhoneSales remainingFeedback={remainingFeedback}/>;
}
window.onload = function() {
    ReactDOM.render(<Suspense fallback={<LoadingComponent/>}>
        <GameController/>
    </Suspense>, document.getElementById("game-container"));
};