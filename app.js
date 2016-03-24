(function() {
	//var articles = [{full: "A", sent5: "B", sum50: "C", url: "D"}];
	
	
	/*
 	function ArticlesCtrl($scope, articles) {
  	//$scope.message = "Waiting 2000ms for update";
    //get articles
	chrome.storage.local.get('list', function(result){
    //articles.push(result.list);
    console.log(result.list); //articles in chrome
    articles = result.list;
    console.log(articles); //articles in here  
    this.articles = articles;
 	});
    $scope.articles = articles;
	}*/
	
	var app = angular.module('myApp',[]);
	/*
	function PersonListCtrl($scope, $http) {
  $scope.loadData = function () {
     $http.get('/persons').success(function(data) {
       $scope.persons = data;
     });
  };

  //initial load
  $scope.loadData();
}*/
	
	console.log(articles);
	app.controller('myCtrl', function($scope) {
		var articlesA = [];//[{full: "1", sent5: "2", sum50: "3", url: "4"}];
		var articlesB = [];//[{full: "A", sent5: "B", sum50: "C", url: "D"}];
		
		chrome.storage.local.get('list', function(result)
			{
		    //articles.push(result.list);
		    articles = result.list
		    //console.log(articlesA); //articles in chrome
		    
		 	});
		//delete one item on list
		$scope.delete = function(index) {
			$scope.articles.splice(index, index+1);
			console.log($scope.articles);
			//implement part to store list in chrome back to original
			chrome.storage.local.get({list: []}, function(result) {
				result.list.splice(index, index+1);
				chrome.storage.local.set(result, function() {
			console.log("Item Deleted");
		})
	});
		}
		

		$scope.deleteAll = function() {
			$scope.articles = [];
			//empty list from chrome storage
			chrome.storage.local.get({list: []}, function(result) {
				result.list.length = 0;
				chrome.storage.local.set(result, function() {
				console.log("Storage deleted.");
		    });
			

		});

		}

		$scope.loadData = function() {
				
			$scope.getData(function() {
				$scope.$apply(function() {
					$scope.articles = articles;
				})
				
			})

			//console.log(articlesA);
			
			//$scope.$apply();
			//articlesA = articlesB;
		 	//$scope.articles = articlesA;

		 	
		};

		$scope.getData = function(_callback) {
			chrome.storage.local.get('list', function(result)
			{
		    //articles.push(result.list);
		    articles = result.list
		    //console.log("hi");
		    console.log(articles); //articles in chrome
		    _callback();
		 	})

		}

		//$scope.getData();
		//$scope.getData();
		$scope.loadData();
		

	 	

		
	});

	app.controller('TabController', function() {
		this.tab = 1;
		this.setTab = function(tab) {
			this.tab = tab;
		}
		//check if clicked
		this.isSet = function(tab) {
			if(this.tab == tab)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	});



})();