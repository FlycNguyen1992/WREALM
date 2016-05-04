angular.module('app.controllers', ['ui.router'])

.controller("bagCtrl", ['$scope', '$firebaseArray', '$stateParams', function ($scope, $firebaseArray, $stateParams) {
    var ref = new Firebase("https://scorching-inferno-3570.firebaseio.com/");
    var type = $stateParams.type;
    $scope.items = $firebaseArray(ref.orderByChild('type').equalTo(type));

    }])

.controller("detailCtrl", ['$scope', '$firebaseArray', '$stateParams', function ($scope, $firebaseArray, $stateParams) {
    var ref = new Firebase("https://scorching-inferno-3570.firebaseio.com/");
    //    window.scrollTo(0, 0);
    var id = $stateParams.id;
    $scope.items = $firebaseArray(ref.orderByChild('id').equalTo(id));
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

.controller('mainController', ['$window', '$scope', '$firebaseArray', '$ionicPopup', '$state', function ($window, $scope, $firebaseArray, $ionicPopup, $state) {
    //    var _selected;
    //    $scope.selected = undefined;
    //    var ref = new Firebase("https://scorching-inferno-3570.firebaseio.com/");
    //    $scope.statesWithFlags = $firebaseArray(ref);
    //    $scope.enter = function (id) {
    //        $window.location.href = '/index.html#/side-menu21/detail/' + id.id;
    //    }


    //    $scope.scrolltop = function () {
    //        window.scrollTo(0, 0);
    //    }
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
//                $scope.numitem =0;
//                $scope.cart = [];
                $state.go('menu.home');
                $window.location.reload();
            } else {

            }
        });

    };

    //    $scope.reloadRoute = function() {
    //         $window.location.href = '/index.html#/side-menu21/home';
    //    $window.location.reload();
    //       
    //};


}])

.controller("searchCtrl", ["$scope", "$firebaseArray", "$stateParams", function ($scope, $firebaseArray, $stateParams) {
    var ref = new Firebase("https://scorching-inferno-3570.firebaseio.com/");
    $scope.name = $stateParams.name;
    $scope.data = $firebaseArray(ref);
    }]);