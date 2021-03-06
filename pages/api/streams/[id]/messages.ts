import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSesstion";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    body,
    session: { user },
  } = req;
  const message = await client.message.create({
    data: {
      message: body?.message,
      user: {
        connect: {
          id: user?.id,
        },
      },
      stream: {
        connect: {
          id: +id.toString(),
        },
      },
    },
  });
  res.json({
    ok: true,
    message,
  });
}

export default withApiSession(
  withHandler({
    method: ["POST"],
    handler,
  })
);
