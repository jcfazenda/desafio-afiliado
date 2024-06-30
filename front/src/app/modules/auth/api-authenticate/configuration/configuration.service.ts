
import { Injectable } from '@angular/core'; 
import { throwError, Observable, of, BehaviorSubject } from 'rxjs';  
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';   

 
@Injectable()
export class ConfigurationService {
 
    CodeApi = 0;
    Api:    any; 
    Hub:    any; 
      
    Usuario: any;  
    endpoint  = "";  

    constructor(private http: HttpClient ) { 
        
    }   
 
    /* chamadas endpoints */
    getConfigurations(): Observable<any> {
        const endpoint = 'http://localhost:3333/configurations/get';
        return this.get(endpoint, {}).pipe(catchError(this.handleError));
    }

    getById(id: any): Observable<any> {

      const body = { id };
      const endpoint = 'http://localhost:3333/configurations/getById';
    
      return this.http.post<any>(
        `${this.endpoint.trim()}${endpoint}`,
        body
      ).pipe(
        catchError(this.handleError),  // Reative o tratamento de erros
        //tap(result => console.log('Resultado da requisição:', result))
      );
    }

    generateArchive(id_configuration: any): Observable<any> {

      const body = { id_configuration };
      const endpoint = 'http://localhost:3333/configurations/generateArchive';
    
      return this.http.post<any>(
        `${this.endpoint.trim()}${endpoint}`,
        body
      ).pipe(
        catchError(this.handleError),  // Reative o tratamento de erros
        //tap(result => console.log('Resultado da requisição:', result))
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
