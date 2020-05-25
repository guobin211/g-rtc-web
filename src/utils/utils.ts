/**
 * propsSet 设置默认属性值
 * @param obj target
 * @param key prop
 * @param data default value
 */
export function propsSet(obj: any, key: string | string[], data: any) {
  if (typeof key === 'string') {
    obj[key] = data;
  } else {
    key.forEach(k => obj[k] = data);
  }
}

/**
 * urlToBase64
 * @param url img url
 */
export function urlToBase64(url: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d')?.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => {
      reject(new Error('urlToBase64() error'));
    };
    img.setAttribute("crossOrigin", 'Anonymous');
    img.src = url;
  });
}

/**
 * blobToBase64
 * @param data Blod
 */
export function blobToBase64(data: Blob) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = (e) => {
      resolve(e.target?.result);
    }
    fr.onerror = () => {
      reject(new Error('blobToBase64() error'))
    }
    fr.readAsDataURL(data);
  })
}

/**
 * base64ToBlob
 * @param dataUrl base64 ? data
 * @param type mime type
 */
export function base64ToBlob(dataUrl: string, type?: string) {
  const arr = dataUrl.split(',');
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  if (type) {
    return new Blob([u8arr], { type: type });
  } else {
    const reg = /:(.*?);/;
    const mc = arr[0]?.match(reg);
    const mime = mc ? mc[1] : 'text/plain';
    return new Blob([u8arr], { type: mime });
  }
}
