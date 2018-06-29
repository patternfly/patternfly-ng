import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';
import { CopyService } from '../copy-service/copy.service';
import { InlineCopyComponent } from './inline-copy.component';
var InlineCopyModule = /** @class */ (function () {
    function InlineCopyModule() {
    }
    InlineCopyModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        TooltipModule.forRoot()
                    ],
                    declarations: [
                        InlineCopyComponent
                    ],
                    exports: [InlineCopyComponent],
                    providers: [CopyService, TooltipConfig]
                },] },
    ];
    /** @nocollapse */
    InlineCopyModule.ctorParameters = function () { return []; };
    return InlineCopyModule;
}());
export { InlineCopyModule };
//# sourceMappingURL=inline-copy.module.js.map