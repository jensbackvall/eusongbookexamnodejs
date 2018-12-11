let script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.3.1.js';
script.type = 'text/javascript';

script.onreadystatechange = handler;
script.onload = handler;

var head = document.getElementsByTagName('head')[0];
head.appendChild(script);


const list = "<div class='countries-menu'><a href='#austria'>Austria</a><a href='#belgium'>Belgium</a><a href='#bulgaria'>Bulgaria</a><a href='#croatia'>Croatia</a><a href='#cyprus'>Cyprus</a><a href='#czech-republique'>Czech Republique</a><a href='#denmark'>Denmark</a><a href='#estonia'>Estonia</a><a href='#finland'>Finland</a><a href='#france'>France</a><a href='#germany'>Germany</a><a href='#greece'>Greece</a><a href='#hungary'>Hungary</a><a href='#ireland'>Ireland</a><a href='#italy'>Italy</a><a href='#latvia'>Latvia</a><a href='#lithuania'>Lithuania</a><a href='#luxembourg'>Luxembourg</a><a href='#malta'>Malta</a><a href='#netherlands'>Netherlands</a><a href='#poland'>Poland</a><a href='#portugal'>Portugal</a><a href='#romania'>Romania</a><a href='#slovakia'>Slovakia</a><a href='#slovenia'>Slovenia</a><a href='#spain'>Spain</a><a href='#sweden'>Sweden</a><a href='#united-kingdom'>United Kingdom</a></div><div class='press-releases'><ul id='countries'><li id='austria'><ul><li></li></ul></li><li id='belgium'><ul><li></li></ul></li><li id='bulgaria'><ul><li></li></ul></li><li id='croatia'><ul><li></li>               </ul></li><li id='cyprus'><ul><li></li></ul></li><li id='czech-republique'><ul><li></li></ul></li><li id='denmark'><ul><li></li></ul></li><li id='estonia'><ul><li></li></ul></li><li id='finland'><ul><li></li></ul></li><li id='france'><ul><li></li></ul></li><li id='germany'><ul><li></li></ul></li><li id='greece'><ul><li></li></ul></li><li id='hungary'><ul><li></li></ul></li><li id='ireland'><ul><li></li></ul></li><li id='italy'><ul><li></li></ul></li><li id='latvia'><ul><li></li></ul></li><li id='lithuania'><ul><li></li></ul></li><li id='luxembourg'><ul><li></li></ul></li><li id='malta'><ul><li></li></ul></li><li id='netherlands'><ul><li></li></ul></li><li id='poland'><ul><li></li></ul></li><li id='romania'><ul><li></li></ul></li><li id='slovakia'><ul><li></li></ul></li><li id='slovenia'><ul><li></li></ul></li><li id='spain'><ul><li></li></ul></li><li id='sweden'><ul><li></li></ul></li><li id='united-kingdom'><ul><li></li></ul></li></ul></div>"

function handler(){
    $('#header').load('../components/header.html');

    var pageName = getCurrentFileName();
    console.log(pageName);
    if (pageName === 'nominations_per_country.html' || pageName === 'press_releases.html' || pageName === 'media_coverage.html') {
        $('.content-body').append(list);
    }
}

function getCurrentFileName(){
    var pagePathName= window.location.pathname;
    return pagePathName.substring(pagePathName.lastIndexOf('/') + 1);
}
