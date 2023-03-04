import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../components/auth/authservice.service';


@Injectable({
  providedIn: 'root'
})
export class AuthinterceptorService implements HttpInterceptor {


  constructor(private authservice:AuthserviceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    

    const token = this.authservice.getToken()
    
    if(token != null){
      const authRequest = req.clone({
        headers : req.headers.set('token',token)
      }) 
      return next.handle(authRequest);
    }
    
    return next.handle(req);

    
  }

}
