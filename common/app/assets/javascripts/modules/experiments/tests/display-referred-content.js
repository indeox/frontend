define([
    'common/modules/onward/most-popular-component-factory',
    'common/modules/onward/history'
], function (
    Factory,
    History
    ) {

    var DisplayReferredContent = function() {

        var self = this;

        this.id = 'DisplayReferredContent';
        this.start = '2014=06-03';
        this.expiry = '2014-06-17';
        this.description = 'Will display content referred from social media to users who have visited less than 10 times in the previous month';
        this.audience = '0.4';
        this.audienceOffset = '0.6';

        this.canRun = function() { return true; }

        this.variants = [
            {
                id: 'control',
                test: function() {}
            },
            {
                id: 'show-referred-content',
                test: function() {
                    var date = Date.now;
                    date.setMonth(date.getMonth()-1);
                    console.log("++ Checking number of visits this month");
                    if( new History().hasVisitedInPeriodSince(date, 10)) {
                        console.log("++ Showing referred");
                        Factory.setShowReferred();
                    }
                }
            }
        ];
    };

    return DisplayReferredContent;

});