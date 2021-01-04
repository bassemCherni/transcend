import { RoadMapComponent } from './inside/projects/road-map/road-map.component';
import { ChangePasswordComponent } from './inside/browse/change-password/change-password.component';
import { ProfileComponent } from './inside/browse/profile/profile.component';
import { SettingsComponent } from './inside/projects/settings/settings.component';
import { ProjectPeopleComponent } from './inside/projects/project-people/project-people.component';
import { BoardComponent } from './inside/projects/board/board.component';
import { BacklogComponent } from './inside/projects/backlog/backlog.component';
import { ConfigurationComponent } from './inside/browse/configuration/configuration.component';
import { ProjectsComponent } from './inside/projects/projects.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { InsideComponent } from './inside/inside.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './landing/contact/contact.component';
import { CreateAccountComponent } from './landing/create-account/create-account.component';
import { LoginComponent } from './landing/login/login.component';
import { AboutComponent } from './landing/about/about.component';
import { AuthGuard } from './services/auth.guard';
import { BrowseComponent } from './inside/browse/browse.component';
import { WorkspaceComponent } from './inside/browse/workspace/workspace.component';
import { DashboardComponent } from './inside/browse/dashboard/dashboard.component';
import { PeopleComponent } from './inside/browse/people/people.component';

const routes: Routes = [
  {path: '', redirectTo: '/home' , pathMatch: 'full' },
  {path: 'platform',
    component: InsideComponent,
    canActivate: [AuthGuard],
    children: [
    {path: '', redirectTo: '/platform/browse' , pathMatch: 'full' },
    {path: 'browse',
        component: BrowseComponent,
        children: [
          {path: '', redirectTo: '/platform/browse/workspace', pathMatch: 'full' },
          {path: 'workspace', component: WorkspaceComponent},
          {path: 'workspace/:id', component: ConfigurationComponent},
          {path: 'dashboard', component: DashboardComponent},
          {path: 'people', component: PeopleComponent},
          {path: 'profile', component: ProfileComponent},
          {path: 'change', component: ChangePasswordComponent}
       ]},
    {path: 'projects/:id',
        component: ProjectsComponent,
        children: [
          {path: '', component: BacklogComponent , pathMatch: 'full' },
          {path: 'backlog', component: BacklogComponent},
          {path: 'road-map', component: RoadMapComponent},
          {path: 'board', component: BoardComponent},
          {path: 'people', component: ProjectPeopleComponent},
          {path: 'dashboard', component: SettingsComponent}
        ]}
  ]},
  {path: 'home',
    component: LandingComponent,
    children: [
      {path: '', component: AboutComponent , pathMatch: 'full' },
      {path: 'contact', component: ContactComponent},
      {path: 'create-account', component: CreateAccountComponent},
      {path: 'sign-in', component: LoginComponent}
  ]},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
