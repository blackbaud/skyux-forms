import {
  DebugElement
} from '@angular/core';

import {
  ComponentFixture
} from '@angular/core/testing';

import {
  By
} from '@angular/platform-browser';

export class FileDropTestHelper {

  public static getInputDebugEl(fixture: ComponentFixture<any>): DebugElement {
    return fixture.debugElement.query(By.css('input.sky-file-input-hidden'));
  }

  public static getDeleteButtons(fixture: ComponentFixture<any>): DebugElement[] {
    return fixture.debugElement.queryAll(By.css('.sky-file-item-btn-delete'));
  }

  public static getDropEl(el: HTMLElement): HTMLElement {
    return el.querySelector('.sky-file-drop');
  }

  public static getDropDebugEl(fixture: ComponentFixture<any>): DebugElement {
    return fixture.debugElement.query(By.css('.sky-file-drop'));
  }

  public static getDropElWrapper(el: HTMLElement): HTMLElement {
    return el.querySelector('.sky-file-drop-col');
  }

  public static validateDropClasses(hasAccept: boolean, hasReject: boolean, dropEl: any): void {
    expect(dropEl.classList.contains('sky-file-drop-accept')).toBe(hasAccept);
    expect(dropEl.classList.contains('sky-file-drop-reject')).toBe(hasReject);
  }

  public static getLinkInput(fixture: ComponentFixture<any>): DebugElement {
    return fixture.debugElement.query(By.css('.sky-file-drop-link input'));
  }

  public static getLinkButton(fixture: ComponentFixture<any>): DebugElement {
    return fixture.debugElement.query(By.css('.sky-file-drop-link button'));
  }

  public static testClick(expectedResult: boolean, fixture: ComponentFixture<any>): void {
    let inputClicked = false;

    fixture.detectChanges();

    let inputEl = this.getInputDebugEl(fixture);

    spyOn((<any>inputEl.references).fileInput, 'click').and.callFake(function () {
      inputClicked = true;
    });

    let dropEl = this.getDropEl(fixture.nativeElement);

    dropEl.click();

    fixture.detectChanges();

    expect(inputClicked).toBe(expectedResult);
  }

  public static triggerChangeEvent(expectedChangeFiles: any[], fixture: ComponentFixture<any>): void {
    let inputEl = this.getInputDebugEl(fixture);

    let fileChangeEvent = {
      target: {
        files: {
          length: expectedChangeFiles.length,
          item: function (index: number) {
            return expectedChangeFiles[index];
          }
        }
      }
    };

    inputEl.triggerEventHandler('change', fileChangeEvent);
  }

  public static setupFileReaderSpy(): any {
    let fileReaderSpyObject: any = {
      loadCallbacks: [],
      errorCallbacks: [],
      abortCallbacks: []
    };

    spyOn((window as any), 'FileReader').and.returnValue({
      readAsDataURL: function (file: any) {

      },
      addEventListener: function (type: string, callback: Function) {
        if (type === 'load') {
          fileReaderSpyObject.loadCallbacks.push(callback);
        } else if (type === 'error') {
          fileReaderSpyObject.errorCallbacks.push(callback);
        } else if (type === 'abort') {
          fileReaderSpyObject.abortCallbacks.push(callback);
        }
      }
    });

    return fileReaderSpyObject;
  }

  public static setupStandardFileChangeEvent(
    fixture: ComponentFixture<any>,
    files?: Array<any>
  ): any {
    let fileReaderSpyFunction = this.setupFileReaderSpy();

    if (!files) {
      files = [
        {
          name: 'foo.txt',
          size: 1000,
          type: 'image/png'
        },
        {
          name: 'woo.txt',
          size: 2000,
          type: 'image/jpeg'
        }
      ];
    }
    this.triggerChangeEvent(files, fixture);

    fixture.detectChanges();

    if (fileReaderSpyFunction.loadCallbacks[0]) {
      fileReaderSpyFunction.loadCallbacks[0]({
        target: {
          result: 'url'
        }
      });
    }

    if (fileReaderSpyFunction.loadCallbacks[1]) {
      fileReaderSpyFunction.loadCallbacks[1]({
        target: {
          result: 'newurl'
        }
      });
    }

    fixture.detectChanges();

    return fileReaderSpyFunction;
  }

