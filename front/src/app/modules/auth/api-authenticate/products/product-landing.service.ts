
import { Injectable } from '@angular/core'; 
import { throwError, Observable, of, BehaviorSubject } from 'rxjs';  
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';   

 
@Injectable()
export class ProductLandingService {
 
    CodeApi = 0;
    Api:    any; 
    Hub:    any; 
      
    Usuario: any;  
    endpoint  = "";  

    constructor(private http: HttpClient ) { 
        
    }    

    getById(id: any): Observable<any> {

      const body = { id };
      const endpoint = 'http://localhost:3333/configurations/getById';
    
      return this.http.post<any>(
        `${this.endpoint.trim()}${endpoint}`,
        body
      ).pipe(
        catchError(this.handleError), 
      );
    }
 
    get(path: string, params: { [param: string]: any }): Observable<any> { 

      const queryParams = new HttpParams({ fromObject: params });
      return this.http.get<any>(
        `${this.endpoint.trim()}${path}`,
        { params: queryParams }

      ).pipe(

        catchError(this.handleError),
        
      );

    }

    private handleError(error: any): Observable<never> {
        console.error('Ocorreu um erro:', error);
        return throwError('Erro na solicitação. Por favor, tente novamente mais tarde.');
    }


}
