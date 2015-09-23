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
                    $('div#main-body').load('/articles');
                }
            });

            CommonUtilities.bindEvent({
                selector : $('a#DownloadsTab'),
                eventType : 'click',
                callback : function(){
                    $('div#main-body').load('/downloads');
                }
            });
        }
    };

    return new func();
})();

commonUtil.bindNavigationEvents();