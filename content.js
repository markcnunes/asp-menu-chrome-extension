chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse, info) {
    if (msg.message == "pageId") {
        console.log("pageId");
        // $(document).on("click", function() {
        // });
        const bodyClasses = $("body").attr("class");
        console.log(bodyClasses);

        const bodyIdClass = bodyClasses.split(" ");
        const bodyId = bodyIdClass[0].split("body--id-")[1];
        var url = `https://showoff.asp.events/cmsadmin/pages/editor/contentID/${bodyId}`;
        window.open(url, "_blank");
    } else {
        console.log("panelId", info);
        // $(document).on("click", function() {
        var clickedBtnID = $(this).attr("id"); // or var clickedBtnID = this.id
        // alert('you clicked on button #' + clickedBtnID);
        //   var url = "https://www.google.com/search?q=" + encodeURIComponent(sText);
        //   window.open(url, "_blank");
        // });
        // $("body").css("background", "green");
        // console.log(clickedBtnID);
    }
    sendResponse();
});
