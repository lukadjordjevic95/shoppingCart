import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.sass']
})
export class SuccessComponent implements OnInit {

  constructor(public modal: NgbModal, private router: Router) { }

  ngOnInit() {
  }

  dismissModal() {
    this.router.navigate(['/products']);
    this.modal.dismissAll();
  }

}
