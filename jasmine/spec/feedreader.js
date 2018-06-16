/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */

     //RSS Feeds test suite
    describe('RSS Feeds', function() {
        /* This test determines that the allFeeds variable
         * has been defined and that it is not empty.
         */
        it('all feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed and determines if it has
         * a URL defined and that the URL is not empty.
         */
        it('urls are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toEqual(jasmine.any(String));
                expect(feed.url).toBeTruthy();
            });
        });


        /* Loops through each feed and determines
         * it has a name defined and is not empty.
         */
        it('names are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).toEqual(jasmine.any(String));
                expect(feed.name).toBeTruthy();
            });
        });
    });

    // Test suite for menu
    describe('The menu', function() {

        /* Determines the menu element is hidden by default.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Tests that the menu changes visibility when the menu icon is
         * clicked. false = display, true = hidden.
         */
        it('changes visibility when the menu icon is clicked', function() {
            var menu = $('.menu-icon-link');
                menu.click();
                expect($('body').hasClass('menu-hidden')).toBe(false);
                menu.click();
                expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    //test suite for initial entries
    describe('Initial Entries', function() {

        // Before each test, load the first feed and wait for it to finish.
        beforeEach(function(done) {
          loadFeed(0, function() {
              done();
          });
        });

        // Tests if loadFeed function has at least one entry
        it('contains at least one entry', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });

    });

    //test suite for new feed selections
    describe('New Feed Selection', function() {

        /* Before each test, ensures that the new feed is
         * loaded by the asynchronous function.
         */
        var $firstFeed;
        var $secondFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.feed').html();
                done();
            });
        });

        it('changes feed content', function(done) {
            loadFeed(1, function() {
                secondFeed = $('.feed').html();
                expect(secondFeed).not.toEqual(firstFeed);
                done();
            });
        });
    });
}());
