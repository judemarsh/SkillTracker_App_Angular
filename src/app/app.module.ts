import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageSkillComponent } from './component/manage-skill/manage-skill.component';
import { ManageAssociateComponent } from './component/manage-associate/manage-associate.component';
import { MenuComponent } from './component/menu/menu.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { EditSkillComponent } from './component/edit-skill/edit-skill.component';
import { SkillPipe } from './pipe/skill.pipe';
import { EditAssociateComponent } from './component/edit-associate/edit-associate.component';
import { MatRadioModule } from '@angular/material'; 
import { MatSliderModule } from '@angular/material'; 
import 'hammerjs';
import { AssociatePipe } from './pipe/associate.pipe';

const appRoutes: Routes = [ 
  {path: 'searchAssociates', component: ManageAssociateComponent},
  {path: 'manageSkills', component: ManageSkillComponent},
  {path: '', redirectTo:'/searchAssociates', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    ManageSkillComponent,
    ManageAssociateComponent,
    MenuComponent,
    PageNotFoundComponent,
    EditSkillComponent,
    SkillPipe,
    EditAssociateComponent,
    AssociatePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes,{enableTracing: false}),
    CommonModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EditSkillComponent, EditAssociateComponent]
})
export class AppModule { }
