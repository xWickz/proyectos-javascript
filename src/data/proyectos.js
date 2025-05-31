const proyectos = [
    {
        nombre: "Calculadora Básica",
        nivel: "Básico",
        descripcion: "Proyecto de Calculadora, el cual claramente permite realizar operaciones básicas (suma, resta, división, multiplicación) y otras cosas.",
        imagen: "CalculadoraBasica.webp",
        url: "calculadora",
        funcionamiento: "Este proyecto es básico! Podrás observar que implementamos una caja con botones dónde cada botón al hacerle clic hará algo distinto, aquí separamos por partes. Los números ejecutan la función de agregar números. Los operadores ejecutan la función de agregar su operador. Desarrollé las funciones para que se vean lo más simples posibles, debemos estar atentos a las validaciones ya que un error y nos puede causar un error en el funcionamiento de la calculadora. Por lo que podrás notar que son más validaciones que código en si. Quitando las validaciones el código es muy fácil e intuitivo, todo el código está explicado de igual forma en el repositorio. También se le fueron agregando otros detalles que no son necesarios para que funcione bien pero es estético."
    },
    {
        nombre: "Lista de Tareas",
        nivel: "Básico",
        descripcion: "Proyecto en el cuál podrás escribir tareas, puedes marcarlas como hechas, removerlas o modificarlas. Es funcional y bastante simple, útil también.",
        imagen: "todo-list.webp",
        url: "lista-tareas",
        funcionamiento: "Este proyecto funciona principalmente con las siguientes funciones: Bucles y Funciones. Los bucles nos permitirán colocar por cada entrada una nueva tarjeta que incluye el contenido que el usuario coloque, las respectivas funciones simplemente harán el trabajo de pasar ese valor de texto a un array el cuál será el que va a ir formando cada tarjeta. Como puedes observar, hacerlo en Vite es más sencillo si revisas el código fuente en GitHub. Sin embargo, hacerlo en JavaScript puro tampoco es díficil. Sin embargo, tienes que tener en cuenta otros elementos como crear elementos, agregarlos a la página, etc. Puedes consultar el código en JavaScript puro en el repositorio."
    },
    {
        nombre: "Reloj Digital",
        nivel: "Básico",
        descripcion: "Proyecto el cual mostrará la hora de manera básica, con un formato de 24 horas, no tiene opciones para cambiar las mismas. Es básico y funcional.",
        imagen: "reloj-digital.webp",
        url: "reloj-digital",
        funcionamiento: "Este proyecto funciona mediante el uso de funciones, las cuáles son las funciones Date(), estás funciones nos permite obtener la fecha actual, al obtenerla podemos sacar de ella múltiple información, entre ella lo que nos interesa en este caso que son los datos de: Hora, Minutos, Segundos. <br/><br/> <a href='https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date/now' class='font-bold text-blue-500'>Date.now() - Mozilla</a>"
    },
    {
        nombre: "Generador de Números",
        nivel: "Básico",
        descripcion: "Proyecto el cual te generará números al azar (1 al 100).",
        imagen: "gen-number.webp",
        url: "generador-numeros",
        funcionamiento: "Este proyecto funciona utilizando nada más que funciones, como podrás notar es un proyecto MUY básico, parecido a el generador de números aleatorio de Google. Aquí simplemente utilizamos las funciones Math() para obtener un valor al azar entre el que el usuario escogió en el input."
    },
    {
        nombre: "Piedra Papel y Tijera",
        nivel: "Intermedio",
        descripcion: "¡Un minijuego! Enfrentate a un BOT a un juego básico de Piedra Papel y Tijera. Cumple con su función básica.",
        imagen: "ppt-game.webp",
        url: "PPT",
        funcionamiento: "Este proyecto, aunque ya avanzamos de nivel si tienes la suficiente lógica notarás que no es tan complicado. Al tener a nuestra disposición herramientas tan útiles como JSONs, Arrays, Filter, Map. Podemos usarlo a nuestro favor respectivamente. Aquí también hay un uso de funciones como Math(). Realizar este proyecto en Vite es más sencillo que en JavaScript puro."
    },
    {
        nombre: "Quiz App",
        nivel: "Intermedio",
        descripcion: "¡Otro minijuego! Este proyecto se basa en acertar preguntas, ¿qué tanto sabes? Las preguntas son de forma manual sin API.",
        imagen: "quiz-app.webp",
        url: "QuizApp",
        funcionamiento: "Este proyecto, es un poco más complicado y un poco tedioso, pero NO díficil, simplemente es un poco más largo de realizar ya que tenemos que tener en cuenta varios aspectos si queremos darle un aspecto más divertidos, en este caso las herramientas que usamos son: JSON, Intervalos, Math() y algunas otras. Se utilizan estas funciones para: Las preguntas (JSON), El contador, puntuación y tiempo restante (Intervalos), El sorteo o randomizador de preguntas (Math). Todo esto nos da como resultado un bonito juego."
    },
    {
        nombre: "Pomodoro Timer",
        nivel: "Intermedio",
        descripcion: "Proyecto dónde pondremos a práctica una técnica de estudio. 25 minutos de concentración, 5 minutos de descanso corto, 15 minutos de descanso largo. (Después de 4 pomodoros)",
        imagen: "pomodoroTimer.webp",
        url: "pomodoro",
        funcionamiento: "..."
    },
    {
        nombre: "Buscador de Peliculas",
        nivel: "Intermedio",
        descripcion: "Proyecto dónde buscaremos películas con una API (OMDB). Con una estética visual bastante limpia y fácil de entender.",
        imagen: "buscadorPeliculas.webp",
        url: "buscador-peliculas",
        funcionamiento: "Este proyecto es un poco más complicado ya que tiene un uso de API, en este caso usamos la API de OMDB, la cuál es gratuita y fácil de usar. Aquí utilizamos funciones como Fetch() para obtener los datos de la API y luego mostrarlos en pantalla."
    },
    {
        nombre: "Generador de Memes",
        nivel: "Intermedio",
        descripcion: "",
        imagen: "",
        url: "meme-generator",
        funcionamiento: ""
    }
];

export default proyectos;