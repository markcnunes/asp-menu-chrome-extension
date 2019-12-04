chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    var pageUrl = $(location).attr("href");
    console.log("page url:", pageUrl);

    // Backoffice URL
    if (pageUrl.toLowerCase().indexOf("local.showoff.com") > 0) {
        var backofficeUrl = "http://local.showoff.com";
    } else {
        var backofficeUrl = "https://showoff.asp.events";
    }

    if (msg.message == "page") {
        const bodyClasses = $("body").attr("class");
        const bodyIdClass = bodyClasses.split(" ");
        const bodyId = bodyIdClass[0].split("body--id-")[1];

        var url = `${backofficeUrl}/cmsadmin/pages/editor/contentID/${bodyId}`;
        window.open(url, "_blank");
    } else {
        // Check if main panel doesn't exist
        if (!$("#asp-events-panel").lenght) {
            $("body").prepend(
                "<div id='asp-events-panel'><h4>Panels:</h4><div class='close-modal'>x</div></div>"
            );
            // Add main panel
            const aspEvents = $("#asp-events-panel");
            aspEvents.css({
                position: "fixed",
                top: "0",
                right: "0",
                padding: "20px",
                zIndex: "1000",
                width: "auto",
                height: "100vh",
                overflow: "auto",
                background: "rgba(117, 198, 175, .85)"
            });
            $("#asp-events-panel h4").css({
                color: "white"
            });
            $("#asp-events-panel .close-modal").css({
                position: "absolute",
                top: 0,
                right: 0,
                color: "black",
                background: "white",
                padding: "10px 20px"
            });
            // Add buttons
            $(".panel").each(function() {
                const panelClasses = $(this).attr("class");
                const panelId = panelClasses.split("panel--id-")[1];
                const url = `${backofficeUrl}/cmsadmin/panels/editor/contentID/${panelId}`;
                let panelParentName = $(this)
                    .parent()
                    .attr("class")
                    .toLowerCase();

                if (panelParentName.match(/(?:inner|wrapper)/g)) {
                    panelParentName = $(this)
                        .parent()
                        .parent()
                        .attr("class")
                        .toLowerCase();
                }

                aspEvents.append(
                    `<a class='panel-button' href='${url}' target='_blank'><span>${panelParentName}</span> Panel ID: ${panelId}</a>`
                );
            });
            // Style
            $(".panel-button").css({
                display: "flex",
                alignItems: "center",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
                background: "#fff",
                color: "#000"
            });
            $(".panel-button span").css({
                display: "inline-block",
                padding: "5px 10px",
                marginRight: "10px",
                borderRadius: "5px",
                background: "#f6ac8f",
                color: "#000"
            });
            // Close panel
            $(".close-modal").on("click", function() {
                $("#asp-events-panel").hide();
            });
        } else {
            $("#asp-events-panel").show();
        }
    }
    sendResponse();
});
