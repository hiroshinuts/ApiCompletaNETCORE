import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

export abstract class BaseService {

    protected UrlServiceV1: string = "https://localhost:5001/api/";
    //protected UrlServiceV1: string = "https://devioapi.azurewebsites.net/api/v1/";

    protected ObterHeaderFormData() {
        return {
            headers: new HttpHeaders({
                'Content-Disposition': 'form-data; name="produto"',
                'Authorization': `Bearer ${this.obterTokenUsuario()}`
            })
        };
    }

    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected ObterAuthHeaderJson(){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.obterTokenUsuario()}`
            })
        };
    }

    protected extractData(response: any) {
        return response.data || {};
    }

    public obterUsuario() {
        return JSON.parse(localStorage.getItem('app.user'));
    }

    protected obterTokenUsuario(): string {
        return localStorage.getItem('app.token');
    }

    protected serviceError(error: Response | any) {
      let errMsg: string = "";

      console.log(error, 'BASE ERRRORRRRRR');

        if (error instanceof Response) {
          console.log('ENTROU NO IF serviceError')
            errMsg = `${error.status} - ${error.statusText || ''}`;
        }
        else {
          console.log('ENTROU NO ELSE serviceError')
            //errMsg = error.message ? error.message : error.toString();
          errMsg = error.error.errors[0];
          console.log(errMsg);
        }

        //console.error(errMsg);
        return throwError(errMsg);
    }
}
