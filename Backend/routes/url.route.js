import express from "express";
import { shortenPostRequestBodySchema } from "../validation/request.validation.js";
import { db } from "../db/index.js";
import { urlsTable } from "../models/index.js";
import { nanoid } from "nanoid";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import { eq } from "drizzle-orm";
import { and } from "drizzle-orm";

const router = express.Router();

router.post("/shorten", ensureAuthenticated, async function (req, res) {
  const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
    req.body
  );
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error });
  }
  const { url, code } = validationResult.data;

  const ShortCode = code && code.trim() !== "" ? code : nanoid(6);

  const [result] = await db
    .insert(urlsTable)
    .values({
      ShortCode,
      targetURL: url,
      userId: req.user?.id,
    })
    .returning({
      id: urlsTable.id,
      ShortCode: urlsTable.ShortCode,
      targetURL: urlsTable.targetURL,
    });
  return res.status(201).json({
    id: result.id,
    shortCode: result.ShortCode,
    targetURL: result.targetURL,
  });
});

router.get("/codes", ensureAuthenticated, async function (req, res) {
  const codes = await db
    .select()
    .from(urlsTable)
    .where(eq(urlsTable.userId, req.user.id));
  return res.json({ codes });
});

router.delete("/:id", ensureAuthenticated, async function (req, res) {
  const id = req.params.id;
  await db
    .delete(urlsTable)
    .where(and(eq(urlsTable.id, id), eq(urlsTable.userId, req.user.id)));
  return res.status(200).json({ deleted: true });
});

router.get("/:shortCode", async function (req, res) {
  const code = req.params.shortCode;
  const [result] = await db
    .select({
      targetURL: urlsTable.targetURL,
    })
    .from(urlsTable)
    .where(eq(urlsTable.ShortCode, code));
  if (!result) {
    return res.status(404).json({ error: `Invalid URL` });
  }
  return res.redirect(result.targetURL);
});

export default router;
