window.onload = function()
{
    var submitButton = document.querySelector("#confirm");
    submitButton.addEventListener('click', function(e)
    {
        var myForm = document.querySelector("#myForm");
        var login = myForm.login.value;
        var password = myForm.password.value;

        var credentials = JSON.parse(
        '[\
            {"login":"w.styburski@gmail.com", "password":"123"}, \
            {"login":"bury226@interia.pl", "password":"456"}  \
        ]');

        var credentialsChecker = credentials.find((item) => item.login.toLowerCase() === login.toLowerCase() && item.password === password);
        if(credentialsChecker == null || credentialsChecker === undefined || login === "" || password === "")
        {
            var error = document.querySelector("#error");
            var message = "Błędny login: " + login +  " lub hasło, wpisz prawidłowe dane i spróbuj ponownie.";
            error.textContent = message;
            e.preventDefault();
        }
        else
        {
            open("views/schedule.html");
        }

    });
};