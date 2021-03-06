'use strict';

angular.module('tatwbtApp')
  .controller('MainCtrl', function ($scope) {

          var entries = [
        { visible: false, icon:'fa-android'},
        { visible: false, icon:'fa-github'},
        { visible: false, icon:'fa-windows'},
        { visible: false, icon:'fa-apple'},
        { visible: false, icon:'fa-html5'},
        { visible: false, icon:'fa-linux'}
    ];

    function shuffle(array) {
      var currentIndex = array.length
        , temporaryValue
        , randomIndex
        ;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }



    var newgame = function(){
        $scope.rows = shuffle(angular.copy(entries.concat(entries.slice(0))));
    }

    var clearClicked = function(tilesIdxs){
        angular.forEach(tilesIdxs, function(tileIndex){
            $scope.rows[tileIndex].visible = false;
        });
    };

    var haveSameIcon = function(tilesIdxs){
        return $scope.rows[tilesIdxs[0]].icon == $scope.rows[tilesIdxs[1]].icon;
    };

    var discoverTiles = function(tilesIdxs){
        angular.forEach(tilesIdxs, function(tileIndex){
            $scope.rows[tileIndex].discovered = true;
        });
    };

    var clickedTiles = [];

    $scope.toggle = function(idx){
        if (clickedTiles.length == 2){
            if (haveSameIcon(clickedTiles)){
                discoverTiles(clickedTiles)
            }
            clearClicked(clickedTiles);
            clickedTiles = [];
        }

        clickedTiles.push(idx);
        $scope.rows[idx].visible =! $scope.rows[idx].visible;
    };

    $scope.newgame = newgame;

    newgame();






  });
