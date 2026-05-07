📋 Sobre o Projeto
O MacroPad 3×3 é um teclado macro personalizado desenvolvido com uma placa ESP32-S2 Mini. O dispositivo funciona como um controle programável capaz de enviar comandos via Wi-Fi para diferentes sistemas — incluindo um carrinho robótico.
A proposta do projeto é unir eletrônica, programação, design 3D e automação em um único dispositivo funcional e interativo. Toda a estrutura foi desenvolvida de forma personalizada, incluindo a carcaça impressa em 3D, as keycaps e a organização interna dos switches.

🎯 Objetivo
Demonstrar como um sistema compacto pode realizar comunicação sem fio e controlar dispositivos físicos em tempo real, ensinando na prática conceitos como:

Montagem de matrizes de teclado
Leitura de botões com microcontroladores
Comunicação via Wi-Fi
Controle de dispositivos externos
Impressão 3D aplicada à eletrônica
Integração entre hardware e software


⚙️ Como Funciona
O sistema é dividido em duas partes:
1. MacroPad — Transmissor
O macropad detecta os botões pressionados e envia comandos via Wi-Fi.
Botão pressionado
      ↓
ESP32 identifica a posição na matriz
      ↓
Interpreta o comando correspondente
      ↓
Envia a informação via Wi-Fi
Exemplos de mapeamento:
BotãoAção1⬆️ Mover para frente2⬅️ Virar à esquerda3🔔 Buzina4💡 Ligar LEDs...Personalizável
2. Dispositivo Controlado — Receptor
Um segundo ESP32 recebe os comandos e aciona o dispositivo físico.
Pacote Wi-Fi recebido
      ↓
Placa interpreta o comando
      ↓
Aciona o driver de motor
      ↓
Controla os motores do carrinho

🛠️ Tecnologias Utilizadas
Hardware
ComponenteFunçãoESP32-S2 MiniMicrocontrolador principalSwitches mecânicosEntrada dos botõesKeycaps impressas em 3DInterface físicaDriver de motorControle dos motoresMotores DCMovimentação do carrinhoBateriaAlimentaçãoJumpers e fiosConexões internas
Software

Arduino IDE — ambiente de desenvolvimento
C++ — linguagem de programação
Wi-Fi (ESP-NOW / HTTP) — protocolo de comunicação
GPIO Control — leitura da matriz de teclado

Fabricação

Impressão 3D com filamento PLA+
Soldagem eletrônica
Montagem de matriz de teclado
Modelagem 3D customizada

🚀 Potencial de Expansão
O MacroPad pode ser adaptado para diversas aplicações além do carrinho robótico:

🏠 Automação residencial — controlar luzes, tomadas, persianas
🎮 Controle de jogos — atalhos e macros customizados
🎬 Edição de vídeo — shortcuts no Premiere, DaVinci
📺 Streaming — controles para OBS, cenas, alertas
🤖 Robótica — qualquer dispositivo com ESP32
🌐 Sistemas IoT — integração com Home Assistant, MQTT
