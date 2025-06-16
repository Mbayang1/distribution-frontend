import { Routes } from '@angular/router';
import { DistributionsList } from './components/distributions-list/distributions-list';

export const routes: Routes = [
  { path: '', component: DistributionsList, pathMatch: 'full' }
];