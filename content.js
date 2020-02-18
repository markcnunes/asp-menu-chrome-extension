chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

    // Function: Add sidebar
    function addSidebar(title) {
        $("body").prepend(
            `<div id='asp-ext'>
                 <div class='asp-ext__header'>
                     <div class='asp-ext__header__logo' style='background-image: url("${chrome.runtime.getURL('icon128.png')}")'></div>
                     <div class='asp-ext__header__close'>x</div>
                 </div>
                 <h4 class='asp-ext__title'>${title}:</h4>
                 <ul class='asp-ext__items'></ul>
             </div>`
         );
    };

    // Function: Close sidebar
    function closeSidebar() {   
        if ($("#asp-ext").length) {
            $("#asp-ext").remove();
        } 
    };

    // Function: Click to close sidebar
    function clickToCloseSidebar() {   
        $(".asp-ext__header__close").on("click", function() {
            $("#asp-ext").remove();
        });  
    };
        
    // Backoffice URL
    let backofficeUrl;
    let pageUrl = $(location).attr("href");

    if (pageUrl.toLowerCase().indexOf("local.showoff.com") > 0) {
        backofficeUrl = "http://local.showoff.com";
    } else {
        backofficeUrl = "https://showoff.asp.events";
    }

    if (msg.message == "backoffice") {
        let url = `${backofficeUrl}/cmsadmin/dashboard`;
        
        window.open(url, "_blank");

    } else if (msg.message == "page") {
        
        const bodyClasses = $("body").attr("class");
        const bodyIdClass = bodyClasses.split(" ");
        const bodyId = bodyIdClass[0].split("body--id-")[1];
        let url;

        // Check page type
        /* Libraries or modules */
        let contentMainBody = $('[class*="content__main__body"]'); // @Note: Some websites use 'l-content__main__body'
        if (contentMainBody.find('.section').length == 0) {
            
            /* Exhibitor List */
            if (contentMainBody.find('.m-exhibitors-list').length) {
                url = `${backofficeUrl}/cbExhibitors/exhibitor/index`;
            } 
            /* Seminar List */
            else if (contentMainBody.find('.m-seminar-list').length) {
                url = `${backofficeUrl}/cbSeminars/sessions/index/library/${bodyId}`;
            } 
            /* Library List */
            else if (contentMainBody.find('ul[class*="library-list"]').length) {
                url = `${backofficeUrl}/cbLibraries/entries/index/library/${bodyId}`;
            }           
        }
        /* Normal page */
        else {
            url = `${backofficeUrl}/cmsadmin/pages/editor/contentID/${bodyId}`;
        }
        
        window.open(url, "_blank");
    } else if (msg.message == "panels") {

        closeSidebar();

        // Add main panel
        addSidebar("Panels");
        
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

            $("#asp-ext").find('.asp-ext__items').append(
                `<li class='asp-ext__items__item'>
                    <a class='asp-ext__items__item__link' href='${url}' target='_blank'><span>Panel #${panelId}</span> ${panelParentName}</a>
                </li>`
            );
        });

        clickToCloseSidebar();
         
    } else if (msg.message == "menus") {

        closeSidebar();

        // Add main panel
        addSidebar("Menus");
        
        // Add buttons
        $(".menu[menuid]").each(function() {
            const menuId = $(this).attr("menuid");
            const url = `${backofficeUrl}/cmsadmin/menus/editor/menuID/${menuId}`;
            // const menuText = menuId.split("panel--id-")[1];
            let menuParentName;

            if ($(this).closest('nav[data-name]').length) {
                menuParentName = $(this).closest('nav').attr('data-name');
            } else {
                menuParentName = $(this).parent().attr("class").toLowerCase();
            }

            $("#asp-ext .asp-ext__items").append(
                `<li class='asp-ext__items__item'>
                    <a class='asp-ext__items__item__link' href='${url}' target='_blank'><span>Menu #${menuId}</span> ${menuParentName}</a>
                </li>`
            );
        });

        clickToCloseSidebar();

    } else if (msg.message == "dev") {

        closeSidebar();

        // Add main panel
        addSidebar("Dev Info");

        // CSS
        $("style").each(function(){
            let css;
            let cssDataHref = $(this).attr("data-href");
            if (typeof cssDataHref !== typeof undefined && cssDataHref !== false) {
                css = $(this).attr("data-href");
                // if($(this).attr("data-href").has("__media/__theme/css/");
                
                $("#asp-ext .asp-ext__items").append(
                    `<li class='asp-ext__items__item'>
                        <div class='asp-ext__items__item__text'>
                            <span>CSS: </span> ${css}
                        </div>
                    </li>`
                );
            }
        });

        // Header
        $.ajax({
            type: 'POST',
            url: document.location,
            success: function(data, textStatus, request){
                let headers = request.getAllResponseHeaders();

                $("#asp-ext .asp-ext__items").append(
                    `<li class='asp-ext__items__item'>
                        <div class='asp-ext__items__item__text'>
                            <span>Server: </span> <p>${headers.trim()}</p>
                        </div>
                    </li>`
                );
            },
            error: function (request, textStatus, errorThrown) {
                console.log('error', request);
            }
        });

        clickToCloseSidebar();
        
    }
    sendResponse();
});
