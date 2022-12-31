const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
    form.querySelector('.loading').classList.add('d-block');
    form.querySelector('.error-message').classList.remove('d-block');
    form.querySelector('.sent-message').classList.remove('d-block');
    const formData = new FormData(form);
    e.preventDefault();
    var object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    var json = JSON.stringify(object);

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: json
    })
        .then(async (response) => {
            if (response.status == 200) {
                form.querySelector('.loading').classList.remove('d-block');
                form.querySelector('.sent-message').classList.add('d-block');
                console.log("ok");
            } else {
                console.log(response);
            }
        })
        .catch((error) => {
            console.log(error);
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                form.querySelector('.sent-message').classList.remove('d-block');
            }, 1000);
        });
});