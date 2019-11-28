var selectRaca = document.querySelector(".input-raca");
var selectFonte = document.querySelector(".input-fontes");
var selectCores = document.querySelector(".input-cores");
var nameCao = document.querySelector(".input-dogtxt");
var imgCao = document.querySelector(".imagem_photo");
var textDescricao = document.querySelector(".photo-descricao");
window.onload = funcoes();

function funcoes() {
  getImage();
  getRaca();
  saveInfosRaca();
  getInfosRaca();
  saveInfosFonte();
  getInfosFonte();
  saveInfosCores();
  getInfosCores();
  saveInfosNome();
  getInfosNome();
  getHora();
}

$(".input-dogbtn").click(function() {

  if (selectRaca.value != "none" && selectFonte.value != "nome" && selectCores.value != "none") {
      getFotoRaca();
      saveImage();
      colorSet();
      fontSet();
      nameDogSet();
      document.querySelector(".status").innerHTML = "Salvo com Sucesso!"
  } else {
      document.querySelector(".status").innerHTML = "Preencha todos os Campos!"
  }
});

function colorSet() {
  var cores = document.querySelector(".input-cores").value;
  textDescricao.getElementsByClassName.selectCores = cores;
}

function fontSet() {
  var fontes = document.querySelector(".input-fontes").value;
  textDescricao.getElementsByClassName.selectFonte = fontes;
}

function nameDogSet() {
  var nameDog = document.getElementById("textDog");
  if (nameDog.value == "") {
    document.querySelector(".photo-descricao").innerHTML = "Cão sem nome";
  } else {
    document.querySelector(".photo-descricao").innerHTML = nameDog.value;
  }
}

function getRaca() {
  var urlStr = "https://dog.ceo/api/breeds/list/all";
  $.ajax({
      url: urlStr,
      type: "get",
      dataType: "json",
      success: function(data) {
          for (var i = 0; i < Object.entries(data.message).length; i++) {
              newOption = document.createElement("option");
              newOption.value = Object.entries(data.message)[i][0];
              newOption.text = Object.entries(data.message)[i][0];
              selectRaca.add(newOption);
          }
      },
      error: function(erro) {
          console.log(erro);
      }
  });
}

function getFotoRaca() {
  var urlStrPhotos = "https://dog.ceo/api/breed/" + selectRaca.value + "/images";
  $.ajax({
      url: urlStrPhotos,
      type: "get",
      dataType: "json",
      success: function(dataPhoto) {
          var numberImages = (Object.entries(dataPhoto.message).length);
          var numberImagesRandom = (Math.round(Math.random() * (numberImages - 0 + 1) + 0));
          imgCao.src = Object.entries(dataPhoto.message)[numberImagesRandom][1];
      },
      error: function(erro) {
          console.log(erro);
      }
  });
}

function saveInfosRaca() {
  $('.input-raca').change(function() {
      localStorage.setItem('selectRaca', this.value);
  })
}

function getInfosRaca() {
  $(document).ajaxComplete(function(event, xhr, settings) {
      if (settings.url === "https://dog.ceo/api/breeds/list/all") {
          if (localStorage.getItem('selectRaca')) {
              $('.input-raca').val(localStorage.getItem('selectRaca'));
          }
      }
  });
}

function saveInfosCores() {
  $('.input-cores').change(function() {
      localStorage.setItem('selectCores', this.value);
  })
}

function getInfosCores() {
  if (localStorage.getItem('selectCores')) {
      $('.input-cores').val(localStorage.getItem('selectCores'));
      document.querySelector(".photo-descricao").style.color = localStorage.getItem('selectCores')
  }
}

function saveInfosFonte() {
  $('.input-fontes').change(function() {
      localStorage.setItem('selectFonte', this.value);
  })
}

function getInfosFonte() {
  if (localStorage.getItem('selectFonte')) {
      $('.input-fontes').val(localStorage.getItem('selectFonte'));
      document.querySelector(".photo-descricao").style.fontFamily = localStorage.getItem('selectFonte')
  }
}

function saveInfosNome() {
  $('#textDog').on('keyup', function() {
      localStorage.setItem('name', this.value);
  })
}

function getInfosNome() {
  if (localStorage.getItem('name')) {
      $('.photo-descricao').text(localStorage.getItem('name'));
      $('#textDog').val(localStorage.getItem('name'));
  }
}

function saveImage() {
  $(document).ajaxComplete(function(event, xhr, settings) {
      if (settings.url.indexOf('/images') >= 0) {
          localStorage.setItem('image', $('.imagem_photo').attr('src'))
      }
  })
}

function getImage() {
  if (localStorage.getItem('image')) {
      $('.imagem_photo').attr('src', localStorage.getItem('image'));
  }
}

function getHora() {
  var data = new Date();
  var dia = data.getDate();
  var mes = data.getMonth() + 1;
  var hora = data.getHours();
  var minutos = data.getMinutes();
  localStorage.setItem("horario", dia + "/" + mes + " " + hora + ":" + minutos)
  if (localStorage.getItem('horario'))
      $(".inputHora").text(localStorage.getItem('horario'));
}