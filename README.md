# post-knockout

Post de jotaeseymas.wordpress.com en el que explico el uso de la librería Knockout.js con un sencillo ejemplo

## Bindings usados

- `data-bind` es el atributo que le indica a **Knockout.js** que debe hacer un binding de un comportamiento definido en la parte ViewModel de la arquitectura. Tiene una amplia gama de bindings:

- **Bindings de apariencia:**

  + `attr` permite que un atributo HTML específico sea añadido al DOM.
  + `text` permite que un valor aparezca como texto plano dentro del DOM.

- **Bindings de control de flujo:**

  + `foreach` permite iterar acciones sobre un valor Array (observable o no).

- **Bindings para formularios HTML:**

  + `click` permite añadir listeners el evento *onclick* del DOM.
  + `value` permite mostrar cualquier valor en el elemento DOM.
  + `options` permite asignar a un elemento `select` sus valores como Array.
  + `selectedOptions` permite observar las selecciones en un elemento `select` con opción para selección mútiple.

## Helpers para usar bindings

**Knockout.js** usa un árbol aparte del DOM para incrustar los elementos que contienen bindings, esto es, para facilitar el rastreo una vez que hayan sido declarados los bindings, por esto, se hace necesario incluir objetos del árbol de Knockout.js en el caso de que un binding haya sido declarado:

```text
$root     <- Scope más externo (generalmente asociado al objeto document, padre de todos los objetos)
|
> $parent <- Scope padre de los datos (generalmente asociado al binding declarado con applyBindings()
  |
  > $data <- Scope de los datos (generalmente asociado al binding de valores observables)
```

Sucede a menudo que al usar el binding `foreach` u otro para iterar sobre un array, los métodos declarados en los bindings superiores no son vistos, ya que en el árbol de elementos de **Knockout.js** se está iterando sobre el scope de los datos, para usar elementos en un scope superior, se anexa el helper `$parent` o el helper `$root` 
