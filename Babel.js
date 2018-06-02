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

var xmlDoc, xmlSerializer, languageName, language;


/* Misc functions */


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
		console.log(action);
		a[kind] = new Function(action);
		return a;
	}
    
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
		this.header = DynamicHTML.div(this.body, "float:left;top: 0px; left: 0;background-color: #0f96d0; width:100%; height: 80px;");
		DynamicHTML.h1(this.header, "Babel   - " + languageName + "").style = "margin: 20px;font-family: sans-serif; text-transform: uppercase; font-weight: bold; color: white";
		DynamicHTML.hr(this.body).style = "border-top: 2px dashed #0f96d0;";
		this.nav = DynamicHTML.div(this.body, "text-align: center; position: relative; margin-bottom:20px;");
		this.buttons = [];
		this.nLessons = getNumberOfChildElements(xmlDoc, "LESSON");
		this.currLesson = null;
		this.lessons = [];
		this.start();
	}
    
	start() {
		this.initLessons();
		this.addLessonsButtons();
	}
    
	addLessonsButtons() {
		console.log("in");
		for (let i = 1; i <= this.nLessons;i++) {
			//tirar a cor como argumento do botao
			this.buttons[i] = DynamicHTML.inpuButton(this.nav,"button" + i,"Lesson " + i, "red");
			this.buttons[i].style = "display: inline-block; margin: 5px 5px; border-radius: 5px; padding: 8px 16px; background-color: #0f96d0; color: white; font-size: 13px; font-weight: bold;";

			this.buttons[i].onclick = () => { this.getLesson(i);};
			//eventHandler(this.buttons[i],"onclick","showKeyboardScreen(" + i +");");
		}
	}

	hideLessonsButtons() {
		for (let i = 1; i <= this.nLessons;i++) {
			this.buttons[i].style.display = "none";
		}
		//this.nav.remove();
	}

	showLessonsButtons() {
		for (let i = 1; i <= this.nLessons;i++) {
			this.buttons[i].style.display = "";
		}
		//this.addLessonsButtons();
	}

	showBackButton() {
		this.backButton = DynamicHTML.inpuButton(this.nav,"backButton", "Back");
		this.backButton.style = "margin:5px 5px; position: absolute; left: 20px; border-radius: 5px; padding: 8px 16px; background-color: #0f96d0; color: white; font-size: 13px; font-weight: bold;";
		this.backButton.onclick = () => {return this.goBack();};
	}

	hideBackButton(){
		this.backButton.style.display = "none";
	}

	goBack() {
		this.currLesson.leaveLesson();
		this.currLesson = null;
		this.hideBackButton();
		//this.addLessonsButtons();
		this.showLessonsButtons();

	}
    
	getLesson(id) {
		if (this.currLesson != null) {
			this.currLesson.leaveLesson();
			//this.hideLessonsButtons();
		} else {
			this.hideLessonsButtons();
			this.showBackButton();
		}
        
		this.currLesson = this.lessons[id];
		language.currLesson.showLesson();
		language.currLesson.showCurrentScreen();
        
	}
    

	initLessons() {
		for(let i = 1; i <= this.nLessons; i++) {
			this.lessons[i] = new Lesson(i,this.body);
		}
	}
}

//TODO
class LanguageExtraAlphabets extends Language {
	constructor() {
		super();
		this.nSymbols = getNumberOfChildElements(xmlDoc, "SYMBOLS");
		console.log("nSymbols=" + this.nSymbols);
		this.currSymbols = null;
		this.symbols = [];
		this.symbolsXML = xmlDoc.getElementsByTagName("SYMBOLS");
		this.addSymbolsButtons();
		this.initSymbols();
	}

