import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
const from = process.env.RESEND_FROM_EMAIL || "noreply@hangukstudio.com";

export async function sendPendingEmail(to: string, name: string, workshop: string, date: string, time: string, total: string, bookingId: string) {
  if (!resend) return;
  await resend.emails.send({
    from: `Hanguk Studio <${from}>`,
    to,
    subject: `Booking Pending — ${workshop}`,
    text: `Hi ${name},\n\nYour booking for ${workshop} on ${date} at ${time} is pending.\n\nTotal: €${total}\n\nHow to pay:\n- Wise: [FAKE] maria@hangukstudio.com\n- MBWay: [FAKE] +351 900 000 000\n- Bank Transfer: [FAKE] PT50 1234 5678 9012 3456 7890 1\n\nPay within 24h to secure your spot.\n\nBooking ID: ${bookingId}\n\n— Hanguk Studio`,
  });
}

export async function sendConfirmedEmail(to: string, name: string, workshop: string, date: string, time: string, voucherUrl: string) {
  if (!resend) return;
  await resend.emails.send({
    from: `Hanguk Studio <${from}>`,
    to,
    subject: `Payment Confirmed — ${workshop} ✅`,
    text: `Hi ${name},\n\nYour payment is confirmed for ${workshop} on ${date} at ${time}.\n\nView your voucher: ${voucherUrl}\n\nSee you there!\n\n— Hanguk Studio`,
  });
}

export async function notifyAdmin(workshop: string, name: string, email: string, people: number, total: string) {
  if (!resend) return;
  const adminEmail = process.env.ADMIN_EMAIL || from;
  await resend.emails.send({
    from: `Hanguk Studio <${from}>`,
    to: adminEmail,
    subject: `New Booking: ${workshop}`,
    text: `New booking!\n\nWorkshop: ${workshop}\nName: ${name}\nEmail: ${email}\nPeople: ${people}\nTotal: €${total}`,
  });
}
