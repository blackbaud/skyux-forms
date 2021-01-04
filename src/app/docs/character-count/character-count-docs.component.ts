import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-character-count-docs',
  templateUrl: './character-count-docs.component.html'
})
export class CharacterCountDocsComponent implements OnInit {

  public characterCountForm: FormGroup;

  public description: FormControl;

  public maxDescriptionCharacterCount: number = 50;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.description = this.formBuilder.control('Boys and Girls Club of South Carolina donation');

    this.characterCountForm = this.formBuilder.group({
      description: this.description
    });
  }

}
