import { useState } from 'react';
import { ENDPOINT, SECRET_KEY, SITE_KEY } from 'astro:env/client';

const initialFormData = {
  name: '',
  email: '',
  company: '',
  phone: '',
  interest: '',
  message: '',
};

/** @param {{ addressee?: string }} props */
export default function ContactFormReact({ addressee = '' }) {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  /** @param {import('react').ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  /** @param {import('react').SyntheticEvent<HTMLFormElement>} event */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const recaptcha = window.grecaptcha;

      if (!recaptcha || !SITE_KEY || !SECRET_KEY || !ENDPOINT) {
        throw new Error('El formulario no está configurado correctamente.');
      }

      const token = await recaptcha.execute(SITE_KEY, { action: 'submit' });
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret_key: SECRET_KEY,
          addressee,
          asunto: 'Nuevo mensaje desde el formulario de contacto',
          token,
          ...formData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw errorData;
      }

      setMessage({
        text: '¡Mensaje enviado correctamente! Te responderemos pronto.',
        type: 'success',
      });
      setFormData(initialFormData);
    } catch (error) {
      let errorMessage = 'Ocurrió un error al enviar el mensaje. Por favor, intenta nuevamente.';

      if (error && typeof error === 'object' && 'errors' in error && error.errors) {
        const formErrors = error.errors;
        const firstError = Object.values(formErrors)[0];
        if (typeof firstError === 'string') errorMessage = firstError;
      } else if (error instanceof Error && error.message) {
        errorMessage = error.message;
      }

      setMessage({ text: errorMessage, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative z-10 mx-auto w-full max-w-100 bg-white p-6 text-ink shadow-xl sm:p-8">
      <h3 className="mb-6 bg-contact-blue px-3 py-3 text-center font-display text-xl font-semibold leading-none text-white sm:text-2xl">
        Formulario de contacto
      </h3>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <label className="relative block">
          <span className="sr-only">Nombre y Apellido</span>
          <span aria-hidden="true" className="absolute left-1 top-2 font-display text-sm font-semibold">*</span>
          <input type="text" name="name" placeholder="Nombre y Apellido" value={formData.name} onChange={handleChange} required className="w-full border-b-2 border-contact-blue bg-transparent px-1 py-2 pl-6 font-display text-sm outline-none placeholder:text-ink focus:border-brand-blue" />
        </label>

        <label className="relative block">
          <span className="sr-only">Mail</span>
          <span aria-hidden="true" className="absolute left-1 top-2 font-display text-sm font-semibold">*</span>
          <input type="email" name="email" placeholder="Mail" value={formData.email} onChange={handleChange} required className="w-full border-b-2 border-contact-blue bg-transparent px-1 py-2 pl-6 font-display text-sm outline-none placeholder:text-ink focus:border-brand-blue" />
        </label>

        <label className="block">
          <span className="sr-only">Empresa</span>
          <input type="text" name="company" placeholder="Empresa" value={formData.company} onChange={handleChange} className="w-full border-b-2 border-contact-blue bg-transparent px-1 py-2 font-display text-sm outline-none placeholder:text-ink focus:border-brand-blue" />
        </label>

        <label className="relative block">
          <span className="sr-only">Número</span>
          <span aria-hidden="true" className="absolute left-1 top-2 font-display text-sm font-semibold">*</span>
          <input type="tel" name="phone" placeholder="Número" value={formData.phone} onChange={handleChange} required className="w-full border-b-2 border-contact-blue bg-transparent px-1 py-2 pl-6 font-display text-sm outline-none placeholder:text-ink focus:border-brand-blue" />
        </label>

        <label className="relative block">
          <span className="sr-only">Interés principal</span>
          <span aria-hidden="true" className="absolute left-1 top-2 font-display text-sm font-semibold">*</span>
          <select name="interest" value={formData.interest} onChange={handleChange} required className="w-full border-b-2 border-contact-blue bg-transparent px-1 py-2 pl-6 font-display text-sm outline-none focus:border-brand-blue">
            <option value="">Interés principal</option>
            <option value="servicios">Servicios</option>
            <option value="soluciones">Soluciones</option>
            <option value="otro">Otro</option>
          </select>
        </label>

        <label className="block">
          <span className="sr-only">Mensaje</span>
          <textarea name="message" placeholder="Mensaje" value={formData.message} onChange={handleChange} required rows={3} className="w-full resize-none border-b-2 border-contact-blue bg-transparent px-1 py-2 font-display text-sm outline-none placeholder:text-ink focus:border-brand-blue" />
        </label>

        <label className="flex items-start gap-2 pt-1 font-display text-xs leading-tight">
          <input type="checkbox" required className="mt-0.5 accent-contact-blue" />
          <span>Acepto el uso de mis datos para ser contactado por Pronave.</span>
        </label>

        {message.text && (
          <p role="status" className={message.type === 'success' ? 'text-center font-display text-sm text-green-700' : 'text-center font-display text-sm text-red-700'}>
            {message.text}
          </p>
        )}

        <button type="submit" disabled={isSubmitting} className="mt-2 w-full cursor-pointer bg-contact-blue px-4 py-3 font-display text-lg font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}
