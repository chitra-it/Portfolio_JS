const http = require("http");

const PORT = process.env.PORT || 5000;
const CONTACT_TO_NUMBER = process.env.CONTACT_TO_NUMBER || "7411422691";
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "";
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER || "";
const REQUIRE_TWILIO = process.env.REQUIRE_TWILIO === "true";

const sendJson = (res, statusCode, data) => {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(data));
};

const sendSmsViaTwilio = async ({ name, email, message }) => {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER) {
    if (REQUIRE_TWILIO) {
      throw new Error(
        "Missing Twilio config. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_FROM_NUMBER."
      );
    }
    console.log("Mock SMS mode: Twilio not configured.", {
      to: CONTACT_TO_NUMBER,
      name,
      email,
      message,
      receivedAt: new Date().toISOString(),
    });
    return { mode: "mock" };
  }

  const bodyText = `New contact form message\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
  const authHeader = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64");
  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        To: CONTACT_TO_NUMBER,
        From: TWILIO_FROM_NUMBER,
        Body: bodyText,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Twilio error: ${response.status} ${errorText}`);
  }

  return { mode: "twilio" };
};

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  if (req.url === "/api/contact" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
      }
    });

    req.on("end", async () => {
      try {
        const payload = JSON.parse(body || "{}");
        const name = String(payload.name || "").trim();
        const email = String(payload.email || "").trim();
        const message = String(payload.message || "").trim();

        if (!name || !email || !message) {
          sendJson(res, 400, { ok: false, error: "name, email, and message are required" });
          return;
        }

        const smsResult = await sendSmsViaTwilio({ name, email, message });
        sendJson(res, 200, { ok: true, sentTo: CONTACT_TO_NUMBER, mode: smsResult.mode });
      } catch (error) {
        const isParseError = error instanceof SyntaxError;
        const statusCode = isParseError ? 400 : 500;
        sendJson(res, statusCode, { ok: false, error: error.message || "failed to send SMS" });
      }
    });

    return;
  }

  sendJson(res, 404, { ok: false, error: "not found" });
});

server.listen(PORT, () => {
  console.log(`Contact API server running on http://localhost:${PORT}`);
});
