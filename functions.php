  <?php
  
   function getTwitchUser(){
      $response = file_get_contents("https://wind-bow.gomix.me/twitch-api/users/".$_GET['channel']);
        $response = json_decode($response);
        return $response;
   }
    function getTwitchStream(){
      $response = file_get_contents("https://wind-bow.gomix.me/twitch-api/streams/".$_GET['stream']);
        $response = json_decode($response);
        return $response;
   }
    if(isset($_GET['channel'])){
      echo json_encode(getTwitchUser());
    }
    else if(isset($_GET['stream'])){
      echo json_encode(getTwitchStream());
    }  
?>
