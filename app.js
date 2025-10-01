const { useState, useEffect, useMemo } = React;

// Data del calendario di studio
const studyData = [
  {
    "day": "Mer",
    "date": "15/10",
    "full_date": "15/10/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 1: Sensibilità Somatica Materiale: Slide Koch: somatosensoriale.pdf (prime 75) Protocollo: Applicazione workflow adattivo in 5 fasi.",
    "sessione_pomeriggio": "Modulo 4: Sistema GI Materiale: Conti Vol. 2 Cap. 53: Fisiologia della nutrizione Protocollo: Applicazione workflow adattivo in 5 fasi."
  },
  {
    "day": "Gio",
    "date": "16/10",
    "full_date": "16/10/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 1: Dolore e Analgesia Materiale: Slide Koch: dolore.pdf (25 slide) + Conti Cap. 18 Protocollo: Workflow adattivo. Focus Feynman (Fase 5) sulla teoria del cancello.",
    "sessione_pomeriggio": "Modulo 4: Sistema Nervoso Enterico Materiale: Conti Vol. 2 Cap. 54 Protocollo: Applicazione workflow adattivo in 5 fasi."
  },
  {
    "day": "Ven",
    "date": "17/10",
    "full_date": "17/10/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 1: Gusto e Olfatto Materiale: Kandel Cap. 32 (prime 25 pag) Protocollo: Applicazione workflow adattivo in 5 fasi. Creare mappa distinta per via gustativa.",
    "sessione_pomeriggio": "Modulo 4: Motilità GI Materiale: Conti Vol. 2 Cap. 55 Protocollo: Applicazione workflow adattivo in 5 fasi."
  },
  {
    "day": "Sab",
    "date": "18/10",
    "full_date": "18/10/2025",
    "year": 2025,
    "task_ricorrente": "RIPOSO COMPLETO",
    "sessione_mattina": "RIPOSO COMPLETO",
    "sessione_pomeriggio": "RIPOSO COMPLETO"
  },
  {
    "day": "Dom",
    "date": "19/10",
    "full_date": "19/10/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 1: Gusto e Olfatto Materiale: Kandel Cap. 32 (ultime 20 pag) Protocollo: Applicazione workflow adattivo in 5 fasi. Creare mappa distinta per via olfattiva.",
    "sessione_pomeriggio": "Modulo 4: Secrezioni GI Materiale: Conti Vol. 2 Cap. 56 (prima metà) Protocollo: Applicazione workflow adattivo. Focus mappa su regolazione secrezione gastrica."
  },
  {
    "day": "Lun",
    "date": "20/10",
    "full_date": "20/10/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 1: Sistema Visivo (Basi) Materiale: Kandel Cap. 25-26 Protocollo: Workflow adattivo. Focus su Image Occlusion per strati retina.",
    "sessione_pomeriggio": "Modulo 4: Secrezioni GI Materiale: Conti Vol. 2 Cap. 56 (seconda metà) Protocollo: Workflow adattivo. Focus mappa su secrezione pancreatica e biliare."
  },
  {
    "day": "Mar",
    "date": "21/10",
    "full_date": "21/10/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 1: Sistema Visivo (Vie Centrali) Materiale: Kandel Cap. 27 Protocollo: Workflow adattivo. Creazione mappa concettuale dettagliata dal chiasma alla V1.",
    "sessione_pomeriggio": "Modulo 4: Digestione e Assorbimento Materiale: Conti Vol. 2 Cap. 57 (prima metà) Protocollo: Applicazione workflow adattivo in 5 fasi."
  },
  {
    "day": "Mer",
    "date": "22/10",
    "full_date": "22/10/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 1: Sistema Visivo (Integrazione) Materiale: Conti Cap. 19 Protocollo: Workflow adattivo. Focus Feynman (Fase 5) sui difetti del campo visivo (es. emianopsie).",
    "sessione_pomeriggio": "Modulo 4: Digestione e Assorbimento Materiale: Conti Vol. 2 Cap. 57 (seconda metà) Protocollo: Applicazione workflow adattivo in 5 fasi."
  },
  {
    "day": "Gio",
    "date": "23/10",
    "full_date": "23/10/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 1: Sistema Uditivo Materiale: Kandel Cap. 30 Protocollo: Applicazione workflow adattivo in 5 fasi.",
    "sessione_pomeriggio": "Modulo 4: Endocrino (Principi) Materiale: Conti Vol. 2 Cap. 39 Protocollo: Applicazione workflow adattivo. Creare mappa concettuale dell'asse ipotalamo-ipofisario."
  },
  {
    "day": "Ven",
    "date": "24/10",
    "full_date": "24/10/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 1: Sistema Vestibolare Materiale: Kandel Cap. 31 + Conti Cap. 27 Protocollo: Workflow adattivo. Focus Image Occlusion su canali semicircolari e organi otolitici.",
    "sessione_pomeriggio": "Modulo 4: Endocrino (Asse Ipotalamo-Ipofisario) Materiale: Conti Vol. 2 Cap. 40 Protocollo: Approfondimento e integrazione."
  },
  {
    "day": "Sab",
    "date": "25/10",
    "full_date": "25/10/2025",
    "year": 2025,
    "task_ricorrente": "RIPOSO COMPLETO",
    "sessione_mattina": "RIPOSO COMPLETO",
    "sessione_pomeriggio": "RIPOSO COMPLETO"
  },
  {
    "day": "Dom",
    "date": "26/10",
    "full_date": "26/10/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 1: Controllo Riflesso del Movimento Materiale: Conti Cap. 23 Protocollo: Workflow adattivo. Creare mappa concettuale dei riflessi spinali (miotatico, inverso, flessorio).",
    "sessione_pomeriggio": "Sessione di Ripasso e Consolidamento Modulo 4 (Parte 1) Rivedere tutte le mappe e le Anki create su GI ed Endocrino. Sessione Anki estesa."
  },
  {
    "day": "Lun",
    "date": "27/10",
    "full_date": "27/10/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "RIPASSO GENERALE MODULO 1 Rivedere tutte le mappe concettuali di M1. Sessione Anki estesa e mirata sui punti deboli.",
    "sessione_pomeriggio": "Modulo 4: Endocrino (Metabolismo Ca/P/Glucosio) Materiale: Conti Vol. 2 Cap. 65 (prima metà) Protocollo: Applicazione workflow adattivo in 5 fasi."
  },
  {
    "day": "Mar",
    "date": "28/10",
    "full_date": "28/10/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 2: Controllo Postura ed Equilibrio Materiale: Conti Cap. 25 Protocollo: Applicazione workflow adattivo in 5 fasi.",
    "sessione_pomeriggio": "Modulo 4: Endocrino (Metabolismo Ca/P/Glucosio) Materiale: Conti Vol. 2 Cap. 65 (seconda metà) Protocollo: Applicazione workflow adattivo in 5 fasi."
  },
  {
    "day": "Mer",
    "date": "29/10",
    "full_date": "29/10/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 2: Locomozione Materiale: Conti Cap. 26 Protocollo: Applicazione workflow adattivo in 5 fasi.",
    "sessione_pomeriggio": "Modulo 4: Endocrino (Crescita) Materiale: Conti Vol. 2 Cap. 41 Protocollo: Applicazione workflow adattivo in 5 fasi."
  },
  {
    "day": "Gio",
    "date": "30/10",
    "full_date": "30/10/2025",
    "year": 2025,
    "task_ricorrente": "PAUSA STRATEGICA",
    "sessione_mattina": "Riposo attivo, recupero cognitivo.",
    "sessione_pomeriggio": "Riposo attivo, recupero cognitivo."
  },
  {
    "day": "Ven",
    "date": "31/10",
    "full_date": "31/10/2025",
    "year": 2025,
    "task_ricorrente": "PAUSA STRATEGICA",
    "sessione_mattina": "Riposo attivo, recupero cognitivo.",
    "sessione_pomeriggio": "Riposo attivo, recupero cognitivo."
  },
  {
    "day": "Sab",
    "date": "01/11",
    "full_date": "01/11/2025",
    "year": 2025,
    "task_ricorrente": "RIPOSO COMPLETO",
    "sessione_mattina": "RIPOSO COMPLETO",
    "sessione_pomeriggio": "RIPOSO COMPLETO"
  },
  {
    "day": "Dom",
    "date": "02/11",
    "full_date": "02/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 2: Corteccia Motoria Materiale: Kandel Cap. 38 + Slide Koch (22 slide) Protocollo: Workflow adattivo. Creare mappa delle aree motorie corticali.",
    "sessione_pomeriggio": "Modulo 4: Riproduzione Materiale: Conti Vol. 2 Cap. 67 (prima metà) Protocollo: Applicazione workflow adattivo."
  },
  {
    "day": "Lun",
    "date": "03/11",
    "full_date": "03/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 2: Nuclei della Base (Parte 1) Materiale: Kandel Cap. 43 (prime 50 slide) Protocollo: Workflow adattivo. Creare mappa dettagliata dei circuiti diretti e indiretti.",
    "sessione_pomeriggio": "Modulo 4: Riproduzione Materiale: Conti Vol. 2 Cap. 67 (seconda metà) Protocollo: Applicazione workflow adattivo."
  },
  {
    "day": "Mar",
    "date": "04/11",
    "full_date": "04/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 2: Nuclei della Base (Parte 2) Materiale: Kandel Cap. 43 (ultime 50 slide) Protocollo: Workflow adattivo. Focus su fisiopatologia Parkinson e Huntington.",
    "sessione_pomeriggio": "Modulo 4: Controllo Cardiovascolare Centrale Materiale: Conti Vol. 2 Cap. 50 Protocollo: Applicazione workflow adattivo."
  },
  {
    "day": "Mer",
    "date": "05/11",
    "full_date": "05/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 2: Cervelletto (Anatomia e Funzioni) Materiale: Kandel Cap. 42 Protocollo: Workflow adattivo. Creare mappa delle afferenze ed efferenze cerebellari.",
    "sessione_pomeriggio": "Modulo 4: Sistema Respiratorio (Meccanica) Materiale: Conti Vol. 2 Cap. 36 Protocollo: Applicazione workflow adattivo."
  },
  {
    "day": "Gio",
    "date": "06/11",
    "full_date": "06/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 2: Apprendimento Motorio Materiale: Kandel Cap. 41 Protocollo: Workflow adattivo. Focus sui meccanismi di plasticità sinaptica nell'apprendimento motorio.",
    "sessione_pomeriggio": "Modulo 4: Sistema Respiratorio (Controllo) Materiale: Conti Vol. 2 Cap. 37 Protocollo: Applicazione workflow adattivo."
  },
  {
    "day": "Ven",
    "date": "07/11",
    "full_date": "07/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 3: Attenzione e Arousal Materiale: Kandel Cap. 46 Protocollo: Workflow adattivo. Creare mappa del sistema reticolare attivante.",
    "sessione_pomeriggio": "Modulo 4: Funzione Renale (Parte 1) Materiale: Conti Vol. 2 Cap. 42 (prima metà) Protocollo: Applicazione workflow adattivo."
  },
  {
    "day": "Sab",
    "date": "08/11",
    "full_date": "08/11/2025",
    "year": 2025,
    "task_ricorrente": "RIPOSO COMPLETO",
    "sessione_mattina": "RIPOSO COMPLETO",
    "sessione_pomeriggio": "RIPOSO COMPLETO"
  },
  {
    "day": "Dom",
    "date": "09/11",
    "full_date": "09/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 3: Sonno e Veglia Materiale: Kandel Cap. 47 Protocollo: Workflow adattivo. Focus sui meccanismi neurali del sonno REM e non-REM.",
    "sessione_pomeriggio": "Modulo 4: Funzione Renale (Parte 2) Materiale: Conti Vol. 2 Cap. 42 (seconda metà) Protocollo: Applicazione workflow adattivo."
  },
  {
    "day": "Lun",
    "date": "10/11",
    "full_date": "10/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 3: Emozioni (Parte 1) Materiale: Kandel Cap. 48 (prime 30 pag) Protocollo: Workflow adattivo. Creare mappa dell'amigdala e sue connessioni.",
    "sessione_pomeriggio": "Modulo 4: Equilibrio Idroelettrolitico Materiale: Conti Vol. 2 Cap. 43 Protocollo: Applicazione workflow adattivo."
  },
  {
    "day": "Mar",
    "date": "11/11",
    "full_date": "11/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 3: Emozioni (Parte 2) Materiale: Kandel Cap. 48 (ultime 20 pag) + Cap. 49 Protocollo: Workflow adattivo. Focus sui circuiti della paura e del reward.",
    "sessione_pomeriggio": "Modulo 4: Controllo Ormonale del Rene Materiale: Conti Vol. 2 Cap. 44 Protocollo: Applicazione workflow adattivo."
  },
  {
    "day": "Mer",
    "date": "12/11",
    "full_date": "12/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 3: Memoria (Parte 1 - Tipi) Materiale: Kandel Cap. 50 Protocollo: Workflow adattivo. Distinguere memoria dichiarativa e procedurale.",
    "sessione_pomeriggio": "Modulo 4: Equilibrio Acido-Base Materiale: Conti Vol. 2 Cap. 45 Protocollo: Applicazione workflow adattivo."
  },
  {
    "day": "Gio",
    "date": "13/11",
    "full_date": "13/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 3: Memoria (Parte 2 - Meccanismi) Materiale: Kandel Cap. 51-52 Protocollo: Workflow adattivo. Focus su LTP e consolidamento sinaptico.",
    "sessione_pomeriggio": "RIPASSO GENERALE MODULO 4 Sessione di consolidamento di tutta la fisiologia d'organo. Rivedere tutte le mappe concettuali."
  },
  {
    "day": "Ven",
    "date": "14/11",
    "full_date": "14/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 3: Linguaggio (Parte 1) Materiale: Kandel Cap. 53 (prime 25 pag) Protocollo: Workflow adattivo. Creare mappa delle aree linguistiche.",
    "sessione_pomeriggio": "RIPASSO GENERALE MODULO 4 Sessione Anki estesa su tutti gli argomenti di fisiologia d'organo."
  },
  {
    "day": "Sab",
    "date": "15/11",
    "full_date": "15/11/2025",
    "year": 2025,
    "task_ricorrente": "RIPOSO COMPLETO",
    "sessione_mattina": "RIPOSO COMPLETO",
    "sessione_pomeriggio": "RIPOSO COMPLETO"
  },
  {
    "day": "Dom",
    "date": "16/11",
    "full_date": "16/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 3: Linguaggio (Parte 2) Materiale: Kandel Cap. 53 (ultime 20 pag) Protocollo: Workflow adattivo. Focus su afasie e disturbi linguistici.",
    "sessione_pomeriggio": "RIPASSO INTEGRATIVO Sessione dedicata alle connessioni tra i diversi sistemi fisiologici."
  },
  {
    "day": "Lun",
    "date": "17/11",
    "full_date": "17/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "Modulo 3: Funzioni Esecutive Materiale: Kandel Cap. 54 Protocollo: Workflow adattivo. Creare mappa della corteccia prefrontale e sue funzioni.",
    "sessione_pomeriggio": "RIPASSO INTEGRATIVO Continuazione delle connessioni intersistemiche."
  },
  {
    "day": "Mar",
    "date": "18/11",
    "full_date": "18/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "RIPASSO GENERALE MODULO 2 Sessione di consolidamento di tutti i sistemi motori cerebrali.",
    "sessione_pomeriggio": "RIPASSO INTEGRATIVO Focus sui meccanismi di controllo ormonale comune a più sistemi."
  },
  {
    "day": "Mer",
    "date": "19/11",
    "full_date": "19/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "RIPASSO GENERALE MODULO 2 Sessione Anki estesa sui sistemi motori con focus sui punti deboli.",
    "sessione_pomeriggio": "RIPASSO INTEGRATIVO Integrazione dei sistemi di controllo nervoso e ormonale."
  },
  {
    "day": "Gio",
    "date": "20/11",
    "full_date": "20/11/2025",
    "year": 2025,
    "task_ricorrente": "PAUSA STRATEGICA",
    "sessione_mattina": "Riposo attivo, recupero cognitivo.",
    "sessione_pomeriggio": "Riposo attivo, recupero cognitivo."
  },
  {
    "day": "Ven",
    "date": "21/11",
    "full_date": "21/11/2025",
    "year": 2025,
    "task_ricorrente": "PAUSA STRATEGICA",
    "sessione_mattina": "Riposo attivo, recupero cognitivo.",
    "sessione_pomeriggio": "Riposo attivo, recupero cognitivo."
  },
  {
    "day": "Sab",
    "date": "22/11",
    "full_date": "22/11/2025",
    "year": 2025,
    "task_ricorrente": "RIPOSO COMPLETO",
    "sessione_mattina": "RIPOSO COMPLETO",
    "sessione_pomeriggio": "RIPOSO COMPLETO"
  },
  {
    "day": "Dom",
    "date": "23/11",
    "full_date": "23/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "RIPASSO GENERALE MODULO 3 (Parte 1) Consolidamento delle funzioni corticali superiori - prime metà argomenti.",
    "sessione_pomeriggio": "RIPASSO GENERALE INTEGRATO Sessione dedicata alle connessioni tra neurofisiologia e fisiologia d'organo."
  },
  {
    "day": "Lun",
    "date": "24/11",
    "full_date": "24/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "RIPASSO GENERALE MODULO 3 (Parte 2) Consolidamento delle funzioni corticali superiori - seconda metà argomenti.",
    "sessione_pomeriggio": "RIPASSO GENERALE INTEGRATO Continuazione delle connessioni integrate."
  },
  {
    "day": "Mar",
    "date": "25/11",
    "full_date": "25/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "SIMULAZIONE PARZIALE MODULI 1-2 Test cronometrato sui primi due moduli per verificare il livello di preparazione.",
    "sessione_pomeriggio": "ANALISI ERRORI SIMULAZIONE Analisi dettagliata degli errori della simulazione mattutina."
  },
  {
    "day": "Mer",
    "date": "26/11",
    "full_date": "26/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "RIPASSO MIRATO Sessione focalizzata sulle lacune emerse dalla simulazione precedente.",
    "sessione_pomeriggio": "SIMULAZIONE PARZIALE MODULI 3-4 Test cronometrato sugli ultimi due moduli."
  },
  {
    "day": "Gio",
    "date": "27/11",
    "full_date": "27/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "ANALISI ERRORI E RIPASSO Analisi della seconda simulazione e ripasso mirato.",
    "sessione_pomeriggio": "RIPASSO GENERALE Sessione di consolidamento generale su tutti i moduli."
  },
  {
    "day": "Ven",
    "date": "28/11",
    "full_date": "28/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "RIPASSO INTENSIVO (Parte 1) Sessione intensiva sui concetti più complessi di tutti i moduli.",
    "sessione_pomeriggio": "RIPASSO INTENSIVO (Parte 2) Continuazione della sessione intensiva."
  },
  {
    "day": "Sab",
    "date": "29/11",
    "full_date": "29/11/2025",
    "year": 2025,
    "task_ricorrente": "RIPOSO COMPLETO",
    "sessione_mattina": "RIPOSO COMPLETO",
    "sessione_pomeriggio": "RIPOSO COMPLETO"
  },
  {
    "day": "Dom",
    "date": "30/11",
    "full_date": "30/11/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "SIMULAZIONE GENERALE COMPLETA Prima simulazione d'esame completa su tutti i moduli.",
    "sessione_pomeriggio": "ANALISI ERRORI SIMULAZIONE Analisi meticolosa degli errori della simulazione generale."
  },
  {
    "day": "Lun",
    "date": "01/12",
    "full_date": "01/12/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "RIPASSO MIRATO Post-simulazione focalizzato sulle maggiori lacune emerse.",
    "sessione_pomeriggio": "CONSOLIDAMENTO Sessione di consolidamento delle correzioni effettuate."
  },
  {
    "day": "Mar",
    "date": "02/12",
    "full_date": "02/12/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "SIMULAZIONE GENERALE 2 Seconda simulazione d'esame completa.",
    "sessione_pomeriggio": "ANALISI ERRORI SIMULAZIONE 2 Analisi dettagliata della seconda simulazione."
  },
  {
    "day": "Mer",
    "date": "03/12",
    "full_date": "03/12/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "RIPASSO MIRATO 2 Sessione basata sull'analisi della seconda simulazione.",
    "sessione_pomeriggio": "TECNICHE DI FEYNMAN Applicazione della tecnica sui concetti più ostici residui."
  },
  {
    "day": "Gio",
    "date": "04/12",
    "full_date": "04/12/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "SIMULAZIONE GENERALE 3 Terza simulazione d'esame completa.",
    "sessione_pomeriggio": "ANALISI ERRORI SIMULAZIONE 3 Analisi della terza simulazione."
  },
  {
    "day": "Ven",
    "date": "05/12",
    "full_date": "05/12/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "RIPASSO CHIRURGICO Interventi mirati sui punti deboli persistenti.",
    "sessione_pomeriggio": "CONSOLIDAMENTO FINALE (Parte 1) Prima sessione di consolidamento finale."
  },
  {
    "day": "Sab",
    "date": "06/12",
    "full_date": "06/12/2025",
    "year": 2025,
    "task_ricorrente": "RIPOSO COMPLETO",
    "sessione_mattina": "RIPOSO COMPLETO",
    "sessione_pomeriggio": "RIPOSO COMPLETO"
  },
  {
    "day": "Dom",
    "date": "07/12",
    "full_date": "07/12/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "SIMULAZIONE GENERALE 4 Quarta simulazione d'esame completa.",
    "sessione_pomeriggio": "ANALISI ERRORI SIMULAZIONE 4 Analisi finale pre-consolidamento."
  },
  {
    "day": "Lun",
    "date": "08/12",
    "full_date": "08/12/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "CONSOLIDAMENTO FINALE (Parte 2) Revisione sistematica di tutte le mappe concettuali.",
    "sessione_pomeriggio": "CONSOLIDAMENTO FINALE (Parte 3) Completamento della revisione sistematica."
  },
  {
    "day": "Mar",
    "date": "09/12",
    "full_date": "09/12/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "RIPASSO SELETTIVO Ultimo ripasso mirato sui concetti più difficili.",
    "sessione_pomeriggio": "VERIFICA FINALE Sessione Anki completa come verifica finale."
  },
  {
    "day": "Mer",
    "date": "10/12",
    "full_date": "10/12/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (30-45 min)",
    "sessione_mattina": "AFFINAMENTO Ultima sessione di affinamento pre-esame.",
    "sessione_pomeriggio": "PREPARAZIONE MENTALE Preparazione mentale e riorganizzazione del materiale."
  },
  {
    "day": "Gio",
    "date": "11/12",
    "full_date": "11/12/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (limitato)",
    "sessione_mattina": "RIPASSO LEGGERO Ripasso molto leggero delle mappe principali.",
    "sessione_pomeriggio": "RIPASSO LEGGERO Continuazione del ripasso leggero."
  },
  {
    "day": "Ven",
    "date": "12/12",
    "full_date": "12/12/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (limitato)",
    "sessione_mattina": "MANTENIMENTO Breve sessione di mantenimento.",
    "sessione_pomeriggio": "RELAX COGNITIVO Attività di rilassamento cognitivo."
  },
  {
    "day": "Sab",
    "date": "13/12",
    "full_date": "13/12/2025",
    "year": 2025,
    "task_ricorrente": "RIPOSO COMPLETO",
    "sessione_mattina": "RIPOSO COMPLETO",
    "sessione_pomeriggio": "RIPOSO COMPLETO"
  },
  {
    "day": "Dom",
    "date": "14/12",
    "full_date": "14/12/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Anki (opzionale)",
    "sessione_mattina": "RIPASSO SUPERFICIALE (opzionale) Ripasso molto superficiale se richiesto.",
    "sessione_pomeriggio": "PREPARAZIONE FINALE Preparazione del materiale per l'esame."
  },
  {
    "day": "Lun",
    "date": "15/12",
    "full_date": "15/12/2025",
    "year": 2025,
    "task_ricorrente": "RIPOSO ATTIVO",
    "sessione_mattina": "RIPOSO ATTIVO",
    "sessione_pomeriggio": "RIPOSO ATTIVO"
  },
  {
    "day": "Mar",
    "date": "16/12",
    "full_date": "16/12/2025",
    "year": 2025,
    "task_ricorrente": "RIPOSO COMPLETO",
    "sessione_mattina": "RIPOSO COMPLETO",
    "sessione_pomeriggio": "RIPOSO COMPLETO"
  },
  {
    "day": "Mer",
    "date": "17/12",
    "full_date": "17/12/2025",
    "year": 2025,
    "task_ricorrente": "ESAME",
    "sessione_mattina": "ESAME",
    "sessione_pomeriggio": "GIORNO DELL'ESAME"
  },
  {
    "day": "Mar",
    "date": "23/12",
    "full_date": "23/12/2025",
    "year": 2025,
    "task_ricorrente": "SIMULAZIONE D'ESAME 1",
    "sessione_mattina": "Simulazione d'Esame 1",
    "sessione_pomeriggio": "Analisi dettagliata errori Simulazione 1"
  },
  {
    "day": "Mer",
    "date": "24/12",
    "full_date": "24/12/2025",
    "year": 2025,
    "task_ricorrente": "Vigilia di Natale - RIPOSO",
    "sessione_mattina": "Ripasso leggero Anki (opzionale, < 1 ora)",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Gio",
    "date": "25/12",
    "full_date": "25/12/2025",
    "year": 2025,
    "task_ricorrente": "Natale - RIPOSO COMPLETO",
    "sessione_mattina": "RIPOSO COMPLETO",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Ven",
    "date": "26/12",
    "full_date": "26/12/2025",
    "year": 2025,
    "task_ricorrente": "Santo Stefano - RIPOSO COMPLETO",
    "sessione_mattina": "RIPOSO COMPLETO",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Sab",
    "date": "27/12",
    "full_date": "27/12/2025",
    "year": 2025,
    "task_ricorrente": "RIPOSO COMPLETO",
    "sessione_mattina": "RIPOSO COMPLETO",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Dom",
    "date": "28/12",
    "full_date": "28/12/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Mirato",
    "sessione_mattina": "Ripasso Mirato",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Lun",
    "date": "29/12",
    "full_date": "29/12/2025",
    "year": 2025,
    "task_ricorrente": "Simulazione d'Esame 2",
    "sessione_mattina": "Analisi dettagliata errori Simulazione 2",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Mar",
    "date": "30/12",
    "full_date": "30/12/2025",
    "year": 2025,
    "task_ricorrente": "Ripasso Mirato",
    "sessione_mattina": "Ripasso Mirato",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Mer",
    "date": "31/12",
    "full_date": "31/12/2025",
    "year": 2025,
    "task_ricorrente": "San Silvestro - RIPOSO",
    "sessione_mattina": "Ripasso leggero mappe concettuali (opzionale)",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Gio",
    "date": "01/01",
    "full_date": "01/01/2026",
    "year": 2026,
    "task_ricorrente": "Capodanno - RIPOSO COMPLETO",
    "sessione_mattina": "RIPOSO COMPLETO",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Ven",
    "date": "02/01",
    "full_date": "02/01/2026",
    "year": 2026,
    "task_ricorrente": "Simulazione d'Esame 3",
    "sessione_mattina": "Analisi dettagliata errori Simulazione 3",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Sab",
    "date": "03/01",
    "full_date": "03/01/2026",
    "year": 2026,
    "task_ricorrente": "RIPOSO COMPLETO",
    "sessione_mattina": "RIPOSO COMPLETO",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Dom",
    "date": "04/01",
    "full_date": "04/01/2026",
    "year": 2026,
    "task_ricorrente": "Ripasso Mirato",
    "sessione_mattina": "Ripasso Mirato",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Lun",
    "date": "05/01",
    "full_date": "05/01/2026",
    "year": 2026,
    "task_ricorrente": "Simulazione d'Esame 4",
    "sessione_mattina": "Analisi dettagliata errori Simulazione 4",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Mar",
    "date": "06/01",
    "full_date": "06/01/2026",
    "year": 2026,
    "task_ricorrente": "Epifania - RIPOSO COMPLETO",
    "sessione_mattina": "RIPOSO COMPLETO",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Mer",
    "date": "07/01",
    "full_date": "07/01/2026",
    "year": 2026,
    "task_ricorrente": "Ripasso Mirato",
    "sessione_mattina": "Ripasso Mirato",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Gio",
    "date": "08/01",
    "full_date": "08/01/2026",
    "year": 2026,
    "task_ricorrente": "Simulazione d'Esame 5",
    "sessione_mattina": "Analisi dettagliata errori Simulazione 5",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Ven",
    "date": "09/01",
    "full_date": "09/01/2026",
    "year": 2026,
    "task_ricorrente": "Ripasso Mirato",
    "sessione_mattina": "Ripasso Mirato",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Sab",
    "date": "10/01",
    "full_date": "10/01/2026",
    "year": 2026,
    "task_ricorrente": "RIPOSO COMPLETO",
    "sessione_mattina": "RIPOSO COMPLETO",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Dom",
    "date": "11/01",
    "full_date": "11/01/2026",
    "year": 2026,
    "task_ricorrente": "Simulazione d'Esame 6",
    "sessione_mattina": "Analisi dettagliata errori Simulazione 6",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Lun",
    "date": "12/01",
    "full_date": "12/01/2026",
    "year": 2026,
    "task_ricorrente": "Ripasso Mirato",
    "sessione_mattina": "Ripasso Mirato",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Mar",
    "date": "13/01",
    "full_date": "13/01/2026",
    "year": 2026,
    "task_ricorrente": "Simulazione d'Esame 7 (Finale)",
    "sessione_mattina": "Analisi dettagliata errori Simulazione 7",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Mer",
    "date": "14/01",
    "full_date": "14/01/2026",
    "year": 2026,
    "task_ricorrente": "Ripasso Mirato",
    "sessione_mattina": "Ripasso Mirato",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Gio",
    "date": "15/01",
    "full_date": "15/01/2026",
    "year": 2026,
    "task_ricorrente": "Ripasso generale finale",
    "sessione_mattina": "Ripasso generale finale",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Ven",
    "date": "16/01",
    "full_date": "16/01/2026",
    "year": 2026,
    "task_ricorrente": "Ripasso focalizzato mappe",
    "sessione_mattina": "Sessione Anki completa",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Sab",
    "date": "17/01",
    "full_date": "17/01/2026",
    "year": 2026,
    "task_ricorrente": "Ripasso Leggero",
    "sessione_mattina": "Revisione delle sole mappe concettuali principali",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Dom",
    "date": "18/01",
    "full_date": "18/01/2026",
    "year": 2026,
    "task_ricorrente": "Riposo Quasi Totale",
    "sessione_mattina": "Sessione Anki breve al mattino (< 30 min)",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Lun",
    "date": "19/01",
    "full_date": "19/01/2026",
    "year": 2026,
    "task_ricorrente": "Riposo Completo",
    "sessione_mattina": "Nessuna attività di studio",
    "sessione_pomeriggio": ""
  },
  {
    "day": "Mar",
    "date": "20/01",
    "full_date": "20/01/2026",
    "year": 2026,
    "task_ricorrente": "GIORNO DELL'ESAME",
    "sessione_mattina": "ESAME",
    "sessione_pomeriggio": ""
  }
];

