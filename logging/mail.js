const nodemailer = require('nodemailer');
const { createEvent } = require('ics');

function sendEmail(subject, text, plainText, toEmail = "l.bauscher@gmx.de", fromEmail = "Anett's 60. Geburtstag") {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'lori.bauscher@gmail.com',
          pass: "gyyb ewkg briz nkpd"
      }
    });
    const calendarEvent = createCalendarEvent();
    // E-Mail senden
    transporter.sendMail({
        from: `"${fromEmail}" <lori.bauscher@gmail.com>`,
        to: toEmail,
        subject: subject,
        html: text,
        text: plainText,
        attachments: [
            {
                filename: 'Background.png',
                path: './assets/Background.png',
                cid: 'background'
            },
            {
                filename: 'invite.ics',
                content: calendarEvent,
                contentType: 'text/calendar'
            }
        ]
    });
    return "Nachricht erfolgreich gesendet!"
}

function createCalendarEvent() {

    const event = {
        start: [2026, 7, 18, 15, 0],
        duration: { hours: 11 },
        title: "Anetts 60. Geburtstag",
        description: "Eine Geburtstagsfeier zum Erinnern!",
        location: "Carl-Diem-Straße 7",
        status: "CONFIRMED",
        organizer: {
            name: "Anett",
            email: "a.kuehfuss@icloud.com"
        }
    };

    const { error, value } = createEvent(event);

    if (error) {
        console.log(error);
        return null;
    }

    return value;
}

module.exports = {
    sendEmail
}

