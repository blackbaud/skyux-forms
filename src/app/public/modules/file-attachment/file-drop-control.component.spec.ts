import {
  TestBed,
  ComponentFixture,
  async,
  fakeAsync,
  tick
} from '@angular/core/testing';

import {
  By
} from '@angular/platform-browser';

import {
  expect,
  SkyAppTestUtility
} from '@skyux-sdk/testing';

import {
  SkyFileDropControlComponent
} from './file-drop-control.component';

import {
  SkyFileItem
} from './file-item';

import {
  SkyFileLink
} from './file-link';

import {
  FileDropControlTestModule
} from './fixtures/file-drop-control.module.fixture';

import {
  FileDropControlTestComponent
} from './fixtures/file-drop-control.compoennt.fixture';

import {
  FileDropControlNoFormTestComponent
} from './fixtures/file-drop-control-no-form.component.fixture';

import {
  FileDropControlTemplateTestComponent
} from './fixtures/file-drop-control-template.component.fixture';

import {
  FileDropTestHelper
} from './fixtures/file-drop-test-helper';

import {
  SkyFileDropChange
} from './types/file-drop-change';

describe('File drop control component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FileDropControlTestModule
      ]
    });
  });

  /**
   * NOTE: Most tests are the same as the file drop on 4/1/2020.
   * This is to ensure the wrapper does not break existing functionality.
   * Extra testing has been added to ensure that form controls work correctly
   */

  describe('reactive forms', () => {

    let fixture: ComponentFixture<FileDropControlTestComponent>;
    let el: HTMLElement;
    let componentInstance: FileDropControlTestComponent;
    let fileDropControl: SkyFileDropControlComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(FileDropControlTestComponent);
      el = fixture.nativeElement;
      componentInstance = fixture.componentInstance;
      fileDropControl = componentInstance.fileAttachmentComponent;
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
      fileDropControl.noClick = true;
      fixture.detectChanges();
      FileDropTestHelper.testClick(false, fixture);
    });

    it('should load and emit files on file change event', fakeAsync(() => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => {
          filesChangedActual = filesChanged;
        });

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const fileReaderSpyFunction = FileDropTestHelper.setupStandardFileChangeEvent(fixture);

      expect(filesChangedActual.files.length).toBe(2);
      expect(filesChangedActual.files[0].url).toBe('url');
      expect(filesChangedActual.files[0].file.name).toBe('foo.txt');
      expect(filesChangedActual.files[0].file.size).toBe(1000);

      expect(filesChangedActual.files[1].url).toBe('newurl');
      expect(filesChangedActual.files[1].file.name).toBe('woo.txt');
      expect(filesChangedActual.files[1].file.size).toBe(2000);

      expect(componentInstance.attachment.value).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          },
          {
            file: {
              name: 'woo.txt',
              size: 2000,
              type: 'image/jpeg'
            },
            url: 'newurl'
          }
        ],
        links: undefined
      });

      FileDropTestHelper.setupSecondaryFileChangeEvent(fixture, fileReaderSpyFunction);

      expect(filesChangedActual.files.length).toBe(1);
      expect(filesChangedActual.files[0].url).toBe('thirdurl');
      expect(filesChangedActual.files[0].file.name).toBe('moo.txt');
      expect(filesChangedActual.files[0].file.size).toBe(3000);

      expect(componentInstance.attachment.value).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          },
          {
            file: {
              name: 'woo.txt',
              size: 2000,
              type: 'image/jpeg'
            },
            url: 'newurl'
          },
          {
            file: {
              name: 'moo.txt',
              size: 3000,
              type: 'image/png'
            },
            url: 'thirdurl'
          }
        ],
        links: undefined
      });
    }));

    it('should delete files correctly', fakeAsync(() => {
      let filesChangedActual: SkyFileDropChange;
      let fileDeletedActual: SkyFileItem;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);
      fileDropControl.fileDeleted.subscribe(
        (fileDeleted: SkyFileItem) => fileDeletedActual = fileDeleted);

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      FileDropTestHelper.setupStandardFileChangeEvent(fixture);

      expect(filesChangedActual.files.length).toBe(2);
      expect(filesChangedActual.files[0].url).toBe('url');
      expect(filesChangedActual.files[0].file.name).toBe('foo.txt');
      expect(filesChangedActual.files[0].file.size).toBe(1000);

      expect(filesChangedActual.files[1].url).toBe('newurl');
      expect(filesChangedActual.files[1].file.name).toBe('woo.txt');
      expect(filesChangedActual.files[1].file.size).toBe(2000);

      expect(componentInstance.attachment.value).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          },
          {
            file: {
              name: 'woo.txt',
              size: 2000,
              type: 'image/jpeg'
            },
            url: 'newurl'
          }
        ],
        links: undefined
      });

      let deleteButton = FileDropTestHelper.getDeleteButtons(fixture)[0];
      deleteButton.nativeElement.click();
      fixture.detectChanges();

      expect(fileDeletedActual).toEqual({
        file: {
          name: 'foo.txt',
          size: 1000,
          type: 'image/png'
        },
        url: 'url'
      });

      expect(componentInstance.attachment.value).toEqual({
        files: [
          {
            file: {
              name: 'woo.txt',
              size: 2000,
              type: 'image/jpeg'
            },
            url: 'newurl'
          }
        ],
        links: undefined
      });
    }));

    it('should load and emit files on file change event when file reader has an error and aborts',
      () => {
        let filesChangedActual: SkyFileDropChange;

        fileDropControl.filesUploaded.subscribe(
          (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

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

        expect(componentInstance.attachment.value).toEqual({
          files: [
            {
              file: {
                name: 'woo.txt',
                size: 2000
              },
              url: 'anotherurl'
            }
          ],
          links: undefined
        });
      });

    it('should allow the user to specify to not allow multiple files', () => {
      fileDropControl.multiple = false;
      fixture.detectChanges();
      let inputEl = FileDropTestHelper.getInputDebugEl(fixture);

      expect(inputEl.nativeElement.hasAttribute('multiple')).toBe(false);

      fileDropControl.multiple = true;
      fixture.detectChanges();
      expect(inputEl.nativeElement.hasAttribute('multiple')).toBe(true);
    });

    it('should set accepted types on the file input html', () => {
      fileDropControl.acceptedTypes = 'image/png';
      fixture.detectChanges();
      let inputEl = FileDropTestHelper.getInputDebugEl(fixture);

      expect(inputEl.nativeElement.getAttribute('accept')).toBe('image/png');

    });

    it('should allow the user to specify a min file size', () => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

      fileDropControl.minFileSize = 1500;
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

      expect(componentInstance.attachment.value).toEqual({
        files: [
          {
            file: {
              name: 'woo.txt',
              size: 2000,
              type: 'image/jpeg'
            },
            url: 'url'
          }
        ],
        links: undefined
      });
    });

    it('should allow the user to specify a max file size', () => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

      fileDropControl.maxFileSize = 1500;
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

      expect(componentInstance.attachment.value).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          }
        ],
        links: undefined
      });
    });

    it('should allow the user to specify a validation function', () => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

      let errorMessage = 'You may not upload a file that begins with the letter "w."';

      fileDropControl.validateFn = function (file: any) {
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

      expect(componentInstance.attachment.value).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          }
        ],
        links: undefined
      });
    });

    it('should allow the user to specify accepted types', () => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

      fileDropControl.acceptedTypes = 'image/png,image/tiff';

      fixture.detectChanges();

      FileDropTestHelper.setupStandardFileChangeEvent(fixture);

      expect(filesChangedActual.rejectedFiles.length).toBe(1);
      expect(filesChangedActual.rejectedFiles[0].file.name).toBe('woo.txt');
      expect(filesChangedActual.rejectedFiles[0].file.size).toBe(2000);
      expect(filesChangedActual.rejectedFiles[0].errorType).toBe('fileType');
      expect(filesChangedActual.rejectedFiles[0].errorParam).toBe(fileDropControl.acceptedTypes);

      expect(filesChangedActual.files.length).toBe(1);
      expect(filesChangedActual.files[0].url).toBe('url');
      expect(filesChangedActual.files[0].file.name).toBe('foo.txt');
      expect(filesChangedActual.files[0].file.size).toBe(1000);

      expect(componentInstance.attachment.value).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          }
        ],
        links: undefined
      });
    });

    it('should reject a file with no type when accepted types are defined', () => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

      fileDropControl.acceptedTypes = 'image/png,image/tiff';

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
      expect(filesChangedActual.rejectedFiles[1].errorParam).toBe(fileDropControl.acceptedTypes);

      expect(filesChangedActual.rejectedFiles[0].file.name).toBe('foo.txt');
      expect(filesChangedActual.rejectedFiles[0].file.size).toBe(1000);
      expect(filesChangedActual.rejectedFiles[0].errorType).toBe('fileType');
      expect(filesChangedActual.rejectedFiles[0].errorParam).toBe(fileDropControl.acceptedTypes);

      expect(componentInstance.attachment.value).toEqual(undefined);

    });

    it('should allow the user to specify accepted type with wildcards', () => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

      fileDropControl.acceptedTypes = 'application/*,image/*';

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

      expect(componentInstance.attachment.value).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          },
          {
            file: {
              name: 'woo.txt',
              size: 2000,
              type: 'image/jpeg'
            },
            url: 'newurl'
          }
        ],
        links: undefined
      });
    });

    it('should load files and set classes on drag and drop', () => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

      let fileReaderSpy = FileDropTestHelper.setupFileReaderSpy();

      fileDropControl.acceptedTypes = 'image/png, image/tiff';

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

      expect(componentInstance.attachment.value).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          }
        ],
        links: undefined
      });

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
        stopPropagation: function () { },
        preventDefault: function () { }
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

      expect(componentInstance.attachment.value).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          }
        ],
        links: undefined
      });

    });

    it([
      'should accept a file of rejected type on drag (but not on drop)',
      'if the browser does not support dataTransfer.items'
    ].join(' '), () => {

      fileDropControl.acceptedTypes = 'image/png, image/tiff';

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

      fileDropControl.multiple = true;
      fixture.detectChanges();

      let dropDebugEl = FileDropTestHelper.getDropDebugEl(fixture);

      FileDropTestHelper.triggerDragEnter('sky-drop', dropDebugEl, fixture);
      FileDropTestHelper.triggerDragOver(files, dropDebugEl, fixture);
      FileDropTestHelper.triggerDrop(files, dropDebugEl, fixture);
      expect(fileReaderSpy.loadCallbacks.length).toBe(2);

      fileReaderSpy.loadCallbacks[0]({
        target: {
          result: 'url'
        }
      });
      fileReaderSpy.loadCallbacks[1]({
        target: {
          result: 'anotherUrl'
        }
      });

      fixture.detectChanges();

      expect(componentInstance.attachment.value).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          },
          {
            file: {
              name: 'goo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'anotherUrl'
          }
        ],
        links: undefined
      });
    });

    it('should delete a file correctly after multiple files are uploaded', fakeAsync(() => {
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

      fileDropControl.multiple = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      let dropDebugEl = FileDropTestHelper.getDropDebugEl(fixture);

      FileDropTestHelper.triggerDragEnter('sky-drop', dropDebugEl, fixture);
      FileDropTestHelper.triggerDragOver(files, dropDebugEl, fixture);
      FileDropTestHelper.triggerDrop(files, dropDebugEl, fixture);
      expect(fileReaderSpy.loadCallbacks.length).toBe(2);

      fileReaderSpy.loadCallbacks[0]({
        target: {
          result: 'url'
        }
      });
      fileReaderSpy.loadCallbacks[1]({
        target: {
          result: 'anotherUrl'
        }
      });

      fixture.detectChanges();

      expect(componentInstance.attachment.value).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          },
          {
            file: {
              name: 'goo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'anotherUrl'
          }
        ],
        links: undefined
      });

      let fileDeleteActual: SkyFileLink;

      fileDropControl.fileDeleted.subscribe(
        (newLink: SkyFileLink) => fileDeleteActual = newLink);

      let deleteButton = FileDropTestHelper.getDeleteButtons(fixture)[1];
      deleteButton.nativeElement.click();
      fixture.detectChanges();

      expect(fileDeleteActual).toEqual({
        file: {
          name: 'goo.txt',
          size: 1000,
          type: 'image/png'
        },
        url: 'anotherUrl'
      });

      expect(componentInstance.attachment.value).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          }
        ],
        links: undefined
      });
    }));

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

      fileDropControl.multiple = false;
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
      fileDropControl.allowLinks = true;
      fixture.detectChanges();

      let linkInput = FileDropTestHelper.getLinkInput(fixture);

      expect(linkInput).toBeTruthy();
    });

    it('should emit link event when link is added on click', () => {
      let fileLinkActual: SkyFileLink;

      fileDropControl.linkAdded.subscribe(
        (newLink: SkyFileLink) => fileLinkActual = newLink);

      fileDropControl.allowLinks = true;
      fixture.detectChanges();

      let linkInput = FileDropTestHelper.getLinkInput(fixture);

      FileDropTestHelper.triggerInputChange('link.com', linkInput, fixture);

      let linkButton = FileDropTestHelper.getLinkButton(fixture);
      linkButton.nativeElement.click();
      fixture.detectChanges();

      expect(fileLinkActual.url).toBe('link.com');

      expect(componentInstance.attachment.value).toEqual({
        files: undefined,
        links: [
          {
            url: 'link.com'
          }
        ]
      });

      FileDropTestHelper.triggerInputChange('anotherlink.com', linkInput, fixture);

      linkButton.nativeElement.click();
      fixture.detectChanges();

      expect(fileLinkActual.url).toBe('anotherlink.com');

      expect(componentInstance.attachment.value).toEqual({
        files: undefined,
        links: [
          {
            url: 'link.com'
          },
          {
            url: 'anotherlink.com'
          }
        ]
      });
    });

    it('should emit link event when link is added on enter press', () => {
      let fileLinkActual: SkyFileLink;

      fileDropControl.linkAdded.subscribe(
        (newLink: SkyFileLink) => fileLinkActual = newLink);

      fileDropControl.allowLinks = true;
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

      expect(componentInstance.attachment.value).toBeFalsy();

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

      expect(componentInstance.attachment.value).toEqual({
        files: undefined,
        links: [
          {
            url: 'link.com'
          }
        ]
      });
    });

    it('should emit link event when link is added on click', () => {
      let fileLinkActual: SkyFileLink;

      fileDropControl.linkAdded.subscribe(
        (newLink: SkyFileLink) => fileLinkActual = newLink);

      fileDropControl.allowLinks = true;
      fixture.detectChanges();

      let linkInput = FileDropTestHelper.getLinkInput(fixture);

      FileDropTestHelper.triggerInputChange('link.com', linkInput, fixture);

      let linkButton = FileDropTestHelper.getLinkButton(fixture);
      linkButton.nativeElement.click();
      fixture.detectChanges();

      expect(fileLinkActual.url).toBe('link.com');

      expect(componentInstance.attachment.value).toEqual({
        files: undefined,
        links: [
          {
            url: 'link.com'
          }
        ]
      });
    });

    it('should emit link delete event when link is deleted', () => {
      let fileLinkActual: SkyFileLink;

      fileDropControl.linkAdded.subscribe(
        (newLink: SkyFileLink) => fileLinkActual = newLink);

      fileDropControl.linkDeleted.subscribe(
        (newLink: SkyFileLink) => fileLinkActual = newLink);

      fileDropControl.allowLinks = true;
      fixture.detectChanges();

      let linkInput = FileDropTestHelper.getLinkInput(fixture);

      FileDropTestHelper.triggerInputChange('link.com', linkInput, fixture);

      let linkButton = FileDropTestHelper.getLinkButton(fixture);
      linkButton.nativeElement.click();
      fixture.detectChanges();

      expect(fileLinkActual.url).toBe('link.com');

      expect(componentInstance.attachment.value).toEqual({
        files: undefined,
        links: [
          {
            url: 'link.com'
          }
        ]
      });

      fileLinkActual = undefined;

      let deleteButton = FileDropTestHelper.getDeleteButtons(fixture)[0];
      deleteButton.nativeElement.click();
      fixture.detectChanges();

      expect(fileLinkActual.url).toBe('link.com');

      expect(componentInstance.attachment.value).toBeFalsy();
    });

    it('should allow custom content inside of the file drop component', () => {
      componentInstance.showCustomContent = true;

      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.sky-file-drop-contents'))).toBeFalsy();
      expect(fixture.debugElement.query(
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

  describe('template forms', () => {

    let fixture: ComponentFixture<FileDropControlTemplateTestComponent>;
    let el: HTMLElement;
    let componentInstance: FileDropControlTemplateTestComponent;
    let fileDropControl: SkyFileDropControlComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(FileDropControlTemplateTestComponent);
      el = fixture.nativeElement;
      componentInstance = fixture.componentInstance;
      fileDropControl = componentInstance.fileAttachmentComponent;
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
      fileDropControl.noClick = true;
      fixture.detectChanges();
      FileDropTestHelper.testClick(false, fixture);
    });

    it('should load and emit files on file change event', fakeAsync(() => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => {
          filesChangedActual = filesChanged;
        });

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const fileReaderSpyFunction = FileDropTestHelper.setupStandardFileChangeEvent(fixture);

      expect(filesChangedActual.files.length).toBe(2);
      expect(filesChangedActual.files[0].url).toBe('url');
      expect(filesChangedActual.files[0].file.name).toBe('foo.txt');
      expect(filesChangedActual.files[0].file.size).toBe(1000);

      expect(filesChangedActual.files[1].url).toBe('newurl');
      expect(filesChangedActual.files[1].file.name).toBe('woo.txt');
      expect(filesChangedActual.files[1].file.size).toBe(2000);

      expect(componentInstance.attachment).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          },
          {
            file: {
              name: 'woo.txt',
              size: 2000,
              type: 'image/jpeg'
            },
            url: 'newurl'
          }
        ],
        links: undefined
      });

      FileDropTestHelper.setupSecondaryFileChangeEvent(fixture, fileReaderSpyFunction);

      expect(filesChangedActual.files.length).toBe(1);
      expect(filesChangedActual.files[0].url).toBe('thirdurl');
      expect(filesChangedActual.files[0].file.name).toBe('moo.txt');
      expect(filesChangedActual.files[0].file.size).toBe(3000);

      expect(componentInstance.attachment).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          },
          {
            file: {
              name: 'woo.txt',
              size: 2000,
              type: 'image/jpeg'
            },
            url: 'newurl'
          },
          {
            file: {
              name: 'moo.txt',
              size: 3000,
              type: 'image/png'
            },
            url: 'thirdurl'
          }
        ],
        links: undefined
      });
    }));

    it('should delete files correctly', fakeAsync(() => {
      let filesChangedActual: SkyFileDropChange;
      let fileDeletedActual: SkyFileItem;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);
      fileDropControl.fileDeleted.subscribe(
        (fileDeleted: SkyFileItem) => fileDeletedActual = fileDeleted);

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      FileDropTestHelper.setupStandardFileChangeEvent(fixture);

      expect(filesChangedActual.files.length).toBe(2);
      expect(filesChangedActual.files[0].url).toBe('url');
      expect(filesChangedActual.files[0].file.name).toBe('foo.txt');
      expect(filesChangedActual.files[0].file.size).toBe(1000);

      expect(filesChangedActual.files[1].url).toBe('newurl');
      expect(filesChangedActual.files[1].file.name).toBe('woo.txt');
      expect(filesChangedActual.files[1].file.size).toBe(2000);

      expect(componentInstance.attachment).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          },
          {
            file: {
              name: 'woo.txt',
              size: 2000,
              type: 'image/jpeg'
            },
            url: 'newurl'
          }
        ],
        links: undefined
      });

      let deleteButton = FileDropTestHelper.getDeleteButtons(fixture)[0];
      deleteButton.nativeElement.click();
      fixture.detectChanges();

      expect(fileDeletedActual).toEqual({
        file: {
          name: 'foo.txt',
          size: 1000,
          type: 'image/png'
        },
        url: 'url'
      });

      expect(componentInstance.attachment).toEqual({
        files: [
          {
            file: {
              name: 'woo.txt',
              size: 2000,
              type: 'image/jpeg'
            },
            url: 'newurl'
          }
        ],
        links: undefined
      });
    }));

    it('should load and emit files on file change event when file reader has an error and aborts',
      fakeAsync(() => {
        let filesChangedActual: SkyFileDropChange;

        fileDropControl.filesUploaded.subscribe(
          (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

        fixture.detectChanges();
        tick();
        fixture.detectChanges();

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

        expect(componentInstance.attachment).toEqual({
          files: [
            {
              file: {
                name: 'woo.txt',
                size: 2000
              },
              url: 'anotherurl'
            }
          ],
          links: undefined
        });
      }));

    it('should allow the user to specify to not allow multiple files', () => {
      fileDropControl.multiple = false;
      fixture.detectChanges();
      let inputEl = FileDropTestHelper.getInputDebugEl(fixture);

      expect(inputEl.nativeElement.hasAttribute('multiple')).toBe(false);

      fileDropControl.multiple = true;
      fixture.detectChanges();
      expect(inputEl.nativeElement.hasAttribute('multiple')).toBe(true);
    });

    it('should set accepted types on the file input html', () => {
      fileDropControl.acceptedTypes = 'image/png';
      fixture.detectChanges();
      let inputEl = FileDropTestHelper.getInputDebugEl(fixture);

      expect(inputEl.nativeElement.getAttribute('accept')).toBe('image/png');

    });

    it('should allow the user to specify a min file size', fakeAsync(() => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

      fileDropControl.minFileSize = 1500;
      fixture.detectChanges();
      tick();
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

      expect(componentInstance.attachment).toEqual({
        files: [
          {
            file: {
              name: 'woo.txt',
              size: 2000,
              type: 'image/jpeg'
            },
            url: 'url'
          }
        ],
        links: undefined
      });
    }));

    it('should allow the user to specify a max file size', fakeAsync(() => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

      fileDropControl.maxFileSize = 1500;
      fixture.detectChanges();
      tick();
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

      expect(componentInstance.attachment).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          }
        ],
        links: undefined
      });
    }));

    it('should allow the user to specify a validation function', fakeAsync(() => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

      let errorMessage = 'You may not upload a file that begins with the letter "w."';

      fileDropControl.validateFn = function (file: any) {
        if (file.file.name.indexOf('w') === 0) {
          return errorMessage;
        }
      };

      fixture.detectChanges();
      tick();
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

      expect(componentInstance.attachment).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          }
        ],
        links: undefined
      });
    }));

    it('should allow the user to specify accepted types', fakeAsync(() => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

      fileDropControl.acceptedTypes = 'image/png,image/tiff';

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      FileDropTestHelper.setupStandardFileChangeEvent(fixture);

      expect(filesChangedActual.rejectedFiles.length).toBe(1);
      expect(filesChangedActual.rejectedFiles[0].file.name).toBe('woo.txt');
      expect(filesChangedActual.rejectedFiles[0].file.size).toBe(2000);
      expect(filesChangedActual.rejectedFiles[0].errorType).toBe('fileType');
      expect(filesChangedActual.rejectedFiles[0].errorParam).toBe(fileDropControl.acceptedTypes);

      expect(filesChangedActual.files.length).toBe(1);
      expect(filesChangedActual.files[0].url).toBe('url');
      expect(filesChangedActual.files[0].file.name).toBe('foo.txt');
      expect(filesChangedActual.files[0].file.size).toBe(1000);

      expect(componentInstance.attachment).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          }
        ],
        links: undefined
      });
    }));

    it('should reject a file with no type when accepted types are defined', fakeAsync(() => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

      fileDropControl.acceptedTypes = 'image/png,image/tiff';

      fixture.detectChanges();
      tick();
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
      expect(filesChangedActual.rejectedFiles[1].errorParam).toBe(fileDropControl.acceptedTypes);

      expect(filesChangedActual.rejectedFiles[0].file.name).toBe('foo.txt');
      expect(filesChangedActual.rejectedFiles[0].file.size).toBe(1000);
      expect(filesChangedActual.rejectedFiles[0].errorType).toBe('fileType');
      expect(filesChangedActual.rejectedFiles[0].errorParam).toBe(fileDropControl.acceptedTypes);

      expect(componentInstance.attachment).toEqual(undefined);

    }));

    it('should allow the user to specify accepted type with wildcards', fakeAsync(() => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

      fileDropControl.acceptedTypes = 'application/*,image/*';

      fixture.detectChanges();
      tick();
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

      expect(componentInstance.attachment).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          },
          {
            file: {
              name: 'woo.txt',
              size: 2000,
              type: 'image/jpeg'
            },
            url: 'newurl'
          }
        ],
        links: undefined
      });
    }));

    it('should load files and set classes on drag and drop', fakeAsync(() => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

      let fileReaderSpy = FileDropTestHelper.setupFileReaderSpy();

      fileDropControl.acceptedTypes = 'image/png, image/tiff';

      fixture.detectChanges();
      tick();
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

      expect(componentInstance.attachment).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          }
        ],
        links: undefined
      });

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
        stopPropagation: function () { },
        preventDefault: function () { }
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

      expect(componentInstance.attachment).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          }
        ],
        links: undefined
      });

    }));

    it([
      'should accept a file of rejected type on drag (but not on drop)',
      'if the browser does not support dataTransfer.items'
    ].join(' '), () => {

      fileDropControl.acceptedTypes = 'image/png, image/tiff';

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

    it('should allow loading multiple files on drag and drop when multiple is true', fakeAsync(() => {
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

      fileDropControl.multiple = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      let dropDebugEl = FileDropTestHelper.getDropDebugEl(fixture);

      FileDropTestHelper.triggerDragEnter('sky-drop', dropDebugEl, fixture);
      FileDropTestHelper.triggerDragOver(files, dropDebugEl, fixture);
      FileDropTestHelper.triggerDrop(files, dropDebugEl, fixture);
      expect(fileReaderSpy.loadCallbacks.length).toBe(2);

      fileReaderSpy.loadCallbacks[0]({
        target: {
          result: 'url'
        }
      });
      fileReaderSpy.loadCallbacks[1]({
        target: {
          result: 'anotherUrl'
        }
      });

      fixture.detectChanges();

      expect(componentInstance.attachment).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          },
          {
            file: {
              name: 'goo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'anotherUrl'
          }
        ],
        links: undefined
      });
    }));

    it('should delete a file correctly after multiple files are uploaded', fakeAsync(() => {
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

      fileDropControl.multiple = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      let dropDebugEl = FileDropTestHelper.getDropDebugEl(fixture);

      FileDropTestHelper.triggerDragEnter('sky-drop', dropDebugEl, fixture);
      FileDropTestHelper.triggerDragOver(files, dropDebugEl, fixture);
      FileDropTestHelper.triggerDrop(files, dropDebugEl, fixture);
      expect(fileReaderSpy.loadCallbacks.length).toBe(2);

      fileReaderSpy.loadCallbacks[0]({
        target: {
          result: 'url'
        }
      });
      fileReaderSpy.loadCallbacks[1]({
        target: {
          result: 'anotherUrl'
        }
      });

      fixture.detectChanges();

      expect(componentInstance.attachment).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          },
          {
            file: {
              name: 'goo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'anotherUrl'
          }
        ],
        links: undefined
      });

      let fileDeleteActual: SkyFileLink;

      fileDropControl.fileDeleted.subscribe(
        (newLink: SkyFileLink) => fileDeleteActual = newLink);

      let deleteButton = FileDropTestHelper.getDeleteButtons(fixture)[1];
      deleteButton.nativeElement.click();
      fixture.detectChanges();

      expect(fileDeleteActual).toEqual({
        file: {
          name: 'goo.txt',
          size: 1000,
          type: 'image/png'
        },
        url: 'anotherUrl'
      });

      expect(componentInstance.attachment).toEqual({
        files: [
          {
            file: {
              name: 'foo.txt',
              size: 1000,
              type: 'image/png'
            },
            url: 'url'
          }
        ],
        links: undefined
      });
    }));

    it('should prevent loading multiple files on drag and drop when multiple is false', fakeAsync(() => {
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

      fileDropControl.multiple = false;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      let dropDebugEl = FileDropTestHelper.getDropDebugEl(fixture);

      FileDropTestHelper.triggerDragEnter('sky-drop', dropDebugEl, fixture);
      FileDropTestHelper.triggerDragOver(files, dropDebugEl, fixture);
      FileDropTestHelper.triggerDrop(files, dropDebugEl, fixture);
      expect(fileReaderSpy.loadCallbacks.length).toBe(0);
    }));

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
      fileDropControl.allowLinks = true;
      fixture.detectChanges();

      let linkInput = FileDropTestHelper.getLinkInput(fixture);

      expect(linkInput).toBeTruthy();
    });

    it('should emit link event when link is added on click', fakeAsync(() => {
      let fileLinkActual: SkyFileLink;

      fileDropControl.linkAdded.subscribe(
        (newLink: SkyFileLink) => fileLinkActual = newLink);

      fileDropControl.allowLinks = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      let linkInput = FileDropTestHelper.getLinkInput(fixture);

      FileDropTestHelper.triggerInputChange('link.com', linkInput, fixture);

      let linkButton = FileDropTestHelper.getLinkButton(fixture);
      linkButton.nativeElement.click();
      fixture.detectChanges();

      expect(fileLinkActual.url).toBe('link.com');

      expect(componentInstance.attachment).toEqual({
        files: undefined,
        links: [
          {
            url: 'link.com'
          }
        ]
      });
    }));

    it('should emit link delete event when link is deleted', fakeAsync(() => {
      let fileLinkActual: SkyFileLink;

      fileDropControl.linkAdded.subscribe(
        (newLink: SkyFileLink) => fileLinkActual = newLink);

      fileDropControl.linkDeleted.subscribe(
        (newLink: SkyFileLink) => fileLinkActual = newLink);

      fileDropControl.allowLinks = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      let linkInput = FileDropTestHelper.getLinkInput(fixture);

      FileDropTestHelper.triggerInputChange('link.com', linkInput, fixture);

      let linkButton = FileDropTestHelper.getLinkButton(fixture);
      linkButton.nativeElement.click();
      fixture.detectChanges();

      expect(fileLinkActual.url).toBe('link.com');

      expect(componentInstance.attachment).toEqual({
        files: undefined,
        links: [
          {
            url: 'link.com'
          }
        ]
      });

      fileLinkActual = undefined;

      let deleteButton = FileDropTestHelper.getDeleteButtons(fixture)[0];
      deleteButton.nativeElement.click();
      fixture.detectChanges();

      expect(fileLinkActual.url).toBe('link.com');

      expect(componentInstance.attachment).toBeFalsy();
    }));

    it('should emit link event when link is added on enter press', fakeAsync(() => {
      let fileLinkActual: SkyFileLink;

      fileDropControl.linkAdded.subscribe(
        (newLink: SkyFileLink) => fileLinkActual = newLink);

      fileDropControl.allowLinks = true;
      fixture.detectChanges();
      tick();
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

      expect(componentInstance.attachment).toBeFalsy();

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

      expect(componentInstance.attachment).toEqual({
        files: undefined,
        links: [
          {
            url: 'link.com'
          }
        ]
      });
    }));

    it('should allow custom content inside of the file drop component', () => {
      componentInstance.showCustomContent = true;

      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.sky-file-drop-contents'))).toBeFalsy();
      expect(fixture.debugElement.query(
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

  describe('no form', () => {

    let fixture: ComponentFixture<FileDropControlNoFormTestComponent>;
    let el: HTMLElement;
    let componentInstance: FileDropControlNoFormTestComponent;
    let fileDropControl: SkyFileDropControlComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(FileDropControlNoFormTestComponent);
      el = fixture.nativeElement;
      componentInstance = fixture.componentInstance;
      fileDropControl = componentInstance.fileAttachmentComponent;
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
      fileDropControl.noClick = true;
      fixture.detectChanges();
      FileDropTestHelper.testClick(false, fixture);
    });

    it('should load and emit files on file change event', fakeAsync(() => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => {
          filesChangedActual = filesChanged;
        });

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const fileReaderSpyFunction = FileDropTestHelper.setupStandardFileChangeEvent(fixture);

      expect(filesChangedActual.files.length).toBe(2);
      expect(filesChangedActual.files[0].url).toBe('url');
      expect(filesChangedActual.files[0].file.name).toBe('foo.txt');
      expect(filesChangedActual.files[0].file.size).toBe(1000);

      expect(filesChangedActual.files[1].url).toBe('newurl');
      expect(filesChangedActual.files[1].file.name).toBe('woo.txt');
      expect(filesChangedActual.files[1].file.size).toBe(2000);

      FileDropTestHelper.setupSecondaryFileChangeEvent(fixture, fileReaderSpyFunction);

      expect(filesChangedActual.files.length).toBe(1);
      expect(filesChangedActual.files[0].url).toBe('thirdurl');
      expect(filesChangedActual.files[0].file.name).toBe('moo.txt');
      expect(filesChangedActual.files[0].file.size).toBe(3000);

    }));

    it('should delete files correctly', fakeAsync(() => {
      let filesChangedActual: SkyFileDropChange;
      let fileDeletedActual: SkyFileItem;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);
      fileDropControl.fileDeleted.subscribe(
        (fileDeleted: SkyFileItem) => fileDeletedActual = fileDeleted);

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      FileDropTestHelper.setupStandardFileChangeEvent(fixture);

      expect(filesChangedActual.files.length).toBe(2);
      expect(filesChangedActual.files[0].url).toBe('url');
      expect(filesChangedActual.files[0].file.name).toBe('foo.txt');
      expect(filesChangedActual.files[0].file.size).toBe(1000);

      expect(filesChangedActual.files[1].url).toBe('newurl');
      expect(filesChangedActual.files[1].file.name).toBe('woo.txt');
      expect(filesChangedActual.files[1].file.size).toBe(2000);

      let deleteButton = FileDropTestHelper.getDeleteButtons(fixture)[0];
      deleteButton.nativeElement.click();
      fixture.detectChanges();

      expect(fileDeletedActual).toEqual({
        file: {
          name: 'foo.txt',
          size: 1000,
          type: 'image/png'
        },
        url: 'url'
      });
    }));

    it('should load and emit files on file change event when file reader has an error and aborts',
      fakeAsync(() => {
        let filesChangedActual: SkyFileDropChange;

        fileDropControl.filesUploaded.subscribe(
          (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

        fixture.detectChanges();
        tick();
        fixture.detectChanges();

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
      }));

    it('should allow the user to specify to not allow multiple files', () => {
      fileDropControl.multiple = false;
      fixture.detectChanges();
      let inputEl = FileDropTestHelper.getInputDebugEl(fixture);

      expect(inputEl.nativeElement.hasAttribute('multiple')).toBe(false);

      fileDropControl.multiple = true;
      fixture.detectChanges();
      expect(inputEl.nativeElement.hasAttribute('multiple')).toBe(true);
    });

    it('should set accepted types on the file input html', () => {
      fileDropControl.acceptedTypes = 'image/png';
      fixture.detectChanges();
      let inputEl = FileDropTestHelper.getInputDebugEl(fixture);

      expect(inputEl.nativeElement.getAttribute('accept')).toBe('image/png');

    });

    it('should allow the user to specify a min file size', fakeAsync(() => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

      fileDropControl.minFileSize = 1500;
      fixture.detectChanges();
      tick();
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
    }));

    it('should allow the user to specify a max file size', fakeAsync(() => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

      fileDropControl.maxFileSize = 1500;
      fixture.detectChanges();
      tick();
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
    }));

    it('should allow the user to specify a validation function', fakeAsync(() => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

      let errorMessage = 'You may not upload a file that begins with the letter "w."';

      fileDropControl.validateFn = function (file: any) {
        if (file.file.name.indexOf('w') === 0) {
          return errorMessage;
        }
      };

      fixture.detectChanges();
      tick();
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
    }));

    it('should allow the user to specify accepted types', fakeAsync(() => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

      fileDropControl.acceptedTypes = 'image/png,image/tiff';

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      FileDropTestHelper.setupStandardFileChangeEvent(fixture);

      expect(filesChangedActual.rejectedFiles.length).toBe(1);
      expect(filesChangedActual.rejectedFiles[0].file.name).toBe('woo.txt');
      expect(filesChangedActual.rejectedFiles[0].file.size).toBe(2000);
      expect(filesChangedActual.rejectedFiles[0].errorType).toBe('fileType');
      expect(filesChangedActual.rejectedFiles[0].errorParam).toBe(fileDropControl.acceptedTypes);

      expect(filesChangedActual.files.length).toBe(1);
      expect(filesChangedActual.files[0].url).toBe('url');
      expect(filesChangedActual.files[0].file.name).toBe('foo.txt');
      expect(filesChangedActual.files[0].file.size).toBe(1000);
    }));

    it('should reject a file with no type when accepted types are defined', fakeAsync(() => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

      fileDropControl.acceptedTypes = 'image/png,image/tiff';

      fixture.detectChanges();
      tick();
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
      expect(filesChangedActual.rejectedFiles[1].errorParam).toBe(fileDropControl.acceptedTypes);

      expect(filesChangedActual.rejectedFiles[0].file.name).toBe('foo.txt');
      expect(filesChangedActual.rejectedFiles[0].file.size).toBe(1000);
      expect(filesChangedActual.rejectedFiles[0].errorType).toBe('fileType');
      expect(filesChangedActual.rejectedFiles[0].errorParam).toBe(fileDropControl.acceptedTypes);
    }));

    it('should allow the user to specify accepted type with wildcards', fakeAsync(() => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

      fileDropControl.acceptedTypes = 'application/*,image/*';

      fixture.detectChanges();
      tick();
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
    }));

    it('should load files and set classes on drag and drop', fakeAsync(() => {
      let filesChangedActual: SkyFileDropChange;

      fileDropControl.filesUploaded.subscribe(
        (filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged);

      let fileReaderSpy = FileDropTestHelper.setupFileReaderSpy();

      fileDropControl.acceptedTypes = 'image/png, image/tiff';

      fixture.detectChanges();
      tick();
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
        stopPropagation: function () { },
        preventDefault: function () { }
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
    }));

    it([
      'should accept a file of rejected type on drag (but not on drop)',
      'if the browser does not support dataTransfer.items'
    ].join(' '), () => {

      fileDropControl.acceptedTypes = 'image/png, image/tiff';

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

    it('should allow loading multiple files on drag and drop when multiple is true', fakeAsync(() => {
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

      fileDropControl.multiple = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      let dropDebugEl = FileDropTestHelper.getDropDebugEl(fixture);

      FileDropTestHelper.triggerDragEnter('sky-drop', dropDebugEl, fixture);
      FileDropTestHelper.triggerDragOver(files, dropDebugEl, fixture);
      FileDropTestHelper.triggerDrop(files, dropDebugEl, fixture);
      expect(fileReaderSpy.loadCallbacks.length).toBe(2);

      fileReaderSpy.loadCallbacks[0]({
        target: {
          result: 'url'
        }
      });
      fileReaderSpy.loadCallbacks[1]({
        target: {
          result: 'anotherUrl'
        }
      });

      fixture.detectChanges();
    }));

    it('should delete a file correctly after multiple files are uploaded', fakeAsync(() => {
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

      fileDropControl.multiple = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      let dropDebugEl = FileDropTestHelper.getDropDebugEl(fixture);

      FileDropTestHelper.triggerDragEnter('sky-drop', dropDebugEl, fixture);
      FileDropTestHelper.triggerDragOver(files, dropDebugEl, fixture);
      FileDropTestHelper.triggerDrop(files, dropDebugEl, fixture);
      expect(fileReaderSpy.loadCallbacks.length).toBe(2);

      fileReaderSpy.loadCallbacks[0]({
        target: {
          result: 'url'
        }
      });
      fileReaderSpy.loadCallbacks[1]({
        target: {
          result: 'anotherUrl'
        }
      });

      fixture.detectChanges();

      let fileDeleteActual: SkyFileLink;

      fileDropControl.fileDeleted.subscribe(
        (newLink: SkyFileLink) => fileDeleteActual = newLink);

      let deleteButton = FileDropTestHelper.getDeleteButtons(fixture)[1];
      deleteButton.nativeElement.click();
      fixture.detectChanges();

      expect(fileDeleteActual).toEqual({
        file: {
          name: 'goo.txt',
          size: 1000,
          type: 'image/png'
        },
        url: 'anotherUrl'
      });
    }));

    it('should prevent loading multiple files on drag and drop when multiple is false', fakeAsync(() => {
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

      fileDropControl.multiple = false;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      let dropDebugEl = FileDropTestHelper.getDropDebugEl(fixture);

      FileDropTestHelper.triggerDragEnter('sky-drop', dropDebugEl, fixture);
      FileDropTestHelper.triggerDragOver(files, dropDebugEl, fixture);
      FileDropTestHelper.triggerDrop(files, dropDebugEl, fixture);
      expect(fileReaderSpy.loadCallbacks.length).toBe(0);
    }));

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
      fileDropControl.allowLinks = true;
      fixture.detectChanges();

      let linkInput = FileDropTestHelper.getLinkInput(fixture);

      expect(linkInput).toBeTruthy();
    });

    it('should emit link event when link is added on click', fakeAsync(() => {
      let fileLinkActual: SkyFileLink;

      fileDropControl.linkAdded.subscribe(
        (newLink: SkyFileLink) => fileLinkActual = newLink);

      fileDropControl.allowLinks = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      let linkInput = FileDropTestHelper.getLinkInput(fixture);

      FileDropTestHelper.triggerInputChange('link.com', linkInput, fixture);

      let linkButton = FileDropTestHelper.getLinkButton(fixture);
      linkButton.nativeElement.click();
      fixture.detectChanges();

      expect(fileLinkActual.url).toBe('link.com');
    }));

    it('should emit link delete event when link is deleted', fakeAsync(() => {
      let fileLinkActual: SkyFileLink;

      fileDropControl.linkAdded.subscribe(
        (newLink: SkyFileLink) => fileLinkActual = newLink);

      fileDropControl.linkDeleted.subscribe(
        (newLink: SkyFileLink) => fileLinkActual = newLink);

      fileDropControl.allowLinks = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      let linkInput = FileDropTestHelper.getLinkInput(fixture);

      FileDropTestHelper.triggerInputChange('link.com', linkInput, fixture);

      let linkButton = FileDropTestHelper.getLinkButton(fixture);
      linkButton.nativeElement.click();
      fixture.detectChanges();

      expect(fileLinkActual.url).toBe('link.com');

      fileLinkActual = undefined;

      let deleteButton = FileDropTestHelper.getDeleteButtons(fixture)[0];
      deleteButton.nativeElement.click();
      fixture.detectChanges();

      expect(fileLinkActual.url).toBe('link.com');
    }));

    it('should emit link event when link is added on enter press', fakeAsync(() => {
      let fileLinkActual: SkyFileLink;

      fileDropControl.linkAdded.subscribe(
        (newLink: SkyFileLink) => fileLinkActual = newLink);

      fileDropControl.allowLinks = true;
      fixture.detectChanges();
      tick();
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
    }));

    it('should allow custom content inside of the file drop component', () => {
      componentInstance.showCustomContent = true;

      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.sky-file-drop-contents'))).toBeFalsy();
      expect(fixture.debugElement.query(
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
});
