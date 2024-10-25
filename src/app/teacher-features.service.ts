import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherFeaturesService {

  constructor(private http: HttpClient) {}

  private get headers() {
    const token = localStorage.getItem("token");
    return new HttpHeaders().set("Authorization", `Bearer ${token}`);
  }

  addCourse(form: any): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/store/course", form, { headers: this.headers });

  }

  viewCourses(): Observable<any> {
    return this.http.get("http://127.0.0.1:8000/api/courses/index", { headers: this.headers });
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`http://127.0.0.1:8000/api/courses/${id}`, { headers: this.headers });
  }
}
