const Jimp = require("jimp");
const QrCodeReader = require("qrcode-reader");
const fs = require("fs");

async function decodeQR(imagePath) {
    try {
        const image = await Jimp.read(imagePath);
        const qr = new QrCodeReader();

        const bitmap = {
            data: image.bitmap.data,
            width: image.bitmap.width,
            height: image.bitmap.height,
        };

        const result = await new Promise((resolve, reject) => {
            qr.callback = (err, value) => {
                if (err) {
                    reject("Error al decodificar el código QR");
                } else {
                    resolve(value.result);
                }
            };

            qr.decode(bitmap);
        });

        const formattedResult = formatWifiQR(result);
        console.log(formattedResult);
    } catch (error) {
        console.error("Error:", error);
    }
}

function formatWifiQR(qrData) {
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

const args = process.argv.slice(2);

if (args.length === 0) {
    console.error("Use: node index.js <ruta_de_la_imagen>");
    process.exit(1);
}

const imagePath = args[0];

if (fs.existsSync(imagePath)) {
    decodeQR(imagePath);
} else {
    console.error("La imagen no existe. Verifica la ruta:", imagePath);
    process.exit(1);
}