window.addEventListener("DOMContentLoaded", function () {
    let canvas = document.getElementById("snake-board")
    let context = canvas.getContext("2d")
    let width = canvas.width
    let height = canvas.height
    let rows = 17
    let cols = 17
    let cellWidth = width / cols
    let cellHeight = height / rows
    let Direction = {
        Up: "up",
        Down: "down",
        Left:"left",
        Right: "right"
    }
    let snake = Snake([Cell(10,4), Cell(10,3), Cell(10,2)], Direction.Right) 
    let apple = randomApple(snake.bodyParts)
    let canChangeDirection = true
    let score = 0
    function Snake(bodyParts, direction) {
        return {bodyParts, direction}
    }
    function Cell (row , col) {
        return {row, col}
    }
    function random (n) {
        return Math.floor (n * Math.random())
    }
    function randomCell () {
        return Cell(random(rows), random(cols))
    }
    function randomApple (bodyParts) {
        let newApple = randomCell()
        while (hasCell(newApple, bodyParts)) {
            newApple = randomCell()
        } 
        return newApple
    }
    function hasCell (cell, cells) {
        return cells.some(function (otherCell) {
            return otherCell.row === cell.row && otherCell.col === cell.col
        }) 
    }
    function drawBoard() {
        context.fillStyle = "lawngreen"
        context.fillRect(0,0,width,height)
        context.fillStyle = "green"   
        for ( let row = 0; row < rows; row += 1) {
            let i = cellHeight * row
    
            for (let col = 0; col < cols; col += 1) {
                let light = row % 2 !== col % 2
                let j = cellWidth * col
                if (light) {
                    context.fillRect(j , i , cellWidth, cellHeight)
                }
                
            }
        }
    } 
    function drawApple (apple) {
        context.fillStyle = "red"
        drawCell(apple)
    }
    function drawSnake (snake) {
        let {bodyParts} = snake;
        let colors = ["hsl(240,100%, 20%)", "hsl(240,100%, 25%)", "hsl(240,100%, 30%)", "hsl(240,100%, 35%)", "hsl(240,100%, 40%)", "hsl(240,100%, 45%)" , "hsl(240,100%, 50%)", "hsl(240,100%, 45%)", "hsl(240,100%, 40%)", "hsl(240,100%, 35%)", "hsl(240,100%, 30%)", "hsl(240,100%, 25%)"]
        let i = 0
        for (let bodyPart of bodyParts) {
            context.fillStyle = colors[i % colors.length]
            drawCell(bodyPart)
            i = i + 1
        }
    }
    function drawCell ({row, col}) {
        let y = cellHeight * row
        let x = cellWidth * col
        context.fillRect(x, y, cellWidth, cellHeight)
    }
    function updateGame (apple, snake) {
        let {bodyParts, direction} = snake
        let [head, ...tail] = bodyParts
        let newHead
        switch (direction) {
            case Direction.Up: 
                newHead = Cell(head.row - 1, head.col)
                break
            case Direction.Down: 
                newHead = Cell(head.row + 1, head.col)
                break
            case Direction.Left: 
                newHead = Cell(head.row, head.col - 1)
                break
            case Direction.Right: 
                newHead = Cell(head.row, head.col + 1)
                break
        }
        if (newHead.row < 0 || newHead.row >= rows || newHead.col < 0 || newHead.col >= cols) {
            clearInterval(intervalId)
            return [apple, snake]
        }
        let ateApple = newHead.row === apple.row && newHead.col === apple.col
        if (ateApple) score++
        let newTail = ateApple ? bodyParts : bodyParts.slice(0, -1)
        if (hasCell(newHead, newTail)) {
            clearInterval(intervalId)
            return [apple, snake]
        }
        let newBodyParts = [newHead, ...newTail]
        let newSnake = Snake(newBodyParts, direction)
        let newApple = ateApple ? randomApple(newSnake.bodyParts) : apple
        return [newApple, newSnake]
    }
    function animate (apple, snake) { 
        draw(apple, snake)       
        return updateGame(apple, snake)
    }
    function draw (apple, snake) {
        drawBoard()
        drawApple(apple)
        drawSnake(snake)
        document.getElementById("score").innerText = `Score: ${score}`
    }
    window.addEventListener("keydown", function (event) {
        if (! canChangeDirection) return
        switch(event.key) {
            case "ArrowUp":
                if (snake.direction !== Direction.Down){
                    snake.direction = Direction.Up;
                    canChangeDirection = false
                    if (! intervalId) {
                        startGame()
                    }
                }
                break;
            case "ArrowDown":
                if (snake.direction !== Direction.Up){
                    snake.direction = Direction.Down;
                    canChangeDirection = false
                    if (! intervalId) {
                        startGame()
                    }
                }
                break;
            case "ArrowLeft":
                if (snake.direction !== Direction.Right){
                    snake.direction = Direction.Left;
                    canChangeDirection = false
                    if (! intervalId) {
                        startGame()
                    }
                }
                break;   
            case "ArrowRight":
                if (snake.direction !== Direction.Left){
                    snake.direction = Direction.Right;
                    canChangeDirection = false
                    if (! intervalId) {
                        startGame()
                    }
                }
                break;             
        }
    })
    function startGame () {
        let message = document.getElementById("press-and-begin")
        message.style.display = "none"
        intervalId = setInterval(function() {
            ([apple, snake] = animate(apple, snake))
            canChangeDirection = true
        }, 1000/7.5)
    }
    draw(apple, snake)
    let intervalId 

})  