import {Component} from '@angular/core';
import {Subscription} from "rxjs";
import {UtilService} from "./domain/service/util.service";
import {delay, retryWhen, tap} from "rxjs/operators";
import {VariableEnum} from "./domain/model/variable.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cansat';
  serverData;
  create: boolean = false;
  conectionStatus = false;
  variableEnum: VariableEnum = VariableEnum.NONE;
  private socketSubscription: Subscription;

  constructor(private utilService: UtilService) { }

  ngOnInit(): void {
    this.init();
  }

  loadThree(): void {
  }

  init() {
    const delayTime = 6000;
    this.socketSubscription = this.utilService.getMiners$('http://localhost:9000')
      .pipe(
        retryWhen(errors =>
          errors.pipe(
            tap(err => {
              console.error('Got error', err);
            }),
            delay(delayTime),
          )
        )
      )
      .subscribe((latestStatus: any) => {
        console.log('data>>', latestStatus);
        if (this.variableEnum === VariableEnum.NONE) {
          this.serverData = latestStatus;
        } else if (this.variableEnum === VariableEnum.ALTITUDE) {
          latestStatus.atmosphericPressure.values = {};
          latestStatus.temperature.values = {};
          this.serverData = latestStatus;
        } else if (this.variableEnum === VariableEnum.ATMOSPHERICPRESSURE) {
          latestStatus.altitude.values = {};
          latestStatus.temperature.values = {};
          this.serverData = latestStatus;
        } else if (this.variableEnum === VariableEnum.TEMPERATURE) {
          latestStatus.altitude.values = {};
          latestStatus.atmosphericPressure.values = {};
          this.serverData = latestStatus;
        }
      }, err => {
        console.log('No more data');
        console.error(err);
      });
  }

  filter(variableEnum: VariableEnum): void {
    this.variableEnum = variableEnum;
  }

  toggle() {
    if (this.socketSubscription && !this.socketSubscription.closed) {
      return this.socketSubscription.unsubscribe();
    }
    this.init();
  }

  get VariableEnum(): typeof VariableEnum {
    return VariableEnum;
  }
}
