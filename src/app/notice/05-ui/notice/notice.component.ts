import { Component } from '@angular/core';
import { MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { map, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { Inotice } from '../../01-domain/notice.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NoticeService } from '../../03-service/notice.service';
import { NoticeFormComponent } from '../notice-dialog/notice-dialog.component';


@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss'],
  providers: [DialogService, MessageService]
})
export class NoticeComponent {
  noticeData: Inotice[];
  noticeData$: Observable<Inotice[]>;

  categoryOptions: SelectItem[];
  selectedCategory;

  sortOrder: number=-1;
  sortOptions: SelectItem[];
  sortField: string="createdDate"; 

  currentUser: string = "נחמה הבלין";//instead of get login user
  ref: DynamicDialogRef;

  constructor(
    private noticeService: NoticeService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    public messageService: MessageService
  ) { }

  ngOnInit() {


    this.noticeData$ = this.noticeService.getNoticeList().pipe(
      map(data => (this.noticeData = data))
      , tap(console.log)
    );

    this.sortOptions = [
      { label: 'מיין מהחדש ביותר', value: '!createdDate' },
      { label: 'מיין מהישן ביותר', value: 'createdDate' }
    ];
    this.categoryOptions=JSON.parse(localStorage.getItem('categoryList'));
    this.primengConfig.ripple = true;
    
  }
  deleteNotice = (notice: Inotice) => {
    var index = this.noticeService.noticeData.findIndex(n => n.id === notice.id);//instead of delete data on db with api
    this.noticeService.noticeData.splice(index, 1);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'המודעה נמחקה' });
    
  }
  showDialog = (currentNotice: Inotice, isNew: boolean) => {

    this.ref = this.dialogService.open(NoticeFormComponent, {
      rtl: true,
      header: (isNew)?"הוספת מודעה חדשה":"עריכת מודעה",
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto", "direction": "rtl" },
      baseZIndex: 10000,
      data: { notice: currentNotice, isNew: isNew }
    });


    this.ref.onClose.subscribe(() => {
      this.noticeData$ = this.noticeService.getNoticeList().pipe(
        map(data => (this.noticeData = data))
        , tap(console.log)
      );
    });

  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  onSortChange(event) {
    let value = event.value;
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
