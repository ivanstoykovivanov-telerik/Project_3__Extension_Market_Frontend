import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'extensionMarket';
  static API_URL="http://localhost:8080";

  constructor(public http: HttpClient) {}

  ping() {
    this.http
      .get('http://example.com/api/things')
      .subscribe(
        data => {
          console.log("Ping data: ");
          console.log(data)
        }, 
        err => {
          console.log("Error data: ");
          console.log(err)
        });
  }
}
