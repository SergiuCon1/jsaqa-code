let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.deleteCookie();
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("[class='octicon octicon-mark-github']");
    await firstLink.click();
    await page.waitForTimeout(1000);
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Where the world builds software · GitHub");
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = "[class='container-lg p-responsive'] .btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  });

  test("Title of the page 'Actions' is correct", async () => {
    await page.hover(".HeaderMenu-link");
    await page.click("[href='/features/actions'].HeaderMenu-dropdown-link");
    await page.waitForTimeout(1000);
    const title = await page.title();
    expect(title).toEqual("Features • GitHub Actions · GitHub");
  });

  test("Title of the page 'Packages' is correct", async () => {
    await page.hover(".HeaderMenu-link");
    await page.click("[href='/features/packages'].HeaderMenu-dropdown-link");
    await page.waitForTimeout(1000);
    const title = await page.title();
    expect(title).toEqual("GitHub Packages: Your packages, at home with their code · GitHub");
  });

  test("Title of the page 'Security' is correct", async () => {
    await page.hover(".HeaderMenu-link");
    await page.click("[href='/features/security'].HeaderMenu-dropdown-link");
    await page.waitForTimeout(1000);
    const title = await page.title();
    expect(title).toEqual("Features · Security · GitHub");
  })
});
