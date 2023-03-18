
window.addEventListener("DOMContentLoaded", function (){
    let story = document.getElementById("story")
    let id = localStorage.getItem("bookmark") || "once-upon-a-time"
     readStory(id)
    function readStory (id) {
        let template = document.getElementById(id)
        let content = template.content.cloneNode(true)
        let buttons = content.querySelectorAll(".buttons button")
        for (let button of buttons) {
            let templateId = button.dataset.template
            if (templateId === undefined) {
                continue
            } 
            button.addEventListener("click" , function () {
                readStory(templateId)
            } ) 
    
        }
        story.innerHTML = ""
        story.appendChild(content)
        localStorage.setItem("bookmark" , id)
    }
})
