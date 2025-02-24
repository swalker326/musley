import { issuer } from "@openauthjs/openauth";
import { CloudflareStorage } from "@openauthjs/openauth/storage/cloudflare";
import { type ExecutionContext } from "@cloudflare/workers-types";
import { subjects } from "./subjects.ts";
import { PasswordProvider } from "@openauthjs/openauth/provider/password";
import { PasswordUI } from "@openauthjs/openauth/ui/password";
import { Hono } from "hono";
import { cors } from "hono/cors";

async function getUser(email: string) {
  // Get user from database
  // Return user ID
  return "123";
}

// export default {
//   async fetch(request: Request, env, ctx: ExecutionContext) {
//     console.log("GOT HERE");
//     return issuer({
//       storage: CloudflareStorage({
//         namespace: env.MUSLEY_AUTH
//       }),
//       subjects,
//       providers: {
//         password: PasswordProvider(
//           PasswordUI({
//             sendCode: async (email, code) => {
//               console.log(email, code);
//             }
//           })
//         )
//       },
//       success: async (ctx, value) => {
//         if (value.provider === "password") {
//           return ctx.subject("user", {
//             id: await getUser(value.email)
//           });
//         }
//         throw new Error("Invalid provider");
//       }
//     }).fetch(request, env, ctx);
//   }
// };

export default {
  async fetch(request: Request, env, ctx: ExecutionContext): Promise<Response> {
    const app = new Hono();
    app.use("/*", cors());

    // Create the OpenAuth issuer
    const openauth = issuer({
      storage: CloudflareStorage({
        namespace: env.MUSLEY_AUTH
      }),
      subjects,
      providers: {
        password: PasswordProvider(
          PasswordUI({
            sendCode: async (email, code) => {
              console.log(email, code);
            }
          })
        )
      },
      success: async (ctx, value) => {
        if (value.provider === "password") {
          return ctx.subject("user", {
            id: await getUser(value.email)
          });
        }
        throw new Error("Invalid provider");
      }
    })

    // Add custom routes before mounting OpenAuth
    app.get('/health', (c) => c.json({ status: 'ok' }));
    
    // Add a custom router with middleware
    const customRouter = new Hono()
      .use('*', async (c, next) => {
        // Custom middleware logic
        await next();
      })
      .get('/profile', (c) => c.json({ message: 'Custom profile endpoint' }))
      .post('/settings', (c) => c.json({ message: 'Update settings' }));

    // Mount custom router
    app.route('/api', customRouter);
    
    // Mount OpenAuth routes last
    app.route('/', openauth);
    app.get("/", (c) => c.text("Hello World"))

    return app.fetch(request, env, ctx);
  }
}
