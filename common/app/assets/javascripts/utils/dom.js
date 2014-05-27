define([
    'qwery',
    'common/utils/context'
], function(
    qwery,
    context
) {

return function(s, c) {
    return qwery(s, c||context());
};

});