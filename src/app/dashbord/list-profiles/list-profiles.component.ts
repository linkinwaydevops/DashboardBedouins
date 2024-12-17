import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/Model/UserProfile';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-list-profiles',
  templateUrl: './list-profiles.component.html',
  styleUrls: ['./list-profiles.component.css']
})
export class ListProfilesComponent implements OnInit {
  userProfiles: UserProfile[] = [];
  selectedCategory: string = '';
  selectedLocation: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  constructor(private router: Router, private dashboardService: DashboardService) {}

  ngOnInit() {
    this.getAllProfiles();
  }

  getAllProfiles() {
    this.dashboardService.getAllUserProfiles().subscribe(res => {
      this.userProfiles = res;
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