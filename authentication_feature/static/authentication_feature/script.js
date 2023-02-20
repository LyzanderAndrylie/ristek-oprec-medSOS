// @ts-nocheck
const form = document.querySelector("form");

$("form").submit(function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: form?.dataset.posturl,
        data: $(this).serialize(),
        success: () => {
            console.log("success");
            location.assign(form?.dataset.redirecturl);
        }
    })
    $("[name=csrfmiddlewaretoken]").removeAttr("disabled");
})
