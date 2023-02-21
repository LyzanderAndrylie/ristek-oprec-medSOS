// @ts-nocheck
const form = document.querySelector("form");

// $("form").submit(function (e) {
//     e.preventDefault();
//     $.ajax({
//         type: "POST",
//         url: form?.dataset.posturl,
//         data: $(this).serialize(),
//         success: () => {
//             console.log("success");
//             location.assign(form?.dataset.redirecturl);
//         }
//     })
//     $("[name=csrfmiddlewaretoken]").removeAttr("disabled");
// })

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const response = await fetch(form?.dataset.posturl, {
        method: "POST",
        body: new FormData(form),
    })

    if (response.status) {
        location.assign(form?.dataset.redirecturl);
    } else {
        alert(response?.message);
        $("[name=csrfmiddlewaretoken]").removeAttr("disabled");
    }
})