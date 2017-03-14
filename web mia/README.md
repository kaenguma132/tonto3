# Realizacion examen
 <b><i>js/questionsDBZ.js</i> </b> 

En este ejercicio lo he tenido que dividir en diferentes <b>apartados </b> ya que es bastante complejo para mi entendimiento en parte superior de de la archivo<b> .js </b> estan declaradas las variable empezando por la de <i>for element=null</i> las demas son <i></br> res_dbz1_text = null;</br>var res_dbz2_text = null;</br>var res_dbz3_sel = null;</br>var res_dbz4_sel = null;</br>
var res_dbz5_mul = [];</br>var res_dbz6_rad = null;</br>var res_dbz7_chb = [];</br>var res_dbz8_chb = [];</br> var res_dbz9_rad = null;</br>var res_dbz10_mul = [];</br>var nota = 0;</br> </br> Una vez declarado las variables principales tenemos que indicarle de donde vamos a cargar el formulario en mi caso sera <b>	formElement = document.getElementById('formDBZ');</b> y acto seguido la siguiente var se usa para poder mostrar el formulario a trabes del <b>Html</b> acto seguido esta la función que ara cuando se carga la pagina que es cargar lo que pasara cuando se pulse el botón de corregir asta el punto de que se cargue la nota</br> En el siguiente  apartado tratamos la conexión que hay entre el <b>html y el xml</b> ya que este archivo hace de puente entre estos tos todas estas instrucciones hacen referencia a como ira mostrándose en la pagina en la cual creo ciertas variables que solo afectaran a este apartado en este Readmi no lo explico ya que en el propio archivo he ido poniendo que hace cada cosa y si lo pongo aquí se ara muy largo<br>En este apartado que viene después es lo que uso son <b>funcionos para poner los datos</b>(texto,select, y checkbox)después van las las funciones de corregirTexto
corregirSelectSimple corregirSelectMultiple corregirRadio corregirCheckbox que dentro de estos apartados tienen sus propios valores <B>TODO ESTA EXPLICADO DETRO DEL ARCHIVO JS.JSO CASI  TODO</B>  después van estas funciones que no tiene ningún misterio function mostrarCorreccion function mostrarNota function inicializar

 <b><i>css/estilo.css</i> </b> 

Des este archivo hay poco que decir ya que es donde va  el estilo que se mostrara en la pagina de html en mi caso es muy simple ya que no se manejarlo en absoluto se 4 cosas contadas y poco mas


 <b><i>indice.html</i> </b>

Aqui es donde se mostrara todo el cuestionario hay la verdad que no si esta bien así pero es como creo que ha quedado mejor para el nivel que tengo de lenguaje de marca a la jora de hacer el validacion me sale unas advertencias con respectos a las id que uso en los h3 y no se por que son pero el validador esta ok me la da por bueno a mi </br>a mi opinión personal en esta practica no buscamos hacer esto elegantes es aprender a hacer el js por lo cual no me he esmerado en hacerlo bonito ya que no le encuentro la utilidad a eso en esta practica

<b><i>xml/question</i> </b>

Aquí esta el formulario que cogemos para mostrarlo en html están los 2 validadores del cual escojo uno e ellos para hacer esta practica  