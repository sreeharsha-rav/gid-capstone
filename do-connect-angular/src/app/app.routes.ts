import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { MessageComponent } from './message/message/message.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { LoginComponent } from './login_signup/login/login.component';
import { SignupComponent } from './login_signup/signup/signup.component';
import { UserGuard } from './shared/auth-guards/user-guard/user.guard';
import { QuestionListComponent } from './question/feature/question-list/question-list.component';


export const routes: Routes = [
    // { path: '', component: HeaderComponent},
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent},
    {path: 'questions', component: QuestionListComponent, canActivate: [UserGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'messages', component: MessageComponent, canActivate: [UserGuard]},
    { path: '**', component: PageNotFoundComponent}
];
