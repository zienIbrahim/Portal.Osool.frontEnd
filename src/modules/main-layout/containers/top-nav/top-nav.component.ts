import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorSchemeService } from 'src/modules/app-common/services/color-scheme.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {
  constructor(public colorSchemeService: ColorSchemeService) {
  }
  isDark:boolean=true;

  public themes = [
    {
        name: 'dark',
        icon: 'brightness_3'
    },
    {
        name: 'light',
        icon: 'wb_sunny'
    }
];

  @Input() isExpanded: boolean  = false;
  @Output() isExpandedOutput = new EventEmitter<boolean>();

  Expand(){
    this.isExpandedOutput.emit(true);
  }
  ChangeTheme() {
    this.isDark=!this.isDark;
    this.colorSchemeService.update(this.isDark?'dark':'brightness_3');
}
}
