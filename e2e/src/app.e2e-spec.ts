import { AppPage } from './app.po';
import { Routes } from '@angular/router';
import { ManageAssociateComponent } from 'src/app/component/manage-associate/manage-associate.component';
import { ManageSkillComponent } from 'src/app/component/manage-skill/manage-skill.component';
import { PageNotFoundComponent } from 'src/app/component/page-not-found/page-not-found.component';



describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    const appRoutes: Routes = [ 
      {path: 'searchAssociates', component: ManageAssociateComponent},
      {path: 'manageSkills', component: ManageSkillComponent},
      {path: '', redirectTo:'/searchAssociates', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
    ];
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
