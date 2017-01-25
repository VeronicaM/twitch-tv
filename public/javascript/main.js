$(function () 
 {
     var usersData=[], 
     FILTER_ALL = "All", FILTER_LIVE="Live",FILTER_OFFLINE="Offline",
     filterType=FILTER_ALL,
     users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp","brunofin","comster404","veramih", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  
	  
	  $(document).ready(function(){
	  	getUsers();	
	  		 setInterval(function(){
	  			getUsers();			
	     	 }, 30000);	
	  	
	  	 $('.filter a').on('click',function(e){
	  	 	  e.preventDefault();
	  	 	  filterType = this.innerHTML;  
	  	 	  showFilteredUsers(filterType);
	  	 });

	  	 $('#search').on('change textInput input',function(e){
	  	 	  console.log(this);
	  	 	  search(this.value);	
	  	 });

	  });


    Handlebars.registerHelper('streamInfo', function(stream) {
	      if(stream !=null){
	      	  return  new Handlebars.SafeString('<div> <div>'+ stream.viewers+' viewers</div>'+
	      	'<div>'+stream.channel.status+
	      	'</div></div>');	
	      }
	      else{
	      	  return  new Handlebars.SafeString('<div> offline </div>');	
	      }
	});	

	  function getUsers(){
		  	var promises = [];
		  	users.map(function(i){	
		  		promises.push(new Promise(function(resolve,reject){
		  			 $.getJSON(
						"https://wind-bow.gomix.me/twitch-api/users/"+i,
						function(userData){
							if(userData.error){
								resolve({display_name:i,stream:null,bio:userData.message,logo:'public/img/defaultLogo.png'});		
						    }
						    else{
							   $.getJSON(
								"https://wind-bow.gomix.me/twitch-api/streams/"+i,
								function(streamData){
									 resolve(Object.assign(userData,streamData));
								});						    	
						    }
						});
		  		}));
			  });

		  	Promise.all(promises).then(values => { 
			  // console.log("values",values); 
			   usersData = values; 
			   showFilteredUsers(filterType);
			});	
	  }

	  function showFilteredUsers(filterType){
	  	  filteredUsers = usersData.filter(function(val){
	  	  	switch(filterType){
	  	  		case FILTER_ALL: return val; 
	  	  		case FILTER_LIVE: return val.stream != null;
	  	  		case FILTER_OFFLINE: return val.stream == null;
	  	  	}
	  	  });
	  	  renderUsers(filteredUsers);
	  	
	  }
	  function renderUsers(data){
	  	  var template = $("#usersLayout").html();
	      var compiledTemplate = Handlebars.compile(template);   
	      console.log('usersData',filteredUsers);
	      $("#users").html(compiledTemplate({data:data}));	
	  }

	  function search(term){
	  	 filteredUsers = usersData.filter(function(channel){
	  	  	return channel.display_name.toLowerCase().match(term.toLowerCase()) !=null;
	  	  });
	  	  renderUsers(filteredUsers); 	
	  }
});
