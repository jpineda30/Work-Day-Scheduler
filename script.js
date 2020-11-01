$(document).ready(function() {

    //variables
   var currentHour = moment().format("H");
   
   //var conv = moment(currentHour, "hh").format('LT'); 
   

   //object agenda 
    var workDay = {
        dateDay : "",
        hours : [

            ["09",""],
            ["10",""],
            ["11",""],
            ["12",""],
            ["13",""],
            ["14",""],
            ["15",""],
            ["16",""],
            ["17",""],
    
        ]
        
        }

   //initialize current day in case it doesnt exist in local storage     
    var currentDay = JSON.parse(localStorage.getItem("currentDay"));

   //if there is info stored then retrive it     
    if(currentDay === null)
    {
        currentDay = workDay;
        localStorage["currentDay"] = JSON.stringify(currentDay);
    }
   
    
   //get the hours from the object to initialize html elements
    var hours = currentDay.hours;
   //for each hour create the elements  
    for(var index of hours)
    { 
        //get hour
       var h = index[0];
        //get saved texts 
       var content = index[1];

       
       
       var line = $("<div>");
       line.addClass("d-flex justify-content-between row"); 

       var hour = $("<div>");
       var formatedhour = moment(h,"h").format("hh:mm a");
       hour.text(formatedhour);
       hour.addClass("hour");
       line.append(hour);

       var body = $("<input>");
       body.val(content);
      

      var item = moment(h,"H");
      console.log(item);

      //compare hours with current time to assign classes
      if(h == currentHour)
      {
        
        body.addClass("present flex-fill");
        
      }
      else if (h < currentHour)
      {
        body.addClass("past flex-fill");
        
      }
      else
      {
        body.addClass("future flex-fill");
        
      }
      

       line.append(body);

       var button = $("<button>");
       button.append('<i><img src="Assets/save-white-18dp.svg" alt="save"></i>');
       button.addClass("saveBtn p-3");
       line.append(button);
       
       $("#container").append(line);
       
    }

   
  //methods   
    //set clock on display
    setInterval(function(){
        var rNow = moment().format('dddd') + ", " + moment().format("MMM Do h:mm:ss a") + " " ; 
        $("#currentDay").text(rNow);

    },1000)
    
    //events

    //on click retrive the saved object, save text in the right index and then save it again
    $(".saveBtn").on("click",function(){

        var save = JSON.parse(localStorage.getItem("currentDay"));
        console.log(save);
        var parent = $(this).parent();
        var son = parent.children("input");
        var index = parent.index();
        
        
        save.hours[index][1] = son.val();

        console.log(save.hours[index][1]);

        localStorage["currentDay"] = JSON.stringify(save);

    });


    

})