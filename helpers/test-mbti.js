const { MessageActionRow, MessageButton } = require("discord.js");


//// //// QUIZ DATA //// ////

const QUESTIONS = [
    ["Penso spesso al futuro.","NI","SI","Penso spesso al passato."],
    ["Quando mi trovo davanti ad un problema, immagino soluzioni originali per risolverlo.","NI","SI","Quando mi trovo davanti ad un problema, mi chiedo come altri prima di me lo abbiano risolto."],
    ["Quando valuto una situazione, raccolgo informazioni su come simili situazioni si sono evolute in passato.","SI","NI","Quando valuto una situazione, immagino come le cose possano evolvere a lungo termine."],
    ["Non mi piacciono le persone che si oppongono al cambiamento. Certe regole sono obsolete. Possono e devono essere migliorate.","NI","SI","Non mi piacciono le persone che vogliono cambiare come funzionano le cose. Dietro ogni regola ci sono motivazioni che possiamo non conoscere."],
    ["Ottengo risultati. Ho più forza di volontà degli altri.","NI","SI","Tengo le mie cose in ordine. Sono più ordinata/o degli altri."],
    ["Faccio cose seguendo le regole raccomandate dalla società.","SI","NI","Invento modi migliori per fare le cose."],
    ["Ho bisogno di prendere decisioni autonomamente. Questo mi porta a volte a scavalcare i limiti e le regole imposte da altri (società, posto di lavoro, …).","NI","SI","Seguo sempre le regole. L’ordine e la struttura fornite dalla società sono essenziali per garantire la libertà di tutti."],
    ["Dobbiamo essere scettici di ciò che è stato fatto o teorizzato prima di noi. Oggi abbiamo nuove informazioni e tecnologie, e possiamo fare meglio.","NI","SI","Dobbiamo fare tesoro della storia, del passato, dell’esperienza. Le grandi menti venute prima di noi ci hanno mostrato la strada."],
    ["Tendo a concentrarmi sul futuro e sulle possibilità.","NE","SE","Tendo a concentrarmi sul presente e sulle cose tangibili."],
  ["Spesso mi trovo a cercare di compiacere chi mi circonda.","SE","NE","Spesso mi trovo a mostrare a chi mi circonda quali possibilità stiano tralasciando."],
  ["Quando guardo/studio qualcosa di nuovo, capisco come si inserisce nel quadro generale delle cose.","NE","SE","Quando guardo/studio qualcosa di nuovo, ne noto tutti i dettagli."],
  ["Sono molto bravə a ricordare i dettagli di ciò che mi circonda.","SE","NE","Sono molto bravə ad immaginare nuove possibilità per ogni situazione."],
  ["In una serata tra amici, mi piace parlare e condividere buone esperienze.","SE","NE","In una serata tra amici, mi piace fare un gioco o qualcosa che sia mentalmente stimolante."],
  ["Faccio spesso nuove esperienze ed attività.","SE","NE","Spesso mi ritrovo a pensare e sviluppare nuove idee."],
  ["Ho un talento per immaginare piani, specialmente se coinvolgono altre persone.","NE","SE","Mi piace fare le cose senza pianificare troppo. Vivo molto “alla giornata”. "],
  ["Mi riesce difficile prendere decisioni. Credo di non sapere cosa voglio.","NE","SE","Mi riesce difficile prendere decisioni. Ho il terrore di tralasciare qualche opzione importante."],
  ["Faccio del mio meglio per prendere decisioni logiche, anche in quei casi dove la mia decisione non è l'opzione socialmente più accettabile.","TI","FI","Faccio del mio meglio per comportarmi correttamente, anche in quei casi dove la mia decisione non è l'opzione più logica."],
  ["La maggior parte degli sbagli viene commessa perché le persone non si fermano a pensare.","TI","FI","Le persone devono essere punite per i loro sbagli."],
  ["Ci tengo a far sì che i principi morali sui quali baso le mie decisioni vengano capiti.","FI","TI","Ci tengo a far sì che la logica sulla quale baso le mie decisioni venga capita."],
  ["Quando una persona si dimostra testarda, mi chiedo quali siano le sue vere intenzioni.","FI","TI","Quando una persona si dimostra testarda, mi chiedo se sia abbastanza intelligente."],
  ["Vorrei che le altre persone ragionassero in maniera più logica.","TI","FI","Vorrei che le altre persone avessero una migliore percezione di cosa sia giusto o sbagliato."],
  ["Quando prendo una decisione, cerco di essere totalmente logicə.","TI","FI","Quando prendo una decisione, cerco di essere totalmente onestə."],
  ["Nessuno dovrebbe mai cambiare i propri principi morali solo perché la società lo richiede.","FI","TI","Nessuno dovrebbe mai cambiare la propria logica solo perché gli altri la pensano diversamente."],
  ["Amo dedicare il mio tempo a studiare a fondo una ipotesi, in modo da raggiungere la certezza che sia vera o falsa.","TI","FI","Amo intrattenere pensieri su concetti di tipo filosofico o che vertono su preferenze che potrebbero essere ritenute soggettive."],
  ["Sono efficiente in quello che faccio.", "TE","FE", "Passo molto tempo con altre persone."],
  ["Investo buona parte del mio tempo a cercare di far stare meglio gli altri.","FE","TE","Investo buona parte del mio tempo a cercare di migliorare il modo in cui funzionano le cose."],
  ["Cambio il mio umore facilmente, secondo l'umore delle persone che mi circondano.","FE","TE","Cambio idea facilmente se mi si presentano fatti concreti che dimostrano che mi sto sbagliando."],
  ["Passo parte del mio tempo a creare modelli, processi, procedure.","TE","FE","Passo parte del mio tempo ad aiutare la gente."],
  ["Sono molto orgogliosə della mia produttività.","TE","FE","Sono molto orgogliosə della mia disponibilità verso gli altri."],
  ["Al lavoro, mi è capitato di far tardi per finire un foglio di calcolo (presentazione, documento, …).","TE","FE","Al lavoro, mi è capitato di far tardi per aiutare un collega."],
  ["Il mondo è un luogo pieno di cose da scoprire, studiare, comprendere.","TE","FE","Il mondo è un luogo pieno di persone che meritano aiuto e compassione."],
  ["Credo di non avere un'intelligenza veramente “brillante”.","FE","TE","Ho difficoltà a “sentire” le mie emozioni e ad entrare in contatto emotivo con gli altri."],
  ["Rendo il massimo quando lavoro da solə.", "II", "EE", "Rendo il massimo quando lavoro con altre persone."],
  ["Quando faccio qualcosa di impegnativo, in genere riesco a mantenere a concentrazione per lunghi periodi di tempo.", "II", "EE", "Quando faccio qualcosa di impegnativo, in genere vengo distrattə facilmente."],
  ["Quando mi si presenta un problema improvviso, cerco la soluzione nella mia mente o nel mio cuore.", "II", "EE", "Quando mi si presenta un problema improvviso, cerco la soluzione consultando le persone che mi circondano o l’ambiente circostante."],
  ["Credo nell’amore e nel rispetto reciproco.","SN","TX","Credo nell’individualismo e pretendo di essere rispettatə."],
  ["Non mi spavento facilmente di fronte a sangue o situazioni raccapriccianti.", "TX", "SN", "Sono molto sensibile al sangue o a situazioni raccapriccianti."],
  ["Gli altri non contano per me.", "TX", "SN", "Mi definisco altruista."],
  ["Parlo spesso delle altre persone, anche alle loro spalle.", "TX", "SN", "Sono leale e mantengo i segreti."],
  ["Prendo parte attivamente ad atti di sopruso e bullismo.", "TX", "SN", "Mi preoccupo molto per la sicurezza altrui, e faccio di tutto per evitare che si offendano."],
  ["Sono una persona insensibile. Non provo emozioni.", "TX", "SN", "Provo una gran varietà di emozioni, e sono altamente sensibile."],
  ["Cerco spesso l’attenzione degli altri per soddisfare i miei bisogni.", "TX", "SN", "So prendermi cura di me e della mia persona."],
  ["Mi piace creare caos e disordine, anche in maniera immotivata.", "TX", "SN", "Tengo al rispetto delle cose e delle persone."]
];

