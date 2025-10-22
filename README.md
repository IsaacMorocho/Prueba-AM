# Prueba Bimestral
Elaborado por: Joshua Morocho

En este proyecto Tab1 muestra gastos recientes y permite agregar uno nuevo (form + cámara). Tab2 lista los recibos guardados con preview de la foto.}

El apk funcional esta nombrado como apk_debug ubicado en la raiz del proyecto

## 1) Preparamos el entorno
   
  a) Instalamos dependencias.

  b) Instala plugins necesarios que son de capacitor: Camera + Filesystem:
  
npm install
  
npm install @capacitor/camera @capacitor/filesystem

npx cap sync android

c) Verificamos que src/app/services/expenses.service.ts, tab1.page.ts y tab2.page.ts se creen, debido a que los archivos llamados "expenses" funcionan como el registro de los gastos de descripcion, fecha, monto, etc, ademas de poder guardar en la apk y recargarlos en el tabs 2 con su imagen preview.

## 2) Probamos rápidamente en el navegador 
   
a) Levantamos la app en el navegador con:

ionic serve

b) En tab1 se muestra las tarjetas de recentExpenses es decir los datos en memoria.

## 3) Compilar y desplegacion en Android
   
a) Generamos la build web con:

ionic build

b) Se copia assets a Capacitor y abre Android Studio con:

npx cap open android

## 4) Flujo de agregar gasto y guardar foto
   
a) En la app, vamos a Tab1 y pulsa “Agregar nuevo gasto”.

b) Rellena Descripción, Monto, “Quién pagó” y pulsa “Tomar foto del recibo” (se abrirá la cámara).

c) Toma la foto y pulsa “Guardar”; el gasto se guarda (el servicio guarda foto en recibos/ y el listado en recibos/expenses.json).

d) Tras guardar, el gasto aparece inmediatamente en Tab1 (lista local) y queda persistido por ExpensesService.

## 5) Ver recibos y depurar preview en Tab2
   
a) Abre Tab2 — debería mostrarse cada gasto registrado con su información y miniatura de la foto.

b) Si la miniatura no aparece, inspecciona desde Android Studio → Device File Explorer la carpeta de la app: recibos/ y comprueba expenses.json y los archivos .jpeg.

c) Revisamos logcat en Android Studio para observar todos los errores relacionados o que se generen durante la ejecucion de la apk y con Camera o Filesystem.

