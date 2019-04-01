window.onload = function()
{
    var cities = JSON.parse(
    '[\
        {"voivodeship":"Wielkopolskie", "name":"Poznań"}, \
        {"voivodeship":"Dolnośląskie", "name":"Wrocław"}, \
        {"voivodeship":"Mazowieckie", "name":"Warszawa"} \
    ]');

    var formCity = document.querySelector("#formCity");
    var city = document.querySelector("#city");

    for(var i = 0; i < cities.length; ++i)
    {
        var elementOption = generateElement("option", cities[i].name, cities[i].name);
        city.appendChild(elementOption);
    }

    var cinemas = JSON.parse(
    '[ \
        {"city":"Poznań", "name":"51"}, \
        {"city":"Poznań", "name":"Helios"}, \
        {"city":"Poznań", "name":"Plaza"}, \
        {"city":"Warszawa", "name":"Multikino"}, \
        {"city":"Warszawa", "name":"Złote tarasy"}, \
        {"city":"Warszawa", "name":"Mokotów"}, \
        {"city":"Wrocław", "name":"Platinium"}, \
        {"city":"Wrocław", "name":"Helios"}, \
        {"city":"Wrocław", "name":"Pasaż"} \
    ]');

    formCity.city.onchange = function(e)
    {
        var checkCity = cinemas.filter((item) => item.city === formCity.city.options[formCity.city.options.selectedIndex].value);
        
        var formCinema = document.querySelector("#formCinema");
        formCinema.innerHTML = "";

        var elementSelect = generateElement("select", "cinema", "cinema");
        formCinema.appendChild(elementSelect);

        var cinema = document.querySelector("#cinema");
        cinema.innerHTML = "";
        for(var i = 0; i < checkCity.length; ++i)
        {
            var elementOption = generateElement("option", checkCity[i].name, checkCity[i].name)
            cinema.appendChild(elementOption);
        }

        var newLine = document.createElement("br");
        var elementButton = generateElement("input", "schedule", "Repertuar");
        formCinema.appendChild(newLine);
        formCinema.appendChild(elementButton);

        var schedule = document.querySelector("#schedule");
        schedule.addEventListener('click', function(event)
        {
            event.preventDefault();
            var movies = JSON.parse(
            '[\
                {"name":"13 dzielnica", "duration":"100", "scheduleHour":"10:00:00"}, \
                {"name":"007 James Bond", "duration":"120", "scheduleHour":"18:00:00"}, \
                {"name":"8 mila", "duration":"180", "scheduleHour":"20:00:00"}, \
                {"name":"Skazani na Shawshank", "duration":"142", "scheduleHour":"21:00:00"} \
            ]');
            var moviesByCity = JSON.parse(
            '[ \
                {"name":"13 dzielnica", "duration":"110", "scheduleHour":"10:00:00", "city":"Poznań"}, \
                {"name":"007 James Bond", "duration":"120", "scheduleHour":"18:00:00", "city":"Poznań"}, \
                {"name":"8 mila", "duration":"130", "scheduleHour":"20:00:00", "city":"Poznań"}, \
                {"name":"Skazani na Shawshank", "duration":"140", "scheduleHour":"21:00:00", "city":"Poznań"}, \
                {"name":"Nietykalni", "duration":"150", "scheduleHour":"11:00:00", "city":"Wrocław"}, \
                {"name":"Dwunastu gniewnych ludzi", "duration":"160", "scheduleHour":"13:00:00", "city":"Wrocław"}, \
                {"name":"Ojciec chrzestny", "duration":"170", "scheduleHour":"17:00:00", "city":"Wrocław"}, \
                {"name":"Władca Pierścieni: Powrót króla", "duration":"120", "scheduleHour":"11:30:00", "city":"Warszawa"}, \
                {"name":"Pulp Fiction", "duration":"150", "scheduleHour":"15:00:00", "city":"Warszawa"}, \
                {"name":"Siedem", "duration":"105", "scheduleHour":"16:30:00", "city":"Warszawa"}, \
                {"name":"Podziemny krąg", "duration":"140", "scheduleHour":"19:00:00", "city":"Warszawa"}, \
                {"name":"Incepcja", "duration":"123", "scheduleHour":"22:30:00", "city":"Warszawa"} \
            ]');

            var selectedCityForFilm = formCity.city.options[formCity.city.selectedIndex].value;
            //var selectedCinemaForCity = formCinema.cinema.options[formCinema.cinema.selectedIndex].value;
            var cityMovies = moviesByCity.filter((item) => item.city === selectedCityForFilm);

            var formSchedule = document.querySelector("#formSchedule");
            formSchedule.innerHTML = "";

            var elementSelectSchedule = generateElement("select", "film", "film");
            formSchedule.appendChild(elementSelectSchedule);

            var films = document.querySelector("#film");
            for(var i = 0; i < cityMovies.length; ++i)
            {
                var currentTime = new Date().toLocaleTimeString();
                if(currentTime < cityMovies[i].scheduleHour)
                {
                    var movieInfo = cityMovies[i].name + " - godzina seansu: " + cityMovies[i].scheduleHour + " - czas trwania: " + cityMovies[i].duration + " minut." 
                    var elementOptionSchedule = generateElement("option", movieInfo, cityMovies[i].name);                                     
                    films.appendChild(elementOptionSchedule);
                }
            }

            var cinemaHalls = JSON.parse(
            '[\
                {"city":"Poznań", "cinema":"51", "hallRows":"4", "hallColumns":"4"}, \
                {"city":"Poznań", "cinema":"Helios", "hallRows":"4", "hallColumns":"5"}, \
                {"city":"Poznań", "cinema":"Plaza", "hallRows":"4", "hallColumns":"6"}, \
                {"city":"Wrocław", "cinema":"Platinium", "hallRows":"5", "hallColumns":"5"}, \
                {"city":"Wrocław", "cinema":"Helios", "hallRows":"5", "hallColumns":"6"}, \
                {"city":"Wrocław", "cinema":"Pasaż", "hallRows":"5", "hallColumns":"7"}, \
                {"city":"Warszawa", "cinema":"Mokotów", "hallRows":"6", "hallColumns":"6"}, \
                {"city":"Warszawa", "cinema":"Multikino", "hallRows":"6", "hallColumns":"7"}, \
                {"city":"Warszawa", "cinema":"Złote tarasy", "hallRows":"6", "hallColumns":"8"} \
            ]');
            
            if(formSchedule.film.selectedIndex === -1)
            {
                var summary = document.querySelector("#summary");
                var date = new Date();
                summary.innerHTML = "W wybranym mieście i kinie w dniu: " + date.toLocaleDateString() +  " nie są dostępne żadne seanse..."
                window.scrollBy(0, 500);
            }
            else
            {
                var selectedCity = formCity.city.options[formCity.city.selectedIndex].value;
                var selectedCinema = formCinema.cinema.options[formCinema.cinema.selectedIndex].value;
                var checkCinema = cinemaHalls.find((item) => item.city === selectedCity && item.cinema === selectedCinema);
                generatePlacesInCinemaHallCreateElement(checkCinema.hallRows,checkCinema.hallColumns, "sittings");
                window.scrollBy(0, 700);

                var elements = document.querySelectorAll(".place");
                var summary = document.querySelector("#summary");
                var ticketCounter = 0;
                var ticketPrice = 10;
                var toPay = 0;
                summary.innerHTML = "";       
                
                elements.forEach(element => 
                {
                    element.addEventListener('click', function()
                    {
                        if(element.checked)
                        {
                            ticketCounter ++;
                            toPay += ticketPrice;
                        }
                        else
                        {
                            ticketCounter--;
                            toPay -= ticketPrice;
                        }
                        summary.innerHTML = "Podsumowanie: <br> Zarezerwowane bilety: " + ticketCounter + " Do zapłaty: " + toPay + " zł";
                        window.scrollBy(0, 100);
                    })  
                });
            }
        });
    }

    var menuItems = document.querySelectorAll("li");
    menuItems.forEach(item => 
    {
        item.addEventListener('click', function(e)
        {
            if(e.target.firstChild.nodeValue === "Ranking")
            {
                open("https://www.filmweb.pl/ranking/film");
            }
            else if(e.target.firstChild.nodeValue === "Zapowiedzi")
            {
                open("https://www.helios.pl/20,Radom/Zapowiedzi/");
            }
            else if(e.target.firstChild.nodeValue === "Baza filmów")
            {
                open("https://multikino.pl/filmy");
            }
            else if(e.target.firstChild.nodeValue === "Kontakt")
            {
                open("https://multikino.pl/faq-multi");
            }
            else
            {
                return;
            }
        });
    });

    menuItems.forEach(item => 
    {   
        item.addEventListener('mouseover', function(e)
        {
            item.setAttribute("class", "changeFont");
        });

        item.addEventListener('mouseout', function(e)
        {
            item.removeAttribute("class");
        });
    });


    function generatePlacesInCinemaHallInnerHtml(rows, columns)
    {
        var miejsca = ""
        for(var i = 1; i <= rows; ++i)
        {
            miejsca += "<div>"
            for(var j = 1; j <= columns; j++)
            {
                miejsca += "<span>" + "R:" + i + "M:" + j + "</span>" + " ";
            }
            miejsca += "<br>";
            miejsca += "</div>"
        }
        return miejsca; 
    }

    function generatePlacesInCinemaHallCreateElement(rows, columns, elementName)
    {
        var element = document.getElementById(elementName);
        
        var screen = document.createElement("p");
        screen.textContent = "==========E=====K=====R=====A=====N==========";
        
        element.innerHTML = "";
        element.appendChild(screen);
        
        for(var i = 0; i <= rows; ++i)
        {
            var para_parent = document.createElement("div");
            for(var j = 0; j <= columns; j++)
            {
                var checkBox = document.createElement("input");
                checkBox.type = "checkbox";
                checkBox.className = "place";

                para_parent.appendChild(checkBox);
            }
            element.appendChild(para_parent);
        }
    }

    function generateElement(name, value1, value2)
    {
        var element = document.createElement(name);
        if(name === "option")
        {
            element.text = value1;
            element.value = value2;
        }
        else if (name === "select")
        {
            element.id = value1;
            element.name = value2;
        }
        else if(name === "input")
        {
            element.type = "submit";
            element.id = value1;
            element.value = value2;
        }
        else
        {
        }
        return element;
    }
};
