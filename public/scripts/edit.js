var customdiv = [];
var appendhere = [];
var cln = [];
var tempId = 123456789

customdiv[0] = document.getElementById("customdiv1")
customdiv[1] = document.getElementById("customdiv2")
customdiv[2] = document.getElementById("customdiv3")
customdiv[3] = document.getElementById("customdiv4")

appendhere[0] = document.getElementById("appendhere1")
appendhere[1] = document.getElementById("appendhere2")
appendhere[2] = document.getElementById("appendhere3")
appendhere[3] = document.getElementById("appendhere4")

// CLEARING TEXT NODES
for (var i = 0; i < 4; i++) {
    for (var j = 0; j < appendhere[i].childNodes.length; j++) {
        if (appendhere[i].childNodes[j].nodeType != 1) {
            appendhere[i].removeChild(appendhere[i].childNodes[j])
        }
    }
}

// CLONING CUSTOM DIVS
for (var i = 0; i < 4; i++) {
    cln[i] = customdiv[i].cloneNode(true);
}
// INSERTION FUNC
function insertion(para) {
    cln[para].id = "dummy" + tempId
    cln[para].querySelector("a").setAttribute("onclick", "deletion(" + tempId + ")")
    // cln[para].querySelector("h5").textContent = "#"
    tempId--
    appendhere[para].appendChild(cln[para].cloneNode(true))
    if (para != 3) {
        initializeDate()
    }
}

// DELETION FUNC
function deletion(para2) {
    var id = "dummy" + para2
    var tempDelete = document.getElementById(id);
    tempDelete.remove()
}
// DATE FUNC
function initializeDate() {
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
