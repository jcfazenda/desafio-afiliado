import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';  

import { AuthService } from '../../../../app/core/auth/auth.service';  
import { StorageService } from '../api-authenticate/storage.service';
import { ConnectionService } from '../../auth/api-authenticate/connection.service';

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignInComponent implements OnInit
{
    Usuario: any;
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    validaCampos = '';

    constructor(
        private _activatedRoute: ActivatedRoute, 
        private _connectionService: ConnectionService,
        private _formBuilder: UntypedFormBuilder,
        private _authService: AuthService,
        private _router: Router,
        private _storageService: StorageService
    )
    {
 
    }
 
    ngOnInit(): void
    {
        this.signInForm = this._formBuilder.group({
            email     : ['jcfazenda@tangerine.com', [Validators.required, Validators.email]],
            password  : ['admin', Validators.required],
            rememberMe: ['']
        });
    }
 
    signIn(): any {
        
        if ( this.signInForm.invalid ) { return; }
        
        this.signInForm.disable();
        this.showAlert = false;

        let _send = {
          Rota: 'user/connected', 
          email: this.signInForm.value.email,
          password: this.signInForm.value.password
        } 
  
        return this._connectionService.Connect(_send).subscribe(data => {     

            this._storageService.resetUser(_send);

            if (data.success === false) {

                this.signInForm.enable();
                this.signInNgForm.resetForm();
                this.alert = {
                    type   : 'error',
                    message: 'Wrong email or password'
                };

                this.showAlert = true;

            } else { 
 
                this.signInOn();
               // this._storageService.setUser(data.data);  // Guarda ID do Usuario
               
            }

        }, error => { });
  
    }

    signInOn(): void
    {  
        this._authService.signIn(this.signInForm.value)
            .subscribe(
                () => {
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';  
                    this._router.navigateByUrl(redirectURL);
 
                },
                (response) => {

                    this.signInForm.enable();
                    this.signInNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Wrong email or password'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
        );
    }


}
