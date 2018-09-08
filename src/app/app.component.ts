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
  // static FILE_STORAGE="../../../../backend/ExtensionRepository/";
  // static FILE_STORAGE="../../../../../backend/ExtensionRepository/";

  constructor( ) {}

}
