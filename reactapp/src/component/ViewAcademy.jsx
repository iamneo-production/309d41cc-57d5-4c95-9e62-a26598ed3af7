import React,{useState, useRef, useEffect} from 'react';
import { Navbar,Container,Nav,Dropdown,Modal,Button,Form,Table,Row,Col } from 'react-bootstrap';

import  { useNavigate } from 'react-router-dom'
import axios from 'axios';

const ViewAcademy = () =>{

    const navigate = useNavigate();

    


    return (
        <>
            <Navbar style={{backgroundColor:'purple'}}>
                    <Container fluid>
                        <Navbar.Brand href="/viewacademy">Abacus academy<a href="/"></a></Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                              <Nav.Link id="userEnrolledCourse" 
                             style={{ paddingLeft: '100px' }}>Academy</Nav.Link>
                            <Nav.Link id="userEnrolledCourse" style={{ paddingLeft: '100px' }}>Enrolled course</Nav.Link> 
                           
                            <Nav.Link id = "logout" style={{ paddingLeft: '400px' }} onClick={()=>{
                                navigate('/');
                            }}>Logout</Nav.Link> 
                        </Nav>
                         </Navbar.Collapse>
                    </Container>
                </Navbar>
            
        </>
    )
}
export default ViewAcademy;