	addSymbolsButtons() {
		let symbolName;
		console.log("nLessons antes=" + this.nLessons);
		let i;
		for(i = this.nLessons+1;i<=this.nLessons+this.nSymbols;i++) {
			console.log(i-this.nLessons);
			console.log(this.symbolsXML[i-this.nLessons-1]);
			symbolName = this.symbolsXML[i-this.nLessons-1].getElementsByTagName("SYMBNAME")[0].firstChild.nodeValue;
			console.log(symbolName);
			this.buttons[i] = DynamicHTML.inpuButton(this.nav,"button" + symbolName,symbolName, "red");
			this.buttons[i].style = "display: inline-block; margin: 5px 5px; border-radius: 5px; padding: 8px 16px; background-color: #0f96d0; color: white; font-size: 13px; font-weight: bold;";
			const id = i-this.nLessons;
			this.buttons[i].onclick = () => { this.getSymbols(id);};
		}
		this.nLessons += this.nSymbols;
		console.log("nLessons depois=" + this.nLessons);
	}

	getSymbols(id) {
		console.log("getSymbols(" + id + ")");
		this.currSymbols = this.symbols[id];
		this.hideLessonsButtons();
		this.showBackButton();

		let container = DynamicHTML.div(document.body, "position: absolute; left: 50%; -webkit-transform: translateX(-50%); transform: translateX(-50%); ");
		container.id = "container";
        
		let resetBtn = DynamicHTML.inpuButton(container, "resetBtn", "Reset Board", "red");
		resetBtn.style = "position: absolute; top: 22px;right: 10px;background-color: rgb(13, 118, 176); border-radius: 5px; padding: 8px 16px; color: white; font-size: 13px; font-weight: bold; cursor: pointer;";
        
		resetBtn.onclick = () => {
			language.currSymbols.box.remove();
			language.currSymbols.box2.remove();
			language.currSymbols.show(container);
		}
        
		let title = DynamicHTML.h1(container, language.currSymbols.name.toUpperCase() + " SYMBOLS");
		title.style = "color:#0d76b0; font-family: sans-serif;";
		title.id = "title";
        
		let currScreen = DynamicHTML.h1(container, "");
		currScreen.style = "color:#444; font-family: sans-serif; font-size: 20px;";
		currScreen.id = "currScreen";
        
		let screensLeft = DynamicHTML.h1(container, "");
		screensLeft.style = "color:#555; font-family: sans-serif; font-size: 15px;";
		screensLeft.id = "screensLeft";

        
		// if (this.hasNextScreen()) {
            
		// 	this.getCurrentScreen().show(container);
		// } else {
		// 	currScreen.style = "display: none;";
		// 	screensLeft.style = "display: none;";
            
		// 	DynamicHTML.h1(container, "Congratulations, you've reached the end of this lesson!").style = "color:#444; font-family: sans-serif; font-size: 20px;";
		// }

		this.currSymbols.show(container);
	}

	initSymbols() {
		for(let i = 1; i <= this.nSymbols; i++) {
			this.symbols[i] = new Symbols(i,this.symbolsXML[i-1]);
		}
	}
    
	goBack() {
		if (this.currSymbols != null) {
			document.getElementById("container").remove();
			this.currSymbols = null;
			this.hideBackButton();
			this.showLessonsButtons();
		} else {
			super.goBack();
		}
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
				case "PAIRS":
					screen = this.loadPairs(this.nScreens, screenXML);
					break;
				case "BLOCKS": //TODO
					screen = this.loadBlocks(this.nScreens, screenXML);
					break;
				}

