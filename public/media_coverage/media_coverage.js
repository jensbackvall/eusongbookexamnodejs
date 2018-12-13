

$.ajax({
    "url": "../data?collection=media_coverage",
    "method": "GET"
}).done(res => {
    //console.log(res);
    const jsonList = res;
    var currentCountry = "";
    for (let i = 0; i < jsonList.length; i++) { 
        if (currentCountry !== jsonList[i]['country']) {
            currentCountry = jsonList[i]['country'];
            $("#" + jsonList[i]['country'].toLowerCase()).append("<h2>" + currentCountry + "</h2>");
        }
        const mediaId = jsonList[i]['id'];
        const publishDate = jsonList[i]['date'];
        let mediaTitle = "";
        if (jsonList[i]['title'] === "") {
            mediaTitle = "Untitled";
        }else{
            mediaTitle = jsonList[i]['title'];
        }
        const mediaSource = jsonList[i]['source'];
        const mediaLink = jsonList[i]['link'];
        //const htmlString = "<li><div id='" + mediaId + "'><p><h3><span class='dateFormat'>" + publishDate + ": </span><a href='" + mediaLink + "'>" + mediaTitle + "</a></h3></p><p>" + mediaSource + "</p></div></li>";
        const htmlString = "<li><div id='" + mediaId + "'><p><h3><span class='dateFormat'>" + publishDate + ": </span><a href='" + mediaLink + "'>" + mediaTitle + "</a></h3></p><p>Source: " + mediaSource + "</p></div></li>";

        $("#" + jsonList[i]['country'].toLowerCase()).append(htmlString); 
        
        // check hvis admin er logget ind
        // hvis ja, indsæt redigeringsknap samt redigeringsfelter for hvert element i dette li tag

    }
});

//date title source link

