chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.message == 'hide') {

        // console.log('test');
        // console.log(msg);
        // console.log(msg.message);
        $("body").hide();
        
    } else if (msg.message == 'pageId'){
        
        $(document).on("click", function () {
            console.log('test');
            // var clickedBtnID = $(this).attr('id'); // or var clickedBtnID = this.id
            // alert('you clicked on button #' + clickedBtnID);
         });
    }
    sendResponse();
});