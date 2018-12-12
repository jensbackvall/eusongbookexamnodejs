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
        //const htmlString = "<li><div id='" + mediaId + "'><p>" + publishDate + "</p><p><h3><a href='" + mediaLink + "'>" + mediaTitle + "</a></h3></p><p>" + mediaSource + "</p></div></li>";
        const htmlString = "<li><div id='" + mediaId + "'><p>" + publishDate + "<h3><a href='" + mediaLink + "'>" + mediaTitle + "</a></h3></p><p>" + mediaSource + "</p></div></li>";
    
        $("#" + jsonList[i]['country'].toLowerCase()).append(htmlString);       
    }
});

//date title source link