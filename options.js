
window.addEventListener('load', getData);

function getData()
{
chrome.storage.local.get('list', function(result){

          //$('#urls').html(result.list[2].article.url);
          
 });
$(".deleteA").on('click', function() {
    DeleteOne();
    
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