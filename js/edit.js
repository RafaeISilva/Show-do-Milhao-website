const inputText = document.getElementById("newArray")
const confirmbtn = document.getElementById("confirmbtn")
const highScoreArray = document.getElementById("highScoreArray")

$.getJSON("highScores.json", function (data) {
  highScoreArray.innerText = JSON.stringify(data);

  saveNewArray = (e) => {
    let output = inputText.value

    $.ajax
      ({
        type: "POST",
        dataType: 'json',
        async: true,
        url: '/save',
        data: { data: output },
        success: function () { console.log("success"); },
        failure: function () { console.log("failure"); }
      });
    document.getElementById("isSaved").innerText = "Saved Successfully!"
  }
})