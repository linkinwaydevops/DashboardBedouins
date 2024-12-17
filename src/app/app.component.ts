import { Component, OnInit } from '@angular/core';
import { DashboardService } from './service/dashboard.service';
import { NgForm } from '@angular/forms';
import { UserProfile } from './Model/UserProfile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  

  constructor() {}

  ngOnInit() {
  }

}
