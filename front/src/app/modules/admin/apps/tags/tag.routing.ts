import { Route } from '@angular/router'; 
import { TagListComponent } from './list/list.component';
import { TagComponent } from './tag.component'; 

export const tagRoutes: Route[] = [
    {
        path: ':id',
        component: TagComponent,
        children: [
            {
                path: '',
                component: TagListComponent,
 
            }
        ]
    }
];
