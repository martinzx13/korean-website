import QRCode from "qrcode";

export async function generateQR(data: string): Promise<string> {
  return await QRCode.toDataURL(data, {
    width: 300,
    margin: 2,
    color: {
      dark: "#2C2C2C",
      light: "#FFFFFF",
    },
  });
}

export function voucherData(bookingId: string, workshop: string, date: string, name: string): string {
  return `booking:${bookingId}|workshop:${workshop}|date:${date}|name:${name}`;
}
