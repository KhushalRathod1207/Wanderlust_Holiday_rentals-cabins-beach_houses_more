(function () {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()


document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        let alerts = document.querySelectorAll(".alert");
        alerts.forEach(alert => {
            let bsAlert = new bootstrap.Alert(alert);
            bsAlert.close(); // Close the alert after 3 seconds
        });
    }, 2000); // 3000ms = 3 seconds
});




let taxSwitch2 = document.getElementById("flexSwitchCheckDefault");
taxSwitch2.addEventListener("click", () => {
    let taxInfo2 = document.getElementsByClassName("tex_info");
    for (info of taxInfo2) {
        if (info.style.display != "inline") {
            info.style.display = "inline";
            info.style.fontWeight = "bold";
        } else {
            info.style.display = "none";
        }
    }
});