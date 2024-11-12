import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  selector: 'app-layout1',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent],
  templateUrl: './layout1.component.html',
  styleUrl: './layout1.component.scss'
})
export class Layout1Component {

}
