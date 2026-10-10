import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  ensureDefaultAdmin,
  verifyPassword,
  signSessionToken,
  getSessionCookieOptions,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Ensure default admin exists on first launch
    await ensureDefaultAdmin();

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e palavra-passe são obrigatórios." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    const user = await prisma.adminUser.findUnique({
      where: { email: cleanEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Credenciais inválidas. Verifique o email e palavra-passe." },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Credenciais inválidas. Verifique o email e palavra-passe." },
        { status: 401 }
      );
    }

    // Update lastLoginAt
    await prisma.adminUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Create session token
    const token = signSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const cookieOpts = getSessionCookieOptions();

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set({
      name: cookieOpts.name,
      value: token,
      httpOnly: cookieOpts.httpOnly,
      secure: cookieOpts.secure,
      sameSite: cookieOpts.sameSite,
      path: cookieOpts.path,
      maxAge: cookieOpts.maxAge,
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor ao tentar iniciar sessão." },
      { status: 500 }
    );
  }
}
