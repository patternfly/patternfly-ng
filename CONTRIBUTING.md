# Contributing to PatternFly-ng

We would love for you to contribute to PatternFly-ng and help make it even better than it is
today!  Below is information on how to get started as a contributor to PatternFly-ng.

 - [Code of Conduct](#coc)
 - [Question or Problem?](#question)
 - [Issues and Bugs](#issue)
 - [Submission Guidelines](#submit)
 - [Coding Rules](#rules)
 - [Building the Code](#coding)
 - [Git Commit Guidelines](#commits)

## <a name="coc"></a> Code of Conduct
An open community is important to us, please help us maintain that by following our [Code of Conduct][coc].

## <a name="question"></a> Do you have a question?
There are a few things that can be done to resolve any questions or problems you might have.
 - Search our [GitHub issues][github-issues]
 - Join our patternfly-ng channel on [Slack](http://slack.patternfly.org)
 - Join our mailing-list following the instructions on [patternfly.org](http://www.patternfly.org/community/)


## <a name="issue"></a> Found a bug or issue?
Please help us out if you find a bug by submitting an issue to our [GitHub Repository][github-issues].
We also welcome [PR's][github-pr] if you'd like to submit a fix.

## <a name="submit"></a> Submission guidelines
Any PatternFly-ng patterns submitted for contribution will be reviewed by designers on this repo associated with the PatternFly project to ensure that contributions match the PatternFly design standards for each component. This design review is used to make sure that it meets one of the following criteria:

- Matches the "gold standard" design specifications as designed by PatternFly
- Matches the design specifications provided for a certain project and has been made general enough to work for other projects
- Goes through a design review and subsequent matching design documentation issues are created for PatternFly to match this contributionv

The following should be included in all PR's:
 - A clear commit message describing what has been done
 - A reference to the [issue][github-issues] being addressed (whether it's a bug being fixed or a new component being added, a GitHub issue should be added to track it).
 - A unit test covering the included behavior
 - Documentation:
   - Add a new examples folder within the component folder if it doesn't already exist
   - Add an example component following the style of one of the existing components.  
   - Examples should include a working sample including the ability to toggle configuration values to demonstrate the full functionality of a component
   - Links to the example code and generated typedoc documenation should be included following the example below
 ``` html
 <div>
   <tabset>
     <tab heading="api">
       <iframe class="demoframe" src="docs/classes/listviewcomponent.html"></iframe>
     </tab>
     <tab heading="html">
       <include-content src="/src/app/list-view/examples/list-view-basic-example.component.html"></include-content>
     </tab>
     <tab heading="typescript">
       <include-content src="/src/app/list-view/examples/list-view-basic-example.component.ts"></include-content>
     </tab>
   </tabset>
 </div>
 ```

## <a name="rules"></a> Our coding guidelines
We follow the [Angular style guide](https://angular.io/guide/styleguide) for all Angular code.  Most general questions about how things should be named, where files should live and overall file structure can be answered by reviewing those guidelines.

PatternFly also has coding guidelines that we endeavour to follow that impact HTML and CSS.  These are found at [codeguide.patternfly.org](http://codeguide.patternfly.org/).


## <a name="coding"></a> Working with the code
PatternFly-ng uses npm, webpack and gulp.  With the exception of node.js, all dependencies should be present in the package.json file.

##### Setting up the environment for the first time:
 - Install Node.js - Find more information on [Node.js](https://nodejs.org/en/)  
   PatternFly-ng stays up to date with the Node LTS Release Schedule. We suggest the use of an actively supported version of Node/NPM, although prior versions of Node may work.

 - Clone patternfly-ng from github   
   git clone https://github.com/patternfly/patternfly-ng
   
 - Within the patternfly-ng directory, run:   
   npm install
   
 ##### The following commands will help you work with the code:  
 - npm run start:demo (runs a live demo on http://localhost:8001)
 - npm run build - run this before you submit a PR to make sure all tests pass
 - npm run test - run the karma tests
 - npm run reinstall - this clears your npm packages and installs them fresh
   

## <a name="commits"></a> Git Commit Guidelines

PatternFly-ng uses a semantic release process to automate package publishing, based on the following commit message format.

Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject** ([full explanation](https://github.com/stevemao/conventional-changelog-angular/blob/master/convention.md)):

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

##### Patch Release

```
fix(pencil): stop graphite breaking when too much pressure applied
```

##### Feature Release

```
feat(pencil): add 'graphiteWidth' option
```

##### Breaking Release

```
perf(pencil): remove graphiteWidth option
```

[coc]: https://github.com/patternfly/patternfly/blob/master/CODE_OF_CONDUCT.md
[github]: https://github.com/patternfly/patternfly-ng/
[github-issues]: https://github.com/patternfly/patternfly-ng/issues
[github-pr]: https://github.com/patternfly/patternfly-ng/pulls