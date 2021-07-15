import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, of, tap } from 'rxjs';
import { Inotice } from '../01-domain/notice.interface';
import { Guid } from 'guid-typescript';
import { SelectItem } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  public noticeData: Inotice[];
  noticeDataUrl = 'assets/notice-board.json';
  categoryList: SelectItem[];

setCategoyList=()=>
{
 this.categoryList= [
    { label: 'דרושים', value: 'דרושים' },
    { label: 'יד 2', value: 'יד 2' },
    { label: 'נדלן', value: 'נדלן'}
  ];
 localStorage.setItem('categoryList', JSON.stringify(this.categoryList));
}
  constructor(private http: HttpClient) {
    this.setCategoyList();
  }


  addItem = (notice: Inotice) => {
    this.noticeData = JSON.parse(localStorage.getItem('noticeData'));
    this.noticeData.push(notice);
    localStorage.setItem('noticeData', JSON.stringify(this.noticeData));
  }
  editItem = (notice: Inotice) => {
    this.noticeData = JSON.parse(localStorage.getItem('noticeData'));
    var index = this.noticeData.findIndex(n => n.id === notice.id);
    this.noticeData[index] = { ...notice };
    localStorage.setItem('noticeData', JSON.stringify(this.noticeData));
  }
  // refreshData=()=>
  // {
  //   return this.noticeData;
  // }
  getNoticeList() {
    console.log("getNoticeList");
    this.noticeData = JSON.parse(localStorage.getItem('noticeData'));
    if (this.noticeData)
      return of(this.noticeData);
    return this.http.get<any>(this.noticeDataUrl).pipe(
      map(res => <Inotice[]>res.data),
      map(data => {
        this.noticeData = data.filter(not => not.isActive == true);
        localStorage.setItem('noticeData', JSON.stringify(this.noticeData));
        return this.noticeData;
      }),
      tap(console.log));
  }

  generateGuid() {
    return Guid.create()
  }

}


