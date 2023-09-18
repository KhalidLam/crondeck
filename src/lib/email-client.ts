import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Failed to initialize Resend Key");
}

const resendMail = new Resend(process.env.RESEND_API_KEY!);

const emailClient = resendMail;

export default emailClient;
