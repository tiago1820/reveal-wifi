import fs from "fs";
import { QRCodeDecoder } from "../models/QRCodeDecoder";
import { QRCodeFormatter } from "../models/QRCodeFormatter";
import { QRCodeController } from "../controllers/QRCodeController";

export function main(): void {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.error("Use: node index.js <ruta_de_la_imagen>");
        process.exit(1);
    }

    const imagePath = args[0];

    if (!fs.existsSync(imagePath)) {
        console.error("La imagen no existe. Verifica la ruta:", imagePath);
        process.exit(1);
    }

    const decoder = new QRCodeDecoder();
    const formatter = new QRCodeFormatter();
    const constroller = new QRCodeController(decoder, formatter);

    constroller.processQRCode(imagePath);

}