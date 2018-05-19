import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { Notification } from '../../../notification/notification';
import { NotificationService } from '../../../notification/notification-service/notification.service';
import { NotificationType } from '../../../notification/notification-type';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'block-copy-multiple-example',
  templateUrl: './block-copy-multiple-example.component.html'
})
export class BlockCopyMultipleExampleComponent implements OnInit {
  notifications: Notification[];

  multiEx01 = {
    label: 'Personal Access Token',
    // tslint:disable-next-line:max-line-length
    copyValue: 'jvJhbGciOiJSUzI1NiIsImtpZCI6IjBsTDB2WHM5WVJWcVpNb3d5dzh1TkxSX3lyMGlGYW96ZFFrOXJ6cTJPVlUiLCJ0eXAiOiJKV1QifQ.eyJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vYXV0aC5vcGVuc2hpZnQuaW8iLCJodHRwczovL29wZW5zaGlmdC5pbyJdLCJhcHByb3ZlZCI6dHJ1ZSwiYXVkIjoiZmFicmljOC1vbmxpbmUtcGxhdGZvcm0iLCJhdXRoX3RpbWUiOjE1MjU4MDE5MjgsImF6cCI6ImZhYnJpYzgtb25saW5lLXBsYXRmb3JtIiwiZW1haWwiOiJtc3BheG1hbkByZWRoYXQuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImV4cCI6MTUyODM5MzkyOCwiZmFtaWx5X25hbWUiOiJTcGF4bWFuIiwiZ2l2ZW5fbmFtZSI6Ik1pY2hhZWwiLCJpYXQiOjE1MjU4MDE5MjgsImlzcyI6Imh0dHBzOi8vc3NvLm9wZW5zaGlmdC5pby9hdXRoL3JlYWxtcy9mYWJyaWM4IiwianRpIjoiNGI2YTZkMjctZTM0Yi00YWRiLThhOTEtYTM4NWFjOGZhOGE0IiwibmFtZSI6Ik1pY2hhZWwgU3BheG1hbiIsIm5iZiI6MCwicHJlZmVycmVkX3VzZXJuYW1lIjoibXNwYXhtYW4iLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX0sImJyb2tlciI6eyJyb2xlcyI6WyJyZWFkLXRva2VuIl19fSwic2Vzc2lvbl9zdGF0ZSI6IjE4Zjg0MDRlLWY4NjQtNDdiZS1iNWNlLTQ3M2I1N2RmNzFjZiIsInN1YiI6IjIyYweJ9FhLTE0Y2QtNGIwYS1iZGVmLThmYjQyYjE4OGQ3NyIsInR5cCI6IkJlYXJlciJ9.Mkq-hF0PmHam8MnkMLnLnTtpcCK0vy1dESHxPXQdrn2vYSRFHgNPujI_pqhmCGu2ietHFKm5G-qjFUnbYMQZb1lOjxXwkxBxTfeli2C3Jc0aNEhYnDB__th2preo4XQT0DcdBo82gia41VLc@qmhr0yqbau-YjLkn0SLqJx8hg1FJt0QGLFLX9zeCUKWtujg2P5ZGqgYiwCWXdOpPc22PFi5WrbghorzCclOjCqaymGBiIELdJFVeRrLYWli5MKOQYpyFxJrsfogrCFUFin9wJjuqqBAQaHmtN2rYY-ql8pq63S2Zh396jQbETU1wcHQ6R8uDm5GXHOkj61Grn4gBg'
  };

  multiEx02 = {
    label: 'Another Random Token',
    // tslint:disable-next-line:max-line-length
    copyValue: 'pvJhbGciOiJSUzI1NiIsImtpZCI6IjBsTDB2WHM5WVJWcVpNb3d5dzh1TkxSX3lyMGlGYW96ZFFrOXJ6cTJPVlUiLCJ0eXAiOiJKV1QifQ.eyJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vYXV0aC5vcGVuc2hpZnQuaW8iLCJodHRwczovL29wZW5zaGlmdC5pbyJdLCJhcHByb3ZlZCI6dHJ1ZSwiYXVkIjoiZmFicmljOC1vbmxpbmUtcGxhdGZvcm0iLCJhdXRoX3RpbWUiOjE1MjU4MDE5MjgsImF6cCI6ImZhYnJpYzgtb25saW5lLXBsYXRmb3JtIiwiZW1haWwiOiJtc3BheG1hbkByZWRoYXQuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImV4cCI6MTUyODM5MzkyOCwiZmFtaWx5X25hbWUiOiJTcGF4bWFuIiwiZ2l2ZW5fbmFtZSI6Ik1pY2hhZWwiLCJpYXQiOjE1MjU4MDE5MjgsImlzcyI6Imh0dHBzOi8vc3NvLm9wZW5zaGlmdC5pby9hdXRoL3JlYWxtcy9mYWJyaWM4IiwianRpIjoiNGI2YTZkMjctZTM0Yi00YWRiLThhOTEtYTM4NWFjOGZhOGE0IiwibmFtZSI6Ik1pY2hhZWwgU3BheG1hbiIsIm5iZiI6MCwicHJlZmVycmVkX3VzZXJuYW1lIjoibXNwYXhtYW4iLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX0sImJyb2tlciI6eyJyb2xlcyI6WyJyZWFkLXRva2VuIl19fSwic2Vzc2lvbl9zdGF0ZSI6IjE4Zjg0MDRlLWY4NjQtNDdiZS1iNWNlLTQ3M2I1N2RmNzFjZiIsInN1YiI6IjIyYweJ9FhLTE0Y2QtNGIwYS1iZGVmLThmYjQyYjE4OGQ3NyIsInR5cCI6IkJlYXJlciJ9.Mkq-hF0PmHam8MnkMLnLnTtpcCK0vy1dESHxPXQdrn2vYSRFHgNPujI_pqhmCGu2ietHFKm5G-qjFUnbYMQZb1lOjxXwkxBxTfeli2C3Jc0aNEhYnDB__th2preo4XQT0DcdBo82gia41VLc@qmhr0yqbau-YjLkn0SLqJx8hg1FJt0QGLFLX9zeCUKWtujg2P5ZGqgYiwCWXdOpPc22PFi5WrbghorzCclOjCqaymGBiIELdJFVeRrLYWli5MKOQYpyFxJrsfogrCFUFin9wJjuqqBAQaHmtN2rYY-ql8pq63S2Zh396jQbETU1wcHQ6R8uDm5GXHOkj61Grn4gBg'
  };


  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notifications = this.notificationService.getNotifications();
  }

  notify(msg: string): void {
    this.notificationService.message(
      NotificationType.SUCCESS,
      null,
      msg,
      false,
      null,
      null);
  }
}
