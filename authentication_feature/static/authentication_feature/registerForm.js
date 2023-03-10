function setRegisterForm() {
    const form = document.getElementById("register-form");

    form?.addEventListener("submit", async (e) => {
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
                addMessage(data.message, "register");
            }

        } catch (error) {
            addMessage(error, "register");
        }

    })
}

function addMessage(errorMessage, id) {
    document.getElementById("message")?.remove();
    const div = document.getElementById(id);
    div?.insertAdjacentHTML("afterbegin", `
                <div id="message" class="mb-4 p-4 font-bold text-white bg-red-300 rounded-lg max-w-[320px]">Detail:<br>${errorMessage}</div>
            `)
}

setRegisterForm();