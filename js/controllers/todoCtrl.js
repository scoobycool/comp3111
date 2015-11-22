/*global todomvc, angular, Firebase */
'use strict';

/**
* The main controller for the app. The controller:
* - retrieves and persists the model via the $firebaseArray service
* - exposes the model to the template and provides event handlers
*/

todomvc.controller('TodoCtrl',
['$scope', '$location', '$firebaseArray', '$sce', '$localStorage', '$window','$firebaseObject',
function ($scope, $location, $firebaseArray, $sce, $localStorage, $window , $firebaseObject) {
	// set local storage
	$scope.$storage = $localStorage;

	var scrollCountDelta = 10;
	$scope.maxQuestion = scrollCountDelta;
	/*
	$(window).scroll(function(){
	if($(window).scrollTop() > 0) {
	$("#btn_top").show();
} else {
$("#btn_top").hide();
}
});
*/
var splits = $location.path().trim().split("/");
var roomId = angular.lowercase(splits[1]);
if (!roomId || roomId.length === 0) {
	roomId = "all";
}

// TODO: Please change this URL for your app
var firebaseURL = "https://glaring-heat-3250.firebaseio.com/";
var liveURL = "https://glaring-heat-3250.firebaseio.com/live";


$scope.roomId = roomId;
var url = firebaseURL + roomId + "/questions/";
var echoRef = new Firebase(url);
var listRef = new Firebase("https://glaring-heat-3250.firebaseio.com/presence/");

var userRef = listRef.push({'user_name': 'anonymous'});

// Add ourselves to presence list when online.
var presenceRef = new Firebase("https://glaring-heat-3250.firebaseio.com/.info/connected");
presenceRef.on("value", function(snap) {
  if (snap.val()) {
    // Remove ourselves when we disconnect.
    userRef.onDisconnect().remove();
  }
});

// Number of online users is the number of objects in the presence list.
listRef.once("value", function(snapshot) {
  $scope.data1  = snapshot.numChildren();
  // a === 1 ("name")
});

var query = echoRef.orderByChild("order");
var query2 = listRef.orderByKey();
// Should we limit?
//.limitToFirst(1000);
$scope.todos = $firebaseArray(query);
$scope.namelist = $firebaseArray(query2);

var syncObject = $firebaseObject(userRef);
syncObject.$bindTo($scope, "data0");

//$scope.input.wholeMsg = '';
$scope.editedTodo = null;	

 //-------Added by longq-------
 var quoteMsg=" ";
  //-------Added by longq-------
 
// pre-precessing for collection
$scope.$watchCollection('todos', function () {
	var total = 0;
	var remaining = 0;
	$scope.todos.forEach(function (todo) {
		// Skip invalid entries so they don't break the entire app.
		if (!todo || !todo.head ) {
			return;
		}

		total++;
		if (todo.completed === false) {
			remaining++;
		}

		// set time
		todo.dateString = new Date(todo.timestamp).toString();
		todo.tags = todo.wholeMsg.match(/#\w+/g);

		todo.trustedDesc = $sce.trustAsHtml(todo.linkedDesc);
	});

	$scope.totalCount = total;
	$scope.remainingCount = remaining;
	$scope.completedCount = total - remaining;
	$scope.allChecked = remaining === 0;
	$scope.absurl = $location.absUrl();
}, true);


// Get the first sentence and rest
$scope.live = function(){
	$scope.data.live = $scope.data.live -1;
}
$scope.getYoutube = function($text){
    var re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
    var match = $text.match(re);
    if(match!=null){
    var res = match[0].split("v=");
    return "https://www.youtube.com/embed/" + res[1];}
    else{return null;}
        
};


$scope.getImgur = function($text){
	var re = /http:\/\/(.*imgur\.com\/.*)/i;
	return $text.match(re);
};

$scope.getFirstAndRestSentence = function($string) {
	var head = $string;
	var desc = "";
            //-------Added by longq------->
	var separators = '\n';
            //-------Added by longq------->
	var firstIndex = -1;
	for (var i in separators) {
		var index = $string.indexOf(separators[i]);
		if (index == -1) continue;
		if (firstIndex == -1) {firstIndex = index; continue;}
		if (firstIndex > index) {firstIndex = index;}
	}

	if (firstIndex !=-1) {
		head = $string.slice(0, firstIndex+1);
		desc = $string.slice(firstIndex+1);
	}
	return [head, desc];
};

$scope.addTodo = function () {
	var newTodo = $scope.input.wholeMsg.trim();
	// No input, so just do nothing
	if (!newTodo.length) {
		return;
	}

	var firstAndLast = $scope.getFirstAndRestSentence(newTodo);
	var head = firstAndLast[0];
	var desc = firstAndLast[1];
	var imglink = $scope.imagelink;
	var youtubeurl = $scope.getYoutube (newTodo);
	var imgururl = $scope.getImgur(newTodo);
	var user_id = $scope.data0.user_id
	if (!($scope.imagelink)){
		imglink = '';
	}
	if(!($scope.data0.user_id)){
		user_id = null;
	}
	$scope.todos.$add({
		wholeMsg: newTodo,
		head: head,
		headLastChar: head.slice(-1),
		desc: desc,
		linkedDesc: Autolinker.link(desc, {newWindow: false, stripPrefix: false}),
		completed: false,
		timestamp: new Date().getTime(),
		youtube: youtubeurl,
		imgur: imgururl,
		tags: "...",
		echo: 0,
		order: 0,
        quote: quoteMsg,
        image: imglink,
        name:$scope.data0.user_name,
        id:user_id
	});
	// remove the posted question in the input
	$scope.imagelink ='';
    quoteMsg=" ";
	$scope.input.wholeMsg = '';
};
 

$scope.editTodo = function (todo) {
	$scope.editedTodo = todo;
	$scope.originalTodo = angular.extend({}, $scope.editedTodo);
};

$scope.addEcho = function (todo) {

if(!todo.hasLiked){
		todo.hasLiked = true;
		//like
		$scope.editedTodo = todo;
		todo.echo = todo.echo + 1;
		// Hack to order using this order.
		todo.order = todo.order -1;

		$scope.$storage[todo.$id] = "Unlike";
		todo.chlid = "Unlike";

		$scope.todos.$save(todo);

	}

	else {
		todo.hasLiked = false;
		//dislike
		$scope.editedTodo = todo;
		todo.echo = todo.echo - 1;
		// Hack to order using this order.
		todo.order = todo.order +1;

		todo.chlid = "Like";

		$scope.todos.$save(todo);

	}
};

 $scope.sce = $sce.trustAsResourceUrl;
 
 $scope.dislike = function (todo) {
 	if(!todo.hasDisliked){
		todo.hasDisliked = true;
		//dislike
		$scope.editedTodo = todo;
		todo.echo = todo.echo - 1;
		// Hack to order using this order.
		todo.order = todo.order +1;

		$scope.$storage[todo.$id] = "Undislike";
		todo.chdid = "Undislike";

		$scope.todos.$save(todo);

	}

	else {
		todo.hasDisliked = false;
		//like
		$scope.editedTodo = todo;
		todo.echo = todo.echo + 1;
		// Hack to order using this order.
		todo.order = todo.order -1;

		todo.chdid = "Dislike";

		$scope.todos.$save(todo);

	}
 };
 
 $scope.quote = function (todo) {
    quoteMsg= "(Quote:"+todo.wholeMsg+")";
 if(quoteMsg.length>100){
 var substring=quoteMsg.substring(0,100)+"...)";
 quoteMsg=substring;
 
 }
 };
 
 

$scope.addReply = function (todo) {
	var newTodo = todo.input.wholeReply.trim();
	// No input, so just do nothing
	var user_id = $scope.data0.user_id;
	if(!($scope.data0.user_id)){
		user_id = null;
	}
	if (!newTodo.length) {
		return;
	}
	if(todo.reply){
	 todo.reply.push({msg:newTodo,timestamp: new Date().getTime(),echo:0, name:$scope.data0.user_name,id:user_id});
	 $scope.todos.$save(todo);
	} else{
	 todo.reply = [{msg:newTodo,timestamp: new Date().getTime(),echo:0, name:$scope.data0.user_name,id:user_id}];
	 todo.input.wholeReply = '';
	 $scope.todos.$save(todo);}
	// remove the posted question in the input
};

$scope.doneEditing = function (todo) {
	$scope.editedTodo = null;
	var wholeMsg = todo.wholeMsg.trim();
	if (wholeMsg) {
		$scope.todos.$save(todo);
	} else {
		$scope.removeTodo(todo);
	}
};

$scope.revertEditing = function (todo) {
	todo.wholeMsg = $scope.originalTodo.wholeMsg;
	$scope.doneEditing(todo);
};

$scope.removeTodo = function (todo) {
	$scope.todos.$remove(todo);
};

$scope.clearCompletedTodos = function () {
	$scope.todos.forEach(function (todo) {
		if (todo.completed) {
			$scope.removeTodo(todo);
		}
	});
};

$scope.toggleCompleted = function (todo) {
	todo.completed = !todo.completed;
	$scope.todos.$save(todo);
};

$scope.markAll = function (allCompleted) {
	$scope.todos.forEach(function (todo) {
		todo.completed = allCompleted;
		$scope.todos.$save(todo);
	});
};

$scope.FBLogin = function () {
	var ref = new Firebase(firebaseURL);
	ref.authWithOAuthPopup("facebook", function(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
		} else {
			$scope.$apply(function() {
				$scope.$authData = authData;
				$scope.data0.user_name =  authData.facebook.displayName;
				$scope.data0.user_id = authData.facebook.id;
				$scope.isAdmin = true;
			});
			console.log("Authenticated successfully with payload:", authData);
		}
	});
};



$scope.FBLogout = function () {
	$scope.data0.user_name = "anonymous";
	$scope.data0.user_id = null;
	var ref = new Firebase(firebaseURL);
	ref.unauth();
	delete $scope.$authData;
	$scope.isAdmin = false;
};

$scope.increaseMax = function () {
	if ($scope.maxQuestion < $scope.totalCount) {
		$scope.maxQuestion+=scrollCountDelta;
	}
};
$scope.movetags = function(tag){
	$scope.input.wholeMsg = tag;
	$window.scrollTo(0,0);
};


$scope.toTop =function toTop() {
	$window.scrollTo(0,0);
 };
 

                         // Not sure what is this code. Todel
if ($location.path() === '') {
	$location.path('/');
}
$scope.location = $location;

// autoscroll
angular.element($window).bind("scroll", function() {
	if ($window.innerHeight + $window.scrollY >= $window.document.body.offsetHeight) {
		console.log('Hit the bottom2. innerHeight' +
		$window.innerHeight + "scrollY" +
		$window.scrollY + "offsetHeight" + $window.document.body.offsetHeight);

		// update the max value
		$scope.increaseMax();

		// force to update the view (html)
		$scope.$apply();
	}
});

 
 

}]);
