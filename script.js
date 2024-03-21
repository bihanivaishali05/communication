const synth = window.speechSynthesis;

document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('cycle').addEventListener('click', function() {
        speak('To cycle');
    });
    document.getElementById('work').addEventListener('click', function() {
        speak('To work');
    });
    document.getElementById('cook').addEventListener('click', function() {
        speak('To cook');
    });

    
    if (document.getElementById('activitiesButton')) {
        document.getElementById('activitiesButton').addEventListener('click', function() {
            window.location.href = 'activities.html'; 
            speak('Activities'); 
        });
    }
});


function speak(text) {
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (text !== '') {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; 
        utterance.onend = function(event) {
            console.log('Speech has finished after ' + event.elapsedTime + ' milliseconds.');
        };
        synth.speak(utterance);
    }
}

function speakMorning() {
    speak('Good morning. Get up, brush, exercise, and take a shower.');
}

function speakGreeting() {
    speak('Namaste, Have a good Day');
}

function whatDayIsToday() {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    speak(day);
    alert('Today is ' + day);
}

function todaysDate() {
    const now = new Date();
    const date = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    speak(date);
    alert('Today\'s date is ' + date);
}

function currentTime() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    speak(time);
    alert('Current time is ' + time);
}


function todaysWeather(apiKey) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const weatherDescription = data.weather[0].description;
                    const temperature = data.main.temp;
                    const weather = `${weatherDescription}, ${temperature} degrees Celsius`;

                    speak(`Today's weather is ${weather}`);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        }, showError);
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}


function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            speak('User denied the request for Geolocation.');
            break;
        case error.POSITION_UNAVAILABLE:
            speak('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            speak('The request to get user location timed out.');
            break;
        case error.UNKNOWN_ERROR:
            speak('An unknown error occurred.');
            break;
    }
}
