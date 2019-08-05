import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick
} from '@angular/core/testing';

import {
  expect,
  SkyAppTestUtility
} from '@skyux-sdk/testing';

import {
  CharacterCountTestModule
} from './fixtures/character-count.module.fixture';
import { CharacterCountTestComponent } from './fixtures/character-count.component.fixture';
import { SkyCharacterCountComponent } from './character-count.component';

fdescribe('character-count', () => {

  function setInputWithChangeEvent(
    element: HTMLElement,
    text: string,
    fixture: ComponentFixture<any>
  ) {
    const inputEl = element.querySelector('input');
    inputEl.value = text;
    fixture.detectChanges();

    SkyAppTestUtility.fireDomEvent(inputEl, 'change');
    fixture.detectChanges();
    tick();
  }

  function setInputWithInputEvent(
    element: HTMLElement,
    text: string,
    fixture: ComponentFixture<any>
  ) {
    const inputEl = element.querySelector('input');
    inputEl.value = text;
    fixture.detectChanges();

    SkyAppTestUtility.fireDomEvent(inputEl, 'input');
    fixture.detectChanges();
    tick();
  }

  // function blurInput(
  //   element: HTMLElement,
  //   fixture: ComponentFixture<any>
  // ) {
  //   const inputEl = element.querySelector('input');
  //   SkyAppTestUtility.fireDomEvent(inputEl, 'blur');

  //   fixture.detectChanges();
  //   tick();
  // }

  // function setLabel(
  //   element: HTMLElement,
  //   text: string,
  //   fixture: ComponentFixture<any>
  // ) {
  //   const labelEl = element.querySelector('label');
  //   labelEl.innerText = text;

  //   fixture.detectChanges();
  //   tick();
  // }

  beforeEach(function () {
    TestBed.configureTestingModule({
      imports: [
        CharacterCountTestModule
      ]
    });
  });

  describe('standard behavior', () => {
    let fixture: ComponentFixture<CharacterCountTestComponent>;
    let component: CharacterCountTestComponent;
    let nativeElement: HTMLElement;
    let characterCountComponent: SkyCharacterCountComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(CharacterCountTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      component = fixture.componentInstance;

      fixture.detectChanges();

      characterCountComponent = component.inputDirective.skyCharacterCountInput;
    });

    it('should set the count with the initial length', fakeAsync(() => {

    }));

    it('should update the count on input', fakeAsync(() => {
      let characterCountLabel = nativeElement.querySelector('.sky-character-count-label') as HTMLLabelElement;

      setInputWithInputEvent(nativeElement, 'abc', fixture);

      expect(characterCountComponent.inputLength).toBe(3);
      expect(characterCountLabel.innerText).toBe('3/5');

      setInputWithInputEvent(nativeElement, 'abcd', fixture);

      expect(characterCountComponent.inputLength).toBe(4);
      expect(characterCountLabel.innerText).toBe('4/5');
    }));

    it('should show the error icon on the character count when appropriate', fakeAsync(() => {
      let characterCountLabel = nativeElement.querySelector('.sky-character-count-label') as HTMLLabelElement;

      setInputWithInputEvent(nativeElement, 'abcde', fixture);
      expect(characterCountLabel.classList.contains('sky-error-label')).toBeFalsy();

      setInputWithInputEvent(nativeElement, 'abcdef', fixture);
      expect(characterCountLabel.classList.contains('sky-error-label')).toBeTruthy();
    }));

    it('should show the error detail message when appropriate', fakeAsync(() => {
      setInputWithChangeEvent(nativeElement, 'abcde', fixture);
      expect(nativeElement.querySelector('.sky-character-count-error')).toBeFalsy();

      setInputWithInputEvent(nativeElement, 'abcdef', fixture);
      expect(nativeElement.querySelector('.sky-character-count-error')).toBeFalsy();

      setInputWithChangeEvent(nativeElement, 'abcdef', fixture);
      expect(nativeElement.querySelector('.sky-character-count-error')).toBeTruthy();
    }));

    it('should use the correct label in error detail', fakeAsync(() => {
      setInputWithChangeEvent(nativeElement, 'abcdef', fixture);

      let expectedErrorDetail = 'Limit Character Count Input to 5 characters';

      expect(nativeElement.querySelector('.sky-character-count-error').innerHTML.trim()).toBe(expectedErrorDetail);

    }));
  });
});
