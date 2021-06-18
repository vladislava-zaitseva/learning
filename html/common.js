let galleries=["buildings","mix","nature"]
let photos={
  buildings:["1.jpg","2.jpg"],
  mix:["1.jpg","2.jpg","3.jpg"],
  nature:["1.jpg","2.jpg","3.jpg"]
}

function galleryTemplate(galleryName){
  let template=`
      <a href="category.html?category=${galleryName}">
            <figure class="category">
              <img src="gallery/${galleryName}/1.jpg" alt="1" height="100" >
              <figcaption>${galleryName}</figcaption>
            </figure>
      </a>
      `;
    return template;
}

function categoryTemplate(categoryName,fileName){
  let template=`
      <a href="photo.html?category=${categoryName}&fileName=${fileName}">
        <figure class="photo-item">
          <img src="gallery/${categoryName}/${fileName}" alt="1" height="100" >
        </figure>
      </a>
  `;
  return template;
}


function photoTemplate(categoryName,fileName){
  let template=`
  <figure class="photo" category="${categoryName}" file="${fileName}">
    <img src="gallery/${categoryName}/${fileName}" alt="1" height="500">
  </figure>
  `;
  return template;
}



function changeMainContent(content){
  let contentElement=document.getElementsByClassName("main-content")[0];
  contentElement.innerHTML=content;
}

function renderGallaries(){
  let content=galleries.map(item => galleryTemplate(item)).join("")
  changeMainContent(content)
}

function renderCategory(categoryName){
  let categoryFiles=photos[categoryName]
  let content=categoryFiles.map(item => categoryTemplate(categoryName,item)).join("")
  changeMainContent(content)
}

function renderPhoto(categoryName,fileName){
  let content=photoTemplate(categoryName,fileName)
  changeMainContent(content)
}

function getUrlParam(paramName){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(paramName)
}

function loadNextPhoto(event){
  event.preventDefault()

  let photoElement = document.getElementsByClassName("photo")[0];
  let category = photoElement.getAttribute("category")
  let file = photoElement.getAttribute("file")
  let nextPhoto = findNextPhoto(category, file)
  renderPhoto(category,nextPhoto)
}

function loadPrevPhoto(event){
  event.preventDefault()

  let photoElement = document.getElementsByClassName("photo")[0];
  let category = photoElement.getAttribute("category")
  let file = photoElement.getAttribute("file")
  let prevPhoto = findprevPhoto(category, file)
  renderPhoto(category,prevPhoto)
}

/*
  ("mix", "2.jpg") -> "3.jpg
  ("mix", "3.jpg") -> "1.jpg"
*/
function findNextPhoto(categoryName,file){
    let categoryFiles=photos[categoryName]
    let index=categoryFiles.indexOf(file)
    let nextIndex = (index + 1) % categoryFiles.length
    return categoryFiles[nextIndex]
}


function findPrevPhoto(categoryName,file){
    let categoryFiles=photos[categoryName]
    let index=categoryFiles.indexOf(file)
    let prevIndex = (index - 1) % categoryFiles.length
    return categoryFiles[prevIndex]
}
