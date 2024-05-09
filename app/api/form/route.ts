// import sgMail from '@sendgrid/mail';
// import { NextResponse, NextRequest } from "next/server";

// sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// export async function POST(req: NextRequest) {
//     const { name, email, message }: { name: string; email: string; message: string } = await req.json();
//     const msg = {
//         to: 'lungugeorgiana20@stud.ase.ro',
//         from: 'cojocaruandreea186@gmail.com',
//         subject: `${name.toUpperCase()} send you a email`,
//         text: `Email => ${email}`,
//         html: `<strong> ${message}</sytong>`,
//     };

//     try {
//         await sgMail.send(msg);
//         return NextResponse.json({ success: true }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ success: false }, { status: 500 });
//     }
// }

import sgMail from '@sendgrid/mail';
import { NextResponse, NextRequest } from "next/server";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: NextRequest) {
    const { name, email, message }: { name: string; email: string; message: string } = await req.json();
    const msg = {
        to: 'lungugeorgiana20@stud.ase.ro',
        from: 'cojocaruandreea186@gmail.com',
        subject: `${name.toUpperCase()} send you a email`,
        text: `Email => ${email}`,
        html: `<strong> ${message}</sytong>`,
    };

    sgMail.send(msg)
        .then(() => {
            return NextResponse.json({ success: true }, { status: 200 });
        })
        .catch((error) => {
            console.error(error);
            return NextResponse.json({ success: false }, { status: 500 });
        });
}
