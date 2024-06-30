
import { Injectable } from '@angular/core'; 
import { throwError, Observable, of, BehaviorSubject } from 'rxjs';  
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';   

 
@Injectable()
export class ConfigurationFilterService {
 
    CodeApi = 0;
    Api:    any; 
    Hub:    any; 
      
    Usuario: any;  
    endpoint  = "";  

    constructor(private http: HttpClient ) { 
        
    }   
 
      /* chamadas endpoints */
      getCountryes(): Observable<any> {
        const endpoint = 'http://localhost:3333/configurationFilter/getCountryes';
        return this.get(endpoint, {}).pipe(catchError(this.handleError));
      }

      getBrands(): Observable<any> {
        const endpoint = 'http://localhost:3333/configurationFilter/getBrands';
        return this.get(endpoint, {}).pipe(catchError(this.handleError));
      }
      getOperationTypes(): Observable<any> {
        const endpoint = 'http://localhost:3333/configurationFilter/getOperationTypes';
        return this.get(endpoint, {}).pipe(catchError(this.handleError));
      }

      get(path: string, params: { [param: string]: string | number | boolean | readonly (string | number | boolean)[] }): Observable<any> {
        const queryParams = new HttpParams({ fromObject: params }); // Converte parâmetros para HttpParams
        return this.http.get<any>(
          `${this.endpoint.trim()}${path}`,
          { params: queryParams }
        ).pipe(catchError(this.handleError));
      }

    private handleError(error: any): Observable<never> {
        console.error('Ocorreu um erro:', error);
        return throwError('Erro na solicitação. Por favor, tente novamente mais tarde.');
    }


}
