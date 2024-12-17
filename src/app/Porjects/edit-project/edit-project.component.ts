import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/Model/Project';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit{
  id: number =0;
  projectName: string = '';
  description: string = '';
  userProfileId: number=0;
  projectImagePath: File | null = null;
  test:boolean=false;
  project!: Project ;
  constructor(private routr: ActivatedRoute,private dashboardService: DashboardService, private rou: Router) {}
  ngOnInit() {
    this.id=Number(this.routr.snapshot.paramMap.get('id'));
   
this.GetProject(this.id);

  }
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.projectImagePath = event.target.files[0];
    }

  }
  GetProject(id : any){
    this.dashboardService.getProjectById(id).subscribe(res => {
      this.project = res;
      this.userProfileId=this.project.userProfileId;
    })
  }
  onSubmit() {
    if (this.projectImagePath) {
      this.dashboardService.updateProject(this.project.id, this.project.projectName, this.project.description, this.project.userProfileId, this.projectImagePath).subscribe(
        (response: any) => {
          console.log('Project updated successfully!', response);
          this.rou.navigate(['/Profile', response.userProfile.id]);
        },
        (error: any) => {
          console.error('Error updating project', error);
        }
      );
    }
  }

}
