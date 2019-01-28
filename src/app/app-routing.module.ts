import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventAddComponent }  from './event-add/event-add.component'

const routes: Routes = [
	{ 
		path: '',
		redirectTo: '/event-list',
		pathMatch: 'full'
	},
	
	{
		path:'event-list',
		component: 	EventListComponent,
	},
	
	{
		path:'event-add',
		component: EventAddComponent,
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
