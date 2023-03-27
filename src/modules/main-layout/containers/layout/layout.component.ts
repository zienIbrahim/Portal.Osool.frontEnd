import { Component, EventEmitter, Output } from '@angular/core';
import { sideNavItems, sideNavSections } from '../../Data/SideNaveData';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  sideNavItems = sideNavItems;
  sideNavSections = sideNavSections;

}
