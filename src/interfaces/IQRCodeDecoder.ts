export interface IQRCodeDecoder {
    decode(imagePath: string): Promise<string>;
}