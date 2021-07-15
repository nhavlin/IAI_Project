import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Inotice } from '../../01-domain/notice.interface';
import { Guid } from 'guid-typescript';
import { NoticeService } from '../../03-service/notice.service';


@Component({
  selector: 'app-notice-dialog',
  templateUrl: './notice-dialog.component.html',
  styleUrls: ['./notice-dialog.component.css'],
  providers: [DialogService, MessageService, FormBuilder, NoticeService]
})
export class NoticeFormComponent implements OnInit {
  fg?: FormGroup;

  id?: Guid;
  code?: string;
  header: string;
  description?: string;
  image?: string;
  category?: string;
  position?: string;
  createdDate?: Date;
  createdBy?: string;
  isActive: boolean;


  uploadedFiles: any[] = [];
  optionsMap: any;

  currentUser: string = "נחמה הבלין";

  currentNotice: Inotice;
  isNew: boolean=true;
  categoryOptions: SelectItem[];

  onClose = new EventEmitter();

  constructor(public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    private noticeService: NoticeService,
    private formBuilder: FormBuilder,
  ) {
//get data from parent 
    this.currentNotice = config.data.notice;
    this.currentNotice.createdBy=this.currentUser;
    this.isNew = config.data.isNew;
  }



  ngOnInit(): void {
    this.optionsMap = {
      center: { lat: 36.890257, lng: 30.707417 },
      zoom: 12
    };
    this.setFormGroup(this.currentNotice);
    this.categoryOptions = JSON.parse(localStorage.getItem('categoryList'));
  }

  setFormGroup = (notice: Inotice) => {
    this.fg = this.formBuilder.group({
      id: [notice?.id],
      code: [notice?.code],
      header: [notice?.header],
      description: [notice?.description],
      image: [notice?.image],
      category: [notice?.category],
      position: [notice?.position],
      createdDate: [notice?.createdDate],
      createdBy: [notice?.createdBy],
      isActive: [notice?.isActive],
    });
  }


  addNewNotice = () => {
    this.currentNotice.id = this.noticeService.generateGuid();
    this.currentNotice.createdBy = this.currentUser;
    this.currentNotice.createdDate = new Date();
    this.noticeService.addItem(this.fg!.value);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'המודעה נוספה בהצלחה' });
  }

  updateNotice = () => {
    this.noticeService.editItem(this.fg!.value);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'המודעה נשמרה' });
  }

  onSubmit = () => {
    if (this.fg!.invalid) return;
    this.currentNotice = { ...this.fg!.value };
    (this.isNew) ? this.addNewNotice() : this.updateNotice();
    this.onClose.emit();
    // this.ref.close();if needed
  }



  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  }


}
