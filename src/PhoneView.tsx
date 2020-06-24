import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import classnames from 'classnames';
import { ItemSize, PhoneColor, PhoneShape, Brightness, SoftwareType, KeyboardOption, RubberGrip, YesNo, ButtonColor } from './PhoneEnums';
import useDate from 'react-use-date';
import { pad, PhoneViewProps } from './utils';
import { Howl } from 'howler';

const dialAudio = new Howl({
    src: ['dialing.mp3']
});

const PhoneButton = (props) => {
    let variant;
    if(props.color == ButtonColor.Black)
        variant = "dark";
    else if(props.color == ButtonColor.White)
        variant = "light";
    else if(props.color == "gray")
        variant = "secondary";
    const onClick = () => {
        dialAudio.play();
    };
    return <Button onClick={onClick} className={`phone-button font-weight-bold phone-button-variant-${props.variant}`} variant={variant}>{props.children}</Button>;
};


function doMultiply(val: number, size: ItemSize): number {
    if(size == ItemSize.Medium)
        val *= 1.375;
    else if(size == ItemSize.Large)
        val *= 1.75;
    return val;
}

function extractEnumColor(val: string):string {
    return "#" + /\#(.*?)\;/.exec(val)[1];
}
const Red = (props) => <><span style={{color: "red"}}>{props.children}</span></>;

