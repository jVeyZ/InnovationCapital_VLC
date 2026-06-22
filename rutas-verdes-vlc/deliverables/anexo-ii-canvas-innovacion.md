# ANEXO II — CANVAS DE LA INNOVACIÓN
## Rutas Verdes VLC

---

### 1. PERSONAS BENEFICIADAS

- **Ciudadanía de València**: Residentes de los 19 distritos que desean desplazarse a pie o en bicicleta por rutas más saludables, evitando contaminación y maximizando zonas verdes.
- **Turistas y visitantes**: Personas que visitan València y buscan recorridos a pie o en bici que combinen movilidad con bienestar y descubrimiento de zonas verdes.
- **Colectivos vulnerables**: Personas con problemas respiratorios (asma, EPOC), personas mayores, familias con niños pequeños y deportistas urbanos, que se benefician especialmente de conocer las rutas con mejor calidad del aire.
- **Administración pública**: El Ayuntamiento de València (Servicio de Innovación, Movilidad, Medio Ambiente) como herramienta de apoyo a políticas de movilidad sostenible y salud pública.

---

### 2. PROBLEMA

- **Desconocimiento ambiental**: La ciudadanía no dispone de información integrada sobre calidad del aire, cobertura arbórea y carriles bici al planificar sus desplazamientos cotidianos.
- **Contaminación invisible**: Los niveles de NO₂, PM10 y PM2.5 varían significativamente entre calles, pero esta información no llega al ciudadano en el momento de decidir su ruta.
- **Infrautilización de zonas verdes**: València dispone de un importante patrimonio verde (Jardín del Turia, parques, calles arboladas) que no se integra en las aplicaciones de navegación convencionales.
- **Sedentarismo y salud**: La falta de rutas atractivas y saludables desincentiva la movilidad activa (caminar, bicicleta), contribuyendo al sedentarismo y sus consecuencias para la salud pública.
- **Datos abiertos sin aplicación práctica**: El Ayuntamiento publica datos abiertos de calidad ambiental, arbolado y movilidad, pero no existe una herramienta ciudadana que los convierta en información accionable.

---

### 3. PROPUESTA DE VALOR

**La primera plataforma de navegación que prioriza la salud ambiental sobre la velocidad en la ciudad de València.**

Rutas Verdes VLC transforma los datos abiertos municipales en rutas personalizadas que maximizan el bienestar del ciudadano: menos contaminación, más árboles, más carriles bici. No se trata de llegar más rápido, sino de llegar más sano.

---

### 4. SOLUCIÓN

Una **aplicación web progresiva (PWA)** gratuita, alojada en infraestructura pública, que:

1. **Calcula rutas a pie o en bicicleta** entre dos puntos de València, optimizando por salud ambiental en lugar de por tiempo o distancia.
2. **Puntúa cada ruta** con un "Índice de Salud Ambiental" (0-100) basado en tres factores: calidad del aire (datos de estaciones de medición), cobertura arbórea (inventario municipal de arbolado) y presencia de carril bici (infraestructura ciclista).
3. **Visualiza en un mapa interactivo** la ruta coloreada por tramos (verde = saludable, rojo = contaminado), permitiendo al usuario tomar decisiones informadas.
4. **Muestra métricas de bienestar**: calorías estimadas, CO₂ ahorrado frente al coche, porcentaje de la ruta que transcurre por corredores verdes.
5. **Modo "Eco"**: variante de ruta que prioriza parques y zonas arboladas incluso si alarga ligeramente el recorrido.

---

### 5. CANALES

- **Aplicación web pública** (GitHub Pages / dominio propio) accesible desde cualquier navegador, sin instalación.
- **Redes sociales**: Difusión en Twitter/X, Instagram y LinkedIn con visualizaciones de datos y rutas destacadas.
- **Colaboración institucional**: Integración con la web de Turismo Valencia (Visit València), València Activa, Las Naves, y la plataforma VLCi de datos urbanos.
- **Eventos y ferias**: Presentación en eventos de innovación urbana (València Digital Summit, Smart City Expo, Foro de Innovación de Las Naves).

---

### 6. COSTES

| Concepto | Coste aproximado |
|----------|-----------------|
| Desarrollo de software (plataforma web) | Recursos propios — coste de oportunidad |
| Hosting y despliegue | 0 € (GitHub Pages + servicios gratuitos) |
| APIs externas (OpenRouteService, OpenStreetMap) | 0 € (tiers gratuitos) |
| Datos abiertos (CKAN Ayto. València) | 0 € (open data) |
| Difusión y comunicación | 0 € (redes sociales + colaboraciones) |
| **TOTAL** | **0 € de coste externo** |

