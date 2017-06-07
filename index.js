var app = angular.module('app',['ui.router']);
var storageKey = 'store';

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('overview', {
            url: "/overview",
            templateUrl: 'overview.html'
        })
        .state('home', {
            url: "/home",
            templateUrl: 'home.html'
        });

    $urlRouterProvider.otherwise('/overview');
});

app.controller('appController', function ($scope, $window) {

   $scope.items = restoreItems();
   $scope.selectedItem = $scope.items[0];
    $scope.newItemName = '';
    $scope.newComment = '';

    $scope.addItem = function(name) {
        if (!name) return;

        var item = {
            name: name,
            comments: []
        };

        $scope.items.push(item);
        $scope.selectedItem = item;
        $scope.newItemName = '';
        storeItems();
    };

    $scope.deleteItem = function(item) {
        var itemIndex = $scope.items.indexOf(item);
        $scope.items.splice(itemIndex, 1);
        $scope.selectedItem = $scope.items[0];
        storeItems();
    };

    $scope.selectItem = function(item) {
        $scope.selectedItem = item;
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
        return data ? JSON.parse(data) : [];
    }
});