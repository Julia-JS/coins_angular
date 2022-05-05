import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {TranslocoRootModule} from './transloco-root.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {SidenavComponent} from './sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {CoinDialogComponent} from './modals/coin-dialog/coin-dialog.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {CollectionComponent} from './collection/collection.component';
import {AnalyticsComponent} from './analytics/analytics.component';
import {CountriesComponent} from './countries/countries.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CoinImageDialogComponent} from './modals/coin-image-dialog/coin-image-dialog.component';
import {AdministrationComponent} from './administration/administration.component';
import {CoinDeleteDialogComponent} from './modals/coin-delete-dialog/coin-delete-dialog.component';
import {CollectionItemComponent} from './collection/collection-item/collection-item.component';
import {MainComponent} from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    CoinDialogComponent,
    MainComponent,
    AdministrationComponent,
    CollectionComponent,
    CollectionItemComponent,
    AnalyticsComponent,
    CountriesComponent,
    CoinImageDialogComponent,
    CoinDeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslocoRootModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
