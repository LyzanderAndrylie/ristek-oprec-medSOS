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
            document.getElementById("message")?.remove();
            const div = document.getElementById("login") ?? document.getElementById("register");
            div.insertAdjacentHTML("afterbegin", `
                <div id="message" class="mb-4 p-4 font-bold text-white bg-red-300 rounded-lg">Detail:<br>${data.message}</div>
            `)
        }
        
    } catch (error) {
        console.log(error);
        document.getElementById("message")?.remove();
        const div = document.getElementById("login") ?? document.getElementById("register");
            div.insertAdjacentHTML("afterbegin", `
                <div class="mb-4 p-4 font-bold text-white bg-red-300 rounded-lg">Detail:<br>${error}</div>
            `)
    }

})