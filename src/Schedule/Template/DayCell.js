import React from 'react';
import { Card, CardBody, CardHeader, Container, CardFooter } from 'reactstrap';

class DayCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day_id: '',
            week_id: '',
            day_of_week: 1,
            month: 9,
            day_of_month: 15,
            year: 1998,
            breakfast: "No schedule",
            lunch: "No schedule",
            dinner: "No schedule",
            combined: 0
        }
        this._mounted = false;
        this.baseURL = 'http://localhost:8080/api';
    }

    render() {
        return (
            <Container className={"p-1"}>
                <div className={"day-schedule"}>
                    <b>Bữa sáng:</b><p> {this.props.b}</p>
                    <b>Bữa trưa:</b><br/><p> {this.props.l}</p>
                    <b>Bữa tối:</b><br/><p> {this.props.d}</p>
                </div>
            </Container>

        )
    }
}

export default DayCell;
