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


function addTweetPost(tweet, userData) {
    const tweetContainer = document.getElementById("tweets");

    if (tweetContainer) {
        tweetContainer.innerHTML += `
        <div class="tweet-post border p-4">
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
                    <div class="date">${tweet.post_date}</div>
                </div>
                <div class="message max-w-[520px]">
                    ${tweet.content}
                </div>
            </div>
        `
    }
}


async function showTweets() {
    try {
        const data = await getTweets();

        data.forEach(async (tweet) => {
            const userData = await getUserDataFromPk(tweet.user); 
            addTweetPost(tweet, userData);
        });


    } catch (error) {
        console.log(error);
    }
}

showTweets();