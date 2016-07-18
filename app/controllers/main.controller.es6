app.controller('mainController', ['$scope', 'cardInfo', 'Upload', '$firebaseArray', '$routeParams', '$timeout', function ($scope, cardInfo, Upload, $firebaseArray, $routeParams, $timeout) {

  /* DB operations */

  let data = $firebaseArray(cardInfo);
  $scope.items = data

  // Add items
  $scope.addItem = function (file) {
    console.log(file)
    
    let title = $scope.item.title;
    let description = $scope.item.description;
    let place = $scope.item.place
    
    let image = Upload.base64DataUrl(file).then(function(base64Urls){
        cardInfo.push({
            title: title,
            description: description,
            place: place,
            fav: false,
            image: base64Urls
        });
    }).then(function() {
        document.getElementById('card-img').style.display = 'none'
    })
     
    
      
    // Clear the inputs after submitting
    $scope.item.title = '';
    $scope.item.description = '';
    $scope.item.place = '';
};  
      


  // Add the card to favorites
  $scope.makeFav = function (id) {
    cardInfo.child(id).update({ fav: true });
  };
    

  
  
  
  
  
  
  
  
  
  
}]);