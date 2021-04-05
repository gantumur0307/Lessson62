//delgesttei ajillah controller
var uiController = (function(){

})();

//sanhuutei ajillah controller
var financeController = (function(){

})();

//programiin holbogch controller
var appController = (function(uiController, financeController){
    var ctrlAddItem=function() {
    //1. oruulah ugugdliig delgetsnees olj awna.
        console.log("delgetsnees ugugdluu awah heseg");
    //2. olj awsan ugugluudee sanhuugiin controllert damjuulj tend hadgalna.

    //3. olj awsan ugugdluugiig web deeree tohiroh hesegt gargana

    //4. tuswiig tootsoolno

    ////etsiin uldegdel, tootsoog delgetsend gargana
    }
    document.querySelector(".add__btn").addEventListener("click", function() {
        ctrlAddItem();
});
document.addEventListener("keypress", function(event){
    if(event.keyCode === 13 || event.which===13) {
        ctrlAddItem();
    }
});

})(uiController, financeController);
