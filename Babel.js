/*

Babel.js - AMD/2018

    *** REESCREVA ESTE TEXTO! ***
    
Autores: Jonas Rodrigues (49806), Joao Costa (50597)

O ficheiro "Babel.js" tem de incluir, logo nas primeiras linhas, um comentário
inicial contendo: o nome e número dos dois alunos que realizaram o projeto;
indicação de quais as partes do trabalho que foram feitas e das que não foram
feitas (para facilitar uma correção sem enganos); ainda possivelmente alertando
para alguns aspetos da implementação que possam ser menos óbvios para o avaliador.

01234567890123456789012345678901234567890123456789012345678901234567890123456789

*/

/* Global variables */

var xmlDoc, xmlSerializer, languageName;


/* Misc functions */

/* XML */
/*       https://www.w3schools.com/xml/default.asp  */

/* Local files */
/*        https://www.javascripture.com/FileReader */


/* JavaScript HTML DOMhttps://www.w3schools.com/js/js_htmldom.asp */
/*        https://www.w3schools.com/js/js_htmldom.asp */


function screen0() {
	var body = document.body;
	// start with a blank page
	body.innerHTML = "";

	// load the language XML
	var f = DynamicHTML.inpuFile(body, "file-input");
	DynamicHTML.eventHandler(f, "onchange", "DynamicHTML.processLocalFile(event, runLanguage);");
}

//************************************E APENAS EXEMPLO, DEPOIS E PARA REMOVER     ************************************
// function screen1() {
// 	var body = document.body;
// 	// start with a blank page
// 	body.innerHTML = '';

// 	h1(body, "Babel   (" + languageName + ")");
// 	hr(body);

// 	// a div, only because we want a border
// 	var d = div(body, "border:3px solid black; display:table; padding:20px; margin-left:40px");
// 	h1(d, "Write this in English");

// 	// first line
// 	var p1 = p(d, "padding-left:40px; word-spacing:50px;");
// 	var i = img(p1, "http://icons.iconarchive.com/icons/icons8/ios7/32/Media-Controls-High-Volume-icon.png");
// 	eventHandler(i, "onclick", "play('japanese/sentences/何時ですか.mp3');");
// 	text(p1, 16, " ");
// 	text(p1, 32, "何時ですか");

// 	// second line
// 	var p2 = p(d, "padding-left:20px;");
// 	var i = inputActiveText(p2, "answer", 40, 24, "Type this in English");
// 	eventHandler(i, "onkeydown", "if(event.keyCode == 13) document.getElementById('check').click();");
// 	text(p2, 16, " ");
// 	var b1 = inpuButton(p2, "check", "Check", "lime");
// 	eventHandler(b1, "onclick", "validate(document.getElementById('answer').value, 'What time is it?');");

// 	hr(body);
// }

var language = null;

//----------OUR CODE---------
//-----Funcoes auxiliares-----
function getNumberOfChildElements(parent, elementName) {
	var nodes = parent.getElementsByTagName(elementName);
	return nodes.length;
}

//--------Classes----------

class DynamicHTML {
    
	static h1(target, text) {
		var a = document.createElement("H1");
		var b = document.createTextNode(text);
		a.appendChild(b);
		target.appendChild(a);
		return a;
	}
    
	static hr(target) {
		var a = document.createElement("HR");
		target.appendChild(a);
		return a;
	}
    
	static p(target, style) {
		var a = document.createElement("P");
		a.style = style;
		target.appendChild(a);
		return a;
	}
    
	static br(target) {
		var a = document.createElement("BR");
		target.appendChild(a);
		return a;
	}
    
	static text(target, fsize, t) {
		var a = document.createElement("SPAN");
		var b = document.createTextNode(t);
		a.appendChild(b);
		a.style.fontSize = fsize + "px";
		target.appendChild(a);
		return a;
	}
    
	static img(target, url) {
		var a = document.createElement("IMG");
		a.src = url;
		target.appendChild(a);
		return a;
	}
    
