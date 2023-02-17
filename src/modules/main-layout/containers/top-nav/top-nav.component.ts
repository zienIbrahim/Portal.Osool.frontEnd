import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {
  isExpanded = true;
  @Output() isExpandedOutput = new EventEmitter<boolean>();

  Expand(){
    this.isExpanded = !this.isExpanded 
    this.isExpandedOutput.emit(this.isExpanded);
  }
}
