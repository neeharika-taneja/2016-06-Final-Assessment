angular.module('shortly.map', [])
.controller('MapController', function($scope,$http, $q, mapFactory){
    console.log('in mapController');

    $scope.change = function(){
    if($scope.search !== undefined && $scope.limit !== undefined && $scope.method !== undefined) {
    $scope.findInGif();
  }
  };

  $scope.findInGif = function(){
        mapFactory.getAllGif()
        .then(function(response){
          console.log("got the results back",response);
          $scope.res=response.data;
          // mapFactory.saveKeyword(search)
          // .then(function(response){
          //   console.log('savekeyword: ', response);
          // });
        });
        console.log('findInGif: ', search);
        // search api

    }


    $scope.translate = function(search){
      var options = {
        s: search
      };
        mapFactory.translateword(options)
        .then(function(response){
          console.log("got the results back from translations ",response.data);
          $scope.translatedRes=response.data;
          // mapFactory.saveKeyword(search)
          // .then(function(response){
          //   console.log('savekeyword: ', response);
          // });
        });
        console.log('translate: ', search);
        // search api

    }
    
})
.factory('mapFactory', function ($http) {
 // Your code here
 var data = {};
 var getAll = function (options) {
   console.log('in getAll function', options);
   return $http({
    method: 'GET',
    url: '/map/results',
    params: options
   })
   .then(function (resp) {
    //  console.log(resp.data.items)
    //  return resp.data.items;
    return resp;
   });
 };
 var translateword = function (options) {
   console.log('in translateword function', options);
   return $http({
    method: 'GET',
    url: '/map/translate',
    params: options
   })
   .then(function (resp) {
    //  console.log(resp.data.items)
    //  return resp.data.items;
    return resp;
   });
 };
 var getAllGif = function () {
   console.log('in getAll gif function');
   return $http({
    method: 'GET',
    url: '/map/results',
    //params: options
   })
   .then(function (resp) {
      console.log("response data is",resp.data);
     //return resp.data.items;
    return resp.data;
   });
 };
 
 return {
   getAll:getAll,
   getAllGif:getAllGif,
   translateword:translateword
   //saveKeyword:saveKeyword
 }
});



//  AIzaSyDxevVuj_joo5LpY46u9q6fbw16hIfnNeE
//"https://maps.googleapis.com/maps/api/geocode/json"
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDxevVuj_joo5LpY46u9q6fbw16hIfnNeE
