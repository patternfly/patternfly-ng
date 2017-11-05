import {
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { Http, Response } from '@angular/http';

const hljs = require('highlight.js');
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (str: string, lang: string) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>';
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

@Component({
  selector: 'include-markdown',
  template: `
    <div [innerHTML]="templateContent"></div>
  `
})
export class IncludeMarkdownComponent implements OnInit {
  @Input('src') templateUrl: string;

  templateContent: string;

  constructor(private http: Http) {}

  ngOnInit() {
    this.http.get(this.templateUrl).subscribe((out: any) => {
      this.templateContent = md.render(out['_body']);
    });
  }
}
