import {
  TestBed,
  ComponentFixture,
  async
} from '@angular/core/testing';

import {
  Component
} from '@angular/core';

import {
  By
} from '@angular/platform-browser';

import {
  expect,
  SkyAppTestUtility
} from '@skyux-sdk/testing';

import {
  SkyFileAttachmentsModule
} from './file-attachments.module';

import {
  SkyFileDropComponent
} from './file-drop.component';

import {
  SkyFileLink
} from './file-link';

import {
  SkyFileDropChange
} from './types/file-drop-change';
import { FileDropTestHelper } from './fixtures/file-drop-test-helper';

describe('File drop component', () => {

  /** Simple test component with tabIndex */
  @Component({
    template: `
      <sky-file-drop>
        <div class="sky-custom-drop"></div>
      </sky-file-drop>`
  })
  class FileDropContentComponent { }

  let fixture: ComponentFixture<SkyFileDropComponent>;
  let el: any;
  let componentInstance: SkyFileDropComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyFileAttachmentsModule
      ],
      declarations: [
        FileDropContentComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkyFileDropComponent);
    el = fixture.nativeElement;
    componentInstance = fixture.componentInstance;
  });

  it('should create the file drop control', () => {

    fixture.detectChanges();

    let dropEl = FileDropTestHelper.getDropEl(el);

    expect(dropEl).toBeTruthy();
    FileDropTestHelper.validateDropClasses(false, false, dropEl);

    let inputEl = FileDropTestHelper.getInputDebugEl(fixture);
    expect((<any>inputEl.references).fileInput).toBeTruthy();
  });

  it('should click the file input on file drop click', () => {
    FileDropTestHelper.testClick(true, fixture);
  });

  it('should prevent click when noclick is specified', () => {
    componentInstance.noClick = true;
    fixture.detectChanges();
    FileDropTestHelper.testClick(false, fixture);
  });

  it('should load and emit files on file change event', () => {
    let filesChangedActual: SkyFileDropChange;

    componentInstance.filesChanged.subscribe(
      (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged );

    FileDropTestHelper.setupStandardFileChangeEvent(fixture);

    expect(filesChangedActual.files.length).toBe(2);
    expect(filesChangedActual.files[0].url).toBe('url');
    expect(filesChangedActual.files[0].file.name).toBe('foo.txt');
    expect(filesChangedActual.files[0].file.size).toBe(1000);

    expect(filesChangedActual.files[1].url).toBe('newurl');
    expect(filesChangedActual.files[1].file.name).toBe('woo.txt');
    expect(filesChangedActual.files[1].file.size).toBe(2000);
  });

  it('should load and emit files on file change event when file reader has an error and aborts',
  () => {
    let filesChangedActual: SkyFileDropChange;

    componentInstance.filesChanged.subscribe(
      (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged );

    let fileReaderSpy = FileDropTestHelper.setupFileReaderSpy();

    FileDropTestHelper.triggerChangeEvent([
      {
        name: 'foo.txt',
        size: 1000
      },
      {
        name: 'woo.txt',
        size: 2000
      },
      {
        name: 'goo.txt',
        size: 3000
      }
    ], fixture);

    fixture.detectChanges();

    fileReaderSpy.abortCallbacks[0]();

    fileReaderSpy.loadCallbacks[1]({
      target: {
        result: 'anotherurl'
      }
    });

    fileReaderSpy.errorCallbacks[2]();

    fixture.detectChanges();

    expect(filesChangedActual.files.length).toBe(1);
    expect(filesChangedActual.files[0].url).toBe('anotherurl');
    expect(filesChangedActual.files[0].file.name).toBe('woo.txt');
    expect(filesChangedActual.files[0].file.size).toBe(2000);

    expect(filesChangedActual.rejectedFiles.length).toBe(2);

    expect(filesChangedActual.rejectedFiles[0].file.name).toBe('foo.txt');
    expect(filesChangedActual.rejectedFiles[0].file.size).toBe(1000);

    expect(filesChangedActual.rejectedFiles[1].file.name).toBe('goo.txt');
    expect(filesChangedActual.rejectedFiles[1].file.size).toBe(3000);
  });

  it('should allow the user to specify to not allow multiple files', () => {
    componentInstance.multiple = false;
    fixture.detectChanges();
    let inputEl = FileDropTestHelper.getInputDebugEl(fixture);

    expect(inputEl.nativeElement.hasAttribute('multiple')).toBe(false);

    componentInstance.multiple = true;
    fixture.detectChanges();
    expect(inputEl.nativeElement.hasAttribute('multiple')).toBe(true);
  });

  it('should set accepted types on the file input html', () => {
    componentInstance.acceptedTypes = 'image/png';
    fixture.detectChanges();
    let inputEl = FileDropTestHelper.getInputDebugEl(fixture);

    expect(inputEl.nativeElement.getAttribute('accept')).toBe('image/png');

  });

  it('should allow the user to specify a min file size', () => {
    let filesChangedActual: SkyFileDropChange;

    componentInstance.filesChanged.subscribe(
      (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged );

    componentInstance.minFileSize = 1500;
    fixture.detectChanges();

    FileDropTestHelper.setupStandardFileChangeEvent(fixture);

    expect(filesChangedActual.rejectedFiles.length).toBe(1);
    expect(filesChangedActual.rejectedFiles[0].file.name).toBe('foo.txt');
    expect(filesChangedActual.rejectedFiles[0].file.size).toBe(1000);
    expect(filesChangedActual.rejectedFiles[0].errorType).toBe('minFileSize');
    expect(filesChangedActual.rejectedFiles[0].errorParam).toBe('1500');

    expect(filesChangedActual.files.length).toBe(1);
    expect(filesChangedActual.files[0].url).toBe('url');
    expect(filesChangedActual.files[0].file.name).toBe('woo.txt');
    expect(filesChangedActual.files[0].file.size).toBe(2000);
  });

  it('should allow the user to specify a max file size', () => {
    let filesChangedActual: SkyFileDropChange;

    componentInstance.filesChanged.subscribe(
      (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged );

    componentInstance.maxFileSize = 1500;
    fixture.detectChanges();

    FileDropTestHelper.setupStandardFileChangeEvent(fixture);

    expect(filesChangedActual.rejectedFiles.length).toBe(1);
    expect(filesChangedActual.rejectedFiles[0].file.name).toBe('woo.txt');
    expect(filesChangedActual.rejectedFiles[0].file.size).toBe(2000);
    expect(filesChangedActual.rejectedFiles[0].errorType).toBe('maxFileSize');
    expect(filesChangedActual.rejectedFiles[0].errorParam).toBe('1500');

    expect(filesChangedActual.files.length).toBe(1);
    expect(filesChangedActual.files[0].url).toBe('url');
    expect(filesChangedActual.files[0].file.name).toBe('foo.txt');
    expect(filesChangedActual.files[0].file.size).toBe(1000);
  });

  it('should allow the user to specify a validation function', () => {
    let filesChangedActual: SkyFileDropChange;

    componentInstance.filesChanged.subscribe(
      (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged );

    let errorMessage = 'You may not upload a file that begins with the letter "w."';

    componentInstance.validateFn = function(file: any) {
      if (file.file.name.indexOf('w') === 0) {
        return errorMessage;
      }
    };

    fixture.detectChanges();

    FileDropTestHelper.setupStandardFileChangeEvent(fixture);

    expect(filesChangedActual.rejectedFiles.length).toBe(1);
    expect(filesChangedActual.rejectedFiles[0].file.name).toBe('woo.txt');
    expect(filesChangedActual.rejectedFiles[0].file.size).toBe(2000);
    expect(filesChangedActual.rejectedFiles[0].errorType).toBe('validate');
    expect(filesChangedActual.rejectedFiles[0].errorParam).toBe(errorMessage);

    expect(filesChangedActual.files.length).toBe(1);
    expect(filesChangedActual.files[0].url).toBe('url');
    expect(filesChangedActual.files[0].file.name).toBe('foo.txt');
    expect(filesChangedActual.files[0].file.size).toBe(1000);
  });

  it('should allow the user to specify accepted types', () => {
    let filesChangedActual: SkyFileDropChange;

    componentInstance.filesChanged.subscribe(
      (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged );

    componentInstance.acceptedTypes = 'image/png,image/tiff';

    fixture.detectChanges();

    FileDropTestHelper.setupStandardFileChangeEvent(fixture);

    expect(filesChangedActual.rejectedFiles.length).toBe(1);
    expect(filesChangedActual.rejectedFiles[0].file.name).toBe('woo.txt');
    expect(filesChangedActual.rejectedFiles[0].file.size).toBe(2000);
    expect(filesChangedActual.rejectedFiles[0].errorType).toBe('fileType');
    expect(filesChangedActual.rejectedFiles[0].errorParam).toBe(componentInstance.acceptedTypes);

    expect(filesChangedActual.files.length).toBe(1);
    expect(filesChangedActual.files[0].url).toBe('url');
    expect(filesChangedActual.files[0].file.name).toBe('foo.txt');
    expect(filesChangedActual.files[0].file.size).toBe(1000);
  });

  it('should reject a file with no type when accepted types are defined', () => {
    let filesChangedActual: SkyFileDropChange;

    componentInstance.filesChanged.subscribe(
      (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged );

    componentInstance.acceptedTypes = 'image/png,image/tiff';

    fixture.detectChanges();

    let files = [
      {
        name: 'foo.txt',
        size: 1000
      },
      {
        name: 'woo.txt',
        size: 2000,
        type: 'image/jpeg'
      }
    ];

    FileDropTestHelper.setupStandardFileChangeEvent(fixture, files);

    expect(filesChangedActual.rejectedFiles.length).toBe(2);
    expect(filesChangedActual.rejectedFiles[1].file.name).toBe('woo.txt');
    expect(filesChangedActual.rejectedFiles[1].file.size).toBe(2000);
    expect(filesChangedActual.rejectedFiles[1].errorType).toBe('fileType');
    expect(filesChangedActual.rejectedFiles[1].errorParam).toBe(componentInstance.acceptedTypes);

    expect(filesChangedActual.rejectedFiles[0].file.name).toBe('foo.txt');
    expect(filesChangedActual.rejectedFiles[0].file.size).toBe(1000);
    expect(filesChangedActual.rejectedFiles[0].errorType).toBe('fileType');
    expect(filesChangedActual.rejectedFiles[0].errorParam).toBe(componentInstance.acceptedTypes);

  });

  it('should allow the user to specify accepted type with wildcards', () => {
    let filesChangedActual: SkyFileDropChange;

    componentInstance.filesChanged.subscribe(
      (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged );

    componentInstance.acceptedTypes = 'application/*,image/*';

    fixture.detectChanges();

    FileDropTestHelper.setupStandardFileChangeEvent(fixture);

    expect(filesChangedActual.rejectedFiles.length).toBe(0);

    expect(filesChangedActual.files.length).toBe(2);
    expect(filesChangedActual.files[0].url).toBe('url');
    expect(filesChangedActual.files[0].file.name).toBe('foo.txt');
    expect(filesChangedActual.files[0].file.size).toBe(1000);
    expect(filesChangedActual.files[1].url).toBe('newurl');
    expect(filesChangedActual.files[1].file.name).toBe('woo.txt');
    expect(filesChangedActual.files[1].file.size).toBe(2000);
  });

  it('should load files and set classes on drag and drop', () => {
    let filesChangedActual: SkyFileDropChange;

    componentInstance.filesChanged.subscribe(
      (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged );

    let fileReaderSpy = FileDropTestHelper.setupFileReaderSpy();

    componentInstance.acceptedTypes = 'image/png, image/tiff';

    fixture.detectChanges();

    let dropDebugEl = FileDropTestHelper.getDropDebugEl(fixture);

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

    FileDropTestHelper.triggerDragEnter('sky-drop', dropDebugEl, fixture);
    FileDropTestHelper.triggerDragOver(files, dropDebugEl, fixture);
    let dropElWrapper = FileDropTestHelper.getDropElWrapper(el);

    FileDropTestHelper.validateDropClasses(true, false, dropElWrapper);

    FileDropTestHelper.triggerDrop(files, dropDebugEl, fixture);

    FileDropTestHelper.validateDropClasses(false, false, dropElWrapper);

    fileReaderSpy.loadCallbacks[0]({
      target: {
        result: 'url'
      }
    });

    fixture.detectChanges();

    expect(filesChangedActual.rejectedFiles.length).toBe(0);
    expect(filesChangedActual.files.length).toBe(1);
    expect(filesChangedActual.files[0].url).toBe('url');
    expect(filesChangedActual.files[0].file.name).toBe('foo.txt');
    expect(filesChangedActual.files[0].file.size).toBe(1000);

    // Verify reject classes when appropriate
    FileDropTestHelper.triggerDragEnter('sky-drop', dropDebugEl, fixture);
    FileDropTestHelper.triggerDragOver(invalidFiles, dropDebugEl, fixture);
    FileDropTestHelper.validateDropClasses(false, true, dropElWrapper);
    FileDropTestHelper.triggerDragLeave('something', dropDebugEl, fixture);
    FileDropTestHelper.validateDropClasses(false, true, dropElWrapper);
    FileDropTestHelper.triggerDragLeave('sky-drop', dropDebugEl, fixture);
    FileDropTestHelper.validateDropClasses(false, false, dropElWrapper);

    // Verify empty file array
    FileDropTestHelper.triggerDragEnter('sky-drop', dropDebugEl, fixture);
    FileDropTestHelper.triggerDragOver([], dropDebugEl, fixture);
    FileDropTestHelper.validateDropClasses(false, false, dropElWrapper);

    let emptyEvent = {
      stopPropagation: function () {},
      preventDefault: function () {}
    };

    // Verify no dataTransfer drag
    dropDebugEl.triggerEventHandler('dragover', emptyEvent);
    fixture.detectChanges();
    FileDropTestHelper.validateDropClasses(false, false, dropElWrapper);

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

    componentInstance.acceptedTypes = 'image/png, image/tiff';

    fixture.detectChanges();

    let dropDebugEl = FileDropTestHelper.getDropDebugEl(fixture);

    let invalidFiles = [
      {
        name: 'foo.txt',
        size: 1000,
        type: 'image/jpeg'
      }
    ];

    let dropElWrapper = FileDropTestHelper.getDropElWrapper(el);

    FileDropTestHelper.triggerDragEnter('sky-drop', dropDebugEl, fixture);
    FileDropTestHelper.triggerDragOver(undefined, dropDebugEl, fixture);
    FileDropTestHelper.validateDropClasses(true, false, dropElWrapper);

    FileDropTestHelper.triggerDrop(invalidFiles, dropDebugEl, fixture);
    FileDropTestHelper.validateDropClasses(false, false, dropElWrapper);
  });

  it('should allow loading multiple files on drag and drop when multiple is true', () => {
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

    let fileReaderSpy = FileDropTestHelper.setupFileReaderSpy();

    componentInstance.multiple = true;
    fixture.detectChanges();

    let dropDebugEl = FileDropTestHelper.getDropDebugEl(fixture);

    FileDropTestHelper.triggerDragEnter('sky-drop', dropDebugEl, fixture);
    FileDropTestHelper.triggerDragOver(files, dropDebugEl, fixture);
    FileDropTestHelper.triggerDrop(files, dropDebugEl, fixture);
    expect(fileReaderSpy.loadCallbacks.length).toBe(2);
  });

  it('should prevent loading multiple files on drag and drop when multiple is false', () => {
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

    let fileReaderSpy = FileDropTestHelper.setupFileReaderSpy();

    componentInstance.multiple = false;
    fixture.detectChanges();

    let dropDebugEl = FileDropTestHelper.getDropDebugEl(fixture);

    FileDropTestHelper.triggerDragEnter('sky-drop', dropDebugEl, fixture);
    FileDropTestHelper.triggerDragOver(files, dropDebugEl, fixture);
    FileDropTestHelper.triggerDrop(files, dropDebugEl, fixture);
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

    let fileReaderSpy = FileDropTestHelper.setupFileReaderSpy();
    fixture.detectChanges();

    let dropDebugEl = FileDropTestHelper.getDropDebugEl(fixture);

    FileDropTestHelper.triggerDragEnter('sky-drop', dropDebugEl, fixture);
    FileDropTestHelper.triggerDragOver(files, dropDebugEl, fixture);
    FileDropTestHelper.triggerDrop(files, dropDebugEl, fixture);
    expect(fileReaderSpy.loadCallbacks.length).toBe(0);
  });

  it('should show link section when allowLinks is true', () => {
    componentInstance.allowLinks = true;
    fixture.detectChanges();

    let linkInput = FileDropTestHelper.getLinkInput(fixture);

    expect(linkInput).toBeTruthy();
  });

  it('should emit link event when link is added on click', () => {
    let fileLinkActual: SkyFileLink;

    componentInstance.linkChanged.subscribe(
      (newLink: SkyFileLink) => fileLinkActual = newLink );

    componentInstance.allowLinks = true;
    fixture.detectChanges();

    let linkInput = FileDropTestHelper.getLinkInput(fixture);

    FileDropTestHelper.triggerInputChange('link.com', linkInput, fixture);

    let linkButton = FileDropTestHelper.getLinkButton(fixture);
    linkButton.nativeElement.click();
    fixture.detectChanges();

    expect(fileLinkActual.url).toBe('link.com');
  });

  it('should emit link event when link is added on enter press', () => {
    let fileLinkActual: SkyFileLink;

    componentInstance.linkChanged.subscribe(
      (newLink: SkyFileLink) => fileLinkActual = newLink );

    componentInstance.allowLinks = true;
    fixture.detectChanges();

    let linkInput = FileDropTestHelper.getLinkInput(fixture);

    FileDropTestHelper.triggerInputChange('link.com', linkInput, fixture);

    SkyAppTestUtility.fireDomEvent(linkInput.nativeElement, 'keyup', {
      keyboardEventInit: {
        key: ' '
      },
      customEventInit: {
        preventDefault: function () { }
      }
    });
    fixture.detectChanges();

    expect(fileLinkActual).toBeFalsy();

    SkyAppTestUtility.fireDomEvent(linkInput.nativeElement, 'keyup', {
      keyboardEventInit: {
        key: 'Enter'
      },
      customEventInit: {
        preventDefault: function () { }
      }
    });
    fixture.detectChanges();

    expect(fileLinkActual.url).toBe('link.com');
  });

  it('should allow custom content inside of the file drop component', () => {
    let contentFixture = TestBed.createComponent(FileDropContentComponent);

    contentFixture.detectChanges();

    expect(contentFixture.debugElement.query(By.css('.sky-file-drop-contents'))).toBeFalsy();
    expect(contentFixture.debugElement.query(
      By.css('.sky-file-drop-contents-custom .sky-custom-drop'))).toBeTruthy();
  });

  it('Should specify type="button" on all button elements.', () => {
    fixture.detectChanges();
    expect(el.querySelectorAll('button:not([type])').length).toBe(0);
    expect(el.querySelectorAll('button[type="submit"]').length).toBe(0);
    expect(el.querySelectorAll('button[type="button"]').length).toBe(1);
  });

  it('should pass accessibility', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement).toBeAccessible();
    });
  }));
});
