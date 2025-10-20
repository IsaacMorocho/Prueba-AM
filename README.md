# Prueba Bimestral
Elaborado por: Joshua Morocho

En este proyecto Tab1 muestra gastos recientes y permite agregar uno nuevo (form + cámara). Tab2 lista los recibos guardados con preview de la foto.

1) Preparamos el entorno
   
  a) Instalamos dependencias.

  b) Instala plugins necesarios que son de capacitor: Camera + Filesystem:
  
npm install
  
npm install @capacitor/camera @capacitor/filesystem

npx cap sync android

c) Verificamos que src/app/services/expenses.service.ts, tab1.page.ts y tab2.page.ts se creen, debido a que los archivos llamados "expenses" .

2) Probar UI rápidamente en navegador (sin cámara real)
   
a) Levanta la app en el navegador:

b) Abre la URL que muestra Ionic (p. ej. http://localhost:8100).

c) En Tab1 deberías ver las tarjetas de recentExpenses (datos en memoria).

d) Haz clic en "Agregar nuevo gasto" para comprobar que el modal y los inputs están visibles (nota: la cámara no funciona en navegador).

3) Compilar y desplegar en Android (para probar cámara y filesystem)
   
a) Genera la build web:

b) Copia assets a Capacitor y abre Android Studio:

c) Desde Android Studio ejecuta la app en un emulador o dispositivo físico.

d) Cuando la app pida permisos (cámara/almacenamiento) acéptalos.

4) Flujo de agregar gasto y guardar foto (en dispositivo)
a) En la app, ve a Tab1 y pulsa “Agregar nuevo gasto”.
b) Rellena Descripción, Monto, “Quién pagó” y pulsa “Tomar foto del recibo” (se abrirá la cámara).
c) Toma la foto y pulsa “Guardar”; el gasto se guarda (el servicio guarda foto en recibos/ y el listado en recibos/expenses.json).
d) Tras guardar, el gasto aparece inmediatamente en Tab1 (lista local) y queda persistido por ExpensesService.

5) Ver recibos y depurar preview en Tab2
a) Abre Tab2 — debería mostrarse cada gasto registrado con su información y miniatura (preview) de la foto.
b) Si la miniatura no aparece, inspecciona desde Android Studio → Device File Explorer la carpeta de la app: recibos/ y comprueba expenses.json y los archivos .jpeg.
c) Revisa logcat (Android Studio) para errores relacionados con Camera o Filesystem (permisos o rutas).
d) Soluciones rápidas: ejecutar npx cap sync android, reinstalar plugins, conceder permisos manualmente y reconstruir.

