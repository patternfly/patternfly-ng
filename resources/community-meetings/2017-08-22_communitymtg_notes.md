# patternfly-ng Community Meeting - August 22, 2017
During this meeting we will talk about the problems we are facing with PatternFly 3 CSS.  We'll share our plan for a new CSS architecture for the next PatternFly to gather feedback.


## Agenda:
1. Repo status updates

We've added a few components since last time:
* Wizard
* Charts (Sparkline)

Our roadmap for upcoming components that we plan to contribute in the upcoming weeks includes:
* Vertical nav
* Notification drawer
* Updated tree-list view
* Doughnut charts
* Time series charts

We have improved the semantic release since last meeting as well.

2. PatternFly CSS discussion

Andres presented slides on [PatternFly Next CSS](https://github.com/patternfly/patternfly-ng/blob/master/resources/community-meetings/CSS PF Next- Community Meeting.pdf).

The overall proposal is that moving forward we would decouple PatternFly components from Bootstrap components.  Users could then consume bootstrap components and PatternFly components into their applications, but PatternFly components would not require upgrade work every time Bootstrap releases a new major version.  

Discussion was that the Angular-ng contingent was fine with this pathway forward. The biggest risk will be the bootstrap upgrade, so separating the PatternFly patterns that are unique from standard bootstrap widgets and components is fine.

3. Open time for questions and discussion on topics the community is interested in

No topics raised.
