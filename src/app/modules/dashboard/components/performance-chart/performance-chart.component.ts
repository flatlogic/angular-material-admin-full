import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { PerformanceChartData } from '../../models';
import { SettingsMenuComponent } from '../../../../shared/ui-elements';

@Component({
    selector: 'app-performance-chart',
    templateUrl: './performance-chart.component.html',
    styleUrls: ['./performance-chart.component.scss'],
    standalone: true,
    imports: [CommonModule, MatCardModule, MatProgressBarModule, SettingsMenuComponent]
})
export class PerformanceChartComponent {
  @Input() performanceChartData: PerformanceChartData;
  @Input() currentTheme: string;
}
