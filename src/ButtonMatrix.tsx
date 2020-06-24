import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';

const ButtonMatrix = (props) => {
    const enumKeys = Object.keys(props.enm).filter(prop => isNaN(parseInt(prop)));
    const onClick = (name) => {
        props.setSelected(props.enm[name]);
    };
    return <Card className="w-100 bg-dark text-warning font-weight-bold text-center">
        <Card.Body className="d-flex flex-column">
            {props.title}
            <ButtonToolbar className="text-white font-weight-normal justify-content-center">
                    {enumKeys.map(name => <Button onClick={onClick.bind(void 0, name)} className="m-1 d-inline-flex justify-content-center align-items-center" active={props.enm[name] == props.selected} variant="secondary" key={name} dangerouslySetInnerHTML={{__html: props.enm[name]}}></Button>)}
            </ButtonToolbar>
        </Card.Body>
    </Card>
};
export default ButtonMatrix;