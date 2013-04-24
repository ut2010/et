window.addEventListener("load", function() {

    var button;
    createButton();

    //setInterval('myTest();', 100);


    // Сохраняем состояние вкладок при запуске браузера, а также при обновлении расширения запустится // TODO: возможно баг при обновлении, текущее и предыдущее состояния станут равны
    saveCurrentTabState();

    // Вешаем события на изменения вкладок
//    opera.extension.tabs.addEventListener('create',myTest,false);
//    opera.extension.tabs.addEventListener('update',myUpdate,false);
//    opera.extension.tabs.addEventListener('close', findTabChange,false);

}, false);

// Ф-ия получает массив всех открытых вкладок, оптимизирует информацию о них,
// и возвращает сериализованный массив
function getAllTabs()
{
    var tabs = opera.extension.tabs.getAll();
    var optimizedTabs = new Array();
    for (var x=0; x<tabs.length; x++)
    {
        optimizedTabs[x] =
        {
            url: tabs[x].url,
            pos: tabs[x].position
        }
    }
    // TODO: внести проверку на пустые объекты {}
    return JSON.stringify(optimizedTabs);
}

// Ф-ия получает текущее состояние вкладок,
// сохраняет его, и сохраняет предыдущее состояние вкладок
function saveCurrentTabState()
{
    widget.preferences.previousTabState = widget.preferences.currentTabState;      // TODO: возможна проблема присвоения, если currentTabState пуст, проверить
    widget.preferences.currentTabState = getAllTabs();                             // TODO: проверить на ошибку, если нет открытых вкладок
}

// Ф-ия определяет изменения вкладок (открытие, закрытие, обновление)
function findTabChange()
{
    saveCurrentTabState();
    searchInArray();
}

function createButton()
{
    // Кнопка, popup
    var buttonProp =
    {
        disabled: false,
        icon: "images/icon_18.png",
        title: "Кнопка",
        onclick: myTest(),
        badge: {
            //backgroundColor: '#cc0000',
            //color: '#ffffff',
            //display: block || none
            //textContent: "843"
        },
        popup: {
            height: 300,
            width: 200,
            href: "popup.html"
        }
    }

    button = opera.contexts.toolbar.createItem( buttonProp );
    opera.contexts.toolbar.addItem( button );
    //button.addEventListener('click', saveCurrentTabState, false);
}

function closeFunc(){
    var newTabs = getTabArray();                        // объект
    var newTabsStr = JSON.stringify (newTabs);
    var oldTabs = widget.preferences.groupTabs;         // строка
    var oldTabsArr = JSON.parse(oldTabs);               // объект
    for(var x=0; x<oldTabsArr.length; x++){

        var str = new RegExp(JSON.stringify(oldTabsArr[x]));
        console.log (str);
        if(str.test(newTabsStr)){
            console.info("Есть совпадение");
        }
        else
        {console.error("Нет совпадений")}
    }
}

// Типы действий над вкладками
const CREATE = 1;
const DELETE = 2;
const UPDATE = 3;

// Ищем измененную вкладку
function searchInArray()
{
    var aOld = JSON.parse(widget.preferences.previousTabState);
    var aNew = JSON.parse(widget.preferences.currentTabState);

    var typeTabAction = getTypeTabAction();

//    var x;
//    switch (typeTabAction)
//    {
//        case CREATE:
//        {
//            len = aOldLength;
//            break;
//        }
//        case DELETE:
//        {
//            len = aNewLength;
//            break;
//        }
//        case UPDATE:
//        {
//            len = aNewLength;		//   aOldLength = aNewLength
//            break;
//        }
//    }

//    for ( var x=0; x < len; x++ )
//    {
//        if ( aOld[x].url != aNew[x].url ||
//            aOld[x].title != aNew[x].title ||
//            aOld[x].pos != aNew[x].pos )
//        {
//            switch (typeTabAction)
//            {
//                case CREATE:
//                {
//                    console.log ("Создана вкладка: " + aNew[x].url + " позиция: " + aNew[x].pos);
//                    break;
//                    // Возможно нужно сдвинуть остальные вкладки, если эта не в конце
//                }
//                case DELETE:
//                {
//                    console.log ("Удалена вкладка: " + aOld[x].url + " позиция: " + aOld[x].pos);
//                    break;
//                    // Возможно нужно сдвинуть остальные вкладки, если эта не в конце
//                }
//                case UPDATE:
//                {
//                    if ( aOld[x].url != aNew[x].url)
//                    {
//                        console.log ("Изменен URL вкладки: " + aOld[x].url + " на: " + aNew[x].url);
//                    }
//                    if ( aOld[x].pos != aNew[x].pos )
//                    {
//                        console.log ("Изменена позиция вкладки: " + aOld[x].pos + " на: " + aNew[x].pos);
//                    }
//                    break;
//                    // Возможно нужно сдвинуть остальные вкладки, если эта не в конце
//                }
//            }
//        }
//    }
}

//// Определить действие произведенное с вкладками (create || delete || update)
//function getTypeTabAction()
//{
//    var aOld = JSON.parse(widget.preferences.previousTabState);
//    var aNew = JSON.parse(widget.preferences.currentTabState);
//
//    if (aOld.length < aNew.length)
//    {
//        l("create");
//        return CREATE;
//    }
//    if (aOld.length > aNew.length)
//    {
//        l("delete");
//        return DELETE;
//    }
//    if (aOld.length == aNew.length)
//    {
//        l("update");
//        return UPDATE;
//    }
//    else
//    {
//        l("Непонятно че");
//
//    }
//}

// Упрощенный вывод в консоль
function l (message)
{
    console.log(message);
}

// Ф-ия закрывает все открытые вкладки
function closeAllTabs()
{
   var tabs = opera.extension.tabs.getAll();

    for (var x=0; x < tabs.length; x++)
    {
        tabs[x].close();
    }
}


//
//function myTest()
//{
//    console.time ("s");
//    var tabs = opera.extension.tabs.getAll();
////    var optimizedTabs = new Array();
////    for (var x=0; x<tabs.length; x++)
////    {
////        optimizedTabs[x] =
////        {
////            url: tabs[x].url,
////            pos: tabs[x].position
////        }
////    }
//
////    var len = optimizedTabs.length;
//     var len = tabs.length;
//    for ( var x=0; x < len; x++ )
//    {
//       tabs[x].url = "0";
//       tabs[x].pos = "0";
//    }
//    console.timeEnd("s");
//}