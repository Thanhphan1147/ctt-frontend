import React from 'react';
import {Col, InputGroup, InputGroupAddon, Input, Button, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Card, CardBody, CardHeader, CardFooter} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import {Redirect} from "react-router-dom";
import ButtonGroup from "reactstrap/lib/ButtonGroup";
import Calendar from "./Template/Calendar";
import PlanningBox from "./Template/PlanningBox";

class Schedule extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        week_id: 0,
        year: 1998,
        month: 9,
        number: 1,
        monday: '',
		    tuesday: '',
		    wednesday: '',
		    thursday: '',
		    friday: '',
		    saturay: '',
		    sunday: '',
		    week_start: 1,
		    week_end: 30,
        days: [],
        redirect: null,
        detail_day: 15,
        detail_month: 9,
        detail_year: 1998,
        detail_break: "",
        detail_lunch: "",
        detail_dinne: "",
        detail_day_id: null,
        plannings: [],
      }
      this._mounted = false;
      this.loggedIn = false;
      this.token = null;
      this.exp = null;
      this.baseURL = 'http://ec2-107-20-17-92.compute-1.amazonaws.com:8080/api';
      // Bind methods
      this.success = false;
      this.fetchWeekData = this.fetchWeekData.bind(this);
      this.openDetailView = this.openDetailView.bind(this);
  }

  fetchWeekData() {
    fetch(this.baseURL +'/schedule/view', {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + this.token
        }
    }).then( (response) => {
        if (response.status === 200) {
            this.success = true;
        }
        else {
            this.success = false;
            toast.error('Invalid credentials: ' + response.error, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        return response.json();
    }).then( (responseData) => {
        let wid = responseData.week.week_id;
        this.setState({
          week_id: wid,
          number: responseData.week.number,
          year: responseData.week.year,
          month: responseData.week.month,
          monday: responseData.week.monday,
          sunday: responseData.week.sunday,
          week_start: responseData.week.week_start,
        })
        this.fetchWeekDays(wid);
        // console.log(responseData.week);
        return responseData;
    })
  }

  fetchWeekDays(wid) {
    this.success = false;
    fetch(this.baseURL+'/schedule/days/'+wid, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + this.token
        }
    }).then( (response) => {
        if (response.status === 200) {
            this.success = true;
        }
        else {
            this.success = false;
            toast.error('Error performing request', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        return response.json();
    }).then( (responseData) => {
      let res = responseData.days;

      let first = res[0]

      this.setState({
        days: res,
        detail_day: first.day_of_month,
        detail_month: first.month,
        detail_year: first.year,
        detail_breakfast: first.breakfast,
        detail_lunch: first.lunch,
        detail_dinner: first.dinner,
        detail_day_id: first.day_id
      });
      // console.log(responseData);
      this.fetchPlanning(first.day_id);
    })
  }

  fetchPlanning(did) {
    this.success = false;
    fetch(this.baseURL+'/schedule/days/planning/'+did, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + this.token
        }
    }).then( (response) => {
        if (response.status === 200) {
            this.success = true;
        }
        else {
            this.success = false;
            toast.error('Error performing request', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        return response.json();
    }).then( (responseData) => {
      // sorted array of classes
      this.setState({
        plannings: responseData.plannings
      });
    })
  }

  openDetailView(day) {
    this.setState({
      detail_day: day.day_of_month,
      detail_month: day.month,
      detail_year: day.year,
      detail_breakfast: day.breakfast,
      detail_lunch: day.lunch,
      detail_dinner: day.dinner,
      detail_day_id: day.day_id
    })
    this.fetchPlanning(day.day_id);
    console.log(this.state.detail_day_id);
  }

  setDetailSchedule(e, key) {
    let value = e.target.value
    switch (key) {
      case "detail_breakfast":
        this.setState({detail_breakfast: value})
        break;
      case "detail_lunch":
        this.setState({detail_lunch: value})
        break;
      case "detail_dinner":
        this.setState({detail_dinner: value})
        break;
      default:
        break;
    }
    e.preventDefault();
  }

  updateDay(e) {
    this.success = false;
    console.log(`---${this.state.detail_day_id}`);
    if(this.state.detail_day_id) {

      let body = JSON.stringify({
          "breakfast": this.state.detail_breakfast,
          "lunch": this.state.detail_lunch,
          "dinner": this.state.detail_dinner,
      })

      fetch(this.baseURL+'/schedule/days/'+this.state.detail_day_id, {
          method: 'PUT',
          headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + this.token,
          },
          body: body,
          redirect: 'follow',
      }).then( (response) => {
          if (response.status === 200) {
              this.success = true;
          }
          else {
              this.success = false;
              toast.error('Error performing request', {
                  position: "bottom-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
              });
          }
          return response.json();
      }).then( (responseData) => {
          let res = responseData.updated;
          console.log(res);
          this.fetchWeekData();
        })
      e.preventDefault();
    }
  }

  componentDidMount() {
    this._mounted = true;
    let token = localStorage.getItem('jwtToken')
    let exp = localStorage.getItem('exp')
    let lease = localStorage.getItem('lease')
    if (token == null || (exp != null && exp + lease < Date.now())) {
      toast.error("You are not signed in")
      console.log(token + "is null")
      this.setState({ redirect: "/login" })
    }
    else {
      this.token = token
      this.exp = exp + lease
    }
    this.fetchWeekData()
  }

  render() {
      let pl = this.state.plannings;
      let classes = pl.map( (p) =>
        <PlanningBox summary={p.summary} dtstart={p.dtstart} dtend={p.dtend} key={p.summary+'-'+p.dtstart}/>
      );

      if (!this.state.redirect) {
          return (
              <Container fluid>
                  <ToastContainer/>
                  <Calendar number={this.state.number} year={this.state.year} s={this.state.week_start} days={this.state.days} delegate={this.openDetailView} />
                  <Row>
                    <Col md={{size: 3, offset: 0}} id={"detail_view"}>
                      <Card>
                          <CardHeader>
                              <p>Ngày {this.state.detail_day} tháng {this.state.detail_month} năm {this.state.detail_year}</p>
                              <Button onClick={ (e) => {this.updateDay(e)}}>Lưu </Button>
                          </CardHeader>
                          <CardBody className={"p-1"}>
                              <Container className={"p-0"}>
                              <b>Bữa sáng:</b>
                              <Input placeholder="" type="text" value={this.state.detail_breakfast} onChange={(e) => {this.setDetailSchedule(e, "detail_breakfast")}}/>
                              <b>Bữa trưa:</b><br/>
                              <Input placeholder="" type="text" value={this.state.detail_lunch} onChange={(e) => {this.setDetailSchedule(e, "detail_lunch")}}/>
                              <b>Bữa tối:</b><br/>
                              <Input placeholder="" type="text" value={this.state.detail_dinner} onChange={(e) => {this.setDetailSchedule(e, "detail_dinner")}}/>
                              </Container>
                          </CardBody>
                      </Card>
                    </Col>
                    <Col md={{size: 3, offset: 0}} id={"hyperplanning"}>
                      <Card>
                          <CardHeader>
                              Lịch học của béo ngày {this.state.detail_day}/{this.state.detail_month}
                          </CardHeader>
                          <CardBody className={"p-1"}>
                              <Container className={"p-1"}>
                                  {classes}
                              </Container>
                          </CardBody>
                      </Card>
                    </Col>
                    <Col md={{size: 3, offset: 0}} id={"to-do-list-mai"}>
                      <Card>
                          <CardHeader>
                              <p>To-do list của cô Mai</p>
                          </CardHeader>
                          <CardBody>
                              <Container>
                                  <p>Béo vẫn đang làm ạ cô mai chờ tí nhá!</p>
                              </Container>
                          </CardBody>
                      </Card>
                    </Col>
                  </Row>
              </Container>
          );
      } else {
          return <Redirect to={this.state.redirect} />
      }
  }
}

export default Schedule;
