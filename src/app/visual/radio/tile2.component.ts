import {
  Component
} from '@angular/core';

@Component({
  // tslint:disable-next-line
  selector: 'div.tile2',
  template: `<sky-tile>
  <sky-tile-title>
    Tile 2
  </sky-tile-title>
  <sky-tile-content>
    <sky-tile-content-section>
      Section 1
    </sky-tile-content-section>
    <sky-tile-content-section>
      Section 2
    </sky-tile-content-section>
    <sky-tile-content-section>
    <div class="sky-switch-icon-group">
      <input type="text" [(ngModel)]="firstName">
      <input id="f1" type="radio" name="foo" [(ngModel)]="radioModel" value="on" [checked]="radioModel === 'on' ? 'checked' : null">
      <input id="f2" type="radio" name="foo" [(ngModel)]="radioModel" (ngModelChange)="onModelChange($event)" value="off" [checked]="radioModel === 'off' ? 'checked' : null">
      <input type="checkbox" name="foo" value="on" checked="checked">
    </div>
    </sky-tile-content-section>
  </sky-tile-content>
</sky-tile>
`
})
export class SkyTileDemoTile2Component {
  public firstName = 'John';
  public dataView: string = 'graph';
  public foo = 'on';
  public radioModel = 'on';

  public onModelChange(event: any): void {
    console.log('EVETN?', event);
  }
}
