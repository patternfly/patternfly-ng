import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';
import { CopyService } from '../copy-service/copy.service';
import { BlockCopyComponent } from './block-copy.component';
var BlockCopyModule = /** @class */ (function () {
    function BlockCopyModule() {
    }
    BlockCopyModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        TooltipModule.forRoot()
                    ],
                    declarations: [
                        BlockCopyComponent
                    ],
                    exports: [BlockCopyComponent],
                    providers: [CopyService, TooltipConfig]
                },] },
    ];
    /** @nocollapse */
    BlockCopyModule.ctorParameters = function () { return []; };
    return BlockCopyModule;
}());
export { BlockCopyModule };
//# sourceMappingURL=block-copy.module.js.map