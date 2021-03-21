/**
 * Body Small - Directive to add body-small to body
 */
function bodySmall($window) {
    return {
        restrict: 'A',
        link: function(scope, element) {            
            angular.element($window).bind("resize", bodySmall);
            
            function bodySmall() {
            	if ($(window).width() < 769){
            		$('body').addClass('body-small')
            	} else {
            		$('body').removeClass('body-small')
            	}
            }  
            bodySmall();
        }
    };
}

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout, $window) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function(){                
                $(element).metisMenu({ toggle: true });                
            });
        }
    };
}

/**
 * minimalizaSidebar - Directive for minimalize sidebar
*/
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 200);
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 100);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
}

/**
 * ngIncludeNoCache - Directive for ng-include to not cache
 */
function ngIncludeNoCache($templateCache) {
	var directive = {
		restrict : 'A',
		scope : false,
		link : function(scope, element, attributes) {
			scope.$parent.$watch(attributes.ngInclude, function(newValue,oldValue) {
				$templateCache.remove(oldValue);
			});
		}
	};
	return directive;
}

/**
 * ngRepeatonFinishRender - Directive to emit event when repeat is finished rendering
 */
function ngRepeatonFinishRender($timeout, $parse){
	return {
	      restrict: 'A',
	      link: function (scope, element, attr) {
	          if (scope.$last === true) {
	              $timeout(function () {
	                  scope.$emit('ngRepeatFinished');
	              });
	          }
	      }
	}
}

function propertyInput() {
	return {
        restrict: 'E',
        replace: true,
        scope:{       
			label: '@',
			name: '@',
			tooltip: '@',
		},
        template: '<div class="input-group"><span class="input-group-addon">{{label}}<span ng-if="tooltip" class="fa fa-info-circle pull-right" data-toggle="tooltip" data-placement="top" title="{{tooltip}}"></span></span><input type="text" class="form-control" name="{{name}}" ng-model="$parent.mobilePropObj.getProperties()[name]"/></div>',
	};
}

function propertyCheckbox() {
	return {
        restrict: 'E',
        replace: true,
        scope:{           
			label: '@',
			name: '@',
			tooltip: '@',
		},
        template: '<div class="input-group"><span class="input-group-addon">{{label}}<span ng-if="tooltip" class="fa fa-info-circle pull-right" data-toggle="tooltip" data-placement="top" title="{{tooltip}}"></span></span><div class="form-control"><checkbox class="pull-right" name="{{name}}" ng-true-value="true" ng-false-value="false" ng-model="$parent.mobilePropObj.getProperties()[name]"></checkbox></div></div>',
	};
}	
/**
 * 
 * Pass all functions into module
 */
EZMaxMobile
	.directive('bodySmall', bodySmall)
    .directive('sideNavigation', sideNavigation)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('ng-include-no-cache', ngIncludeNoCache)
	.directive('onFinishRender', ngRepeatonFinishRender)
	.directive('propertyinput', propertyInput)
	.directive('propertycheckbox', propertyCheckbox);