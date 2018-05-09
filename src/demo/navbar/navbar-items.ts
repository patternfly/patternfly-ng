export class NavbarItems {
  static readonly COMPONENTS: any[] = [{
    id: 'action',
    path: 'action',
    title: 'Action'
  }, {
    id: 'cards',
    title: 'Cards',
    children: [{
      id: 'card',
      path: 'card',
      title: 'Basic Card'
    }, {
      id: 'infocard',
      path: 'infocard',
      title: 'Info Card'
    }]
  }, {
    id: 'charts',
    title: 'Charts',
    children: [{
      id: 'donut',
      path: 'donut',
      title: 'Donut Chart'
    }, {
      id: 'sparkline',
      path: 'sparkline',
      title: 'Sparkline Chart'
    }, {
      id: 'utilization-donut',
      path: 'utilization-donut',
      title: 'Utilization Donut Chart'
    }]
  }, {
    id: 'copy',
    title: 'Copy',
    children: [{
      id: 'inlinecopy',
      path: 'inlinecopy',
      title: 'Inline Copy'
    }, {
      id: 'blockcopy',
      path: 'blockcopy',
      title: 'Block Copy'
    }]
  }, {
    id: 'emptystate',
    path: 'emptystate',
    title: 'Empty State'
  }, {
    id: 'filters',
    path: 'filters',
    title: 'Filter'
  }, {
    id: 'lists',
    title: 'Lists',
    children: [{
      id: 'list',
      path: 'list',
      title: 'Basic List'
    }, {
      id: 'treelist',
      path: 'treelist',
      title: 'Tree List'
    }]
  }, {
    id: 'aboutmodal',
    path: 'aboutmodal',
    title: 'About Modal'
  }, {
    id: 'pagination',
    path: 'pagination',
    title: 'Pagination'
  }, {
    id: 'sample',
    path: 'sample',
    title: 'Sample'
  }, {
    id: 'sort',
    path: 'sort',
    title: 'Sort'
  }, {
    id: 'navigation',
    title: 'Navigation',
    children: [{
      id: 'applauncher',
      path: 'applauncher',
      title: 'Application Launcher'
    }, {
      id: 'verticalnavigation',
      path: 'verticalnavigation',
      title: 'Vertical Navigation'
    }]
   }, {
    id: 'notifications',
    title: 'Notifications',
    children: [{
      id: 'notificationdrawer',
      path: 'notificationdrawer',
      title: 'Notification Drawer'
    },
    {
      id: 'inlinenotification',
      path: 'inlinenotification',
      title: 'Inline Notification'
    }, {
      id: 'toastnotification',
      path: 'toastnotification',
      title: 'Toast Notification'
    }, {
      id: 'toastnotificationlist',
      path: 'toastnotificationlist',
      title: 'Toast Notification List'
    }]
  }, {
    id: 'table',
    path: 'table',
    title: 'Table'
  }, {
    id: 'toolbar',
    path: 'toolbar',
    title: 'Toolbar'
  }, {
    id: 'wizard',
    path: 'wizard',
    title: 'Wizard'
  }];

  static readonly DIRECTIVES: any[] = [{
    id: 'remainingcharscount',
    path: 'remainingcharscount',
    title: 'Remaining Chars Count'
  }];

  static readonly GETSTARTED: any[] = [{
    hasChildren: false,
    id: 'getstarted',
    path: 'welcome',
    title: 'Welcome'
  }, {
    hasChildren: true,
    id: 'components',
    path: 'action',
    title: 'Components'
  }, {
    hasChildren: true,
    id: 'directives',
    path: 'remainingcharscount',
    title: 'Directives'
  }, {
    hasChildren: true,
    id: 'pipes',
    path: 'searchhighlight',
    title: 'Pipes'
  }, {
    hasChildren: true,
    id: 'services',
    path: 'copyservice',
    title: 'Services'
  }];

  static readonly PIPES: any[] = [{
    id: 'searchhighlight',
    path: 'searchhighlight',
    title: 'Search Highlight'
  }, {
    id: 'sortarray',
    path: 'sortarray',
    title: 'Sort Arrays'
  }, {
    id: 'truncate',
    path: 'truncate',
    title: 'Truncate Chars'
  }];

  static readonly SERVICES: any[] = [{
    id: 'copyservice',
    path: 'copyservice',
    title: 'Copy Service'
  }, {
    id: 'notificationservice',
    path: 'notificationservice',
    title: 'Notification Service'
  }];
}
