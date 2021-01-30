import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { AccountService } from "./account.service";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class HttpReqHeaderInterceptor implements HttpInterceptor {

    public jwtHelper = new JwtHelperService();
    public token: string;
    constructor(public accountService: AccountService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.token = this.accountService.getJwtToken();
        
        // add content-type
        req = req.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            }
        });

        return next.handle(req);
    }
}