var formElement = null;
var res_dbz1_text = null;
var res_dbz2_text = null;
var res_dbz3_sel = null;
var res_dbz4_sel = null;
var res_dbz5_mul = [];
var res_dbz6_rad = null;
var res_dbz7_chb = [];
var res_dbz8_chb = [];
var res_dbz9_rad = null;
var res_dbz10_mul = [];
var nota = 0;  //nota de la prueba sobre 10 puntos (hay 10 preguntas)
var docXML = null; //variable para documento XML global, para modificarlo y serializarlo (y sacarlo por pantalla)
var docXSL = null; // variable para documento XSL

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function()
{
	//Cargamos formulario
	formElement = document.getElementById('formDBZ');
	//LEER XML de xml/questions.xml
	var httpXML = new XMLHttpRequest();
	httpXML.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			gestionarXml(this);
		}
	};
	httpXML.open("GET", "xml/questions.xml", true);
	httpXML.send();
	//LEER XSL de xml/questions.xml
	var httpXSL = new XMLHttpRequest();
	httpXSL.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			docXSL = this.responseXML;
		}
	};
	httpXSL.open("GET", "xml/questions.xsl", true);
	httpXSL.send();
	//CORREGIR al apretar el botón
	formElement.onsubmit=function()
	{
		inicializar();
		// correcion pregunta 1
		corregirTexto(formElement.getElementsByClassName("texto")[0].value, 
			res_dbz1_text, "P1: Correcto", 
			"P1: Incorrecto, la respuesta correcta es: " + res_dbz1_text);
		// correcion pregunta 2
		corregirTexto(formElement.getElementsByClassName("texto")[1].value, 
			res_dbz2_text, "P2: Correcto", 
			"P2: Incorrecto, la respuesta correcta es: " + res_dbz2_text);
		// correcion pregunta 3
		corregirSelectSimple(formElement.getElementsByTagName("select")[0], 
			res_dbz3_sel, "P3: Correcto",
			"P3: Incorrecta, la respuesta correcta es: ");
		// correcion pregunta 4
		corregirSelectSimple(formElement.getElementsByTagName("select")[1], 
			res_dbz4_sel, "P4: Correcto",
			"P4: Incorrecta, la respuesta correcta es: ");
		// correcion pregunta 5
		corregirSelectMultiple(formElement.getElementsByTagName("select")[2], 
			res_dbz5_mul, "P5: Correcto",
			"P5: Incorrecta, las respuestas correctas son: ");
		// correcion pregunta 6
		corregirRadio(formElement.tiempo, 
			res_dbz6_rad, "P6: Correcto",
			"P6: Incorrecta, la respuesta correcta es: ", "tiempo");
		// correcion pregunta 7
		corregirCheckbox(formElement.saiyajin, 
			res_dbz7_chb, "P7: Correcto",
			"P7: Incorrecta, las respuestas correctas son: ", "saiyajin");
		// correcion pregunta 8
		corregirCheckbox(formElement.enemigo, 
			res_dbz8_chb, "P8: Correcto",
			"P8: Incorrecta, las respuestas correctas son: ", "enemigo");
		// correcion pregunta 9
		corregirRadio(formElement.personaje, 
			res_dbz9_rad, "P9: Correcto",
			"P9: Incorrecta, la respuesta correcta es: ", "personaje");
		// correcion pregunta 10
		corregirSelectMultiple(formElement.getElementsByTagName("select")[3], 
			res_dbz10_mul, "P10: Correcto",
			"P10: Incorrecta, la respuestas correctas son: ");
		mostrarNota();
		return false;
	}
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML.
function gestionarXml(datosXML)
{
	// Aqui pillamos el documento XML
	var docXML = datosXML.responseXML;
	// Llamar a pregunta XML
	var preguntaXML;
	// Elemento HTML donde va la pregunta
	var preguntaHTML;
	// opciones que tendra un select, un radio, etc
	var num_opciones;
	// cogemos la select
	var selectHTML;
	// array de opciones en una checkbox o radio
	var checkradioOpciones = [];
	// numero de respuestas de chechbox
	var num_res_checkbox;
	// cogemos la checkbox
	var checkboxHTML;
	// cogemos la radio button;
	var radioHTML;
	// numero de respuestas de multiple
	var num_res_mul;
	// variables de xpath
	var xpath;
	

	//pregunta 1
	preguntaXML = docXML.getElementsByTagName("title")[0].innerHTML;
	preguntaHTML = document.getElementById("dbz01");
	ponerDatosInputHtml(preguntaHTML, preguntaXML);
	res_dbz1_text = docXML.getElementById("dbz01").getElementsByTagName("answer")[0].innerHTML;

	//pregunta 2
	preguntaXML = docXML.getElementsByTagName("title")[1].innerHTML;
	preguntaHTML = document.getElementById("dbz02");
	ponerDatosInputHtml(preguntaHTML, preguntaXML);
	res_dbz2_text = docXML.getElementById("dbz02").getElementsByTagName("answer")[0].innerHTML;

	//pregunta 3
	preguntaXML = docXML.getElementsByTagName("title")[2].innerHTML;
	preguntaHTML = document.getElementById("dbz03");
	selectHTML = document.getElementsByTagName("select")[0];
	xpath = "/questions/question[@id='dbz03']/option";
	num_opciones = docXML.evaluate(xpath, docXML, null, XPathResult.ANY_TYPE, null);
	ponerDatosSelectHtml(preguntaHTML, preguntaXML, selectHTML, num_opciones);
	res_dbz3_sel = parseInt(docXML.getElementById("dbz03").getElementsByTagName("answer")[0].innerHTML);

	//pregunta 4
	preguntaXML = docXML.getElementsByTagName("title")[3].innerHTML;
	preguntaHTML = document.getElementById("dbz04");
	selectHTML = document.getElementsByTagName("select")[1];
	xpath = "/questions/question[@id='dbz04']/option";
	num_opciones = docXML.evaluate(xpath, docXML, null, XPathResult.ANY_TYPE, null);
	ponerDatosSelectHtml(preguntaHTML, preguntaXML, selectHTML, num_opciones);
	res_dbz4_sel = parseInt(docXML.getElementById("dbz04").getElementsByTagName("answer")[0].innerHTML);

	//pregunta 5
	preguntaXML = docXML.getElementsByTagName("title")[4].innerHTML;
	preguntaHTML = document.getElementById("dbz05");
	selectHTML = document.getElementsByTagName("select")[2];
	xpath = "/questions/question[@id='dbz05']/option";
	num_opciones = docXML.evaluate(xpath, docXML, null, XPathResult.ANY_TYPE, null);
	ponerDatosSelectHtml(preguntaHTML, preguntaXML, selectHTML, num_opciones);
	num_res_mul = docXML.getElementById("dbz05").getElementsByTagName("answer").length;
	for(i = 0; i < num_res_mul; i++)
	{
		res_dbz5_mul[i] = parseInt(docXML.getElementById("dbz05").getElementsByTagName("answer")[i].innerHTML);
	}

	//pregunta 6
	preguntaXML = docXML.getElementsByTagName("title")[5].innerHTML;
	preguntaHTML = document.getElementById("dbz06");
	radioHTML = document.getElementsByClassName("radio")[0];
	xpath = "/questions/question[@id='dbz06']/option";
	num_opciones = docXML.evaluate(xpath, docXML, null, XPathResult.ANY_TYPE, null);
	ponerDatosCheckboxRadioHtml(preguntaHTML, preguntaXML, radioHTML, num_opciones, "tiempo", "radio");
	res_dbz6_rad = parseInt(docXML.getElementById("dbz06").getElementsByTagName("answer")[0].innerHTML);
	checkradioOpciones = [];

	//pregunta 7
	preguntaXML = docXML.getElementsByTagName("title")[6].innerHTML;
	preguntaHTML = document.getElementById("dbz07");
	checkboxHTML = document.getElementsByClassName("checkbox")[0];
	xpath = "/questions/question[@id='dbz07']/option";
	num_opciones = docXML.evaluate(xpath, docXML, null, XPathResult.ANY_TYPE, null);
	ponerDatosCheckboxRadioHtml(preguntaHTML, preguntaXML, checkboxHTML, num_opciones, "saiyajin", "checkbox");
	num_res_checkbox = docXML.getElementById("dbz07").getElementsByTagName("answer").length;
	for(i = 0; i < num_res_checkbox; i++)
	{
		res_dbz7_chb[i] = parseInt(docXML.getElementById("dbz07").getElementsByTagName("answer")[i].innerHTML);
	}
	checkradioOpciones = [];

	//pregunta 8
	preguntaXML = docXML.getElementsByTagName("title")[7].innerHTML;
	preguntaHTML = document.getElementById("dbz08");
	checkboxHTML = document.getElementsByClassName("checkbox")[1];
	xpath = "/questions/question[@id='dbz08']/option";
	num_opciones = docXML.evaluate(xpath, docXML, null, XPathResult.ANY_TYPE, null);
	ponerDatosCheckboxRadioHtml(preguntaHTML, preguntaXML, checkboxHTML, num_opciones, "enemigo", "checkbox");
	num_res_checkbox = docXML.getElementById("dbz08").getElementsByTagName("answer").length;
	for(i = 0; i < num_res_checkbox; i++)
	{
		res_dbz8_chb[i] = parseInt(docXML.getElementById("dbz08").getElementsByTagName("answer")[i].innerHTML);
	}
	checkradioOpciones = [];

	//pregunta 9
	preguntaXML = docXML.getElementsByTagName("title")[8].innerHTML;
	preguntaHTML = document.getElementById("dbz09");
	radioHTML = document.getElementsByClassName("radio")[1];
	xpath = "/questions/question[@id='dbz09']/option";
	num_opciones = docXML.evaluate(xpath, docXML, null, XPathResult.ANY_TYPE, null);
	ponerDatosCheckboxRadioHtml(preguntaHTML, preguntaXML, radioHTML, num_opciones, "personaje", "radio");
	res_dbz9_rad = parseInt(docXML.getElementById("dbz09").getElementsByTagName("answer")[0].innerHTML);
	checkradioOpciones = [];

	//pregunta 10
	preguntaXML = docXML.getElementsByTagName("title")[9].innerHTML;
	preguntaHTML = document.getElementById("dbz10");
	selectHTML = document.getElementsByTagName("select")[3];
	xpath = "/questions/question[@id='dbz10']/option";
	num_opciones = docXML.evaluate(xpath, docXML, null, XPathResult.ANY_TYPE, null);
	ponerDatosSelectHtml(preguntaHTML, preguntaXML, selectHTML, num_opciones);
	num_res_mul = docXML.getElementById("dbz10").getElementsByTagName("answer").length;
	for(i = 0; i < num_res_mul; i++)
	{
		res_dbz10_mul[i] = parseInt(docXML.getElementById("dbz10").getElementsByTagName("answer")[i].innerHTML);
	}

}

