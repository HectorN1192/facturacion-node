import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckloginGuard } from '../public/shared/guards/checklogin.guard';
import { PrivateComponent } from './private.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: 'client',
        canActivate: [CheckloginGuard],
        loadChildren: () =>
          import('./pages/client/client.module').then((m) => m.ClientModule),
      },
      {
        path: 'resume',
        canActivate: [CheckloginGuard],
        loadChildren: () =>
          import('./pages/resume/resume.module').then((m) => m.ResumeModule),
      },
      { path: '**', pathMatch: 'full', redirectTo: 'resume' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
