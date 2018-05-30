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
    body.innerHTML = '';

// load the language XML
    var f = DynamicHTML.inpuFile(body, "file-input");
    DynamicHTML.eventHandler(f, "onchange", "DynamicHTML.processLocalFile(event, runLanguage);");
}

//************************************E APENAS EXEMPLO, DEPOIS E PARA REMOVER     ************************************
function screen1() {
    var body = document.body;
// start with a blank page
    body.innerHTML = '';

    h1(body, "Babel   (" + languageName + ")");
    hr(body);

// a div, only because we want a border
    var d = div(body, "border:3px solid black; display:table; padding:20px; margin-left:40px");
    h1(d, "Write this in English");

// first line
    var p1 = p(d, "padding-left:40px; word-spacing:50px;");
    var i = img(p1, "http://icons.iconarchive.com/icons/icons8/ios7/32/Media-Controls-High-Volume-icon.png");
    eventHandler(i, "onclick", "play('japanese/sentences/何時ですか.mp3');");
    text(p1, 16, " ");
    text(p1, 32, "何時ですか");

// second line
    var p2 = p(d, "padding-left:20px;");
    var i = inputActiveText(p2, "answer", 40, 24, "Type this in English");
    eventHandler(i, "onkeydown", "if(event.keyCode == 13) document.getElementById('check').click();");
    text(p2, 16, " ");
    var b1 = inpuButton(p2, "check", "Check", "lime");
    eventHandler(b1, "onclick", "validate(document.getElementById('answer').value, 'What time is it?');");

    hr(body);
}

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
        var a = document.createElement('SPAN');
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
    
    static eventHandler2(a, kind, functionAction) {
        a[kind] = functionAction;
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
        let serializer = new XMLSerializer();
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
        this.body = document.body;
        this.body.innerHTML = '';
        DynamicHTML.h1(this.body, "Babel   (" + languageName + ")").fontFamily = "Arial Black";
        DynamicHTML.hr(this.body);
        this.nav = DynamicHTML.div(this.body, "display:table; margin-bottom:20px;");
        this.buttons = [];
        this.nLessons = getNumberOfChildElements(xmlDoc, "LESSON");
        this.currLesson = null;
        this.lessons = [];
        this.start();
    }
    
    start() {
        this.initLessons();
        
        this.addLessonsButtons(this.nLessons);
    }
    
    addLessonsButtons(nLessons) {
        console.log("addLessonsButtons=" + nLessons);
        for (let i = 1; i <= nLessons;i++) {
            console.log("button");
            this.buttons[i] = DynamicHTML.inpuButton(this.nav,"button" + i,"Lesson " + i, "red");
            this.buttons[i].style = "margin: 5px 5px; border-radius: 5px; padding: 8px 16px; background-color: #0f96d0; color: white; font-size: 13px; font-weight: bold;";
            
            this.buttons[i].onclick = () => {return this.getLesson(i);};
            //eventHandler(this.buttons[i],"onclick","showKeyboardScreen(" + i +");");
        }
    }
    
    getLesson(id) {
        if (this.lessons[id].hasNextScreen()) {
            this.currLesson = this.lessons[id];
            this.currLesson.nextScreen();
            this.currLesson.currScreen.show();
        }
    }
    

    initLessons() {
        for(let i = 1; i <= this.nLessons; i++) {
            this.lessons[i] = new Lesson(i);
        }
    }

    nextScreen() {
        if(this.currLesson.hasNextScreen()) {
            return this.currLesson.nextScreen();
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
        this.screens = [];
        this.currentScreenNumber = 0;
        this.lessonXML = xmlDoc.querySelectorAll("LESSON")[id-1];
        console.log(id);
        this.nScreens = this.lessonXML.childNodes.length;
        this.nCompletedScreens = 0;
        this.id = id;
    }

    hasNextScreen() {
        return this.currentScreenNumber < this.nScreens;
    }

    nextScreen() {
        if(this.hasNextScreen()) {
            this.currentScreenNumber++;
            this.currScreenType = this.lessonXML.childNodes[2 * this.currentScreenNumber - 1].tagName; 
            var screenXML = this.lessonXML.childNodes[2 * this.currentScreenNumber - 1];
            switch (this.currScreenType) {
                case "KEYBOARD":

                    var prompt = screenXML.getElementsByTagName("PROMPT")[0].firstChild.nodeValue;
                    var original = screenXML.getElementsByTagName("ORIGINAL")[0].firstChild.nodeValue;
                    var sound = screenXML.getElementsByTagName("SOUND")[0].firstChild.nodeValue;
                    var solutions = Array.from(screenXML.getElementsByTagName("TRANSLATION")).map(translation => {return translation.firstChild.nodeValue;});
                    
                    this.currScreen = new Keyboard(prompt, original, solutions, sound);
                    this.screens[this.currentScreenNumber] = this.currScreen;
                    break;

                //TODO outros screens
                case "PAIRS":
                    this.screens[this.currentScreenNumber] = new Pairs();
                    break;
                case "BLOCKS":
                    this.screens[this.currentScreenNumber] = new Blocks();
                    break;
                case "SYMBOLS":
                    this.screens[this.currentScreenNumber] = new Symbols();
                    break;
            }

            return this.currScreen;
        } else {
            alert("ERRO!!");
        }
    }
}

