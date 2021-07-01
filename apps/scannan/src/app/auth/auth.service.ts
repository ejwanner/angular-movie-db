import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private accessToken: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getToken() {
    return this.accessToken;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(name: string, email: string, password: string) {
    const authData = {name: name, email: email, password: password};
    this.http.post('http://localhost:3333/signup', authData).subscribe(response => {
        console.log(response);
      })
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post<{accessToken: string, expiresIn: number}>('http://localhost:3333/login', authData).subscribe(response => {
      const accessToken = response.accessToken;
      this.accessToken = accessToken; // TODO refoctor expiration data ... it doesn't work!
      if (accessToken) {
        const expiresInDuration = response.expiresIn;
        console.log(expiresInDuration + 'test');
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(accessToken, expirationDate);
        this.router.navigate(['/']);
      }
    })
  }

  autoAuthUser() { // when data in local storage then authenticate user
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.accessToken = authInfo.accessToken;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.accessToken = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting Timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(accessToken: string, expirationDate: Date) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('expiration', expirationDate.toDateString());
  }

  private clearAuthData() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiration')
  }

  private getAuthData() {
    const accessToken = localStorage.getItem('accessToken');
    const expirationDate = localStorage.getItem('expiration');
    if (!accessToken || !expirationDate) {
      return;
    }
    return {
      accessToken: accessToken,
      expirationDate: new Date(expirationDate)
    }
  }
}
