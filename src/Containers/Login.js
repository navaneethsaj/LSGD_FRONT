import React, {useState} from 'react';
import lottie from 'lottie-web'
import axios from '../axios';
import classes from './Login.css';
import Logo from '../assets/keralalogo.png'
import Covid1 from '../assets/lottie/covid1.json'
import LoginAnim from '../assets/lottie/loginanimation.json'
import Ele from '../assets/lottie/aana.json'
import LoginBg from '../assets/loginbg.png'
import {Button, Card, FormControl, InputGroup} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import $ from 'jquery';
import Spinner from 'react-bootstrap/Spinner';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import Modal from '../Components/Modal/Modal';
import Navbar from "react-bootstrap/Navbar";

function Login(props) {
    const username = useFormInput('');
    const password = useFormInput('');
    // const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [play, setPlay] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [showSpinner,setShowSpinner]=useState(true);
    // handle button click of login form

    const handleLogin = () => {
        setSpinning(true);
        console.log(username, password);
        const authData = {"username": username.value, "password": password.value}
        axios.defaults.withCredentials = true;
        // props.history.push('/dashboard');
        axios.post('/auth/login', authData)
            .then(response => {
                console.log(authData);
                if (response.data.status === 200) {
                    setShowSpinner(true);
                    setShow(false);
                    props.onLoggedIn(response.data.profile.employee_name);
                    console.log("Already logged in");
                    // name=response.data.
                    setTimeout(() => {
                        setShowSpinner(false);
                        props.history.push('LSGD_FRONT/mainpage');
                      }, 1200);
                    // let history = useHistory();
                    // props.history.push('LSGD_FRONT/mainpage');

                } else {
                    setShow(true);
                    setShowSpinner(false);


                }
                setSpinning(false);
                setShowSpinner(false);
                console.log(response);
            }).catch(err => {
            setSpinning(false);
            setShowSpinner(false);
            console.log(err);
        })
    }
    const Error = (props) => {

        if (props.show) {
            return <p className={classes.autherror}>Incorrect username or password !</p>
        } else {
            return null
        }
    }
    $(document).ready(function () {
        if (!play) {
            axios.get('/auth/isloggedin')
                .then(response => {
                    console.log(response);
                    if (response.data.status === 200) {
                        props.onLoggedIn(response.data.profile.employee_name);
                        console.log("Already logged in");
                        // name=response.data.
                        setTimeout(() => {
                            setShowSpinner(false);
                            props.history.push('LSGD_FRONT/mainpage');
                          }, 1200);
                        // props.history.push('LSGD_FRONT/mainpage');
                    } else {
                        setShowSpinner(false);
                        console.log("Not Logged in");


                    }
                })
                .catch(err=>{
                    console.log(err);
                });



            console.log('playing')
        
                setPlay(true);
                lottie.loadAnimation({
                    container: document.getElementById('loginanimation'), // the dom element that will contain the animation
                    renderer: 'svg',
                    loop: false,
                    autoplay: true,
                    animationData: LoginAnim,
                    rendererSettings: {
                        preserveAspectRatio: 'xMinYMin slice',
                        // Supports the same options as the svg element's preserveAspectRatio property
                    }
                }).setSpeed(1.5);
                lottie.loadAnimation({
                container: document.getElementById('elephantanim'), // the dom element that will contain the animation
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: Ele,
            });
        }
    });
    let loginLabel = "Login";
    if (spinning) {
        loginLabel = <Spinner animation="border"/>;
    }
    
    return (
        <div style={{minHeight: '100vh', width: '100%'}}>
            
            <Modal show={showSpinner && false}/>
            <Container fluid style={{height: '100vh', overflow:'hidden'}}>
                <Row>
                    <Col md={3} style={{padding: '0'}}>
                        <Card style={{width: '100%', height: '100vh'}}>
                            <Card.Img variant="top" src={Logo} style={{maxHeight: '50vh', padding: '7%'}}/>
                            {showSpinner && <div id={'elephantanim'} style={{padding: '30%', width: '100%'}}></div>}
                            {!showSpinner && <Card.Body>
                                <Error show={show}/>
                                <InputGroup style={{marginTop: '30%'}} className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        {...username}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        type="password"
                                        placeholder="Password"
                                        aria-label="Password"
                                        aria-describedby="basic-addon1"
                                        {...password}
                                    />
                                </InputGroup>

                                <Button variant="primary" block onClick={handleLogin}>{loginLabel}</Button>
                                <Container>
                                </Container>
                               <Row style={{marginTop: '10px'}}>
                                   <Col style={{textAlign: 'center'}}>
                                       <Link to={'/employsignup'} style={{textAlign: 'center'}}>Sign Up</Link>
                                   </Col>
                                   <Col style={{textAlign: 'center'}}>
                                       <Link to={'/citizenlogin'} style={{textAlign: 'center'}}>Citizen Login</Link>
                                   </Col>
                                   <Col style={{textAlign: 'center'}}>
                                       <Link to={'/adminlogin'} style={{textAlign: 'center'}}>Admin Login</Link>
                                   </Col>
                               </Row>
                                {/*<Button onClick = {() => {*/}
                                {/*    // let url = 'http://localhost:8000/t'*/}
                                {/*    let url = 'https://reboothack12345.herokuapp.com/t'*/}
                                {/*    axios.get(url, {withCredentials: true})*/}
                                {/*        .then(response => {*/}
                                {/*            console.log('a', response.data);*/}
                                {/*        }).catch(err => {*/}
                                {/*        console.log(err);*/}
                                {/*    })*/}
                                {/*    // fetch(url, {*/}
                                {/*    //     method: "GET",*/}
                                {/*    //     headers: {*/}
                                {/*    //         'Accept': 'application/json',*/}
                                {/*    //         'Content-Type': 'application/json',*/}
                                {/*    //         'Cache': 'no-cache'*/}
                                {/*    //     },*/}
                                {/*    //     credentials: 'include'*/}
                                {/*    // })*/}
                                {/*    //     .then((res) => res.json())*/}
                                {/*    //     .then((json) => {*/}
                                {/*    //         console.log(json);*/}
                                {/*    //     })*/}
                                {/*    //     .catch((err) => {*/}
                                {/*    //         console.log(err);*/}
                                {/*    //     });*/}
                                {/*}}>Bs</Button>*/}

                            </Card.Body>}
                        </Card>
                    </Col>
                    <Col md={9} style={{backgroundImage: `url(${LoginBg})`, padding: 0, height: '100vh', overflow: 'hidden'}}>
                        <div style={{position:' relative'}}>
                            <Navbar bg="light" variant="light">
                                <Navbar.Brand href="#home">
                                    <img
                                        alt=""
                                        src={require('../assets/icons/register.png')}
                                        width="30"
                                        height="30"
                                        style={{marginRight: '10px'}}
                                        className="d-inline-block align-top"
                                    />{' '}
                                    Employee Login
                                </Navbar.Brand>
                            </Navbar>
                            <div id={"loginanimation"} style={{ height: '100%', widht: '100%', overflow: 'hidden'}}>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

//Redux


const mapDispatchToProps = dispatch => {
    return {
        onLoggedIn: (name) => dispatch({type: 'LOGIN',name:name})
    };
};


export default connect(null, mapDispatchToProps)(Login);
