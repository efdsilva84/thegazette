import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'

  })
};

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(private api: ApiService) { }

  noticePolicites() {
    return this.api.get('thegazette', false, httpOptions);
  }
  breakingNotices() {
    return this.api.get('thegazette/breaking_news', false, httpOptions);
  }

  updateNoticesPolitices(id:number, data:any) {
    return this.api.post(`thegazette/new_notice_politices/${id}`, data, httpOptions);
  }
}
