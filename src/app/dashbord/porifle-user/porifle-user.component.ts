import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/Model/Project';
import { UserProfile } from 'src/app/Model/UserProfile';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-porifle-user',
  templateUrl: './porifle-user.component.html',
  styleUrls: ['./porifle-user.component.css']
})
export class PorifleUserComponent implements OnInit {
  userProfile!: UserProfile;
  selectedFile: File | null = null;
  usId: any;
  projects: Project[] = [];
  
  PorjectList: Project[] = [];
  selectedProject: Project | null = null; // Ajoutez cette ligne

  constructor(
    private router: ActivatedRoute,
    private rou: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    const userId = Number(this.router.snapshot.paramMap.get('id'));
    this.usId = userId;
    this.fetchUserProfile(userId);
    this.GetProjectByUserId(userId);    
  }

  fetchUserProfile(id: number) {
    this.dashboardService.getUserProfileById(id).subscribe(
      (data: UserProfile) => {
        if (data.dateOfBirth) {
          data.dateOfBirth = new Date(data.dateOfBirth);
        }
        this.userProfile = data;
      },
      error => {
        console.error('Error fetching user profile', error);
      }
    );
  }

  GetProjectByUserId(userId: any) {
    this.dashboardService.getProjectsByUserProfileId(userId).subscribe(
      res => {
        this.PorjectList = res;
      }
    );
  }

  viewProjectDetails(projectId: number) {
    this.rou.navigate(['/EditProject', projectId]);
  }

  deleteProject(projectId: number) {
    this.dashboardService.deleteProject(projectId).subscribe(
      response => {
        console.log('Project deleted successfully', response);
        this.GetProjectByUserId(this.usId);
      },
      error => {
        console.error('Error deleting Project', error);
      }
    );
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  AddProjects(userId: number) {
    this.rou.navigate(['/AddProject', userId]);
    console.log('View profile for user:', userId);
  }

  onSubmit() {
    if (this.userProfile) {
      const formData = new FormData();
      formData.append('id', this.userProfile.id.toString());
      formData.append('name', this.userProfile.name);
      formData.append('lastName', this.userProfile.lastName);
      formData.append('email', this.userProfile.email);
      
      if (this.userProfile.dateOfBirth) {
        formData.append('dateOfBirth', this.userProfile.dateOfBirth.toISOString().split('T')[0]);
      } else {
        console.error('Date of Birth is invalid or empty');
        return;
      }

      formData.append('aboutMe', this.userProfile.aboutMe);
      formData.append('mobile', this.userProfile.mobile);
      formData.append('location', this.userProfile.location);

      if (this.selectedFile) {
        formData.append('profileImage', this.selectedFile);
      }

      console.log('Submitting user profile:', formData);

      this.dashboardService.updateUserProfile(formData).subscribe(
        response => {
          console.log('Profile updated successfully!', response);
          this.rou.navigate(['/ListeProfiles']);
        },
        error => {
          console.error('Error updating profile', error);
        }
      );
    }
  }

  openProjectModal(project: Project) {
    this.selectedProject = project; // Stocker le projet sélectionné
    // Affichage du modal géré par le HTML et les attributs Bootstrap
  }
}