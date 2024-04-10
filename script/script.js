document.addEventListener("DOMContentLoaded", () => {
    const arrayContainer = document.getElementById("arrayContainer")
    const msgJoke = document.getElementById("joke")
    const buttons = {
      upBtn: document.getElementById("upBtn"),
      downBtn: document.getElementById("downBtn"),
      leftBtn: document.getElementById("leftBtn"),
      rightBtn: document.getElementById("rightBtn")
    }
  
    const gridSize = 5;
    let catPosition = { x: 2, y: 2 }
    let zombiePosition = { x: 0, y: 0 }
    let pointPosition = rndPosition()
    let points = 0
  
    function createGrid() {
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
        
          const cell = document.createElement("div")
          cell.classList.add("array-item")
          arrayContainer.appendChild(cell)
        }
      }
    }
  
    function updatePosition(position, className) {
       
      const index = position.y * gridSize + position.x
      const cells = document.querySelectorAll(".array-item")
      cells[index].innerHTML = ""
      const img = document.createElement("img")
      img.src = `images/${className}.png`
      img.classList.add(`${className}-img`)
      cells[index].appendChild(img)
      
    }
  
    function moveCat(direction) {
        let newX = catPosition.x
        let newY = catPosition.y
      
        switch (direction) {
          case "up":
            if (catPosition.y > 0) newY--;
            break;
          case "down":
            if (catPosition.y < gridSize - 1) newY++;
            break;
          case "left":
            if (catPosition.x > 0) newX--;
            break;
          case "right":
            if (catPosition.x < gridSize - 1) newX++;
            break;
        }
        
        if (newX !== zombiePosition.x || newY !== zombiePosition.y) {
          catPosition.x = newX;
          catPosition.y = newY;
        }
        
        
        if (catPosition.x === pointPosition.x && catPosition.y === pointPosition.y) {
            points++;
            document.getElementById("points").innerText = points
            pointPosition = rndPosition()
            updatePosition(pointPosition, "point")
            fetchChuckNorrisJoke();
          }
          
        
          
          

          arrayContainer.innerHTML = "";
        
        
          createGrid()
          
          
          
          updatePosition(catPosition, "cat");
          updatePosition(pointPosition, "point");
          moveZombie()
          
        if (catPosition.x === zombiePosition.x && catPosition.y === zombiePosition.y) {
        
          resetGame();
          alert("The cat got caught by the zombie!")
        }

        
        
        
          
      }
  
    
      function moveZombie() {
        
        const randomMove = Math.floor(Math.random() * 4) + 1;
      
        
        if (randomMove === 1 || randomMove === 2) {
          if (zombiePosition.x < catPosition.x) zombiePosition.x++;
          else if (zombiePosition.x > catPosition.x) zombiePosition.x--;
          if (zombiePosition.y < catPosition.y) zombiePosition.y++;
          else if (zombiePosition.y > catPosition.y) zombiePosition.y--;
      
          
          const prevIndex = zombiePosition.y * gridSize + zombiePosition.x;
          const prevCell = document.querySelectorAll(".array-item")[prevIndex];
          updatePosition(zombiePosition, "zombie");
          prevCell.innerHTML = "";
          
        }
        
        updatePosition(zombiePosition, "zombie");
      }
    function fetchChuckNorrisJoke() {
        fetch("https://api.chucknorris.io/jokes/random")
          .then(response => response.json())
          .then(data => {
            //alert(data.value)
            //document.getElementById("joke").innerHTML=data.value
            msgJoke.innerHTML=data.value
          })
          .catch(error => console.error("Error fetching Chuck Norris joke:", error))
      }


    function rndPosition() {
      let newPosition;
      do {
        newPosition = {
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize)
        };
      } while ((newPosition.x === catPosition.x && newPosition.y === catPosition.y) 
            || (newPosition.x === zombiePosition.x && newPosition.y === zombiePosition.y));
      return newPosition;
    }

    buttons.upBtn.addEventListener("click", () => moveCat("up"))
    buttons.downBtn.addEventListener("click", () => moveCat("down"))
    buttons.leftBtn.addEventListener("click", () => moveCat("left"))
    buttons.rightBtn.addEventListener("click", () => moveCat("right"))

    createGrid();
    updatePosition(catPosition, "cat");
    updatePosition(zombiePosition, "zombie");
    updatePosition(pointPosition, "point");
  
    function resetGame() {
      
      catPosition = { x: 2, y: 2 };
      zombiePosition = { x: 0, y: 0 };
      points = 0;
      document.getElementById("points").innerText = points;

      arrayContainer.innerHTML = "";

      createGrid();
      updatePosition(catPosition, "cat");
      updatePosition(zombiePosition, "zombie");
      pointPosition = rndPosition();
      updatePosition(pointPosition, "point");
      
    }
  });