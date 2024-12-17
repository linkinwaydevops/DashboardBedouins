import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../Model/UserProfile';
import { Project } from '../Model/Project';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = environment.apiUrl; 

  constructor(private http: HttpClient) { }

  // Utilisateur API

  // Créer un UserProfile
  createUserProfile(name: string, lastName: string, email: string, dateOfBirth: string, aboutMe: string, mobile: string, location: string,category:string, image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('name', name);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('dateOfBirth', dateOfBirth); // supposé être au format 'yyyy-MM-dd'
    formData.append('aboutMe', aboutMe);
    formData.append('mobile', mobile);
    formData.append('location', location);
    formData.append('category', category);
    formData.append('image', image);

    return this.http.post(`${this.baseUrl}/user-profiles`, formData);
}

  // Mise à jour du profil utilisateur
  updateUserProfile(formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/user-profiles`, formData);
  }

  // Récupérer tous les UserProfiles
  getAllUserProfiles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user-profiles`);
  }

  // Récupérer un UserProfile par ID
  getUserProfileById(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/user-profiles/${id}`);
}

  // Supprimer un UserProfile
  deleteUserProfile(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user-profiles/${id}`);
  }

  // Projet API

  // Créer un Project
  createProject(formData: FormData) {
    return this.http.post(`${this.baseUrl}/projects`, formData);
  }

  // Récupérer tous les Projects
  getAllProjects(): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects`);
  }
  getProjectsByUserProfileId(userProfileId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/projects/user/${userProfileId}`);
  }
  // Récupérer un Project par ID
  getProjectById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects/${id}`);
  }

  // Supprimer un Project
  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/projects/${id}`);
  }

  updateProject(id: number, projectName: string, description: string, userProfileId?: number, image?: File): Observable<Project> {
    const formData: FormData = new FormData();
    formData.append('projectName', projectName);
    formData.append('description', description);

    if (userProfileId !== undefined) {
      formData.append('userProfileId', userProfileId.toString());
    }

    if (image) {
      formData.append('image', image);
    }

    return this.http.put<Project>(`${this.baseUrl}/projects/${id}`, formData);
  }
}
