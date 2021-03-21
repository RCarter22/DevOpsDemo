/**
 * EZMaxMobile - App
 */
 
var EZMaxMobile = angular.module('ezmaxmobile', [
    'ui.bootstrap',                 // UI Bootstrap
    'ui.checkbox',                  // UI Checkbox
    'pascalprecht.translate',       // Angular Translate
    'toastr',						// Toastr
    'ngAnimate',					// ngAnimate
    'ui.grid',
    'ui.grid.pagination',
    'ui.grid.autoResize',
    'ngclipboard',
    'ngBootstrap',
    'angularUtils.directives.dirPagination',
]);				


/**
 * EZMaxMobile - Config
 */
function config() {
	// Add any configuration items here
}

function toastrConfig(toastrConfig){
	angular.extend(toastrConfig, {
		autoDismiss: false,
		containerId: 'toast-container',
		maxOpened: 0,    
		newestOnTop: true,
		progressBar: true,
		positionClass: 'toast-top-right',
		preventDuplicates: false,
		preventOpenDuplicates: false,
		target: 'body'
	});
}

EZMaxMobile
    .config(config)
    .config(toastrConfig)
    .run(function($rootScope) {
        //$rootScope.$state = $state;
    });
