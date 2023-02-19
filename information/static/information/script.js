/**
 * Adds Tweet-Post in Tweet container
 */
function addTweetPost() {
    const tweetContainer = document.getElementById("tweets-container");
    
    if (tweetContainer) {
        tweetContainer.innerHTML += `
        <div class="tweet-post border max-w-[520px] p-4 mb-4">
                <div class="information flex gap-4 mb-4">
                    <div class="profile-picture">Picture</div>
                    <div class="profile-name">Name</div>
                    <div class="date">01/01/2023</div>
                </div>
                <div class="message max-w-[520px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus sit amet lectus ut finibus. Ut vel
                    facilisis enim. Donec porta risus vel nisi rutrum mollis.
                </div>
            </div>
        `
    }
}

addTweetPost();