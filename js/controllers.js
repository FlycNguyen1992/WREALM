angular.module('app.controllers', ['ui.router'])

.controller("productCtrl", ['$scope', '$firebaseArray', '$stateParams', function ($scope, $firebaseArray, $stateParams) {
    var ref = new Firebase("https://scorching-inferno-3570.firebaseio.com/");
    var type = $stateParams.type;
    $scope.items = $firebaseArray(ref.orderByChild('type').equalTo(type));

    }])

.controller("detailCtrl", ['$scope', '$firebaseArray', '$stateParams', '$firebaseObject', '$timeout', function ($scope, $firebaseArray, $stateParams, $firebaseObject, $timeout) {
    var ref = new Firebase("https://scorching-inferno-3570.firebaseio.com/");
    //    window.scrollTo(0, 0);
    var id = $stateParams.id;
    $scope.items = {};
    var query = ref.orderByChild('id').equalTo(id);
    query.on('child_added', function (snapshot) {
        $timeout(function () {
            $scope.items = snapshot.val();
        }, 100);
    });


    var listitem = {};
    var listitem2 = [];
    ref.on('value', function (snapshot) {
        listitem = snapshot.val();
        var arr = $.map(listitem, function (el) {
            return el;
        })
        var t = 4;
        for (var i = 0; i < t; i++) {
            var it = arr[Math.floor(Math.random() * arr.length)];
            if (it.id == id) {
                if (i != 0) {
                    i--;
                } else {
                    t++;
                }
                arr.splice(i, 1);
            } else {
                listitem2.push(it);
                arr.splice(arr.indexOf(it), 1);
            }
        }
        $scope.relateitem = listitem2;
    })
	    }])

.controller('mainController', ['$window', '$scope', '$firebaseArray', '$ionicPopup', '$state','$ionicHistory', function ($window, $scope, $firebaseArray, $ionicPopup, $state,$ionicHistory) {

    $scope.showSearchbox = false;
    $scope.btnClickShow = function () {
        $scope.showSearchbox = !$scope.showSearchbox;
    };

    $scope.btnClickHide = function () {
        $scope.showSearchbox = !$scope.showSearchbox;
    };
    $scope.cart = [];
    //    $scope.search = {};
    $scope.numitem = 0;
    $scope.addItem = function (id) {

        var f = true;
        if ($scope.cart.indexOf(id) < 0) {
            for (var i = 0; i < $scope.cart.length; i++) {
                if (id.id == $scope.cart[i].id) {
                    f = false;
                }
            }
            if (f) {
                $scope.cart.push(id);
                $scope.numitem += 1;

                var alertPopup = $ionicPopup.alert({
                    title: 'Thank You!'
                    , template: 'Your order already send to cart'
                });
                
            }
        };
    };

    $scope.remove = function (id) {
        $scope.cart.splice($scope.cart.indexOf(id), 1);
        $scope.numitem -= 1;
    };


    $scope.totalprice = function (product) {
        var sum = 0;
        angular.forEach(product, function (t) {
            sum += (parseInt(t.price) * parseInt(t.quantity));
        });
        return sum;
    };


    $scope.showConfirm = function () {

        var confirmPopup = $ionicPopup.confirm({
            title: 'Complete Order'
            , template: 'Are you sure?'
        });

        confirmPopup.then(function (res) {
            if (res) {
                $scope.cart = [];
                $scope.numitem = 0;
                $ionicHistory.nextViewOptions({
                disableBack: true
                 }); 
                $state.go('menu.home');
//                setTimeout(function () {
//                    $window.location.reload();
//                }, 100);

            }
        });
    };

    //    $scope.showAlert = function() {
    //     var alertPopup = $ionicPopup.alert({
    //       title: 'Don\'t eat that!',
    //       template: 'It might taste good'
    //     });
    //     alertPopup.then(function(res) {
    //       console.log('Thank you for not eating my delicious ice cream cone');
    //     });
    //   };

}])

.controller("menuCtrl", ["$scope", function ($scope) {
    $scope.shownGroup = null;

    $scope.toggleGroup = function (group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function (group) {
        return $scope.shownGroup === group;
    };
    }])


.controller('galeryCtrl', function ($scope, $timeout, PhotoService) {
    $scope.items = [];
    $scope.newItems = [];
    $scope.noMoreItemsAvailable = false;

    PhotoService.GetFeed().then(function (items) {

        $scope.items = items.concat($scope.items);

    });

    $scope.doRefresh = function () {
        if ($scope.newItems.length > 0) {
            $scope.items = $scope.newItems.concat($scope.items);

            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');

            $scope.newItems = [];
        } else {
            PhotoService.GetNewPhotos().then(function (items) {

                          $scope.items = items;
//                $scope.items = items.concat($scope.items);


                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    };
    $scope.loadMore = function () {
        PhotoService.GetOldPhotos().then(function (items) {

            $scope.items = $scope.items.concat(items);

            $scope.$broadcast('scroll.infiniteScrollComplete');

            // an empty array indicates that there are no more items
            if (items.length === 0) {
                $scope.noMoreItemsAvailable = true;
            }

        });
    };

})

.controller("searchCtrl", ["$scope", "$firebaseArray", "$stateParams", function ($scope, $firebaseArray, $stateParams) {
    var ref = new Firebase("https://scorching-inferno-3570.firebaseio.com/");
    $scope.name = $stateParams.name;
    $scope.data = $firebaseArray(ref);
    }]);