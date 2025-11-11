Estoy desarrollando un juego web de búsqueda de objetos con tiempo límite. El juego está dividido en 3 niveles: un cementerio, un bosque y una biblioteca. En cada nivel el jugador debe encontrar una lista de objetos ocultos antes de que el tiempo llegue a cero.

Quiero que me ayudes a estructurar y programar el proyecto con las siguientes condiciones:

Pantallas del juego:

Splash: muestra logo y pasa a Home tras unos segundos o al hacer clic.

Home: botones para Jugar, Niveles, Puntajes, Créditos y un toggle de sonido.

Pantalla de Niveles: muestra 3 niveles (Cementerio, Bosque, Biblioteca) con estados bloqueado/desbloqueado según el progreso del jugador.

Pantalla de Juego (por nivel):

Fondo del nivel.

Lista de objetos que el jugador debe encontrar.

Timer de cuenta regresiva.

Indicador de cuántos objetos faltan.

Área clicable donde están los objetos.

Pop-up de Game Over:

Aparece cuando el tiempo llega a cero y faltan objetos.

Botones de “Reintentar nivel” y “Volver al Home”.

Pantalla de Puntaje:

Muestra el puntaje obtenido en el nivel, el mejor puntaje guardado para ese nivel y opciones de “Siguiente nivel”, “Reintentar” y “Home”.

Pantalla de Créditos:

Muestra información del equipo y botón para volver a Home.

Lógica de juego:

Cada nivel tiene: lista de objetos { id, nombre, posición/zona, encontrado }, tiempo límite y dificultad.

El timer se inicia al empezar el nivel y se detiene cuando:

Se encuentran todos los objetos (nivel completado), o

El tiempo llega a cero (Game Over).

El jugador tiene 3 vidas. Si pierde todas las vidas, el juego termina.

Puntaje:

Sumar puntos por cada objeto encontrado.

Agregar bonus por tiempo restante.

Nivel completado:

Detener timer, reproducir animaciones/sonidos de victoria.

Guardar progreso del jugador y el puntaje del nivel.

Desbloquear el siguiente nivel si corresponde.

Game Over:

Detener timer, mostrar pop-up y reproducir sonido de derrota.

Persistencia de datos (Zustand):

Vamos a usar Zustand como servicio de persistencia de datos.

Necesito un módulo de servicio (por ejemplo ZustandService) que exponga funciones como:

loadPlayerData(playerId)

saveLevelResult(playerId, levelId, score, completedLevel, unlockedLevels)

updateSettings(playerId, settings)

Los datos que deben persistir:

Niveles desbloqueados.

Mejor puntaje por nivel.

Último nivel jugado.

Preferencias de sonido (mute on/off).

El resto del juego no debe llamar directamente a la API de Zustand, solo al servicio.

Animaciones y sonido (GSAP):

Usar GSAP para:

Transiciones entre pantallas (fade/slide/scale).

Feedback visual cuando un objeto es encontrado (pequeño “pop” o “flash”).

Animaciones de botones (hover y click).

Animaciones del timer cuando el tiempo es crítico (shake, cambio de color).

Sonidos:

Efecto al encontrar objeto correcto.

Efecto al hacer clic incorrecto (opcional).

Sonido de Game Over.

Sonido de nivel completado.

Mantener el código de animaciones separado en funciones reutilizables cuando sea posible.

Organización del código:

Quiero que el código esté organizado por pantallas/componentes y lógica:

Un módulo para la lógica común del juego (estados, timer, cálculo de puntaje).

Un módulo/servicio para la persistencia con Zustand.

Componentes o módulos para cada pantalla (Splash, Home, Niveles, Juego, Puntaje, Créditos).

Cuando propongas cambios o archivos nuevos, indícame la ruta y el contenido completo del archivo.

Estilos y Sass (muy importante):

Ya tengo instalado sass con npm install -D sass.

No quiero un solo archivo .css gigante.

Quiero que los estilos se organicen así:

Carpeta global de estilos: src/styles/

src/styles/_variables.scss (colores, tipografías, tamaños).

src/styles/_layout.scss (layout general, body, contenedores).

src/styles/_typography.scss (textos, títulos).

src/styles/main.scss que use (@use) los parciales anteriores.

Cada componente/pantalla importante debe usar CSS Modules con Sass, por ejemplo:

src/pages/Game/GameScreen.module.scss

src/pages/Home/HomeScreen.module.scss

src/components/HUD/GameHud.module.scss

En los componentes React se deben importar los módulos así:

import styles from './GameScreen.module.scss';

En src/main.jsx se debe importar SOLO el estilo global:

import './styles/main.scss';

Priorizar clases pequeñas, reutilizables y evitar estilos inline.

Tu rol:

Actúa como un asistente de desarrollo que conoce bien JavaScript, React, Vite, Sass/SCSS, GSAP y buenas prácticas de arquitectura frontend.

Siempre que generes código, respeta esta organización de archivos (.module.scss por componente + main.scss global).

Sugiere la mejor forma de estructurar el código, nombra bien las funciones y mantén las explicaciones claras y cortas.

Prioriza claridad, modularidad y que el juego pueda ampliarse (más niveles, más objetos, etc.).