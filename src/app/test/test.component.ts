import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../Model/UserProfile';
import { Router } from '@angular/router';
import { DashboardService } from '../service/dashboard.service';
import { Project } from '../Model/Project';
import { catchError, forkJoin, map, of } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent  implements OnInit {
  userProfile!: UserProfile;

  selectedCategory: string = '';
  selectedLocation: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  PorjectList: Project[] = [];
  userProfiles: any[] = [];
  userProjects: { userId: any, projects: Project[] }[] = []; 
  constructor(private router: Router, private dashboardService: DashboardService) {}

  ngOnInit() {
    console.log("hhh") 
    this.getAllProfiles();
  }
 
  getAllProfiles() {
    console.log("mchet")
    this.dashboardService.getAllUserProfiles().subscribe(res => {
      this.userProfiles = res;
      console.log(this.userProfiles)
      this.fetchProjectsForAllUsers();

    });
    
  }
  fetchProjectsForAllUsers() {
    const projectRequests = this.userProfiles.map(user => {
      return this.dashboardService.getProjectsByUserProfileId(user.id).pipe(
        map(projects => ({ userId: user.id, projects })),
        catchError(error => {
          console.error(`Erreur lors de la récupération des projets pour l'utilisateur ${user.id}`, error);
          return of({ userId: user.id, projects: [] }); 
        })
      );
    });

    // Exécute toutes les promesses
    forkJoin(projectRequests).subscribe(results => {
      this.userProjects = results; // Stocke la liste des projets par utilisateur
      console.log(this.userProjects);
    });
  }
  get paginatedProfiles() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.userProfiles.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.userProfiles.length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  viewProfile(userId: number) {
    this.router.navigate(['/Profile', userId]);
    console.log('View profile for user:', userId);
  }

  GetProjectByUserId(userId: any) {
    this.dashboardService.getProjectsByUserProfileId(userId).subscribe(
      res => {
        this.PorjectList = res;
      }
    );
  }
  editProfile(user: UserProfile) {
    this.router.navigate(['/Profile', user.id]);
    console.log('Redirecting to edit profile for user:', user);
  }

  filterProfiles() {
    this.dashboardService.getAllUserProfiles().subscribe(res => {
      this.userProfiles = res.filter(user => {
        return (this.selectedCategory ? user.category === this.selectedCategory : true) &&
               (this.selectedLocation ? user.location === this.selectedLocation : true);
      });
    });
  }

  deleteProfile(userId: number) {
    this.dashboardService.deleteUserProfile(userId).subscribe(
      response => {
        console.log('User deleted successfully', response);
        this.getAllProfiles(); // Refresh the list after deletion
      },
      error => {
        console.error('Error deleting user', error);
      }
    );
  }

  AddProjects(userId: number) {
    this.router.navigate(['/AddProject', userId]);
    console.log('View profile for user:', userId);
  }
  assignProjects(userId: number) {
    console.log('Assign projects for user:', userId);
  }
}
