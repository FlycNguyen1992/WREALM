angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  .state('menu.home', {
    url: '/home',
    
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        
      }
    }
  })

  .state('menu.cart', {
    url: '/cart',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cart.html',
        
      }
    }
  })
  
  .state('menu.checkout', {
    url: '/checkout',
    views: {
      'side-menu21': {
        templateUrl: 'templates/checkout.html',
        
      }
    }
  })

  .state('menu.product', {
    url: '/product/:type',
    views: {
      'side-menu21': {
        templateUrl: 'templates/bag.html',
        controller: 'bagCtrl'
      }
    }
  })

  .state('menu.detail', {
    url: '/detail/:id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/detail.html',
        controller: 'detailCtrl'
      }
    }
  })
  
  .state('menu.search', {
      url: '/search/:name',
      views: {
        'side-menu21': {
          templateUrl: 'templates/search.html',
          controller: 'searchCtrl'
        }
      }
    })
  

  .state('menu', {
    url: '/side-menu21',
      
    templateUrl: 'templates/menu.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/side-menu21/home')

  

});