				this.screens[this.nScreens] = screen;
                
			}
		}
	}
    
	loadKeyboard(id, screenXML) {
		var prompt = screenXML.getElementsByTagName("PROMPT")[0].firstChild.nodeValue;
		var original = screenXML.getElementsByTagName("ORIGINAL")[0].firstChild.nodeValue;
		var sound = null
		if(screenXML.getElementsByTagName("SOUND").length > 0) {
			sound = screenXML.getElementsByTagName("SOUND")[0].firstChild.nodeValue;
		}
		var solutions = Array.from(screenXML.getElementsByTagName("TRANSLATION")).map(translation => {return translation.firstChild.nodeValue;});
		return new Keyboard(id, prompt, original, solutions, sound);
	}

	loadPairs(id,screenXML) {
		var prompt = screenXML.getElementsByTagName("PROMPT")[0].firstChild.nodeValue;
		var original = screenXML.getElementsByTagName("ORIGINAL")[0].firstChild.nodeValue;
		var solutions = screenXML.getElementsByTagName("SOLUTION")[0].firstChild.nodeValue;
		return new Pairs(id, prompt, original, solutions);
	}
    
	loadBlocks(id,screenXML) {
		var prompt = screenXML.getElementsByTagName("PROMPT")[0].firstChild.nodeValue;
		var original = screenXML.getElementsByTagName("ORIGINAL")[0].firstChild.nodeValue;
		var solutions = [screenXML.getElementsByTagName("SOLUTION")[0].firstChild.nodeValue];
		var blocks = screenXML.getElementsByTagName("BLOCKS")[0].firstChild.nodeValue;
		return new Blocks(id, prompt, original, solutions, blocks);
	}

	hasNextScreen() {
		return this.screensNotPassed.length != 0;
	}
    
	getCurrentScreen() {
		return this.screens[this.currentScreenNumber];
	}
    
	showLesson() {
		let container = DynamicHTML.div(document.body, "position: absolute; left: 50%; -webkit-transform: translateX(-50%); transform: translateX(-50%); ");
		container.id = "container";
        
		let title = DynamicHTML.h1(container, "LESSON " + language.currLesson.id);
		title.style = "color:#0d76b0; font-family: sans-serif;";
		title.id = "title";
        
		let currScreen = DynamicHTML.h1(container, "");
		currScreen.style = "color:#444; font-family: sans-serif; font-size: 20px;";
		currScreen.id = "currScreen";
        
		let screensLeft = DynamicHTML.h1(container, "");
		screensLeft.style = "color:#555; font-family: sans-serif; font-size: 15px;";
		screensLeft.id = "screensLeft";
	}
    
	showCurrentScreen() {
		let currScreen = document.getElementById("currScreen");
		let screensLeft = document.getElementById("screensLeft");
        
		if (this.hasNextScreen()) {
			currScreen.innerHTML = "Screen " + language.currLesson.getCurrentScreen().id + " of " + language.currLesson.nScreens;
			let screens = (language.currLesson.screensNotPassed.length == 1)?" screen": " screens";
			screensLeft.innerHTML = "You have " + language.currLesson.screensNotPassed.length + screens +" to complete";
            
			this.getCurrentScreen().show(container);
		} else {
			currScreen.style = "display: none;";
			screensLeft.style = "display: none;";
            
			DynamicHTML.h1(container, "Congratulations, you've reached the end of this lesson!").style = "color:#444; font-family: sans-serif; font-size: 20px;";
		}
	}
    
	leaveLesson() {
		document.getElementById("container").remove();
	}

	nextScreen() {
		//Hide previous screen
		this.getCurrentScreen().hide();
        
		this.screenNotPassedIndex--;
        
		if (this.screenNotPassedIndex < 0) {
			this.screenNotPassedIndex = this.screensNotPassed.length - 1;
		}
        
		this.currentScreenNumber = this.screensNotPassed[this.screenNotPassedIndex];

		this.showCurrentScreen();
	}
    
	passCurrentScreen() {
		this.screensNotPassed.splice(this.screenNotPassedIndex, 1);
	}
}

class Screen {
	constructor(id, prompt, original, solutions) {
		this.id = id;
		this.prompt = prompt;
		this.original = original;
		this.solutions = solutions;
		this.box = null;
	}

	show(container) {
		this.box = DynamicHTML.div(container, "border-radius: 5px; background-color: rgb(240, 240, 240); padding:20px; font-family: Arial; box-shadow: 2px 2px 5px rgba(0,0,0,0.2)");
		this.box.id = "box";
	}
    
	hide() {
		document.getElementById("box").remove();
	}

