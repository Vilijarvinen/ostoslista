//muuttuja jonka arvo on aluksi 1
//tätä käytetään myöhemmin uniikkien id:eiden luomiseen
var juoksevaid = 1;
//qol koodinpätkä joka mahdollistaa listaan syöttämisen enter näppäintä painamalla
//lisätään tekstinsyöttökenttään näppäimistön seuranta -> keypress...
//ja kun painetaan näppäintä näppäimistöllä kutsutaan funktio...
document.getElementById('teksti').addEventListener("keypress", function (enter){
    //...jolla tarkistetaan onko painettu näppäin Enter
    if (enter.key === 'Enter'){
        //jos painettu näppäin on Enter kutsutaan funktio listaLisaus
        listaLisaus();
    }
});

//testaustyökalu jonka tein huviksi kaverille
var xd = 0;
var sanavarasto = ["Omenoita", "Leipää", "Kalapuikkoja", "Monsteria", "Kaljaa", "Maitoa", "Muroja", "Vessapaperia"];
//kun ikkuna päivitetään koodinpätkä alkaa syöttämään sanavarastoon määritettyjä tuotteita itsestään listaan...
window.onload = async function spam() {
    //...vain jos listassa ei ole mitään valmiiksi...
    if(document.getElementById('lista').firstChild === null){
    var random = Math.floor(Math.random()*sanavarasto.length)
    console.log(random);
    var sana = sanavarasto[random];
    document.getElementById("teksti").value = sana;
    sanavarasto.splice(random, 1);
    await new Promise(resolve => setTimeout(resolve, 600));
    listaLisaus();
    await new Promise(resolve => setTimeout(resolve, 600));
    //...kunnes kaikki tuotteet ovat listassa
    while (xd < sanavarasto.length){
        var random = Math.floor(Math.random()*sanavarasto.length)
        console.log(random);
        var sana = sanavarasto[random];
        document.getElementById("teksti").value = sana;
        sanavarasto.splice(random, 1);
        await new Promise(resolve => setTimeout(resolve, 600));
        listaLisaus();
        await new Promise(resolve => setTimeout(resolve, 600));
    }
    }
}

//ensimmäisessä funktiossa lisätään asioita html listaan
//funktiota kutsutaan kun painetaan lisäysnappia (kts. html -> id listaan)
function listaLisaus(){
    //ensimmäiseksi haetaan muuttujaan kirjoitusalueeseen käyttäjän syöttämä teksti
    var teksti = document.getElementById('teksti').value;
    //tarkistetaan onko kenttä tyhjä
    if (teksti){
        //haetaan lista id:n perusteella muuttujaan
        var lista = document.getElementById('lista');
        //määritellään muuttujat eri elementtien luomiselle
        var rivi = document.createElement('li');
        var plis = document.createElement('p');
        var pnappi = document.createElement('button'); 
        var yv = document.createElement('div'); 
        //luodaan 3 erinimistä muuttujaa jotka ovat aiemmin mainitut uniikit id:t
        var teid = 't' + juoksevaid;
        var liid = 'l' + juoksevaid;
        //lisätään uniikit id:t luodulle li elementille ja p elementille
        rivi.setAttribute('id', liid);
        plis.setAttribute('id', teid);
        //lisätään attribuutteja luoduille elementeille
        yv.setAttribute('class', 'yv');
        pnappi.setAttribute('class', 'pnappi');
        //lisätään klikkauksen seuranta luotuun nappulaan
        //kun nappulaa klikataan käydään läpi poisListasta funktio li elementin uniikin id:n perusteella
        pnappi.addEventListener("click", _ => poisListasta(liid));
        //klikkauksen seuranta diviin yv yliviivausta varten p elementin uniikin id:n perusteella
        //en jaksanut korjata loogiseksi koska se toimii 
        yv.addEventListener("click", _ => yliViivaus(teid));
        //p elementti on vakiona luokassa eiviiva
        plis.setAttribute('class', 'eiviiva');
        //lisätään yv divin sisään käyttäjän syöttämä teksti tekstikentästä
        yv.innerHTML = teksti;
        //kiinnitetään luodut elementit p elementin alle
        plis.appendChild(yv);
        plis.appendChild(pnappi);
        //kiinnitetään p elementti li elementin alle
        rivi.appendChild(plis);
        //kiinnitetään li elementti listaan
        lista.appendChild(rivi);
        //lisätään +1 alussa määriteltyyn muuttujaan jotta uniikki id olisi uniikki
        juoksevaid++;
        //lopuksi tyhjennetään tekstikenttä
        document.getElementById('teksti').value = "";
    }
    //jos kenttä on tyhjä
    else {
        //ponnahdusikkuna
        alert("Kirjoita jotain!");
        //määritellään itse tekstikenttä muuttujaksi
        var reuna = document.getElementById('teksti');
        //tahdistamaton funktio joka vaihtaa 100 millisekunnin välein tekstikentän luokkaa
        async function valkku() {
            //valahdus luokassa css:llä tuodaan punainen reuna
            reuna.setAttribute('class', 'valahdus');
            await new Promise(resolve => setTimeout(resolve, 100));
            //valahduspiilossa luokassa reuna on läpinäkyvä
            reuna.setAttribute('class', 'valahduspiilossa');
            await new Promise(resolve => setTimeout(resolve, 100));
            reuna.setAttribute('class', 'valahdus');
            await new Promise(resolve => setTimeout(resolve, 100));
            reuna.setAttribute('class', 'valahduspiilossa');
            await new Promise(resolve => setTimeout(resolve, 100));
            reuna.setAttribute('class', 'valahdus');
            await new Promise(resolve => setTimeout(resolve, 100));
            reuna.setAttribute('class', 'valahduspiilossa');
            await new Promise(resolve => setTimeout(resolve, 100));
            reuna.setAttribute('class', 'valahdus');
            await new Promise(resolve => setTimeout(resolve, 100));
            reuna.setAttribute('class', 'valahduspiilossa');
        }
        //funktiota halutaan kutsua joka kerta kun käyttäjä painaa lisäysnappia ja tekstikenttä on tyhjä
        valkku();
    }
}

