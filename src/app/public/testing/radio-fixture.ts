import {
  By
} from '@angular/platform-browser';

import {
  ComponentFixture
} from '@angular/core/testing';

import {
  DebugElement
} from '@angular/core';

import {
  SkyAppTestUtility
} from '@skyux-sdk/testing';

/**
 * Allows interaction with a SKY UX radio buttons within a radio group.
 */
export class SkyRadioFixture {

  private debugEl: DebugElement;

  constructor(
    private fixture: ComponentFixture<any>,
    private skyTestId: string
  ) {
    this.debugEl = SkyAppTestUtility.getDebugElementByTestId(this.fixture, this.skyTestId, 'sky-radio-group');
  }

  /**
   * The selected radio button value.
   */
  public get value(): any {
    const selectedRadio = this.debugEl.query(By.css('sky-radio input:checked'));
    const selectedValue = selectedRadio && selectedRadio.nativeElement.value;

    return selectedValue;
  }

  /**
   * The selected radio button label.
   */
  public get selectedLabel(): string {
    const allRadioButtons = this.getAllSkyRadioButtonEls();
    const selectedRadioInputValue = this.value;

    for (let i = 0; i < allRadioButtons.length; i++) {
      const skyRadio = allRadioButtons[i];
      const inputEl = skyRadio.query(By.css('input'));

      if (inputEl.nativeElement && inputEl.nativeElement.value === selectedRadioInputValue) {
        return this.getRadioButtonLabelText(i);
      }
    }
  }

  /**
   * Get the value of the radio button at the given index.
   * @param index The index of the radio button.
   */
  public getRadioButtonValue(index: number): any {
    const radioButton = this.getRadioButtonInputEl(index);

    return radioButton && radioButton.nativeElement.value;
  }

  /**
   * A flag indicating if every radio button in the radio group is disabled.
   */
  public get allRadioButtonsDisabled(): boolean {
    const allRadioButtons = this.getAllSkyRadioButtonEls();

    for (let i = 0; i < allRadioButtons.length; i++) {
      if (!this.radioButtonDisabled(i)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Set the disabled value for all radio buttons.
   */
  public set allRadioButtonsDisabled(value: boolean) {
    const allRadioButtons = this.getAllSkyRadioButtonEls();

    allRadioButtons.forEach((button, index) => {
      this.setRadioButtonDisabled(index, value);
    });
  }

  /**
   * Indicates if the radio button at the given index is disabled.
   * @param index The index of the radio button.
   */
  public radioButtonDisabled(index: number): boolean {
    const radioButton = this.getRadioButtonInputEl(index);

    return radioButton && radioButton.nativeElement.disabled;
  }

  /**
   * Sets the disabled value of the radio button at the given index.
   * @param index The index of the radio button.
   * @param value The boolean value to set the button's diabled property to.
   */
  public setRadioButtonDisabled(index: number, value: boolean): void {
    const radioButton = this.getRadioButtonInputEl(index);

    /* istanbul ignore else */
    if (radioButton) {
      radioButton.nativeElement.disabled = value;

      this.fixture.detectChanges();
    }
  }

  /**
   * The text of the radio button at the given index.
   * @param index The index of the radio button.
   */
  public getRadioButtonLabelText(index: number): string {
    const labelEl = this.getRadioButtonLabelEl(index);
    return SkyAppTestUtility.getText(labelEl.nativeElement);
  }

  /**
   * Select the radio button with the given index.
   * @param index The index of the radio button.
   */
  public selectRadioButtonInputElByIndex(index: number): void {
    const radioButton = this.getRadioButtonInputEl(index);

    if (radioButton) {
      radioButton.nativeElement.click();
    }

    this.fixture.detectChanges();
  }

  /**
   * Select the radio button with the given label.
   * @param label The label text to select the radio button by.
   */
  public selectRadioButtonInputElByLabel(label: string): void {
    const allRadioButtons = this.getAllSkyRadioButtonEls();

    for (let i = 0; i < allRadioButtons.length; i++) {
      const radioButtonLabel = this.getRadioButtonLabelText(i);

      if (radioButtonLabel === label) {
        this.selectRadioButtonInputElByIndex(i);
        break;
      }
    }
  }

  private getAllSkyRadioButtonEls(): DebugElement[] {
    return this.debugEl.queryAll(
      By.css('.sky-radio-group sky-radio')
    );
  }

  private getRadioButtonInputEl(index: number): DebugElement {
    const allSkyRadios = this.getAllSkyRadioButtonEls();
    let skyRadioInput: DebugElement;

    if (allSkyRadios && allSkyRadios[index]) {
      const skyRadioEl = allSkyRadios[index];
      skyRadioInput = skyRadioEl.query(By.css('input'));
    }

    return skyRadioInput;
  }

  private getRadioButtonLabelEl(index: number): DebugElement {
    const allSkyRadios = this.getAllSkyRadioButtonEls();
    let skyRadioInputLabel: DebugElement;

    if (allSkyRadios && allSkyRadios[index]) {
      const skyRadioEl = allSkyRadios[index];
      skyRadioInputLabel = skyRadioEl.query(By.css('sky-radio-label .sky-switch-label'));
    }

    return skyRadioInputLabel;
  }
}
