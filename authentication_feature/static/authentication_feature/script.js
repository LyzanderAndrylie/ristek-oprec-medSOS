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

    try {
        const response = await fetch(form?.dataset.posturl, {
            method: "POST",
            body: new FormData(form),
        })
    
        const data = await response.json();
        console.log(data);

        if (response.status === 200) {
            location.assign(form?.dataset.redirecturl);
        } else {
            alert(data?.message);
            $("[name=csrfmiddlewaretoken]").removeAttr("disabled");
        }
        
    } catch (error) {
        console.log(error);
    }

})