const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
let ejs = require('ejs');
admin.initializeApp();

// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
// firebase functions:config:set gmail.email="myusername@gmail.com" gmail.password="secretpassword"

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

const APP_NAME = 'WavePilots';

const actionCodeSettings = {
    url: 'https://wavepilots-67f1c.firebaseapp.com/',
};

/**
 * Sends a welcome email when user create.
 */
exports.sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
    const email = user.email; // The email of the user.

    var verificationLink = await admin.auth().generateEmailVerificationLink(email, actionCodeSettings);

    let renderedHtml = await ejs.renderFile('./templates/welcome.ejs', {verificationLink});

    const mailOptions = {
        from: `${APP_NAME} <noreply@wavepilots.com>`,
        replyTo: 'noreply@wavepilots.com',
        to: email,
        subject: `Welcome to ${APP_NAME}!`,
        html: renderedHtml
    };
    console.log(mailOptions);

    await mailTransport.sendMail(mailOptions);
    console.log('New welcome email sent to:', email);

    return null;
});

/**
 * deleting user
 */
exports.sendByeEmail = functions.auth.user().onDelete(async (user) => {
    console.log(user);

    const email = user.email; // The email of the user.
    const uid = user.uid;
    
    //delete user from database
    var db = admin.database();
});

/**
 * reset password
 */
exports.sendResetPasswordEmail = functions.https.onCall(async (data, context) => {
    const email = data.email; 

    var resetLink = await admin.auth().generatePasswordResetLink(email, actionCodeSettings);
    console.log(resetLink);

    let renderedHtml = await ejs.renderFile('./templates/reset-password.ejs', {resetLink});

    const mailOptions = {
        from: `${APP_NAME} <noreply@wavepilots.com>`,
        replyTo: 'noreply@wavepilots.com',
        to: email,
        subject: `Reset your password for ${APP_NAME}!`,
        html: renderedHtml
    };
    console.log(mailOptions);

    await mailTransport.sendMail(mailOptions);
    console.log('New reset email sent to:', email);

    return null;
})
