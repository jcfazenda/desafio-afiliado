
import { Injectable } from '@angular/core'; 
import { throwError, Observable, of, BehaviorSubject } from 'rxjs';  
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';   
 

@Injectable()
export class ConnectionService {
 
    endpoint  = "";  

    constructor(private http: HttpClient ) { 
        
    }   

    /* API */
    Connect(model: any): Observable<any> { 
        return of(true);
    }  

    Send(model: any): Observable<any> { 
  
        return this.get(model.endpoint, model).pipe(map((res: any) => { 
            return res;
        }),
        catchError(error => { 
            return error;
            })
        ); 
    } 

    get(path: string, params: { [param: string]: string | number | boolean | readonly (string | number | boolean)[] }): Observable<any> {
        const queryParams = new HttpParams({ fromObject: params }); // Converte parâmetros para HttpParams
        return this.http.get<any>(
          `${this.endpoint.trim()}${path}`,
          { params: queryParams }
        ).pipe(catchError(this.handleError));
      }
      

    post_api(path: string, body: Object = {}): Observable<any> { 
        
        return this.http.post(
            `${this.endpoint.trim()}${path}`, JSON.stringify(body),
            { headers: { 'Content-Type': 'application/json' } })
            .pipe(catchError(this.handleError ));

    } 
    private handleError(error: any): Observable<never> {
        console.error('Ocorreu um erro:', error);
        return throwError('Erro na solicitação. Por favor, tente novamente mais tarde.');
    }

}
