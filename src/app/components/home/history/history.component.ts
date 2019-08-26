import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  page = 1;
  histories = [];

  constructor(
    public historyService: HistoryService,
    public authenticationService: AuthenticationService) { }

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

  deleteHistory(history){
    // Delete selected history
    this.historyService.deleteHistory(history._id).subscribe((data)=>{
      // Remove 9 last elements from history array
      this.histories.length = this.histories.length - 9;
      // Reload last page
      this.historyService.getPage(this.page).subscribe((data)=>{
        this.histories = this.histories.concat(data.docs);
      });
    });
  }

  getInitiales(history) {
    return history.user.firstName.charAt(0) + history.user.lastName.charAt(0);
  }

  canDelete(): boolean{
    return this.authenticationService.getUserDetails().role == "ADMIN";
  }
}
