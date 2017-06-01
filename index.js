var app = angular.module('app',['ui.router']);
var storageKey = 'store';

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('overview', {
            url: "/overview",
            templateUrl: 'overview.html'
        })
        .state('home', {
            url: "/home"
        });

    $urlRouterProvider.otherwise('/overview');
});

app.controller('appController', function ($scope, $window) {

    $scope.items = restoreItems();
    $scope.activeItem = $scope.items[0];

    $scope.newItemName = '';
    $scope.newComment = '';


    $scope.addItem = function(name) {
        if (!name) return;

        var item = {
            name: name,
            comments: []
        };

        $scope.items.push(item);
        $scope.activeItem = item;
        $scope.newItemName = '';
        storeItems();
    };

    $scope.deleteItem = function(item) {
        var itemIndex = $scope.items.indexOf(item);
        $scope.items.splice(itemIndex, 1);
        storeItems();

        if ($scope.items.length > 0) {
            $scope.activeItem = $scope.items[$scope.items.length-1];
        } else {
            delete $scope.activeItem;
        }
    };

    $scope.selectItem = function(item) {
        $scope.activeItem = item;
    };

    $scope.addComment = function(item, comment) {
        item.comments.push(comment);
        $scope.newComment = '';
        storeItems();
    };

    function storeItems() {
        var data = JSON.stringify($scope.items);
        $window.localStorage.setItem(storageKey, data);
    }

    function restoreItems() {
        var data = $window.localStorage.getItem(storageKey);
        return data ?
            JSON.parse(data) :
            [];
    }
});


// css hierarchy
// css class hames: btn-add, border-order