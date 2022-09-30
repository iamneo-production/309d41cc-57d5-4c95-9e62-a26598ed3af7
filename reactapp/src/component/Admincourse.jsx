

import React, { useEffect, useRef, useState } from 'react'
import { Navbar,Container,Nav,Dropdown,Modal,Button,Form,Table,Row,Col } from 'react-bootstrap';
import axios from 'axios'; 
import './Login.css'



const Admincourse = () =>{
    
    const courseName = useRef();
    const courseDuration = useRef();
    const courseDescription = useRef();
    
    const [showAddPopUp,setShowAddPopUp] = useState(false);
    const [allCourses,setAllCourses] = useState([]);
    const [showEditPopUP,setShowEditPopUP] = useState(false);
    const[editDate,setEditData] = useState([]);
    

    const getAllCourses = () =>{
        axios.get("http://localhost:8081/admin/viewCourse")
        .then((resp)=>{
            setAllCourses(resp.data);
         })
         .catch((err)=>{
            alert("couldnot get course");
         }) 
        
    }
    useEffect(()=>{
        getAllCourses();
    },[])
 
    const handleAdd = ()=>{
        console.log("here")
        const courseNameV = courseName.current.value;
        const courseDurationV = parseInt(courseDuration.current.value);
        const courseDescriptionV = courseDescription.current.value;
        const obj = {
            courseName : courseNameV,
            courseDuration : courseDurationV,
            courseDescription : courseDescriptionV
        }
        axios.post("http://localhost:8081/admin/addCourse",obj)
        .then((res)=>{
            if(res.data=="Course added"){
                getAllCourses();
               alert('course added')
            }
        })
       
      
        setShowAddPopUp(!showAddPopUp) 
    }

    const handleEdit = ()=>{
        setShowEditPopUP(false)
        const obj = {
            courseName : courseName.current.value? courseName.current.value : editDate.courseName,
            courseDescription : courseDescription.current.value ? courseDescription.current.value : editDate.courseDescription,
            courseDuration : courseDuration.current.value ? courseDuration.current.value : editDate.courseDuration
          }
          axios.put("http://localhost:8081/admin/editCourse/"+editDate.courseId,obj)
          .then((resp)=>{
            if(resp.data=="Course edited"){
                alert("updated");
               
                getAllCourses();
            }
            else{
                alert("failed");
                
            }
          })
     
    }

    const handleDelete = (data)=>{ 
            axios.delete("http://localhost:8081/admin/deleteCourse?courseId="+data.courseId)
            .then((resp)=>{
                if(resp.data=="Course deleted"){
                    getAllCourses();
                
                  alert('course deleted')
                }
                else{
                    alert("course not deleted");
                   
                }
            })
           
    }
    
    return (
        < >
        <div >
            {
                showEditPopUP?
                <>
                    <center>
                    <div  style={{width:'250px'}}>
                        <input type="text" id="courseName" ref={courseName} class="col-3 form-control " placeholder=" Course Name"/><br/>
                        <input type="text" id="courseDuration" ref={courseDuration} class="col-3 form-control " placeholder="Course Duration" /><br/>
                        <input type="text" id="courseDescription" ref={courseDescription} class="col-3 form-control " placeholder="Course Description" /><br/>
                        <button type="button" id="login_btn" class="btn btn-primary" onClick={()=>{handleEdit()}}>Update</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" id="close_btn" class="btn btn-warning" onClick={()=>{setShowEditPopUP(false)}}>close</button><br/>

                    </div>
                    </center>
                </>
                :null
            }

            {
                showAddPopUp?
                <>
                   <center>
                   <div className="bg-container" style={{width:'250px'}}>
                        <input type="text" id="courseName" ref={courseName} class="col-3 form-control " placeholder=" Course Name"/><br/>
                        <input type="text" id="courseDuration" ref={courseDuration} class="col-3 form-control " placeholder="Course Duration" /><br/>
                        <input type="text" id="courseDescription" ref={courseDescription} class="col-3 form-control " placeholder="Course Description" /><br/>
                        <button type="button" id="login_btn" class="btn btn-primary" onClick={handleAdd}>Add</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" id="close_btn" class="btn btn-warning" onClick={()=>{setShowAddPopUp(false)}}>close</button><br/>

                    </div>
                   </center>
                </>
                :null
            }
           
            <div class = "container col-5 mt-5 ">
                {/* <input type="text" id="searchInput" ref={searchInput} class="col-3 form-control " placeholder="Type here to search course" /><br/> */}
                {/* <button type="button" id="searchCourse" class="btn btn-success" onClick={handleSearch}>Search</button>&nbsp;&nbsp;&nbsp;&nbsp; */}
                <button type="button" id="login_btn" class="btn btn-primary" onClick={()=>{setShowAddPopUp(!showAddPopUp)}} >Add Course</button><br/><br/>
            </div>
            
            {/* {
                allCourses && allCourses.map((val)=>{
                   return(
                        <div class = "container  bg-secondary col-5 mt-5  mb-5 p-3">
                            <Row>
                                <Col><label> CourseId</label></Col>
                                <Col><label> {val.courseId}</label></Col>
                            </Row>
                            <Row>
                                <Col><label> CourseName</label></Col>
                                <Col><label> {val.courseName}</label></Col>
                            </Row>
                            <Row>
                                <Col><label> CourseDuration</label></Col>
                                <Col><label> {val.courseDuration}</label></Col>
                            </Row>
                            <Row>
                                <Col><label> Course Description</label></Col>
                                <Col><label> {val.courseDescription}</label></Col>
                            </Row>

                            <Row>
                                <Col>
                                    <button type="button" class="btn btn-primary" aria-label="Left Align" onClick={()=>{setShowEditPopUP(true);setEditData(val)}}>
                                        edit
                                    </button>
                                </Col>
                                <Col>
                                    <button type="button" class="btn btn-danger" aria-label="Left Align"  onClick={()=>{handleDelete(val)}}>
                                        delete
                                    </button>
                                </Col>
                            </Row>
                        </div>
                   )
                })
            } */}
            <Table  >
                <thead>
                    <tr>
                        <th>Course Id</th>
                        <th>Course Name</th>
                        <th>Course Duration in Months</th>
                        <th>Course Description</th>
                        <th>Action</th>
                    </tr>
                </thead><br/>
                <tbody>
                    {
                         allCourses && allCourses.map((val)=>{
                            return(<tr>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>{val.courseId}</td>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>{val.courseName}</td>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>{val.courseDuration}</td>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>{val.courseDescription}</td>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>
                                    <button type="button" id="login_btn" class="btn btn-info" onClick={()=>{setShowEditPopUP(true);setEditData(val)}}>Edit</button>&nbsp;&nbsp;
                                    
                                    <button type="button" id="login_btn" class="btn btn-danger" onClick={()=>{handleDelete(val)}}>Delete</button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
            </div>
        </>
    )
}

export default Admincourse;

import React, { useEffect, useRef, useState } from 'react'
import { Navbar,Container,Nav,Dropdown,Modal,Button,Form,Table,Row,Col } from 'react-bootstrap';
import axios from 'axios'; 
import './Login.css'



const Admincourse = () =>{
    
    const courseName = useRef();
    const courseDuration = useRef();
    const courseDescription = useRef();
    
    const [showAddPopUp,setShowAddPopUp] = useState(false);
    const [allCourses,setAllCourses] = useState([]);
    const [showEditPopUP,setShowEditPopUP] = useState(false);
    const[editDate,setEditData] = useState([]);
    

    const getAllCourses = () =>{
        axios.get("http://localhost:8081/admin/viewCourse")
        .then((resp)=>{
            setAllCourses(resp.data);
         })
         .catch((err)=>{
            alert("couldnot get course");
         }) 
        
    }
    useEffect(()=>{
        getAllCourses();
    },[])
 
    const handleAdd = ()=>{
        console.log("here")
        const courseNameV = courseName.current.value;
        const courseDurationV = parseInt(courseDuration.current.value);
        const courseDescriptionV = courseDescription.current.value;
        const obj = {
            courseName : courseNameV,
            courseDuration : courseDurationV,
            courseDescription : courseDescriptionV
        }
        axios.post("http://localhost:8081/admin/addCourse",obj)
        .then((res)=>{
            if(res.data=="Course added"){
                getAllCourses();
               alert('course added')
            }
        })
       
      
        setShowAddPopUp(!showAddPopUp) 
    }

    const handleEdit = ()=>{
        setShowEditPopUP(false)
        const obj = {
            courseName : courseName.current.value? courseName.current.value : editDate.courseName,
            courseDescription : courseDescription.current.value ? courseDescription.current.value : editDate.courseDescription,
            courseDuration : courseDuration.current.value ? courseDuration.current.value : editDate.courseDuration
          }
          axios.put("http://localhost:8081/admin/editCourse/"+editDate.courseId,obj)
          .then((resp)=>{
            if(resp.data=="Course edited"){
                alert("updated");
               
                getAllCourses();
            }
            else{
                alert("failed");
                
            }
          })
     
    }

    const handleDelete = (data)=>{ 
            axios.delete("http://localhost:8081/admin/deleteCourse?courseId="+data.courseId)
            .then((resp)=>{
                if(resp.data=="Course deleted"){
                    getAllCourses();
                
                  alert('course deleted')
                }
                else{
                    alert("course not deleted");
                   
                }
            })
           
    }
    
    return (
        < >
        <div >
            {
                showEditPopUP?
                <>
                    <center>
                    <div  style={{width:'250px'}}>
                        <input type="text" id="courseName" ref={courseName} class="col-3 form-control " placeholder=" Course Name"/><br/>
                        <input type="text" id="courseDuration" ref={courseDuration} class="col-3 form-control " placeholder="Course Duration" /><br/>
                        <input type="text" id="courseDescription" ref={courseDescription} class="col-3 form-control " placeholder="Course Description" /><br/>
                        <button type="button" id="login_btn" class="btn btn-primary" onClick={()=>{handleEdit()}}>Update</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" id="close_btn" class="btn btn-warning" onClick={()=>{setShowEditPopUP(false)}}>close</button><br/>

                    </div>
                    </center>
                </>
                :null
            }

            {
                showAddPopUp?
                <>
                   <center>
                   <div className="bg-container" style={{width:'250px'}}>
                        <input type="text" id="courseName" ref={courseName} class="col-3 form-control " placeholder=" Course Name"/><br/>
                        <input type="text" id="courseDuration" ref={courseDuration} class="col-3 form-control " placeholder="Course Duration" /><br/>
                        <input type="text" id="courseDescription" ref={courseDescription} class="col-3 form-control " placeholder="Course Description" /><br/>
                        <button type="button" id="login_btn" class="btn btn-primary" onClick={handleAdd}>Add</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" id="close_btn" class="btn btn-warning" onClick={()=>{setShowAddPopUp(false)}}>close</button><br/>

                    </div>
                   </center>
                </>
                :null
            }
           
            <div class = "container col-5 mt-5 ">
                {/* <input type="text" id="searchInput" ref={searchInput} class="col-3 form-control " placeholder="Type here to search course" /><br/> */}
                {/* <button type="button" id="searchCourse" class="btn btn-success" onClick={handleSearch}>Search</button>&nbsp;&nbsp;&nbsp;&nbsp; */}
                <button type="button" id="login_btn" class="btn btn-primary" onClick={()=>{setShowAddPopUp(!showAddPopUp)}} >Add Course</button><br/><br/>
            </div>
            
            {/* {
                allCourses && allCourses.map((val)=>{
                   return(
                        <div class = "container  bg-secondary col-5 mt-5  mb-5 p-3">
                            <Row>
                                <Col><label> CourseId</label></Col>
                                <Col><label> {val.courseId}</label></Col>
                            </Row>
                            <Row>
                                <Col><label> CourseName</label></Col>
                                <Col><label> {val.courseName}</label></Col>
                            </Row>
                            <Row>
                                <Col><label> CourseDuration</label></Col>
                                <Col><label> {val.courseDuration}</label></Col>
                            </Row>
                            <Row>
                                <Col><label> Course Description</label></Col>
                                <Col><label> {val.courseDescription}</label></Col>
                            </Row>

                            <Row>
                                <Col>
                                    <button type="button" class="btn btn-primary" aria-label="Left Align" onClick={()=>{setShowEditPopUP(true);setEditData(val)}}>
                                        edit
                                    </button>
                                </Col>
                                <Col>
                                    <button type="button" class="btn btn-danger" aria-label="Left Align"  onClick={()=>{handleDelete(val)}}>
                                        delete
                                    </button>
                                </Col>
                            </Row>
                        </div>
                   )
                })
            } */}
            <Table  >
                <thead>
                    <tr>
                        <th>Course Id</th>
                        <th>Course Name</th>
                        <th>Course Duration in Months</th>
                        <th>Course Description</th>
                        <th>Action</th>
                    </tr>
                </thead><br/>
                <tbody>
                    {
                         allCourses && allCourses.map((val)=>{
                            return(<tr>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>{val.courseId}</td>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>{val.courseName}</td>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>{val.courseDuration}</td>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>{val.courseDescription}</td>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>
                                    <button type="button" id="login_btn" class="btn btn-info" onClick={()=>{setShowEditPopUP(true);setEditData(val)}}>Edit</button>&nbsp;&nbsp;
                                    
                                    <button type="button" id="login_btn" class="btn btn-danger" onClick={()=>{handleDelete(val)}}>Delete</button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
            </div>
        </>
    )
}

export default Admincourse;