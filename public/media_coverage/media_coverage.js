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
    // TODO: Nedenstående kan give problemer med dobbelte id. Tag hellere det højest id i jsonList og increment med 1
    const nextIdToAdd = jsonList.length + 1;
    console.log("Length og jsonlist: ", jsonList.length);
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
            $.ajax({
                url: '/update',
                type: 'POST',
                data: jsonFormObj,
                dataType: 'json'
            }).done(function(data){
                $(`#response_paragraph${mediaId}`).css("display", "");
                $(`#response_paragraph${mediaId}`).text(data.response);
                $(`#editform${mediaId}`).css("display", "none");
                $(location.reload(true));
            })          
        });
        $("#deleteButton" + mediaId).click((event) => {
            event.preventDefault();
            console.log("deleteButton " + mediaId + " pressed");
            const currentPath = "media_coverage";
            const jsonFormObj = {"id":mediaId, "path": currentPath};
            $.ajax({
                url: '/delete',
                type: 'POST',
                data: jsonFormObj,
                dataType: 'json'
            }).done(function(data){
                $(`#response_paragraph${mediaId}`).css("display", "");
                $(`#response_paragraph${mediaId}`).text(data.response);
                $(`#editform${mediaId}`).css("display", "none");
                $(location.reload(true));
            })      
        });
    }

    if (window.localStorage.getItem('user') === 'admin') {
        $(`.press-releases`).prepend(`<br><div class="addMediaButtonDiv"><br><br><button type="submit"  id="addMediaItemButton">Add New Media Item</button></div>`);

        $(`<div class="new-media-div"><br><br><form id="addNewMediaItemForm">
        Type:
        <select name="newTypeField" id="newTypeField">
            <option value="Written">Written</option>
            <option value="Audio">Audio</option>
            <option value="Video">Video</option>
        </select>
        &nbsp&nbsp
        Country:
        <select name="newCountryField" id="newCountryField">
            <option value="AUSTRIA">Austria</option>
            <option value="BELGIUM">Belgium</option>
            <option value="BULGARIA">Bulgaria</option>
            <option value="CROATIA">Croatia</option>
            <option value="CYPRUS">Cyprus</option>
            <option value="CZECH REPUBLIQUE">Czech Republique</option>
            <option value="DENMARK">Denmark</option>
            <option value="ESTONIA">Estonia</option>
            <option value="FINLAND">Finland</option>
            <option value="FRANCE">France</option>
            <option value="GERMANY">Germany</option>
            <option value="GREECE">Greece</option>
            <option value="HUNGARY">Hungary</option>
            <option value="IRELAND">Ireland</option>
            <option value="ITALY">Italy</option>
            <option value="LATVIA">Latvia</option>
            <option value="LITHUANIA">Lithuania</option>
            <option value="LUXEMBOURG">Luxembourg</option>
            <option value="MALTA">Malta</option>
            <option value="NETHERLANDS">Netherlands</option>
            <option value="POLAND">Poland</option>
            <option value="PORTUGAL">Portugal</option>
            <option value="ROMANIA">Romania</option>
            <option value="SLOVAKIA">Slovakia</option>
            <option value="SLOVENIA">Slovenia</option>
            <option value="SPAIN">Spain</option>
            <option value="SWEDEN">Sweden</option>
            <option value="UNITED KINGDOM">United Kingdom</option>
        </select>
        <br><br>
        Date:
        <textarea rows="2" cols="100" class="newDateField" name="newDateField" id="newDateField" placeholder="Date format must be DD.MM.YY"></textarea>
        <br><br>
        Title:
        <textarea rows="2" cols="100" class="newTitleField" name="newTitleField" id="newTitleField" placeholder="Title"></textarea>
        <br><br>
        Source:
        <textarea rows="2" cols="100" class="newSourceField" name="newSourceField" id="newSourceField" placeholder="Source"></textarea>
        <br><br>
        Link:
        <textarea rows="2" cols="100" class="newLinkField" name="newLinkField" id="newLinkField" placeholder="Link"></textarea>
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
        const jsonFormObj = {"id":nextIdToAdd, "type":$(`#newTypeField`).val(), "country":$(`#newCountryField`).val(), "date":$(`#newDateField`).val(), "title":$(`#newTitleField`).val(), "source":$(`#newSourceField`).val(), "link":$(`#newLinkField`).val(), "path": currentPath};
        console.log("The json obj:" + jsonFormObj);
        $.ajax({
            url: '/create',
            type: 'POST',
            data: jsonFormObj,
            dataType: 'json'
        }).done(function(data){
            console.log(data);
            $(`#addNewMediaItemForm`).css("display", "none");
            $(location.reload(true));
        })          
    });
});


