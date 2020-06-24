import ButtonMatrix from './ButtonMatrix';
import React, { useState } from 'react';
import { ItemSize, PhoneColor, KeyboardOption, RubberGrip, Brightness, ButtonColor, PhoneShape, SoftwareType, YesNo } from './PhoneEnums';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PhoneView from './PhoneView';
import classnames from 'classnames';
import { getPhoneInfo, PhoneViewProps } from './utils';
import Modal from 'react-bootstrap/Modal';


import(/* webpackPrefetch: true */ "./PhoneTestView");
const PhoneCreationViewCol = (props) => <Col sm className="phone-creation-col">{props.children}</Col>;

const Num = (props: { val: number; suffix?: string; prefix?: string; }) => <span className={classnames("num", "num-" + (Math.sign(props.val) < 0 ? "negative" : "positive"))}>{props.val < 0 && "-"}{props.prefix}{Math.abs(props.val)}{props.suffix && ` ${props.suffix}`}</span>;

const phoneWeightNames = [ "Light", "Medium", "Heavy" ];
const PhoneCreationView = (props) => {
    const [ phoneSize, setPhoneSize ] = React.useState(ItemSize.Small);
    const [ phoneColor, setPhoneColor ] = React.useState(PhoneColor.Gray);
    const [ screenSize, setScreenSize ] = React.useState(ItemSize.Small);
    const [ buttonSize, setButtonSize ] = React.useState(ItemSize.Small);
    const [buttonColor, setButtonColor] = useState(ButtonColor.Black);
    const [ screenBrightness, setScreenBrightness ] = React.useState(Brightness.Dim);
    const [ keyboardOption, setKeyboardOption ] = React.useState(KeyboardOption.Off);
    const [ rubberGrip, setRubberGrip ] = React.useState(RubberGrip.Off);
    const [phoneShape, setPhoneShape] = useState(PhoneShape.Square);
    const [softwareType, setSoftwareType] = useState(SoftwareType.Simple);
    const [ recycledCase, setRecycledCase ] = useState(YesNo.No);
    const [ introDialogShown, setIntroDialogShown ] = useState(false);

    const hideIntroDialog = () => setIntroDialogShown(true);

    React.useLayoutEffect(() => {
        if(props.initialPhone != null) {
            const ip: PhoneViewProps = props.initialPhone;
            setPhoneSize(ip.phoneSize);
            setPhoneColor(ip.phoneColor);
            setScreenSize(ip.screenSize);
            setButtonSize(ip.buttonSize);
            setScreenBrightness(ip.screenBrightness);
            setKeyboardOption(ip.keyboardOption);
            setRubberGrip(ip.rubberGrip);
            setPhoneShape(ip.phoneShape);
            setSoftwareType(ip.softwareType);
            setRecycledCase(ip.recycledCase);
        }
    }, [ props.initialPhone ]);

    const phoneViewProps = {
        phoneSize, phoneColor, screenSize, buttonSize, buttonColor, screenBrightness, keyboardOption,
        rubberGrip, phoneShape, softwareType, recycledCase
    };
    const phoneInfo = getPhoneInfo(phoneViewProps);

    const sendDesign = () => props.onDesign(phoneViewProps);
    return <>
        <Modal show={!introDialogShown} onHide={hideIntroDialog}>
            <Modal.Header>
                <Modal.Title>Design a phone</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                While you are designing your phone, you'll see the cost and battery life indicators
                at the bottom of your screen change.
                <p></p>
                Make sure to keep an eye on these and compare them to your research from earlier!
                Remember that seniors deserve the best phone we can give them.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={hideIntroDialog}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
        <div className="phone-creation-view">
            <PhoneView {...phoneViewProps}/>
            <Container className="phone-matrix-container">
                <Row className="my-3">
                    <PhoneCreationViewCol><ButtonMatrix title="Phone Size" selected={phoneSize} setSelected={setPhoneSize} enm={ItemSize}></ButtonMatrix></PhoneCreationViewCol>
                    <PhoneCreationViewCol><ButtonMatrix title="Screen Size" selected={screenSize} setSelected={setScreenSize} enm={ItemSize}></ButtonMatrix></PhoneCreationViewCol>
                    <PhoneCreationViewCol><ButtonMatrix title="Button Size" selected={buttonSize} setSelected={setButtonSize} enm={ItemSize}></ButtonMatrix></PhoneCreationViewCol>
                </Row>
                <Row className="my-3">
                    <PhoneCreationViewCol><ButtonMatrix title="Screen Brightness" selected={screenBrightness} setSelected={setScreenBrightness} enm={Brightness}></ButtonMatrix></PhoneCreationViewCol>
                    <PhoneCreationViewCol><ButtonMatrix title="Phone Color" selected={phoneColor} setSelected={setPhoneColor} enm={PhoneColor}></ButtonMatrix></PhoneCreationViewCol>
                    <PhoneCreationViewCol><ButtonMatrix title="Button Color" selected={buttonColor} setSelected={setButtonColor} enm={ButtonColor}></ButtonMatrix></PhoneCreationViewCol>
                </Row>
                <Row className="my-3">
                    <PhoneCreationViewCol><ButtonMatrix title="Software Type" selected={softwareType} setSelected={setSoftwareType} enm={SoftwareType}></ButtonMatrix></PhoneCreationViewCol>
                    <PhoneCreationViewCol><ButtonMatrix title="Keyboard Type" selected={keyboardOption} setSelected={setKeyboardOption} enm={KeyboardOption}></ButtonMatrix></PhoneCreationViewCol>
                    <PhoneCreationViewCol><ButtonMatrix title="Phone Shape" selected={phoneShape} setSelected={setPhoneShape} enm={PhoneShape}></ButtonMatrix></PhoneCreationViewCol>
                </Row>
                <Row className="my-3">
                    <PhoneCreationViewCol><ButtonMatrix title="Rubber Grip" selected={rubberGrip} setSelected={setRubberGrip} enm={RubberGrip}></ButtonMatrix></PhoneCreationViewCol>
                    <PhoneCreationViewCol><ButtonMatrix title="Recycled Case" selected={recycledCase} setSelected={setRecycledCase} enm={YesNo}></ButtonMatrix></PhoneCreationViewCol>
                    <PhoneCreationViewCol><Button className="text-white w-100 font-weight-bold" onClick={sendDesign} variant="warning" disabled={phoneInfo.budgetLeft < 0 || phoneInfo.batteryLife < 1}>Test My Phone</Button></PhoneCreationViewCol>
                </Row>
            </Container>
        </div>
        <div className="bottom-bar">
            <Container>
                <Row>
                    <Col>Budget Left: <Num prefix="$" val={phoneInfo.budgetLeft}/></Col>
                    <Col>Battery Life: <Num val={phoneInfo.batteryLife} suffix={Math.abs(phoneInfo.batteryLife) == 1 ? "hour" : "hours"}/></Col>
                </Row>
                <Row>
                    <Col>Phone Cost: <Num prefix="$" val={100-phoneInfo.budgetLeft}/></Col>
                    <Col>Phone Weight: <span className={classnames("num", phoneInfo.phoneWeight == 2 ? "num-negative" : "num-positive")}>{phoneWeightNames[phoneInfo.phoneWeight]}</span></Col>
                </Row>
            </Container>
        </div>
    </>;
};
export default PhoneCreationView;