import { test, expect } from '@playwright/test';

/*
    Akun untuk test:
    Username: akuntest1
    Email: assemblrtes@gmail.com
    Password: assemblrtest1
*/

test.describe('Positive Login Test Case', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://studio.assemblrworld.com/explore?login=true');
        await page.waitForTimeout(3000);
    });
    
    test('Login with Valid Username & Password', async ({page}) => {
        await page.getByLabel('Email or Username*').fill('akuntest1');
        await page.getByLabel('Password*').fill('assemblrtest1');
        await page.locator('[class="Navbar_button__8PfXW Navbar_sign_in__Jcu0s"]').click();
    });

    test('Login with Valid Email & Password', async ({page}) => {
        await page.getByLabel('Email or Username*').fill('assemblrtes@gmail.com');
        await page.getByLabel('Password*').fill('assemblrtest1');
        await page.locator('[class="Navbar_button__8PfXW Navbar_sign_in__Jcu0s"]').click();
    });

    test.afterEach(async ({page}) => {
        await page.locator('.Navbar_profile_section__50J4C').click();
        await page.getByText('Sign Out').click();
        await expect(page.getByText('Welcome to Assemblr Studio!')).toBeVisible();
    });
});

test.describe('Negative Login Test Case', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://studio.assemblrworld.com/explore?login=true');
        await page.waitForTimeout(5000);
    });

    test('Login with Invalid Username', async ({page}) => {
        await page.getByLabel('Email or Username*').fill('akun1');
        await page.getByLabel('Password*').fill('assemblrtest1');
        await page.locator('[class="Navbar_button__8PfXW Navbar_sign_in__Jcu0s"]').click();
        await expect(page.getByText('Username not found')).toBeVisible();
    });

    test('Login with Invalid Password', async ({page}) => {
        await page.getByLabel('Email or Username*').fill('akuntest1');
        await page.getByLabel('Password*').fill('wrongpassword');
        await page.locator('[class="Navbar_button__8PfXW Navbar_sign_in__Jcu0s"]').click();
        await expect(page.getByText('Wrong password')).toBeVisible();
    });
});