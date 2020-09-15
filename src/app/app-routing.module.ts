import { AuthRequiredGuard } from './account/services/auth-required.guard';
import { TeacherAuthRequiredGuard } from './account/services/teacher-auth-required.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RedirectUserGuard } from './account/services/redirect-user.guard';
import { environment } from 'src/environments/environment';


const routes: Routes = [
  { path: '', pathMatch: 'full',
      redirectTo: '',
      canActivate: [RedirectUserGuard] },
  { path: 'lessons',
      loadChildren: () => import('./booking/pages/book-lessons/book-lessons.module').then(m => m.BookLessonsPageModule) },
  { path: 'users/whoareyou',
     loadChildren: () => import('./account/pages/who-are-you/who-are-you.module').then(m => m.WhoAreYouPageModule) },
  { path: 'users/login',
      loadChildren: () => import('./account/pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'users/signup',
      loadChildren: () => import('./account/pages/signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'user/bookings',
      canActivate: [AuthRequiredGuard],
      loadChildren: () => import('./booking/pages/user-bookings/user-bookings.module').then(m => m.UserBookingsPageModule) },
  { path: 'user/profile',
      canActivate: [AuthRequiredGuard],
      loadChildren: () => import('./account/pages/profile/profile.module').then(m => m.ProfilePageModule) },
  { path: 'user/preferences',
      canActivate: [AuthRequiredGuard],
      loadChildren: () => import('./account/pages/preferences/preferences.module').then(m => m.PreferencesPageModule) },
  { path: 'users/password/lost',
      data: {step: 'request'},
      loadChildren: () => import('./account/pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule), },
  { path: 'users/password/validate-code',
      data: {step: 'validate'},
      loadChildren: () => import('./account/pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule), },
  { path: 'users/password/reset',
      data: {step: 'change'},
      loadChildren: () => import('./account/pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule), },
  { path: 'admin/classes',
      canActivate: [TeacherAuthRequiredGuard],
      loadChildren: () => import('./admin/pages/classes/classes.module').then(m => m.ClassesPageModule) },
  { path: 'admin/lesson/add',
      canActivate: [TeacherAuthRequiredGuard],
      loadChildren: () => import('./admin/pages/add-lesson/add-lesson.module').then(m => m.AddLessonPageModule) },
  { path: 'admin/lesson/:lessonId/schedule',
      canActivate: [TeacherAuthRequiredGuard],
      loadChildren: () => import('./admin/pages/schedule-lesson/schedule-lesson.module').then(m => m.ScheduleLessonPageModule) },
  { path: 'admin/lesson/:classId/edit',
      canActivate: [TeacherAuthRequiredGuard],
      loadChildren: () => import('./admin/pages/edit-lesson/edit-lesson.module').then(m => m.EditLessonPageModule) },
  { path: 'admin/event/add',
      canActivate: [TeacherAuthRequiredGuard],
      loadChildren: () => import('./admin/pages/add-event/add-event.module').then(m => m.AddEventPageModule) },
  { path: 'admin/place/add',
      canActivate: [TeacherAuthRequiredGuard],
      loadChildren: () => import('./admin/pages/add-place/add-place.module').then(m => m.AddPlacePageModule) },
  { path: 'errors/forbidden',
      loadChildren: () => import('./common/pages/forbidden/forbidden.module').then(m => m.ForbiddenPageModule) },
  { path: 'errors/service-unavailable',
      loadChildren: () => import('./common/pages/service-unavailable/service-unavailable.module').then( m => m.ServiceUnavailablePageModule) },
  { path: 'errors/network-unavailable',
      loadChildren: () => import('./common/pages/network-unavailable/network-unavailable.module').then( m => m.NetworkUnavailablePageModule) },
  { path: 'classes/:classId',
      loadChildren: () => import('./booking/pages/scheduled-class-details/scheduled-class-details.module').then(m => m.ScheduledClassDetailsPageModule) },
  { path: 'information/privacy',
      loadChildren: () => import('./common/pages/privacy/privacy.module').then( m => m.PrivacyPageModule) },
  {
    path: 'contact',
    loadChildren: () => import('./common/pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  { path: '**',
      loadChildren: () => import('./common/pages/not-found/not-found.module').then( m => m.NotFoundPageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, enableTracing: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
