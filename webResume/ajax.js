var currentIndex = 0;
$(function(){
    var linkString = "https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=Shw9odnKBL8dzujCnfdxKYWEdeiRoS5aMtCSbWBH";
    $.get(linkString, function(data){
        $('#rover').empty();
        for(var i = 0; i < data.rovers.length; i++){
            $('#rover').append('<option>' + data.rovers[i].name + '</option>');
        }
         roverInfo();
    });
});
function cameraPopulate(){
    var sol = $('#sol').val();
    var rover = $('#rover option:selected').text();
    var linkString = "https://api.nasa.gov/mars-photos/api/v1/manifests/" + rover + "?api_key=Shw9odnKBL8dzujCnfdxKYWEdeiRoS5aMtCSbWBH"
    $.get(linkString,function(data){
        $('#cameras').empty();
        for(var i = 0; i < data.photo_manifest.photos.length; i++){
            if(sol == data.photo_manifest.photos[i].sol){
                for(var j = 0; j < data.photo_manifest.photos[i].cameras.length; j++){
                    $('#cameras').append('<option>' + data.photo_manifest.photos[i].cameras[j] + '</option>');
                }
            }
        }
        if($('#cameras').is(':empty')){
                alert("The rover you have selected has no photos at the given sol");
            $('#sol').val("");
            }
    });
}
function imageDisplay(){
    if($('#cameras').val() != null){
        $('#imageDiv').empty();
        //I found this gif on https://giphy.com/explore/loading
        $('#imageDiv').append('<img id="loadingGif" src="images/loading.gif" alt="LoadingGif">');
        $('#loadingGif').css('width', '40%');
        $('#loadingGif').css('margin-left', '30%');
        $('#loadingGif').css('margin-right', '30%');
        var sol = $('#sol').val();
        var rover = $('#rover option:selected').text();
        var linkString = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?sol=" + sol +"&api_key=Shw9odnKBL8dzujCnfdxKYWEdeiRoS5aMtCSbWBH";
        var camera = $('#cameras option:selected').text();
        $.get(linkString, function(data){
            $('#imageDiv').empty();
            if(data.photos[0].img_src != null){
                $('#imageDiv').append('<img src="' + data.photos[0].img_src + '" alt="Rover image">');
            }
        });
    }
}

function goRight(){
    if($('#imageDiv').children().length != 0){
        $('#imageDiv').empty();
        //I found this gif on https://giphy.com/explore/loading
        $('#imageDiv').append('<img id="loadingGif" src="images/loading.gif" alt="LoadingGif">');
        $('#loadingGif').css('width', '40%');
        $('#loadingGif').css('margin-left', '30%');
        $('#loadingGif').css('margin-right', '30%');
        var sol = $('#sol').val();
        var rover = $('#rover option:selected').text();
        var linkString = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?sol=" + sol +"&api_key=Shw9odnKBL8dzujCnfdxKYWEdeiRoS5aMtCSbWBH";
        var camera = $('#cameras option:selected').text();
        $.get(linkString, function(data){
            $('#imageDiv').empty();
            currentIndex++;
            if(currentIndex <= data.photos.length - 1){
                $('#imageDiv').append('<img src="' + data.photos[currentIndex].img_src + '" alt="Rover image">');
            }
            else{
                currentIndex = 0;
                $('#imageDiv').append('<img src="' + data.photos[currentIndex].img_src + '" alt="Rover image">');
            }
        });
    }
}

function goLeft(){
    if($('#imageDiv').children().length != 0){
        $('#imageDiv').empty();
        //I found this gif on https://giphy.com/explore/loading
        $('#imageDiv').append('<img id="loadingGif" src="images/loading.gif" alt="LoadingGif">');
        $('#loading').css('text-align', 'center');
        $('#loadingGif').css('width', '40%');
        $('#loadingGif').css('margin-left', '30%');
        $('#loadingGif').css('margin-right', '30%');
        var sol = $('#sol').val();
        var rover = $('#rover option:selected').text();
        var linkString = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?sol=" + sol +"&api_key=Shw9odnKBL8dzujCnfdxKYWEdeiRoS5aMtCSbWBH";
        var camera = $('#cameras option:selected').text();
        $.get(linkString, function(data){
            $('#imageDiv').empty();
            currentIndex--;
            if(currentIndex >= 0){
                $('#imageDiv').append('<img src="' + data.photos[currentIndex].img_src + '" alt="Rover image">');
            }
            else{
                currentIndex = data.photos.length - 1;
                $('#imageDiv').append('<img src="' + data.photos[currentIndex].img_src + '" alt="Rover image">');
            }
        });
    }
}

function roverInfo(){
    $('#sol').val('');
    $('#cameras').empty();
    $('#imageDiv').empty();
    $('#name').empty();
    $('#launch').empty();
    $('#status').empty();
    //I thought loading text might seem more fluid in this circumstance
    $('#name').append('<p class="loading">Loading</p>');
    $('#launch').append('<p class="loading">Loading</p>');
    $('#status').append('<p class="loading">Loading</p>');
    $('.loading').css('text-align', 'center');
    var rover = $('#rover option:selected').text();
    var linkString = "https://api.nasa.gov/mars-photos/api/v1/manifests/" + rover + "?api_key=Shw9odnKBL8dzujCnfdxKYWEdeiRoS5aMtCSbWBH";
    $.get(linkString, function(data){
        $('#name').empty();
        $('#name').append(rover);
        $('#launch').empty();
        $('#launch').append(data.photo_manifest.launch_date);
        $('#status').empty();
        $('#status').append(data.photo_manifest.status);
    });  
}
