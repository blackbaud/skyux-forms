/**
 * Specifies the selected values for a selection group. If the type is set to `'checkbox'`, this value should be an array of booleans representing the selected checkboxes. If the type is set to `'radioButton'`, this should equal the value of the selected radio button if there is
   * a corresponding radio button with a matching value. If there is not such a corresponding
   * radio button, this value persists to be applied in case a new radio button is added with a
   * matching value.
 */
export interface SkySelectionBoxGroupValueType {

  /**
   * Specifies the selected value for radio button groups.
   */
  selectedRadioButtonValue: string;

  /**
   * Specifies the selected value for checkbox groups.
   */
  selectedCheckboxValues: { checkboxValue: string, checked: boolean }[]

}