//funktio jolla poistetaan id:n perusteella elementti
function poisListasta(parentId){
    document.getElementById(parentId).remove();
}

//funktiota kutsumalla poistetaan kaikki listassa olevat
function poistaKaikki(){
    //määritellään funktio joka käy läpi annetun muuttujan kaikki lapset läpi ja poistaa ne yksitellen
    function lapsetVittuun(parent){
        while (parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
    }
    //määritellään lista muuttujaan joka toimii ainoastaan tässä funktiossa
    let lista = document.getElementById('lista');
    //kutsutaan lapsetVittuun funktio ja annetaan paremetriksi lista
    lapsetVittuun(lista);
}

//funktio yliviivausta varten kutsutaan id:n perusteella
function yliViivaus(parentId){
    //tarkistetaan onko annetun id:n luokka eiviiva
    if (document.getElementById(parentId).getAttribute('class') === "eiviiva"){
    //jos luokka on eiviiva muutetaan se viivattu
    document.getElementById(parentId).setAttribute('class', 'viivattu');
    }
    else {
    //ja toisinpäin jotta tekstiä uudelleen klikkaamalla yliviivauksen saa pois
    document.getElementById(parentId).setAttribute('class', 'eiviiva')
    //eiviiva luokassa css:ssä tekstin koristelussa ei ole mitään
    //viivattu luokassa css:ssä tekstin koristelu on yliviivauttu
    }
}

function tallennusLocalStorageen() {
    //Luodaan taulukko listan osia varten
    var lapsetTanne = [];
    
    //Määritellään muuttuja li elementille
    var lapset = document.querySelectorAll('li');
    var maarat = document.querySelectorAll('select');
    
    //Loop joka käy kaikki li elementit läpi ja lisää ne taulukkoon
    for (var j = 0; j < lapset.length; j++){
        let lapsi = lapset[j].innerHTML;
        //tapa jolla kirjoitin tämän ei ottanut itse li elementtiä mukaan
        lapsi = "<li>" + lapsi + "</li>";
        lapsetTanne.push(lapsi);
    }

    //Tallennetaan taulukko local storageen stringinä
    localStorage.setItem('tallennus', JSON.stringify(lapsetTanne));
}

function localStoragesta(){
    //Määritellään muuttuja local storagesta haetulle tiedolle
    var tallennetut = localStorage.getItem("tallennus");
    //avataan local storagesta haettu tieto ja listään se muuttujaan
    var takas = JSON.parse(tallennetut);
    //lisätään muuttujassa oleva tieto listaan
    document.getElementById('lista').innerHTML = takas;
    //JSON.parse rikkoo p elementin joka rikkoo toiminnallisuutta
    //poistetaan rikki menneet p elementit
    document.querySelectorAll('p').forEach(pee => {
        pee.remove();
    });
    //lisätään uusi p elementti tyylittelyn/toiminnallisuuden korjaamiseksi
    document.querySelectorAll('li').forEach(peet => {
        let a = document.createElement('p');
        //jouduin lisäämään p elementit ensin ottamalla li elementin sisällä olevat omaan muuttujaan...
        let b = peet.innerHTML;
        //...tyhjentämällä li elementin sisällön...
        peet.innerHTML = "";
        a.setAttribute('class', 'eiviiva');
        //...luomalla p elementin li elementin alle...
        peet.appendChild(a);
        //...ja lopuksi lisäämään li:n muuttujaan tallennetun sisällön p elementin sisälle
        a.innerHTML = b;
        //muut tavat, joita yritin käyttää, lisäsivät <p></p> alkuun ja loppuun
    });
    //palautetaan poisto ominaisuus takaisin tuoduille napeille
    document.querySelectorAll('.pnappi').forEach(pnappi2 => {
        pnappi2.addEventListener("click", () => {
            pnappi2.parentElement.parentElement.remove();
        });
    });
    //yliviivauksen takaisin lisääminen ei ollut ihan yhtä simppeliä
    //ensin määritellään uusi muuttuja joka alkaa 1:stä
    var asd = 1;
    document.querySelectorAll('.yv').forEach(tkst => {
        //uniikki id
        var tkstid = "o" + asd;
        //uniikki id kiinnitetään uuteen p elementtiin
        tkst.parentElement.setAttribute('id', tkstid);
        //uniikin id:n perusteella yliviivaus funktio
        tkst.addEventListener("click", () => yliViivaus(tkstid));
        //uniikista id:stä uniikki
        asd++;
    });
    
    //funktio teksti nodejen poistamiseen annetun noden alta
    function pilkutPois(node){
        //mennään annetun noden lapsia yksitellen läpi
        for (var n = 0; n < node.childNodes.length; n++){
            //läpi käydessä täytyy määritellä missä nodessa mennään tarkistusta varten
            var laps = node.childNodes[n];
            //jos annetun noden lapsi on teksti node...
            if ((laps.nodeType === Node.TEXT_NODE)){
                //...se poistetaan
                node.removeChild(laps);
            }
        }
    }
    //kutsutaan funktio pilkutPois ja annetaan nodeksi lista id:n perusteella
    pilkutPois(document.getElementById("lista"));
}


//Local storagesta haku halutaan joka kerta kun sivu päivittyy
localStoragesta();