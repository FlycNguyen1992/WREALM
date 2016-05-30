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
      cache: false,
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
      cache: false,
    url: '/product/:type',
    views: {
      'side-menu21': {
        templateUrl: 'templates/product.html',
        controller: 'productCtrl'
      }
    }
  })

  .state('menu.detail', {
      cache: false,
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
  
   .state('menu.shop', {
      cache: false,
      url: '/shop',
      views: {
        'side-menu21': {
          templateUrl: 'templates/shop.html',
          
        }
      }
    })
  
   .state('menu.news', {
      cache: false,
      url: '/news',
      views: {
        'side-menu21': {
          templateUrl: 'templates/news.html',
          
        }
      }
    })
  
  .state('menu.galery', {
      cache: false,
      url: '/galery',
      views: {
        'side-menu21': {
          templateUrl: 'templates/galery.html',
            controller: 'galeryCtrl'
          
        }
      }
    })
  
  .state('menu.contact', {
      cache: false,
      url: '/contact',
      views: {
        'side-menu21': {
          templateUrl: 'templates/contact.html',
          
        }
      }
    })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl',
    abstract:true
  })

$urlRouterProvider.otherwise('/side-menu21/home')

  

});