const AXES = [
  ["SI", "NI"],
  ["SE", "NE"],
  ["FI", "TI"],
  ["FE", "TE"],
  ["II", "EE"],
  ["SN", "TX"]
];

const PROFILES = [
  ["INTJ", "3NI", "2TE", "1FI", "!II"],
  ["INTP", "3TI", "2NE", "1SI", "!II"],
  ["INFJ", "3NI", "2FE", "1TI", "!II"],
  ["INFP", "3FI", "2NE", "1SI", "!II"],
  ["ISTJ", "3SI", "2TE", "1FI", "!II"],
  ["ISFJ", "3SI", "2FE", "1TI", "!II"],
  ["ISTP", "3TI", "2SE", "1NI", "!II"],
  ["ISFP", "3FI", "2SE", "1NI", "!II"],
  ["ENTJ", "3TE", "2NI", "1SE", "!EE"],
  ["ENTP", "3NE", "2TI", "1FE", "!EE"],
  ["ENFJ", "3FE", "2NI", "1SE", "!EE"],
  ["ENFP", "3NE", "2FI", "1TE", "!EE"],
  ["ESTJ", "3TE", "2SI", "1NE", "!EE"],
  ["ESFJ", "3FE", "2SI", "1NE", "!EE"],
  ["ESTP", "3SE", "2TI", "1FE", "!EE"],
  ["ESFP", "3SE", "2FI", "1TE", "!EE"]
];

