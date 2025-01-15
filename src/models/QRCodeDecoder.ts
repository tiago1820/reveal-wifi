import Jimp from "jimp";
import QrCodeReader from "qrcode-reader";
import { IQRCodeDecoder } from "../interfaces/IQRCodeDecoder";

export class QRCodeDecoder implements IQRCodeDecoder {
    async decode(imagePath: string): Promise<string> {
        const image = await Jimp.read(imagePath);
        const qr = new QrCodeReader();

        const bitmap = {
            data: image.bitmap.data,
            width: image.bitmap.width,
            height: image.bitmap.height,
        };

        return new Promise((resolve, reject) => {
            qr.callback = (err, value) => {
                if (err || !value) {
                    reject("Error al decodificar el código QR");
                } else {
                    resolve(value.result);
                }
            };

            qr.decode(bitmap);
        });
    }
}