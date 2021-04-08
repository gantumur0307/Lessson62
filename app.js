//delgesttei ajillah controller
var uiController = (function(){
var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    IncomeList: ".income__list",
    ExpenseList: ".expenses__list",
    tusuvLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    containerDiv: ".container"
};
return {
    getInput: function(){
        return{
            type: document.querySelector(DOMstrings.inputType).value, //inc, exp
            description: document.querySelector(DOMstrings.inputDescription).value, //tailbar
            value: parseInt(document.querySelector(DOMstrings.inputValue).value) //dun
        };
    },
    getDOMstrings: function(){
        return DOMstrings;
    },

    clearFeilds: function(){
        var fields = document.querySelectorAll(DOMstrings.inputDescription + ", " + DOMstrings.inputValue);

        // convert List to Array
        var feildsArr = Array.prototype.slice.call(fields);
        
        feildsArr.forEach(function(el, index, array){
            el.value="";
        });
        feildsArr[0].focus();
    },

    // return {
    //     tusuv: data.tusuv,
    //     huvi: data.huvi,
    //     totalInc: data.totals.inc,
    //     totalExp: data.totals.exp
    // }

    tusviigUzuuleh: function(tusuv){
        document.querySelector(DOMstrings.tusuvLabel).textContent = tusuv.tusuv;
        document.querySelector(DOMstrings.incomeLabel).textContent = tusuv.totalInc;
        document.querySelector(DOMstrings.expenseLabel).textContent = tusuv.totalExp;


        if(tusuv.huvi !== 0){
            document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi+"%";
        }else{
            document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi;
        }
    },

    deleteListItem: function(id){
        var el = document.getElementById(id);
        el.parentNode.removeChild(el);
    },

    addListItem: function(item, type){
        // орлого зарлагын элементийг агуулсан html-ийг бэлтгэнэ
        var html, list;
        
        if(type === 'inc'){
            list = DOMstrings.IncomeList;
            html =
              '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete">            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>        </div></div>';
          } else {
            list = DOMstrings.ExpenseList;
            html =
              '<div class="item clearfix" id="exp-%id%"><div class="item__description">$$DESCRIPTION$$</div>          <div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">                <i class="ion-ios-close-outline"></i></button></div></div></div>';
          }
        // ter HTML dotroo orlogo zarlaga utgiig REPLACE ashiglaj uurchilj ugnu
        html = html.replace('%id%', item.id);
        html = html.replace('$$DESCRIPTION$$', item.description);
        html = html.replace('$$VALUE$$', item.value);

        //Beltgesen HTML ee DOM ruu hiij ugnu.
        document.querySelector(list).insertAdjacentHTML('beforeend', html);
    }
};

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
     
      //private data
      var calculateTotal = function(type){
          var sum = 0;
          data.items[type].forEach(function(el){
              sum=sum+el.value;
          });
          data.totals[type]=sum;
      }

      var data = {
        items: {
          inc: [],
          exp: []
        },
      
        totals: {
          inc: 0,
          exp: 0
       
      },
      tusuv: 0,
      huvi:0
    };
    return {
        tusuvTootsooloh: function(){
            //niit orlogo tootsoh
        calculateTotal('inc');
        // niit zarlaga tootsoh
        calculateTotal('exp');

        //niit tusuv tootsoolno
        data.tusuv = data.totals.inc-data.totals.exp;
        //orlogo zarlagii huvi toothoh
        data.huvi = Math.round((data.totals.exp/data.totals.inc)*100);

        },

        tusviigAvah: function(){
        return {
            tusuv: data.tusuv,
            huvi: data.huvi,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp
        }
        },

        deleteItem: function(type, id){
            var ids = data.items[type].map(function(el){
                return el.id;
            })

            var index = ids.indexOf(id);
            if(index !== -1){
                data.items[type].splice(index, 1);
            }
        },

        addItem: function(type, desc, val){

            var item, id;
            //id=identifcation=todorhoildog huchin zuil; 
            if(data.items[type].length===0) id=1;
            else{
                data.items[type][data.items[type].length-1].id + 1;
            }

            if(type==="inc"){
                item = new Income(id, desc, val);
            }else{
                item = new Expense(id, desc, val);
            }
            data.items[type].push(item);
            return item;
        },
        
            seeData: function(){
                return data;
            }
    };
})();

//programiin holbogch controller
var appController = (function(uiController, financeController){
    var ctrlAddItem=function() {
    //1. oruulah ugugdliig delgetsnees olj awna.
    var input = uiController.getInput();
    if(input.description !== "" && input.value !== ""){
        //2. olj awsan ugugluudee sanhuugiin controllert damjuulj tend hadgalna.
       var item = financeController.addItem(
        input.type, 
        input.description, 
        input.value
        );
        //3. olj awsan ugugdluugiig web deeree tohiroh hesegt gargana
        uiController.addListItem(item, input.type);
        uiController.clearFeilds();
        //4. tuswiig tootsoolno
        financeController.tusuvTootsooloh();
        //5.etsiin uldegdel, tootsoog delgetsend gargana
        var tusuv = financeController.tusviigAvah();

        //6. Tusviin tootsoog delgetsend gargana
        uiController.tusviigUzuuleh(tusuv);
    }
    
    };
    var setupEventListener = function(){
    var DOM = uiController.getDOMstrings();
    document.querySelector(DOM.addBtn).addEventListener("click", function() {
        ctrlAddItem();
});

document.querySelector(DOM.containerDiv).addEventListener('click', function(event){
    var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
    //income- 2
    if(id){
        var arr = id.split('-');
        var type = arr[0];
        var itemId = parseInt(arr[1]);

        //1. sanhuugiin modulaas type, id ashiglaad ustgana.
        financeController.deleteItem(type, itemId)
        //2. delgets deer ene el-iig ustgana
        uiController.deleteListItem(id);
        //3. uldegdel tootsoog shinechilj haruulna
    }
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
        uiController.tusviigUzuuleh({
            tusuv: 0,
            huvi: 0,
            totalInc: 0,
            totalExp: 0
        });
        setupEventListener();
    }
}

})(uiController, financeController);
appController.init();
