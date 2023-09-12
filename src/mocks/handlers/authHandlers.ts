import { rest } from 'msw';
import { API_URLS, BASE_URL } from '@/constant/config';
import { users } from '../fixture';

export const signUp = rest.post<{ email: string; password: string }>(
  BASE_URL + API_URLS.SIGN_UP,
  async (req, res, ctx) => {
    const { email, password } = await req.json<{
      email: string;
      password: string;
    }>();

    if (!email || !password)
      return res(
        ctx.status(400),
        ctx.json({ success: false, msg: `'이메일 혹은 비밀 번호가 없습니다.'` })
      );

    if (users.documents.map((user) => user.email).includes(email)) {
      return res(
        ctx.status(400),
        ctx.json({
          success: false,
          msg: `Error: 이미 가입한 아이디입니다. ${email}`,
        })
      );
    }

    users.documents.push({
      _id: 'qwer1234',
      email,
      passwordHash: password,
      passwordSalt: password,
    });

    return res(ctx.status(201));
  }
);

export const signIn = rest.post(
  BASE_URL + API_URLS.SIGN_IN,
  async (req, res, ctx) => {
    const { email, password } = await req.json<{
      email: string;
      password: string;
    }>();

    const [user] = users.documents.filter((user) => user.email === email);
    if (user === undefined) {
      return res(
        ctx.status(400),
        ctx.json({
          success: false,
          msg: 'Error: 이메일이 없습니다.',
        })
      );
    } else {
      if (user.passwordHash === password && user.passwordSalt === password) {
        return res(
          ctx.status(201),
          ctx.json({
            success: true,
            access_token: 'asdf1234',
            refresh_token: 'qwer6789',
          })
        );
      } else {
        return res(
          ctx.status(400),
          ctx.json({
            success: false,
            msg: 'Error: 비밀번호가 일치하지 않습니다.',
          })
        );
      }
    }
  }
);

export const refresh = rest.post(
  BASE_URL + API_URLS.REFRESH,
  async (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        access_token: 'zxcv9876',
      })
    );
  }
);
