async function getTweets() {
    const tweetContainer = document.getElementById("tweets");
    const response = await fetch(`${tweetContainer?.dataset.gettweeturl}`, {
        method: "GET",
    });
    const data = await response.json();

    return data;
}

async function getUserDataFromPk(pk) {
    const tweetContainer = document.getElementById("tweets");
    const response = await fetch(`${tweetContainer?.dataset.getuserurl?.replace("0", pk)}`, {
        method: "GET"
    });
    const data = await response.json();

    return data;
}

async function addTweetPost(tweet) {
    const tweetContainer = document.getElementById("tweets");
    const userData = await getUserDataFromPk(tweet.user);
    const userpk = document.getElementById("post-tweet").dataset.userpk;

    tweetContainer?.insertAdjacentHTML("beforeend",
        `
        <div class="tweet-post border p-4" data-id="${tweet.id}">
            <div class="information flex flex-wrap gap-4 mb-4">
                <div class="profile-picture">
                    <a href="${userData.profile_path}">
                        <img src="${userData.avatar_path}" width="30" class="rounded-full">
                    </a>
                </div>
                <div class="profile-name">
                    <a href="${userData.profile_path}">
                        ${userData.username}
                    </a>
                </div>
                <div class="date mr-auto">${tweet.post_date}</div>
            </div>
            <div class="message max-w-[520px]">
                ${tweet.content}
            </div>
        </div>
        `
    );

    if (tweet.user === +userpk) {
        const information = document.querySelector(`[data-id="${tweet.id}"] .information`);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete"
        deleteButton.classList.add("border", "p-1", "open-modal");
        deleteButton.setAttribute("data-id", tweet.id);
        information.insertAdjacentElement("beforeend", deleteButton);

        deleteTweetModal(tweet.id);
    }
}

async function addNewTweetPost(tweet) {
    const tweetContainer = document.getElementById("tweets");
    const userData = await getUserDataFromPk(tweet.user);
    const userpk = document.getElementById("post-tweet").dataset.userpk;

    tweetContainer?.insertAdjacentHTML("afterbegin",
        `
        <div class="tweet-post border p-4" data-id="${tweet.id}">
            <div class="information flex flex-wrap gap-4 mb-4">
                <div class="profile-picture">
                    <a href="${userData.profile_path}">
                        <img src="${userData.avatar_path}" width="30" class="rounded-full">
                    </a>
                </div>
                <div class="profile-name">
                    <a href="${userData.profile_path}">
                        ${userData.username}
                    </a>
                </div>
                <div class="date mr-auto">${tweet.post_date}</div>
            </div>
            <div class="message max-w-[520px]">
                ${tweet.content}
            </div>
        </div>
        `
    );

    if (tweet.user === +userpk) {
        const information = document.querySelector(`[data-id="${tweet.id}"] .information`);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete"
        deleteButton.classList.add("border", "p-1", "open-modal");
        deleteButton.setAttribute("data-id", tweet.id);
        information.insertAdjacentElement("beforeend", deleteButton);

        deleteTweetModal(tweet.id);
    }
}

async function showTweets() {
    try {
        const data = await getTweets();

        for (const tweet of data) {
            await addTweetPost(tweet);
        }

    } catch (error) {
        console.log(error);
    }
}

async function postTweet() {
    const form = document.getElementById("post-tweet");

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const userpk = form.dataset.userpk;
        const content = document.querySelector("[name='content']").value;

        try {
            const response = await fetch(`${form?.dataset.posturl}`, {
                method: "POST",
                body: JSON.stringify({
                    "user": userpk,
                    "content": content
                }),
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            await addNewTweetPost(data);
        } catch (error) {
        }
    });
}

async function deleteTweet(pk) {
    const form = document.getElementById("post-tweet");
    const userpk = form.dataset.userpk;
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    try {
        const response = await fetch(`${form?.dataset.deleteurl.replace("0", pk)}`, {
            method: "DELETE",
            body: JSON.stringify({
                "user": userpk,
            }),
            headers: {
                'X-CSRFToken': csrftoken,
                'Content-Type': 'application/json'
            },
        });

        if (response.status === 202) {
            document.querySelector(`.tweet-post[data-id="${pk}"]`).remove();
            const modal = document.getElementById("modal");
            modal.classList.add("hidden");
        }
    } catch (error) {
        console.log(error);
    }
}

function deleteTweetModal(pk) {
    const modal = document.getElementById("modal")
    const modalContainer = document.getElementById("modal-container")
    const openModalButton = document.querySelector(`[data-id="${pk}"] .open-modal`);
    const cancelButton = document.getElementById("cancel-button")
    const okButton = document.getElementById("ok-button")

    openModalButton.addEventListener("click", (e) => {
        modal.classList.remove("hidden");
        okButton.addEventListener("click", async () => {
            await deleteTweet(e.target.dataset.id);
        }, { once: true });
    })

    cancelButton.addEventListener("click", () => {
        modal.classList.add("hidden");
    })

    window.addEventListener("click", (e) => {
        if (e.target == modalContainer) {
            modal.classList.add("hidden");
        }
    })
}

showTweets();
postTweet();