'use strict';
/**
 * creates a EZP Builder
 */
angular.module('ui.ezpbuilder', []).directive('uiEzpbuilder', [
    function () {
        return {
            restrict: 'AE',
            replace: 'true',
            require: 'ngModel',
            scope: {
                config: '=ngModel'
            },
            link: function(scope, elem, attrs) {

                var cg;

                scope.$watch('config', function(newValue) {
                    if (newValue)
                    {
                        cg = newValue;
                        elem.attr('id', cg.elementId);
                        loadBuilderWhenReady();
                    }
                }, true);


                var loadBuilderWhenReady = function() {

                    if (window.ezp && cg)
                    {
                        scope[cg.apiHook] = window.ezp.apps.createBuilder(cg);
                    }
                    else
                    {
                        setTimeout(loadBuilderWhenReady, 10);
                    }
                };
            }
        };
    }
]);