// Componente principale dell'applicazione
function StudyCalendar() {
  const [completedTasks, setCompletedTasks] = useState(new Set());

  // Funzione per creare un ID unico per ogni task
  const createTaskId = (date, type, content) => {
    return `${date}-${type}-${content.substring(0, 50)}`;
  };

  // Calcola tutte le attività e le completate
  const { allTasks, completedCount, totalCount, progressPercentage } = useMemo(() => {
    const tasks = [];
    
    studyData.forEach(day => {
      // Task ricorrente
      if (day.task_ricorrente && day.task_ricorrente.trim()) {
        tasks.push({
          id: createTaskId(day.date, 'ricorrente', day.task_ricorrente),
          date: day.date,
          type: 'ricorrente',
          content: day.task_ricorrente
        });
      }
      
      // Sessione mattina
      if (day.sessione_mattina && day.sessione_mattina.trim()) {
        tasks.push({
          id: createTaskId(day.date, 'mattina', day.sessione_mattina),
          date: day.date,
          type: 'mattina',
          content: day.sessione_mattina
        });
      }
      
      // Sessione pomeriggio
      if (day.sessione_pomeriggio && day.sessione_pomeriggio.trim()) {
        tasks.push({
          id: createTaskId(day.date, 'pomeriggio', day.sessione_pomeriggio),
          date: day.date,
          type: 'pomeriggio',
          content: day.sessione_pomeriggio
        });
      }
    });

    const total = tasks.length;
    const completed = tasks.filter(task => completedTasks.has(task.id)).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      allTasks: tasks,
      completedCount: completed,
      totalCount: total,
      progressPercentage: percentage
    };
  }, [completedTasks]);

  // Funzione per gestire il completamento delle attività
  const toggleTaskCompletion = (taskId) => {
    setCompletedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  // Determina se è un giorno corrente (simuliamo il 15/10/2025)
  const getCurrentDate = () => {
    // Per il demo, usiamo il 15/10 come giorno corrente
    return "15/10";
  };

  const currentDate = getCurrentDate();

  // Funzione per determinare il tipo di giorno
  const getDayType = (day) => {
    const task = day.task_ricorrente.toLowerCase();
    if (task.includes('riposo completo')) return 'rest';
    if (task.includes('pausa strategica')) return 'pause';
    if (task.includes('esame')) return 'exam';
    return 'normal';
  };

  // Componente per il task
  const TaskItem = ({ task, dayType }) => {
    const isCompleted = completedTasks.has(task.id);
    const isSpecialTask = task.content.includes('RIPOSO COMPLETO') || 
                         task.content.includes('PAUSA STRATEGICA') || 
                         task.content.includes('ESAME');

    let taskClass = 'task-item';
    if (isCompleted) taskClass += ' completed';
    if (task.content.includes('RIPOSO COMPLETO')) taskClass += ' rest-task';
    if (task.content.includes('PAUSA STRATEGICA')) taskClass += ' pause-task';
    if (task.content.includes('ESAME')) taskClass += ' exam-task';

    return (
      <div className={taskClass}>
        <div 
          className={`task-checkbox ${isCompleted ? 'checked' : ''}`}
          onClick={() => toggleTaskCompletion(task.id)}
          role="checkbox"
          aria-checked={isCompleted}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleTaskCompletion(task.id);
            }
          }}
        >
          {isCompleted && <span className="checkmark">✓</span>}
        </div>
        <div className={`task-text ${isCompleted ? 'completed' : ''}`}>
          {task.content}
        </div>
      </div>
    );
  };

  return (
    <div className="study-calendar">
      {/* Header con barra di progresso */}
      <header className="header">
        <h1>Calendario di Studio</h1>
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {completedCount}/{totalCount} attività completate - {progressPercentage}%
          </div>
        </div>
      </header>

      {/* Calendario */}
      <div className="calendar-container">
        <div className="calendar-grid">
          {studyData.map((day, index) => {
            const dayType = getDayType(day);
            const isCurrentDay = day.date === currentDate;
            
            return (
              <div 
                key={index} 
                className={`day-card ${isCurrentDay ? 'current-day' : ''}`}
              >
                <div className={`day-header ${dayType === 'rest' ? 'rest-day' : ''} ${dayType === 'pause' ? 'pause-day' : ''}`}>
                  <h3 className="day-title">{day.day}</h3>
                  <div className="day-date">{day.date}</div>
                </div>
                
                <div className="day-content">
                  {/* Task ricorrente */}
                  {day.task_ricorrente && day.task_ricorrente.trim() && (
                    <div className="task-section">
                      <h4 className="section-title">
                        <span className="section-icon recurring-icon"></span>
                        Task Ricorrente
                      </h4>
                      <TaskItem 
                        task={{
                          id: createTaskId(day.date, 'ricorrente', day.task_ricorrente),
                          content: day.task_ricorrente,
                          type: 'ricorrente'
                        }}
                        dayType={dayType}
                      />
                    </div>
                  )}

                  {/* Sessione mattina */}
                  {day.sessione_mattina && day.sessione_mattina.trim() && (
                    <div className="task-section">
                      <h4 className="section-title">
                        <span className="section-icon morning-icon"></span>
                        Mattina (AM)
                      </h4>
                      <TaskItem 
                        task={{
                          id: createTaskId(day.date, 'mattina', day.sessione_mattina),
                          content: day.sessione_mattina,
                          type: 'mattina'
                        }}
                        dayType={dayType}
                      />
                    </div>
                  )}

                  {/* Sessione pomeriggio */}
                  {day.sessione_pomeriggio && day.sessione_pomeriggio.trim() && (
                    <div className="task-section">
                      <h4 className="section-title">
                        <span className="section-icon afternoon-icon"></span>
                        Pomeriggio (PM)
                      </h4>
                      <TaskItem 
                        task={{
                          id: createTaskId(day.date, 'pomeriggio', day.sessione_pomeriggio),
                          content: day.sessione_pomeriggio,
                          type: 'pomeriggio'
                        }}
                        dayType={dayType}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Render dell'applicazione
ReactDOM.render(<StudyCalendar />, document.getElementById('root'));