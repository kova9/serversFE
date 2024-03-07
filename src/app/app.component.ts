import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'serversFE';
  servers: any[] = [];
  editServerId: string | null = null;
  newServer = {
    id: '',
    name: '',
    address: '',
    memory: '',
    status: '',
  };
  isFormVisible = false;
  constructor(private http: HttpClient) {}

  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  baseUrl = 'http://localhost:8080/api/v1/';
  loadServers() {
    this.http.get(this.baseUrl + 'list').subscribe((res: any) => {
      this.servers = res.data.servers;
    });
  }

  deleteServer(id: String) {
    this.http.delete(this.baseUrl + 'delete/' + id).subscribe((res) => {
      console.log(res);
      this.loadServers();
    });
  }

  toggleEdit(serverId: string): void {
    this.editServerId = this.editServerId === serverId ? null : serverId;
  }

  saveChanges(server: any) {
    this.http.put(this.baseUrl + 'update', server).subscribe((res: any) => {
      this.editServerId = null;
      this.loadServers();
    });
  }

  createServer() {
    this.http.post(this.baseUrl + 'save', this.newServer).subscribe(
      (res: any) => {
        this.newServer = {
          id: '',
          name: '',
          address: '',
          memory: '',
          status: '',
        };
        this.isFormVisible = false;
        this.loadServers();
      },
      (error) => console.log('error while creating')
    );
  }

  ngOnInit(): void {
    this.loadServers();
  }
}
