var divlength = [0, 0, 0, 0];
var appendlength = []
var customdiv = [];
var appendhere = [];
customdiv[0] = document.getElementById("customdiv1")
customdiv[1] = document.getElementById("customdiv2")
customdiv[2] = document.getElementById("customdiv3")
customdiv[3] = document.getElementById("customdiv4")
appendhere[0] = document.getElementById("appendhere1")
appendhere[1] = document.getElementById("appendhere2")
appendhere[2] = document.getElementById("appendhere3")
appendhere[3] = document.getElementById("appendhere4")
for (var i = 0; i < 4; i++) {
    appendlength[i] = appendhere[i].getElementsByClassName("org").length
}

var cln = [];

for (var i = 0; i < 4; i++) {
    cln[i] = customdiv[i].cloneNode(true);
}

function insertion(para) {
    appendlength[para]++;
    cln[para].id = "customdivchild"
    cln[para].querySelector("h5").textContent = "#" + (appendlength[para])
    // customdiv[para].appendChild(cln[para].cloneNode(true));
    appendhere[para].appendChild(cln[para].cloneNode(true))
    M.AutoInit();
    var currYear = (new Date()).getFullYear();
    $(document).ready(function() {
        $(".datepicker").datepicker({
            defaultDate: new Date(currYear, 1, 31),
            maxDate: new Date(currYear, 12, 31),
            yearRange: [1950, currYear],
            format: "yyyy/mm/dd"
        });
    });
}

function deletion(para) {
    if (divlength[para] > 0) {
        appendhere[para].removeChild(appendhere[para].lastChild);
        divlength[para]--;
    }
}
// var button = document.querySelectorAll("button");
// var div1 = document.getElementById("customdiv1");
// var cln = div1.cloneNode(true);
// var length = div1.getElementsByTagName("div").length;
// var temp = length;
// var action = [];
// for (var i = 0; i < length; i++) {
//     action.push("text");
// }
// button[0].setAttribute("value", action)

// function insertion(para) {
//     length++;
//     var div = document.createElement("div");
//     var input = document.createElement("input");
//     var label = document.createElement("label");
//     var labeltext = document.createTextNode(length + ": Question" + " Type: " + para.toUpperCase());
//     setAttributes(label, { "for": "question" });
//     setAttributes(div, { "class": "input-field animated fadeIn" });
//     setAttributes(input, { "type": "text", "name": "question", "class": "validate", "id": "question", "required": "" });
//     label.appendChild(labeltext);
//     div.appendChild(label);
//     div.appendChild(input);
//     document.getElementById("customdiv").appendChild(div);
//     action.push(para)
//     button[0].setAttribute("value", action)
//     console.log(length)

// }

// function deletion() {
//     var remove = document.getElementById("customdiv");
//     action.pop()
//     if (length != temp) {
//         length--;
//         remove.removeChild(remove.lastChild)
//     }
// }

// function setAttributes(el, attrs) {
//     for (var key in attrs) {
//         el.setAttribute(key, attrs[key]);
//     }
// }