	checkAnswer(answer) {
		for (let i=0; i < this.solutions.length; i++) {
			if (answer == this.solutions[i]) {
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
	}

	show(container) {
		super.show(container);
		DynamicHTML.h1(this.box, this.prompt).style = "margin-left: 15px; color:#333";

		var p1 = DynamicHTML.p(this.box, "padding-left:40px; word-spacing:50px;");

		if(this.sound!=null) {
			var i = DynamicHTML.img(p1, "http://icons.iconarchive.com/icons/icons8/ios7/32/Media-Controls-High-Volume-icon.png");
			DynamicHTML.eventHandler(i, "onclick", "DynamicHTML.play(" + "\"" + this.sound + "\"" + ");");
		}
		DynamicHTML.text(p1, 16, " ");
		DynamicHTML.text(p1, 32, this.original);

		var p2 = DynamicHTML.p(this.box, "padding-left:20px;");
		this.i = DynamicHTML.inputActiveText(p2, "answer", 40, 24, "Type this in English");
		

		DynamicHTML.text(p2, 16, " ");
		var b1 = DynamicHTML.inpuButton(p2, "check", "Check", "lime");
		b1.style = "margin-left: 5px; border-radius: 5px; padding: 8px 15px; background-color: #22aa55; color: white; font-size: 16px; font-weight: bold;";
		DynamicHTML.eventHandler(document, "onkeydown", "if(event.keyCode == 13) document.getElementById('check').click();");
		DynamicHTML.eventHandler(b1, "onclick", "language.currLesson.getCurrentScreen().checkSolution();");
        
	}
    
	checkSolution() {
		let isSolution = language.currLesson.getCurrentScreen().checkAnswer(document.getElementById("answer").value);
		let container = document.getElementById("container");
		document.onkeydown = null;
            
		if (isSolution) {
			this.answeredCorrect();
		} else {
			this.answeredWrong();
		}
		
	}
    
	answeredCorrect() {
		language.currLesson.passCurrentScreen();
		DynamicHTML.play("general/right_answer.mp3");
		language.currLesson.nextScreen();
	}
    
	answeredWrong() {
		let nextScreenBtn = DynamicHTML.inpuButton(container, "nextScreenBtn", "Next Screen", "red");
		nextScreenBtn.style = "display: inline-block; margin: 5px 5px 10px; border-radius: 5px; padding: 8px 16px; background-color: #0f96d0; color: white; font-size: 13px; font-weight: bold;";
		//nextScreenBtn.id = "nextScreenBtn";
		
                
		nextScreenBtn.onclick = () => {
			language.currLesson.nextScreen();
			document.getElementById("correctAnswer").remove();
			document.getElementById("nextScreenBtn").remove();

			DynamicHTML.eventHandler(document, "onkeydown", "if((event.keyCode == 13) && document.getElementById('check') != null) document.getElementById('check').click();");
		};

		DynamicHTML.eventHandler(document, "onkeydown", "if(event.keyCode == 13) document.getElementById('nextScreenBtn').click();");
                
		language.currLesson.getCurrentScreen().box.style = "display: none";
		let correctAnswer = DynamicHTML.h1(container, "The correct answer was: " + language.currLesson.getCurrentScreen().getSolution());
		correctAnswer.style = "color:#444; font-family: sans-serif; font-size: 20px;";
		correctAnswer.id = "correctAnswer";
		DynamicHTML.play("general/wrong_answer.mp3"); 
	}
}

//TODO
class Pairs extends Screen {
	constructor(id, prompt, original, solutions) {
		super(id, prompt, original, solutions);
		this.solutionsArray = this.solutions.split(" ");
		this.originalArray = this.original.split(" ");
		this.buttonsElements = [];
		this.selectedBefore = null;
		this.nPairsMade = 0;
	}

	answered(button) {
		if(this.selectedBefore==null) {
			this.selectedBefore = button;
			this.selectedBefore.style.color = "rgb(240, 240, 240)";
			this.selectedBefore.style.backgroundColor = "rgb(60, 60, 60)";
		} else {
			if(this.isPairCorrect(button)) {
				this.selectedBefore.style.backgroundColor = "#B4B4B4";
				button.style.backgroundColor = "#B4B4B4";
				this.selectedBefore.style.color = "rgb(0, 0, 0)";
				button.style.color = "rgb(0, 0, 0)";
				this.selectedBefore.disabled = "disabled";
				button.disabled = "disabled";
				this.nPairsMade++;
			}  else {
				this.selectedBefore.style.backgroundColor = "rgb(255, 255, 255)";
				this.selectedBefore.style.color = "rgb(0, 0, 0)";
			}
			this.selectedBefore = null;
		}
		if(this.nPairsMade == this.solutionsArray.length/2) {
			language.currLesson.passCurrentScreen();
			DynamicHTML.play("general/right_answer.mp3");
			language.currLesson.nextScreen();
		}
	}

	isPairCorrect(lastSelected) {
		let indexOfSelectedNow = this.solutionsArray.indexOf(lastSelected.value);
		let indexOfSelectedBefore = this.solutionsArray.indexOf(this.selectedBefore.value); 
		if( Math.abs(indexOfSelectedNow - indexOfSelectedBefore) == 1) {
			if (Math.min(indexOfSelectedBefore,indexOfSelectedNow) % 2 == 0 ) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	show(container) {
		super.show(container);
		DynamicHTML.h1(this.box,this.prompt).style.color = "#333";
		let pairs = DynamicHTML.p(this.box,"");

		for(let i=0;i<this.originalArray.length;i++) {
			this.buttonsElements[i] = DynamicHTML.inpuButton(pairs,"butElem"+i,this.originalArray[i],"red");
			this.buttonsElements[i].style = "margin:5px 5px; border-radius: 5px; font-size: 17px; background-color: rgb(255, 255, 255); padding:5px; font-family: Arial; box-shadow: 2px 2px 5px rgba(0,0,0,0.2); cursor: pointer;";
			this.buttonsElements[i].onclick = (event) => {this.answered(event.target);};
		}

	}
}

class Blocks extends Screen {
	constructor(id, prompt, original, solution, blocks) {
		super(id, prompt, original, solution);
        
		this.blocks = blocks.split(" ");
		this.buttonElements = [];
		this.answer = [];
	}
    
	show(container) {
		super.show(container);
		DynamicHTML.h1(this.box,this.prompt).style = "color:#333; margin: 15px;";
		let pairs = DynamicHTML.p(this.box,"");
        
		DynamicHTML.text(this.box, 16, " ");
		DynamicHTML.text(this.box, 32, this.original).style = "margin: 15px; font-size: 25px;";
        
		let firstLine = DynamicHTML.div(this.box, "padding: 10px; margin: 15px; border-bottom: 2px solid #666; min-height: 40px; min-width: 90%; max-width 90%;");
		firstLine.id = "answer";
		firstLine.ondragover = event => {
			event.preventDefault();
		};
        
		firstLine.ondrop = event => {
			this.onBlockDropFirstLine(event);
		};
        
		let secondLine = DynamicHTML.div(this.box, "margin: 15px; border-bottom: 2px solid #666; height: 40px; min-width: 90%; max-width 90%;");
        
		let blocksDiv = DynamicHTML.div(this.box, "text-align: center; margin: 15px; min-width: 90%; max-width 90%;");
        
		blocksDiv.ondrop = event => {
			this.onBlockDropBlocksDiv(event);
		};
        
		blocksDiv.ondragover = event => {
			event.preventDefault();
		};
        
		for(let i=0;i<this.blocks.length;i++) {
			this.buttonElements[i] = DynamicHTML.inpuButton(blocksDiv,"butElem"+i,this.blocks[i],"red");
			this.buttonElements[i].style = "display: inline-block; margin:5px 5px; border-radius: 5px; font-size: 17px; background-color: rgb(255, 255, 255); padding:5px; font-family: Arial; box-shadow: 2px 2px 5px rgba(0,0,0,0.2); cursor: pointer;";
			this.buttonElements[i].draggable = "true";
			this.buttonElements[i].ondragstart = event => {
				event.dataTransfer.setData("text", event.target.id);
			};
            
			this.buttonElements[i].ondrop = event => {
				this.onBlockDropBlock(event);
			};

			this.buttonElements[i].ondragover = event => {
				event.preventDefault();
			};
		}
	}
    
	onBlockDropBlock(event) {
		event.stopPropagation();
		event.preventDefault();
		let block = document.getElementById(event.dataTransfer.getData("text"));
		let row = event.target.parentNode;       
        
		if(row != block.parentNode || row.id == "answer") {
			let answerParent = (row.id == "answer")?row: block.parentNode;
			//Execute unless the block comes from the block options
			if (row == block.parentNode || row.id != "answer") {
                
				let index = Array.from(answerParent.children).indexOf(block);
				//insert blank string that will later be removed
				this.answer.splice(index, 1, "");   
			}
            
			//index of target button
			if (row.id == "answer") {
                
				let index = Array.from(row.children).indexOf(event.target);
                
				//insert block value at the index of the target value 
				this.answer.splice(index, 0, block.value);
			}
            
			if(this.answer.indexOf("") != -1) {
				this.answer.splice(this.answer.indexOf(""), 1);
			}
		}     
            
		row.insertBefore(block, event.target);
		console.log(this.answer);
		this.checkAnswer();
	}
    
	checkAnswer() {
		if(this.answer.join(" ") == language.currLesson.getCurrentScreen().getSolution()) {
			language.currLesson.passCurrentScreen();
			DynamicHTML.play("general/right_answer.mp3");
			language.currLesson.nextScreen();
		}
	}

	onBlockDropFirstLine(event) {
		event.preventDefault();
		let block = document.getElementById(event.dataTransfer.getData("text"));
		let value = block.value;
		event.target.appendChild(block);
		this.answer.push(block.value);
            
		this.checkAnswer();
	}
    
	onBlockDropBlocksDiv(event) {
		event.preventDefault();
		let block = document.getElementById(event.dataTransfer.getData("text"));
		let row = event.target.parentNode; 
        
		if(row != block.parentElement) {
			let index = Array.from(block.parentElement.children).indexOf(block);
			this.answer.splice(index, 1);
            
		}
        
		this.checkAnswer();
        
		event.target.appendChild(block);
	}
}

class Symbol {
	constructor(symbol, latin) {
		this.symbol = symbol;
		this.latin = latin;
	}
}

class Symbols extends Screen { //Usar para alfabetos extra apenas
	constructor(id, symbolXML) {
		let prompt = "";
		if(symbolXML.getElementsByTagName("PROMPT").length != 0) {
			prompt = symbolXML.getElementsByTagName("PROMPT")[0].firstChild.nodeValue;
		}
        
		let original = symbolXML.getElementsByTagName("LATIN")[0].firstChild.nodeValue;
		let solutions = symbolXML.getElementsByTagName("ALPHABET")[0].firstChild.nodeValue;

		console.log(prompt);
		console.log(original);
		console.log(solutions);

		super(id, prompt, original.split(" "), solutions.split(" "));
		this.name = symbolXML.getElementsByTagName("SYMBNAME")[0].firstChild.nodeValue;
		this.pairsBoxes = [];
		this.fixedElements = [];
		this.boxesToFill = [];
		this.nPairsMade = 0;
		this.symbolsToDrag = [];
	}

	isAnswerCorrect(staticElement, droppedElement) {
		if(staticElement == droppedElement.latin) {
			this.nPairsMade++;
			return true;
		} else {
			return false;
		}
	}

	show(container) {
		super.show(container);
		this.box2 = DynamicHTML.div(container, "margin-top: 10px;border-radius: 5px; background-color: rgb(240, 240, 240); padding:20px; font-family: Arial; box-shadow: 2px 2px 5px rgba(0,0,0,0.2)");
		this.box.style.display = "table";
		for(let i=0;i<this.original.length;i++) {
			this.pairsBoxes[i] = DynamicHTML.div(this.box,"display: inline-block; margin: 6px 6px; text-align:center;vertical-align:middle;");
			this.fixedElements[i] = DynamicHTML.text(this.pairsBoxes[i],"18",this.original[i]);
			this.boxesToFill[i] = DynamicHTML.div(this.pairsBoxes[i],"border-radius:5px; height: 30px; width:28px; background-color: #ddd;");
			this.boxesToFill[i].ondragover = event => {event.preventDefault();};
			this.boxesToFill[i].ondrop = event => {this.onBlockDrop(event);};
		}
        
		let tempSymbols = [];
		for(let i = 0;i<this.solutions.length;i++) { 
			tempSymbols.push(new Symbol(this.solutions[i], this.original[i]));
		}
		tempSymbols.sort(function(a, b){return 0.5 - Math.random();});
        
		for(let i = 0;i<this.solutions.length;i++) {
			let symbolElement = DynamicHTML.inpuButton(this.box2,"buttonToDrag" + i,tempSymbols[i].symbol, "white");
			symbolElement.style = "margin:5px; border-radius: 5px; font-size: 17px; background-color: rgb(255, 255, 255); padding:5px; font-family: Arial; box-shadow: 2px 2px 5px rgba(0,0,0,0.2); cursor: pointer;";
			symbolElement.draggable = "true";
			let symbol = new Symbol(this.solutions[i], this.original[i]);
			symbolElement.symbol = tempSymbols[i];
			this.symbolsToDrag[i] = tempSymbols[i];
			
			symbolElement.ondragstart = (event) => {event.dataTransfer.setData("text", event.target.id);};
		}
	}
    
	onBlockDrop(event) {
		event.preventDefault();
		let data = event.dataTransfer.getData("text");
		let elementDropped = document.getElementById(data);
        
		if(this.isAnswerCorrect(event.target.parentNode.getElementsByTagName("span")[0].textContent, elementDropped.symbol)) {
			event.target.style = "border-radius:5px; height:" + elementDropped.offsetHeight + "px; width:" + elementDropped.offsetWidth + "px; border:1px solid #000";
			event.target.appendChild(elementDropped);
			elementDropped.style = "border-radius: 5px; font-size: 17px; background-color: rgb(255, 255, 255); padding:5px; font-family: Arial; box-shadow: 2px 2px 5px rgba(0,0,0,0.2); cursor: pointer;";

			if(this.nPairsMade == this.solutions.length) {
				this.finished(elementDropped.container);
			}
		}
	}

	finished(container) {
		this.box2.remove();
		for(let i = 0;i<this.original.length;i++) {
			this.pairsBoxes[i].remove();
		}
		DynamicHTML.h1(this.box, "Congratulations, you just learned all symbols of the alphabet " + this.name + ".").style = "color:#444; font-family: sans-serif; font-size: 20px; text-align:center;";
	}
}
//------------------------------

function runLanguage(text) {
	xmlDoc = DynamicHTML.text2XML(text);  // assignement to global
	xmlSerializer = new XMLSerializer();  // assignement to global
	// https://www.w3schools.com/xml/dom_nodes_get.asp
	var nodes = xmlDoc.getElementsByTagName("LANGNAME");
	if( nodes.length == 1 ) {
		languageName = nodes[0].childNodes[0].nodeValue;  // assignement to global
        
		console.log("start()");

		if(xmlDoc.getElementsByTagName("SYMBOLS").length > 0) {
			new LanguageExtraAlphabets();
		} else {
			new Language();
		}
	}
	else {
		alert("ERROR: Not a language file!\nPLEASE, TRY AGAIN!");
		screen0();
	}
}

function onLoad() {
	screen0();
}

function screen0() {
	var body = document.body;
	// start with a blank page
	body.innerHTML = "";

	// load the language XML
	var f = DynamicHTML.inpuFile(body, "file-input");
	DynamicHTML.eventHandler(f, "onchange", "DynamicHTML.processLocalFile(event, runLanguage);");
}

