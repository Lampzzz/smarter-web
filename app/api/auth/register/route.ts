import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function POST(request: Request) {
  console.log("request", request);

  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const userCrendential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCrendential.user;

    return Response.json({ uid: user.uid, email: user.email });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
}
