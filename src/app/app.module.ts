import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { NoticeService } from './notice/03-service/notice.service';
import { NoticeComponent } from './notice/05-ui/notice/notice.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import {FileUploadModule} from 'primeng/fileupload';
import {GMapModule} from 'primeng/gmap';
import {MultiSelectModule} from 'primeng/multiselect'
import { MessagesModule } from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { NoticeFormComponent } from './notice/05-ui/notice-dialog/notice-dialog.component';

 

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    HttpClientModule,
    RatingModule,
    FormsModule,
    CardModule,
    DynamicDialogModule,
    FileUploadModule,
    GMapModule,
    ReactiveFormsModule,
    MultiSelectModule,
    MessagesModule,
    MessageModule,
    
  ],
  declarations: [AppComponent,NoticeComponent, NoticeFormComponent],
  bootstrap: [AppComponent],
  providers: [NoticeService]
})
export class AppModule {} 
