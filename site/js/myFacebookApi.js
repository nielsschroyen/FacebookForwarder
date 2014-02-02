function loginFacebook()
{

//	FB.api('/platform', function(response) {
//	  alert(response.company_overview);
//	});
 FB.login(function(response) {
   if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     FB.api('/me', function(response) {
       console.log('Good to see you, ' + response.name + '.');
     });
   } else {
     console.log('User cancelled login or did not fully authorize.');
   }
 }, {scope: 'email,user_likes,read_mailbox'});
}	
function getMessages()
{
//SELECT name FROM user WHERE uid=me()
//$fql_multiquery_url = 'https://graph.facebook.com/'
 //   . 'fql?q={"all+friends":"SELECT+uid2+FROM+friend+WHERE+uid1=me()",'
 //   . '"my+name":"SELECT+name+FROM+user+WHERE+uid=me()"}'
 //   . '&access_token=' . $access_token;

FB.api('/fql', {q:{"query1":"SELECT thread_id FROM thread WHERE folder_id=0","query2":"SELECT body,author_id,created_time, message_id, attachment FROM message WHERE thread_id IN (SELECT thread_id FROM #query1)"}},
  function(response) {
    CreateNewBinding(new MessageModel((response.data[1].fql_result_set.map(toMessage))));
  }
);
}	

function toMessage(fbObject)
{
	return new Message(fbObject.body, fbObject.author_id)
}	