	static inputActiveText(target, id, size, fsize, placeholder) {
		var a = document.createElement("INPUT");
		a.type = "text";
		a.id = id;
		a.value = "";
		a.placeholder = placeholder;
		a.style.fontSize = fsize + "px";
		a.size = size;
		target.appendChild(a);
		return a;
	}
    
	static inpuButton(target, id, value, color) {
		var a = document.createElement("INPUT");
		a.type = "button";
		a.id = id;
		a.value = value;
		a.style.backgroundColor = color;
		target.appendChild(a);
		return a;
	}
    
	static inpuFile(target, id) {
		var a = document.createElement("INPUT");
		a.type = "file";
		a.id = id;
		target.appendChild(a);
		return a;
	}
    
	static div(target, style) {
		var a = document.createElement("DIV");
		a.style = style;
		target.appendChild(a);
		return a; 
	}
    
	static eventHandler(a, kind, action) {
		a[kind] = new Function(action);
		return a;
	}
    
	// static eventHandler2(a, kind, functionAction) {
	// 	a[kind] = functionAction;
	// 	return a;
	// }
    
	static processLocalFile(e, processor) {
		var file = e.target.files[0];
		if (!file) {
			return;
		}
		var reader = new FileReader();
		reader.onload = function(e) {
			processor(e.target.result);
		};
		reader.readAsText(file, "UTF-8");
	}
    
	static text2XML(text) {
		let parser = new DOMParser();
		//let serializer = new XMLSerializer(); //TODO nao devia ser xmlSerializer??
		let xmlDoc = parser.parseFromString(text,"text/xml");
		return xmlDoc;
	}
    
	static XML2Text(xml) {
		return xmlSerializer.serializeToString(xml);
	}
    
	static play(sound) {
		const soundEnabled = true;

		var nodes = xmlDoc.getElementsByTagName("SOUNDSPREFIX");
		if ( nodes.length == 1) {
			const prefix = nodes[0].childNodes[0].nodeValue;
			console.log(prefix);
            
			if( soundEnabled )
				new Audio(prefix + sound).play();
			else
				alert("SOUND: " + sound);
		}
	}
    
	static validate(answer, solution) {
		if( answer == solution )
			DynamicHTML.play("general/right_answer.mp3");
		else
			DynamicHTML.play("general/wrong_answer.mp3");
	}
}

class Language {
	constructor() {
        language = this;
		this.body = document.body;
        this.screenTypes = ["KEYBOARD", "PAIRS", "BLOCKS", "SYMBOLS"];
		this.body.innerHTML = "";
		DynamicHTML.h1(this.body, "Babel   - " + languageName + "").style = "margin: 20px;font-family: sans-serif; text-transform: uppercase; font-weight: bold; color: #0f96d0";
		DynamicHTML.hr(this.body).style = "border-top: 1px dashed #0f96d0;";
		this.nav = DynamicHTML.div(this.body, "text-align: center; position: relative; margin-bottom:20px;");
		this.buttons = [];
		this.nLessons = getNumberOfChildElements(xmlDoc, "LESSON");
		this.currLesson = null;
		this.lessons = [];
		this.start();
	}
    
	start() {
        console.log(this.nLessons);
		this.initLessons();
        
		this.addLessonsButtons();
	}
    
	addLessonsButtons() {
		console.log("addLessonsButtons=" + this.nLessons);
		for (let i = 1; i <= this.nLessons;i++) {
			console.log("button");
			this.buttons[i] = DynamicHTML.inpuButton(this.nav,"button" + i,"Lesson " + i, "red");
			this.buttons[i].style = "display: inline-block; margin: 5px 5px; border-radius: 5px; padding: 8px 16px; background-color: #0f96d0; color: white; font-size: 13px; font-weight: bold;";

			this.buttons[i].onclick = () => {return this.getLesson(i);};
			//eventHandler(this.buttons[i],"onclick","showKeyboardScreen(" + i +");");
		}
	}

