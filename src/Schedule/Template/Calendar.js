import React from 'react';
import { Table, Container, Row, Col } from 'reactstrap';
import DayCell from "./DayCell";

require('./Calendar.css')

class Calendar extends React.Component {
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
        console.log(this.props);
        let ds = this.props.days;
        if (ds.length === 7) {
          return (
                  <Container id={"calendar"} className={"pb-3"}>
                  <Table>
                  <tbody><tr>
                  <td className={"fc-header-left"}>
                    <p> Thực đơn tuần thứ {this.props.number} năm {this.props.year} ({ds[0].day_id} / {ds[6].day_id})</p>
                  </td>
                  <td className={"fc-header-right"}>

                  <span className={"fc-button fc-button-prev fc-state-default fc-corner-left"}>
                  <span className="fc-text-arrow">‹</span></span>

                  <span className={"fc-button fc-button-next fc-state-default fc-corner-right"}>
                  <span className={"fc-text-arrow"}>›</span></span>

                  </td>
                  </tr></tbody>
                  </Table>
                  <Container className={"ps-2 pe-2"}>
                    <Row>
                      <Col onClick={ (e) => {this.props.delegate(ds[0])} }>
                        <Row className={"fc-first fc-last-row"}><Col className={"fc-day-header fc-widget-header fc-first"}>MON</Col></Row>
                        <Row className={"fc-last-row"}><Col className={"fc-day-col fc-widget-content p-0 align-left"}>
                        <DayCell day={ds[0].day_of_month} month={ds[0].month} b={ds[0].breakfast} l={ds[0].lunch} d={ds[0].dinner}/></Col></Row>
                      </Col>
                      <Col onClick={ (e) => {this.props.delegate(ds[1])} }>
                        <Row className={"fc-first fc-last-row"}><Col className={"fc-day-header fc-widget-header fc-first"}>TUE</Col></Row>
                        <Row className={"fc-last-row"}><Col className={"fc-day-col fc-widget-content p-0 align-left"}>
                        <DayCell day={ds[1].day_of_month} month={ds[1].month} b={ds[1].breakfast} l={ds[1].lunch} d={ds[1].dinner}/></Col></Row>
                      </Col>
                      <Col onClick={ (e) => {this.props.delegate(ds[2])} }>
                        <Row className={"fc-first fc-last-row"}><Col className={"fc-day-header fc-widget-header fc-first"}>WED</Col></Row>
                        <Row className={"fc-last-row"}><Col className={"fc-day-col fc-widget-content p-0 align-left"}>
                        <DayCell day={ds[2].day_of_month} month={ds[2].month} b={ds[2].breakfast} l={ds[2].lunch} d={ds[2].dinner}/></Col></Row>
                      </Col>
                      <Col onClick={ (e) => {this.props.delegate(ds[3])} }>
                        <Row className={"fc-first fc-last-row"}><Col className={"fc-day-header fc-widget-header fc-first"}>THU</Col></Row>
                        <Row className={"fc-last-row"}><Col className={"fc-day-col fc-widget-content p-0 align-left"}>
                        <DayCell day={ds[3].day_of_month} month={ds[3].month} b={ds[3].breakfast} l={ds[3].lunch} d={ds[3].dinner}/></Col></Row>
                      </Col>
                      <Col onClick={ (e) => {this.props.delegate(ds[4])} }>
                        <Row className={"fc-first fc-last-row"}><Col className={"fc-day-header fc-widget-header fc-first"}>FRI</Col></Row>
                        <Row className={"fc-last-row"}><Col className={"fc-day-col fc-widget-content p-0 align-left"}>
                        <DayCell day={ds[4].day_of_month} month={ds[4].month} b={ds[4].breakfast} l={ds[4].lunch} d={ds[4].dinner}/></Col></Row>
                      </Col>
                      <Col onClick={ (e) => {this.props.delegate(ds[5])} }>
                        <Row className={"fc-first fc-last-row"}><Col className={"fc-day-header fc-widget-header fc-first"}>SAT</Col></Row>
                        <Row className={"fc-last-row"}><Col className={"fc-day-col fc-widget-content p-0 align-left"}>
                        <DayCell day={ds[5].day_of_month} month={ds[5].month} b={ds[5].breakfast} l={ds[5].lunch} d={ds[5].dinner}/></Col></Row>
                      </Col>
                      <Col onClick={ (e) => {this.props.delegate(ds[6])} }>
                        <Row className={"fc-first fc-last-row"}><Col className={"fc-day-header fc-widget-header fc-first"}>SUN</Col></Row>
                        <Row className={"fc-last-row"}><Col className={"fc-day-col fc-widget-content p-0 align-left"}>
                        <DayCell day={ds[6].day_of_month} month={ds[6].month} b={ds[6].breakfast} l={ds[6].lunch} d={ds[6].dinner}/></Col></Row>
                      </Col>
                    </Row>
                  </Container>
                  </Container>
          )
        } else {
          return (
            <Container id={"calendar"} className={"p-3"}>
              <p>NO DATA</p>
            </Container>
          )
        }
    }
}

export default Calendar;
