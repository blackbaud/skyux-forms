import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
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

  @Output()
  public selectedCountryChanged = new EventEmitter<SkyCountryData>();

  public set selectedCountry(newCountry: SkyCountryData) {
    this._selectedCountry = newCountry;

    if (!this._selectedCountry.placeholder) {
      this._selectedCountry.placeholder = this.phoneUtils.getExampleNumber(newCountry.iso2, true,
        intlTelInputUtils.numberType.FIXED_LINE);
    }

    this.countryData.splice(this.countryData.indexOf(newCountry), 1);

    let sortedNewCountries = this.countryData
      .sort((a, b) => {
        if ((a === this.defaultCountryData || a.name < b.name) && b !== this.defaultCountryData) {
          return -1;
        } else {
          return 1;
        }
      });

    sortedNewCountries.splice(0, 0, newCountry);
    this.countryData = sortedNewCountries;
    this.selectedCountryChanged.emit(newCountry);
  }

  public get selectedCountry() {
    return this._selectedCountry;
  }

  public defaultCountryData: SkyCountryData;

  public countryData: SkyCountryData[];

  /**
   * The typings file for the internationalization library does not include the utility
   * functions so we must type the window object as "any"
   * to resolve lint errors.
   */
  private phoneUtils: any = (<any>window).intlTelInputUtils;

  private _selectedCountry: SkyCountryData;

  constructor() {
    /**
     * The "slice" here ensures that we get a copy of the array and not the global original. This
     * ensures that multiple instances of the component don't overwrite the original data.
     */
    this.countryData = window.intlTelInputGlobals.getCountryData().slice(0);
    this.selectedCountry = this.countryData[0];
  }

  /**
   * Sets the country to validate against based on the county's iso2 code.
   * @param countryCode The International Organization for Standardization's two-letter code
   * for the default country.
   */
  public selectCountry(countryCode: string): void {
    this.selectedCountry = this.countryData.find(countryInfo => countryInfo.iso2 === countryCode);
  }

  /**
   * Validate's the given phone number based on the currently selected country.
   * @param phoneNumber The number to validate
   */
  public validateNumber(phoneNumber: string): boolean {
    /**
     * The typings file for the internationalization library does not include the utility
     * functions so we must type the window object as "any"
     * to resolve lint errors.
     */
    return this.phoneUtils.isValidNumber(phoneNumber, this.selectedCountry.iso2);
  }

  /**
   * Sets the default country for the phone field component based on the county's iso2 code.
   * @param countryCode The International Organization for Standardization's two-letter code
   * for the default country.
   */
  public setDefaultCountry(countryCode: string): void {
    this.defaultCountryData = this.countryData.find(country => country.iso2 === countryCode);
  }

}