//// //// end QUIZ DATA //// ////

//// //// QUIZ CLASSES //// ////

const customIdsToScores = {
  "one": -2,
  "two": -1,
  "three": 0,
  "four": 1,
  "five": 2
};

class ProfileTest {
  /**
   * Create an axes-based test, with a scale of 5 options for each question.
   * 
   * @param questions An array of arrays, with questions on the edges
   *     (i[0] and i[3]) and axes on the center.
   * @param axes An array of arrays, representing axes.
   * @param profiles An array of functions, each computing the score
   *     for each profile, returning the name of the profile and the score.
   * @param profileTexts An object with the profile names as keys,
   *     and an accurate description as value.
   *     May contain an optional "copyright" field.
   */
  constructor(questions, axes, profiles, profileTexts) {
    this.questions = questions;
    this.axes = axes;
    this.profiles = profiles;
    this.profileTexts = profileTexts;
  }

  /**
   * Activate the test in a determinate container.
   *
   * @param interaction The interaction object.
   */
  enable(interaction) {
    // code for handling interaction goes here
    // TODO

    this.curValue = 0;
  }

  /**
   * Returns the value of the selected checkbox.
   */
  getValue() {
    return this.curValue;
  }

  /**
   * Sets the value.
   *
   * @param v The new value.
   */
  setValue(v) {
    this.curValue = v;
  }

  /**
   * Compute the count of questions that modify a certain ax.
   * 
   * @param ax The ax name
   * @returns The count of questions on the provided ax.
   */
  questionsPerAx(ax) {
    return this.questions.filter(y => y.indexOf(ax) >= 0).length;
  }

  /**
   * Shuffle the questions array.
   */
  shuffleQuestions(){
    let a = this.questions;
    for (let i = a.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = a[j];
      if (tmp instanceof Array && Math.random() > 0.5){
	tmp = tmp.reverse();
      }
      a[j] = a[i];
      a[i] = tmp;
    }
    this.questions = a;
  }
  
  /**
   * Initializes the test for the use.
   * @param shuffle Whether to shuffle the questions or not. Defaults to true.
   */
  start(interaction, shuffle) {
    this.cursor = null;
    this.answers = [];
    this.anonymous = false;

    if (shuffle || shuffle == null) {
      this.shuffleQuestions();
    }
    
    return interaction.editReply({
      content: `**Disclaimer:**
Questo test non sostituisce una valutazione professionale.
Inoltre, dietro il consenso dell’utente, i dati verranno memorizzati in un database e trattati a scopi non commerciali.
L’opzione centrale (:three:) __va usata__ in caso di dubbio.
Continuare?`,
      components: [
	new MessageActionRow()
	  .addComponents(
	    new MessageButton()
	      .setCustomId('continue')
	      .setLabel('Continua')
	      .setStyle('PRIMARY')
	  )
	  .addComponents(
	    new MessageButton()
	      .setCustomId('notrack')
	      .setLabel('Fai un test anonimo')
	      .setStyle('SECONDARY')
	  )
      ]
    });
  }

