# Iamtheadmin 

Juego en HTML y JavaScript para el TP final de **Administración de Servidores y Bases de Datos**.

## Descripción
El proyecto consiste en un simulador de administración de servidores.  
El jugador debe completar tareas típicas de un administrador en un servidor Apache corriendo sobre Debian.

## Objetivo
Este trabajo práctico final busca:
- Tener un servidor Apache corriendo y correctamente configurado.
- Alojar esta página en el servidor como prueba de despliegue.
- Simular comandos básicos de administración (login, estado del servicio, reinicio, puertos, logs).

## Requisitos
- Servidor Debian con Apache instalado y activo.
- Carpeta `/var/www/html` accesible para alojar la página.

## Instalación
1. Clonar o copiar este proyecto en el servidor.
2. Mover los archivos al directorio raíz de Apache:
   ```bash
   sudo cp -r Iamtheadmin /var/www/html/
