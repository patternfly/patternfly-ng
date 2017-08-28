[![Build Status](https://travis-ci.org/patternfly/patternfly-ng.svg?branch=master)](https://travis-ci.org/patternfly/patternfly-ng) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Welcome to PatternFly-Ng.  This is a library of common Angular components for use with the PatternFly reference implementation. Below is information on how to get started using PatternFly-ng.  If you wish to contribute to PatternFly-ng, please go to our [Contributions page][contributing].

- Web site: https://www.patternfly.org
- API Docs: https://rawgit.com/patternfly/patternfly-ng/master-dist/dist-demo/
- Build Status: https://travis-ci.org/patternfly/patternfly-ng.svg?branch=master


### Using PatternFly-ng In Your Application

This example demonstrates using the Angular-cli to get started with PatternFly-ng

1. Installing angular-cli  
*Note*: you can skip this part if you already have generated an Angular application using `ng-cli` and webpack
  
 ```bash
 npm i -g @angular/cli
 ng new patternfly-ng-app
 cd patternfly-ng-app
 ng serve
 ```

2. Install patternfly-ng
   ```bash
     npm install patternfly-ng --save
   ```

3. Add patternfly-ng dependencies
 
 - install `patternfly` and `ngx-bootstrap`

 ```bash
   npm install patternfly ngx-bootstrap --save
 ```
 
4. Add a patternfly-ng component
- open `src/app/app.module.ts` and add

```typescript
import { NotificationModule } from 'patternfly-ng';
...

@NgModule({
   ...
   imports: [NotificationModule, ... ],
    ... 
})
```

- open `.angular-cli.json` and insert a new entry into the styles array 

```json
      "styles": [
         "../node_modules/patternfly/dist/css/patternfly.min.css",
         "../node_modules/patternfly/dist/css/patternfly-additions.min.css",
        "styles.css",
      ],
```

- open `src/app/app.component.html` and add
```
<pfng-toast-notification
  [header]="'test header'"
  [message]="'this is a notification'"
  [showClose]="'true'"
  [type]="'success'">
</pfng-toast-notification>
```

## <a name="question"></a> Do you have a question?
 - Search our [GitHub issues][github-issues]
 - Join our patternfly-ng channel on [Slack](http://slack.patternfly.org)
 - Join our mailing-list following the instructions on [patternfly.org](http://www.patternfly.org/community/)

[contributing]: https://github.com/patternfly/patternfly-ng/blob/master/CONTRIBUTING.md
[github-issues]: https://github.com/patternfly/patternfly-ng/issues
