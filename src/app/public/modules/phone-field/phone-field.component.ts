import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import 'intl-tel-input';
require('intl-tel-input/build/js/utils');

import {
  SkyCountryData
} from './types';

@Component({
  selector: 'sky-phone-field',
  templateUrl: './phone-field.component.html',
  styleUrls: ['./phone-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyPhoneFieldComponent {

  @Input()
  public disabled: boolean;

  public set selectedCountry(newCountry: SkyCountryData) {
    this._selectedCountry = newCountry;
    if (!this._selectedCountry.placeholder) {
      this._selectedCountry.placeholder = (<any>window).intlTelInputUtils.getExampleNumber(newCountry.iso2, true,
        intlTelInputUtils.numberType.FIXED_LINE);
    }
    this.countryData.splice(this.countryData.indexOf(newCountry), 1);
    let sortedNewCountries = this.countryData
      .sort((a, b) => { if ((a === this.defaultCountryData || a.name < b.name) && b !== this.defaultCountryData) {
        return -1;
      } else {
        return 1;
      } });
    sortedNewCountries.splice(0, 0, newCountry);
    this.countryData = sortedNewCountries;
    this.selectedCountryChanged.emit(newCountry);
  }

  public get selectedCountry() {
    return this._selectedCountry;
  }

  @Output()
  public selectedCountryChanged = new EventEmitter<SkyCountryData>();

  private _selectedCountry: SkyCountryData;

  public defaultCountryData: SkyCountryData;

  public countryData: SkyCountryData[];

  constructor() {
    this.countryData = window.intlTelInputGlobals.getCountryData().slice(0);
    this.selectedCountry = this.countryData[0];
  }

  public selectCountry(countryCode: string) {
    this.selectedCountry = this.countryData.find(countryInfo => countryInfo.iso2 === countryCode);
  }

  public validateNumber(phoneNumber: string): boolean {
    return (<any> window).intlTelInputUtils.isValidNumber(phoneNumber, this.selectedCountry.iso2);
  }

  public setDefaultCountry(countryCode: string) {
    this.defaultCountryData = this.countryData.find(country => country.iso2 === countryCode);
  }

}
