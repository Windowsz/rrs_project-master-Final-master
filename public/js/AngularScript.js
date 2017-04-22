(function(angular) {
    'use strict';
    angular.module('ngApp', []).controller('ngAppController', function($scope) {
        $scope.a = '1234';
        $scope.this.firstName;
        $scope.this.lastName;
        $scope.this.email;
        $scope.this.Position;
        $scope.this.floor;
        $scope.this.password;
        console.log(  $scope.this.firstName+
          $scope.this.lastName+
          $scope.this.email+
          $scope.this.Position+
          $scope.this.floor+
          $scope.this.password);
    });
})(window.angular);
