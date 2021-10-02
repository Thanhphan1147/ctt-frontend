import React from "react";
import {Col, InputGroup, InputGroupAddon, Input, Button, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import {Redirect} from "react-router-dom";
import ButtonGroup from "reactstrap/lib/ButtonGroup";
import "./Login.css"

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {key: '', token: '', loggedIn: false, tid: 1}
        this._mounted = false;
        this.loggedIn = false;
        this.authenticate = this.authenticate.bind(this);
    }

    authenticate(event) {
        let auth = {
            "key": this.state.key,
            "tid": this.state.tid
        };

        console.log("Send authentication request "+ auth.key + "/" + auth.tid);
        fetch('http://ec2-107-20-17-92.compute-1.amazonaws.com:8080/api/authenticate', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(auth)
        }).then( (response) => {
            if (response.status === 200) {
                toast.success("You are now signed in")
                this.loggedIn = true;
            }
            else {
                this.loggedIn = false;
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
            console.log(responseData);
            if (this._mounted && this.loggedIn) {
                localStorage.setItem("jwtToken", responseData.token);
                localStorage.setItem("exp", responseData.expiration);
                localStorage.setItem("lease", Date.now());
                this.setState({token: responseData.id_token, loggedIn: true});
            }
            console.log(this.state.token);
            return responseData;
        })
        event.preventDefault();
    }

    handleTfChange(event) {
        this.setState({key: event.target.value})
    }

    componentDidMount() {
        this._mounted = true;
    }

    render() {
        if (!this.state.loggedIn) {
            return (
                <Container fluid>
                    <ToastContainer/>
                    <Col sm="12" md={{ size: 6, offset: 3 }} className={"mt-5"}>
                        <Container>
                          <p> Nhập pass và chọn 1 trong 3 nút ở dưới, sau đó ấn Đăng nhập.</p>
                        </Container>
                        <InputGroup className={"pt-3"}>
                        <Input placeholder="Key" type="text" value={this.state.key} onChange={(e) => {this.setState({key: e.target.value})}}/>
                        <InputGroupAddon addonType="append">
                            <Button className={"btn-ninac"} onClick={this.authenticate}>Get access</Button>
                        </InputGroupAddon>
                        </InputGroup>
                        <ButtonGroup className={"pt-3"}>
                          <Button outline className={"btn-ninac"} onClick={(e) => {this.setState({tid: 1})}} active={this.state.tid === 1}>Cô Mai ấn vào đây!!</Button>
                          <Button outline className={"btn-ninac"} onClick={(e) => {this.setState({tid: 2})}} active={this.state.tid === 2}>Béo ấn vào đây</Button>
                          <Button outline className={"btn-ninac"} onClick={(e) => {this.setState({tid: 3})}} active={this.state.tid === 3}>Nút ko để làm gì nhưng mà cô Mai thích số 3</Button>
                        </ButtonGroup>
                    </Col>
                </Container>
            );
        } else {
            return (
                <Container fluid>
                    <ToastContainer/>
                    <div hidden={true}> {toast.success('You are now signed in', {
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })}</div>
                    <Redirect to={"/about"} />
                </Container>
            )
        }
    }
}

export default Login;
