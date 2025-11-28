# Documentación de la Actividad 21
## Sistema de Encriptación y Desencriptación con Matriz (Hill Cipher Mod 27)

---

## 1. Descripción del Proyecto

Este proyecto consiste en la creación de un encriptador y desencriptador basado en el cifrado Hill.  
El sistema permite al usuario ingresar un mensaje y una matriz clave 2x2 para producir un texto cifrado.  
También permite ingresar un mensaje cifrado y obtener el original si la clave es invertible en aritmética modular.

Incluye:

- Interfaz en HTML y CSS.
- Lógica criptográfica implementada en JavaScript.
- Soporte para letras, números y espacio.
- Aritmética modular usando mod 27.
- Validación automática de la matriz para verificar si es invertible.

Es un proyecto enfocado en comprender los principios del cifrado clásico por matrices y aplicarlos a un entorno web.

---

## 2. Instrucciones de Uso

### 2.1 Para encriptar un mensaje

1. Escribe tu mensaje en el campo de texto.  
2. Ingresa los cuatro valores de la matriz clave 2x2.  
3. Presiona el botón Encriptar.  
4. El sistema mostrará:
   - El mensaje convertido en números.
   - Los bloques aplicados a la matriz.
   - El resultado final cifrado.

### 2.2 Para desencriptar un mensaje

1. Escribe el mensaje cifrado.  
2. Ingresa la misma matriz clave 2x2 que se usó al encriptar.  
3. Presiona Desencriptar.  
4. Si la matriz es invertible en mod 27, el sistema:
   - Calculará la matriz inversa.
   - Aplicará la matriz inversa a los bloques.
   - Convertirá los valores numéricos nuevamente a caracteres.
   - Mostrará el mensaje original.

### 2.3 En caso de error

El sistema mostrará mensajes en caso de:
- Caracteres no permitidos.
- Matriz no invertible (no se puede desencriptar).
- Falta de valores en la matriz.

---

## 3. Conjunto de Caracteres Utilizado

El cifrado trabaja con un alfabeto de 27 símbolos

Cada símbolo tiene un valor numérico


---

## 4. Matemáticas del Algoritmo

Este proyecto implementa una versión del Cifrado Hill de tamaño 2x2, usando operaciones sobre vectores y matrices en aritmética modular.

### 4.1 Conversión de texto a números

El mensaje se transforma a números usando el alfabeto definido.  

---
## 5. Funcionamiento General del Sistema

El flujo completo es:

1. El usuario escribe un mensaje.  
2. El sistema convierte el texto a números.  
3. Agrupa los datos en bloques de tamaño 2.  
4. Multiplica los bloques por la matriz clave.  
5. Aplica mod 27.  
6. Convierte los valores resultantes nuevamente a caracteres.  
7. Muestra el resultado en pantalla.

Para desencriptar, los pasos se recorren a la inversa usando la matriz inversa.

---

## 6. Interfaz del Proyecto

### Entradas:
- Campo de texto para escribir el mensaje.
- Matriz clave 2x2.

### Botones:
- Encriptar.
- Desencriptar.

### Salida:
- Resultado cifrado o descifrado.
- Representación interna del proceso.
- Mensajes de error cuando corresponda.

---

## 7. Problemas Comunes y Soluciones

### La matriz no es invertible  
Causa: `gcd(det, 27) ≠ 1`.

Solución: elegir una matriz diferente.

### El mensaje contiene caracteres no permitidos  
Solución: el sistema los remueve o marca error según la configuración.

### Error al desencriptar  
Causa: matriz sin inversa mod 27.

Solución: usar una clave válida.

---

## 8. Conclusión

Este proyecto combina:

- Criptografía clásica.  
- Aritmética modular.  
- Manipulación de matrices.  
- Programación web (HTML, CSS y JavaScript).  
- Validación de datos.  





