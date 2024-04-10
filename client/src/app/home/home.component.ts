import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RegisterComponent,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUser();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  getUser() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (response) => (this.users = response),
      error: (error) => console.log(error),
      complete: () => console.log('Request has completed'),
    });
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
