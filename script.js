(function ($) {
  const terminal = $('#terminal');
  const topBar = $('#top_bar');
  const eventos = $('#lista-eventos');

  if (terminal) {
    terminal.addEventListener('click', function focus() {
      $('#cursor-blink').focus();
    });
  }

  window.addEventListener('scroll', function(e) {

    let percent = window.scrollY <= 175 ? (window.scrollY / 175) : 1;

    topBar.style.backgroundColor = `rgba(18, 18, 18, ${ percent })`;
    topBar.style.boxShadow = `0 2px 6px rgba(0, 0, 0, ${ percent })`;

  });

  if (eventos) {

    axios.get('https://stormy-reaches-39727.herokuapp.com/eventos')
      .then(function (response) {

        function padZeroLeft(str) {
          str = new String(str);
          return str.length < 2 ? '0' + str : str;
        }

        function getData(data) {
          let dia = padZeroLeft(data.getDate());
          let mes = padZeroLeft(data.getMonth() + 1);
          let ano = data.getFullYear();
          return `${ dia }/${ mes }/${ ano }`;
        }

        function getHora(data) {
          let hora = padZeroLeft(data.getHours());
          let min = padZeroLeft(data.getMinutes());
          return `${ hora }:${ min }`;
        }

        eventos.innerHTML = response.data.map(evento => {

          let dataInicio = new Date(evento.data.inicio);
          dataInicio = `${ getData(dataInicio) } às ${ getHora(dataInicio) }h`;

          let dataFim = null;
          if (!!evento.data.fim) {
            dataFim = new Date(evento.data.fim);
            dataFim = `${ getData(dataFim) } às ${ getHora(dataFim) }h`;
          }

          return `
            <div class="column is-full evento">
              <h4 class="title is-4">${ evento.evento }</h4>

              ${ !!evento.data
                ? `<p class="data">
                    <time value="${ evento.data.inicio }">${ dataInicio }</time>
                    ${ !!dataFim
                      ? ` até <time value="${ evento.data.fim }">${ dataFim }</time>`
                      : ''
                    }
                  </p>`
                : ''
              }

              ${ !!evento.descricao
                ? `<div class="descricao">${ evento.descricao.toString() }</div>`
                : ''
              }

              ${ !!evento.local
                ? (( !!evento.maps
                  ? `<a href="${ evento.maps }" title="${ evento.local }" target="_blank" class="local links">
                      ${ evento.local }
                    </a>`
                  : `<span class="links local">${ evento.local }</a>`
                ))
                : ''
              }

              ${ !!evento.link
                ? `<a href="${ evento.link }" title="${ evento.evento }" class="link links">
                    ${ evento.link }
                  </a>`
                : ''
              }
            </div>
          `;
        }).join('');
      })
      .catch(function (error) {
        console.log(error);
        eventos.innerHTML = '<div class="column">Erro ao carregar eventos</div>';
      });

  }

  $('.navbar-burger').addEventListener('click', () => {
    $('.menu-drop').classList.toggle('ativo');
  });

})(document.querySelector.bind(document));
