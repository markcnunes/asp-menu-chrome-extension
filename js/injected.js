console.log("Ok injected file worked");


document.addEventListener('yourCustomEvent', function (e)
{
    var url=e.detail;
    console.log("received "+url);
});