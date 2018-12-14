$.ajax({
    url: '/loggedinquery',
    type: 'GET',
}).done(function(data) {
    if (data.loggedin === 'no') {
        window.localStorage.removeItem('user');   
    }
});  

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
            $("#" + thisCountry).append("<hr><h2>" + currentCountry + "</h2><hr>");
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
        const htmlString = "<hr><li><div id='" + mediaId + "'><p><h3><span class='dateFormat'>" + publishDate + ": </span><a href='" + mediaLink + "'>" + mediaTitle + "</a></h3></p><p>Source: " + mediaSource + "</p></div></li>";
// what about .html instead of .append?!?!?
        $("#" + thisCountry).append(htmlString); 

        // check if admin is logged in
        if (window.localStorage.getItem('user') === 'admin') {
            // if admin is logged in, append editing button and form for each element
            $("#" + mediaId).append(`<button type="submit" id="editButton${mediaId}">Edit Item Above</button><p id="response_paragraph${mediaId}" class="response_paragraph"></p>`);
            $(`#response_paragraph${mediaId}`).css("display", "none");
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
            const currentPath = "media_coverage";
            const jsonFormObj = {"id":mediaId, "date":$(`#dateField${mediaId}`).val(), "title":$(`#titleField${mediaId}`).val(), "source":$(`#sourceField${mediaId}`).val(), "link":$(`#linkField${mediaId}`).val(), "path": currentPath};
            console.log("The json obj:" + jsonFormObj);
            $.ajax({
                url: '/update',
                type: 'POST',
                data: jsonFormObj,
                dataType: 'json'
            }).done(function(data){
                console.log(data);
                $(`#response_paragraph${mediaId}`).css("display", "");
                $(`#response_paragraph${mediaId}`).text(data.response);
                $(`#editform${mediaId}`).css("display", "none");
                if (data.response !== "Only ADMIN can update! Please log in and try again!") {
                    $(location.reload(true));
                }
            })          
        });
        $("#deleteButton" + mediaId).click((event) => {
            event.preventDefault();
            console.log("deleteButton " + mediaId + " pressed");
            const currentPath = "media_coverage";
            const jsonFormObj = {"id":mediaId};
            $.ajax({
                url: '/delete',
                type: 'POST',
                data: jsonFormObj,
                dataType: 'json'
            }).done(function(data){
                console.log(data);
                $(`#response_paragraph${mediaId}`).css("display", "");
                $(`#response_paragraph${mediaId}`).text(data.response);
            })
            $(`#editform${mediaId}`).css("display", "none");      
        });
    }

    if (window.localStorage.getItem('user') === 'admin') {
        $(`.press-releases`).prepend(`<br><div class="addMediaButtonDiv"><br><br><button type="submit"  id="addMediaItemButton">Add New Media Item</button></div>`);

        $(`<div class="new-media-div"><br><br><form id="addNewMediaItemForm">
        <input type="text" class="newIdField" name="newIdField" id="newIdField" placeholder="id">
        <br><br>
        <input type="text" class="newTypeField" name="newTypeField" id="newTypeField" placeholder="Written, Audio or Video?">
        <br><br>
        <input type="text" class="newCountryField" name="newCountryField" id="newCountryField" placeholder="Country">
        <br><br>
        <input type="text" class="newDateField" name="newDateField" id="newDateField" placeholder="Date">
        <br><br>
        <input type="text" class="newTitleField" name="newTitleField" id="newTitleField" placeholder="Title">
        <br><br>
        <input type="text" class="newSourceField" name="newSourceField" id="newSourceField" placeholder="Source">
        <br><br>
        <input type="text" class="newLinkField" name="newLinkField" id="newLinkField" placeholder="Link">
        <br><br>
        <br><br>
        <button type="submit" id="saveNewMediaItemButton">
            Save Media Item
        </button>
        <br>
        </form></div>`).insertAfter(".addMediaButtonDiv");
        $(`#addNewMediaItemForm`).css("display", "none");
    }

    $("#addMediaItemButton").click((event) => {
        event.preventDefault();
        console.log("addMediaItemButton pressed");
        $(`#addNewMediaItemForm`).css("display", ""); 
    });
    $("#saveNewMediaItemButton").click((event) => {
        event.preventDefault();
        console.log("saveNewMediaItemButton pressed");
        const currentPath = "media_coverage";
        const jsonFormObj = {"id":$(`#newIdField`).val(), "type":$(`#newTypeField`).val(), "country":$(`#newCountryField`).val(), "date":$(`#newDateField`).val(), "title":$(`#newTitleField`).val(), "source":$(`#newSourceField`).val(), "link":$(`#newLinkField`).val(), "path": currentPath};
        console.log("The json obj:" + jsonFormObj);
        $.ajax({
            url: '/create',
            type: 'POST',
            data: jsonFormObj,
            dataType: 'json'
        }).done(function(data){
            console.log(data);
            $(`#response_paragraph${mediaId}`).css("display", "");
            $(`#response_paragraph${mediaId}`).text(data.response);
            $(`#addNewMediaItemForm`).css("display", "none");
            if (data.response !== "Only ADMIN can create! Please log in and try again!") {
                $(location.reload(true));
            }
        })          
    });
});


