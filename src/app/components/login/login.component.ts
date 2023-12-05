import { Component } from '@angular/core';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private store: Store) {

  }

  onSubmit(username: string, password: string): void {
    // this.store.dispatch(login({ username: username, password: password }));
  }

}
