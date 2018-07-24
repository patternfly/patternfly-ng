/**
 * A config containing properties for wizard
 */
export declare class WizardConfig {
    /**
     * The text to display on the cancel button
     */
    cancelTitle?: string;
    /**
     * The height the wizard content should be set to. This is used only if the stepStyleClass is not given.
     * The default is 300px.
     */
    contentHeight?: string;
    /**
     * The current step can be changed externally - this is the title of the step to switch the wizard to
     */
    currentStep?: string;
    /**
     * Flag indicating that the wizard is done
     */
    done?: boolean;
    /**
     * Flag indicating that the wizard is embedded in a page (not a modal). This moves the navigation buttons to the left
     * hand side of the footer and removes the close button.
     */
    embedInPage?: boolean;
    /**
     * Flag indicating to hide the step indicators in the header of the wizard
     */
    hideIndicators?: boolean;
    /**
     * Flag indicating to hide page navigation sidebar on the wizard pages
     */
    hideSidebar?: boolean;
    /**
     * Flag indicating to hide the title bar. Default is false
     */
    hideHeader?: boolean;
    /**
     * Flag indicating to hide the back button, useful in 2 step wizards. Default is false
     */
    hidePreviousButton?: boolean;
    /**
     * The text displayed when the wizard is loading
     */
    loadingTitle?: string;
    /**
     * Secondary descriptive information to display when the wizard is loading
     */
    loadingSecondaryInfo?: string;
    /**
     * The text to display on the next button
     */
    nextTitle?: string;
    /**
     * The text to display on the back button
     */
    previousTitle?: string;
    /**
     * Flag indicating that the wizard is ready
     */
    ready?: boolean;
    /**
     * CSS class to be give to the sidebar panel. Only used if the stepClass is also provided
     */
    sidebarStyleClass?: string;
    /**
     * CSS class to be given to the steps page container. Used for the sidebar panel as well unless
     * sidebarStyleClass is provided
     */
    stepStyleClass?: string;
    /**
     * The wizard title displayed in the header
     */
    title: string;
}
