import { LoginComponent } from './login/login';
import { Signup } from './signup/signup';
import { LogoutComponent } from './logout/logout';
import { Routes } from '@angular/router';
import { DistributionsList } from './components/distributions-list/distributions-list';
import { AgentsList } from './components/agents-list/agents-list';
import { DepartmentsList } from './components/departments-list/departments-list';
import { Home } from './home/home';
import { TypeOfMaterialsList } from './components/type-of-materials-list/type-of-materials-list';
import { ServicesList } from './components/services-list/services-list';
import { MaterialsListComponent } from './components/materials-list/materials-list';
import { Dashboard } from './dashboard/dashboard';


export const routes: Routes = [
  { path: '', component: Signup },
  { path: 'signin', component: Signup },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: Home },
  { path: 'dashboard', component: Dashboard },
  { path: 'agents', component: AgentsList },
  { path: 'departments', component: DepartmentsList },
  { path: 'distributions', component: DistributionsList },
  { path: 'type-of-materials', component: TypeOfMaterialsList },
  { path: 'services', component: ServicesList },
  { path: 'logout', component: LogoutComponent },
  ];