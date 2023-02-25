const TWEET_URL = {
    getTweets: "/api/tweet/all/",
    getTweetsWithParam: (param) => `/api/tweet/all/?${param}`,
    postTweet: "/api/tweet/create/",
    deleteTweet: (pk) => `/api/tweet/delete/${pk}/`,
    userData: (pk) => `/user-data/${pk}/`,
    editTweet: (pk) => `/api/tweet/edit/${pk}/`
}

async function getTweets() {
    const param = document.getElementById("tweets")?.dataset.param
    let getURL = (param) ? TWEET_URL.getTweetsWithParam(param) : TWEET_URL.getTweets;

    const response = await fetch(getURL, {
        method: "GET",
    });

    const data = await response.json();

    return data;
}

async function getUserDataFromPk(pk) {
    const response = await fetch(`${TWEET_URL.userData(pk)}`, {
        method: "GET"
    });
    const data = await response.json();

    return data;
}

async function addTweetPost(tweet) {
    const tweetContainer = document.getElementById("tweets");
    const userData = await getUserDataFromPk(tweet.user);
    const userpk = document.querySelector(".tweets-container")?.dataset.userpk;
    let date = new Date(tweet.post_date);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    tweetContainer?.insertAdjacentHTML("beforeend",
        `
        <div class="tweet-post p-4 bg-gradient-to-b from-cyan-900 to-slate-900 rounded-lg mb-4 min-h-[150px] drop-shadow-[0_2px_4px_#C5E0EB]" data-id="${tweet.id}">
            <div class="information flex flex-wrap items-center gap-2 mb-4">
                <div class="profile-picture">
                    <a href="${userData.profile_path}">
                        <img src="${userData.avatar_path}" width="30" class="rounded-full">
                    </a>
                </div>
                <div class="profile-name font-bold">
                    <a href="${userData.profile_path}">
                        ${userData.username}
                    </a>
                </div>
                <div class="date mr-auto text-sm text-slate-300">${day}-${month}-${year}</div>
            </div>
            <div class="message max-w-[520px] secondary-font mb-4">
                ${tweet.content}
            </div>
        </div>
        `
    );

    if (tweet.user === +userpk) {
        createDeleteButton(tweet);
        createEditButton(tweet);
    }
}

async function addNewTweetPost(tweet) {
    const tweetContainer = document.getElementById("tweets");
    const userData = await getUserDataFromPk(tweet.user);
    const userpk = document.querySelector(".tweets-container")?.dataset.userpk;
    let date = new Date(tweet.post_date);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    tweetContainer?.insertAdjacentHTML("afterbegin",
        `
        <div class="tweet-post p-4 bg-gradient-to-b from-cyan-900 to-slate-900 rounded-lg mb-4 min-h-[150px] drop-shadow-[0_2px_4px_#C5E0EB]" data-id="${tweet.id}">
            <div class="information flex flex-wrap items-center gap-2 mb-4">
                <div class="profile-picture">
                    <a href="${userData.profile_path}">
                        <img src="${userData.avatar_path}" width="30" class="rounded-full">
                    </a>
                </div>
                <div class="profile-name font-bold">
                    <a href="${userData.profile_path}">
                        ${userData.username}
                    </a>
                </div>
                <div class="date mr-auto text-sm text-slate-300">${day}-${month}-${year}</div>
            </div>
            <div class="message max-w-[520px] secondary-font mb-4">
                ${tweet.content}
            </div>
        </div>
        `
    );

    if (tweet.user === +userpk) {
        createDeleteButton(tweet);
        createEditButton(tweet);
    }
}

function createDeleteButton(tweet) {
    const information = document.querySelector(`[data-id="${tweet.id}"] .information`);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.6405 5L18.6007 17.1425C18.5111 18.1891 17.467 19 16.209 19H6.28741C5.02942 19 3.98532 18.1891 3.89569 17.1425L2.85586 5M8.85038 9V15M13.646 9V15M14.8449 5V2C14.8449 1.44772 14.3081 1 13.646 1H8.85038C8.18825 1 7.65148 1.44772 7.65148 2V5M1.65695 5H20.8394" stroke="#FF7070" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    deleteButton.classList.add("p-1", "open-delete-modal");
    deleteButton.setAttribute("data-id", tweet.id);
    information?.insertAdjacentElement("beforeend", deleteButton);

    deleteTweetModal(tweet.id);
}

