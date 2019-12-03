chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    var pageUrl = $(location).attr("href");
    console.log("page url:", pageUrl);

    if (pageUrl.toLowerCase().indexOf("local.showoff.asp.events") > 0) {
        var backofficeUrl = "https://local.showoff.asp.events";
    } else {
        var backofficeUrl = "https://showoff.asp.events";
    }

    if (msg.message == "page") {
        console.log("page");
        // $(document).on("click", function() {
        // });
        const bodyClasses = $("body").attr("class");
        console.log(bodyClasses);

        const bodyIdClass = bodyClasses.split(" ");
        const bodyId = bodyIdClass[0].split("body--id-")[1];
        var url = `${backofficeUrl}/cmsadmin/pages/editor/contentID/${bodyId}`;
        window.open(url, "_blank");
    } else {
        console.log("panel");
        // $(document).on("click", function() {
        // var clickedBtnID = $(this).attr("id"); // or var clickedBtnID = this.id
        // alert('you clicked on button #' + clickedBtnID);
        //   var url = "https://www.google.com/search?q=" + encodeURIComponent(sText);
        //   window.open(url, "_blank");
        // });
        // $("body").css("background", "green");
        // console.log(clickedBtnID);

        $("body").prepend("<div id='asp-events-panel'><h3>Panels:</h3></div>");
        var aspEvents = $("#asp-events-panel");
        aspEvents.css({
            position: "fixed",
            top: "0",
            right: "0",
            zIndex: "1000",
            width: "50vw",
            height: "100vh",
            background: "rgba(117, 198, 175, .85)"
        });
        $(".panel").each(function() {
            const panelClasses = $(this).attr("class");
            const panelId = panelClasses.split("panel--id-")[1];
            var url = `${backofficeUrl}/cmsadmin/panels/editor/contentID/${panelId}`;
            aspEvents.append(
                `<a class='panel-button' href='${url}' target='_blank'>${panelId}</a>`
            );
        });
        $(".panel-button").css({
            display: "block",
            padding: "10px",
            margin: "10px",
            borderRadius: "5px",
            background: "#fff",
            color: "#000"
        });
    }
    sendResponse();
});
