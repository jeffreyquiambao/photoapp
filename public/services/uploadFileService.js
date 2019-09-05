//handle the parsed file from filemodel.js and send to backend
angular.module('uploadFileService', [])

.service('uploadFile', function($http) {
    this.upload = function(file) {
        //key value pairs is how form data is modelled. File is the value and myFile is the name (it is used on the frontend under this name)
        var fd = new FormData();
        fd.append('myFile', file.upload);
        
        //where the actual saving happens
        return $http.post('/uploads', fd, {
            //avoids angular serializing error
            transformRequest: angular.identity,
            headers: { 'Content-type': undefined}
        });
    }
})
