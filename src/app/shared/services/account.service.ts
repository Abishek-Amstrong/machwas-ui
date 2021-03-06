import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map, mapTo, tap } from "rxjs/operators";
import { User } from "./../models/user";
import { Tokens } from "./../models/tokens";
import { environment } from "../../../environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<User>;
  decodedToken: any;
  currentUser: string;
  jwtHelper = new JwtHelperService();
  private readonly JWT_TOKEN = "JWT_TOKEN";
  private readonly REFRESH_TOKEN = "REFRESH_TOKEN";

  constructor(
    private router: Router,
    private http: HttpClient,
    private toasterService: ToastrService
  ) {
    this.userSubject = new BehaviorSubject<any>(
      localStorage.getItem("userMobile")
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.currentUser = username;
    this.storeTokens(tokens);
  }

  private storeTokens(tokens: Tokens) {
    // localStorage.setItem(this.JWT_TOKEN, tokens.token);
    // const decodedToken = this.jwtHelper.decodeToken(tokens.token);
    // this.userSubject.next(decodedToken);
    // const userId = decodedToken.nameid;
    // localStorage.setItem("userId", userId);
  }

  getUserId() {
    return localStorage.getItem("userId");
  }

  login(email, password) {
    return this.http
      .post<User>(`${environment.apiUrl}/Auth/login`, { email, password })
      .pipe(tap((token: any) => this.doLoginUser(email, token)));
  }

  logout() {
    // remove user from local storage and set current user to null
    this.currentUser = null;
    this.removeTokens();
    this.userSubject.next(null);
    this.router.navigate(["/auth/landing"]);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/adduser`, user);
  }

  getEventsList() {
    return this.http.get(`${environment.apiUrl}/events`);
  }

  getPendingEventsList(user: any) {
    return this.http.get(`${environment.apiUrl}/pendingevents/${user}`);
  }

  getUsersList(mobile?: any) {
    return mobile
      ? this.http.get(`${environment.apiUrl}/user/${mobile}`)
      : this.http.get(`${environment.apiUrl}/user`);
  }

  createEvent(params: any) {
    return this.http.post(`${environment.apiUrl}/createevent`, params);
  }

  getMyEvents(id: any) {
    return this.http.get(`${environment.apiUrl}/myevents/${id}`);
  }

  updateAcceptOrReject(status: any) {
    return this.http.post(`${environment.apiUrl}/acceptorrejectevent`, status);
  }

  // To get OTP
  getOTP(mobile: any) {
    return this.http.get(`${environment.apiUrl}/login/${mobile}`);
  }

  // To verify OTP
  verifyOTP(mobileNumber: any, otp: any) {
    const session = sessionStorage.getItem("sessionId");
    return this.http.get(
      `${environment.apiUrl}/login/${mobileNumber}/${session}/${otp}`
    );
    // .pipe(
    //   tap((token: any) => {
    //     // this.userSubject.next()
    //     console.log(token);
    //   })
    // );
  }

  // To login with Insta
  loginWithInsta() {
    return this.http.get(`https://machwasapp.herokuapp.com/loginwithinsta`, {
      responseType: "text",
    });
  }

  // To update profile
  updateProfile(payload: any) {
    payload["id"] = localStorage.getItem("userMobile")
      ? Number(localStorage.getItem("userMobile"))
      : "";
    return this.http.post(`${environment.apiUrl}/updateprofile`, payload);
  }

  // Google fb login
  thirdPartyLogin(payload: any) {
    return this.http.post(
      `https://machwasapp.herokuapp.com/sociallogin`,
      payload
    );
  }

  // To get the friends list of the logged in user
  getFriendList() {
    // const userId = localStorage.getItem("userMobile");
    return this.http.get(`${environment.apiUrl}/user`);
  }

  // To add a friend to the logged in user
  addFriendToUser(mobileNo: any) {
    const userId = localStorage.getItem("userMobile");
    const payload = {
      mobileNo: mobileNo,
      userId: userId,
    };
    return this.http.post(`${environment.apiUrl}/addfriend`, payload);
  }

  handleError(errorObj: any) {
    if (typeof errorObj.error === "string") {
      this.toasterService.error(errorObj.error);
    } else if (typeof errorObj.error === "object") {
      if ("errors" in errorObj.error) {
        const key = Object.keys(errorObj.error.errors)[0];
        const errorMsg: any = errorObj.error.errors[key][0];
        this.toasterService.error(errorMsg);
      } else {
        this.toasterService.error(errorObj.error.title);
      }
    } else {
      console.log(errorObj);
    }
  }
}