	hideLessonsButtons() {
		for (let i = 1; i <= this.nLessons;i++) {
			this.buttons[i].style.display = "none";
		}
	}

	showBackButton() {
		this.backButton = DynamicHTML.inpuButton(this.nav,"backButton", "Back");
		this.backButton.style = "position: absolute; left: 20px; border-radius: 5px; padding: 8px 16px; background-color: #0f96d0; color: white; font-size: 13px; font-weight: bold;"
		this.backButton.onclick = () => {return this.goBack();};
	}

	hideBackButton(){
		this.backButton.style.display = "none";
	}

	goBack() {
        this.currLesson.getCurrentScreen().hide();
		this.currLesson = null;
		this.hideBackButton();
		this.addLessonsButtons();
	}
    
	getLesson(id) {
		if (this.currLesson != null) {
			this.currLesson.getCurrentScreen().hide();
			//this.hideLessonsButtons();
		} else {
			this.hideLessonsButtons();
			this.showBackButton();
		}
        
        this.currLesson = this.lessons[id];
        
        language.currLesson.getCurrentScreen().show();
			
        if (!language.currLesson.hasNextScreen()) {
            language.currLesson.getCurrentScreen().box.style = "display: none;";
            console.log(language.currLesson.getCurrentScreen().box);
            DynamicHTML.h1(language.currLesson.getCurrentScreen().container, "Congratulations, you've reached the end of this lesson!").style = "color:#444; font-family: sans-serif; font-size: 20px;";
        }
	}
    

	initLessons() {
		for(let i = 1; i <= this.nLessons; i++) {
			this.lessons[i] = new Lesson(i);
		}
	}

	getCurrentLesson(){
		return this.currLesson;
	}

	getNLessons() {
		return this.nLessons;
	}
}

//TODO
class LanguageExtraAlphabets extends Language {
	constructor() {
        super();
	}

}


class Lesson {
	//GUARDAR SCREENS AQUI e fazer a gestão da interação ao longo da lição
	constructor(id) {
        //Array that contains all the screens of the lesson
		this.screens = [];
        //Array that contains the id of the screens that haven been passed yet
        this.screensNotPassed = [];
		this.currentScreenNumber = 1;
        this.lessonXML = xmlDoc.getElementsByTagName("LESSON")[id-1];
        this.nScreens = 0;
		this.id = id;
        this.loadScreens(); 
        this.screenNotPassedIndex = this.screensNotPassed.length - 1;
        console.log(this.screens);
	}
    
    loadScreens() {
        let nNodes = this.lessonXML.childNodes.length;
        
        for (let i = 0; i < nNodes; i++) {
            let screenType = this.lessonXML.childNodes[i].tagName;
            
            if (language.screenTypes.indexOf(screenType) != -1) {
                this.nScreens++;
                
                //Add to the beggining of the list
                this.screensNotPassed.unshift(this.nScreens);
            
                let screenXML = this.lessonXML.childNodes[i];
                let screen = null;

                switch(screenType) {
                    case "KEYBOARD": 
                        screen = this.loadKeyboard(this.nScreens, screenXML);
                        break;
                    case "PAIRS": //TODO
                        screen = new Pairs();
                        break;
                    case "BLOCKS": //TODO
                        screen = new Blocks();
                        break;
                }

                this.screens[this.nScreens] = screen;
                
            }
        }
    }
    
    loadKeyboard(id, screenXML) {
        var prompt = screenXML.getElementsByTagName("PROMPT")[0].firstChild.nodeValue;
        var original = screenXML.getElementsByTagName("ORIGINAL")[0].firstChild.nodeValue;
        var sound = screenXML.getElementsByTagName("SOUND")[0].firstChild.nodeValue;
        var solutions = Array.from(screenXML.getElementsByTagName("TRANSLATION")).map(translation => {return translation.firstChild.nodeValue;});
        return new Keyboard(id, prompt, original, solutions, sound);
    }

