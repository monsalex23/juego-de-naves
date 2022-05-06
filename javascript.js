function start() {

    $("#inicio").hide();

    $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
    $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
    $("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");


    let jogo = {};
    var podeAtirar = true;
    let velocidade = 5;
    let posicaoY = parseInt(Math.random() * 334);

    let TECLA = {
        W: 38,
        S: 40,
        D: 39
    }

    jogo.pressionou = [];

    //Verifica se o usuário pressionou alguma tecla	

    $(document).keydown(function (e) {
        jogo.pressionou[e.which] = true;
    });


    $(document).keyup(function (e) {
        jogo.pressionou[e.which] = false;
    });



    //Game Loop

    jogo.timer = setInterval(loop, 30); //temporizador

    function loop() {

        movefundo();
        movejogador();
        moveinimigo1();
        moveinimigo2();
        moveamigo();
        disparo();
        colisao();


    } // Fim da função loop()


    function movefundo() {

        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position", esquerda - 1); //velocidade -1

    } // fim da função movefundo

    function movejogador() {

        if (jogo.pressionou[TECLA.W]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo - 10);

            if (topo <= 0) { //limita el movimiento para arriba

                $("#jogador").css("top", topo + 10);
            }

        }

        if (jogo.pressionou[TECLA.S]) {

            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo + 10);

            if (topo >= 434) { //limita el movimiento para abajo
                $("#jogador").css("top", topo - 10);

            }
        }

        if (jogo.pressionou[TECLA.D]) {

            //Chama função Disparo	
        }

    } // fim da função movejogador()

    function moveinimigo1() {

        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left", posicaoX - velocidade);
        $("#inimigo1").css("top", posicaoY);

        if (posicaoX <= 0) {
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);

        }
    } //Fim da função moveinimigo1()

    function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
        $("#inimigo2").css("left", posicaoX - 3);

        if (posicaoX <= 0) {

            $("#inimigo2").css("left", 775);

        }
    } // Fim da função moveinimigo2()


    function moveamigo() {

        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left", posicaoX + 1);

        if (posicaoX > 906) {

            $("#amigo").css("left", 0);

        }

    } // fim da função moveamigo()


    function disparo() {

        if (podeAtirar == true) {

            podeAtirar = false;

            topo = parseInt($("#jogador").css("top"))
            posicaoX = parseInt($("#jogador").css("left"))
            tiroX = posicaoX + 190;
            topoTiro = topo + 38;
            $("#fundoGame").append("<div id='disparo'></div");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);

            var tempoDisparo = window.setInterval(executaDisparo, 30);

        } //Fecha podeAtirar

        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left", posicaoX + 15);


            if (posicaoX > 900) {

                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove(); //limpiando disparo de la pantalla
                podeAtirar = true;

            }
        } // Fecha executaDisparo()
    } // Fecha disparo()


    function colisao() {   //usando jquery collision
        let colisao1 = ($("#jogador").collision($("#inimigo1")));
        // jogador com o inimigo1

        console.log(colisao1);

    } //Fim da função colisao()


}