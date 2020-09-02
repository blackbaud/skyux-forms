import {
  Component
} from '@angular/core';

import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  FormsModule
} from '@angular/forms';

import {
  SkyRadioModule
} from '@skyux/forms';

import {
  SkyRadioFixture
} from './radio-fixture';

//#region Test component
@Component({
  selector: 'radio-test',
  template: `
<sky-radio-group
  data-sky-id="test-radio"
  name="favoriteSeason"
  [value]="favoriteSeason"
  [(ngModel)]="favoriteSeason"
>
  <ul
    class="sky-list-unstyled"
  >
    <li *ngFor="let season of seasons">
      <sky-radio
        [disabled]="season.disabled"
        [value]="season.id"
      >
        <sky-radio-label>
          {{ season.name }}
        </sky-radio-label>
      </sky-radio>
    </li>
  </ul>
</sky-radio-group>
`
})
class TestComponent {

  public seasons = [
    { name: 'Spring', id: '1', disabled: false },
    { name: 'Summer', id: '2', disabled: false },
    { name: 'Fall', id: '3', disabled: true },
    { name: 'Winter', id: '4', disabled: false }
  ];

  public favoriteSeason = this.seasons[0].id;
}
//#endregion Test component

describe('Radio fixture', () => {
  let fixture: ComponentFixture<TestComponent>;
  let radioGroup: SkyRadioFixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ],
      imports: [
        SkyRadioModule,
        FormsModule
      ]
    });

    fixture = TestBed.createComponent(
      TestComponent
    );

    fixture.detectChanges();

    radioGroup = new SkyRadioFixture(
      fixture,
      'test-radio'
    );
  });

  it('should expose the provided properties', () => {
    const springSeason = fixture.componentInstance.seasons[0];
    expect(radioGroup.allRadioButtonsDisabled).toBeFalse();
    expect(radioGroup.value).toEqual(springSeason.id);
    expect(radioGroup.selectedLabel).toEqual(springSeason.name);
  });

  it('should get an individual radio button\'s value', () => {
    const summerIndex = 1;
    const summerSeason = fixture.componentInstance.seasons[summerIndex];
    expect(radioGroup.getRadioButtonValue(summerIndex)).toEqual(summerSeason.id);
  });

  it('should get an individual radio button\'s label', () => {
    const summerIndex = 1;
    const summerSeason = fixture.componentInstance.seasons[summerIndex];
    expect(radioGroup.getRadioButtonLabelText(summerIndex)).toEqual(summerSeason.name);
  });

  it('should indicate if an individual radio button is disabled', () => {
    const fallIndex = 2;

    expect(radioGroup.radioButtonDisabled(fallIndex)).toBeTrue();
  });

  it('should set the disabled state for an individual radio button', () => {
    const summerIndex = 1;

    expect(radioGroup.radioButtonDisabled(summerIndex)).toBeFalse();

    radioGroup.setRadioButtonDisabled(summerIndex, true);

    expect(radioGroup.radioButtonDisabled(summerIndex)).toBeTrue();
  });

  it('should set the disabled state for all radio buttons', () => {
    expect(radioGroup.allRadioButtonsDisabled).toBeFalse();

    radioGroup.allRadioButtonsDisabled = true;

    expect(radioGroup.allRadioButtonsDisabled).toBeTrue();
  });

  it('should select a radio button by index', () => {
    const springIndex = 0;
    const springSeason = fixture.componentInstance.seasons[springIndex];
    const summerIndex = 1;
    const summerSeason = fixture.componentInstance.seasons[summerIndex];

    expect(radioGroup.value).toEqual(springSeason.id);

    radioGroup.selectRadioButtonInputElByIndex(summerIndex);

    expect(radioGroup.value).toEqual(summerSeason.id);
  });

  it('should select a radio button by label', () => {
    const springIndex = 0;
    const springSeason = fixture.componentInstance.seasons[springIndex];
    const summerIndex = 1;
    const summerSeason = fixture.componentInstance.seasons[summerIndex];

    expect(radioGroup.value).toEqual(springSeason.id);

    radioGroup.selectRadioButtonInputElByLabel(summerSeason.name);

    expect(radioGroup.value).toEqual(summerSeason.id);
  });
});
