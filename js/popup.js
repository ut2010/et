// TODO: необходимо изменить отображение выбранного элемента списка, отправить на back id выбранного элемента
// TODO: back определяет произошло ли изменение и выполняет смену группы, либо создание новой
// TODO: список должен формироваться на js

$(function(){
    opera.extension.bgProcess.saveCurrentGroupTabs();
    // Строим меню при открытии popup
    buildMenu();


 $(document).on("click", "a.v", function(event){
//        $("a.v").click(function(){
	    if (widget.preferences.currentGroup != $(this).attr('id'))
	    {
    		$(this).css('color', 'red');
            var item = {'name': $(this).attr('id')};
            opera.extension.bgProcess.reOpen(item);
//            opera.extension.bgProcess.saveCurrentGroupTabs();   // предполагается что текущая группа выбрана
//		    opera.extension.bgProcess.closeAllTabs();

//                var item = {'name': $(this).attr('id')};
//		        opera.extension.bgProcess.setCurrentGroup(item);
//		        opera.extension.bgProcess.openGroup();

	    }
	});


    
    $("a.add").click(function(){
        var tempDate = Math.floor((Math.random()*1000)+1);
        var date = tempDate;
        $("li.add").before('<li><a class="v" id="'+ date + '" href="#">' + date + '</a></li>');
        opera.extension.bgProcess.addGroupItem({'name': date});
   });
});

// Создать и отобразить меню согласно хранящимся данным
function buildMenu(){
	// TODO: проверить на существование
	var menu = JSON.parse(widget.preferences.groups);	// Получаем меню
	var str;

	for (var i = 0; i< menu.length; i++) {
			str = '<li><a href="#" class="v" id="'+ menu[i].name + '">' + menu[i].name + ' ' + opera.extension.bgProcess.getNumberTabs(menu[i].name) + '</a></li>';
			$("li.add").before(str);
			
		}
	
}