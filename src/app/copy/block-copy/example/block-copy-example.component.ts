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
  selector: 'block-copy-example',
  templateUrl: './block-copy-example.component.html',
  styleUrls: ['./block-copy-example.component.less']
})
export class BlockCopyExampleComponent implements OnInit {
  notifications: Notification[];

  example01 = {
    label: 'Personal Access Token',
    // tslint:disable-next-line:max-line-length
    token: 'jvJhbGciOiJSUzI1NiIsImtpZCI6IjBsTDB2WHM5WVJWcVpNb3d5dzh1TkxSX3lyMGlGYW96ZFFrOXJ6cTJPVlUiLCJ0eXAiOiJKV1QifQ.eyJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vYXV0aC5vcGVuc2hpZnQuaW8iLCJodHRwczovL29wZW5zaGlmdC5pbyJdLCJhcHByb3ZlZCI6dHJ1ZSwiYXVkIjoiZmFicmljOC1vbmxpbmUtcGxhdGZvcm0iLCJhdXRoX3RpbWUiOjE1MjU4MDE5MjgsImF6cCI6ImZhYnJpYzgtb25saW5lLXBsYXRmb3JtIiwiZW1haWwiOiJtc3BheG1hbkByZWRoYXQuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImV4cCI6MTUyODM5MzkyOCwiZmFtaWx5X25hbWUiOiJTcGF4bWFuIiwiZ2l2ZW5fbmFtZSI6Ik1pY2hhZWwiLCJpYXQiOjE1MjU4MDE5MjgsImlzcyI6Imh0dHBzOi8vc3NvLm9wZW5zaGlmdC5pby9hdXRoL3JlYWxtcy9mYWJyaWM4IiwianRpIjoiNGI2YTZkMjctZTM0Yi00YWRiLThhOTEtYTM4NWFjOGZhOGE0IiwibmFtZSI6Ik1pY2hhZWwgU3BheG1hbiIsIm5iZiI6MCwicHJlZmVycmVkX3VzZXJuYW1lIjoibXNwYXhtYW4iLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX0sImJyb2tlciI6eyJyb2xlcyI6WyJyZWFkLXRva2VuIl19fSwic2Vzc2lvbl9zdGF0ZSI6IjE4Zjg0MDRlLWY4NjQtNDdiZS1iNWNlLTQ3M2I1N2RmNzFjZiIsInN1YiI6IjIyYweJ9FhLTE0Y2QtNGIwYS1iZGVmLThmYjQyYjE4OGQ3NyIsInR5cCI6IkJlYXJlciJ9.Mkq-hF0PmHam8MnkMLnLnTtpcCK0vy1dESHxPXQdrn2vYSRFHgNPujI_pqhmCGu2ietHFKm5G-qjFUnbYMQZb1lOjxXwkxBxTfeli2C3Jc0aNEhYnDB__th2preo4XQT0DcdBo82gia41VLc@qmhr0yqbau-YjLkn0SLqJx8hg1FJt0QGLFLX9zeCUKWtujg2P5ZGqgYiwCWXdOpPc22PFi5WrbghorzCclOjCqaymGBiIELdJFVeRrLYWli5MKOQYpyFxJrsfogrCFUFin9wJjuqqBAQaHmtN2rYY-ql8pq63S2Zh396jQbETU1wcHQ6R8uDm5GXHOkj61Grn4gBg'
  };

  example02 = {
    label: 'Swagger JSON',
    // tslint:disable-next-line:max-line-length
    token: '{"swagger":"2.0","info":{"version":"1.0.0","title":"Swagger Petstore","description":"A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification","termsOfService":"http://swagger.io/terms/","contact":{"name":"Swagger API Team"},"license":{"name":"MIT"}},"host":"petstore.swagger.io","basePath":"/api","schemes":["http"],"consumes":["application/json"],"produces":["application/json"],"paths":{"/pets":{"get":{"description":"Returns all pets from the system that the user has access to","operationId":"findPets","produces":["application/json","application/xml","text/xml","text/html"],"parameters":[{"name":"tags","in":"query","description":"tags to filter by","required":false,"type":"array","items":{"type":"string"},"collectionFormat":"csv"},{"name":"limit","in":"query","description":"maximum number of results to return","required":false,"type":"integer","format":"int32"}],"responses":{"200":{"description":"pet response","schema":{"type":"array","items":{"$ref":"#/definitions/Pet"}}},"default":{"description":"unexpected error","schema":{"$ref":"#/definitions/ErrorModel"}}}},"post":{"description":"Creates a new pet in the store.  Duplicates are allowed","operationId":"addPet","produces":["application/json"],"parameters":[{"name":"pet","in":"body","description":"Pet to add to the store","required":true,"schema":{"$ref":"#/definitions/NewPet"}}],"responses":{"200":{"description":"pet response","schema":{"$ref":"#/definitions/Pet"}},"default":{"description":"unexpected error","schema":{"$ref":"#/definitions/ErrorModel"}}}}},"/pets/{id}":{"get":{"description":"Returns a user based on a single ID, if the user does not have access to the pet","operationId":"findPetById","produces":["application/json","application/xml","text/xml","text/html"],"parameters":[{"name":"id","in":"path","description":"ID of pet to fetch","required":true,"type":"integer","format":"int64"}],"responses":{"200":{"description":"pet response","schema":{"$ref":"#/definitions/Pet"}},"default":{"description":"unexpected error","schema":{"$ref":"#/definitions/ErrorModel"}}}},"delete":{"description":"deletes a single pet based on the ID supplied","operationId":"deletePet","parameters":[{"name":"id","in":"path","description":"ID of pet to delete","required":true,"type":"integer","format":"int64"}],"responses":{"204":{"description":"pet deleted"},"default":{"description":"unexpected error","schema":{"$ref":"#/definitions/ErrorModel"}}}}}},"definitions":{"Pet":{"type":"object","allOf":[{"$ref":"#/definitions/NewPet"},{"required":["id"],"properties":{"id":{"type":"integer","format":"int64"}}}]},"NewPet":{"type":"object","required":["name"],"properties":{"name":{"type":"string"},"tag":{"type":"string"}}},"ErrorModel":{"type":"object","required":["code","message"],"properties":{"code":{"type":"integer","format":"int32"},"message":{"type":"string"}}}}}',
    copyBtnTxt: 'Copy JSON'
  };

  example03 = {
    label: 'GraphQL Query',
    copyBtnTxt: 'Copy Query',
    token: 'query HeroNameAndFriends($episode: Episode) {hero(episode: $episode) {name friends {name}}}',
    tokenPanelOpen: true
  };

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notifications = this.notificationService.getNotifications();
  }

  notify(tokenLabel: string): void {
    this.notificationService.message(
      NotificationType.SUCCESS,
      null,
      'Query Copied!',
      false,
      null,
      null);
  }
}
