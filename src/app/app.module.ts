import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/components/home/home.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AutenticacionModule } from './core/components/autentificacion/autenticacion.module';
import { LoginService } from './core/services/login.service';
import { LoginGuardian } from './core/components/autentificacion/login/loginGuardian';
import { DatePipe } from '@angular/common';
import { UsuarioModule } from './modules/usuario/usuario.module';
 
@NgModule({ 
  declarations: [
    AppComponent,
    HomeComponent,    
    HeaderComponent,
    FooterComponent,

    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    AutenticacionModule,
  ],
  providers: [LoginService, LoginGuardian, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
