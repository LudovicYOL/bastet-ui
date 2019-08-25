import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'src/app/services/statistic.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  promotion = [];

  constructor(public statisticService: StatisticService) { }

  ngOnInit() {
    this.initPromotionStat();
  }

  initPromotionStat(): void{
    this.statisticService.getPromotionStat().subscribe((data)=>{
      console.log(data);
    });
  }


}
