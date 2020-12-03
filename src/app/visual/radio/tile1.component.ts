import {
  Component
} from '@angular/core';

@Component({
  // tslint:disable-next-line
  selector: 'div.tile1',
  template: `<sky-tile
  (settingsClick)="tileSettingsClick()"
  (helpClick)="tileHelpClick()"
>
  <sky-tile-title>
    Tile 1
  </sky-tile-title>
  <sky-tile-summary>
    $123.4m
  </sky-tile-summary>
  <sky-tile-content>
    <sky-tile-content-section>
      Section 1
    </sky-tile-content-section>
    <sky-tile-content-section>
      Section 2
    </sky-tile-content-section>
    <sky-tile-content-section>
      Section 3
    </sky-tile-content-section>
  </sky-tile-content>
</sky-tile>
`
})
export class SkyTileDemoTile1Component {
  public tileSettingsClick() {
    alert('tile settings clicked');
  }

  public tileHelpClick() {
    alert('tile help clicked');
  }
}
