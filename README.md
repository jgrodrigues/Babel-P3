# 3º Projeto Pratico

Delivery Date: May 25, 2018 10:00 PM → Jun 02, 2018 10:00 PM
Tags: Prática,LAP

## Datas importantes

- 24/abr (24:00) - Divulgação deste enunciado
- 02/jun (22:00) - Data limite de entrega sem penalização.
- 04/jun (24:00) - Data e hora limite de entrega com atraso. Um valor de penalização por cada dia de atraso.

---

## Changelog

- 29/abr: O ficheiro japanese.xml ainda tinha problemas nas traduções dos símbolos Kanji, na parte final. Já foi corrigido.
- 27/abr: Os ficheiros portuguese.xml e japanese.xml foram corrigidos. Havia algumas ocorrências de "id" que passaram a "ID". Na versão final de ambos os ficheiros, todas as tags, incluindo a tag "ID", aparecem em maiúsculas.
- 27/abr: Pequenos detalhes deste enunciado foram melhorados, por exemplo acrescentando uma indicação do número máximo de elementos em cada tipo de ecrã.
- 27/abr: Foram divulgados ficheiros portuguese.xml e japanese.xml mais completos.
- 24/abr: Possíveis correções ou melhorias deste enunciado serão assinaladas aqui.

---

# Babel - Todos os idiomas do mundo!

Este projeto consiste no desenvolvimento em JavaScript dum programa de apoio à aprendizagem de línguas usando tecnologias da Web do lado do cliente. Para simplificar, assumimos que o utilizador fala inglês e está interessado em aprender outros idiomas.

