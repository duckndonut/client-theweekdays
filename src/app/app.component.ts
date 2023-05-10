import { Component } from '@angular/core';
import { FormatService } from 'src/service/format.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-theweekdays';
  ui = this.formatService.useLanguage();

  constructor( private formatService: FormatService ) {
    // set language
    this.formatService.setLanguage('vi');
  }
}
