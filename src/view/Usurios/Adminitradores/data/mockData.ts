export const agricultoresData = [
  {
    id: 1,
    nombre: "Juan Pérez",
    constanciaFiscal: "constancia_juan.pdf",
    titulosCultivo: "titulos_juan.pdf",
    noms: ["NOM-037-FITO-1995", "NOM-002-FITO-1996"],
  },
  {
    id: 2,
    nombre: "María López",
    constanciaFiscal: "constancia_maria.pdf",
    titulosCultivo: "titulos_maria.pdf",
    noms: ["NOM-037-FITO-1995"],
  },
];

export const logisticaData = [
  {
    id: 1,
    empresa: "TransAgro Express",
    constanciaFiscal: "transagro_fiscal.pdf",
    permisoSCT: "permiso_sct.pdf",
    certificacionNOM: "NOM-068-SCT-2-2014.pdf",
  },
  {
    id: 2,
    empresa: "LogiCampo MX",
    constanciaFiscal: "logicampo_fiscal.pdf",
    permisoSCT: "logicampo_permiso.pdf",
    certificacionNOM: "NOM-068-SCT-2-2014.pdf",
  },
];

export const distribuidoresData = [
  {
    id: 1,
    empresa: "AgroDistribuciones del Bajío",
    constanciaFiscal: "bajio_fiscal.pdf",
    licenciaSAT: "bajio_sat.pdf",
    nom: "NOM-003-SAGARPA-2016.pdf",
  },
  {
    id: 2,
    empresa: "Distribuciones del Norte",
    constanciaFiscal: "norte_fiscal.pdf",
    licenciaSAT: "norte_sat.pdf",
    nom: "NOM-003-SAGARPA-2016.pdf",
  },
];

export const faltantesData = [
  {
    id: 1,
    tipo: "Agricultor",
    nombre: "Carlos Díaz",
    pendiente: "Falta constancia de situación fiscal",
  },
  {
    id: 2,
    tipo: "Logística",
    nombre: "Camino Verde S.A.",
    pendiente: "Falta permiso SCT",
  },
];
