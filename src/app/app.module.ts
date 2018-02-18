import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormComponent } from './components/form/form.component';

import { ModalDataService } from './services/modalData/modal-data.service';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ModalComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [ModalDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
