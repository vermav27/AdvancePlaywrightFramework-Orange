import { Page } from '@playwright/test';
import { UtilElementLocator } from '../utils/utilElementLocator';
import { createLogger, type Logger } from '../utils/logger';
import 'dotenv/config';

export class basePage {

    readonly page: Page;
    readonly el: UtilElementLocator;
    readonly log: Logger;

    constructor(page: Page, scope: string) {
        this.page = page;
        this.el = new UtilElementLocator(page, scope);
        this.log = createLogger(scope);
    }

    async goto() {

        this.log.info('Navigating to the application base URL');
        await this.page.goto('/');
        await this.page.waitForLoadState('load');
        this.log.debug(`Navigation completed: ${this.page.url()}`);

    }


}
