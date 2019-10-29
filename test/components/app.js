/**
 * Test for getting started with Selenium.
 */
"use strict";



const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const By = require("selenium-webdriver").By;

let browser;


// Does not work with WSL!! Use cygwin



// Test Suite
test.describe("PamoCoin Pro", function() {

    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.firefox()).build();

        browser.get("https://pamocoin.pamo18.me");
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    // Test case
    test.it("Test index", function(done) {
        browser.sleep(2000);
        // Check correct title
        browser.getTitle().then(function(title) {
            assert.equal(title, "PamoCoin Pro");
        });

        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Trade");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith(""));
        });

        done();
    });

    test.it("Test go to about", function(done) {
        browser.sleep(2000);
        // Use nav link to go to home page
        browser.findElement(By.linkText("About")).then(function(element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "About");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("/about"));
        });

        done();
    });

    test.it("Test go to register", function(done) {
        browser.sleep(2000);
        // Use nav link to go to home page
        browser.findElement(By.linkText("Register")).then(function(element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Registration");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("/register"));
        });

        done();
    });

    test.it("Test login", function(done) {
        browser.sleep(2000);
        // Use nav link to go to home page
        browser.findElement(By.linkText("Login")).then(function(element) {
            element.click();
        });

        browser.findElement(By.name("name")).then(function(element) {
            element.sendKeys("doe");
        });

        browser.findElement(By.name("password")).then(function(element) {
            element.sendKeys("doe");
        });

        browser.sleep(1000);

        browser.findElement(By.name("login")).then(function(element) {
            element.click();
        });

        browser.sleep(3000);

        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Trade");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith(""));
        });

        done();
    });

    test.it("Test go to my wallet", function(done) {
        browser.sleep(2000);
        // Use nav link to go to home page
        browser.findElement(By.linkText("Login")).then(function(element) {
            element.click();
        });

        browser.findElement(By.name("name")).then(function(element) {
            element.sendKeys("doe");
        });

        browser.findElement(By.name("password")).then(function(element) {
            element.sendKeys("doe");
        });

        browser.sleep(1000);

        browser.findElement(By.name("login")).then(function(element) {
            element.click();
        });

        browser.sleep(3000);

        browser.findElement(By.linkText("My Wallet")).then(function(element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "My Wallet");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("/wallet"));
        });

        done();
    });

    test.it("Test go to my orders", function(done) {
        browser.sleep(2000);
        // Use nav link to go to home page
        browser.findElement(By.linkText("Login")).then(function(element) {
            element.click();
        });

        browser.findElement(By.name("name")).then(function(element) {
            element.sendKeys("doe");
        });

        browser.findElement(By.name("password")).then(function(element) {
            element.sendKeys("doe");
        });

        browser.sleep(1000);

        browser.findElement(By.name("login")).then(function(element) {
            element.click();
        });

        browser.sleep(3000);

        browser.findElement(By.linkText("My Orders")).then(function(element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "My Orders");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("/orders"));
        });

        done();
    });

    test.it("Test go to my profile", function(done) {
        browser.sleep(2000);
        // Use nav link to go to home page
        browser.findElement(By.linkText("Login")).then(function(element) {
            element.click();
        });

        browser.findElement(By.name("name")).then(function(element) {
            element.sendKeys("doe");
        });

        browser.findElement(By.name("password")).then(function(element) {
            element.sendKeys("doe");
        });

        browser.sleep(1000);

        browser.findElement(By.name("login")).then(function(element) {
            element.click();
        });

        browser.sleep(3000);

        browser.findElement(By.linkText("My Profile")).then(function(element) {
            element.click();
        });

        // Check correct heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "My Profile");
            });
        });

        // Check correct URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("/profile"));
        });

        done();
    });
});
