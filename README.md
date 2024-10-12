# DOM MANIPULATION

En este ejercicio, vamos a desarrollar un gestor de tareas utilizando JavaScript y manipulando el DOM para interactuar con la interfaz de usuario. El objetivo es crear una aplicación sencilla que permita a los usuarios añadir, filtrar, completar, eliminar y priorizar tareas, todo esto sin utilizar librerías externas, solo HTML, CSS y JavaScript puro.


DEMO: https://ironptsolutions.github.io/js-dom-manuputation/index.html


# Iteración 1

Esta iteración ya la hemos completado durante la semana de clase, hemos listado las tareas y añadido un botón de borrar.


# Iteración 2

Añadimos un input y un botón. El objetivo es capturar tanto el evento de clic en el botón como el de presionar la tecla Enter. Si el input contiene texto, se creará una nueva tarea con esa información. Una vez agregada a la lista de tareas, se mostrará en pantalla y el campo de entrada se limpiará para poder añadir nuevas tareas.

# Iteración 3

En **el formulario de creación de tareas**, añadiremos un select para permitir seleccionar la prioridad de cada tarea. Los íconos de prioridad se encuentran en assets/img/icon/priority. Es importante tener en cuenta que, más adelante, implementaremos funcionalidades para ordenar y filtrar las tareas según su prioridad. Por ello, asegúrate de guardar la información de la prioridad de forma que sea fácilmente ordenable. Luego, al mostrar las tareas en la lista, representa esta prioridad visualmente utilizando el ícono correspondiente.

Para simplificar, el select solo mostrará opciones de texto con las siguientes prioridades disponibles:

- Critical
- High
- Medium
- Low
- Minor

En este punto, el método add del tipo TaskManager se nos quedará pequeño. Debes evolucionarlo para que el argumento que recibe, en lugar de ser un simple `string (name)`, sea un **objeto** con dos atributos: `name` y `priority`.

Además, en la función render, será necesario agregar el código JavaScript que permita mostrar el ícono correspondiente a la prioridad, dependiendo del valor seleccionado.

> pista: dale un nombre adecuado al `select` de **prioridad**!
> pista: Ten en cuenta que los `value` de un string siempre son de tipo String!

# Iteración 4

Añade un nuevo ícono en el contenedor de acciones de cada tarea que permita marcarla como completada. Las tareas completadas aparecerán en la lista con el texto tachado, el fondo de la lista en gris y no podrán ser eliminadas.


# Iteración 5

Añade un filtro de tareas por prioridad, pudiendo verlas todas o sólo las de la prioridad seleccionada.

# Bonus

Añade un input de calendario al formulario para que los usuarios puedan seleccionar la fecha de la tarea. Las tareas se mostrarán ordenadas cronológicamente, y aquellas con una fecha que coincida con el día de hoy tendrán un fondo amarillo en la lista. Si una tarea tiene una fecha del pasado y no está completada, se mostrará en rojo.