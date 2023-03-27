import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {
  @Input() isExpanded: boolean  = false;
  @Output() isExpandedOutput = new EventEmitter<boolean>();

  Expand(){
    this.isExpandedOutput.emit(true);
  }
}