function createEditButton(tweet) {
    const tweetPost = document.querySelector(`.tweet-post[data-id="${tweet.id}"]`);

    const editButton = document.createElement("button");
    editButton.innerHTML = `<svg width="30" stroke-width="1.5" height="40" viewBox="0 0 24 24" fill="none" fill-opacity="0" xmlns="http://www.w3.org/2000/svg" id="IconChangeColor"> <path d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H11" stroke="#72d06c" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute" fill="#ffffff" filter="url(#shadow)"></path> <path d="M8 10H16M8 6H12M8 14H11" stroke="#72d06c" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute" fill="#ffffff"></path> <path d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z" fill="#ffffff" stroke="#72d06c" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path> <path d="M17.9541 16.9394L18.9541 15.9394C19.392 15.5015 20.102 15.5015 20.5399 15.9394V15.9394C20.9778 16.3773 20.9778 17.0873 20.5399 17.5252L19.5399 18.5252M17.9541 16.9394L14.963 19.9305C14.8131 20.0804 14.7147 20.2741 14.6821 20.4835L14.4394 22.0399L15.9957 21.7973C16.2052 21.7646 16.3988 21.6662 16.5487 21.5163L19.5399 18.5252M17.9541 16.9394L19.5399 18.5252" stroke="#72d06c" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute" fill="#ffffff"></path> <filter id="shadow"><feDropShadow id="shadowValue" stdDeviation="0.5" dx="0" dy="0" flood-color="black"></feDropShadow></filter><filter id="shadow"><feDropShadow id="shadowValue" stdDeviation=".5" dx="0" dy="0" flood-color="black"></feDropShadow></filter><filter id="shadow"><feDropShadow id="shadowValue" stdDeviation=".5" dx="0" dy="0" flood-color="black"></feDropShadow></filter><filter id="shadow"><feDropShadow id="shadowValue" stdDeviation=".5" dx="0" dy="0" flood-color="black"></feDropShadow></filter><filter id="shadow"><feDropShadow id="shadowValue" stdDeviation=".5" dx="0" dy="0" flood-color="black"></feDropShadow></filter><filter id="shadow"><feDropShadow id="shadowValue" stdDeviation=".5" dx="0" dy="0" flood-color="black"></feDropShadow></filter></svg>`;
    editButton.classList.add("p-1", "open-edit-modal");
    editButton.setAttribute("data-id", tweet.id);
    tweetPost.insertAdjacentElement("beforeend", editButton);

    editTweetModal(tweet.id)
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
        const userpk = document.querySelector(".tweets-container")?.dataset.userpk;
        const content = document.querySelector("[name='content']").value;

        try {
            const response = await fetch(`${TWEET_URL.postTweet}`, {
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
            console.log(data);
            await addNewTweetPost(data);
        } catch (error) {
        }
    });
}

async function deleteTweet(pk) {
    const userpk = document.querySelector(".tweets-container")?.dataset.userpk;
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    try {
        const response = await fetch(`${TWEET_URL.deleteTweet(pk)}`, {
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
            document.querySelector(`.tweet-post[data-id="${pk}"]`)?.remove();
            const modal = document.getElementById("delete-modal");
            modal?.classList.add("hidden");
        }
    } catch (error) {
        console.log(error);
    }
}

function deleteTweetModal(pk) {
    const modal = document.getElementById("delete-modal");
    const modalContainer = document.getElementById("delete-modal-container");
    const openModalButton = document.querySelector(`[data-id="${pk}"] .open-delete-modal`);
    const cancelButton = document.getElementById("delete-cancel-button");
    const okButton = document.getElementById("delete-ok-button");

    openModalButton?.addEventListener("click", (e) => {
        modal?.classList.remove("hidden");
        okButton?.addEventListener("click", async () => {
            await deleteTweet(openModalButton.dataset.id);
        }, { once: true });
    });

    cancelButton?.addEventListener("click", () => {
        modal?.classList.add("hidden");
    });

    window.addEventListener("click", (e) => {
        if (e.target == modalContainer) {
            modal?.classList.add("hidden");
        }
    });
}

async function editTweet(pk, content) {
    const userpk = document.querySelector(".tweets-container")?.dataset.userpk;
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    try {
        const response = await fetch(`${TWEET_URL.editTweet(pk)}`, {
            method: "POST",
            body: JSON.stringify({
                "user": userpk,
                "content": content,
            }),
            headers: {
                'X-CSRFToken': csrftoken,
                'Content-Type': 'application/json'
            },
        });

        if (response.status === 200) {
            document.querySelector(`.tweet-post[data-id="${pk}"] .message`).innerText = content;
            const modal = document.getElementById("edit-modal");
            modal?.classList.add("hidden");
        }
    } catch (error) {
        console.log(error);
    }
}

function editTweetModal(pk) {
    const modal = document.getElementById("edit-modal");
    const modalContainer = document.getElementById("edit-modal-container");
    const openModalButton = document.querySelector(`[data-id="${pk}"] .open-edit-modal`);
    const cancelButton = document.getElementById("edit-cancel-button");
    const okButton = document.getElementById("edit-ok-button");

    openModalButton?.addEventListener("click", (e) => {
        modal?.classList.remove("hidden");
        const textarea = document.querySelector("#edit-modal textarea");
        textarea.value = document.querySelector(`.tweet-post[data-id="${pk}"] .message`).innerText;
        okButton.onclick = async () => {
            await editTweet(openModalButton.dataset.id, textarea.value);
        }, { once: true }
    });

    cancelButton?.addEventListener("click", () => {
        modal?.classList.add("hidden");
    });

    window.addEventListener("click", (e) => {
        if (e.target == modalContainer) {
            modal?.classList.add("hidden");
        }
    });
}

function setFormBehaviour() {
    const form = document.querySelector("form")
    form?.addEventListener("submit", (e) => {
        e.preventDefault();
    })
}

showTweets();
setFormBehaviour();
postTweet();