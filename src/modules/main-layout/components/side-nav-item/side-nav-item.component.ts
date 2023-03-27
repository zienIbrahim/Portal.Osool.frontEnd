import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SideNavItem } from '../../models/navigation.model';

@Component({
  selector: 'app-side-nav-item',
  templateUrl: './side-nav-item.component.html',
  styleUrls: ['./side-nav-item.component.scss']
})
export class SideNavItemComponent {

  @Input() isExpanded: boolean  = false;

  public routeLinks = [
    { link: "/Tenant/List", name: "Tenant", icon: "dashboard" },
    { link: "/Tenant/GroupType", name: "Group Type", icon: "dashboard" },
    { link: "/Plan/Option", name: "Option", icon: "dns" },
    { link: "/Plan/Software", name: "Software", icon: "bookmark" },
    { link: "/Plan/Plan", name: "Plan", icon: "view_in_ar" },
  ];


}
