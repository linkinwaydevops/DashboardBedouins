import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddprofileComponent } from './dashbord/addprofile/addprofile.component';
import { PorifleUserComponent } from './dashbord/porifle-user/porifle-user.component';
import { ListProfilesComponent } from './dashbord/list-profiles/list-profiles.component';
import { AddProjectsComponent } from './Porjects/add-projects/add-projects.component';
import { EditProjectComponent } from './Porjects/edit-project/edit-project.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {  path:'',  redirectTo :'liste-profiles' , pathMatch: 'full', },
  {  path:'AddProfile',  component:AddprofileComponent},
  {  path:'ListeProfiles',  component:ListProfilesComponent},
  {  path:'liste-profiles',  component:TestComponent},
  { path: 'Profile/:id', component: PorifleUserComponent }, 
  {  path:'AddProject/:id',  component:AddProjectsComponent},
  { path: 'Project/:id', component: PorifleUserComponent }, 
  { path: 'EditProject/:id', component: EditProjectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
