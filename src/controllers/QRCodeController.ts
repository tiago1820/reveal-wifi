import { IQRCodeDecoder } from "../interfaces/IQRCodeDecoder";
import { IQRCodeFormatter } from "../interfaces/IQRCodeFormatter";

export class QRCodeController {
    constructor(
        private decoder: IQRCodeDecoder,
        private formatter: IQRCodeFormatter
    ) { }

    async processQRCode(imagePath: string): Promise<void> {
        try {
            const qrData = await this.decoder.decode(imagePath);
            const formattedResult = this.formatter.format(qrData);
            console.log(formattedResult);
        } catch (error) {
            console.error("Error: ", error);
        }
    }
}