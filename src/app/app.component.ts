import { Component } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'coronavirus-dashboard';

  constructor(private logger: NGXLogger) {
    this.logger.debug('Your log message goes here');
    this.logger.debug('Multiple', 'Argument', 'support');
  }
}

