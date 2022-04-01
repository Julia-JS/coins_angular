import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CollectionComponent} from './collection/collection.component';
import {AnalyticsComponent} from './analytics/analytics.component';
import {MainComponent} from './main/main.component';
import {CountriesComponent} from './countries/countries.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'collection',
    component: CollectionComponent,
    children: [
      {
        path: ':id',
        component: CountriesComponent,
      }
    ]
  },
  {
    path: 'analytics',
    component: AnalyticsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
