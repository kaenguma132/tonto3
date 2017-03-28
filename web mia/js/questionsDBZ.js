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
var docXML; //variable para documento XML global, para modificarlo y serializarlo (y sacarlo por pantalla)
var docXSL = null; // variable para documento XSL
var useranswer = null; // variables para crear el elemento de respuesta del usuairo en el XML

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function()
{
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
			docXSL=this.responseXML;
		}
	};
	httpXSL.open("GET", "xml/questions.xsl", true);
	httpXSL.send();
	//CORREGIR al apretar el botón
	formElement=document.getElementById('formDBZ');
	formElement.onsubmit=function()
	{
		if(comprobar(formElement))
		{
		inicializar();
		// correccion pregunta 1
		corregirTexto(formElement.getElementsByClassName("texto")[0].value, 
			res_dbz1_text, docXML.getElementById("dbz01"));
		// correccion pregunta 2
		corregirTexto(formElement.getElementsByClassName("texto")[1].value, 
			res_dbz2_text, docXML.getElementById("dbz02"));
		// correccion pregunta 3
		corregirSelectSimple(formElement.getElementsByTagName("select")[0], 
			res_dbz3_sel, docXML.getElementById("dbz03"));
		// correccion pregunta 4
		corregirSelectSimple(formElement.getElementsByTagName("select")[1], 
			res_dbz4_sel, docXML.getElementById("dbz04"));
		// correcion pregunta 5
		corregirSelectMultiple(formElement.getElementsByTagName("select")[2], 
			res_dbz5_mul, docXML.getElementById("dbz05"));
		// correcion pregunta 6
		corregirRadio(formElement.tiempo, 
			res_dbz6_rad, docXML.getElementById("dbz06"), "tiempo");
		// correccion pregunta 7
		corregirCheckbox(formElement.saiyajin, 
			res_dbz7_chb, docXML.getElementById("dbz07"), "saiyajin");
		// correccion pregunta 8
		corregirCheckbox(formElement.enemigo, 
			res_dbz8_chb, docXML.getElementById("dbz08"), "enemigo");
		// correcion pregunta 9
		corregirRadio(formElement.personaje, 
			res_dbz9_rad, docXML.getElementById("dbz09"), "personaje");
		// correcion pregunta 5
		corregirSelectMultiple(formElement.getElementsByTagName("select")[3], 
			res_dbz10_mul, docXML.getElementById("dbz10"));
		mostrarNota();
		}
		else
		{
			alert("Tienes una o más preguntas sin contestar");
		}
		return false;
	}
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// docXML es el documento leido XML. 
function gestionarXml(datosXML)
{
	docXML = datosXML.responseXML; //Parse XML to xmlDoc

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

function corregirTexto(valor, correcta, preguntaXML)
{
	if(valor.toLowerCase() == correcta.toLowerCase())
	{
		nota += 1;
	}
	useranswer = docXML.createElement("useranswer");
	useranswer.innerHTML = valor;
	preguntaXML.appendChild(useranswer);
}

function corregirSelectSimple(select, correcta, preguntaXML)
{
	/* 
		respuestaUser es el indice que ha seleccionado el usuario
	*/
	if(select.selectedIndex == correcta)
	{
		nota += 1;
	}
	useranswer = docXML.createElement("useranswer");
	useranswer.innerHTML = select.selectedIndex+1;
	preguntaXML.appendChild(useranswer);
}

function corregirSelectMultiple(select, correctas, preguntaXML)
{
	var escorrecta = [];
	for(i = 0; i < select.length; i++)
	{
		if(select[i].selected)
		{
			useranswer = docXML.createElement("useranswer");
			useranswer.innerHTML = i+1;
			preguntaXML.appendChild(useranswer);
			escorrecta[i] = false;
			for (j = 0; j < correctas.length; j++)
			{
				if(i == correctas[j])
				{
					escorrecta[i] = true;
				}
			}
			if(escorrecta[i])
			{
				nota += 1/correctas.length;
			}
			else
			{
				nota -= 1/correctas.length;
			}
		}
	}
}

function corregirCheckbox(checkbox, correctas, preguntaXML, atributo)
{
	var escorrecta = [];
	for(i = 0; i < checkbox.length; i++)
	{
		if(checkbox[i].checked)
		{
			useranswer = docXML.createElement("useranswer");
			useranswer.innerHTML = i+1;
			preguntaXML.appendChild(useranswer);
			escorrecta[i] = false;
			for (j = 0; j < correctas.length; j++)
			{
				if(i == correctas[j])
				{
					escorrecta[i] = true;
				}
			}
			if(escorrecta[i])
			{
				nota += 1/correctas.length;
			}
			else
			{
				nota -= 1/correctas.length;
			}
		}
	}
}

function corregirRadio(radio, correcta, preguntaXML, atributo)
{
	var respuesta_usuario;
	for(i = 0; i < radio.length; i++)
	{
		// cuando encontremos el valor seleccionado, cambiamos el value y salimos del for
		if(radio[i].checked)
		{
			respuesta_usuario = i;
			useranswer = docXML.createElement("useranswer");
			useranswer.innerHTML = i+1;
			preguntaXML.appendChild(useranswer);
			break;
		}
	}
	if(respuesta_usuario == correcta)
	{
		nota += 1;
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
	document.getElementById('correcciones').style.display = "block";
	//Código transformación xslt con xmlDoc y xslDoc
	if (document.implementation && document.implementation.createDocument)
	{
		xsltProcessor = new XSLTProcessor();
		xsltProcessor.importStylesheet(docXSL);
		resultDocument = xsltProcessor.transformToFragment(docXML, document);
		document.getElementById('correcciones').appendChild(resultDocument);
	}
	mostrarCorreccion("Tu nota es de " + nota + " punto(s) sobre 10.");
	//bloquear formulario (recargar para volver a empezar)
	var e = formElement.elements;
	for (var i = 0, len = e.length; i < len; ++i)
	{
		e[i].disabled = true;
	}
}

function comprobar(examen)
{
	var comprobarOK = true;
	// variables para comprobar si las preguntas estan contestadas
	var multiple1Check = false;
	var tiempoCheck = false;
	var saiyajinCheck = false;
	var enemigoCheck = false;
	var personajeCheck = false;
	var multiple2Check = false;
	for (var i = 0; i < examen.getElementsByTagName("select")[2].length; i++)
	{
		if(examen.getElementsByTagName("select")[2][i].selected)
		{
			multiple1Check = true;
			break;
		}
	}
	for (var i = 0; i < examen.tiempo.length; i++)
	{
		if(examen.tiempo[i].checked)
		{
			tiempoCheck = true;
			break;
		}
	}
	for (var i = 0; i < examen.saiyajin.length; i++)
	{
		if(examen.saiyajin[i].checked)
		{
			saiyajinCheck = true;
			break;
		}
	}
	for (var i = 0; i < examen.enemigo.length; i++)
	{
		if(examen.enemigo[i].checked)
		{
			enemigoCheck = true;
			break;
		}
	}
	for (var i = 0; i < examen.personaje.length; i++)
	{
		if(examen.personaje[i].checked)
		{
			personajeCheck = true;
			break;
		}
	}
	for (var i = 0; i < formElement.getElementsByTagName("select")[3].length; i++)
	{
		if(formElement.getElementsByTagName("select")[3][i].selected)
		{
			multiple2Check = true;
			break;
		}
	}
	/*
	switch(true)
	{
		case (examen.getElementsByClassName("texto")[0].value == ""):
			mensaje += "Pregunta 1 sin contestar\n";
		case (examen.getElementsByClassName("texto")[1].value == ""):
			mensaje += "Pregunta 2 sin contestar\n";
		case (examen.getElementsByTagName("select")[0].selectedIndex == 0):
			mensaje += "Pregunta 3 sin contestar\n";		
		case (examen.getElementsByTagName("select")[1].selectedIndex == 0):
			mensaje += "Pregunta 4 sin contestar\n";
	}
	*/
	if(examen.getElementsByClassName("texto")[0].value == "")
	{
		comprobarOK = false;
	}
	if(examen.getElementsByClassName("texto")[1].value == "")
	{
		comprobarOK = false;
	}
	if(examen.getElementsByTagName("select")[0].selectedIndex == 0)
	{
		comprobarOK = false;
	}
	if(examen.getElementsByTagName("select")[1].selectedIndex == 0)
	{
		comprobarOK = false;
	}
	if(!multiple1Check)
	{
		comprobarOK = false;
	}
	if(!tiempoCheck)
	{
		comprobarOK = false;
	}
	if(!saiyajinCheck)
	{
		comprobarOK = false;
	}
	if(!enemigoCheck)
	{
		comprobarOK = false;
	}
	if(!personajeCheck)
	{
		comprobarOK = false;
	}
	if(!multiple2Check)
	{
		comprobarOK = false;
	}
	return comprobarOK;
}

function inicializar()
{
	document.getElementById('correcciones').innerHTML = "Aqui ira la nota final";
	nota = 0;
}