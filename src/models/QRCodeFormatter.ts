import { IQRCodeFormatter } from "../interfaces/IQRCodeFormatter";

export class QRCodeFormatter implements IQRCodeFormatter {
    format(qrData: string): string {
        if (qrData.startsWith("WIFI:")) {
            const regex = /S:([^;]*);.*P:([^;]*);/;
            const match = qrData.match(regex);

            if (match) {
                const network = match[1];
                const password = match[2];
                return `Red: ${network}\nPassword: ${password}`;
            }
        }
        return `Información del QR: ${qrData}`;
    }
}