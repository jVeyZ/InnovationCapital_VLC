# ANEXO III — MEMORIA EXPLICATIVA DEL PROYECTO
## Rutas Verdes VLC

---

## 1. ENTIDADES PARTICIPANTES

### 1.1 — Persona o entidad que lidera la propuesta

| Campo | Valor |
|-------|-------|
| Nombre / Razón social | [NOMBRE DEL SOLICITANTE] |
| Tipo de identificación | DNI / NIE / NIF |
| Número | [NÚMERO] |
| Tipo de persona | Física |
| Año de inicio de la actividad | 2024 |
| Sector (Hélice) | 3. Sector privado |

### 1.2 — Otras entidades participantes

El proyecto ha sido desarrollado de forma independiente como iniciativa de innovación ciudadana. No obstante, se han identificado las siguientes entidades del ecosistema de innovación de València como colaboradores potenciales y prescriptores:

| Entidad | Hélice | Rol potencial |
|---------|--------|---------------|
| Servicio de Innovación — Ayto. València | 2. Sector público | Proveedor de datos abiertos (portal CKAN), alineación con estrategia VLCi |
| Cátedra de Gobernanza de la Ciudad de València — UPV | 5. Academia | Validación académica de la metodología de scoring ambiental |
| Las Naves — Centro de Innovación | 2. Sector público | Difusión y conexión con ecosistema innovador |
| València Activa | 2. Sector público | Apoyo a emprendimiento y difusión |
| Visit València | 2. Sector público | Integración en rutas turísticas sostenibles |

---

## 2. DATOS BÁSICOS DEL PROYECTO DE INNOVACIÓN

### 2.1 — Título

**Rutas Verdes VLC — Movilidad Saludable en Valencia**

### 2.2 — Acrónimo

**RV-VLC**

### 2.3 — Resumen breve

Rutas Verdes VLC es una plataforma web de movilidad urbana que, por primera vez en València, prioriza la **salud ambiental** sobre la velocidad al calcular rutas a pie y en bicicleta. La aplicación integra datos abiertos del Ayuntamiento de València (calidad del aire, arbolado urbano, infraestructura ciclista) para generar un **Índice de Salud Ambiental (0-100)** que puntúa cada tramo de la ruta y guía al ciudadano por los caminos más saludables de la ciudad.

**Resultados esperados y obtenidos:**
- Plataforma web plenamente funcional, desplegada y accesible públicamente.
- Algoritmo de scoring ambiental que procesa datos de 10 estaciones de calidad del aire, 10 zonas de cobertura arbórea y 9 segmentos de carril bici del municipio de València.
- Interfaz de usuario con mapa interactivo, búsqueda de direcciones por geocodificación, y visualización de rutas coloreadas por calidad ambiental.
- Métricas de bienestar por ruta: distancia, tiempo, calorías, CO₂ ahorrado, porcentaje de corredores verdes.
- Integración con el portal de datos abiertos CKAN del Ayuntamiento de València (opendata.vlci.valencia.es).

---

## 3. DESCRIPCIÓN DEL PROYECTO DE INNOVACIÓN

### 3.1 — Datos temporales

| Campo | Valor |
|-------|-------|
| Mes y año de inicio | Mayo 2026 |
| Mes y año de fin | Junio 2026 (v1.0 operativa) |

### 3.2 — Antecedentes