const PhoneView = (props: PhoneViewProps) => {
    const [ iframeClicks, setIframeClicks ] = React.useState(0);
    let phoneSizeMultiplier = doMultiply(11.4, props.phoneSize);
    let speakerSizeMultiplier = doMultiply(4, props.phoneSize);
    
    let screenSizeMultiplier = 11.4*0.9;
    let buttonSizeMultiplier = doMultiply(1.3, props.buttonSize);
    let screenFontSize = doMultiply(1, props.screenSize);

    let phoneYBorder = props.phoneShape == PhoneShape.Sleek ? doMultiply(6.8571, props.phoneSize) + "em" : null;
    let phoneXBorder = props.phoneShape == PhoneShape.Sleek ? doMultiply(4, props.phoneSize) + "em" : null;
    let phoneBottomBorder = `${phoneXBorder || ""} ${phoneYBorder || ""}`;

    let date = useDate({ interval: "second" });
    const clockString = `${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}:${pad(date.getSeconds(), 2)}`;
    let phoneRubberBorderRadius = (phoneSizeMultiplier * 0.05 * 0.5) + "em";
    let phoneRubberMargin = (phoneSizeMultiplier * 0.05 * 0.5) + "em 0";
    let rubberPieces = [];
    let numRubberPieces;
    if(props.rubberGrip == RubberGrip.Off)
        numRubberPieces = 0;
    else if(props.rubberGrip == RubberGrip.Nubs)
        numRubberPieces = 14;
    else if(props.rubberGrip == RubberGrip.Full)
        numRubberPieces = 1;
    for(var i = 0; i < numRubberPieces; i++) {
        rubberPieces.push(<div key={i} className="rubber-piece" style={{margin: phoneRubberMargin}}></div>);
    }
    return <div className="phone-container">
        <div className={classnames("phone", "phone-" + props.phoneShape.toLowerCase(), "phone-recycled-" + props.recycledCase.toLowerCase())}
            style={{
                borderBottomLeftRadius: phoneBottomBorder,
                borderBottomRightRadius: phoneBottomBorder,
                backgroundColor: extractEnumColor(props.phoneColor),
                width: phoneSizeMultiplier + "em",
                height: (phoneSizeMultiplier * 2) + "em"
            }}>
            <div className="phone-rubber phone-rubber-left" style={{borderRadius: phoneRubberBorderRadius }}>
                {rubberPieces}
            </div>
            <div className="phone-rubber phone-rubber-right" style={{borderRadius: phoneRubberBorderRadius }}>
                {rubberPieces}
            </div>
            <div className="phone-content">
                <div className="speaker" style={{
                    width: speakerSizeMultiplier + "em",
                    height: (speakerSizeMultiplier / 16) + "em",
                    borderRadius: (speakerSizeMultiplier / 32) + "em"
                }}></div>
                <div onClick={() => setIframeClicks(iframeClicks + 1)} className={classnames("phone-screen", "phone-screen-" + props.screenBrightness.toLowerCase())} style={{
                    width: screenSizeMultiplier + "em",
                    height: (screenSizeMultiplier * 0.6) + "em",
                    fontSize: (screenFontSize*100) + "%"
                }}>
                    {props.softwareType != SoftwareType.Smartphone && <>
                        <div className="battery-row">
                            {props.softwareType == SoftwareType.Complex && <span className="top-clock">{clockString}</span>}
                            <i className="fas fa-battery-full"></i>
                        </div>
                        {props.softwareType == SoftwareType.Simple && <span className="clock">{clockString}</span>}
                        {props.softwareType == SoftwareType.Complex && <div className="service-info">
                            <div className="service-text">EP MOBILE<br/>ALARM: 2:30 PM</div>
                            <i className="fas fa-signal"></i>
                        </div>}
                        {props.softwareType == SoftwareType.Complex && <div className="service-info">
                            <div className="service-text">CALL JOE</div>
                            <i className="far fa-envelope"></i>
                        </div>}
                        <div className="phone-number-row">444-444-4444</div>
                    </>}
                    {props.softwareType == SoftwareType.Smartphone && <iframe style={{pointerEvents: iframeClicks > 5 ? "auto" : "none"}} src="phone_os/index.html" className="osjs"></iframe>}
                </div>
                <div className="phone-button-container" style={{ fontSize: (buttonSizeMultiplier*100) + "%"}}>
                    {props.keyboardOption == KeyboardOption.Off && <>
                        <Row>
                            <PhoneButton color={props.buttonColor} variant="normal">1</PhoneButton>
                            <PhoneButton color={props.buttonColor} variant="normal">2</PhoneButton>
                            <PhoneButton color={props.buttonColor} variant="normal">3</PhoneButton>
                        </Row>
                        <Row>
                            <PhoneButton color={props.buttonColor} variant="normal">4</PhoneButton>
                            <PhoneButton color={props.buttonColor} variant="normal">5</PhoneButton>
                            <PhoneButton color={props.buttonColor} variant="normal">6</PhoneButton>
                        </Row>
                        <Row>
                            <PhoneButton color={props.buttonColor} variant="normal">7</PhoneButton>
                            <PhoneButton color={props.buttonColor} variant="normal">8</PhoneButton>
                            <PhoneButton color={props.buttonColor} variant="normal">9</PhoneButton>
                        </Row>
                        <Row>
                            <PhoneButton color={props.buttonColor} variant="normal">*</PhoneButton>
                            <PhoneButton color={props.buttonColor} variant="normal">0</PhoneButton>
                            <PhoneButton color={props.buttonColor} variant="normal">#</PhoneButton>
                        </Row>
                    </>}
                    {props.keyboardOption == KeyboardOption.On && <>
                        <Row>
                            <PhoneButton color={props.buttonColor} variant="skinny">Q</PhoneButton>
                            <PhoneButton color={props.buttonColor} variant="skinny">W</PhoneButton>
                            <PhoneButton color="gray" variant="skinny"><Red>1</Red>E</PhoneButton>
                            <PhoneButton color={props.buttonColor} variant="skinny">R</PhoneButton>
                            <PhoneButton color="gray" variant="skinny"><Red>2</Red>T</PhoneButton>
                            <PhoneButton color={props.buttonColor} variant="skinny">Y</PhoneButton>
                            <PhoneButton color="gray" variant="skinny"><Red>3</Red>U</PhoneButton>
                            <PhoneButton color={props.buttonColor} variant="skinny">I</PhoneButton>
                            <PhoneButton color={props.buttonColor} variant="skinny">O</PhoneButton>
                            <PhoneButton color={props.buttonColor} variant="skinny">P</PhoneButton>
                        </Row>
                        <Row>
                            <PhoneButton color={props.buttonColor} variant="skinny">A</PhoneButton>
                            <PhoneButton color={props.buttonColor} variant="skinny">S</PhoneButton>
                            <PhoneButton color="gray" variant="skinny"><Red>4</Red>D</PhoneButton>
                            <PhoneButton color={props.buttonColor} variant="skinny">F</PhoneButton>
                            <PhoneButton color="gray" variant="skinny"><Red>5</Red>G</PhoneButton>
                            <PhoneButton color={props.buttonColor} variant="skinny">H</PhoneButton>
                            <PhoneButton color="gray" variant="skinny"><Red>6</Red>J</PhoneButton>
                            <PhoneButton color={props.buttonColor} variant="skinny">K</PhoneButton>
                            <PhoneButton color={props.buttonColor} variant="skinny">L</PhoneButton>
                        </Row>
                        <Row>
                            <PhoneButton color={props.buttonColor} variant="skinny">Z</PhoneButton>
                            <PhoneButton color="gray" variant="skinny"><Red>7</Red>X</PhoneButton>
                            <PhoneButton color={props.buttonColor} variant="skinny">C</PhoneButton>
                            <PhoneButton color="gray" variant="skinny"><Red>8</Red>V</PhoneButton>
                            <PhoneButton color={props.buttonColor} variant="skinny">B</PhoneButton>
                            <PhoneButton color="gray" variant="skinny"><Red>9</Red>N</PhoneButton>
                            <PhoneButton color="gray" variant="skinny"><Red>0</Red>M</PhoneButton>
                        </Row>
                    </>}
                </div>
            </div>
        </div>
    </div>;
};

export default PhoneView;