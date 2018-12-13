

$.ajax({
    "url": "../data?collection=media_coverage",
    "method": "GET"
}).done(res => {
    const jsonList = res;
    var currentCountry = "";
    for (let i = 0; i < jsonList.length; i++) { 
        const thisCountry = jsonList[i]['country'].toLowerCase();
        if (currentCountry !== jsonList[i]['country']) {
            currentCountry = jsonList[i]['country'];
            $("#" + thisCountry).append("<h2>" + currentCountry + "</h2>");
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
        const htmlString = "<li><div id='" + mediaId + "'><p><h3><span class='dateFormat'>" + publishDate + ": </span><a href='" + mediaLink + "'>" + mediaTitle + "</a></h3></p><p>Source: " + mediaSource + "</p></div></li>";

        $("#" + thisCountry).append(htmlString); 

        // check if admin is logged in
        if (window.localStorage.getItem('user') === 'admin') {
            // if admin is logged in, append editing button and form for each element
            $("#" + mediaId).append("<button type='submit' id='editButton" + mediaId + "'>Edit Item Above</button>");
            $("#" + mediaId).append(`<br><br><form id="editform${mediaId}">
            <input type="text" class="publish_date" name="dateField${mediaId}" id="dateField${mediaId}" value="${publishDate}">
            <br><br>
            <textarea rows="5" cols="100" type="text" class="media_title" name="titleField${mediaId}" id="titleField${mediaId}">${mediaTitle}</textarea>
            <br><br>
            <textarea rows="5" cols="100" type="text" class="media_link" name="linkField${mediaId}" id="linkField${mediaId}">${mediaLink}</textarea>
            <br><br>
            <textarea rows="5" cols="100" type="text" class="media_source" name="sourceField${mediaId}" id="sourceField${mediaId}">${mediaSource}</textarea>
            <br><br>
            <button type="submit" id="sendChangesButton${mediaId}">
                Save Changes
            </button>
            <button type="submit" id="deleteButton${mediaId}">
                Delete Item
            </button>
            <br>
            </form>`);
            $(`#editform${mediaId}`).css("display", "none");
        }

        $("#editButton" + mediaId).click((event) => {
            event.preventDefault();
            console.log("editButton " + mediaId + " pressed");
            $(`#editform${mediaId}`).css("display", "");      
        });
        $("#sendChangesButton" + mediaId).click((event) => {
            event.preventDefault();
            console.log("sendChangesButton " + mediaId + " pressed");
            const jsonFormObj = {"id":mediaId, "date":$(`#dateField${mediaId}`).val(), "title":(`#titleField${mediaId}`).val(), "source":(`#sourceField${mediaId}`).val(), "link":(`#linkField${mediaId}`).val()};
            console.log("The json obj:" + jsonFormObj);
            $.ajax({
                url: '/update',
                type: 'POST',
                data: jsonFormObj,
                dataType: 'json'
            }).done(function(data){
                console.log(data);
            })
            $(`#editform${mediaId}`).css("display", "none");      
        });
        $("#deleteButton" + mediaId).click((event) => {
            event.preventDefault();
            console.log("deleteButton " + mediaId + " pressed");
            // add ajax for deleting
            $.ajax({
                url: '/delete',
                type: 'POST',
            }).done(function(data){
                console.log(data);
                if (data.response === 'Logged In') {
                    $('#response').text('You are logged in');
                    window.localStorage.setItem('user', 'admin');
                    window.location.replace("/");
                } else {
                    $('#response').text('You are not logged in');
                }
            })
            $(`#editform${mediaId}`).css("display", "none");      
        });
    }
    
});


