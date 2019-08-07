import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  DebugElement
} from '@angular/core';

import {
  By
} from '@angular/platform-browser';

import {
  expect
} from '@skyux-sdk/testing';

import {
  SkyFileAttachmentComponent
} from './file-attachment.component';

import {
  SkyFileAttachmentChange
} from './types/file-attachment-change';

import {
  SkyFileItem
} from './file-item';

import {
  FileAttachmentTestComponent
} from './fixtures/file-attachment.component.fixture';

import {
  FileAttachmentTestModule
} from './fixtures/file-attachment.module.fixture';

describe('File attachment', () => {

  let fixture: ComponentFixture<FileAttachmentTestComponent>;
  let el: any;
  let fileAttachmentInstance: SkyFileAttachmentComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FileAttachmentTestModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileAttachmentTestComponent);
    fixture.detectChanges();
    el = fixture.nativeElement;
    fileAttachmentInstance = fixture.componentInstance.fileDropComponent;
  });

  function getInputDebugEl() {
    return fixture.debugElement.query(By.css('input'));
  }

  function getButtonEl() {
    return el.querySelector('.sky-file-attachment-btn');
  }

  function getDropEl() {
    return el.querySelector('.sky-file-attachment');
  }

  function getDropDebugEl() {
    return fixture.debugElement.query(By.css('.sky-file-attachment'));
  }

  function getFileNameEl() {
    return el.querySelector('.sky-file-attachment-name');
  }

  function getFileNameText() {
    return el.querySelector('.sky-file-attachment-name-text').textContent.trim();
  }

  function getDeleteEl() {
    return el.querySelector('.sky-file-attachment-delete');
  }

  function validateDropClasses(hasAccept: boolean, hasReject: boolean, dropEl: any) {
    expect(dropEl.classList.contains('sky-file-attachment-accept')).toBe(hasAccept);
    expect(dropEl.classList.contains('sky-file-attachment-reject')).toBe(hasReject);
  }

  function getImage() {
    return fixture.debugElement.query(By.css('.sky-file-attachment-preview-img'));
  }

  function testImage(extension: string) {
    fileAttachmentInstance.fileAttachment = <SkyFileItem> {
      file: {
        name: 'myFile.' + extension,
        type: 'image/' + extension,
        size: 1000
      },
      url: 'myFile.' + extension
    };

    fixture.detectChanges();

    let imageEl = getImage();
    expect(imageEl.nativeElement.getAttribute('src')).toBe('myFile.' + extension);

    // Test Accessibility
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement).toBeAccessible();
    });
  }

  function testOtherTypes(extension: string, type: string) {
    fileAttachmentInstance.fileAttachment = <SkyFileItem> {
      file: {
        name: 'myFile.' + extension,
        type:  type + '/' + extension,
        size: 1000
      },
      url: 'myFile.' + extension
    };
    fixture.detectChanges();

    let imageEl = getImage();
    expect(imageEl).toBeFalsy();

    // Test Accessibility
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement).toBeAccessible();
    });
  }

  function getLabelWrapper() {
    return el.querySelector('.sky-file-attachment-label-wrapper');
  }

  function triggerChangeEvent(expectedChangeFiles: any[]) {
    let inputEl = getInputDebugEl();

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

  function setupFileReaderSpy() {
    let loadCallbacks: Function[] = [];
    let errorCallbacks: Function[] = [];
    let abortCallbacks: Function[] = [];

    spyOn((window as any), 'FileReader').and.returnValue({
      readAsDataURL: function(file: any) {

      },
      addEventListener: function(type: string, callback: Function) {
        if (type === 'load') {
          loadCallbacks.push(callback);
        } else if (type === 'error') {
          errorCallbacks.push(callback);
        } else if (type === 'abort') {
          abortCallbacks.push(callback);
        }
      }
    });

    return {
      loadCallbacks: loadCallbacks,
      errorCallbacks: errorCallbacks,
      abortCallbacks: abortCallbacks
    };
  }

  function setupStandardFileChangeEvent(files?: Array<any>) {
    let fileReaderSpy = setupFileReaderSpy();

    if (!files) {
      files = [
        {
          name: 'foo.txt',
          size: 1000,
          type: 'image/png'
        }
      ];
    }
    triggerChangeEvent(files);

    fixture.detectChanges();

    if (fileReaderSpy.loadCallbacks[0]) {
       fileReaderSpy.loadCallbacks[0]({
        target: {
          result: 'url'
        }
      });
    }

    if (fileReaderSpy.loadCallbacks[1]) {
      fileReaderSpy.loadCallbacks[1]({
        target: {
          result: 'newurl'
        }
      });
    }

    fixture.detectChanges();
  }

  function triggerDragEnter(enterTarget: any, dropDebugEl: DebugElement) {
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

  function triggerDragOver(files: any, dropDebugEl: DebugElement) {
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

  function triggerDrop(files: any, dropDebugEl: DebugElement) {
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

  function triggerDragLeave(leaveTarget: any, dropDebugEl: DebugElement) {

    let dragLeaveEvent = {
      target: leaveTarget
    };

    dropDebugEl.triggerEventHandler('dragleave', dragLeaveEvent);
    fixture.detectChanges();
  }
  //#endregion

  it('should allow the user to specify if the file is required', () => {
    fileAttachmentInstance.required = false;
    fixture.detectChanges();
    let buttonEl = getButtonEl();

    expect(buttonEl.classList.contains('sky-file-attachment-required')).toBe(false);

    fileAttachmentInstance.required = true;
    fixture.detectChanges();
    expect(buttonEl.classList.contains('sky-file-attachment-required')).toBe(true);
  });

  it('should mark the field label as required when specified', () => {
    fileAttachmentInstance.required = false;
    fixture.detectChanges();
    let labelWrapper = getLabelWrapper();

    expect(labelWrapper.classList.contains('sky-control-label-required')).toBe(false);

    fileAttachmentInstance.required = true;
    fixture.detectChanges();
    expect(labelWrapper.classList.contains('sky-control-label-required')).toBe(true);
  });

  it('should click the file input on choose file button click', () => {
    let inputClicked = false;

    fixture.detectChanges();

    let inputEl = getInputDebugEl();

    spyOn((<any>inputEl.references).fileInput, 'click').and.callFake(function () {
      inputClicked = true;
    });

    let dropEl = getButtonEl();

    dropEl.click();

    fixture.detectChanges();

    expect(inputClicked).toBe(true);
  });

  it('should click the file input on text click', () => {
    let inputClicked = false;

    fixture.detectChanges();

    let inputEl = getInputDebugEl();

    spyOn((<any>inputEl.references).fileInput, 'click').and.callFake(function () {
      inputClicked = true;
    });

    let textEl = getFileNameEl();

    textEl.click();

    fixture.detectChanges();

    expect(inputClicked).toBe(true);
  });

  it('should not click the file input on remove button click', () => {
    let inputClicked = false;

    fixture.detectChanges();

    let inputEl = getInputDebugEl();

    spyOn((<any>inputEl.references).fileInput, 'click').and.callFake(function () {
      inputClicked = true;
    });

    fixture.detectChanges();

    let file = [
      {
        name: 'foo.txt',
        size: 1000,
        type: 'image/png'
      }
    ];

    setupStandardFileChangeEvent(file);

    let deleteEl = getDeleteEl();

    deleteEl.click();

    fixture.detectChanges();

    expect(inputClicked).toBe(false);
  });

  // Maybe some other tests here about dragging
  it('should load and emit file on file change event', () => {
    let fileChangeActual: SkyFileAttachmentChange;

    fileAttachmentInstance.fileChange.subscribe(
      (fileChange: SkyFileAttachmentChange) => fileChangeActual = fileChange );

    fixture.detectChanges();

    let file = [
      {
        name: 'foo.txt',
        size: 1000,
        type: 'image/png'
      }
    ];

    setupStandardFileChangeEvent(file);

    expect(fileChangeActual.file).toBeTruthy();
    expect(fileChangeActual.file.url).toBe('url');
    expect(fileChangeActual.file.file.name).toBe('foo.txt');
    expect(fileChangeActual.file.file.size).toBe(1000);
  });

  it('should load and emit files on file change event when file reader has an error and aborts',
  () => {
    let filesChangedActual: SkyFileAttachmentChange;

    fileAttachmentInstance.fileChange.subscribe(
      (filesChanged: SkyFileAttachmentChange) => {
        filesChangedActual = filesChanged;
      });

    let fileReaderSpy = setupFileReaderSpy();

    triggerChangeEvent([
      {
        name: 'woo.txt',
        size: 3000
      }
    ]);
    fixture.detectChanges();

    fileReaderSpy.abortCallbacks[0]();
    fixture.detectChanges();

    expect(filesChangedActual.file.url).toBeFalsy();
    expect(filesChangedActual.file.file.name).toBe('woo.txt');
    expect(filesChangedActual.file.file.size).toBe(3000);

    triggerChangeEvent([
      {
        name: 'foo.txt',
        size: 2000
      }
    ]);
    fixture.detectChanges();

    fileReaderSpy.errorCallbacks[1]();
    fixture.detectChanges();

    expect(filesChangedActual.file.url).toBeFalsy();
    expect(filesChangedActual.file.file.name).toBe('foo.txt');
    expect(filesChangedActual.file.file.size).toBe(2000);
  });

  // Maybe some other tests here about setting the file
  it('should clear file on remove press', () => {
    let fileChangeActual: SkyFileAttachmentChange;

    fileAttachmentInstance.fileChange.subscribe(
      (fileChange: SkyFileAttachmentChange) => fileChangeActual = fileChange );

    fixture.detectChanges();

    let file = [
      {
        name: 'foo.txt',
        size: 1000,
        type: 'image/png'
      }
    ];

    setupStandardFileChangeEvent(file);

    let deleteEl = getDeleteEl();

    deleteEl.click();

    fixture.detectChanges();

    expect(fileChangeActual.file).toBeFalsy();
  });

  it('should show the appropriate file name', () => {

    // Regular file
    fileAttachmentInstance.fileAttachment = <SkyFileItem> {
      file: {
        name: 'test.png',
        size: 1000,
        type: 'image/png'
      },
      url: 'myFile'
    };
    fixture.detectChanges();

    expect(getFileNameText()).toBe('test.png');

    // File with truncated name
    fileAttachmentInstance.fileAttachment = <SkyFileItem> {
      file: {
        name: 'abcdefghijklmnopqrstuvwxyz12345.png',
        size: 1000,
        type: 'image/png'
      },
      url: 'myFile'
    };
    fixture.detectChanges();

    expect(getFileNameText()).toBe('abcdefghijklmnopqrstuvwxyz....');

    // File with no name
    fileAttachmentInstance.fileAttachment = <SkyFileItem> {
      file: {
        name: undefined,
        size: 1000,
        type: 'image/png'
      },
      url: 'myFile'
    };
    fixture.detectChanges();

    expect(getFileNameText()).toBe('myFile');

    // File with no name and truncated url
    fileAttachmentInstance.fileAttachment = <SkyFileItem> {
      file: {
        name: undefined,
        size: 1000,
        type: 'image/txt'
      },
      url: 'abcdefghijklmnopqrstuvwxyz12345'
    };
    fixture.detectChanges();

    expect(getFileNameText()).toBe('abcdefghijklmnopqrstuvwxyz....');
  });

  it('should load files and set classes on drag and drop', () => {
    let fileChangeActual: SkyFileAttachmentChange;

    fileAttachmentInstance.fileChange.subscribe(
      (fileChange: SkyFileAttachmentChange) => fileChangeActual = fileChange );

    let fileReaderSpy = setupFileReaderSpy();

    fileAttachmentInstance.acceptedTypes = 'image/png, image/tiff';

    fixture.detectChanges();

    let dropDebugEl = getDropDebugEl();
    let dropEl = getDropEl();

    let files = [
      {
        name: 'foo.txt',
        size: 1000,
        type: 'image/png'
      }
    ];

    let invalidFiles = [
      {
        name: 'foo.txt',
        size: 1000,
        type: 'image/jpeg'
      }
    ];

    triggerDragEnter('sky-file-attachment', dropDebugEl);
    triggerDragOver(files, dropDebugEl);

    validateDropClasses(true, false, dropEl);

    triggerDrop(files, dropDebugEl);

    validateDropClasses(false, false, dropEl);

    fileReaderSpy.loadCallbacks[0]({
      target: {
        result: 'url'
      }
    });

    fixture.detectChanges();

    expect(fileChangeActual.file).toBeTruthy();
    expect(fileChangeActual.file.errorType).toBeFalsy();
    expect(fileChangeActual.file.url).toBe('url');
    expect(fileChangeActual.file.file.name).toBe('foo.txt');
    expect(fileChangeActual.file.file.size).toBe(1000);

    // Verify reject classes when appropriate
    triggerDragEnter('sky-file-attachment', dropDebugEl);
    triggerDragOver(invalidFiles, dropDebugEl);
    validateDropClasses(false, true, dropEl);
    triggerDragLeave('something', dropDebugEl);
    validateDropClasses(false, true, dropEl);
    triggerDragLeave('sky-file-attachment', dropDebugEl);
    validateDropClasses(false, false, dropEl);

    // Verify empty file array
    triggerDragEnter('sky-file-attachment', dropDebugEl);
    triggerDragOver([], dropDebugEl);
    validateDropClasses(false, false, dropEl);

    let emptyEvent = {
      stopPropagation: function () {},
      preventDefault: function () {}
    };

    // Verify no dataTransfer drag
    dropDebugEl.triggerEventHandler('dragover', emptyEvent);
    fixture.detectChanges();
    validateDropClasses(false, false, dropEl);

    // Verify no dataTransfer drop
    fileReaderSpy.loadCallbacks = [];
    dropDebugEl.triggerEventHandler('drop', emptyEvent);
    fixture.detectChanges();
    expect(fileReaderSpy.loadCallbacks.length).toBe(0);

  });

  it([
    'should accept a file of rejected type on drag (but not on drop)',
    'if the browser does not support dataTransfer.items'
  ].join(' '), () => {
    fileAttachmentInstance.acceptedTypes = 'image/png, image/tiff';

    fixture.detectChanges();

    let dropDebugEl = getDropDebugEl();

    let invalidFiles = [
      {
        name: 'foo.txt',
        size: 1000,
        type: 'image/jpeg'
      }
    ];

    let dropEl = getDropEl();

    triggerDragEnter('sky-file-attachment', dropDebugEl);
    triggerDragOver(undefined, dropDebugEl);
    validateDropClasses(true, false, dropEl);

    triggerDrop(invalidFiles, dropDebugEl);
    validateDropClasses(false, false, dropEl);
  });

  it('should prevent loading multiple files on drag and drop', () => {
    let files = [
      {
        name: 'foo.txt',
        size: 1000,
        type: 'image/png'
      },
      {
        name: 'goo.txt',
        size: 1000,
        type: 'image/png'
      }
    ];

    let fileReaderSpy = setupFileReaderSpy();

    let dropDebugEl = getDropDebugEl();

    triggerDragEnter('sky-file-attachment', dropDebugEl);
    triggerDragOver(files, dropDebugEl);
    triggerDrop(files, dropDebugEl);
    expect(fileReaderSpy.loadCallbacks.length).toBe(0);
  });

  it('should prevent loading directories on drag and drop', () => {
    let files = [
      {
        name: 'foo.txt',
        size: 1000,
        type: 'image/png',
        webkitGetAsEntry: function () {
          return {
            isDirectory: true
          };
        }
      }
    ];

    let fileReaderSpy = setupFileReaderSpy();
    fixture.detectChanges();

    let dropDebugEl = getDropDebugEl();

    triggerDragEnter('sky-file-attachment', dropDebugEl);
    triggerDragOver(files, dropDebugEl);
    triggerDrop(files, dropDebugEl);
    expect(fileReaderSpy.loadCallbacks.length).toBe(0);
  });

  it('should allow the user to specify a min file size', () => {
    let fileChangeActual: SkyFileAttachmentChange;

    fileAttachmentInstance.fileChange.subscribe(
      (fileChange: SkyFileAttachmentChange) => fileChangeActual = fileChange );

    fileAttachmentInstance.minFileSize = 1500;
    fixture.detectChanges();

    setupStandardFileChangeEvent();

    expect(fileChangeActual.file.file.name).toBe('foo.txt');
    expect(fileChangeActual.file.file.size).toBe(1000);
    expect(fileChangeActual.file.errorType).toBe('minFileSize');
    expect(fileChangeActual.file.errorParam).toBe('1500');

    expect(fileAttachmentInstance.fileAttachment).toBeFalsy();
  });

  it('should allow the user to specify a max file size', () => {
    let fileChangeActual: SkyFileAttachmentChange;

    fileAttachmentInstance.fileChange.subscribe(
      (fileChange: SkyFileAttachmentChange) => fileChangeActual = fileChange );

    fileAttachmentInstance.maxFileSize = 1500;
    fixture.detectChanges();

    let file = [
      {
        name: 'woo.txt',
        size: 2000,
        type: 'image/png'
      }
    ];

    setupStandardFileChangeEvent(file);

    expect(fileChangeActual.file.file.name).toBe('woo.txt');
    expect(fileChangeActual.file.file.size).toBe(2000);
    expect(fileChangeActual.file.errorType).toBe('maxFileSize');
    expect(fileChangeActual.file.errorParam).toBe('1500');

    expect(fileAttachmentInstance.fileAttachment).toBeFalsy();
  });

  it('should set errors if file fails user provided validation function', () => {
    let fileChangeActual: SkyFileAttachmentChange;

    fileAttachmentInstance.fileChange.subscribe(
      (fileChange: SkyFileAttachmentChange) => fileChangeActual = fileChange );

    let errorMessage = 'You may not upload a file that begins with the letter "w."';

    fileAttachmentInstance.validateFn = function(inputFile: any) {
      if (inputFile.file.name.indexOf('w') === 0) {
        return errorMessage;
      }
    };

    fixture.detectChanges();

    let file = [
      {
        name: 'woo.txt',
        size: 2000,
        type: 'image/png'
      }
    ];

    setupStandardFileChangeEvent(file);

    expect(fileChangeActual.file.file.name).toBe('woo.txt');
    expect(fileChangeActual.file.file.size).toBe(2000);
    expect(fileChangeActual.file.errorType).toBe('validate');
    expect(fileChangeActual.file.errorParam).toBe(errorMessage);

    expect(fileAttachmentInstance.fileAttachment).toBeFalsy();
  });

  it('should accept if file passes user provided validation function', () => {
    let fileChangeActual: SkyFileAttachmentChange;

    fileAttachmentInstance.fileChange.subscribe(
      (fileChange: SkyFileAttachmentChange) => fileChangeActual = fileChange );

    let errorMessage = 'You may not upload a file that begins with the letter "w."';

    fileAttachmentInstance.validateFn = function(inputFile: any) {
      if (inputFile.file.name.indexOf('w') === 0) {
        return errorMessage;
      }
    };

    fixture.detectChanges();

    let file = [
      {
        name: 'foo.txt',
        size: 1000,
        type: 'image/png'
      }
    ];

    setupStandardFileChangeEvent(file);

    expect(fileChangeActual.file.file.name).toBe('foo.txt');
    expect(fileChangeActual.file.file.size).toBe(1000);
    expect(fileChangeActual.file.url).toBe('url');

    expect(fileAttachmentInstance.fileAttachment).toBeTruthy();
  });

  it('should accept a file when type is accepted', () => {
    let fileChangeActual: SkyFileAttachmentChange;

    fileAttachmentInstance.fileChange.subscribe(
      (fileChange: SkyFileAttachmentChange) => fileChangeActual = fileChange );

    fileAttachmentInstance.acceptedTypes = 'image/png,image/tiff';

    fixture.detectChanges();

    let file = [
      {
        name: 'foo.txt',
        size: 1000,
        type: 'image/png'
      }
    ];

    setupStandardFileChangeEvent(file);

    expect(fileChangeActual.file.file.name).toBe('foo.txt');
    expect(fileChangeActual.file.file.size).toBe(1000);
    expect(fileChangeActual.file.url).toBe('url');
  });

  it('should reject a file with a type that is not accepted', () => {
    let fileChangeActual: SkyFileAttachmentChange;

    fileAttachmentInstance.fileChange.subscribe(
      (fileChange: SkyFileAttachmentChange) => fileChangeActual = fileChange );

    fileAttachmentInstance.acceptedTypes = 'image/png,image/tiff';

    fixture.detectChanges();

    let file = [
      {
        name: 'woo.txt',
        size: 2000,
        type: 'image/jpeg'
      }
    ];

    setupStandardFileChangeEvent(file);

    expect(fileChangeActual.file.file.name).toBe('woo.txt');
    expect(fileChangeActual.file.file.size).toBe(2000);
    expect(fileChangeActual.file.errorType).toBe('fileType');
    expect(fileChangeActual.file.errorParam).toBe(fileAttachmentInstance.acceptedTypes);
  });

  it('should reject a file with no type when accepted types are defined', () => {
    let fileChangeActual: SkyFileAttachmentChange;

    fileAttachmentInstance.fileChange.subscribe(
      (fileChange: SkyFileAttachmentChange) => fileChangeActual = fileChange );

    fileAttachmentInstance.acceptedTypes = 'image/png,image/tiff';

    fixture.detectChanges();

    let file = [
      {
        name: 'foo.txt',
        size: 1000
      }
    ];

    setupStandardFileChangeEvent(file);

    expect(fileChangeActual.file.file.name).toBe('foo.txt');
    expect(fileChangeActual.file.file.size).toBe(1000);
    expect(fileChangeActual.file.errorType).toBe('fileType');
    expect(fileChangeActual.file.errorParam).toBe(fileAttachmentInstance.acceptedTypes);
  });

  it('should allow the user to specify accepted type with wildcards', () => {
    let fileChangeActual: SkyFileAttachmentChange;

    fileAttachmentInstance.fileChange.subscribe(
      (fileChange: SkyFileAttachmentChange) => fileChangeActual = fileChange );

    fileAttachmentInstance.acceptedTypes = 'application/*,image/*';

    fixture.detectChanges();

    let file = [
      {
        name: 'woo.txt',
        size: 2000,
        type: 'image/jpeg'
      }
    ];

    setupStandardFileChangeEvent(file);

    expect(fileChangeActual.file.file.name).toBe('woo.txt');
    expect(fileChangeActual.file.file.size).toBe(2000);
    expect(fileChangeActual.file.url).toBe('url');
  });

  it('should accept multiple types using a wildcard', () => {
    let fileChangeActual: SkyFileAttachmentChange;

    fileAttachmentInstance.fileChange.subscribe(
      (fileChange: SkyFileAttachmentChange) => fileChangeActual = fileChange );

    fileAttachmentInstance.acceptedTypes = 'application/*,image/*';

    fixture.detectChanges();

    let file = [
      {
        name: 'foo.txt',
        size: 1000,
        type: 'image/png'
      }
    ];

    setupStandardFileChangeEvent(file);

    expect(fileChangeActual.file.file.name).toBe('foo.txt');
    expect(fileChangeActual.file.file.size).toBe(1000);
    expect(fileChangeActual.file.url).toBe('url');
  });

  it('shows the thumbnail if the item is an image', () => {
    testImage('png');
    testImage('bmp');
    testImage('jpeg');
    testImage('gif');
  });

  it('does not show an icon if it is not an image', () => {
    testOtherTypes('pdf', 'pdf');
    testOtherTypes('gz', 'gz');
    testOtherTypes('rar', 'rar');
    testOtherTypes('tgz', 'tgz');
    testOtherTypes('zip', 'zip');
    testOtherTypes('ppt', 'ppt');
    testOtherTypes('pptx', 'pptx');
    testOtherTypes('doc', 'doc');
    testOtherTypes('docx', 'docx');
    testOtherTypes('xls', 'xls');
    testOtherTypes('xlsx', 'xlsx');
    testOtherTypes('txt', 'txt');
    testOtherTypes('htm', 'htm');
    testOtherTypes('html', 'html');
    testOtherTypes('mp3', 'audio');
    testOtherTypes('tiff', 'image');
    testOtherTypes('other', 'text');
    testOtherTypes('mp4', 'video');
  });

  it('should not show an icon if file or type does not exist', () => {
    let imageEl = getImage();
    expect(imageEl).toBeFalsy();

    fileAttachmentInstance.fileAttachment = <SkyFileItem> {
      file: undefined,
      url: 'myFile'
    };
    fixture.detectChanges();

    expect(imageEl).toBeFalsy();

    fileAttachmentInstance.fileAttachment = <SkyFileItem> {
      file: {
        name: 'myFile.png',
        type: undefined,
        size: 1000
      },
      url: 'myFile'
    };
    fixture.detectChanges();

    expect(imageEl).toBeFalsy();
  });

  it('should pass accessibility', async(() => {
  fixture.detectChanges();
  fixture.whenStable().then(() => {
    expect(fixture.nativeElement).toBeAccessible();
  });
}));
});
