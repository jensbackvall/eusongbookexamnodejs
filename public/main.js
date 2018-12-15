let script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.3.1.js';
script.type = 'text/javascript';

script.onreadystatechange = handler;
script.onload = handler;

var head = document.getElementsByTagName('head')[0];
head.appendChild(script);


const countries = `<br><div class='countries-menu'> <a href='#austria'><img src="../images/blank.gif" class="flag flag-at"/>Austria</a> <a href='#belgium'><img src="../images/blank.gif" class="flag flag-be"/>Belgium</a> <a href='#bulgaria'><img src="../images/blank.gif" class="flag flag-bg"/>Bulgaria</a> <a href='#croatia'><img src="../images/blank.gif" class="flag flag-hr"/>Croatia</a> <a href='#cyprus'><img src="../images/blank.gif" class="flag flag-cy"/>Cyprus</a> <a href='#czech-republique'><img src="../images/blank.gif" class="flag flag-cz"/>Czech Republique</a> <a href='#denmark'><img src="../images/blank.gif" class="flag flag-dk"/>Denmark</a> <a href='#estonia'><img src="../images/blank.gif" class="flag flag-ee"/>Estonia</a> <a href='#finland'><img src="../images/blank.gif" class="flag flag-fi"/>Finland</a> <a href='#france'><img src="../images/blank.gif" class="flag flag-fr"/>France</a> <a href='#germany'><img src="../images/blank.gif" class="flag flag-de"/>Germany</a> <a href='#greece'><img src="../images/blank.gif" class="flag flag-gr"/>Greece</a> <a href='#hungary'><img src="../images/blank.gif" class="flag flag-hu"/>Hungary</a> <a href='#ireland'><img src="../images/blank.gif" class="flag flag-ie"/>Ireland</a> <a href='#italy'><img src="../images/blank.gif" class="flag flag-it"/>Italy</a> <a href='#latvia'><img src="../images/blank.gif" class="flag flag-lv"/>Latvia</a> <a href='#lithuania'><img src="../images/blank.gif" class="flag flag-lt"/>Lithuania</a> <a href='#luxembourg'><img src="../images/blank.gif" class="flag flag-lu"/>Luxembourg</a> <a href='#malta'><img src="../images/blank.gif" class="flag flag-mt"/>Malta</a> <a href='#netherlands'><img src="../images/blank.gif" class="flag flag-nl"/>Netherlands</a> <a href='#poland'><img src="../images/blank.gif" class="flag flag-pl"/>Poland</a> <a href='#portugal'><img src="../images/blank.gif" class="flag flag-pt"/>Portugal</a> <a href='#romania'><img src="../images/blank.gif" class="flag flag-ru"/>Romania</a> <a href='#slovakia'><img src="../images/blank.gif" class="flag flag-sk"/>Slovakia</a> <a href='#slovenia'><img src="../images/blank.gif" class="flag flag-si"/>Slovenia</a> <a href='#spain'><img src="../images/blank.gif" class="flag flag-es"/>Spain</a> <a href='#sweden'><img src="../images/blank.gif" class="flag flag-se"/>Sweden</a> <a href='#united-kingdom'><img src="../images/blank.gif" class="flag flag-gb"/>United Kingdom</a> </div> <div class='press-releases'> <ul id='austria'> </ul> <ul id='belgium'> </ul> <ul id='bulgaria'> </ul> <ul id='croatia'> </ul> <ul id='cyprus'> </ul> <ul id='czech-republique'> </ul> <ul id='denmark'> </ul> <ul id='estonia'> </ul> <ul id='finland'> </ul> <ul id='france'> </ul> <ul id='germany'> </ul> <ul id='greece'> </ul> <ul id='hungary'> </ul> <ul id='ireland'> </ul> <ul id='italy'> </ul> <ul id='latvia'> </ul> <ul id='lithuania'> </ul> <ul id='luxembourg'> </ul> <ul id='malta'> </ul> <ul  id='netherlands'> </ul> <ul id='poland'> </ul> <ul id='portugal'> </ul> <ul id='romania'> </ul> <ul id='slovakia'> </ul> <ul id='slovenia'> </ul> <ul id='spain'> </ul> <ul id='sweden'> </ul> <ul id='united-kingdom'> </ul> </div>`;



function handler(){
    $('#header').load('../components/header.html');
    const pagePathName = window.location.pathname;
    if (pagePathName === '/nominations_per_country/' || pagePathName === '/press_releases/' || pagePathName === '/media_coverage/') {
        $('.content-body').append(countries);
    }
    
    const scriptString = ".." + pagePathName + pagePathName.substring(1, pagePathName.length - 1) + ".js";
    if (pagePathName !== "/" && pagePathName !== "/admin") {
        $.getScript(scriptString,() => {});
    }
    

}

