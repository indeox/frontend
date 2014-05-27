define([
    'bonzo',
    'qwery',
    'common/utils/context'
], function(
    bonzo,
    qwery,
    context
) {

function $(s, c) {
    return (typeof s === 'string') ? bonzo(qwery(s, c||context())) : bonzo(s, c||context());
}
$.create = function(s) {
    return bonzo(bonzo.create(s));
};
return $;

}); // define
