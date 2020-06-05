import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { apiUrls } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private httpOptions = {};
    private userRegisterationUrl = apiUrls.userManager;
    private volunteerManagerUrl = apiUrls.volunteerManager;
    private recipientManagerUrl = apiUrls.recipientManager;

    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          return throwError(`${error.error.warning}`);
        }
        return throwError('Something bad happened');
    }

    constructor(private httpClient: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }
    }

    postUser(formData) {
        return this.httpClient.post( this.userRegisterationUrl, formData, this.httpOptions )
        .pipe(
          catchError(this.handleError)
        );
    }

    putUser(formData) {
        return this.httpClient.put( this.userRegisterationUrl, formData, this.httpOptions )
        .pipe(
            catchError(this.handleError)
        );
    }

    getUsers() {
        return this.httpClient.get(this.userRegisterationUrl, this.httpOptions)
        .pipe(
            catchError(this.handleError)
        );
    }

    postVolunteer(formData) {
        return this.httpClient.post( this.volunteerManagerUrl, formData, this.httpOptions )
        .pipe(
          catchError(this.handleError)
        );
    }

    getVolunteer() {
        return this.httpClient.get(this.volunteerManagerUrl, this.httpOptions)
        .pipe(
            catchError(this.handleError)
        );
    }

    postRecipient(formData) {
        return this.httpClient.post( this.recipientManagerUrl, formData, this.httpOptions )
        .pipe(
          catchError(this.handleError)
        );
    }

    getRecipient() {
        return this.httpClient.get(this.recipientManagerUrl, this.httpOptions)
        .pipe(
            catchError(this.handleError)
        );
    }
}
