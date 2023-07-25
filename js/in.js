
var siteName=document.getElementById('siteName');
var siteUrl=document.getElementById('siteUrl');
var websiteList;

// localStorage
  if (localStorage.getItem('websiteList')) {
    websiteList=JSON.parse(localStorage.getItem('websiteList'));
    displayWeb(websiteList); 
  }
  else{
    websiteList=[]; 
  }

//Submit  
 function sumbit(){
  if (nameValidation()) {
  var website = {
  name : siteName.value,
  url: siteUrl.value
  };
  websiteList.push(website);
  displayWeb(websiteList);
  localStorage.setItem("websiteList",JSON.stringify(websiteList));
  clear();
  }
 
}

//Display Data 
  function displayWeb(list) {
    var box = ``;
    for (i =0; i<list.length; i++) {
     box +=`<tr>
       <td>${i+1}</td>
       <td>${list[i].name}</td>
       <td><button class="border border-0 bg-white"><a href="${list[i].url}" class="btn text-white bg-success border border-0" target="_blank"><i class="fa-solid fa-eye me-1"></i>Visit</a></button></td>
       <td><button class="btn btn-danger" onclick="Delete(${i})"><i class="fa-solid fa-trash-can me-1"></i>Delete</button></td>
       </tr>`
     }
     
     document.getElementById('webdata').innerHTML=box;
   
}

//Clear inputs
  function clear(){
    siteName.value="";
    siteUrl.value="";
}

//Delete row 
function Delete(index){
 websiteList.splice(index,1);
 localStorage.setItem("websiteList",JSON.stringify(websiteList))
 displayWeb(websiteList);
}

 
// search
function searchWeb(searchLetter) {
  var foundedWebsite=[];
  for(i=0;i<websiteList.length;i++){ 
    if (websiteList[i].name.toLowerCase().includes(searchLetter.toLowerCase())) {
       foundedWebsite.push(websiteList[i]);
    }
  
  }
  displayWeb(foundedWebsite);
}

// validation
// name
function nameValidation() {
  var regex= /^[A-Z]?[a-z]{2,20}$/;
  var nameError=document.getElementById('nameError');
  if (regex.test(siteName.value)) {
    nameError.classList.replace('d-block','d-none')
    siteName.classList.replace('is-invalid','is-valid');
    return true;
  }
  else{
    siteName.classList.add('is-invalid');
    nameError.classList.replace('d-none','d-block')
    return false;
  }
}
// website
function urlValidation(){
  var regex= /https?:\/\/(?:www\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)*(\/[\/\d\w\.-]*)*(?:[\?])*(.+)*/gi;
  var urlError=document.getElementById('urlError');
  if (regex.test(siteUrl.value)) {
    urlError.classList.replace('d-block','d-none')
    siteUrl.classList.replace('is-invalid','is-valid');
    return true;
  }
  else{
    siteUrl.classList.add('is-invalid');
    urlError.classList.replace('d-none','d-block')
    return false;
  }
}
// visit
