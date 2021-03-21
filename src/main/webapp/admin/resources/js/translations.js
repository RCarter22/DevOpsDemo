EZMaxMobile
    .config(function config($translateProvider) {

        $translateProvider
            .translations('en', {

                // Define all menu elements
                DASHBOARD: 'Dashboard',                
            })
            .translations('es', {

                // Define all menu elements
                DASHBOARD: 'Salpicadero',                
            });

        $translateProvider.preferredLanguage('en');

    });
