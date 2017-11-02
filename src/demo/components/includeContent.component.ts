import {
  Component, Input, ViewContainerRef, OnInit, ViewChild
} from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'include-content',
  template: `
    <h1>{{page}}</h1>
    <pre><code>{{templateContent}}</code></pre>`
})
export class IncludeContentComponent implements OnInit {
  @Input() src: string;

  page: string;
  templateUrl: string;
  templateContent: string;

  constructor(private http: Http) {}

  ngOnInit() {
    this.http.get(this.templateUrl).subscribe((out: any) => {
      this.templateContent = out['_body'];
      this.page = out.url.slice(out.url.lastIndexOf('/') + 1, out.url.length);
    });
  }
}