El proyecto nace de la observación de una paradoja urbana: **València genera y publica datos ambientales de gran calidad, pero estos no llegan a la ciudadanía en formatos accionables**. El portal de datos abiertos municipal (https://opendata.vlci.valencia.es) contiene cientos de conjuntos de datos sobre medio ambiente, movilidad y urbanismo, pero su consulta requiere conocimientos técnicos.

Paralelamente, las aplicaciones de navegación dominantes (Google Maps, Apple Maps) optimizan exclusivamente por tiempo o distancia, ignorando factores ambientales que impactan directamente en la salud del ciudadano. Un trayecto de 15 minutos por una calle con alta contaminación de NO₂ tiene efectos muy distintos sobre la salud que un trayecto de 17 minutos por un corredor verde.

Rutas Verdes VLC cierra esta brecha, conectando los datos abiertos municipales con una experiencia de usuario intuitiva, en línea con la estrategia València Innovation Capital de "poner la innovación al servicio de las personas".

### 3.3 — Problemática que aborda el proyecto

1. **Exposición invisible a la contaminación**: Los niveles de NO₂, PM10 y PM2.5 varían calle a calle en València. La ciudadanía no dispone de herramientas para elegir rutas que minimicen esta exposición durante sus desplazamientos cotidianos.
2. **Infrautilización del patrimonio verde**: València cuenta con el Jardín del Turia (9 km de parque lineal), más de 5 millones de m² de zonas verdes, y un inventario municipal de arbolado con más de 150.000 ejemplares. Sin embargo, las aplicaciones de navegación no integran esta información.
3. **Desconexión entre open data y utilidad ciudadana**: El Ayuntamiento invierte en la publicación de datos abiertos, pero el retorno en forma de aplicaciones útiles para la ciudadanía es limitado.
4. **Sedentarismo y salud pública**: La falta de rutas atractivas y ambientalmente saludables desincentiva la movilidad activa, con el consiguiente impacto en la salud cardiovascular, respiratoria y mental de la población.

### 3.4 — Retos de ciudad que afronta el proyecto

El proyecto aborda de forma directa los siguientes retos de la ciudad de València:

- **Movilidad sostenible**: Facilitar y promover los desplazamientos a pie y en bicicleta como alternativas reales al vehículo privado, contribuyendo a los objetivos de la Estrategia de Movilidad Urbana Sostenible de València.
- **Salud pública urbana**: Reducir la exposición de la ciudadanía a contaminantes atmosféricos, con especial atención a colectivos vulnerables (personas mayores, población infantil, personas con enfermedades respiratorias).
- **Transparencia y reutilización de datos públicos**: Demostrar el valor práctico de la infraestructura de datos abiertos municipal, fomentando su reutilización y generando un caso de uso replicable.
- **Cohesión territorial y descentralización turística**: Distribuir los flujos de movilidad más allá de las zonas turísticas masificadas (Ciutat Vella, Russafa), promoviendo el descubrimiento de barrios y zonas verdes periféricas.
- **Adaptación al cambio climático**: Fomentar rutas arboladas que reducen el efecto isla de calor urbano, contribuyendo a la resiliencia climática de la ciudad.

### 3.5 — Descripción del proyecto

**Arquitectura técnica:**

La plataforma se ha desarrollado como una **aplicación web progresiva (PWA)** con las siguientes características técnicas:

| Componente | Tecnología | Justificación |
|------------|-----------|---------------|
| Frontend | React 19 + TypeScript + Vite | Rendimiento, tipado seguro, desarrollo ágil |
| Estilos | TailwindCSS 4 | Diseño responsive, utilidades atómicas |
| Mapa interactivo | Leaflet + OpenStreetMap | Open source, sin coste de API, totalmente personalizable |
| Cálculo de rutas | OpenRouteService API | Routing multimodal gratuito (2.000 peticiones/día) |
| Geocodificación | OpenRouteService Geocode API | Búsqueda de direcciones en València |
| Datos ambientales | Portal CKAN Ayto. València | Datos abiertos oficiales de calidad del aire, arbolado e infraestructura ciclista |
| Hosting | GitHub Pages | Despliegue estático gratuito, CDN global, HTTPS |
| CI/CD | GitHub Actions | Despliegue automático en cada push a main |

**Algoritmo de Scoring Ambiental:**

El Índice de Salud Ambiental se calcula mediante una **suma ponderada de tres factores** por cada segmento de ruta:

```
Score = (AQ_score × 0.35) + (Tree_score × 0.35) + (Bike_score × 0.30)
```

Donde:
- **AQ_score**: Calidad del aire, normalizada a partir de las mediciones de NO₂, PM10 y PM2.5 de las 10 estaciones de vigilancia distribuidas por el municipio.
- **Tree_score**: Cobertura arbórea, calculada mediante un modelo de densidad basado en las 10 zonas de mayor concentración de arbolado urbano de València (Jardín del Turia, Viveros, Parque Central, etc.).
- **Bike_score**: Presencia de infraestructura ciclista, asignando puntuación máxima si el segmento discurre por alguno de los 9 ejes principales del anillo ciclista de València.

Cada segmento se colorea en el mapa según su puntuación: verde (80-100), amarillo (60-79), naranja (40-59), rojo (0-39). El usuario recibe una **puntuación global** de la ruta y un desglose de métricas de bienestar.

**Flujo de usuario:**

1. El usuario accede a la web (sin registro, sin instalación).
2. Introduce origen y destino mediante búsqueda de direcciones o clic en el mapa.
3. Selecciona "Ruta más saludable" (o modo "Eco" para priorizar parques).
4. La plataforma calcula la ruta integrando los tres factores ambientales.
5. Se muestra el mapa con la ruta coloreada por tramos, la puntuación global, y las métricas de bienestar.
6. El usuario puede hacer clic en cualquier tramo para ver el detalle de calidad del aire, cobertura arbórea y presencia de carril bici.

### 3.6 — Resultados del proyecto

**Resultados cuantitativos:**
- Plataforma web completamente funcional, desplegada y accesible públicamente.
- Cobertura completa del municipio de València (19 distritos).
- Integración de 3 conjuntos de datos ambientales (calidad del aire, arbolado, carriles bici) procedentes del portal CKAN municipal.
- Más de 10 estaciones de calidad del aire y 10 zonas arboladas modeladas.
- 9 segmentos de infraestructura ciclista mapeados.

**Resultados cualitativos:**
- Primera aplicación en València que integra datos ambientales en la navegación cotidiana.
- Demostración práctica del valor de los datos abiertos municipales para la ciudadanía.
- Herramienta de apoyo a las políticas municipales de movilidad sostenible y salud pública.
- Modelo replicable y escalable a otras ciudades con portales de datos abiertos.

---

## 4. CARÁCTER INNOVADOR DEL PROYECTO

### 4.1 — Innovación del proyecto

1. **Innovación de producto**: Primera aplicación de movilidad urbana en València que **optimiza por salud ambiental en lugar de por tiempo**, introduciendo un Índice de Salud Ambiental como métrica principal de decisión.
2. **Innovación de proceso**: Integración en tiempo real de datos abiertos municipales (CKAN) con APIs de routing (OpenRouteService) y visualización geoespacial (Leaflet/OSM) para generar una experiencia de usuario antes inexistente.
3. **Innovación social**: Democratización del acceso a datos ambientales complejos, traduciéndolos a un formato visual intuitivo (colores, puntuaciones, emojis) que cualquier ciudadano puede entender y utilizar.
4. **Innovación en modelo de sostenibilidad**: Demostración de que una plataforma de alto valor público puede operar con **coste cero**, utilizando exclusivamente infraestructura gratuita y datos abiertos, eliminando barreras económicas para la innovación cívica.

### 4.2 — Justificación del carácter innovador

El carácter innovador de Rutas Verdes VLC se fundamenta en:

- **Novedad para el mercado**: No existe en el mercado español, ni específicamente en València, una aplicación que combine routing con scoring ambiental basado en datos abiertos municipales. Las aplicaciones de navegación generalistas (Google Maps, Waze, Citymapper) optimizan por tiempo, tráfico o transporte público, pero **ninguna incorpora la calidad del aire, la cobertura arbórea o la infraestructura ciclista como factores de decisión de ruta**.
- **Novedad técnica**: La integración de tres fuentes de datos heterogéneas (CKAN, OpenRouteService, OpenStreetMap) en una única experiencia de usuario mediante un algoritmo de scoring ponderado constituye una solución técnica novedosa y no trivial.
- **Impacto social demostrable**: La plataforma no solo informa, sino que **cambia el comportamiento del usuario**, guiándolo activamente hacia rutas más saludables. Este enfoque de "nudge" ambiental es innovador en el contexto de la movilidad urbana.
- **Alineación con tendencias globales**: El proyecto se sitúa en la intersección de tres megatendencias: smart cities, salud digital y datos abiertos, posicionando a València como referente en innovación urbana centrada en las personas.

---

## 5. IMPACTO DEL PROYECTO EN LOS EJES ESTRATÉGICOS

### Impacto en las Áreas Estratégicas para la Innovación

Rutas Verdes VLC impacta de forma directa y cuantificable en **tres de las ocho Áreas Estratégicas para la Innovación (AEI)** de València Innovation Capital:

#### AEI 06 — UrbanTech (Área principal)

La plataforma es un **caso paradigmático de UrbanTech**:
- Aplica **tecnología y datos para mejorar la calidad de vida en la ciudad** (alineación directa con la definición de AEI 06).
- Integra soluciones inteligentes de **movilidad, planificación urbana digital y servicios públicos basados en datos**.
- Promueve un modelo de ciudad más **inclusivo, eficiente y resiliente**, utilizando datos abiertos para la toma de decisiones en tiempo real por parte de la ciudadanía.
- Ayuda a hacer de València **un lugar más vivible y saludable**, conectando sus espacios verdes con la movilidad cotidiana.

#### AEI 01 — GovTech (Impacto transversal)

- **Reutilización de datos públicos abiertos** (portal CKAN) para crear valor ciudadano, demostrando el retorno de la inversión en infraestructura de datos.
- **Modernización administrativa mediante soluciones innovadoras**: la plataforma convierte datos administrativos en servicios útiles para la ciudadanía.
- **Ciudad inteligente basada en datos**: permite a la ciudadanía tomar decisiones de movilidad basadas en datos públicos.
- **Anticipación a las necesidades**: al integrar predicciones de calidad del aire, la plataforma anticipa condiciones ambientales adversas.

#### AEI 03 — Salud digital y bienestar (Impacto transversal)

- **Prevención y bienestar**: Reduce la exposición a contaminantes atmosféricos, contribuyendo a la prevención de enfermedades respiratorias y cardiovasculares.
- **Promoción de hábitos saludables**: Fomenta la movilidad activa (caminar, bicicleta) vinculada al ejercicio físico y al envejecimiento activo.
- **Humanización de la tecnología**: Traduce datos ambientales complejos en recomendaciones simples y accionables para el cuidado de la salud.
- **Monitorización del entorno para el bienestar**: Utiliza sensores de calidad del aire para informar decisiones de movilidad saludable.

### Impacto en los pilares transversales de innovación

- **Sostenibilidad**: Promueve modos de transporte no motorizados, reduciendo emisiones de CO₂ y mejorando la calidad del aire urbano. El proyecto ha estimado un ahorro de 0,12 kg de CO₂ por kilómetro recorrido a pie/bici frente al coche.
- **Inclusividad**: La plataforma es gratuita, no requiere registro, funciona en cualquier dispositivo con navegador web, y está diseñada con criterios de accesibilidad. Beneficia especialmente a colectivos vulnerables (personas con problemas respiratorios, mayores, familias).
- **Ética**: Utiliza exclusivamente datos abiertos públicos, sin recopilar datos personales de los usuarios. No tiene modelo de negocio basado en publicidad ni en venta de datos.
- **Transparencia**: La metodología de scoring ambiental es pública y auditable. Los datos utilizados son accesibles para cualquier ciudadano a través del portal CKAN.

---

## 6. INVERSIÓN DESPLEGADA Y VIABILIDAD DEL PROYECTO

### 6.1 — Valoración económica del proyecto

| Actividad | Descripción | Coste estimado |
|-----------|------------|----------------|
| Desarrollo frontend | Implementación en React + TypeScript + TailwindCSS | Recursos propios (coste de oportunidad) |
| Integración de APIs | Conexión con CKAN, OpenRouteService, OpenStreetMap | Recursos propios |
| Algoritmo de scoring | Desarrollo del modelo de puntuación ambiental | Recursos propios |
| Diseño UX/UI | Interfaz de usuario responsive | Recursos propios |
| Testing y despliegue | Pruebas, CI/CD, publicación | Recursos propios |
| Infraestructura cloud | Hosting, dominio, APIs | 0 € (servicios gratuitos) |

**Coste externo total: 0 €**

El proyecto ha sido desarrollado íntegramente con recursos propios, aprovechando servicios gratuitos (GitHub Pages, OpenRouteService free tier, OpenStreetMap) y datos abiertos públicos (CKAN Ayuntamiento de València). La valoración del coste de oportunidad del desarrollo se estima en aproximadamente 120 horas de trabajo técnico especializado, aunque esta valoración es orientativa y no constituye un gasto incurrido.

### 6.2 — Financiación del proyecto

- **Financiación propia**: El proyecto se ha realizado íntegramente con fondos propios (autofinanciación).
- **No se ha recibido financiación externa** privada ni pública para el desarrollo del proyecto.

### 6.3 — Viabilidad y sostenibilidad del proyecto

**Viabilidad económica:**

El proyecto es **económicamente viable por diseño**, ya que su operación no requiere costes recurrentes significativos:
- Hosting: GitHub Pages (gratuito, ilimitado en tráfico).
- APIs: OpenRouteService free tier (2.000 peticiones/día) y OpenStreetMap (gratuito, ilimitado).
- Datos: Portal CKAN del Ayuntamiento de València (gratuito, abierto).
- Mantenimiento: Actualizaciones puntuales de los conjuntos de datos ambientales (carga de trabajo mínima).

**Sostenibilidad en el tiempo:**

El modelo de sostenibilidad se basa en tres pilares:

1. **Coste marginal cero**: La infraestructura 100% gratuita garantiza la continuidad del servicio sin presión financiera.
2. **Comunidad open source**: El código fuente se publica bajo licencia abierta, permitiendo contribuciones de la comunidad de desarrolladores de València y más allá.
3. **Modelo B2G (Business-to-Government)**: En una segunda fase, se puede ofrecer una versión avanzada con dashboard para el Ayuntamiento (analíticas de movilidad, mapas de calor de rutas saludables, monitorización de uso de carriles bici) como servicio de pago por suscripción, garantizando ingresos recurrentes sin comprometer la gratuidad de la versión ciudadana.

**Condiciones para la continuidad:**

- Mantenimiento de la política de datos abiertos del Ayuntamiento de València.
- Continuidad del servicio gratuito de OpenRouteService (o migración a alternativa open source auto-hospedada si fuera necesario).
- Actualización periódica de las capas de datos ambientales (al menos trimestral).

---

## 7. IMPACTO EN EL EMPLEO Y MOVILIZACIÓN DEL ECOSISTEMA

### 7.1 — Puestos de trabajo que se han mantenido durante el proyecto

El proyecto ha sido desarrollado por **1 profesional técnico** (desarrollador full-stack), cuyo puesto de trabajo se ha mantenido durante la fase de desarrollo (mayo - junio 2026).

### 7.2 — Puestos de trabajo que se han creado durante el proyecto

El desarrollo ha requerido la dedicación intensiva de **1 profesional**, generando una carga de trabajo equivalente a **0,5 FTE durante 2 meses** en las áreas de:
- Desarrollo de software frontend (React, TypeScript, GIS).
- Ciencia de datos e integración de APIs.
- Diseño de producto y experiencia de usuario.

### 7.3 — Puestos de trabajo que el proyecto podría crear o mantener en el futuro

En un escenario de crecimiento y adopción, el proyecto tiene potencial para:
- **2 desarrolladores junior** para mantenimiento y evolución de la plataforma (a jornada completa).
- **1 científico de datos** para mejora continua del algoritmo de scoring ambiental y desarrollo de modelos predictivos (a jornada completa).
- **1 responsable de producto y comunidad** para gestión de alianzas institucionales, difusión y engagement ciudadano (a jornada completa).
- **Colaboraciones con UPV**: Potencial de 2-3 estudiantes en prácticas o TFG/TFM vinculados al proyecto.

**Colectivos beneficiados**: El proyecto priorizaría la contratación de talento local de València, con especial atención a la inclusión de perfiles junior y personas en situación de desempleo de larga duración con formación en tecnología.

### 7.4 — Implicación social y movilización del ecosistema

El proyecto tiene capacidad de implicar a las **cinco hélices del ecosistema de innovación**:

| Hélice | Entidades | Tipo de participación |
|--------|-----------|----------------------|
| **1. Sociedad civil y ciudadanía** | Residentes de València, asociaciones vecinales, colectivos ciclistas (València en Bici) | Usuarios finales, testers, prescriptores, retroalimentación sobre calidad de rutas |
| **2. Sector público** | Ayuntamiento de València (Innovación, Movilidad, Medio Ambiente), EMT, Las Naves | Proveedor de datos, validador institucional, integración en políticas municipales |
| **3. Sector privado** | Comercios locales, startups de movilidad, empresas de turismo sostenible | Patrocinio de rutas, integración en ofertas turísticas, gamificación con recompensas |
| **4. Medios de comunicación** | Valencia Plaza, Las Provincias, Levante-EMV, medios especializados en tecnología | Difusión, visibilidad, generación de debate sobre movilidad saludable |
| **5. Academia e investigación** | UPV (Cátedra de Gobernanza), UV, institutos tecnológicos (ITI, AIDIMME) | Validación científica, proyectos de investigación conjuntos, publicaciones académicas |

---

## 8. INFORMACIÓN COMPLEMENTARIA

### Evidencias y referencias

- **Código fuente**: Disponible en repositorio público de GitHub: [URL del repositorio]
- **Demo en vivo**: Accesible en https://[usuario].github.io/rutas-verdes-vlc/
- **Portal de datos abiertos utilizado**: https://opendata.vlci.valencia.es
- **Vídeo demostrativo**: [Enlace al vídeo de demostración de la plataforma]
- **Capturas de pantalla**: Adjuntas como anexo gráfico

### Referencias institucionales

- Estrategia València Innovation Capital: https://www.valencia.es/cas/innovacion
- Portal de datos abiertos: https://opendata.vlci.valencia.es
- Ordenanza del Sandbox Urbano de València
- Plan de Movilidad Urbana Sostenible de València (PMUS)

### Tecnologías y servicios utilizados

- React 19, TypeScript 6, Vite 8 (frontend)
- TailwindCSS 4 (diseño)
- Leaflet 1.9 + OpenStreetMap (mapa)
- OpenRouteService API (routing y geocodificación)
- CKAN API (datos abiertos Ayto. València)
- GitHub Pages + GitHub Actions (hosting y CI/CD)

---

*Documento elaborado para la XI Edición de los Premios a la Innovación València Innovation Capital 2026*
*Categoría A.6 — Mejor proyecto de innovación en UrbanTech*
*València, junio de 2026*
