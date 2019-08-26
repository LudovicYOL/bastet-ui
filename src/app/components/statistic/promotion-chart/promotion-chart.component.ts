import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'src/app/services/statistic.service';

@Component({
  selector: 'app-promotion-chart',
  templateUrl: './promotion-chart.component.html',
  styleUrls: ['./promotion-chart.component.scss']
})
export class PromotionChartComponent implements OnInit {

  constructor(public statisticService: StatisticService) { }

  ngOnInit() {
    this.initPromotionStat();
  }

  // Promotion Chart
  total = 0;
  totalStudents = 0;
  totalAlumnis = 0;

  promotionBarChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            precision: 1,
            beginAtZero: true
          }
        }
      ]
    }
  };

  promotionBarChartLabels = [];
  promotionBarChartType = 'bar';
  promotionColor = '#ffab40';
  promotionHoverColor = '#323f52';
  promotionBarChartLegend = false;

  promotionBarChartData = [];
  promotionChartReady = false;

  initPromotionStat(): void{
    this.statisticService.getPromotionStat().subscribe((promotions: Array<any>)=>{
      let data = [];
      for(let promotion of promotions){
        this.promotionBarChartLabels.push(promotion._id);
        data.push(promotion.count);

        // Increment counter
        this.total += promotion.count;
        if(promotion._id <= new Date().getFullYear()){
          this.totalAlumnis += promotion.count;
        }else{
          this.totalStudents += promotion.count;
        }
      }
      this.promotionBarChartData.push({
        'data': data, 
        'backgroundColor': this.promotionColor, 
        'hoverBackgroundColor': this.promotionHoverColor
      });
      this.promotionChartReady = true;
    });
  }
}
