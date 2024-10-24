"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { State, FormState } from "@/types";

const FormSchema = z.object({
  name: z.string().min(4, {
    message: "Enter a username.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, {
    message: "Enter a password at least 8 characters long.",
  }),
});

export async function registerUser(prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (validatedFields.error) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
  } catch (err) {
    return {
      errors: {},
      message: "Database Error: Failed to Create user.",
    };
  }

  return {
    errors: {},
    message: "User account created",
  };

  //   revalidatePath('/');
  //   redirect('/');
}
