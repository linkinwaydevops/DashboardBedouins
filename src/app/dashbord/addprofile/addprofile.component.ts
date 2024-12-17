import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-addprofile',
  templateUrl: './addprofile.component.html',
  styleUrls: ['./addprofile.component.css']
})
export class AddprofileComponent {
  selectedFile: File | null = null;
  progressWidth: number = 50; // Départ sur le premier onglet
  categories: string[] = [
    'Producer',
    'Director',
    'Assistant Director',
    'Production Manager',
    'Production Assistant',
    'Cinematographer',
    'Camera Operator',
    'Assistant Cameraman',
    'Digital Imaging',
    'Technician',
    'Key Grip',
    'Gaffer',
    'Film Editor',
    'Audio Engineer',
    'Casting Director',
    'Script Supervisor',
    'Location Manager',
    'Boom Operator'
  ];  selectedCategory: string = '';

  constructor(private dashboardService: DashboardService, private router: Router) {}

  // Gérer l'événement de sélection du fichier
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  // Soumettre le formulaire
  onSubmit(form: NgForm) {
    if (form.valid && this.selectedFile) {
      const formData = form.value; // Récupérer les données du formulaire
      this.dashboardService.createUserProfile(
        formData.name,
        formData.lastName,
        formData.email,
        formData.dateOfBirth,
        formData.aboutMe,
        formData.mobile,
        formData.location,
        this.selectedCategory, // Inclure la catégorie sélectionnée
        this.selectedFile
      ).subscribe(
        response => {
          console.log('Profile created successfully!', response);
          // Rediriger vers le composant ListProfiles après une soumission réussie
          this.router.navigate(['/ListeProfiles']);
        },
        error => {
          console.error('Error creating profile', error);
        }
      );
    }
  }

  goToProfile() {
    this.progressWidth = 100; // Ajustez la largeur de la barre de progression
    const profileTab = document.querySelector('#profile-tab-2') as HTMLElement;
    const accountTab = document.querySelector('#account-2') as HTMLElement;
    profileTab.classList.add('active', 'show');
    accountTab.classList.remove('active', 'show');
  }
  
  goToAccount() {
    this.progressWidth = 50; // Ajustez la largeur de la barre de progression
    const profileTab = document.querySelector('#profile-tab-2') as HTMLElement;
    const accountTab = document.querySelector('#account-2') as HTMLElement;
    profileTab.classList.remove('active', 'show');
    accountTab.classList.add('active', 'show');
  }
}