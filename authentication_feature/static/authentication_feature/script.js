// @ts-nocheck
const form = document.querySelector("form");

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