  /**
   * Forwards to the next questions.
   *
   * @param pos The new value of the cursor.
   *     If not given, cursor is incremented.
   */
  async forward(interaction) {
    if (this.cursor === null) {
      this.cursor = 0;
    } else {
      
      let value = this.getValue();
      if (value != null){
	this.answers[this.cursor] = value;
      }
      
      if (this.answers[this.cursor] != null) {
	this.setValue(this.answers[this.cursor]);
      }
    }

    let q = this.questions[this.cursor];
    if (q == null) {
      return interaction.reply('Errore! Domanda non trovata.');
    }

    this.cursor += 1;

    if (this.cursor > this.questions.length){
      this.finish(interaction);
    }

    await interaction.deferReply();
    
    return interaction.editReply({
      content: `Domanda ${this.cursor}/${this.questions.length}
:one: ${q[0]}
:two: 
:three: 
:four: 
:five: ${q[3]}`,
      components: [
	new MessageActionRow()
	  .addComponents(
	    new MessageButton()
	      .setCustomId('one')
	      .setLabel('1')
	      .setStyle('PRIMARY')
	  )
	  .addComponents(
	    new MessageButton()
	      .setCustomId('two')
	      .setLabel('2')
	      .setStyle('PRIMARY')
	  )
	  .addComponents(
	    new MessageButton()
	      .setCustomId('three')
	      .setLabel('3')
	      .setStyle('PRIMARY')
	  )
	  .addComponents(
	    new MessageButton()
	      .setCustomId('four')
	      .setLabel('4')
	      .setStyle('PRIMARY')
	  )
	  .addComponents(
	    new MessageButton()
	      .setCustomId('five')
	      .setLabel('5')
	      .setStyle('PRIMARY')
	  )
      ]
    });
  }

  /**
   * Finish the test and display the results.
   */
  finish(interaction) {
    let score = this.score();
    let flashResults = this.interpret(score);
    let result = flashResults[0][0];
    let self = this;
    let responseParts = [];

    responseParts.push('Sei: **${result}**');
    
    for (let ax of this.axes) {
      let perc1 = Math.round(score[ax[0]] * 25 / this.questionsPerAx(ax[0]) + 50),
	  perc2 = Math.round(score[ax[1]] * 25 / this.questionsPerAx(ax[1]) + 50);
      let percBar = '';
      for (let x = 0; x < 20; x++) {
	percBar += x * 5 < perc1 ? '█': ' ';
      }
      responseParts.push(`${ax[0]} ${perc1}% |${percBar}| ${perc2}% ${ax[1]}`);
    }
        
    return interaction.reply({
      content: responseParts.join('\n')
    });
  }

  /**
   * Computes the score by axes.
   *
   * @return An object which keys are the axes and values are the scores.
   */
  score() {
    let axes = {};
    for (let a in this.answers) {
      let q = this.questions[a];
      if (q == null) continue;
      
      axes[q[1]] = (axes[q[1]] || 0) - this.answers[a];
      axes[q[2]] = (axes[q[2]] || 0) + this.answers[a];
    }

    return axes;
  }

  /**
   * Interpret the results of the test, by selecting the highest scoring
   * profiles.
   *
   * @param score Axes in key-value pairs.
   * @returns 
   */
  interpret(score) {
    let wannabe = [];

    for (let p of this.profiles) {
      wannabe.push(p(score));
    }

    wannabe.sort(function(a,b) {
        return b[1] - a[1];
    });

    return wannabe.slice(0, 3);
  }
  
} /* class ProfileTest */

//// //// end QUIZ CLASSES //// ////

function makeQuiz(){
  return new ProfileTest(QUESTIONS, AXES, PROFILES, null);
}

module.exports = {
  makeQuiz
};