O programa deve ser geral, i.e. independente de linguagens particulares. Os dados referentes a cada idioma são extraídos de ficheiros de dados em formato XML com estrutura uniforme para todas as linguagens. Neste projeto são fornecidos ficheiros de dados para dois idiomas: [português](http://ctp.di.fct.unl.pt/miei/lap/projs/proj2018-3/files/portuguese.xml) e [japonês](http://ctp.di.fct.unl.pt/miei/lap/projs/proj2018-3/files/japanese.xml) (a primeira versão deste ficheiros está demasiado incompleta, mas isso será melhorado).

O programa precisa de gerar páginas HTML dinamicamente. Felizmente isso adiciona pouca dificuldade suplementar comparando com o desenvolvimento de páginas HTML à mão. As tecnologias Web a usar são as seguintes: criação dinâmica de páginas HTML usando comandos do género **document.createElement("BUTTON")**; processamento de ficheiros XML usando comandos como **xmlDoc.getElementsByTagName("person")**; tratamento assíncrono de eventos, como é típico nas interfaces gráficas interativas (instalação dinâmica de tratadores de eventos: **object.onclick = new Function(myScript)**).

Também será importante organizar bem o programa usando uma hierarquia de classes. No projeto deste ano, a hierarquia pretendida é particularmente simples, envolvendo apenas duas classes: (1) uma classe chamada **Language** que implementa a maioria das funcionalidades pretendidas e onde se assume o uso do habitual alfabeto latino; (2) uma subclasse chamada **LanguageExtraAlphabets** orientada para linguagens com outros alfabetos e que adiciona apoio à aprendizagem desses alfabetos. Por exemplo, o **português** será considerado um valor de tipo **Language** por usar o alfabeto latino, e o **japonês** será considerado um valor de tipo **LanguageExtraAlphabets** por usar outros alfabetos (concretamente os silabários Hiragana e Katakana, mais o sistema logográfico Kanji).

Pedimos-lhe que o comportamento do programa seja fiel ao que se descreve neste enunciado, pois essa é a única forma de se fazer uma avaliação correta dos projetos. O seu programa até poderá estar incompleto e não implementar todas as funcionalidades. Mas aquilo que implementar, deve ser fiel ao enunciado. Nos detalhes não especificados você tem liberdade de decisão - preocupe-se em fazer um programa adaptado aos objetivos, intuitivo e fácil de usar.

Como ponto de partida do seu trabalho, use estes dois ficheiros: [Babel.html](http://ctp.di.fct.unl.pt/miei/lap/projs/proj2018-3/files/Babel.html) e [Babel.js](http://ctp.di.fct.unl.pt/miei/lap/projs/proj2018-3/files/Babel.js). O ficheiro "Babel.html" não pode ser alterado. No final, só o ficheiro "Babel.js" será submetido no Mooshak. Descarrege os ficheiros usando "Save link as..."; não faça copy&paste.

Este projeto será testado no browser Chromium instalado no Linux dos nossos laboratórios. A implementação de JavaScript que corre nesse browser é o NodeJS. Se preferir desenvolver no Firefox, provavelmente não terá problema, especialmente se no final tiver o cuidado de ir testar no Chromium dum laboratório - mas isso fica à sua responsabilidade.

Use este site para tirar dúvidas sobre o processamento de HTML DOM e XML DOM em Javascript: [w3schools.com](https://www.w3schools.com/js/js_htmldom_document.asp).

---

# Funcionalidades

Na classe **Language**, o programa deve suportar vários tipos de ecrãs que serão descritos mais adiante: KEYBOARD, PAIRS e BLOCKS. Também deve uma noção de **lição**, sendo que cada lição é sequência de ecrãs. O ficheiro XML de cada linguagem contém a definição de várias lições.

Na classe **LanguageExtraAlphabets**, o programa deve suportar um tipo de ecrã adicional que designaremos de SYMBOLS.

## Ecrãs de tipo KEYBOARD

Este tipo de ecrã apresenta uma palavra ou uma frase escrita no novo idioma e pede ao utilizador que introduza, usando o teclado, uma frase equivalente em inglês. Para o programa poder validar a resposta, existem no ficheiro HTML as traduções mais habituais da mesma frase.

Se estiver disponível um ficheiro áudio correspondente à palavra, o utilizador tem a possibilidade de escutar o ficheiro as vezes que quiser, até para poder ir aperfeiçoando a parte verbal da linguagem.

Eis um exemplo possível de apresentação deste tipo de ecrã. Experimente e repare que o utilizador pode terminar a introdução da resposta clicando no botão "Check" ou carregando na tecla "Enter". Neste exemplo, a tradução correta pretendida é "What time is it?".

<div style="border:3px solid black; display:table; padding:20px; margin-left:40px">
  <h1>Write this in English</h1>

  <p style="padding-left:40px; word-spacing:50px">
    <img src="http://icons.iconarchive.com/icons/icons8/ios7/32/Media-Controls-High-Volume-icon.png" onclick="play('japanese/sentences/何時ですか.mp3');">
    <span style="font-size:32px">何時ですか</span>
  </p>

  <p style="padding-left:20px">
    <input type="text" id="answer" value="" placeholder="Type this in English" onkeydown="if(event.keyCode == 13) document.getElementById('check').click();" size="40" style="font-size:24px">
    <input type="button" id="check" value="Check" style="background-color: lime" onclick="validate(document.getElementById('answer').value, 'What time is it?');">
  </p>
</div>

Este exemplo é oferecido aos alunos como forma de os introduzir a algumas técnicas que é preciso usar no projeto. Para começar, está aqui uma versão estática deste exemplo: [BabelStatic.html](http://ctp.di.fct.unl.pt/miei/lap/projs/proj2018-3/files/BabelStatic.html). Faça "View page source" e estude o código HTML com atenção. Seguidamente, analize uma versão gerada dinamicamente do mesmo exemplo: [Babel.html](http://ctp.di.fct.unl.pt/miei/lap/projs/proj2018-3/files/Babel.html). Este ficheiro HTML está quase vazio pois a página é gerada dinamicamente usando o código do ficheiro [Babel.js](http://ctp.di.fct.unl.pt/miei/lap/projs/proj2018-3/files/Babel.js). A geração da página é lançada a partir do atributo ONLOAD do BODY da página. Quando uma página HTML é carregada, é sempre lançado um evento ONLOAD que geralmente é ignorado, mas neste caso pretendemos apanhar.

A versão dinâmica obriga o utilizador a selecionar um ficheiro XML com uma linguagem existente no disco local da sua máquina. Para testar, pode descarregar este ficheiro [japanese.xml](http://ctp.di.fct.unl.pt/miei/lap/projs/proj2018-3/files/japanese.xml) (usando "Save link as..."; não faça copy&paste). Esta forma estranha de acesso ao ficheiro XML tem a ver com as restrições de segurança associadas à tecnologias da Web. O ideal seria colocar o ficheiro num servidor externo para toda a gente aceder ao mesmo ficheiro diretamente a partir do programa em JavaScript. Mas isso violaria a chamada "Same-origin policy", de que se falou no final da teórica 21.

Você deve estudar e relacionar a implementação estática com a implementação dinâmica deste exemplo. O seu objetivo, neste projeto, será fazer implementações dinâmicas de todas as páginas.

Para implementar ecrãs de tipo KEYBOARD, já falta pouco. A versão dinâmica deste exemplo está próxima do pretendido. O que falta é adaptar a implementação para usar informação retirada do ficheiro XML. O exemplo não faz isso e baseia-se numa frase fixa.

## Ecrãs de tipo PAIRS

São apresentadas algumas palavras e símbolos. O utilizador deve clicar nesses elementos aos pares para estabelecer correspondências. Clica num elemento e depois noutro elemento. Sempre os dois são equivalentes, eles ficam cinzentos e inativos. O utilizador termina com sucesso quando consegue fazer corresponder todos os pares.

O número máximo de elementos deste tipo de ecrã é 12 e espera-se que caibam todos numa única linha.

![](http://ctp.di.fct.unl.pt/miei/lap/projs/proj2018-3/files/resources/images/match.jpg)

## Ecrãs de tipo BLOCKS

Aqui o objetivo é traduzir de inglês para a nova língua, o que é mais difícil do que fazer a tradução inversa, da nova língua para inglês, como nos ecrãs KEYBOARD. Além disso, pode acontecer que exista a dificuldade adicional da nova língua usar símbolos não latinos e o utilizador não ter o teclado configurado para a nova língua.

O ecrã apresenta um conjunto de blocos contendo diversos elementos que podem ser arrastados pela ordem correta para se compor a tradução pretendida. Alguns dos blocos não fazem parte da resposta e só lá estão para complicar. Eis um ecrã BLOCKS no estado inicial:

![](http://ctp.di.fct.unl.pt/miei/lap/projs/proj2018-3/files/resources/images/blocks.jpg)

Eis o mesmo ecrã no estado final, já com a tradução corretamente efetuada. Neste caso, sobraram quatro blocos, que não faziam parte da solução.

![](http://ctp.di.fct.unl.pt/miei/lap/projs/proj2018-3/files/resources/images/blocks_solution.jpg)

O número máximo de blocos deste tipo de ecrã é 20 e espera-se que caibam todos duas linhas. Espera-se que a solução caiba numa única linha.

Como implementar drag & drop em JavaScript? Procure na Web "javascript drag and drop".

Se tiver dificuldades ou falta de tempo, existe um possível plano B, mais fácil de implementar, que é preferível a não fazer nada. Basta que a resposta seja introduzida numa caixa de texto normal (como nos ecrãs KEYBOARD) e que o utilizador faça copy & paste dos pedaços de texto dos blocos para a caixa de resposta.

## Lição

Uma lição é normalmente constituída por uma sequência de até ao máximo de 12 ecrãs que o utilizador deve percorrer até a lição ser dada por concluída. Convém que exista informação na página que permita ao utilizador saber em que posição está dentor da linha temporal da lição.

Agora uma regra importante que deve ser seguida. Ao longo duma lição, é normal o utilizador acertar nuns ecrãs e falhar noutros. Quando a sequência de ecrãs chega ao fim, a lição pode ainda não ter terminado. Agora os ecrãs falhados são revisitados, pela mesma ordem. E se ainda restarem ecrãs falhados, o processo continua até finalmente o utilizador acertar em todos os ecrãs. De notar que se mostra sempre a resposta correta quando o utilizador falha. Assim o utilizador aprende. Quando o mesmo ecrã aparece pela segunda ou terceira vez, normalmente o utilizador já aprendeu a resposta correta.

## Página principal

A página principal apresentam vários botões, um por cada lição disponível, e o utilizador pode escolher qual a próxima lição que deseja seguir.

## Ecrãs de tipo SYMBOLS

Para ensinar alfabetos especiais, o ideal seria implementar algo próximo [desta solução](http://www.csus.edu/indiv/s/sheaa/projects/genki/hiragana-timer.html). Mas há soluções menos ambiciosas, sendo que a mais básica de todas é reaproveitar e adaptar os ecrãs de tipo PAIRS.

Pode assumir que, neste ecrãs, o número máximo de símbolos é 60.

Espera-se que o utilizador gaste muito tempo neste tipo de ecrã. Aprender bem um novo alfabeto é um processo demorado que envolve muitas repetições. Se tiver tempo e ideias, pode acrescentar pormenores que tornem este tipo de ecrãs mais apelatívos e úteis.

---

# Estilo orientado pelos objetos

O programa deve ser escrito no ficheiro "Babel.js", obrigatoriamente usando o estilo orientado pelos objetos, usando as classes do JavaScript.

O ponto de partida oferecido para o ficheiro "Babel.js" contém algumas variáveis globais, numerosas funções globais e nenhuma classe definida. Isso foi deliberado. Espera-se que você reorganize fortemente a solução e no final apresente um programa orientado pelos objetos exemplar, onde praticamente todo o código esteja colocado dentro de classes e essas classes reflitam de forma natural as entidades do problema. Se não estiver a ver bem onde colocar as funções globais que criam dinamicamente elementos HTML, uma boa possibilidade será arrumá-las numa classe só com métodos estáticos (faz lembrar a classe Math do Java, que também só tem métodos estáticos).

---

---

# Regras principais

- Você tem de produzir um ficheiro chamado "Babel.js". Nas regras de submissão será explicada a forma de o submeter no Mooshak.
- O ficheiro "Babel.js" tem de incluir logo nas primeiras linhas, um comentário inicial contendo: **o nome e número dos dois alunos que realizaram o projeto**; indicação de quais as partes do trabalho que foram feitas e das que não foram feitas (para facilitar uma correção sem enganos); ainda possivelmente alertando para alguns aspetos da implementação que possam ser menos óbvios para o avaliador.
- O projeto é para ser realizado por grupos de dois alunos. Um projeto entregue por três ou mais alunos vale zero valores. Poderão ser permitidos grupos de 1 aluno, mas terá de haver uma razão de força maior e pedir autorização com alguma antecedência a AMD.
- **A versão final do seu programa deverá correr no browser Chromium que está instalados no sistema Linux dos laboratórios**. Faça essa verificação, pois é nesse contexto que a correção do projeto será efetuada.
- O programa deve ser bem indentado, por forma a ficar bem legível. A largura do programa não deve exceder as 80 colunas para poderem ser impressos. Podem haver algumas exceções, muito pontuais.
- O não cumprimento das regras anteriores implica penalizações automáticas na nota.

---

# Regras de entrega

- Será ativado um concurso do Mooshak, que servirá para submeter os trabalhos. Os detalhes da forma de fazer a submissão serão divulgados nessa altura. Até lá preocupe-se apenas em escrever um bom programa.

---

# Outras regras

- Apesar de o projeto ser de grupo, cada aluno, a título individual, tem a responsabilidade de responder por todo o projeto. Assim é indispensável que os dois membros de cada grupo programem efetivamente.
- Não se proíbe que alunos de turnos práticos diferentes façam grupo. Isso é apenas desaconselhado.
- Não terá lugar qualquer pré-inscrição dos grupos. Basta que nos trabalhos submetidos figurem nomes de alunos inscritos na cadeira.
- A nota máxima do projeto é 20 valores.

---

# Avaliação

Os docentes responsáveis pela gestão e pela avaliação deste trabalho é Artur Miguel Dias.

A maior parte da nota será determinada de forma muito objetiva, testando o programa à mão e confirmando quais as funcionalidades implementadas.

Na parte mais subjetiva da apreciação da qualidade dos trabalhos serão tidos em conta aspetos, tais como:

- clareza e simplicidade das ideias programadas,
- qualidade do sistema de classes para modelar o jogo e se obter extensibilidade,
- qualidade da página Web criada.

Situação especial - O programa não está escrito num estilo orientado pelos objetos, ou seja parte substancial do comportamento das linguagens está programada em funções globais exteriores às classes. A nota máxima que é possível obter é 12 valores.

---

# Observações

- Os grupos são incentivados a discutir entre si os aspetos gerais da realização do projeto (inclusivamente no fórum). Mas sempre que chega o momento de escrever código concreto, esse tem de ser um esforço interno a cada grupo. A escrita de código exige esforço intelectual, mas só com esforço se consegue evoluir.
- O objetivo deste projeto é levar os alunos a praticar. Um aluno que pratique de forma genuína ganha experiência e provavelmente não terá dificuldade em conseguir aprovação no exame final.
- Cuidado com as fraudes: Cada grupo é responsável pelo seu projeto e não pode deixar que o seu código seja lido por outro grupo. Quem dá acesso ao seu próprio código é o principal responsável da fraude e fica logo excluído da cadeira; mas o grupo que copia também é excluído da cadeira. Note que nem sempre as fraudes são causadas intencionalmente: por exemplo, basta o desleixo de deixar uma solução esquecida numa máquina pública, ter o descuido de publicar código num fórum público da Internet, ou outras situações do género. Note que é muito melhor ter zero valores num dos três projetos, do que ser logo excluído da cadeira por motivo de fraude.

---

# Final

Bom trabalho! Esperamos que goste.
