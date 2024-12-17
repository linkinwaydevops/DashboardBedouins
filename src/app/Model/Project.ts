export interface Project {
  id: number;
  projectName: string;
  description: string;
  projectImagePaths: string[]; // Remplacer projectImagePath par projectImagePaths pour une liste d'images
  userProfileId: number; // Assurez-vous que cela correspond au backend, soit par ID ou par objet UserProfile
}