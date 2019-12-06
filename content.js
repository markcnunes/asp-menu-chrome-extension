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

        if () {
            .content__main__body -not .section
            .js-librarylistwrapper
            var url = `${backofficeUrl}/cbLibraries/entries/index/library/${bodyId}`;
        } else {
            var url = `${backofficeUrl}/cmsadmin/pages/editor/contentID/${bodyId}`;
        }
        window.open(url, "_blank");
    } else {
        // Check if main panel doesn't exist
        if (!$("#asp-events-panel").lenght) {
            $("body").prepend(
                "<div id='asp-events-panel'><h4>Panels:</h4><div class='close-modal'>x</div></div>"
            );
            // Add main panel
            const aspEvents = $("#asp-events-panel");

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
