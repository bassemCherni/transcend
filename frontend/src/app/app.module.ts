import { createComponent } from '@angular/compiler/src/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { InsideComponent } from './inside/inside.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './landing/login/login.component';
import { CreateAccountComponent } from './landing/create-account/create-account.component';
import { ContactComponent } from './landing/contact/contact.component';
import { AboutComponent } from './landing/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { UniqueEmailDirective } from './services/unique-email.directive';
import { PassConfirmDirective } from './services/pass-confirm.directive';
import { ProjectsComponent } from './inside/projects/projects.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {ChartsModule} from 'ng2-charts';
import { BrowseComponent } from './inside/browse/browse.component';
import { WorkspaceComponent } from './inside/browse/workspace/workspace.component';
import { DashboardComponent } from './inside/browse/dashboard/dashboard.component';
import { PeopleComponent } from './inside/browse/people/people.component';
import { ConfigurationComponent } from './inside/browse/configuration/configuration.component';
import { WorkspaceFilterPipe } from './services/workspace-filter.pipe';
import { NewWorkspaceComponent } from './inside/browse/workspace/new-workspace/new-workspace.component';
import { WorksapceIconComponent } from './inside/browse/workspace/new-workspace/worksapce-icon/worksapce-icon.component';
import { RenameComponent } from './inside/browse/workspace/rename/rename.component';
import { DelOrQuitComponent } from './inside/browse/workspace/del-or-quit/del-or-quit.component';
import { AlertComponent } from './inside/alert/alert.component';
import { ProjectPipe } from './services/project.pipe';
import { NewProjectComponent } from './inside/browse/configuration/new-project/new-project.component';
import { BacklogComponent } from './inside/projects/backlog/backlog.component';
import { BoardComponent } from './inside/projects/board/board.component';
import { ProjectPeopleComponent } from './inside/projects/project-people/project-people.component';
import { SettingsComponent } from './inside/projects/settings/settings.component';
import { IssueComponent } from './inside/projects/backlog/issue/issue.component';
import { AssigneeComponent } from './inside/projects/backlog/assignee/assignee.component';
import { ChangePasswordComponent } from './inside/browse/change-password/change-password.component';
import { ProfileComponent } from './inside/browse/profile/profile.component';
import { SprintComponent } from './inside/projects/backlog/sprint/sprint.component';
import { RoadMapComponent } from './inside/projects/road-map/road-map.component';
import { EpicComponent } from './inside/projects/road-map/epic/epic.component';
import { BurndownChartComponent } from './inside/burndown-chart/burndown-chart.component';

const firebaseConfig = {
  apiKey: 'AIzaSyARSYH7ytcWsmBQE-oL1XeZKWKUohi61DM',
  authDomain: 'transcend1.firebaseapp.com',
  databaseURL: 'https://transcend1.firebaseio.com',
  projectId: 'transcend1',
  storageBucket: 'transcend1.appspot.com',
  messagingSenderId: '899802259835',
  appId: '1:899802259835:web:30b7c3ebb9d1f96a925dde',
  measurementId: 'G-H0SG39TZVY'
};



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    InsideComponent,
    NotFoundComponent,
    LoginComponent,
    CreateAccountComponent,
    ContactComponent,
    AboutComponent,
    UniqueEmailDirective,
    PassConfirmDirective,
    ProjectsComponent,
    BrowseComponent,
    WorkspaceComponent,
    DashboardComponent,
    PeopleComponent,
    ConfigurationComponent,
    WorkspaceFilterPipe,
    NewWorkspaceComponent,
    WorksapceIconComponent,
    RenameComponent,
    DelOrQuitComponent,
    AlertComponent,
    ProjectPipe,
    NewProjectComponent,
    BacklogComponent,
    BoardComponent,
    ProjectPeopleComponent,
    SettingsComponent,
    IssueComponent,
    AssigneeComponent,
    ChangePasswordComponent,
    ProfileComponent,
    SprintComponent,
    RoadMapComponent,
    EpicComponent,
    BurndownChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatAutocompleteModule,
    DragDropModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireStorageModule, // storage
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    NewWorkspaceComponent,
    WorksapceIconComponent,
    RenameComponent,
    DelOrQuitComponent,
    AlertComponent,
    NewProjectComponent,
    IssueComponent,
    AssigneeComponent,
    SprintComponent,
    EpicComponent
  ]
})
export class AppModule { }
