import React,{useState} from 'react';
import { Navbar,Container,Nav,Dropdown,Modal,Button,Form,Table,Row,Col } from 'react-bootstrap';
import Admincourse from "./Admincourse";
import AdminStudent from "./Adminstudent";
import AdminInstitution from "./Admininstitution" ;
import  { useNavigate } from 'react-router-dom'

const Adminacademy = () =>{
    const [viewCourse,setViewCourse] = useState(true);
    const [viewStudent,setViewStudent] = useState(false);
    const [viewInstitute,setViewInstitute] = useState(false);
    const navigate = useNavigate();
    
    return(
        <>
            <Navbar style={{backgroundColor:'purple'}}>
                <Container fluid>
                    <Navbar.Brand href="#">Abacus academy<a href="/"></a></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >

                        <Nav.Link id="userAcademy" style={{ paddingLeft: '100px' ,color:'black' }} onClick={()=>{
                            setViewInstitute(!viewInstitute);
                            setViewStudent(false);
                            setViewCourse(false);
                        }}>Institute</Nav.Link> 
                        <Nav.Link id="userAcademy" style={{ paddingLeft: '100px',color:'black'  }} onClick={()=>{
                            setViewCourse(!viewCourse);
                            setViewStudent(false);
                            setViewInstitute(false);
                        }}>Course</Nav.Link> 
                        <Nav.Link id="userEnrolledCourse"  onClick={()=>{
                            setViewCourse(false);
                            setViewStudent(!viewStudent);
                            setViewInstitute(false);
                        }} style={{ paddingLeft: '100px',color:'black'  }}>Student</Nav.Link> 
                        <Nav.Link id = "logout" style={{ paddingLeft: '300px',color:'black'  }}onClick={()=>{
                                navigate('/');
                                localStorage.setItem("userEmail","");
                            }}>Logout</Nav.Link> 
                    </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
            {
                viewCourse ?
                <>
                    <Admincourse />
                </>:
                null
            }
            {
                viewStudent?
                <AdminStudent/>
                :null
            }
            {
                viewInstitute?
                <AdminInstitution/>
                :null
            }
        </>
    )
}

export default Adminacademy;