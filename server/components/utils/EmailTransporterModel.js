import React from "react";

/* Layouts */
// import General from '../../../emails/EmailLayouts/General';

/* Emails */
import Example from "../../../emails/EmailContainers/Example";

/* Render options */
import RenderPlainTextEmail from "../../../emails/EmailRenderers/RenderPlainTextEmail";
// import RenderHTMLEmail from '../../../emails/EmailRenderers/RenderHTMLEmail';

class EmailTransporterModel {
    constructor(emailTransporters) {
        Object.defineProperty(this, "emailTransporters", {
            enumerable: true,
            configurable: false,
            value: emailTransporters,
        });
    }

    sendEmailExample(username, email) {
        return new Promise((resolve, reject) => {
            const text = RenderPlainTextEmail.renderTemplate(<Example websiteURL={this.emailTransporters.websiteURL} plainText username={username} email={email} />);

            const message = {
                to: email,
                subject: "Example subject",
                text,
            };

            this.emailTransporters.userEmailTransporter.sendMail(message).then(() => {
                resolve();
            }).catch((errors) => {
                console.error(errors);

                reject(new Error({
                    reason: "Service Unavailable",
                    status: 503,
                }));
            });
        });
    }
}

export default EmailTransporterModel;