**Financiación**: Proyecto desarrollado con recursos propios (autofinanciado). La infraestructura se sostiene sobre servicios gratuitos y datos abiertos públicos, garantizando sostenibilidad económica sin dependencia de subvenciones para su operación.

---

### 7. IMPACTOS

- **Salud pública**: Reducción de la exposición a contaminantes atmosféricos durante los desplazamientos urbanos. Fomento de la movilidad activa (caminar, bicicleta) con beneficios cardiovasculares y de salud mental.
- **Medio ambiente**: Promoción de alternativas al vehículo privado, con la consiguiente reducción de emisiones de CO₂ y mejora de la calidad del aire urbano.
- **Digitalización ciudadana**: Primera aplicación que convierte los datos abiertos de València en una herramienta de uso cotidiano para la ciudadanía, cerrando la brecha entre open data y utilidad pública.
- **Cohesión territorial**: Descubrimiento de zonas verdes y barrios infravalorados, distribuyendo los flujos peatonales y ciclistas más allá de las rutas turísticas convencionales.
- **Innovación institucional**: Demostración práctica del valor de la infraestructura pública de datos de València (VLCi), alineada con la estrategia València Innovation Capital.

---

### 8. INDICADORES

| Indicador | Meta |
|-----------|------|
| Usuarios activos mensuales (MAU) | +500 en los primeros 3 meses |
| Rutas calculadas | +2.000 en el primer trimestre |
| Puntuación media de salud ambiental de rutas en València | Monitorización continua |
| Porcentaje de rutas que evitan zonas de alta contaminación | >70% |
| Reducción estimada de exposición a NO₂ por ruta | -30% vs ruta más corta |
| CO₂ ahorrado acumulado (frente al uso de coche) | +500 kg en primer año |
| Integraciones con datos abiertos municipales | 3+ conjuntos de datos (arbolado, calidad aire, carriles bici) |

---

### 9. VENTAJA ESPECIAL

- **Único en València**: Ninguna aplicación de movilidad actual (Google Maps, Citymapper, EMT) integra datos ambientales para recomendar rutas saludables. Rutas Verdes VLC es la primera.
- **Open data como ventaja competitiva**: Al consumir directamente los datos abiertos del Ayuntamiento de València a través de su portal CKAN, la plataforma utiliza información oficial, actualizada y con cobertura específica del municipio que ninguna app global ofrece.
- **Triple hélice de impacto**: UrbanTech (movilidad inteligente) + Salud Digital (prevención y bienestar) + GovTech (transparencia y reutilización de datos públicos).
- **Coste cero de operación**: Sostenibilidad económica garantizada al basarse íntegramente en infraestructura gratuita y datos abiertos, sin dependencia de modelos de negocio que comprometan la misión de servicio público.
- **Escalable**: La arquitectura permite replicar el modelo en cualquier ciudad que publique datos abiertos de calidad ambiental y movilidad.

---

### 10. APRENDIZAJES OBTENIDOS E IDEAS NUEVAS SURGIDAS

**Aprendizajes:**
- Los datos abiertos municipales son de gran calidad pero carecen de capas de usabilidad que los acerquen a la ciudadanía. La innovación no está solo en generar datos, sino en convertirlos en herramientas accionables.
- La integración de APIs gratuitas (OpenRouteService, OpenStreetMap, CKAN) permite desarrollar soluciones de alto valor con inversión cero, demostrando que la innovación urbana no requiere grandes presupuestos.
- Existe una demanda latente de información ambiental personalizada que las aplicaciones de navegación generalistas no cubren.

**Ideas nuevas:**
- **Rutas Verdes para colegios**: Extensión específica para recomendar caminos escolares seguros y saludables, integrando datos de tráfico en hora punta.
- **Alertas ambientales**: Notificaciones push cuando los niveles de contaminación superen umbrales en la zona del usuario.
- **Gamificación**: Sistema de logros y recompensas por kilómetros recorridos en rutas verdes, canjeables por beneficios en comercios locales de València.
- **API abierta**: Exponer el índice de salud ambiental como API pública para que otras aplicaciones y servicios municipales puedan integrarlo.
- **Gemelo digital urbano**: Integración con el modelo 3D de València para visualizar las rutas en un entorno inmersivo de ciudad.
