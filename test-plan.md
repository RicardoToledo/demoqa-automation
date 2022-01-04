
# Test plan

- [Test scope](#test-scope)
  * [Objective](#objective)
  * [Approach and selection](#approach-and-selection)
  * [Priority](#priority)
    + [Determining priority level](#determining-priority-level)
  * [Test scope by pages](#test-scope-by-pages)
- [Test Suite](#test-suite)
- [Test deliverables](#test-deliverables)
  * [Found bugs](#found-bugs)
- [Improvements / Next steps](#improvements---next-steps)
  
## Test scope

### Objective


The first thing I did was to assess and organize the webpage into pages and modules, each page was listed on the home page and when entering one of them a list of modules would be shown, having this first assessment of the web page ( and 33 pages in total) the first question was what's the objective of testing this page? or what am I trying to achieve?

Considering having different types of testing such as performance, compatibility, security, etc I concluded the best fit for the assignment and objective should be to have a functional test based on the independent modules the webpage has, also this is in the end, a UI test assignment.

### Approach and selection

> What you used to select the scenarios, what was your approach?

When designing the test scenarios that would be subsequently automated I considered looking at the assignment from three different perspectives: the one from the business, the user, and the challenge.

- From the business perspective we care about the product/service we're offering that will generate growth (monetary, reputation, users base, etc) and we want to be sure this is not affected. For example, in the case of demoqa.com's business perspective, the purpose of the site is not only to practice automation skills but also to advertise their online courses.
- The user needs to be engaged to stay in the site, use it and buy from us, **we need to be sure that the site is functional** and easy to use, and so both sides benefit.
- The challenge should prove not only my ability to handle real case scenarios but also my technical skills and potential.

Having these perspectives the criteria to select test scenarios was:
- Design test scenarios that would add value from these perspectives, for example:
	- Scenarios that could show how I handle real life challenges, e.g. bookstore application.
	- Selected scenarios that could show technical skills for specific or not that common automation situations, e.g. Elements or Widgets pages.
- 100% automation coverage of the site makes no sense as there’s no point in showing I can automate the most simple things.
- At minimum the positive test scenarios with some negative or edge cases for more important modules.

### Priority

> - You have listed the most important scenarios to automate (minimal 3 API and 3 Web)
> - Why are they the most important?

#### Determining priority level

To decide the priority of the scenarios I was making the question "from what perspective is this test scenario important?", to show this I created this table where you can see this process.

| Page and its modules/Perspective | Business | User | Challenge
|--|:--:|:--:|:--:|
| Home page | [x] | [x] | [x] |
| Business | [x] | [x] | [x] |
| Elements | [ ] | [ ] | [x] |
| Forms | [ ] | [x] | [x] |
| Alerts, Frame & Windows | [ ] | [ ] | [x] |
| Widgets | [ ] | [ ] | [x] |

Number of checks = priority
3 = High
2 = Medium
1 = Low

**Answer:** Using the previous table I concluded the more important scenarios to automate were the ones in these two pages:

- **Home page**: Because this is a very important page in all websites for several reasons, it's the first contact the user has with the site and it will be greatly responsible for user engagement, it should lead the user to where he (or we) want him to go, it shows the "face of the company" (reputation it's important), and more other factors.
For example, in the case of demoqa.com's business perspective, this is not only a page where all the modules are listed but also contains a banner for their online courses ( so the goal of the site is also to buy courses from them)
- **Book store Application**: This module is the closest to a real scenario in all demoqa.com, it has some of the basic features of any e-commerce such as a login, a store, a cart (in this case a "book collection"), also I know spriteCloud has some clients from the e-commerce sector or using an e-commerce solution.

Having a total of 10 high priority test scenarios.

### Test scope by pages

| Page and modules | Description |
| ----- | --------- |
| **Homepage** | Home page of demoqa.com, shows list of applications |
| **Elements** |
| - Broken Links - Images | Examples of correct and broken images |
| **Forms** |
| - Practice Form | Form containing different elements |
| **Alerts, Frame & Windows** |
| - Alerts | Examples of alerts which can be triggered and handled |
| **Widgets** |
| - Slider | A draggable slider bar |
| **Book Store Application** |
| - Register to Book Store | Registration page for new book store users using reCAPTCHA |
| - Login | Login page for book store users |
| - Book store | Book store page showing available books and a search bar |

## Test Suite

| Page                              | Fixture                                          | Test Scenario ID | Test Scenario                                                                                        | Priority | Status  |
| --------------------------------- | ------------------------------------------------ | ---------------- | ---------------------------------------------------------------------------------------------------- | -------- | ------- |
| Homepage                          | Home page: Verification of elements              | TS.01            | All home page elements correctly load                                                                | High     | Passed  |
|                                   |                                                  | TS.02            | Header and Banner links/href properties point to the correct url                                     | High     | Passed  |
|                                   |                                                  | TS.03            | All category cards successfully redirect to each respective page                                     | High     | Passed  |
| Elements                          | Elements: Verification of images                 | TS.04            | Verify valid image correctly displays and has the expected URL                                       | Low      | Passed  |
|                                   |                                                  | TS.05            | Verify broken image does not render even having the expected URL                                     | Low      | Passed  |
| Forms - Practice Form             | Practice Form: Student registration form filling | TS.06            | Succesfully register a valid student with random data                                                | Medium   | Passed  |
| Alerts, Frame & Windows - Alerts  | Alerts: Check correct handle of alerts           | TS.07            | Successfully trigger and handle standard alert                                                       | Low      | Passed  |
|                                   |                                                  | TS.08            | Successfully trigger and handle 5 secods timed standard alert                                        | Low      | Passed  |
|                                   |                                                  | TS.09            | Successfully trigger and handle confirmation alert                                                   | Low      | Passed  |
|                                   |                                                  | TS.10            | Successfully trigger prompt alert and introduce random name                                          | Low      | Passed  |
| Alerts, Frame & Windows - Widgets | Widgets: Interaction with widgets                | TS.11            | Succesfully drag slider from default to random value (0-100)                                         | Low      | Passed  |
| Book Store Application            | Book Store Application: Adding books             | TS.12            | Successfully add 1 random book to user's collection and remove all books from it                     | High     | Passed  |
|                                   |                                                  | TS.13            | Successfully add all books to user's collection and remove them from it                              | Medium   | Passed  |
|                                   | Book Store Application: Search book              | TS.14            | Successfully shows correct random book using incomplete name (first two words of title) in searchbar | High     | Passed  |
|                                   |                                                  | TS.15            | Successfully shows no book using word not related no any book title in searchbar                     | Low      | Passed  |
| Book Store Application - Register | Book Store Application: Register user            | TS.16            | Succesfully register valid user using reCAPTCHA                                                      | High     | Skipped |
|                                   |                                                  | TS.17            | Attempt to register user using reCAPTCHA and invalid password (pasword length < 8)                   | High     | Skipped |
|                                   |                                                  | TS.18            | Attempt to register valid user without reCAPTCHA                                                     | High     | Passed  |
| Book Store Application - Login    | Book Store Application: Login                    | TS.19            | Successfully login with registered user and logout                                                   | High     | Passed  |
|                                   |                                                  | TS.20            | Attempt to login with unregistered user                                                              | High     | Passed  |

## Test deliverables

| Title | Description |
| ------ | ------- |
| Test repository | A repository containing the code, scripts and documentation necessary to run the tests |
| Test plan | Document containing test scope, approach, and test suite |

### Found bugs

- ‘space’ char allowed as userName in Register User page

## Improvements / Next steps

> What could be the next steps to your project

Adding these features:
-   Data-driven testing from defined data sets
    -   Use of roles for different users will also add concurrency capabilities
-   Add [screenshots](https://testcafe.io/documentation/402638/reference/configuration-file#screenshots) on failure or even video of the whole test suite
-   Increase coverage in some pages, for examples:
    -   Bookstore - Search bar, for example, a "Correctly shows all books that share a word"
    -   Form - Verify elements in modal with generated variables, also DDT and use of roles would be useful here.
-   [Metadata and Filtering](https://testcafe.io/documentation/403436/guides/advanced-guides/metadata-and-filtering) for fixtures or tests, some useful filtering cases are:
    -   By priority
    -   By test suite/type: Smoke, Regression, by module, etc
   - Ongoing code maintenance to keep it clean and scalable.
