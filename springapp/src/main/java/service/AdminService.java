package com.abacus.academy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.abacus.academy.model.CourseDAO;
import com.abacus.academy.model.CourseModel;
import com.abacus.academy.model.InstituteDAO;
import com.abacus.academy.model.InstituteModel;
import com.abacus.academy.model.StudentDAO;
import com.abacus.academy.model.StudentModel;
import com.abacus.academy.repository.CourseRepo;
import com.abacus.academy.repository.InstituteRepo;
import com.abacus.academy.repository.StudentRepo;

@Service
public class AdminService {

	@Autowired
	CourseRepo courseRepo;
	
	@Autowired
	InstituteRepo instituteRepo;
	
	@Autowired
	StudentRepo studentRepo;
	

	public String addCourse(CourseDAO courseDAO) {
		
			CourseModel cm = new CourseModel();
			cm.setCourseName(courseDAO.getCourseName());
			cm.setCourseDescription(courseDAO.getCourseDescription());
			cm.setCourseDuration(courseDAO.getCourseDuration());
			//id will generate automatic;
			
			courseRepo.save(cm);
			return "Course added";
		
	}

	public List<CourseModel> viewCourse() {

		return courseRepo.findAll();
	}

	public String editCourse(int courseId, CourseDAO courseDAO) {
		
			CourseModel existingCourse = courseRepo.findById(courseId).get();

			existingCourse.setCourseName(courseDAO.getCourseName());
			existingCourse.setCourseDescription(courseDAO.getCourseDescription());
			existingCourse.setCourseDuration(courseDAO.getCourseDuration());
			
			courseRepo.save(existingCourse);
			return "Course edited";
		
	}

	public String deleteCourse(int courseId)  {
		
		
			courseRepo.deleteById(courseId);
			return "Course deleted";
		
	}

	public String addInstitute(InstituteDAO instituteDAO) {
		
			InstituteModel im = new InstituteModel();
			im.setInstituteName(instituteDAO.getInstituteName());
			im.setEmail(instituteDAO.getEmail());
			im.setInstituteAddress(instituteDAO.getInstituteAddress());
			im.setInstituteDescription(instituteDAO.getInstituteAddress());
			im.setMobile(instituteDAO.getMobile());
			
			instituteRepo.save(im);
			return "Institue added";
		
	}

	public List<InstituteModel> viewInstitute() {

		return instituteRepo.findAll();
	}

	public String editInstitute(int instituteId, InstituteDAO instituteDAO){
		
		

			InstituteModel existingInstitute = instituteRepo.findById(instituteId).get();
			existingInstitute.setInstituteName(instituteDAO.getInstituteName());
			existingInstitute.setEmail(instituteDAO.getEmail());
			existingInstitute.setInstituteAddress(instituteDAO.getInstituteAddress());
			existingInstitute.setInstituteDescription(instituteDAO.getInstituteAddress());
			existingInstitute.setMobile(instituteDAO.getMobile());
			
			instituteRepo.save(existingInstitute);
			return "Institue edited";
		
	}

	public String deleteInstitute(int instituteId)   {
		
			instituteRepo.deleteById(instituteId);
			return "Institute deleted";
		
	}

	public String addStudent(StudentDAO studentDAO) {
		
			StudentModel sm = new StudentModel();
			sm.setAddress(studentDAO.getAddress());
			sm.setAge(studentDAO.getAge());
			sm.setMobile(studentDAO.getMobile());
			sm.setStudentName(studentDAO.getStudentName());
			studentRepo.save(sm);
			return "Student added";
			
		
	}

	public List<StudentModel> viewStudent() {

		return studentRepo.findAll();
	}

	public String editStudent(int studentId, StudentDAO studentDAO)  {
		
			StudentModel existingStudent = studentRepo.findById(studentId).get();
			existingStudent.setAddress(studentDAO.getAddress());
			existingStudent.setAge(studentDAO.getAge());
			existingStudent.setMobile(studentDAO.getMobile());
			existingStudent.setStudentName(studentDAO.getStudentName());
			studentRepo.save(existingStudent);
			return "Student edited";
		
	}

	public String deleteStudent(int studentId) {
			studentRepo.deleteById(studentId);
			return "Student deleted";
		
	}
	
	
}