//****************************************************************************************************
// poner los datos recibidos en el HTML
function ponerDatosInputHtml(elementoHTML, elementoXML)
{
	elementoHTML.innerHTML = elementoXML;
}

function ponerDatosSelectHtml(elementoHTML, elementoXML, selectHTML, nodos)
{
	elementoHTML.innerHTML = elementoXML;
	var i = 0;
	for (var resultado = nodos.iterateNext(); resultado; resultado = nodos.iterateNext())
	{
		option = document.createElement("option");
		option.text = resultado.innerHTML;
		option.value = i; i++;
		selectHTML.options.add(option);
	}
}

function ponerDatosCheckboxRadioHtml(elementoHTML, elementoXML, checkboxradioHTML, nodos, atributo, tipo)
{
	elementoHTML.innerHTML = elementoXML;
	var input;
	var label;
	var i = 0;
	for (var resultado = nodos.iterateNext(); resultado; resultado = nodos.iterateNext())
	{
		input = document.createElement("input");
		label = document.createElement("label");
		label.innerHTML = resultado.innerHTML;
		label.setAttribute("id", atributo+i);
		input.type = tipo;
		input.name = atributo;
		checkboxradioHTML.appendChild(input);
		checkboxradioHTML.appendChild(label);
		checkboxradioHTML.appendChild(document.createElement("br"));
	}
}

