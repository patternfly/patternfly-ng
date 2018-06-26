import { CopyBase } from '../copy-base';
import { CopyService } from '../copy-service/copy.service';
export declare class InlineCopyComponent extends CopyBase {
    protected copyService: CopyService;
    /**
     * The default constructor
     */
    constructor(copyService: CopyService);
    /**
     * Copies the copyBtnAriaLabel value to the users clipboard
     */
    copyToClipboard(): void;
}
