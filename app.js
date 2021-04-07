//delgesttei ajillah controller
var uiController = (function(){
var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn"
};
return {
    getInput: function(){
        return{
            type: document.querySelector(DOMstrings.inputType).value, //inc, exp
            description: document.querySelector(DOMstrings.inputDescription).value, //tailbar
            value: document.querySelector(DOMstrings.inputValue).value //dun
        };
    },
    getDOMstrings: function(){
        return DOMstrings;
    }
}

})();

//sanhuutei ajillah controller
var financeController = (function(){
    //private fn
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
      }
      
      var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
      }
      
      var i1 = new Income(1, 'Цалин', 2500000);
      var i2 = new Income(1, 'Сугалаа хожсон', 25000000);
      
      // console.log(i1);
      // console.log(i2);
      
      // var incomes = [];
      // var expenses = [];
      
      // incomes.push(i1);
      // incomes.push(i2);
      
      // console.log(incomes);
      
      // console.log(incomes[1].value)
     
      //private data
      var data = {
        Items: {
          inc: [],
          exp: []
        },
      
        totals: {
          inc: 0,
          exp: 0
       
      }
    }
    return {
        addItem: function(type, desc, val){

            var item, id;
            //id=identifcation=todorhoildog huchin zuil; 
            if(data.Items[type].length===0) id=1;
            else{
                data.Items[type][data.Items[type].length-1].id + 1;
            }

            if(type==="inc"){
                item = new Income(id, desc, val);
            }else{
                item = new Expense(id, desc, val);
            }
            data.Items[type].push(item);
        },
        
            seeData: function(){
                return data;
            }
    }
})();

//programiin holbogch controller
var appController = (function(uiController, financeController){


    var ctrlAddItem=function() {
    //1. oruulah ugugdliig delgetsnees olj awna.
    var input = uiController.getInput();
    
    //2. olj awsan ugugluudee sanhuugiin controllert damjuulj tend hadgalna.
        financeController.addItem(input.type, input.description, input.value);
    //3. olj awsan ugugdluugiig web deeree tohiroh hesegt gargana

    //4. tuswiig tootsoolno

    ////etsiin uldegdel, tootsoog delgetsend gargana
    }
var setupEventListener = function(){
    var DOM = uiController.getDOMstrings();
    document.querySelector(DOM.addBtn).addEventListener("click", function() {
        ctrlAddItem();
});
document.addEventListener("keypress", function(event){
    if(event.keyCode === 13 || event.which===13) {
        ctrlAddItem();
    }
});
};

return {
    init: function(){
        console.log("Application started...");
        setupEventListener();
    }
}

})(uiController, financeController);
appController.init();
