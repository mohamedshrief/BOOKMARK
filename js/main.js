var bookmarkName = document.getElementById('bookmarkName');
var url= document.getElementById('url');

var bookmarks = [];
bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
display()
var add = document.getElementById('addBookmark');
add.addEventListener('click' , addbookmark);

let regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})(\/[^\s]*)?$/;
let bNameRegex = /^[a-zA-Z-_.]{3,20}$/;

function filterObjectWithValue(bmark, key){
    for(let i = 0 ; i < bookmarks.length; i++){
        if (bmark[key] == bookmarks[i][key]) {
            return bookmarks[i];
        }    
    }
}

function checker(bmark, key){
    var checkPoint = 0
    for(let i = 0 ; i < bookmarks.length; i++){
        if (bmark[key] == bookmarks[i][key]) {
            checkPoint = 1
        }    
    }
    return checkPoint;
}

function addbookmark(){
    var bookmark = {
        name : bookmarkName.value,
        siteUrl : url.value,
        id : `${Math.random()*10000} - ${Math.random()*10000}`
    }
    if (!bookmark.siteUrl.startsWith("http://") && !bookmark.siteUrl.startsWith("https://")) {
        bookmark.siteUrl = `http://${bookmark.siteUrl}`;
    }
    clearAlert();
    var bmNameChecker = checker(bookmark, "name");
    var bmUrlChecker = checker(bookmark, "siteUrl");

    if (regex.test(bookmark.siteUrl) && bNameRegex.test(bookmark.name) &&  bmNameChecker === 0 && bmUrlChecker === 0){
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        document.getElementById('urlAgain').style.display = "none"
        document.getElementById('nameAgain').style.display = "none"
        display();
        clearInputs()
    }
    else if(bmNameChecker === 1 || bNameRegex.test(bookmark.name)== 0){
        document.getElementById('nameAgain').style.display = "block"
        if(regex.test(bookmark.siteUrl) == false){
            document.getElementById('urlAgain').style.display = "flex"
        }
        else if(bmNameChecker === 1){
            let filtratedObject = filterObjectWithValue(bookmark, "siteUrl")
            document.getElementById('repeatAlert').innerHTML = `
                This bookmark URL has already been added before under the name of 
                 <span id="previousUrlName">"${filtratedObject.name}"</span></p>
            `
            document.getElementById('repeatAlert').style.display = "block"
        }
    }
    else if(bmUrlChecker === 1){
        let filtratedObject = filterObjectWithValue(bookmark, "siteUrl")
        document.getElementById('repeatAlert').innerHTML = `
            This bookmark URL has already been added before under the name of 
             <span id="previousUrlName">"${filtratedObject.name}"</span></p>
        `
        document.getElementById('repeatAlert').style.display = "block"
    }

    else{
        document.getElementById('urlAgain').style.display = "flex"
    }

}

function display(){
    var cartona = "";
    for(var i = 0 ; i < bookmarks.length ; i++)
    {
        cartona += `
             <div class="row text-center content-row">
                <div class="col-3 d-flex justify-content-center align-items-center">
                    <h6>${i+1}</h6>
                </div>
                <div class="col-3 d-flex justify-content-center align-items-center">
                    <h6>${bookmarks[i].name}</h6>
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-info text-white">
                        <a href="${bookmarks[i].siteUrl}" class="text-decoration-none text-white" target="_blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a>
                    </button>
                </div>
                <div class="col-3">
                    <button type="button" onclick="deleteItem(${i})" class="btn btn-danger text-white">
                        <i class="fa-solid fa-trash-can pe-2"></i>
                        Delete
                    </button>
                </div>
            </div>
        `
    }
    document.getElementById('content').innerHTML = cartona;
}

function deleteItem(index){
    bookmarks.splice(index , 1);
    localStorage.setItem('bookmarks' , JSON.stringify(bookmarks))
    display();
}

function clearInputs(){
    bookmarkName.value= "";
    url.value= "";
    clearAlert()
}

function clearAlert(){
    document.getElementById('nameAgain').style.display = "none"
    document.getElementById('urlAgain').style.display = "none"
    document.getElementById('repeatAlert').style.display = "none"
}





