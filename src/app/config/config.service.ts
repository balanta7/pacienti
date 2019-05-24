import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) { }

  private pacientsDataUrl = 'http://hapi.fhir.org/baseDstu3/Patient?_count=500&_pretty=true';

  private pmedicationDataUrl = 'http://hapi.fhir.org/baseDstu3/Medication?_count=500&_pretty=true';

  getPatientsData() {
    return this.http.get(this.pacientsDataUrl);
  }

  getMedicationData() {
    return this.http.get(this.pmedicationDataUrl);
  }

  getSearchedPacients(name: String) {
    var url = 'http://hapi.fhir.org/baseDstu3/Patient?name=' + name + '&_count=500&_format=json&_pretty=true';
    return this.http.get(url);
  }

  getEncounter(patientId: String) {
    var url = 'http://hapi.fhir.org/baseDstu3/Encounter?patient=' + patientId + '&_pretty=true';
    return this.http.get(url);
  }

  getCarePlan(patientId: String) {
    var url = 'http://hapi.fhir.org/baseDstu3/CarePlan?patient=' + patientId + '&_pretty=true';
    return this.http.get(url);
  }

  getAppointment(patientId: String) {
    var url = 'http://hapi.fhir.org/baseDstu3/Appointment?patient=' + patientId + '&_pretty=true';
    return this.http.get(url);
  }
}
