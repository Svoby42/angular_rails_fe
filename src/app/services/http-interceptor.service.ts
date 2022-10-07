import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { NgIfContext } from "@angular/common";
import { UserService } from "./user.service";
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService, private userService: UserService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.userService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
        return next.handle(req);
    }
}