	hasNextScreen() {
		return this.screensNotPassed.length != 0;
	}
    
    getCurrentScreen() {
        return this.screens[this.currentScreenNumber];
    }

	nextScreen() {
        //Hide previous screen
        this.screens[this.currentScreenNumber].hide();
        
        this.screenNotPassedIndex--;
        
        if (this.screenNotPassedIndex < 0) {
            this.screenNotPassedIndex = this.screensNotPassed.length - 1;
        }
        
        this.currentScreenNumber = this.screensNotPassed[this.screenNotPassedIndex];
        
        //Show next screen
		this.screens[this.currentScreenNumber].show();
	}
    
    passCurrentScreen() {
        console.log(this.screenNotPassedIndex);
        console.log(this.screensNotPassed);
        this.screensNotPassed.splice(this.screenNotPassedIndex, 1);
        console.log(this.screensNotPassed);
    }
}

class Screen {
	constructor(id, prompt, original, solutions) {
        this.id = id;
		this.prompt = prompt;
		this.original = original;
		this.solutions = solutions;
		this.container = null;
        this.box = null;
	}
	show() {
        this.container = DynamicHTML.div(document.body, "position: absolute; left: 50%; -webkit-transform: translateX(-50%); transform: translateX(-50%); ");
        
        DynamicHTML.h1(this.container, "LESSON " + language.currLesson.id).style = "color:#0d76b0; font-family: sans-serif;";
        DynamicHTML.h1(this.container, "Screen " + language.currLesson.getCurrentScreen().id + " of " + language.currLesson.nScreens).style = "color:#444; font-family: sans-serif; font-size: 20px;";
        DynamicHTML.h1(this.container, "You have " + language.currLesson.screensNotPassed.length + " screens to complete").style = "color:#555; font-family: sans-serif; font-size: 15px;";
        
        //Test
            DynamicHTML.inpuButton(this.container, "next", "Next", "violet").onclick = function() {
                if (language.currLesson.hasNextScreen()) {
                    language.currLesson.nextScreen();
                } else {
                    language.currLesson.getCurrentScreen().box.style = "display: none;";
                    console.log(language.currLesson.getCurrentScreen().box);
                    DynamicHTML.h1(language.currLesson.getCurrentScreen().container, "Congratulations, you've reached the end of this lesson!").style = "color:#444; font-family: sans-serif; font-size: 20px;";
                }
            }
            
            DynamicHTML.inpuButton(this.container, "pass", "Pass", "violet").onclick = () => language.currLesson.passCurrentScreen();
        
            this.box = DynamicHTML.div(this.container, "border-radius: 5px; background-color: rgb(240, 240, 240); padding:20px; font-family: Arial; box-shadow: 2px 2px 5px rgba(0,0,0,0.2)");
	}
    
	hide() {
		this.container.remove();
	}

	answer(answer) {
		var nSolutions = this.solutions.length;
		for(var i = 0;i<nSolutions;i++) {
			if(answer===this.solutions[i]) {
				return true;
			}
		}
		return false;    
	}

	getSolution() {
		return this.solutions[0];
	}
}

class Keyboard extends Screen {
	constructor(id, prompt, original, solutions, sound) {
		super(id, prompt, original, solutions);
		this.sound = sound;
        
		//TODO som como evento ao clicar no botao chamar playsound
	}

