/*
 Module: history.js
 Description: Gets and sets users reading history
 */
define([
    'lodash/objects/assign',
    'lodash/collections/map',
    'lodash/collections/sortBy',
    'common/utils/storage',

], function(
    _assign,
    _map,
    _sortBy,
    storage
    ) {

    var HistoryItem = function (item) {
        this.id = item.id;
        this.timestamp = Date.now();
        _assign(this, item.meta);
        return this;
    };

    var History = function (config) {
        this.config = _assign(this.DEFAULTS, config);
        return this;
    };

    History.prototype.DEFAULTS = {
        storageKey: 'gu.history',
        maxSize: 100
    };

    History.prototype.set = function (data) {
        return storage.local.set(this.config.storageKey, data);
    };

    History.prototype.get = function () {
        var hist = storage.local.get(this.config.storageKey);
        return (hist === null) ? [] : hist;
    };

    History.prototype.getSize = function () {
        return this.get().length;
    };

    History.prototype.contains = function (id) {
        return this.get().some(function (el) {
            return el.id === id;
        });
    };

    History.prototype.capToSize = function (desiredSize) {
        var arr = this.get();
        if (arr.length > desiredSize) {
            arr.length = desiredSize;
        }
        return arr;
    };

    History.prototype.log = function (item) {
        var hist = this.capToSize(this.config.maxSize - 1),
            newItem = new HistoryItem(item);

        hist.unshift(newItem);
        this.set(hist);
    };

    History.prototype.recentVisits = function () {
        var json = this.get()
        var sorted = _sortBy(this.get(), 'timestamp').reverse()

        var curr_timestamp = sorted[0].timestamp, session_array = [], a_month_ago = new Date(Date.now());
        a_month_ago.setMonth(a_month_ago.getMonth() - 1);

        sorted.map(function (i) {
            function diffInMins() {
                var diff = (parseInt(curr_timestamp) - parseInt(i.timestamp))
                return Math.ceil(diff / 1000 / 60);
            }

            if (diffInMins() >= 30) {
                session_array.push(i.timestamp)
            }
            curr_timestamp = i.timestamp
        });

        return session_array;
    };

    History.prototype.hasVisitedInPeriodSince = function (date, limit) {

        var check = 0, sessions_in_last_month = 0, aMonthAgoInMillis = date.getTime, sessions = this.recentVisits()

        while (check < sessions.length) {
            if (sessions_in_last_month < limit && sessions[check] < aMonthAgoInMillis)
                return true;
            else {
                sessions_in_last_month++;
            }
            check++;
        }
        return false;
    };

    return History;
});
