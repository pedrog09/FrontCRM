import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  constructor(private loginService: LoginService) {}

  logout(): void {
    this.loginService.logout();
  }
}
