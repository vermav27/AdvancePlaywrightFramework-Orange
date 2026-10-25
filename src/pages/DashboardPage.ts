import { Page, expect, Locator } from '@playwright/test';
import { createLogger, type Logger } from '../utils/logger';

export class dashBoard {

    readonly page: Page;
    readonly dashboardLabel: Locator;
    readonly log: Logger;

    constructor(page: Page) {

        this.page = page;
        this.dashboardLabel = page.locator("//h6[contains(@class,'oxd-topbar-header')]");
        this.log = createLogger("DashBoard Page");

    }

    // Actions
    async verifyUserSuccessfullyLoggedIn() {

        await this.log.info("Waiting for dashboard lable to be visible.")
        await expect(this.dashboardLabel).toBeVisible();
        await this.log.info("Dashboard label now visible");

    }

}