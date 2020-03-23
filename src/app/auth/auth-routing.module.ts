import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { ResetPasswordPage } from './reset-password/reset-password.page';
import { SignupPage } from './signup/signup.page';
import { FinishLoginPage } from './finish-login/finish-login.page';

const routes: Routes = [
    {
        path: 'finish-login',
        component: FinishLoginPage
    },
    {
        path: 'login',
        component: LoginPage
    },
    {
        path: 'reset-password',
        component: ResetPasswordPage
    },
    {
        path: 'signup',
        component: SignupPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }
