$(function () {

  let chosenHour;
  let chosenHourValue;
  let newOb;
  let newAr;
  let saveData = [];
  let index;
  let foundOb;

  // This sets the date and the hour.
  const time = dayjs();
  const hour = time.format("H");

  // This displays the current date in the header :)
  const currentDay = $("#currentDay").text(time.format("MMMM D, YYYY")).attr("class", "h2")

  // This gets the saveData from local storage, and keeps it from nullifying saveData if there's nothing there.
  newAr = JSON.parse(localStorage.getItem("saveData"))
  if (newAr !== null) {
    saveData = newAr;
  }

  // This writes the calendar to the page using jQuery.
  for (i = 9; i < 18; i++) {
    $(".calendar").append(
      $("<div>").attr("id", `hour-${i}`).addClass(`row time-block ${isItTime(i)}`).append(
        $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(amPm(i)),
        $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3").data("id", `${i}`).text(getText(i)),
        $("<button>").addClass(`btn saveBtn col-2 col-md-1`).attr("aria-label", "save").append(
          $("<i>").addClass("fas fa-save").attr("aria-hidden", "true"))))
  }

  // This gets the saved text for the loop.
  function getText(i) {
    const foundObj = saveData.find((obj) => obj.hour == i);
    return foundObj?.value || "";
  }

  // This tells the for loop whether to say AM or PM.
  function amPm(i) {
    if (i < 12) {
      return `${i}AM`
    }
    else if (i == 12) {
      return `${i}PM`
    }
    else if (i > 12) {
      return `${i - 12}PM`
    }
  }

  // This tells the for loop whether each hour block is past, present, or future
  function isItTime(i) {
    if (i < hour) {
      return "past"
    }
    else if (i == hour) {
      return "present"
    }
    else if (i > hour) {
      return "future"
    }
  }

  $(".btn").click(function () {

    // This sets the new data to be saved.
    chosenHour = ($(this).prev().data("id"));
    chosenHourValue = ($(this).prev().val());
    newOb = {
      hour: chosenHour,
      value: chosenHourValue
    };

    // This checks if there is old data to write over
    foundOb = saveData.find((obj) => obj.hour == chosenHour);
    index = saveData.indexOf(foundOb);

    // This writes the data in two different ways, depending on whether or not there is something to overwrite.
    if (saveData.foundOb !== saveData[index]) {
      saveData.splice(index, 1, newOb);
      console.log("splice");
    }
    else {
      saveData.push(newOb);
      console.log("push");
    };

    localStorage.setItem("saveData", JSON.stringify(saveData));
  });

});