import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { routing, appRoutingProviders } from "./app.routing";

import { AppComponent } from './app.component';
import { AllMonstersComponent } from './components/all-monsters/all-monsters.component';
import { EditMonsterComponent } from './components/edit-monster/edit-monster.component';
import { ErrorComponent } from './components/error/error.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';

// ngx bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MonsterService } from './services/monster.service';


@NgModule({
  declarations: [
    AppComponent,
    AllMonstersComponent,
    EditMonsterComponent,
    ErrorComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    routing,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [appRoutingProviders, MonsterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
