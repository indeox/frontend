define([
    'common/common',
    'common/modules/analytics/register',
    'common/modules/ui/images',
    'lodash/objects/assign',
    'common/modules/component'
    ], function(
        common,
        register,
        images,
        extend,
        Component
){
    function SocialBurners(config, context) {
        register.begin('series-content');
        this.config = extend(this.config, config);
        this.context = context;
        this.endpoint = '/most-referred.json';

        this.fetch(this.context, 'html');
    }

    Component.define(SocialBurners);

    SocialBurners.prototype.ready = function() {
        images.upgrade(this.context);
        register.end('series-content');
    };

    SocialBurners.prototype.error = function() {
        common.mediator.emit('modules:error', 'Failed to load social burner content on page: ' + this.config.page.pageId + 'common/modules/onwards/related.js');
        register.error('series-content');
    };


    return SocialBurners;
});