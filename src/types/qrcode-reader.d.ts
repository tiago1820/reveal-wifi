declare module "qrcode-reader" {
    export default class QrCodeReader {
        decode(bitmap: {
            data: Buffer | Uint8Array;
            width: number;
            height: number;
        }): void;
        callback: (error: Error | null, result: { result: string } | null) => void;
    }
}