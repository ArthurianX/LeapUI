(function ($) {
    /**
    * Created by anemes on 3/14/14.
    */
    google.load("feeds", "1");

    // Our callback function, for when a feed is loaded.
    function feedLoaded(result) {
        if (!result.error) {
            var query = result.query.split(' ');
            var category = query[1];
            var site = query[0].split(':');
            for (var i = 0; i < result.entries.length; i++) {
                var entry = result.entries[i];
                var html = '<div class="'+ category + ' ' + site[1] + '">';
                html += '<h2>' + entry.title + '</h2>';
                html += '<p>' + entry.contentSnippet + '</p>' + '</div>';
                $('#view-' + category).append(html);
            }
        }

    }

    function OnLoad() {
        var categories = ['politics', 'sports', 'technology', 'business', 'entertainment', 'travel'];
        var sites = ['site:cnn.com', "site:digg.com"];
        for (var i = 0; i < categories.length; i++) {
            for (var j = 0; j < sites.length; j++){
                google.feeds.findFeeds(sites[j] + ' ' + categories[i], feedLoaded);
            }
        }
    }

    google.setOnLoadCallback(OnLoad);
})(jQuery);