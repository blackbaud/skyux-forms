import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import 'intl-tel-input';
require('intl-tel-input/build/js/utils');

interface CountryData {
  name: string;
  iso2: string;
  dialCode: string;
  placeholder?: string;
}

@Component({
  selector: 'sky-phone-field',
  templateUrl: './phone-field.component.html',
  styleUrls: ['./phone-field.component.scss', '../../../../../node_modules/intl-tel-input/build/css/intlTelInput.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyPhoneFieldComponent {

  @Input()
  public disabled: boolean;

  public set selectedCountry(newCountry: CountryData) {
    this._selectedCountry = newCountry;
    if (!this._selectedCountry.placeholder) {
      this._selectedCountry.placeholder = (<any>window).intlTelInputUtils.getExampleNumber(newCountry.iso2, true,
        intlTelInputUtils.numberType.FIXED_LINE);
    }
    this.countryData.splice(this.countryData.indexOf(newCountry), 1);
    let sortedNewCountries = this.countryData
      .sort((a, b) => { if (a.name < b.name) {
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
  public selectedCountryChanged = new EventEmitter<CountryData>();

  private _selectedCountry: CountryData;

  public countryData: CountryData[];
  // private phoneUtils: intlTelInput.Plugin;

  constructor() {
    this.countryData = window.intlTelInputGlobals.getCountryData();
    // (<any> window.intlTelInputGlobals).startedLoadingUtilsScript = false;
    // window.intlTelInputGlobals.loadUtils('webpack://./~/intl-tel-input/build/js/utils.js');
    // this.phoneUtils = window.intlTelInput(undefined);
    this.selectedCountry = this.countryData[0];
  }

  public selectCountry(country: CountryData) {
    this.selectedCountry = country;
  }

  public validateNumber(phoneNumber: string): boolean {
    return (<any> window).intlTelInputUtils.isValidNumber(phoneNumber, this.selectedCountry.iso2);
  }

}
