

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
        if (window.localStorage.getItem('user') === 'admin') {
        // hvis ja, indsæt redigeringsknap samt redigeringsfelter for hvert element i dette li tag
            $("#" + mediaId).append("<button type='submit' id='editButton" + mediaId + "'>Edit Item Above</button>");
            $("#" + mediaId).append(`<form id="editform${mediaId}">
            <input type="text" class="publish_date" name="dateField${mediaId}" id="dateField${mediaId}" placeholder="${publishDate}">
            <br><br>
            <input type="text" class="media_title" name="titleField${mediaId}" id="titleField${mediaId}" placeholder="${mediaTitle}">
            <br><br>
            <input type="text" class="media_link" name="linkField${mediaId}" id="linkField${mediaId}" placeholder="${mediaLink}">
            <br><br>
            <input type="text" class="media_source" name="sourceField${mediaId}" id="sourceField${mediaId}" placeholder="${mediaSource}">
            <br><br>
            <button type="submit" id="sendChangesButton${mediaId}">
                Save Changes
            </button>
            <br>
            </form>`);
            $(`#editform${mediaId}`).css("display", "none");
        }

        $("#editButton" + mediaId).click((event) => {
            console.log("editButton " + mediaId + " pressed");
            $(`#editform${mediaId}`).css("display", "");      
        });
        $("#sendChangesButton" + mediaId).click((event) => {
            console.log("sendChangesButton " + mediaId + " pressed");
            $(`#editform${mediaId}`).css("display", "none");      
        });
    }
    
});


// add boolean isCollapsed which controls display:none on form
