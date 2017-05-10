(function ($) {
    $.extend({
        fixTableHeader: function (option) {
            var defaultConfig = { containerSelector: '.fixTable', tabHeaderCss: { 'background-color': 'rgba(200,200,200,1)' } };
            if (option == undefined) {
                option = defaultConfig
            }
            else {
                if (typeof option.containerSelector != 'string') {
                    option.containerSelector = defaultConfig.containerSelector;
                }
                if (typeof option.tabHeaderCss != 'object') {
                    option.tabHeaderCss = defaultConfig.tabHeaderCss;
                }
            }

            var headerContainer = $(option.containerSelector + ' table tr:first');
            headerContainer.css({ 'position': 'fixed', 'top': '-1px' });
            var headerItems = headerContainer.children();
            var lastContainer = $(option.containerSelector + ' table tr:last');
            var tds = lastContainer.children();
            headerContainer.css(option.tabHeaderCss);
            tds.each(function (i, e) {
                $(headerItems.get(i)).css({ 'width': $(e).css('width') });
            });
            $(option.containerSelector + ' table tr:nth(1)').children('td').css({ 'padding-top': headerContainer.css('height') });

            $(document).scroll(function (e) {
                var distance = $(option.containerSelector).height() - e.target.scrollingElement.scrollTop - headerContainer.height() - lastContainer.height();
                if (distance <= 0) {
                    headerContainer.css({ 'position': 'static' });
                }
                else {
                    if (headerContainer.css('position') != 'fixed') {
                        headerContainer.css({ 'position': 'fixed' });
                    }
                }
            });
        }
    });
}(jQuery))
