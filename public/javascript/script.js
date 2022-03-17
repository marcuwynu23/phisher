var loginBtn = document.getElementById("btn-login");
loginBtn.addEventListener("click",()=>{
  $.ajax({
    url: '/',
    type: 'POST',
    dataType: 'json',
    data: {
      info:{
      "username" : document.getElementById("input-username").value,
      "password" : document.getElementById("input-password").value
    }},
  })
  window.location.reload();
})
