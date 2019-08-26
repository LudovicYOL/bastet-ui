import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'src/app/services/statistic.service';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-city-chart',
  templateUrl: './city-chart.component.html',
  styleUrls: ['./city-chart.component.scss']
})
export class CityChartComponent implements OnInit {

  constructor(public statisticService: StatisticService) { }

  ngOnInit() {
    this.initCityStat();
  }

  // City Chart
  total = 0;
  countNull = 0;

  cityPieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  cityPieChartLabels: Label[] = [];
  cityPieChartData: number[] = [];
  cityPieChartType: ChartType = 'pie';
  cityPieChartLegend = false;
  cityPieChartColors = [{
    'backgroundColor': [
      '#d85073', '#323f53', '#6aab84', '#dbc522', '#667ea2', '#91d5ac', '#e7d974'
    ]
  }];

  cityChartReady = false;

  initCityStat(): void {
    this.statisticService.getCityStat().subscribe((cities: Array<any>) => {
      console.log(cities);
      for (let city of cities) {
        if (city._id != null) {
          this.cityPieChartLabels.push(city._id);
          this.cityPieChartData.push(city.count);
          this.total++;
        } else {
          this.countNull = city.count;
        }
      }
      this.cityChartReady = true;
    });
  }


}
