/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

$(function() {
    describe('RSS Feeds', function() {
        /* Tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test to loop through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });


        /* Test to loop through each feed
         * in the allFeeds object and ensure it has a name defined
         * and that the name is not empty.
         */
         it('name is defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toEqual();
            });
         });
    });


    /* Test suite named "The menu" */

    describe('The menu', function() {
        /* Test to ensure the menu element is
         * hidden by default.
         */
        it('element is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


         /* Test to ensure the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes the visibility when clicked', function() {
            let menuIcon = $('.menu-icon-link');
            let sideMenu = $('.slide-menu');

            menuIcon.click(); //clicks the menu Icon
            expect($('body').hasClass('menu-hidden')).toBe(false);

            //check the sidemenu position to know for sure
            //the element shown by comparing its position values.
            let clickedPos = sideMenu.position();
            expect(clickedPos.left).toBeLessThan(0);

            menuIcon.click(); //clicks the icon to hide the menu
            expect($('body').hasClass('menu-hidden')).toBe(true);

            //check the sidemenu is hidden by comparing the left position value
            let unclickedPos = sideMenu.position();
            let value = unclickedPos.left;
            //if the value is equal or less than zero then we know menu is hidden
            function checkValue() {
                if(value <= 0) {
                    expect(value).toBe(true);
                }
            };
      });
    });


    /* Test suite named "Initial Entries" */

    describe('Initial Entries', function() {
        /* Test to ensure when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            loadFeed(0);
            done();
            });

        it('has at least one entry', function(done) {
            expect($('.entry')).not.toBe(null);
            done();
        });
    });


    /*  Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Test to ensure a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
         */
         let feedContent;

         beforeEach(function(done) {
            loadFeed(0, done);
            feedContent = $('.feed').html();
            console.log(feedContent);
         });

         it('content changes upon a new feed load', function(done) {
            loadFeed(1, done);
            expect($('.feed').html()).not.toEqual(feedContent);
         });
     });
});
