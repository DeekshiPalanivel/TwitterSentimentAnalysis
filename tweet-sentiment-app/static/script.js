function analyzeSentiment() {
    const tweetText = document.getElementById('tweetText').value.trim();
    const spinner = document.getElementById('loadingSpinner');
    const resultCard = document.getElementById('resultCard');
    const resultText = document.getElementById('resultText');
  
    if (tweetText === "") {
      alert("Please enter a tweet.");
      return;
    }
  
    resultCard.classList.add("d-none");
    spinner.classList.remove("d-none");
  
    fetch("/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tweet: tweetText })
    })
    .then(response => response.json())
    .then(data => {
      spinner.classList.add("d-none");
      resultText.textContent = `The sentiment is: ${data.sentiment}`;
      resultCard.classList.remove("d-none");
    })
    .catch(error => {
      spinner.classList.add("d-none");
      alert("Error analyzing sentiment.");
      console.error("Error:", error);
    });
  }
  