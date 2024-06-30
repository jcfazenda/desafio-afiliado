import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'; 
import { FormBuilder, FormGroup } from '@angular/forms'; 

@Component({
    selector       : 'project',
    templateUrl    : './project.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit, OnDestroy
{
    formGroup: FormGroup; 
    userlogged: any;
    /**
     * Constructor
     */
    constructor(
        private cdr: ChangeDetectorRef,
        private formBuilder: FormBuilder
    )
    {
        // temp user

        const currentUserString = localStorage.getItem('currentUser'); 
        if (currentUserString !== null) {
            this.userlogged = JSON.parse(currentUserString); 
        }  
    }
 
    ngOnInit(): void
    { 

    }
 
    ngOnDestroy(): void
    {
 
    }
 
}
