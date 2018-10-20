import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'navbar-pocketmonster',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed = true;

  ngOnInit() {
  }

}
