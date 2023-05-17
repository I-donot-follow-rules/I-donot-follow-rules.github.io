let birthday = moment("2012-09-09 00:00+05:30")
function getAge () {
    let now = moment()
    let age = moment.preciseDiff(birthday, now)
    return age
}
window.addEventListener("DOMContentLoaded", function() {
    let span = document.getElementById("age")
    setInterval(function(){
        span.innerText = getAge()
    }, 1000)
})