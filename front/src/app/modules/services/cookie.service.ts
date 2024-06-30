import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  constructor(private http: HttpClient) {}

  setCookie() {
    const headers = { 'Set-Cookie': 'myCookie=value; SameSite=None; Secure' };
    this.http.get('your-api-endpoint', { headers }).subscribe();
  }
}