class Screen {
    constructor(prompt, original, solutions) {
        this.prompt = prompt;
        this.original = original;
        this.solutions = solutions;
    }
    show() {
        
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

    getPrompt() {
        return this.prompt;
    }

    getOriginal() {
        return this.original;
    }

    getSolution() {
        return this.solutions[0];
    }
}

class Keyboard extends Screen {
    constructor(prompt, original, solutions, sound) {
        super(prompt, original, solutions);
        this.sound = sound;
        //TODO som como evento ao clicar no botao chamar playsound
    }

    show() {
        var lessonButton = document.getElementById("button"+language.currLesson.id);
        console.log(language.currLesson.id);
        lessonButton.style.backgroundColor = "#0f66b0";
        //PARTE HARDCODED
        
        var d = DynamicHTML.div(document.body, "display: table; border-radius: 5px; background-color: rgb(240, 240, 240); padding:20px; margin:10px; font-family: Arial; box-shadow: 2px 2px 5px rgba(0,0,0,0.2)");
        
        DynamicHTML.h1(d, "Write this in English").style.color = "#333";

        var p1 = DynamicHTML.p(d, "padding-left:40px; word-spacing:50px;");
        var i = DynamicHTML.img(p1, "http://icons.iconarchive.com/icons/icons8/ios7/32/Media-Controls-High-Volume-icon.png");
        DynamicHTML.eventHandler(i, "onclick", "DynamicHTML.play( '" + this.sound + "');");
        DynamicHTML.text(p1, 16, " ");
        DynamicHTML.text(p1, 32, this.original);

        var p2 = DynamicHTML.p(d, "padding-left:20px;");
        var i = DynamicHTML.inputActiveText(p2, "answer", 40, 24, "Type this in English");
        DynamicHTML.eventHandler(i, "onkeydown", "if(event.keyCode == 13) document.getElementById('check').click();");

        DynamicHTML.text(p2, 16, " ");
        var b1 = DynamicHTML.inpuButton(p2, "check", "Check", "lime");
        b1.style = "margin-left: 5px; border-radius: 5px; padding: 8px 15px; background-color: #22aa55; color: white; font-size: 16px; font-weight: bold;";
        b1.onclick = () => {
            let solutions = Array.from(solutions);
            for (let translation of solutions) {
                if (document.getElementById('answer').value == translation){
                    console.log(translation);
                    return DynamicHTML.validate(document.getElementById('answer').value, translation);   
                }
            }
            return DynamicHTML.validate(document.getElementById('answer').value, solutions[0]);
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
class Game {
    static run() {
        var body = document.body;
        body.innerHTML = '';
        h1(body, "Babel   (" + languageName + ")");
        hr(body);
        var d = div(body, "border:3px solid black; display:table; padding:20px; margin-left:40px");

        //var nLessons = getNumberOfChildElements(xmlDoc,"LESSON");
        var nScreens = 1;
        var screens = [];
        var currScreenNumber;

        var currScreen;
        var currScreenType;
        var prompt, original, solutions = [], sound;

        //STARTUP le ficheiro e sabe quantos screens e as solucoes de cada um etc
        for(var i = 1;i<=nScreens;i++) {
            currScreen = getLessonData(i,nLessons);
            currScreenType = currScreen.firstChild.tagName;
            prompt = currScreen.getElementsByTagName("PROMPT")[0].firstChild.nodeValue;
            original = currScreen.getElementsByTagName("ORIGINAL")[0].firstChild.nodeValue;

            console.log(getNumberOfChildElements(currScreen,"SOLUTION"));
            console.log(currScreen);
            console.log(prompt);
            console.log(original);

            for(var j = 0;j<getNumberOfChildElements(currScreen,"SOLUTION");j++) {
                console.log(i);
                solutions[j] = currLesson.getElementsByTagName("SOLUTION")[j].firstChild.nodeValue;
            }

            sound = currLesson.getElementsByTagName("SOUND")[0].firstChild.nodeValue

            screens[i] = new Screen(prompt, original, solutions, sound); //Usar instance of mais a frente
            //pode dar jeito para saber qe licao estamos
            console.log(currScreenType);
        }

        console.log(solutions);
        console.log(lessons[1]);
    }

    static nextLesson() {

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
        //screen1();
        
        console.log("start()");

        language = new LanguageExtraAlphabets();
        
        //var page = new DynamicHTML(language);
    }
    else {
        alert('ERROR: Not a language file!\nPLEASE, TRY AGAIN!');
        screen0();
    }
}

function onLoad() {
    screen0();
}

