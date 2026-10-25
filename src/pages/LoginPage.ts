import { expect, Locator, Page } from '@playwright/test';
import 'dotenv/config';
import { basePage } from './BasePage';
import { UtilElementLocator } from '../utils/utilElementLocator';
import { createLogger, type Logger } from '../utils/logger';

export class LoginPage extends basePage {


    readonly user: string = process.env.USERNAME ?? '';
    readonly pass: string = process.env.PASSWORD ?? '';

    // Locators
    readonly page: Page;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginBTN: Locator;
    readonly loginLabel: Locator;
    readonly log: Logger;

    // Page Actions
    constructor(page: Page) {

        super(page, 'Login');
        this.page = page;
        this.loginLabel = page.locator("//h5[text()='Login']");
        this.userName = page.locator("//input[@name='username']");
        this.password = page.locator("//input[@name='password']");
        this.loginBTN = page.locator("//button[@type='submit']");
        this.log = createLogger("Login Page");


    }

    async loginToApp() {

        const util = new UtilElementLocator(this.page);

        await this.log.info("Filling username password.");
        await this.userName.fill(this.user);
        await this.password.fill(this.pass);
        //await this.loginBTN.click();
        await util.click(this.loginBTN);
        await this.log.info("waiting for loadstate...");
        await this.page.waitForLoadState("load");

    }



}
