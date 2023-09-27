// Wrap the code in a function
function applyColorOnPageLoad() {
    // Create a Color Thief instance
    const colorThief = new ColorThief();

    // Replace 'image' with the ID of your image element
    const image = document.getElementById('image');

    // Extract the dominant color from the image
    const dominantColor = colorThief.getColor(image);

    // Create a <style> element or select an existing one if you have it in your HTML
    let style = document.getElementById('custom-style');

    // If the <style> element doesn't exist, create it
    if (!style) {
        style = document.createElement('style');
        style.id = 'custom-style'; // Assign an ID to the <style> element
        document.head.appendChild(style);
    }

    // Define the CSS code as text
    const cssCode = `
        @keyframes changeBackgroundColor {
          0% {
            background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), black;
          }
          50% {
            background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), black;
          }
          100% {
            background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]});
          }
        }

        body {
          background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), black;
          animation: changeBackgroundColor 1s ease-in 1 forwards;
        }`;

    // Set the CSS code as the content of the <style> element
    style.textContent = cssCode;
}

// Call the function when the page loads
window.addEventListener('load', applyColorOnPageLoad);


let movieTitle = document.getElementById('movie-title')
console.log(movieTitle)