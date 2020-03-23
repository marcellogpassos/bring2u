import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import 'firebase/firestore';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';
import { FinishLoginPage } from './finish-login/finish-login.page';
import { LoginPage } from './login/login.page';
import { ResetPasswordPage } from './reset-password/reset-password.page';
import { SignupPage } from './signup/signup.page';

@NgModule({
    imports: [
        AngularFireAuthModule,
        AngularFirestoreModule,
        AuthRoutingModule,
        CommonModule,
        FormsModule,
        IonicModule,
    ], providers: [
        AuthService,
    ], declarations: [
        FinishLoginPage,
        LoginPage,
        ResetPasswordPage,
        SignupPage,
    ]
})
export class AuthModule { }
