var allHandles = new Set(); // Using a set to prevent duplicates
var lastSize = 0;
var confirmEndCount = 0; // Counter to confirm the end of the list

function scrollToBottom() {
  const distance = 500; // smaller scroll distance to mimic human scrolling
  const delay = 2000; // increased delay to allow for content loading

  let interval = setInterval(() => {
    window.scrollBy(0, distance);
    extractHandles();

    if (allHandles.size === lastSize) {
      // No new handles found in this scroll
      confirmEndCount++;
    } else {
      // New handles found, reset the counter
      confirmEndCount = 0;
    }

    if (confirmEndCount >= 3) {
      // If no new handles are found 3 times in a row, we consider it the end
      clearInterval(interval);
      console.log('Reached the end of the following list.');
      console.log(Array.from(allHandles).join('\n'));
      console.log(`Total handles extracted: ${allHandles.size}`);
    }

    lastSize = allHandles.size;
  }, delay);
}

function extractHandles() {
  var elements = document.querySelectorAll('span[style="text-overflow: unset;"]');

  elements.forEach(function(el) {
    var handleText = el.textContent;
    if (handleText.startsWith('@')) {
      allHandles.add(handleText.substring(1));
    }
  });
}

scrollToBottom(); // Start the process
