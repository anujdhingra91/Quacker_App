angular.module("quacker").factory("quacks", ["$http",
function($http) {
    var quacks = [];
    return {
        fetchQuacks : function() {
            return $http.get("/quacks").success(function(data) {
                quacks = data;
            }).error(function(data) {  
                 return null;
            }); 
        },
        
        getQuacks : function() {
            this.fetchQuacks();
            return quacks;
        },

        removeQuack : function(id) {
            $http.delete("/quacks/"+id).success(function(data) {
                
            }).error(function(data) { 
                
            });
        },


        addQuack : function(message, images) {
            $http.post("/quacks", {
                message : message, 
                images : images
            }).success(function(data) { 
                quacks.push (data);
            });
        }
    };
}]);