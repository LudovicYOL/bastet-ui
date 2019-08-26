import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  page = 1;
  histories = [];

  constructor(public historyService: HistoryService) { }

  ngOnInit() {
    this.historyService.getPage(this.page).subscribe((data)=>{
      this.histories = data.docs;
    });
  }

  loadMore(){
    this.page++;
    this.historyService.getPage(this.page).subscribe((data)=>{
      this.histories = this.histories.concat(data.docs);
    });
  }

  getInitiales(history) {
    return history.user.firstName.charAt(0) + history.user.lastName.charAt(0);
  }

}
