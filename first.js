const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}
function wishMe() {
    var day = new Date();
    var hour = day.getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}
window.addEventListener('load', () => {
    speak("Initializing Lullu...");
    wishMe();
});
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.onresult = function (event) {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};
btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
    setTimeout(()=>{
        content.textContent= "Click here to speak";
    },8000);
});
function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello') || message.includes('hi')) {
        speak("Hello Sir, How May I Help You?");
     } else if (message.includes("open")) {
            const site = message.replace("open", "").trim().toLowerCase();
        
            if (site) {
                try {
                    // Define app-specific deep links
                    const appDeepLinks = {
                        
                        whatsapp: "whatsapp://",
                        gmail: "mailto:",
                        spotify:"spotify://",
                    };
                    if (appDeepLinks[site]) {
                        // Attempt to open the app using its deep link
                        window.location.href = appDeepLinks[site];
                        speak(`Opening ${site} app.`);
                    } else {
                        // Fallback to opening the website
                        let url = site.startsWith("http") ? site : `https://${site}`;
                        url = site.includes(".") ? url : `${url}.com`; // Default to .com if no TLD is specified
                        window.location.href = url;
                        speak(`Opening ${site}.`);
                    }
                } catch (error) {
                    speak("Sorry, I couldn't open the app or website. Please try again.");
                }
            } else {
                speak("Please specify a website or app to open.");
            }
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found regarding " + message;
        speak(finalText);
    } else if (message.includes('maximize')) {
        // Simulate maximizing the window by opening a full-screen tab (no direct maximize API available in browsers)
        window.moveTo(0, 0);  // Move the window to top-left corner
        window.resizeTo(screen.width, screen.height);  // Resize window to full screen size
        speak("Maximizing the window.");
    } else if (message.includes('minimize')) {
        // Simulate minimizing the window by opening a small, invisible window
        window.open('about:blank', '_blank', 'width=1,height=1'); 
        speak("Minimizing the window.");
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}

