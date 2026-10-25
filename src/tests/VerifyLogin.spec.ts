import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { basePage } from '../pages/BasePage';
import { dashBoard } from '../pages/DashboardPage';

test.describe("Login page test", () => {

    test("Verify if login page is opening", async ({ page }) => {

        const login = new LoginPage(page);
        const base = new basePage(page, 'VerifyLogin');

        await base.goto();
        await expect(login.loginLabel).toBeVisible();

    })

    test("Verify user is successfully able to login", async ({ page }) => {

        const login = new LoginPage(page);
        const base = new basePage(page, 'VerifyLogin');
        const dash = new dashBoard(page);

        await test.step("Opening login page", async () => {
            await base.goto();
        })

        await test.step("Loggin into the app", async () => {
            await login.loginToApp();
        })

        await test.step("Verify user is successfully logged in.", async () => {
            await dash.verifyUserSuccessfullyLoggedIn();
        })

    })

})
