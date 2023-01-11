// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {

  let chosenHour;
  let chosenHourValue;
  let newOb;
  let newAr;
  let saveData = [];
  let textValue;

  // This sets the date and the hour.
  const time = dayjs();
  const hour = time.format("H");
  
  // This displays the current date in the header :)
  const currentDay = $("#currentDay").text(time.format("MMMM D, YYYY")).attr("class", "h2")

    // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

// This gets the saveData from local storage, and keeps it from nullifying saveData if there's nothing there.
newAr = JSON.parse(localStorage.getItem("saveData"))
if( newAr !== null ){
  saveData = newAr;
}

// This writes the calendar to the page using jQuery.
for(i=9;i<18;i++){
$(".calendar").append(
  $("<div>").attr("id", `hour-${i}`).addClass(`row time-block ${isItTime(i)}`).append(
    $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(amPm(i)), 
    $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3").data("id", `${i}`).text(getText(i)),
    $("<button>").addClass(`btn saveBtn col-2 col-md-1`).attr("aria-label", "save").append(
      $("<i>").addClass("fas fa-save").attr("aria-hidden", "true"))))}
      
//What do I need to do when populating the text fields with saved data?
  //

// This gets the saved text for the loop.
function getText(i){
  let textValue = saveData.find(function(value){return value.hour === i});
  return textValue
}
console.log(textValue)

// This tells the for loop whether to say AM or PM.
function amPm(i){
  if(i<12){
    return `${i}AM`
  }
  else if(i==12){
    return `${i}PM`
  }
  else if(i>12){
    return `${i-12}PM`
  }
}

// This tells the for loop whether each hour block is past, present, or future
function isItTime(i){
  if(i<hour){
    return "past"
  }
  else if(i==hour){
    return "present"
  }
  else if(i>hour){
    return "future"
  }
}

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

// This saves the text input to local storage
// $(".btn").click(function(){
//   chosenHour = ($(this).prev().data("id"));
//   chosenHourValue = ($(this).prev().val());
//   newOb = {
//     [chosenHour]: chosenHourValue
//   }
//   saveData.push(newOb)
//   localStorage.setItem("saveData", JSON.stringify(saveData))
// })
$(".btn").click(function(){
  chosenHour = ($(this).prev().data("id"));
  chosenHourValue = ($(this).prev().val());
  newOb = {
    hour: chosenHour,
    value: chosenHourValue
  }
  saveData.push(newOb)
  localStorage.setItem("saveData", JSON.stringify(saveData))
})

});