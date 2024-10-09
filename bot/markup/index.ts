import "dotenv/config";

const webAppURL = process.env.WEB_APP_URL;
const magicButton = (keyboard) => new keyboard().webApp("💫 Tap!", webAppURL);

export { magicButton };
