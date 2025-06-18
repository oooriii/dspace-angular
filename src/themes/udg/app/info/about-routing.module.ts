import { NgModule, OnInit} from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { I18nBreadcrumbResolver } from '../../../../app/core/breadcrumbs/i18n-breadcrumb.resolver';
import { AboutComponent } from './about/about.component';

const imports = [
  RouterModule.forChild([
    {
      path: 'about',
      component: AboutComponent,
      resolve: { breadcrumb: I18nBreadcrumbResolver },
      data: { title: 'info.about.title', breadcrumbKey: 'info.about' },
    },
  ])
];

@NgModule({
  imports: [
    ...imports
  ]
})

/**
 * Module for navigating to components within the info module
 */
export class AboutRoutingModule implements OnInit{
    /*
  constructor(private router: Router) {
    console.log(router);
    console.log("****************************\n********************\n**************");
    const config = router.config;
    const lastRoute = config[config.length - 1];
    
    // Check if the last route is '**'
    if (lastRoute && lastRoute.path === '**') {
      // Insert the 'about' route as the second-to-last route
      config.splice(config.length - 1, 0, {
        path: 'info/about',
        component: AboutComponent,
        resolve: { breadcrumb: I18nBreadcrumbResolver },
        data: { title: 'info.about.title', breadcrumbKey: 'info.about' }
      });
    } else {
      // If there's no '**' route, add the 'about' route at the end
      config.push({
        path: 'about',
        component: AboutComponent,
        resolve: { breadcrumb: I18nBreadcrumbResolver },
        data: { title: 'info.about.title', breadcrumbKey: 'info.about' }
      });
    }
    
    router.resetConfig(config);

    // Log all routes to the console
    console.log('All Routes:', config);
  }
    */
  constructor() {
    console.log("AboutRoutingModule constructor");
  }

  ngOnInit(): void {
    console.log("AboutRoutingModule ngOnInit");
  }
}

