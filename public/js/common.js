var CommonUtilities = (function () {
    
    var _func = function () {
        this.bindEvent = function (obj) {
            if (!((obj.selector) && (obj.eventType) && (obj.callback))) {
                return;
            }
            obj.selector.off(obj.eventType).on(obj.eventType, obj.callback);
        },
        this.createPlugin = function ( name , optionObj ){
            if(!name) throw new nameNotSpecifiedException().message;

            $.fn[name] = optionObj.pluginFunction;
        }
        this.registerError = function( name , message ){
           if( !name ){
                throw new Error('name for the custom error not specified!!!');
           }
            var customError = window[name] = function(){
                this.name = name;
                this.message = message;
            }
            customError.prototype = new Error();
            customError.prototype.constructor = customError;
        }
    };
    return new _func();
})();

CommonUtilities.registerError( 'nameNotSpecifiedException' , 'Name Not Specified' );
CommonUtilities.createPlugin('getInstance',{
    pluginFunction : function( pluginName ){
        if( !pluginName )
                throw new nameNotSpecifiedException().message;
        console.log(pluginName + 'Data');
        return $(this).data( pluginName + 'Data' );
    }
});

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
                        $('#editor').css({
                            'height' : '500px',
                            'width' : '500px'
                        }).htmlarea();  
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

;(function( $ , window , document , undefined){
    
    var listingPluginFunction = function( options ){
        return $.each(this,function(){
            var func = function(){}

            func.prototype = {
                options : options,
                init : function(){
                    console.log('tanha dil!!');
                }
            }   

            $(this).data('articleListingData') ||  $(this).data('articleListingData', new func());
        });
        
    }

    CommonUtilities.createPlugin('articleListing',{
        pluginFunction : listingPluginFunction
    });

})( jQuery , window , document );

commonUtil.bindNavigationEvents();