import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { MessageComponent } from './message/message/message.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { LoginComponent } from './login_signup/login/login.component';
import { SignupComponent } from './login_signup/signup/signup.component';
import { UserGuard } from './shared/auth-guards/user-guard/user.guard';
import { QuestionListComponent } from './question/feature/question-list/question-list.component';
import { TopicListComponent } from './topic/feature/topic-list/topic-list.component';
import { TopicQuestionsComponent } from './topic/feature/topic-questions/topic-questions.component';
import { AnswerListComponent } from './answer/feature/answer-list/answer-list.component';


export const routes: Routes = [
    // Pages before login
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    // Pages after login
    {path: 'questions', component: QuestionListComponent, canActivate: [UserGuard]},
    { path: 'answers/question/:id', component: AnswerListComponent, canActivate: [UserGuard]},
    { path: 'topics', component: TopicListComponent, canActivate: [UserGuard]},
    { path: 'topics/:id/questions', component: TopicQuestionsComponent, canActivate: [UserGuard]},
    { path: 'messages', component: MessageComponent, canActivate: [UserGuard]},
    // Page not found
    { path: '**', component: PageNotFoundComponent}
];
