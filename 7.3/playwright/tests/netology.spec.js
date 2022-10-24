const { test, expect } = require ("@playwright/test");
const { validEmail, validPassword, invalidEmail, invalidPassword } = require ("../user.js");

test("Autorization with valid credentials", async ({page}) => {
    await page.goto("https://netology.ru");
    page.locator(".src-reallyShared-components-Header--login--_rpRT").click();
    await page.locator("form > div > [type='email']").type(validEmail);
    await page.locator("[type='password']").type(validPassword);
    page.locator("[data-testid='login-submit-btn']").click();
    const programsTitle = page.locator("[data-testid='profile-programs-content'] h2");
    await expect(page).toHaveURL("https://netology.ru/profile");
    await expect(programsTitle).toContainText("Мои курсы и профессии");
}),

test("Autorization with invalid credentials", async ({page}) => {
    await page.goto("https://netology.ru");
    page.click(".src-reallyShared-components-Header--login--_rpRT");
    await page.locator("form > div > [type='email']").type(invalidEmail);
    await page.locator("[type='password']").type(invalidPassword);
    page.locator("[data-testid='login-submit-btn']").click();
    const invalidEmailMessage = page.locator("[data-testid='login-error-hint']");
    await expect(invalidEmailMessage).toContainText('Вы ввели неправильно логин или пароль');
})