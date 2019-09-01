import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './booking/pages/book-lessons/book-lessons.module#BookLessonsPageModule' },
  { path: 'users/whoareyou', loadChildren: './account/pages/who-are-you/who-are-you.module#WhoAreYouPageModule' },
  { path: 'users/login', loadChildren: './account/pages/login/login.module#LoginPageModule' },
  { path: 'users/signup', loadChildren: './account/pages/signup/signup.module#SignupPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,  })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
