$(function () 
 {
     var usersData=[], 
     FILTER_ALL = "All", FILTER_LIVE="Live",FILTER_OFFLINE="Offline",
     filterType=FILTER_ALL,term="",
     users = ["brunofin","ESL_SC2", "freecodecamp"];
  
	  
	  $(document).ready(function(){
	     	getUsers();	
	  	 $('.filter a').on('click',function(e){
	  	 	  e.preventDefault();
	  	 	  filterType = this.innerHTML; 
	  	 	  $('.filter a').removeClass('active');
	  	 	  $(this).addClass('active');  
	  	 	  showFilteredUsers(filterType);
	  	 });

	  	 $('#search').on('change textInput input',function(e){
	  	 	  term = this.value;
	  	 	  search(term,usersData);	
	  	 });

	  });


    Handlebars.registerHelper('streamInfo', function(stream) {
	      if(stream !=null){
	      	  return  new Handlebars.SafeString('<div class="footer"> <div><span>'+ stream.viewers+'</span> viewers</div>'+
	      	'<div>'+stream.channel.status+
	      	'</div></div>');	
	      }
	      else{
	      	  return  new Handlebars.SafeString('<div class="footer"> <div><span> 0 </span> viewers</div>'+
	      	'<div class="offline"> offline </div></div>');
	      }
	});	

	  function getUsers(){
	  	   $('.loader').removeClass('hide');
		  	var promises = [];
		  	users.map(function(i){	
		  		promises.push(new Promise(function(resolve,reject){
		  			 $.getJSON(
						"./functions.php?channel="+i,
						function(userData){
							if(userData.error){
								resolve({display_name:i,stream:null,bio:userData.message,logo:'public/img/defaultLogo.png'});		
						    }
						    else{
							   $.getJSON(
								"./functions.php?stream="+i,
								function(streamData){
									 resolve(Object.assign(userData,streamData));
								});						    	
						    }
						});
		  		}));
			  });

		  	Promise.all(promises).then(values => { 
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
	  	  if(term!==""){
	  	  	search(term,filteredUsers);
	  	  }else{
	  	  	renderUsers(filteredUsers);	
	  	  }
	  }
	  function renderUsers(data){
	  	  $('.loader').addClass('hide');
	  	  var template = $("#usersLayout").html();
	      var compiledTemplate = Handlebars.compile(template);   
	      $("#users").html(compiledTemplate({data:data}));	
	  }

	  function search(term,data){
	  	 filteredUsers = data.filter(function(channel){
	  	  	return channel.display_name.toLowerCase().match(term.toLowerCase()) !=null;
	  	  });
	  	  renderUsers(filteredUsers); 	
	  }
});