//****************************************************************************************************
//implementación de la corrección

function corregirTexto(valor, correcta, mensajeOK, mensajeError)
{
	if(valor.toLowerCase() == correcta.toLowerCase())
	{
		mostrarCorreccion(mensajeOK);
		nota += 1;
	}
	else
	{
		mostrarCorreccion(mensajeError);
	}
}

function corregirSelectSimple(select, correcta, mensajeOK, mensajeError)
{
	if(select.value == correcta)
	{
		mostrarCorreccion(mensajeOK);
		nota += 1;
	}
	else
	{
		mostrarCorreccion(mensajeError + select[correcta].innerHTML);
	}
}

function corregirSelectMultiple(select, correctas, mensajeOK, mensajeError)
{
	var respuestas = [];
	var texto_correctas = [];
	// este for es para imprimir luego el mensaje de error
	for(i = 0; i < correctas.length; i++)
	{
		// select[correctas[i]].innerHTML = formElement.getElementsByTagName("select")[2][res_dbz5_mul[i]].innerHTML
		texto_correctas[i] = select[correctas[i]].innerHTML;
	}
	// esto es para recoger las respuestas que ha marcado el usuario
	for(j = 0; j < select.length; j++)
	{
		// si tenemos una opcion seleccionada, la guardamos dentro de una array de respuestas
		if(select[j].selected)
		{
			respuestas[respuestas.length] = j;
		}
	}
	// si las arrays no son iguales, dara mensaje de error
	if(respuestas.length == correctas.length)
	{
		for(k = 0; k < respuestas.length; k++)
		{
			// si las respuestas son iguales, no saltara el break
			if(respuestas[k] != correctas[k])
			{
				mostrarCorreccion(mensajeError + texto_correctas.join(", "));
				break;
			}
			mostrarCorreccion(mensajeOK);
		}
	}
	else
	{
		mostrarCorreccion(mensajeError + texto_correctas.join(", "));
	}
}

