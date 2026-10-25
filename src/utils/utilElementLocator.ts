import { expect, Locator, Page } from '@playwright/test';
import { createLogger, type Logger } from './logger';

const DEFAULT_ACTION_TIMEOUT_MS = 15000;

export type Flex = string | Locator;


export class UtilElementLocator {
    private readonly page: Page;
    private readonly log: Logger;

    constructor(page: Page, scope: string = 'UtilElementLocator') {
        this.page = page;
        this.log = createLogger(scope);
    }

    private toLocator(target: Flex): Locator {
        return typeof target === 'string' ? this.page.locator(target) : target;
    }

    private describe(target: Flex): string {
        return typeof target === 'string' ? target : target.toString();
    }

    async click(target: Flex, timeout: number = DEFAULT_ACTION_TIMEOUT_MS): Promise<void> {
        const loc = this.toLocator(target);
        this.log.info(`clicking ${this.describe(target)}`);
        await loc.click({ timeout });
    }
}