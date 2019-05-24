import { Component, OnInit } from '@angular/core';

import { ConfigService } from './config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(private configService: ConfigService) { }

  pacientsData: any[];
  medicationData: any[];
  searchedName: String = '';

  medicationsLoaded: boolean = false;
  pacientsLoaded: boolean = false;

  ngOnInit(): void {
    this.configService.getPatientsData()
    .subscribe((data: any) => {
      this.pacientsLoaded = true;
      this.pacientsData = data.entry;
    });

    this.configService.getMedicationData()
    .subscribe((data: any) => {
      this.medicationsLoaded = true;
      this.medicationData = data.entry;
    });
  }

  search() {
    this.pacientsLoaded = false;

    this.configService.getSearchedPacients(this.searchedName)
    .subscribe((data: any) => {
      this.pacientsLoaded = true;
      this.pacientsData = data.entry;
    });
  }

  getPatientData(pacientId, index) {
    this.pacientsData[index].display_info=!this.pacientsData[index].display_info;

    if(this.pacientsData[index].display_info) {
      this.configService.getEncounter(pacientId)
      .subscribe((data: any) => {
        this.pacientsData[index].encounter = data;
      });
  
      this.configService.getCarePlan(pacientId)
      .subscribe((data: any) => {
        this.pacientsData[index].carePlan = data;
      });
  
      this.configService.getAppointment(pacientId)
      .subscribe((data: any) => {
        this.pacientsData[index].appointment = data;
      });
    }
  }
}
