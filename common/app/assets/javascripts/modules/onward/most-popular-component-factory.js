define([
    'lodash/objects/assign',
    'common/modules/onward/popular',
    'common/modules/onward/social-burners'
], function(
    extend,
    Popular,
    SocialBurners
    ) {

    function MostPopularComponentFactory(context, config) {
        this.config = extend(this.config, config);
        this.context = context;
    }

    MostPopularComponentFactory.showReferredContent = false;

    MostPopularComponentFactory.setShowReferred = function() {
        MostPopularComponentFactory.showReferredContent = true
    };

    MostPopularComponentFactory.prototype.renderComponent = function() {
       if(MostPopularComponentFactory.showReferredContent) {
          new SocialBurners(config, qwery('.js-onward', this,context))
       } else {
           Popular(this.config, this.context)
       }
    };

    return MostPopularComponentFactory;

});