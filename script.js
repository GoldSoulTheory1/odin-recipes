const container = document.querySelector('.container');
const resetButton = document.querySelector('#reset-button');

// Function to generate a new grid with the specified size
function generateGrid(size) {
  // Remove existing grid
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
  // Generate new grid
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    container.appendChild(square);
    // Add event listeners for mouseover, mousemove, and mouseout
    let opacity = 0;
    let intervalId;
    square.addEventListener('mouseover', function(event) {
      if (intervalId) {
        clearInterval(intervalId); // Clear any previous interval
      }
      intervalId = setInterval(function() {
        if (opacity < 0.9) {
          opacity += 0.1;
          event.target.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
        }
      }, 100);
    });
    square.addEventListener('mousemove', function(event) {
      if (intervalId && opacity < 0.9) {
        opacity += 0.1;
        event.target.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
      }
    });
    square.addEventListener('mouseout', function(event) {
      if (intervalId) {
        clearInterval(intervalId); // Clear the interval
        intervalId = null;
      }
      // Reset the opacity and keep the background color
      opacity = opacity > 0 ? opacity : 0;
      event.target.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
    });
  }
}

// Add event listener for Reset Grid button
resetButton.addEventListener('click', function(event) {
  let gridSize = prompt("Enter the number of squares per side (max 100):");
  gridSize = parseInt(gridSize);
  if (!isNaN(gridSize) && gridSize > 0 && gridSize <= 100) {
    generateGrid(gridSize);
  } else {
    alert("Invalid input. Please enter a number between 1 and 100.");
  }
});

// Generate the initial grid
generateGrid(16);