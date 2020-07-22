import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { apiUrls } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private httpOptions = {};
    private userRegisterationUrl = apiUrls.userManager;
    private volunteerManagerUrl = apiUrls.volunteerManager;
    private recipientManagerUrl = apiUrls.recipientManager;
    private loginManagerUrl = apiUrls.loginManager;
    private donorManagerUrl = apiUrls.donorManager;
    private requestManagerUrl = apiUrls.requestManager;
    private getUserByIdUrl = apiUrls.getUserById;
    private getUserByReferedByUrl = apiUrls.getUserByReferedBy;
    private getRequestsByIdUrl = apiUrls.getRequestsById;
    private getVolunteerByIdUrl = apiUrls.getVolunteerById;
    private getRequestsByHandledByUrl = apiUrls.getRequestsByHandledBy;
    private getRecipientsByReferedByUrl = apiUrls.getRecipientsByReferedBy;
    private getRecipientByIdUrl = apiUrls.getRecipientsById;
    private getDonorByIdUrl = apiUrls.getDonorbyId;

    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          return throwError(`${error.error.warning}`);
        }
        return throwError('Something bad happened');
    }

    constructor(private httpClient: HttpClient, private router: Router) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }
    }

    getRecipientsByReferedBy(referedBy) {
        console.log(referedBy)
        return this.httpClient.get(this.getRecipientsByReferedByUrl + '?referedBy='+referedBy, this.httpOptions)
        .pipe(
            catchError(this.handleError)
        );
    }

    getUserByReferedBy(referedBy) {
        console.log(referedBy)
        return this.httpClient.get(this.getUserByReferedByUrl + '?referedBy='+referedBy, this.httpOptions)
        .pipe(
            catchError(this.handleError)
        );
    }

    getRecipientById(Id) {
        console.log(Id)
        return this.httpClient.get(this.getRecipientByIdUrl + '?recipient_id='+Id, this.httpOptions)
        .pipe(
            catchError(this.handleError)
        );
    }

    getDonorById(Id) {
        console.log(Id)
        return this.httpClient.get(this.getDonorByIdUrl + '?donor_id='+Id, this.httpOptions)
        .pipe(
            catchError(this.handleError)
        );
    }    
    
    getVolunteerById(Id) {
        console.log(Id)
        return this.httpClient.get(this.getVolunteerByIdUrl + '?volunteer_id='+Id, this.httpOptions)
        .pipe(
            catchError(this.handleError)
        );
    }

    getUserById(Id) {
        return this.httpClient.get(this.getUserByIdUrl + '?user_id='+Id, this.httpOptions)
        .pipe(
            catchError(this.handleError)
        );
    }

    postUser(formData) {
        return this.httpClient.post( this.userRegisterationUrl, formData, this.httpOptions )
        .pipe(
          catchError(this.handleError)
        );
    }

    loggedIn() {
        return !!localStorage.getItem('token')
        // !!localStorage.getItem('email')
    }

    getToken() {
        return localStorage.getItem('token')
    }

    logoutUser() {
        localStorage.removeItem('token')
        this.router.navigate(['home'])
    }

    putUser(formData) {
        return this.httpClient.put( this.userRegisterationUrl, formData, this.httpOptions )
        .pipe(
            catchError(this.handleError)
        );
    }

    putVolunteer(formData) {
        return this.httpClient.put( this.volunteerManagerUrl, formData, this.httpOptions )
        .pipe(
            catchError(this.handleError)
        );
    }
    
    postLogin(formData) {
        return this.httpClient.post( this.loginManagerUrl, formData, this.httpOptions )
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

    deleteUser(id) {
        return this.httpClient.delete(this.userRegisterationUrl + '?user_id='+id, this.httpOptions)
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

    getRequests() {
        return this.httpClient.get(this.requestManagerUrl, this.httpOptions)
        .pipe(
            catchError(this.handleError)
        );
    }
    
    getRequestsById(Id) {
        return this.httpClient.get(this.getRequestsByIdUrl + '?recipient_id='+Id, this.httpOptions)
        .pipe(
            catchError(this.handleError)
        );
    }

    getRequestsByHandledBy(handledBy) {
        return this.httpClient.get(this.getRequestsByHandledByUrl + '?handledBy='+handledBy, this.httpOptions)
        .pipe(
          catchError(this.handleError)  
        );
    }

    postRequests(formData) {
        return this.httpClient.post( this.requestManagerUrl, formData, this.httpOptions )
        .pipe(
          catchError(this.handleError)
        );
    }

    putRequests(formData) {
        console.log(formData)
        return this.httpClient.put( this.requestManagerUrl, formData, this.httpOptions )
        .pipe(
          catchError(this.handleError)
        );
    }

    deleteRequest(id) {
        return this.httpClient.delete(this.requestManagerUrl + '?request_id='+id, this.httpOptions)
        .pipe(
            catchError(this.handleError)
        );
    }

    getDonor() {
        return this.httpClient.get(this.donorManagerUrl, this.httpOptions)
        .pipe(
            catchError(this.handleError)
        );
    }

    deleteDonor(id) {
        return this.httpClient.delete(this.donorManagerUrl + '?donor_id='+id, this.httpOptions)
        .pipe(
            catchError(this.handleError)
        );        
    }    

    postDonor(formData) {
        return this.httpClient.post( this.donorManagerUrl, formData, this.httpOptions )
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

    deleteVolunteer(id) {
        return this.httpClient.delete(this.volunteerManagerUrl + '?volunteer_id='+id, this.httpOptions)
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

    deleteRecipient(id) {
        return this.httpClient.delete(this.recipientManagerUrl + '?recipient_id='+id, this.httpOptions)
        .pipe(
            catchError(this.handleError)
        );        
    }    
}
