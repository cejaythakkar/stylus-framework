var CommonUtilities = (function () {
    
    var _func = function () {
        this.bindEvent = function (obj) {
            if (!((obj.selector) && (obj.eventType) && (obj.callback))) {
                return;
            }
            obj.selector.off(obj.eventType).on(obj.eventType, obj.callback);
        }
    };
    return new _func();
})();

CommonUtilities.bindEvent({
    selector : $('a.themeAnchor'),
    eventType : 'click',
    callback : function(){
        $('#changeTheme').attr('href','../css/' + $(this).attr('value') + 'Build.css');
    }
});
var commonUtil = (function(){
    function func(){}

    func.prototype = {
        bindNavigationEvents : function(){
            CommonUtilities.bindEvent({
                selector : $('a#ArticlesTab'),
                eventType : 'click',
                callback : function(){
                    $('div#article').load('/articles',function(){
                         CommonUtilities.bindEvent({
                            selector : $('#article-listing li a'),
                            eventType : 'click',
                            callback : function(){
                                $('div#article').load('/articles/' + $(this).attr('value'));
                            }
                        });            
                    });
                }
            });

            CommonUtilities.bindEvent({
                selector : $('a#DownloadsTab'),
                eventType : 'click',
                callback : function(){
                    $('div#article').load('/downloads');
                }
            });
        }
    };

    return new func();
})();

commonUtil.bindNavigationEvents();