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
        $('#changeTheme').attr('href','css/' + $(this).attr('value') + 'Build.css');
    }
});
