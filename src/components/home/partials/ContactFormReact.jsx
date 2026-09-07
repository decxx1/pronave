import { useState } from 'react';
import { CONTACT_EMAIL, ENDPOINT, SECRET_KEY, SITE_KEY } from 'astro:env/client';

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

/** @typedef {typeof initialFormData} FormData */
/** @typedef {Partial<Record<keyof FormData, string>>} FieldErrors */
/** @typedef {{ errors?: FieldErrors; message?: string }} ApiError */

export default function ContactFormReact() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  /** @type {[FieldErrors, import('react').Dispatch<import('react').SetStateAction<FieldErrors>>]} */
  const [fieldErrors, setFieldErrors] = useState(/** @type {FieldErrors} */ ({}));

  /** @param {import('react').ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    if (name in initialFormData) {
      setFieldErrors((previous) => {
        const fieldName = /** @type {keyof FormData} */ (name);
        if (!previous[fieldName]) return previous;
        const next = { ...previous };
        delete next[fieldName];
        return next;
      });
    }
  };

  /** @param {import('react').SyntheticEvent<HTMLFormElement>} event */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });
    setFieldErrors({});

    try {
      const recaptcha = window.grecaptcha;

      if (!recaptcha || !SITE_KEY || !SECRET_KEY || !ENDPOINT) {
        throw new Error('El formulario no está configurado correctamente.');
      }

      const token = await recaptcha.execute(SITE_KEY, { action: 'contacto' });
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          secret_key: SECRET_KEY,
          addressee: CONTACT_EMAIL ?? '',
          asunto: `Contacto desde la web - de: ${formData.name}`,
          token,
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
      setFieldErrors({});
    } catch (error) {
      /** @type {ApiError | Error | unknown} */
      const apiError = error;

      if (apiError && typeof apiError === 'object' && 'errors' in apiError && apiError.errors) {
        setFieldErrors(apiError.errors);
      } else if (apiError && typeof apiError === 'object' && 'message' in apiError && typeof apiError.message === 'string') {
        setMessage({ text: apiError.message, type: 'error' });
      } else {
        setMessage({
          text: 'Ocurrió un error al enviar el mensaje. Por favor, intenta nuevamente.',
          type: 'error',
        });
      }
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
          {fieldErrors.name && <p className="mt-1 font-display text-xs text-red-700">{fieldErrors.name}</p>}
        </label>

        <label className="block">
          <span className="sr-only">Teléfono</span>
          <input type="tel" name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} className="w-full border-b-2 border-contact-blue bg-transparent px-1 py-2 font-display text-sm outline-none placeholder:text-ink focus:border-brand-blue" />
          {fieldErrors.phone && <p className="mt-1 font-display text-xs text-red-700">{fieldErrors.phone}</p>}
        </label>

        <label className="relative block">
          <span className="sr-only">E-mail</span>
          <span aria-hidden="true" className="absolute left-1 top-2 font-display text-sm font-semibold">*</span>
          <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} required className="w-full border-b-2 border-contact-blue bg-transparent px-1 py-2 pl-6 font-display text-sm outline-none placeholder:text-ink focus:border-brand-blue" />
          {fieldErrors.email && <p className="mt-1 font-display text-xs text-red-700">{fieldErrors.email}</p>}
        </label>

        <label className="relative block">
          <span className="sr-only">Mensaje</span>
          <span aria-hidden="true" className="absolute left-1 top-2 font-display text-sm font-semibold">*</span>
          <textarea name="message" placeholder="Mensaje" value={formData.message} onChange={handleChange} required rows={3} className="w-full resize-none border-b-2 border-contact-blue bg-transparent px-1 py-2 pl-6 font-display text-sm outline-none placeholder:text-ink focus:border-brand-blue" />
          {fieldErrors.message && <p className="mt-1 font-display text-xs text-red-700">{fieldErrors.message}</p>}
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
