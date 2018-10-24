import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  @Output() formClosed = new EventEmitter<void>();

  closeForm() {
    this.formClosed.emit();
  }

  ngOnInit() {}

}
