/* Generated by Babel */
'use strict';

var app = angular.module('ReMimb', ['ngRoute', 'firebase', 'ngAnimate', 'ngFileUpload', 'angularSpinner']);

/* Service Worker 
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ',    registration.scope);
  }).catch(function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}*/;/* Generated by Babel */
'use strict';

app.config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider) {

  $routeProvider.when('/', {
    templateUrl: 'app/views/main.html',
    controller: 'mainController'
  }).when('/favorites', {
    templateUrl: 'app/views/favorites.html',
    controller: 'favoritesController'
  }).otherwise('/');
}]);;/* Generated by Babel */
'use strict';

app.factory('cardInfo', ['$firebaseArray', function () {

    var ref = new Firebase("https://remimb-webapp-855cc.firebaseio.com/");

    return ref;
}]);;/* Generated by Babel */
'use strict';

app.controller('favoritesController', ['$scope', '$interval', 'cardInfo', '$location', '$firebaseArray', function ($scope, $interval, cardInfo, $location, $firebaseArray) {

  /* Assigning returned data from service */
  $scope.items = $firebaseArray(cardInfo);

  /* Refreshing the 'Add' icon on route change  || PERFORMANCE BOTTLENECK */
  $interval(function () {
    $scope.location = $location.path();
  }, 800);
}]);;/* Generated by Babel */
'use strict';

app.controller('mainController', ['$scope', 'cardInfo', '$firebaseArray', '$routeParams', '$timeout', function ($scope, cardInfo, $firebaseArray, $routeParams, $timeout) {

  /* Retreiving data from factory */

  var data = $firebaseArray(cardInfo);

  $scope.items = data;

  /* Adding items */
  $scope.addItem = function (file) {
    console.log(file);

    var title = $scope.item.title;
    var description = $scope.item.description;
    var place = $scope.item.place;

    // Converting uploaded image to base64
    var image = Upload.base64DataUrl(file).then(function (base64Urls) {
      cardInfo.push({
        title: title,
        description: description,
        place: place,
        fav: false,
        image: base64Urls
      });
    });

    // Clearing up inputs after submitting
    $scope.item.title = '';
    $scope.item.description = '';
    $scope.item.place = '';
  };

  /* Adding card to favorites */
  $scope.makeFav = function (id) {
    cardInfo.child(id).update({ fav: true });
  };
}]);;/* Generated by Babel */
'use strict';

app.directive('cardDirective', ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'app/views/card.html'
    };
}]);;/* Generated by Babel */
'use strict';

app.directive('favcardDirective', [function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'app/views/favCard.html'
    };
}]);