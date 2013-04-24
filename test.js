
var buttonProp =
{
  disabled: false,                // кнопка активна
  icon = "images/icon_18.png";    
  title: "Кнопка",               
  onclick: disableBut,
  badge: {
    backgroundColor: '#cc0000',
    color: '#ffffff'
  },
  popup: {

  },
}
    
var button = opera.contexts.toolbar.createItem( buttonProp );  
opera.contexts.toolbar.addItem( button );
button.addEventListener('click', handleClick, false);

widget.preferences.clear();
widget.preferences.firstRun = true;

function disableBut(){
  console.info("Enter");
  button.icon = "images/icon_disabled_18.png";
  setTimeout(function() {
    button.icon = "images/icon_18.png";
  }, 500); // re-enable after timeout
}



opera.extension.tabs.addEventListener('create',handleClick,false);
opera.extension.tabs.addEventListener('close',handleClick,false);

var currentTab;
opera.extension.tabs.addEventListener('focus',function(){console.warn("focus")},false);
opera.extension.tabs.addEventListener('close',closeFunc,false);

function closeFunc(){
    currentTab = opera.extension.tabs.getSelected();
    console.info("Закрыта вкладка: %s",currentTab.url);
}



function handleClick() {
  var tabs = opera.extension.tabs.getAll();
  //console.info('Tabs');
    console.log (tabs);
  var myTab = new Array();
  var oneTab;

  //console.time("Start");
  for (var x=0; x<tabs.length; x++)
  {
			oneTab = {
				url: tabs[x].url,
				title: tabs[x].title,
				tabPos: tabs[x].browserWindow.id  ,
				position: tabs[x].position
				
			}
			//myTab [x] = oneTab;
			//widget.preferences.groupTabsa = oneTab.url;
			
	  
  }
    //console.timeEnd("Start");

  //widget.preferences.group = 1;
  //widget.preferences.groupTabsa = JSON.stringify(myTab);
  //oneTab1 = JSON.parse(widget.preferences.groupTabsa);
  //console.log(oneTab1);
  //console.log(widget.preferences.groupTabsa);
  
  //console.log (tabs[79].tabGroup.position);
  //console.log (myTab);
  //button.badge.textContent = tabs.length;
}