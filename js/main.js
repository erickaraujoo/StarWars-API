$(document).ready(function(){
    
    // Mostrando a div após um tempo
    $('.swiper-container').fadeOut('fast').delay(2800).fadeIn('slow');
    
    /* CONTADOR DO CONTEUDO */
    var $comprimento;

    /* PUXA OS NUMEROS DE ALGUMA PALAVRA PARA QUEM CHAMA*/
    var apenasNumeros = function(num) {
        var $coletaNumero = num.replace(/[^0-9]/g,'');
        return parseInt($coletaNumero);
    }

    /* APÓS O EVENTO DE CLICK NO BOTÃO, FAZ UMA FUNÇÃO*/
    $("#btnPesquisa").click(function(){
        
        /* MUDANDO IMAGEM DE FUNDO */
        $('body').css({
            'background-image': 'url(image/star_wars.jpg)',
            'background-repeat': 'no-repeat',
            'background-size': 'cover',
        }).fadeIn('slow');
        
        /* BIBLIOTECA PARA O MODAL 'CARREGANDO'*/
        $.blockUI({ 
            css: { 
                border: 'none', 
                padding: '15px', 
                backgroundColor: '#000', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px', 
                opacity: .5, 
                color: '#fff' 
            }
        }); 
        setTimeout($.unblockUI, 1500);

        /* PUXANDO O VALOR DA CAIXA DE TEXTO */
        var $nome = $('#nomeHeroi').val();

        /* INSERINDO O VALOR NO buscaPersonagem */
        buscaPersonagem($nome);
        
        /* ZERANDO OS CONTADORES */
        $comprimento = 0;
        $numeraCard = 0;
        
        /* FUNÇÃO PARA LIMPAR O CONTEUDO DA PAGINA */
        $(".swiper-wrapper").html('');
        
    /* ESTILIZAÇÃO DO BOTÃO */
    }).css({
        height: '35px',
        width: '36px',
        'margin-top': '2px',
        cursor: 'pointer',
    });

    var buscaPersonagem = function ($nome) {

        /* Url para puxar os dados do personagem pelo valor da caixa de texto */
        var $url = `https://swapi.co/api/people/?format=json&search=${$nome}`;

        /* Retornando em JSON */
        var $personagemJson = fetch($url).then(response => {
            response.json().then(response => {
                response.results.map($heroi => {
                    $comprimento +=1; /* A cada imagem recebida, atribue +1 para o contador */
                    mostraDados($heroi); /* Jogando o resultado em outra função */
                });
            });
        });
    };

    var mostraDados = $personagem => {
        
        /* Pegando a descrição do conteudo recebido */
        var $nome = $personagem.name;
        var $altura = $personagem.height;
        var $kilograma = $personagem.mass;
        var $olho = $personagem.eye_color;
        var $aniversario = $personagem.birth_year;
        
        /* Pegando apenas o numero da url do conteudo recebido */
        var $idPersonagem = apenasNumeros($personagem.url);

        /* Pegando a imagem pelo url que eu recebo do json*/
        var $urlImagem = `https://starwars-visualguide.com/assets/img/characters/${$idPersonagem}.jpg`
        var $numeraCard = 0;
        var $totalCard = $comprimento;

        /* Comparando se o card criado é o mesmo valor que o total do valor do card recebido */
        for ($numeraCard; $numeraCard <= $totalCard; $numeraCard++){
            if ($numeraCard == $totalCard){

                /* CRIANDO UMA DIV E INSERINDO EM OUTRA DIV */
                $('<div>', {
                    id: 'card' + $numeraCard,
                    class: 'swiper-slide',
                }).appendTo('.swiper-wrapper');
                
                /* PUXANDO UM CARD CRIADO */
                $("#card" + $numeraCard).append(
                    /* Inserindo cada conteudo em cada elemento de um card */
                      "<div class=imgBx>"
                        + "<img src=" + $urlImagem + " value=" + $comprimento + ">"
                    + "</div>"
                    + "<div class=details>"
                        + "<h2>" + $nome + "</h2>"
                        + "<h3>Birth year: " + $aniversario + "</h3>"
                        + "<h3>Height: " + $altura + "kg</h3>"
                        + "<h3>Weight: " + $kilograma + "cm</h3>"
                        + "<h3>Eye color: " + $olho + "</h3>"
                    + "</div>");

                /* Verificando se existe e inserindo efeito */
                var visivel = $(".swiper-slide").is(':visible');
                if (visivel == true){
                    /* Efeito do card funciona apenas quando tem o card */
                    var swiper = new Swiper('.swiper-container', {
                        effect: 'coverflow',
                        grabCursor: true,
                        centeredSlides: true,
                        slidesPerView: 'auto',
                        coverflowEffect: {
                            rotate: 0,
                            stretch: -50,
                            depth: 450,
                            modifier: 1,
                            slideShadows : true,
                        },
                    });  
                };
            };
        };
    };
});
