// TODO: необходимо изменить отображение выбранного элемента списка, отправить на back id выбранного элемента
// TODO: back определяет произошло ли изменение и выполняет смену группы, либо создание новой
// TODO: список должен формироваться на js

// Временная ф-ия для заполнения
function createMenuItem()
{
    var groups = new Array()
    groups[0] = {'name': 'one'};
    groups[1] = {'name': 'two'};
    widget.preferences.groups =  JSON.stringify(groups);
}




$(function(){
    //createMenuItem();

    // Строим меню при открытии popup
    buildMenu();

    $(".menu a.v").click(function(){
        $(this).css('color', 'red');
        opera.extension.bgProcess.saveCurrentGroupTabs();
        opera.extension.bgProcess.closeAllTabs();
        var item = {'name': $(this).attr('id')};
        //$("li.add").after('<p>' + $(this).attr('id') + '</p>');

        opera.extension.bgProcess.setCurrentGroup(item);
        opera.extension.bgProcess.openGroup(item);
    });

	$(".menu a.add").click(function(){
        $(this).css('background-color', 'green');
      var date = Math.floor((Math.random()*1000)+1);
      $("li.add").before('<li><a class="v" id="'+ date + '" href="#">' + date + '</a></li>');
      opera.extension.bgProcess.addGroupItem({'name': date});
      opera.extension.bgProcess.openGroup(widget.preferences.currentGroup);

   });
	
//	var groups;  	// Хранит данные о группах
	
	// Получаем группы
//	if (widget.preferences.groups != undefined){
//		groups = JSON.parse(widget.preferences.groups); 
//	}
//	else{
//		groups = [];
//	}
	
	// Отображение меню
//	var str;
//	for (var i = 0; i< groups.length; i++ ){
//		str = '<li><a href="#">' + groups[i]['name'] + '</a></li>';
//		$("li#add").before(str);
//	}



//    $("a").click(function() {
//        $(this).slideUp();
//});


//    $("a").dblclick(function() {
//        //$(this).slideUp();
//        $(this).addClass("editable").attr("contentEditable", "true");
//    });
//
//    $("a").tougle(function() {
//            $("a").dblclick(function() {
//
//                $(this).addClass("editable").attr("contentEditable", "true");
//            });
//
//        $(this).addClass("editable").attr("contentEditable", "true");
//    },function() {
//            $(this).removeClass("editable").attr("contentEditable", "false");
//        }
//
//    );
});

// Создать и отобразить меню согласно хранящимся данным
function buildMenu(){
	// TODO: проверить на существование
	var menu = JSON.parse(widget.preferences.groups);	// Получаем меню
	var str;

	for (var i = 0; i< menu.length; i++) {
			str = '<li><a href="#" class="v" id="'+ menu[i].name + '">' + menu[i].name+ '</a></li>';
			$("li.add").before(str);
			
		}
	
}

// Добавляет новую группу вкладок
function addGroup(){

}

// Изменяет указатель на текущую группу
function changeGroup(){

}

l(message)
{
    opera.extension.bgProcess.l(message);
}