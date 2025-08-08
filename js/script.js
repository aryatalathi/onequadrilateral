document.getElementById("quoteForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const form = document.getElementById("quoteForm");
    const formData = new FormData(form);

    fetch("YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert("Quote Request Submitted!");
        form.reset();
        bootstrap.Modal.getInstance(document.getElementById("quoteModal")).hide();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("There was an error submitting your request.");
    });
});