	show() {
        super.show();
		var lessonButton = document.getElementById("button"+language.currLesson.id);
		console.log(language.currLesson.id);
		lessonButton.style.backgroundColor = "#0f66b0";
		//PARTE HARDCODED
        
		DynamicHTML.h1(this.box, "Write this in English").style.color = "#333";

		var p1 = DynamicHTML.p(this.box, "padding-left:40px; word-spacing:50px;");
		var i = DynamicHTML.img(p1, "http://icons.iconarchive.com/icons/icons8/ios7/32/Media-Controls-High-Volume-icon.png");
		DynamicHTML.eventHandler(i, "onclick", "DynamicHTML.play( '" + this.sound + "');");
		DynamicHTML.text(p1, 16, " ");
		DynamicHTML.text(p1, 32, this.original);

		var p2 = DynamicHTML.p(this.box, "padding-left:20px;");
		var i = DynamicHTML.inputActiveText(p2, "answer", 40, 24, "Type this in English");
		DynamicHTML.eventHandler(i, "onkeydown", "if(event.keyCode == 13) document.getElementById('check').click();");

		DynamicHTML.text(p2, 16, " ");
		var b1 = DynamicHTML.inpuButton(p2, "check", "Check", "lime");
		b1.style = "margin-left: 5px; border-radius: 5px; padding: 8px 15px; background-color: #22aa55; color: white; font-size: 16px; font-weight: bold;";
		b1.onclick = () => {
			let solutions = Array.from(solutions);
			for (let translation of solutions) {
				if (document.getElementById("answer").value == translation){
					console.log(translation);
					return DynamicHTML.validate(document.getElementById("answer").value, translation);   
				}
			}
			return DynamicHTML.validate(document.getElementById("answer").value, solutions[0]);
		};
        
	}
}

//TODO
class Pairs extends Screen {

}

class Blocks extends Screen {

}

class Symbols extends Screen { //Usar para alfabetos extra apenas

}
//------------------------------

//TESTE
// class Game {
// 	static run() {
// 		var body = document.body;
// 		body.innerHTML = "";
// 		h1(body, "Babel   (" + languageName + ")");
// 		hr(body);
// 		var d = div(body, "border:3px solid black; display:table; padding:20px; margin-left:40px");

// 		//var nLessons = getNumberOfChildElements(xmlDoc,"LESSON");
// 		var nScreens = 1;
// 		var screens = [];
// 		var currScreenNumber;

// 		var currScreen;
// 		var currScreenType;
// 		var prompt, original, solutions = [], sound;

// 		//STARTUP le ficheiro e sabe quantos screens e as solucoes de cada um etc
// 		for(var i = 1;i<=nScreens;i++) {
// 			currScreen = getLessonData(i,nLessons);
// 			currScreenType = currScreen.firstChild.tagName;
// 			prompt = currScreen.getElementsByTagName("PROMPT")[0].firstChild.nodeValue;
// 			original = currScreen.getElementsByTagName("ORIGINAL")[0].firstChild.nodeValue;

// 			console.log(getNumberOfChildElements(currScreen,"SOLUTION"));
// 			console.log(currScreen);
// 			console.log(prompt);
// 			console.log(original);

// 			for(var j = 0;j<getNumberOfChildElements(currScreen,"SOLUTION");j++) {
// 				console.log(i);
// 				solutions[j] = currLesson.getElementsByTagName("SOLUTION")[j].firstChild.nodeValue;
// 			}

// 			sound = currLesson.getElementsByTagName("SOUND")[0].firstChild.nodeValue

// 			screens[i] = new Screen(prompt, original, solutions, sound); //Usar instance of mais a frente
// 			//pode dar jeito para saber qe licao estamos
// 			console.log(currScreenType);
// 		}

// 		console.log(solutions);
// 		console.log(lessons[1]);
// 	}

// 	static nextLesson() {

// 	}

// }
//------------------------------

function runLanguage(text) {
	xmlDoc = DynamicHTML.text2XML(text);  // assignement to global
	xmlSerializer = new XMLSerializer();  // assignement to global
	// https://www.w3schools.com/xml/dom_nodes_get.asp
	var nodes = xmlDoc.getElementsByTagName("LANGNAME");
	if( nodes.length == 1 ) {
		languageName = nodes[0].childNodes[0].nodeValue;  // assignement to global
		//screen1();
        
		console.log("start()");

		new LanguageExtraAlphabets();
        
		//var page = new DynamicHTML(language);
	}
	else {
		alert("ERROR: Not a language file!\nPLEASE, TRY AGAIN!");
		screen0();
	}
}

function onLoad() {
	screen0();
}

