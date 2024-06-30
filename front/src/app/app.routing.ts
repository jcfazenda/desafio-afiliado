import { Route } from '@angular/router';
import { AuthGuard } from '../app/core/auth/guards/auth.guard';
import { NoAuthGuard } from '../app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from '../app/layout/layout.component';
import { InitialDataResolver } from '../app/app.resolvers'; 

export const appRoutes: Route[] = [

    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'dashboards', children: [
                { path: 'project', loadChildren: () => import('../app/modules/admin/dashboards/project/project.module').then(m => m.ProjectModule) }
            ]},
            { path: 'apps', children: [
                { path: 'products', loadChildren: () => import('../app/modules/admin/apps/products/products.module').then(m => m.ProductsModule) },     
                { path: 'product-landing', loadChildren: () => import('../app/modules/admin/apps/products/products.module').then(m => m.ProductsModule) },
                { path: 'product-create', loadChildren: () => import('../app/modules/admin/apps/products/products.module').then(m => m.ProductsModule) },

                { path: 'authentication', loadChildren: () => import('../app/modules/admin/pages/authentication/authentication.module').then(m => m.AuthenticationModule) },
                { path: 'error', children: [
                    { path: '404', loadChildren: () => import('../app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module) },
                    { path: '500', loadChildren: () => import('../app/modules/admin/pages/error/error-500/error-500.module').then(m => m.Error500Module) }
                ]}
            ]},
            { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('../app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module) },
            { path: '**', redirectTo: '404-not-found' }
        ]
    }, 
    // Redirect empty path to '/dashboards/project'
    {path: '', pathMatch : 'full', redirectTo: 'dashboards/project'},
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'dashboards/project'},

    // Auth routes for guests
    {
        path: '',
        canMatch: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('../app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('../app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('../app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('../app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('../app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('../app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('../app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },

    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'home', loadChildren: () => import('../app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
        ]
    }
];
