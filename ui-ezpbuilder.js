'use strict';
/**
 * creates a EZP Builder
 */
angular.module('ui.ezpbuilder', []).directive('uiEzpbuilder', ['$window',
    function ($window) {
        return {
            restrict: 'AE',
            replace: 'true',
            require: 'ngModel',
            scope: {
                config: '=ngModel'
            },
            link: function(scope, elem, attrs) {

                var loadScript = function(protocol, domain, deploymentKey) {

                    // set domain to default if it is not specified
                    var builderDomain = typeof domain === 'string' && domain.length > 0 ? domain : 'apps.ezprints.com';

                    var builderProtocol = typeof protocol === 'string' && protocol.length > 0 ? (protocol + ':') : ''
                    // create source url
                    var srcUrl = builderProtocol + '//' + builderDomain + '/home/' + deploymentKey + '.ezp?loadType=append';

                    // add the new version
                    $('<script id="ezpBuilderScriptTag" src="' + srcUrl + '"> </script>').appendTo(elem);
                };

                var loadBuilderWhenReady = function() {

                    if ($window.ezp && scope.config)
                    {
                        elem.attr('id', scope.config.elementId);
                        $window[scope.config.apiHook] = window.ezp.apps.launchBuilder(scope.config);
                    }
                    else
                    {
                        setTimeout(loadBuilderWhenReady, 10);
                    }
                };

                elem.empty();
                delete $window[scope.config.apiHook];
                delete $window.ezp;
                loadScript(attrs.protocol, attrs.domain, attrs.deploymentkey);
                loadBuilderWhenReady();
            }
        };
    }
]);