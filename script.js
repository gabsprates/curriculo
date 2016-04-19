window.onscroll = function () {
  var posY = this.pageYOffset;
  var topo = document.body;
  if (posY > 10) {
    topo.classList.add("onscroll");
  } else {
    topo.classList.remove("onscroll");
  }
};

function ajax (method, url, callSuccess) {
  if ( !method || !url || !callSuccess ) {
    console.log("error");
    return false;
  }
  var request = new XMLHttpRequest();
  request.open(method, url, true);

  request.onreadystatechange = function() {
    if ( this.readyState == 4 ) {
      if (this.status >= 200 && this.status < 400) {

        callSuccess.success.call(
          this.responseText,
          callSuccess.seletor,
          callSuccess.secao,
          callSuccess.callback
        );

      } else {
        console.log("Status: ".concat(this.status));
      }
    }
  };
  request.send();
}

function addNode(pai, elem, text) {
  if (!elem || !pai) {
    return false;
  }

  elem = document.createElement(elem);
  if (text) {
    text = document.createTextNode(text);
    elem.appendChild(text);
  }

  pai.appendChild(elem);
  return elem;
}

function constroi (seletor, secao, func) {
  var settings;
  seletor = document.querySelector(seletor);
  data = JSON.parse(this);

  settings = data.settings;
  data = data[secao];

  if (data.length > 0) {
    var tituloSecao = addNode(seletor, "h2", settings.titulo);
    tituloSecao.classList.add("asterisco");

    func(data, seletor);

    seletor.classList.remove("none");
  }
}

ajax("GET", "ajax/experiencias.json", {
  "success":  constroi,
  "seletor":  "#experiencias",
  "secao":    "experiencias",
  "callback": function (d, p) {
    for (var i = 0; i < d.length; i++) {
      var div = addNode(p, "div");
      div.classList.add("experiencia", "secao__item");
      var cargo = addNode(div, "h3", d[i].cargo);
      var empresa = addNode(div, "h4", d[i].empresa);
      var periodo = addNode(div, "p", d[i].periodo);
      var about = addNode(div, "div", d[i].descricao);
      about.classList.add("descricao");
    }
  }
});

ajax("GET", "ajax/certificados.json", {
  "success":  constroi,
  "seletor":  "#certificados",
  "secao":    "certificados",
  "callback": function (d, p) {
    for (var i = 0; i < d.length; i++) {
      var div = addNode(p, "div");
      div.classList.add("certificado", "secao__item");
      var titulo = addNode(div, "h3", d[i].titulo);
      var por = addNode(div, "h4", d[i].por);
      var dataEm = addNode(div, "p", d[i].data);
    }
  }
});

ajax("GET", "ajax/formacao.json", {
  "success":  constroi,
  "seletor":  "#formacao",
  "secao":    "formacao",
  "callback": function (d, p) {
    for (var i = 0; i < d.length; i++) {
      var div = addNode(p, "div");
      div.classList.add("formacao", "secao__item");
      var curso = addNode(div, "h3", d[i].curso);
      var instituicao = addNode(div, "h4", d[i].instituicao);
      var dataEm = addNode(div, "p", d[i].data);
    }
  }
});

ajax("GET", "ajax/competencias.json", {
  "success":  constroi,
  "seletor":  "#competencias",
  "secao":    "competencias",
  "callback": function (d, p) {
    for (var i = 0; i < d.length; i++) {
      var div = addNode(p, "div");
      div.classList.add("competencia", "secao__item");
      var titulo = addNode(div, "h3", d[i].titulo);
    }
  }
});

ajax("GET", "ajax/idiomas.json", {
  "success":  constroi,
  "seletor":  "#idiomas",
  "secao":    "idiomas",
  "callback": function (d, p) {
    for (var i = 0; i < d.length; i++) {
      var div = addNode(p, "div");
      div.classList.add("idioma", "secao__item");
      var lingua = addNode(div, "h3", d[i].lingua);
      var nivel = addNode(div, "h4", d[i].nivel);
    }
  }
});

ajax("GET", "ajax/projetos.json", {
  "success":  constroi,
  "seletor":  "#projetos",
  "secao":    "projetos",
  "callback": function (d, p) {
    for (var i = 0; i < d.length; i++) {
      var div = addNode(p, "div");
      div.classList.add("projeto", "secao__item");
      var titulo = addNode(div, "h3", d[i].titulo);
      var dataPjt = addNode(div, "h4", d[i].data);
      var sobre = addNode(div, "div", d[i].sobre);
      sobre.classList.add("projeto__descricao");
      var link = addNode(div, "a", d[i].url);
      link.href = d[i].url;
      link.title = d[i].titulo;
      link.target = "_blank";
    }
  }
});
