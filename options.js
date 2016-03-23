
window.addEventListener('load', getData);
var articles = [];

function getData()
{
chrome.storage.local.get('list', function(result){
articles = result.list;
       

          
 });


}


function Delete()
{
	chrome.storage.local.clear();
	console.log("Storage deleted.");
}

function DeleteOne()
{
	//delete 1 element test
	chrome.storage.local.get({list: []}, function(result) {
		result.list.splice(0, 1);
		chrome.storage.local.set(result, function() {
			alert("Item Deleted");
		})
	});
}