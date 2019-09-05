var app = angular.module('myApp', ['fileModelDirective', 'uploadFileService']);
app.controller("AppCtrl", function ($scope, $timeout, $http, uploadFile) {
    console.log("hello from the controller");

    $scope.file ={};

    //changes the frontend based on data input
    $scope.Submit = function() {
        $scope.uploading = true;
        uploadFile.upload($scope.file).then(function(data) {
            if (data.data.success) {
                $scope.uploading = false;
                $scope.alert = 'alert alert-success';
                $scope.message = data.data.messgae;
                $scope.file = {};
            } else {
                $scope.uploading = false;
                $scope.alert = 'alert alert-danger';
                $scope.message = data.data.message;
                $scope.file = {};
            }
        })
    };

    $scope.photoChanged = function(files) {
        if (files.length > 0 && files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
            $scope.uploading = true;
            var file = files[0];
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function(e) {
                $timeout(function() {
                    $scope.thumbnail = {};
                    //the uploaded image thumbnail
                    $scope.thumbnail.dataUrl = e.target.result;
                    $scope.uploading = false;
                    $scope.message = false;
                });
            }
        } else {
            $scope.thumbnail = {};
            $scope.message = false;
        }


    }


    $http.get('/uploads').then(function(response) {
        //$scope.uploadedImages = response;
    });

    });


  