function corregirRadio(radio, correcta, mensajeOK, mensajeError, atributo)
{
	// ponemos valor -1 por si el usuario no ha seleccionado ninguna, que tenga algo que comparar
	var value = -1;
	for(i = 0; i < radio.length; i++)
	{
		// cuando encontremos el valor seleccionado, cambiamos el value y salimos del for
		if(radio[i].checked)
		{
			value = i;
			break;
		}
	}
	if(value == correcta)
	{
		mostrarCorreccion(mensajeOK);
		nota += 1;
	}
	else
	{
		mostrarCorreccion(mensajeError + document.getElementById(atributo+correcta).innerHTML);
	}
}

function corregirCheckbox(checkbox, correctas, mensajeOK, mensajeError, atributo)
{
	var respuestas = [];
	var texto_correctas = [];
	// este for es para imprimir luego el mensaje de error
	for(i = 0; i < correctas.length; i++)
	{
		// select[correctas[i]].innerHTML = formElement.getElementsByTagName("select")[2][res_dbz5_mul[i]].innerHTML
		texto_correctas[i] = document.getElementById(atributo+correctas[i]).innerHTML;
	}
	// esto es para recoger las respuestas que ha marcado el usuario
	for(j = 0; j < checkbox.length; j++)
	{
		// si tenemos una opcion seleccionada, la guardamos dentro de una array de respuestas
		if(checkbox[j].checked)
		{
			respuestas[respuestas.length] = j;
		}
	}
	// si las arrays no son iguales, dara mensaje de error
	if(respuestas.length == correctas.length)
	{
		for(k = 0; k < respuestas.length; k++)
		{
			// si las respuestas son iguales, no saltara el break
			if(respuestas[k] != correctas[k])
			{
				mostrarCorreccion(mensajeError + texto_correctas.join(", "));
				break;
			}
			mostrarCorreccion(mensajeOK);
		}
	}
	else
	{
		mostrarCorreccion(mensajeError + texto_correctas.join(", "));
	}
}

function mostrarCorreccion(texto)
{
	var parrafo = document.createElement("p");
	var contenido = document.createTextNode(texto);
	parrafo.appendChild(contenido);
	document.getElementById('correcciones').appendChild(parrafo);
}

function mostrarNota()
{
	mostrarCorreccion("Tu nota es de " + nota + " punto(s) sobre 10.");
}

function inicializar()
{
	document.getElementById('correcciones').innerHTML = "";
	nota = 0;
}