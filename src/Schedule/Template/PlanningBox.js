import React from 'react';
import {Container} from 'reactstrap';
import './css/PlanningBox.css'

class PlanningBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            summary: '',
            dtstart: '',
            dtend: 1,
        }
    }

    render() {
        let s = this.props.dtstart.split('T')[1].substring(0,5)
        let hs = parseInt(s.substring(0,2)) + 2
        let shs = ('0'+hs).slice(-2)
        let ms = s.substring(2,4)
        let e = this.props.dtend.split('T')[1].substring(0,5)
        let he = parseInt(e.substring(0,2)) + 2
        let she = ('0'+he).slice(-2)
        let me = e.substring(2,4)
        let ssumary = this.props.summary.split('-')[0]
        return (
            <Container className={"box"}>
                <p>{ssumary}</p>
                <p>{shs}:{ms} - {she}:{me}</p>
            </Container>

        )
    }
}

export default PlanningBox;
