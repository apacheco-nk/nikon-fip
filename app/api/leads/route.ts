import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object' || Array.isArray(body) || body.website)
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 });
  const text = (value: unknown, max: number) =>
    typeof value === 'string' ? value.trim().slice(0, max) : '';
  const lead = {
    nombre: text(body.nombre, 120),
    email: text(body.email, 254).toLowerCase(),
    telefono: text(body.telefono, 40),
    modelo_camara: text(body.camara, 120),
    instagram: text(body.instagram, 120) || null,
    consentimiento: body.consentimiento === true,
  };
  if (
    !lead.nombre ||
    !emailPattern.test(lead.email) ||
    !lead.telefono ||
    !lead.modelo_camara ||
    !lead.consentimiento
  )
    return NextResponse.json(
      { error: 'Completa correctamente todos los campos obligatorios.' },
      { status: 422 },
    );
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !key)
    return NextResponse.json(
      { error: 'El registro aún no está disponible. Inténtalo más tarde.' },
      { status: 503 },
    );
  try {
    const parsed = new URL(url);
    if (
      parsed.protocol !== 'https:' ||
      !parsed.hostname.endsWith('.supabase.co') ||
      parsed.pathname !== '/'
    )
      throw new Error('Configuración inválida');
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error } = await supabase.from('leads').insert(lead);
    if (error) {
      console.error('No fue posible registrar el contacto:', error.code);
      return NextResponse.json(
        { error: 'No pudimos completar el registro. Inténtalo nuevamente.' },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        error:
          'El registro no está disponible en este momento. Inténtalo más tarde.',
      },
      { status: 503 },
    );
  }
}
