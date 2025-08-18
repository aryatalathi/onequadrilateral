// document.getElementById("quoteForm").addEventListener("submit", function(e) {
//     e.preventDefault();

//     const form = document.getElementById("quoteForm");
//     const formData = new FormData(form);

//     fetch("YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL", {
//         method: "POST",
//         body: formData
//     })
//     .then(response => response.text())
//     .then(data => {
//         alert("Quote Request Submitted!");
//         form.reset();
//         bootstrap.Modal.getInstance(document.getElementById("quoteModal")).hide();
//     })
//     .catch(error => {
//         console.error("Error:", error);
//         alert("There was an error submitting your request.");
//     });
// });


document.getElementById("quoteForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  let form = e.target;
  let fileInput = form.querySelector('input[type="file"]');
  let file = fileInput.files[0];

  let fileData = "";
  let filename = "";

  if (file) {
    let reader = new FileReader();
    reader.onload = async function() {
      fileData = reader.result.split(",")[1]; // Base64
      filename = file.name;

      await sendData();
    };
    reader.readAsDataURL(file);
  } else {
    await sendData();
  }

  async function sendData() {
    let formData = {
      name: form.querySelector("[name='name']").value,
      email: form.querySelector("[name='email']").value,
      phone: form.querySelector("[name='phone']").value,
      product: form.querySelector("[name='product']").value,
      file: fileData,
      filename: filename
    };

    let response = await fetch("YOUR_WEB_APP_URL", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" }
    });

    let result = await response.json();
    if (result.result === "success") {
      alert("Request submitted successfully!");
      form.reset();
    } else {
      alert("Error: " + result.error);
    }
  }
});
