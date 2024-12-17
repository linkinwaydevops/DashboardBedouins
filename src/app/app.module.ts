import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './dashbord/sidebar/sidebar.component';
import { AddprofileComponent } from './dashbord/addprofile/addprofile.component';
import { FormsModule } from '@angular/forms';
import { ListProfilesComponent } from './dashbord/list-profiles/list-profiles.component';
import { PorifleUserComponent } from './dashbord/porifle-user/porifle-user.component';
import { AddProjectsComponent } from './Porjects/add-projects/add-projects.component';
import { EditProjectComponent } from './Porjects/edit-project/edit-project.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AddprofileComponent,
    ListProfilesComponent,
    PorifleUserComponent,
    AddProjectsComponent,
    EditProjectComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
