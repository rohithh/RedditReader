
/* global angular*/
/*global $*/
/*global fetch*/
var app = angular.module('SubredditsTableApp',['ngSanitize']);
	
app.controller('SubredditsController', function($scope){
    $scope.data=5;
    $scope.subreddits=[""];
	$scope.subredditNames = [];
	
    $scope.load = function() {
        $scope.newSubreddit= "news";
        $scope.addSubreddit();
    }
	
    $scope.removeRow = function(index){
        var newrow = [];
        if($scope.subredditNames[index].title === "news"){
            alert("You cannot remove the news subreddit!");
            return;
        }
        for(var i=0;i<$scope.subreddits.length;i++){
            if(!$scope.subreddits[i].includes("data-info=\""+$scope.subredditNames[index].title+"\"")){
                newrow.push($scope.subreddits[i]);
            }
        }
        $scope.subredditNames.splice(index, 1);
        $scope.subreddits = newrow;
    };

	$scope.addSubreddit = function() {
	    if(!$scope.newSubreddit || !$scope.data){
	        alert("Please enter a subreddit and number of posts");
	        return;
	    }
	    if($scope.subredditNames.indexOf($scope.newSubreddit) > -1){
	        alert("The subreddit already exists! Please enter another one!");
	        return;
	    }
		$scope.subredditNames.push({'title': $scope.newSubreddit});
		var item = $scope.newSubreddit;
		
        fetch('https://www.reddit.com/r/' + $scope.newSubreddit + '.json?limit='+$scope.data).then(function(response) {
            return response.json();
            }).then(function(json) {
            var newrow = [];
            for (var i = 0; i < json.data.children.length; i++) {
                newrow.push("<a href=\""+json.data.children[i].data.url+"\" data-info=\""+ item +"\">"
                + " | " + json.data.children[i].data.ups + " | " + json.data.children[i].data.title 
                + " | Comments = " + json.data.children[i].data.num_comments + " | " + "</a>");
            }
            $scope.subreddits = newrow.concat($scope.subreddits);//$.merge($scope.subreddits, newrow);
        });
		$scope.newSubreddit = '';
	};
});
