$(document).ready(function(){
    var nav = document.getElementById('navbar');
    var navItem = document.querySelectorAll('#navbar li');
    
    //I found this function on https://stackoverflow.com/questions/9333379/check-if-an-elements-content-is-overflowing
    function isOverflown(element) {
        return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    }
    
    function overFlow(){
        if(isOverflown(nav)){
            for (var i = 3; i > 0; i--){
                navItem.item(i).remove();
            }

            //I got this picture from https://en.wikipedia.org/wiki/Hamburger_button
            var dropDown = '<li><img id="dropDown" src="images/dropDown.png" alt="Drop Down"></li>'

            $('#navbar').append(dropDown);
            $('#dropDown').css("width", "25px");
            $('#dropDown').css("position", "fixed");
            $('#dropDown').css("right", "10%");
            $('#dropDown').css("top", "10px");
            $('#dropDown').click(function(){
                navItem = document.querySelectorAll('#navbar li');
                if(navItem.length > 2){
                    for (var i = 4; i > 1; i--){
                        navItem.item(i).remove();
                    }
                    $('#navbar li').css("display", "inline-block");
                    $('#navbar').css('height', '8vh');
                    $('#navbar').css('text-align', 'left');
                    $('body').css('padding-top', '80px');
                }
                else{
                    var skills = '<li><a href="Tlbbf5ColumnsF20.html">Skills</a></li>';
                    var classes = '<li><a href="Tlbbf5TablesF20.html">Classes Taken</a></li>'
                    var projects = '<li><a href="Tlbbf5ProjectsF20.html">Projects</a></li>'

                    $('#navbar').append(skills);
                    $('#navbar').append(classes);
                    $('#navbar').append(projects);

                    $('#navbar li').css("display", "block");
                    $('#navbar').css('height', 'auto');
                    $('#navbar').css('text-align', 'center');
                    $('body').css('padding-top', '190px');
                }
            });
        }
    }
    overFlow();
    
    //I found the code for this window event listener at https://www.w3schools.com/js/tryit.asp?filename=tryjs_addeventlistener_dom
    window.addEventListener("resize", function(){
        overFlow();
    });
});