  public static setupSecondaryFileChangeEvent(
    fixture: ComponentFixture<any>,
    existingSpyFunction: any,
    files?: Array<any>
  ): void {
    existingSpyFunction.loadCallbacks = [];
    existingSpyFunction.errorCallbacks = [];
    existingSpyFunction.abortCallbacks = [];

    if (!files) {
      files = [
        {
          name: 'moo.txt',
          size: 3000,
          type: 'image/png'
        }
      ];
    }
    this.triggerChangeEvent(files, fixture);

    fixture.detectChanges();

    if (existingSpyFunction.loadCallbacks[0]) {
      existingSpyFunction.loadCallbacks[0]({
        target: {
          result: 'thirdurl'
        }
      });
    }

    fixture.detectChanges();
  }

  public static triggerDragEnter(
    enterTarget: any,
    dropDebugEl: DebugElement,
    fixture: ComponentFixture<any>
  ): void {
    let dragEnterPropStopped = false;
    let dragEnterPreventDefault = false;

    let dragEnterEvent = {
      target: enterTarget,
      stopPropagation: function () {
        dragEnterPropStopped = true;
      },
      preventDefault: function () {
        dragEnterPreventDefault = true;
      }
    };

    dropDebugEl.triggerEventHandler('dragenter', dragEnterEvent);
    fixture.detectChanges();
    expect(dragEnterPreventDefault).toBe(true);
    expect(dragEnterPropStopped).toBe(true);
  }

  public static triggerDragOver(
    files: any,
    dropDebugEl: DebugElement,
    fixture: ComponentFixture<any>
  ): void {
    let dragOverPropStopped = false;
    let dragOverPreventDefault = false;

    let dragOverEvent = {
      dataTransfer: {
        files: {} as any,
        items: files
      },
      stopPropagation: function () {
        dragOverPropStopped = true;
      },
      preventDefault: function () {
        dragOverPreventDefault = true;
      }
    };

    dropDebugEl.triggerEventHandler('dragover', dragOverEvent);
    fixture.detectChanges();
    expect(dragOverPreventDefault).toBe(true);
    expect(dragOverPropStopped).toBe(true);
  }

  public static triggerDrop(
    files: any,
    dropDebugEl: DebugElement,
    fixture: ComponentFixture<any>
  ): void {
    let dropPropStopped = false;
    let dropPreventDefault = false;
    let fileLength = files ? files.length : 0;

    let dropEvent = {
      dataTransfer: {
        files: {
          length: fileLength,
          item: function (index: number) {
            return files[index];
          }
        },
        items: files
      },
      stopPropagation: function () {
        dropPropStopped = true;
      },
      preventDefault: function () {
        dropPreventDefault = true;
      }
    };

    dropDebugEl.triggerEventHandler('drop', dropEvent);
    fixture.detectChanges();
    expect(dropPreventDefault).toBe(true);
    expect(dropPropStopped).toBe(true);
  }

  public static triggerDragLeave(
    leaveTarget: any,
    dropDebugEl: DebugElement,
    fixture: ComponentFixture<any>
  ): void {

    let dragLeaveEvent = {
      target: leaveTarget
    };

    dropDebugEl.triggerEventHandler('dragleave', dragLeaveEvent);
    fixture.detectChanges();
  }

  public static triggerInputChange(
    value: string,
    linkInput: DebugElement,
    fixture: ComponentFixture<any>
  ): void {
    linkInput.triggerEventHandler('input', { target: { value: value } });
    fixture.detectChanges();
  }

}
