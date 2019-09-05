import { TeacherAuthRequiredGuard } from './account/services/teacher-auth-required.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RedirectUserGuard } from './account/services/redirect-user.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full',
      redirectTo: '',
      canActivate: [RedirectUserGuard] },
  { path: 'lessons',
      loadChildren: './booking/pages/book-lessons/book-lessons.module#BookLessonsPageModule' },
  { path: 'users/whoareyou',
     loadChildren: './account/pages/who-are-you/who-are-you.module#WhoAreYouPageModule' },
  { path: 'users/login',
      loadChildren: './account/pages/login/login.module#LoginPageModule' },
  { path: 'users/signup',
      loadChildren: './account/pages/signup/signup.module#SignupPageModule' },
  { path: 'admin/classes',
      canActivate: [TeacherAuthRequiredGuard],
      loadChildren: './admin/pages/classes/classes.module#ClassesPageModule' },
  { path: 'admin/lesson/add',
      canActivate: [TeacherAuthRequiredGuard],
      loadChildren: './admin/pages/add-lesson/add-lesson.module#AddLessonPageModule' },
  { path: 'admin/lesson/:lessonId/schedule',
      canActivate: [TeacherAuthRequiredGuard],
      loadChildren: './admin/pages/schedule-lesson/schedule-lesson.module#ScheduleLessonPageModule' },
  { path: 'admin/lesson/:lessonId/edit',
      canActivate: [TeacherAuthRequiredGuard],
      loadChildren: './admin/pages/edit-lesson/edit-lesson.module#EditLessonPageModule' },
  { path: 'admin/event/add',
      canActivate: [TeacherAuthRequiredGuard],
      loadChildren: './admin/pages/add-event/add-event.module#AddEventPageModule' },
  { path: 'errors/forbidden',
      loadChildren: './common/pages/forbidden/forbidden.module#ForbiddenPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,  })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
