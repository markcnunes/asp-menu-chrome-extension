chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    let backofficeUrl;
    let pageUrl = $(location).attr("href");
    console.log("page url:", pageUrl);

    // Backoffice URL
    if (pageUrl.toLowerCase().indexOf("local.showoff.com") > 0) {
        backofficeUrl = "http://local.showoff.com";
    } else {
        backofficeUrl = "https://showoff.asp.events";
    }

    if (msg.message == "page") {
        const bodyClasses = $("body").attr("class");
        const bodyIdClass = bodyClasses.split(" ");
        const bodyId = bodyIdClass[0].split("body--id-")[1];
        let url;

        // Check page type
        /* Libraries or modules */
        if (!$('.content__main__body .section').length) {
            /* Exhibitor List */
            if ($('.content__main__body .m-exhibitors-list').length) {
                url = `${backofficeUrl}/cbExhibitors/exhibitor/index`;
            } 
            /* Seminar List */
            else if ($('.content__main__body .m-seminar-list').length) {
                url = `${backofficeUrl}/cbSeminars/sessions/index/library/${bodyId}`;
            } 
            /* Library List */
            else if ($('.content__main__body ul[class*="library-list"]').length) {
                url = `${backofficeUrl}/cbLibraries/entries/index/library/${bodyId}`;
            }           
        }
        /* Normal page */
        else {
            url = `${backofficeUrl}/cmsadmin/pages/editor/contentID/${bodyId}`;
        }
        window.open(url, "_blank");
    } else {
        // Check if main panel doesn't exist
        if (!$("#asp-ext").length) {
            $("body").prepend(
               `<div id='asp-ext'>
                    <div class='asp-ext__header'>
                        <div class='asp-ext__header__logo' style='background-image: url("${chrome.runtime.getURL('icon128.png')}")'></div>
                        <div class='asp-ext__header__close'>x</div>
                    </div>
                    <h4>Panels:</h4>
                    <ul class='asp-ext__items'></ul>
                </div>`
            );
            // Add main panel
            const aspEvents = $("#asp-ext");

            // Add buttons
            $(".panel").each(function() {
                const panelClasses = $(this).attr("class");
                const panelId = panelClasses.split("panel--id-")[1];
                const url = `${backofficeUrl}/cmsadmin/panels/editor/contentID/${panelId}`;
                let panelParentName = $(this).parent().attr("class").toLowerCase();
                    
                if (panelParentName.match(/(?:inner|wrapper|__body)/g)) {
                    
                    panelParentName = $(this).closest('div:not(.inner):not(.wrapper):not([class*="__body"]):not(.panel)').attr("class").toLowerCase();

                    // If there is more than one class
                    if (panelParentName.match(/(?: )/g)) {
                        panelParentName = panelParentName.split(' ').join(", ");                       
                    }
                    
                }

                aspEvents.find('.asp-ext__items').append(
                    `<li class='asp-ext__items__item'>
                        <a class='asp-ext__items__item__link' href='${url}' target='_blank'><span>Panel #${panelId}</span> ${panelParentName}</a>
                    </li>`
                );
            });

            // Close panel
            $(".asp-ext__header__close").on("click", function() {
                $("#asp-ext").hide();
            });
        } else {
            $("#asp-ext").show();
        }
    }
    sendResponse();
});
