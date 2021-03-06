jQuery(document).ready(function($) {
    var dadosCurso,
      dadosRedundantes,
      getDadosCurso = $.ajax({
      url: 'json/cursos.json',
      type: 'GET',
      dataType: 'text'
    }),
      getRedundantes = $.ajax({
        url: 'json/dados-redundantes.json',
        type: 'GET',
        dataType: 'text'

      }),
      domInfo = $('div.lista ul li');

      // código para testes no navegador
      // var regionalSelecionada = localStorage.getItem('curso-regional');
      // var cursoSelecionado = localStorage.getItem('curso-index');
      
      //código final para o app mesmo
      var regionalSelecionada = Android.getRegionalId();
      var cursoSelecionado = Android.getCursoId();


    getDadosCurso.done(function(data){
      dadosCurso = $.parseJSON(data);
    });

    getRedundantes.done(function(data){
      dadosRedundantes = $.parseJSON(data);
    });

    $.when(getDadosCurso, getRedundantes).then(function(){
      colocarDados();
    });
    

    function colocarDados(){

      var dadosDoCursoSelecionado = dadosCurso.regionais[regionalSelecionada].cursos[cursoSelecionado];

      domInfo.eq(0).children('span.subtitulo').text(
          dadosCurso.regionais[regionalSelecionada].nome
        );

      domInfo.eq(1).children('span.subtitulo').text(
          dadosRedundantes
          .cursos
          .graus
          [dadosDoCursoSelecionado
          .grau]
        );
      domInfo.eq(2).children('span.subtitulo').text(
          dadosRedundantes
          .cursos
          .processos_seletivos
          [dadosDoCursoSelecionado
          .ps]
        ); 
      domInfo.eq(3).children('span.subtitulo').text(
          dadosDoCursoSelecionado
          .duracao
          .toString()+' semestres'
        ); 
      domInfo.eq(4).children('span.subtitulo').text(
          dadosRedundantes
          .cursos
          .turnos
          [dadosDoCursoSelecionado
          .turno]
        ); 
      domInfo.eq(5).children('span.subtitulo').text(
          dadosDoCursoSelecionado
          .n_vagas
          .toString()
        );
      if (regionalSelecionada == 0) {
        domInfo.eq(6).removeClass('esconder').children('span.subtitulo').text(
          dadosRedundantes
          .cursos
          .campi
          [dadosDoCursoSelecionado
          .campus]
        ); 
      }
         
    }


    
  });