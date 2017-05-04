(function() {
    const log       = require("ko/logging").getLogger("commando-scope-projects")
    const {Cc, Ci}  = require("chrome");
    const commando  = require('commando/commando');

    //log.setLevel(require("ko/logging").LOG_DEBUG);

    this.onSearch = function(query, uuid, onComplete)
    {
        var prefs = require("ko/prefs"); // chrome/komodo/content/sdk
        var ioFile = require("sdk/io/file"); // https://developer.mozilla.org/en-US/Add-ons/SDK
        
        log.debug(uuid + " - Starting Scoped Search");
        
        // Get the most recently used projects, to use more projects increase
        // mruProjectSize, eg. require(")
        var projects = prefs.getPref('mruProjectList');
        if ( ! projects) return;
        
        var results = [];
        // Iterate over projects
        for (let x=0;x<projects.length;x++)
        {
            var uri = projects.getString(x)
            var path = ko.uriparse.URIToPath(uri);
            
            results.push({
                id: uri,
                name: ioFile.basename(path),
                description: ioFile.dirname(path),
                icon: "koicon://ko-svg/chrome/icomoon/skin/box.svg?size=14",
                classList: 'small-icon',
                scope: "scope-projects",
                allowMultiSelect: false
            });
        }

        // Split query into words
        query = query.toLowerCase();
        var words = query.split(" ");
        
        // Filter out empty word entries.
        words = words.filter(function(w) !!w);
        if (words)
        {
            results = results.filter(function(result)
            {
                var text = (result.description + result.name).toLowerCase();
                if (words.every(function(w) text.indexOf(w) != -1))
                {
                    return true;
                }
                return false;
            });
        }

        // Return results to commando
        if (results.length)
            commando.renderResults(results, uuid);

        // Let commando know we're done
        onComplete();
    }

    this.onSelectResult = function(selectedItems)
    {
        log.debug("Invoking Project");
        
        // Open the first selected item
        var selected = selectedItems.slice(0,1)[0];
        ko.projects.open(selected.resultData.id);

        // Close Commando, we don't need it anymore
        commando.hide();
    }

}).apply(module.exports);
