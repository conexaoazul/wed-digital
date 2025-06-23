import imageCompression from "browser-image-compression";
import axios from "axios";
import ApiConfig from "../config.json";

const options = {
  // (padrão: Number.POSITIVE_INFINITY)
  maxSizeMB: 0.15,

  // O arquivo comprimido será redimensionado por uma razão até que a largura ou altura seja menor que maxWidthOrHeight (padrão: indefinido)
  // Mas reduz automaticamente o tamanho para menor que o tamanho máximo do Canvas suportado por cada navegador.
  // Consulte a seção de Aviso para obter detalhes.
  maxWidthOrHeight: 1920,

  // opcional, uma função que recebe um argumento de progresso (porcentagem de 0 a 100)
  // onProgress: Function,

  // opcional, usar o web worker de várias threads, recuar para executar na thread principal (padrão: true)
  // useWebWorker: boolean,

  // opcional, o libURL desta biblioteca para importação de script no Web Worker (padrão: https://cdn.jsdelivr.net/npm/browser-image-compression/dist/browser-image-compression.js)
  //     libURL: string,

  // opcional, usar preservar metadados Exif para imagens JPEG, por exemplo, Modelo de câmera, Distância focal, etc (padrão: false)
  preserveExif: false,

  // opcional, para abortar / cancelar a compressão
  // signal: AbortSignal,

  // as opções a seguir são para usuários avançados

  // opcional, número máximo de iterações para comprimir a imagem (padrão: 10)
  // maxIteration: number,

  // opcional, consulte https://stackoverflow.com/a/32490603/10395024
  // exifOrientation: number,

  // opcional, substituição do tipo de arquivo, por exemplo, 'image/jpeg', 'image/png' (padrão: file.type)
  // fileType: string,

  // opcional, valor de qualidade inicial entre 0 e 1 (padrão: 1)
  initialQuality: 1,

  // opcional, apenas reduza a qualidade, mantenha sempre a largura e altura (padrão: false)
  // alwaysKeepResolution: boolean,
};

const resizeImage = async (image) => {
  try {
    return await imageCompression(image, options);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const sendImageS3 = async (image) => {
  const arquivoImagem = await resizeImage(image);
  const imagem = new FormData();
  imagem.append("file", arquivoImagem);
  //Send image S3 storage
  return await axios.post(`${ApiConfig.api.linkApiImagem}/uploadImage`, imagem);
};
