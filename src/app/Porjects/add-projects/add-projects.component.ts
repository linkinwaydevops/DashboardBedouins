import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.css']
})
export class AddProjectsComponent implements OnInit {
  projectName: string = '';
  description: string = '';
  selectedFiles: File[] = [];
  userId!: any;

  constructor(private router: ActivatedRoute, private route: Router, private dashboardService: DashboardService) {}

  ngOnInit() {
    this.userId = Number(this.router.snapshot.paramMap.get('id'));
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
      this.selectedFiles.forEach(file => {
        const fileType = file.type;
        // Vérifiez que le fichier est soit une image, soit une vidéo
        if (!fileType.startsWith('image/') && !fileType.startsWith('video/')) {
          console.error('Type de fichier non pris en charge:', file.name);
          // Retirer le fichier non pris en charge de la sélection
          this.selectedFiles = this.selectedFiles.filter(f => f !== file);
        } else {
          console.log('Fichier accepté:', file.name);
        }
      });
    }
  }

  onSubmit() {
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
      formData.append('projectName', this.projectName);
      formData.append('description', this.description);
      formData.append('userProfileId', this.userId);
  
      this.selectedFiles.forEach(file => {
        const fileType = file.type;
        // Assurez-vous que vous acceptez les deux types
        if (fileType.startsWith('image/') || fileType.startsWith('video/')) {
          formData.append('images', file, file.name); 
        } else {
          console.error('Type de fichier non pris en charge:', file.name);
        }
      });
  
      // Appeler le service pour créer le projet
      this.dashboardService.createProject(formData).subscribe(
        response => {
          console.log('Project added successfully!', response);
          this.route.navigate(['/Profile', this.userId]);
        },
        error => {
          console.error('Error adding project', error);
        }
      );
    } else {
      console.error('No files selected');
    }
  }
}