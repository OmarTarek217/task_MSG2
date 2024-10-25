import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherFeaturesService } from 'src/app/teacher-features.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any;
  newCourseForm: FormGroup;

  constructor(private teacherFeaturesService: TeacherFeaturesService, private fb: FormBuilder) {
    this.newCourseForm = this.fb.group({
      name: ['', Validators.required],
      duration: ['', Validators.required],
      level: ['', Validators.required],
      semester: ['', Validators.required],
      description: ['', Validators.required]
    });
  }



  ngOnInit(): void {
    this.loadCourses();
    
  }

  loadCourses(): void {
    this.teacherFeaturesService.viewCourses().subscribe({
      next: (response: { data: any[] }) => {
        console.log('Courses loaded:', response); 
        this.courses = response.data;
      },
      
      error: (err) => {
        console.error('Error fetching courses:', err);
      }
    });
    // console.log(this.courses)
  }

  deleteCourse(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.teacherFeaturesService.deleteCourse(id).subscribe({
          next: () => {
            this.loadCourses();
            Swal.fire({
              icon: 'success',
              title: 'Course deleted successfully!',
              showConfirmButton: false,
              timer: 1500
            });
          },
          error: (err) => {
            console.error('Error deleting course:', err);
            Swal.fire('Error!', 'There was an error deleting the course.', 'error');
          }
        });
      }
    });
  }

  addCourse(): void {
    if (this.newCourseForm.valid) {
      console.log('Sending course data:', this.newCourseForm.value);
      this.teacherFeaturesService.addCourse(this.newCourseForm.value).subscribe({
        next: (response) => {
          console.log('Add course response:', response);
          this.loadCourses(); 
          this.newCourseForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Course added successfully!',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: (err) => {
          console.error('Error adding course:', err);
          Swal.fire('Error!', 'There was an error adding the course.', 'error');
        }
      });
    }
  }
  

  editCourse(id: number): void {
    console.log('Editing course with ID:', id);
  }
}
