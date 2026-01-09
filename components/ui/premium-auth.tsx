"use client";

import * as React from 'react';
import { useState, useCallback } from 'react';
import { cn } from "@/lib/utils";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Shield,
  AlertTriangle,
  KeyRound,
  Phone,
  Loader2,
} from 'lucide-react';

type AuthMode = 'login' | 'signup' | 'reset';
type RegistrationStep = 'details' | 'verification' | 'complete';

interface AuthFormProps {
  onSuccess?: (userData: { email: string; name?: string }) => void;
  onClose?: () => void;
  initialMode?: AuthMode;
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  agreeToTerms: boolean;
  rememberMe: boolean;
  verificationCode: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  agreeToTerms?: string;
  general?: string;
  verificationCode?: string;
}

interface PasswordStrength {
  score: number;
  feedback: string[];
  requirements: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
}

const calculatePasswordStrength = (password: string): PasswordStrength => {
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  };

  const score = Object.values(requirements).filter(Boolean).length;
  const feedback: string[] = [];

  if (!requirements.length) feedback.push('Al menos 8 caracteres');
  if (!requirements.uppercase) feedback.push('Una letra mayúscula');
  if (!requirements.lowercase) feedback.push('Una letra minúscula');
  if (!requirements.number) feedback.push('Un número');
  if (!requirements.special) feedback.push('Un carácter especial');

  return { score, feedback, requirements };
};

const PasswordStrengthIndicator: React.FC<{ password: string }> = ({ password }) => {
  const strength = calculatePasswordStrength(password);

  const getStrengthColor = (score: number) => {
    if (score <= 1) return 'text-destructive';
    if (score <= 2) return 'text-orange-500';
    if (score <= 3) return 'text-yellow-500';
    if (score <= 4) return 'text-blue-500';
    return 'text-primary';
  };

  const getStrengthText = (score: number) => {
    if (score <= 1) return 'Muy débil';
    if (score <= 2) return 'Débil';
    if (score <= 3) return 'Regular';
    if (score <= 4) return 'Buena';
    return 'Fuerte';
  };

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2 animate-in fade-in-50 slide-in-from-bottom-1">
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
          <div
            className={`h-full ${getStrengthColor(strength.score)} bg-current rounded-full`}
            style={{ width: `${(strength.score / 5) * 100}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground min-w-[60px]">
          {getStrengthText(strength.score)}
        </span>
      </div>
      {strength.feedback.length > 0 && (
        <div className="grid grid-cols-2 gap-1">
          {strength.feedback.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-1 text-xs text-amber-500 dark:text-amber-400"
            >
              <AlertTriangle className="h-3 w-3" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export function AuthForm({ onSuccess, onClose, initialMode = 'login', className }: AuthFormProps) {
  const [authMode, setAuthMode] = useState<AuthMode>(initialMode);
  const [registrationStep, setRegistrationStep] = useState<RegistrationStep>('details');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeToTerms: false,
    rememberMe: false,
    verificationCode: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [fieldTouched, setFieldTouched] = useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    if (savedEmail && authMode === 'login') {
      setFormData(prev => ({ ...prev, email: savedEmail, rememberMe }));
    }
  }, [authMode]);

  const validateField = useCallback((field: keyof FormData, value: string | boolean) => {
    let error = '';
    switch (field) {
      case 'name':
        if (typeof value === 'string' && authMode === 'signup' && !value.trim()) {
          error = 'El nombre es obligatorio';
        }
        break;
      case 'email':
        if (!value || (typeof value === 'string' && !value.trim())) {
          error = 'El correo es obligatorio';
        } else if (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Por favor ingresa un correo válido';
        }
        break;
      case 'password':
        if (!value) {
          error = 'La contraseña es obligatoria';
        } else if (typeof value === 'string') {
          if (value.length < 8) {
            error = 'La contraseña debe tener al menos 8 caracteres';
          } else if (authMode === 'signup') {
            const strength = calculatePasswordStrength(value);
            if (strength.score < 3) {
              error = 'La contraseña es muy débil';
            }
          }
        }
        break;
      case 'confirmPassword':
        if (authMode === 'signup' && value !== formData.password) {
          error = 'Las contraseñas no coinciden';
        }
        break;
      case 'phone':
        if (typeof value === 'string' && value && !/^\+?[\d\s\-()]+$/.test(value)) {
          error = 'Por favor ingresa un número de teléfono válido';
        }
        break;
      case 'verificationCode':
        if (typeof value === 'string' && authMode === 'signup' && registrationStep === 'verification' && !/^\d{6}$/.test(value)) {
          error = 'El código de verificación debe ser de 6 dígitos';
        }
        break;
      case 'agreeToTerms':
        if (authMode === 'signup' && !value) {
          error = 'Debes aceptar los términos y condiciones';
        }
        break;
    }
    return error;
  }, [formData.password, authMode, registrationStep]);

  const handleInputChange = useCallback((field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (fieldTouched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error || undefined }));
    }
  }, [fieldTouched, validateField]);

  const handleFieldBlur = useCallback((field: keyof FormData) => {
    setFieldTouched(prev => ({ ...prev, [field]: true }));
    const value = formData[field];
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error || undefined }));
  }, [formData, validateField]);

  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};
    const fieldsToValidate: (keyof FormData)[] = ['email', 'password'];
    if (authMode === 'signup') {
      fieldsToValidate.push('name', 'confirmPassword', 'agreeToTerms');
    }
    if (registrationStep === 'verification') {
      fieldsToValidate.push('verificationCode');
    }
    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field as keyof FormErrors] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [authMode, registrationStep, formData, validateField]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // For now, always succeed regardless of input (per user request)
    setIsLoading(true);
    setErrors({});
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      // persist login state
      localStorage.setItem('isLogged', 'true');
      localStorage.setItem('userEmail', formData.email || 'user@example.com');
      setSuccessMessage('Inicio de sesión exitoso');
      onSuccess?.({ email: formData.email });
      // close after a short delay
      setTimeout(() => {
        setIsLoading(false);
        onClose?.();
      }, 400);
    } catch (error) {
      setErrors({ general: 'Error de autenticación. Por favor intenta de nuevo.' });
      setIsLoading(false);
    }
  };

  const renderAuthContent = () => {
    if (authMode === 'reset') {
      return (
        <div className="space-y-4 animate-in fade-in-50 slide-in-from-right-5">
          <div className="text-center mb-6">
            <KeyRound className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Recuperar Contraseña</h3>
            <p className="text-muted-foreground text-sm">Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>
          </div>

          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => handleFieldBlur('email')}
                className={cn(
                  "w-full pl-10 pr-4 py-3 bg-muted/50 border rounded-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                  errors.email ? "border-destructive" : "border-input"
                )}
                aria-label="Correo Electrónico"
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-destructive text-xs mt-1 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !formData.email}
            className={cn(
              "w-full relative bg-primary text-primary-foreground font-medium py-3 px-6 rounded-xl transition-all",
              "hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/20",
              "disabled:opacity-50"
            )}
          >
            <span className="flex items-center justify-center gap-2">
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><KeyRound className="h-5 w-5" />Enviar Enlace de Recuperación</>}
            </span>
          </button>

          <div className="text-center">
            <button type="button" onClick={() => setAuthMode('login')} className="text-primary hover:text-primary/80 text-sm transition-colors">Volver al Inicio de Sesión</button>
          </div>
        </div>
      );
    }

    if (authMode === 'signup' && registrationStep === 'verification') {
      return (
        <div className="space-y-4 animate-in fade-in-50 slide-in-from-right-5">
          <div className="text-center mb-6">
            <Mail className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Verifica tu Correo</h3>
            <p className="text-muted-foreground text-sm">Hemos enviado un código de 6 dígitos a <span className="font-medium">{formData.email}</span></p>
          </div>

          <div>
            <div className="relative">
              <input
                type="text"
                placeholder="Ingresa el código de 6 dígitos"
                value={formData.verificationCode}
                onChange={(e) => { const value = e.target.value.replace(/\D/g, '').slice(0,6); handleInputChange('verificationCode', value); }}
                onBlur={() => handleFieldBlur('verificationCode')}
                className={cn(
                  "w-full text-center py-3 px-4 bg-muted/50 border rounded-xl text-2xl font-mono tracking-widest placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                  errors.verificationCode ? "border-destructive" : "border-input"
                )}
                maxLength={6}
                aria-label="Código de Verificación"
                aria-describedby={errors.verificationCode ? 'code-error' : undefined}
              />
              {errors.verificationCode && (
                <p id="code-error" className="text-destructive text-xs mt-1 flex items-center gap-1 justify-center"><AlertTriangle className="h-3 w-3" />{errors.verificationCode}</p>
              )}
            </div>
          </div>

          <button type="submit" disabled={isLoading || formData.verificationCode.length !== 6} className={cn("w-full relative bg-primary text-primary-foreground font-medium py-3 px-6 rounded-xl transition-all","hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/20","disabled:opacity-50")}>{isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verificar Correo"}</button>

          <div className="text-center"><button type="button" onClick={() => setRegistrationStep('details')} className="text-primary hover:text-primary/80 text-sm transition-colors">Volver a Detalles</button></div>
        </div>
      );
    }

    if (authMode === 'signup' && registrationStep === 'complete') {
      return (
        <div className="text-center space-y-6 animate-in fade-in-50 slide-in-from-right-5">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <div><h3 className="text-2xl font-bold mb-2">¡Bienvenido a Bordo!</h3><p className="text-muted-foreground">Tu cuenta ha sido creada exitosamente.</p></div>
          <button onClick={onClose} className={cn("w-full bg-primary text-primary-foreground font-medium py-3 px-6 rounded-xl","hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/20")}>Comenzar</button>
        </div>
      );
    }

    return (
      <div className="space-y-4 animate-in fade-in-50 slide-in-from-right-5">
        {authMode === 'signup' && (
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input type="text" placeholder="Nombre Completo" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} onBlur={() => handleFieldBlur('name')} className={cn("w-full pl-10 pr-4 py-3 bg-muted/50 border rounded-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all", errors.name ? "border-destructive" : "border-input")} aria-label="Nombre Completo" aria-describedby={errors.name ? 'name-error' : undefined} />
              {errors.name && (<p id="name-error" className="text-destructive text-xs mt-1 flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{errors.name}</p>)}
            </div>
          </div>
        )}

        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input type="email" placeholder="Correo Electrónico" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} onBlur={() => handleFieldBlur('email')} className={cn("w-full pl-10 pr-4 py-3 bg-muted/50 border rounded-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all", errors.email ? "border-destructive" : "border-input")} aria-label="Correo Electrónico" aria-describedby={errors.email ? 'email-error' : undefined} />
            {errors.email && (<p id="email-error" className="text-destructive text-xs mt-1 flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{errors.email}</p>)}
          </div>
        </div>

        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input type={showPassword ? "text" : "password"} placeholder="Contraseña" value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} onBlur={() => handleFieldBlur('password')} className={cn("w-full pl-10 pr-12 py-3 bg-muted/50 border rounded-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all", errors.password ? "border-destructive" : "border-input")} aria-label="Contraseña" aria-describedby={errors.password ? 'password-error' : undefined} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
            {errors.password && (<p id="password-error" className="text-destructive text-xs mt-1 flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{errors.password}</p>)}
          </div>
          {authMode === 'signup' && (<PasswordStrengthIndicator password={formData.password} />)}
        </div>

        {authMode === 'signup' && (
          <div>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirmar Contraseña" value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)} onBlur={() => handleFieldBlur('confirmPassword')} className={cn("w-full pl-10 pr-12 py-3 bg-muted/50 border rounded-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all", errors.confirmPassword ? "border-destructive" : "border-input")} aria-label="Confirmar Contraseña" aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined} />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label={showConfirmPassword ? "Ocultar confirmar contraseña" : "Mostrar confirmar contraseña"}>{showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
              {errors.confirmPassword && (<p id="confirm-password-error" className="text-destructive text-xs mt-1 flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{errors.confirmPassword}</p>)}
            </div>
          </div>
        )}

        {authMode === 'signup' && (
          <div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input type="tel" placeholder="Número de Teléfono (Opcional)" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} onBlur={() => handleFieldBlur('phone')} className={cn("w-full pl-10 pr-4 py-3 bg-muted/50 border rounded-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all", errors.phone ? "border-destructive" : "border-input")} aria-label="Número de Teléfono" aria-describedby={errors.phone ? 'phone-error' : undefined} />
              {errors.phone && (<p id="phone-error" className="text-destructive text-xs mt-1 flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{errors.phone}</p>)}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          {authMode === 'login' ? (
            <>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.rememberMe} onChange={(e) => handleInputChange('rememberMe', e.target.checked)} aria-label="Recordarme" className="w-4 h-4 rounded border-input bg-muted text-primary focus:ring-primary focus:ring-offset-0" />
                <span className="text-sm text-muted-foreground">Recordarme</span>
              </label>
              <button type="button" onClick={() => setAuthMode('reset')} className="text-sm text-primary hover:text-primary/80 transition-colors">¿Olvidaste tu contraseña?</button>
            </>
          ) : (
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={formData.agreeToTerms} onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)} className="w-4 h-4 mt-0.5 rounded border-input bg-muted text-primary focus:ring-primary focus:ring-offset-0" aria-describedby={errors.agreeToTerms ? 'terms-error' : undefined} />
              <span className="text-sm text-muted-foreground">Acepto los <a href="#" className="text-primary hover:underline transition-colors">Términos de Servicio</a> y la <a href="#" className="text-primary hover:underline transition-colors">Política de Privacidad</a></span>
            </label>
          )}
        </div>

        {errors.agreeToTerms && (<p id="terms-error" className="text-destructive text-xs flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{errors.agreeToTerms}</p>)}

        <button type="submit" disabled={isLoading} className={cn("w-full relative bg-primary text-primary-foreground font-medium py-3 px-6 rounded-xl transition-all","hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/20","disabled:opacity-50")}>
          <span className="flex items-center justify-center gap-2">{isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (authMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta')}</span>
        </button>
      </div>
    );
  };

  return (
    <div className={cn("p-6", className)} role="dialog" aria-modal="true" aria-labelledby="auth-title">
      {successMessage && (<div className="mb-4 p-3 bg-green-500/20 border border-green-400/30 rounded-xl flex items-center gap-2 animate-in fade-in-0 slide-in-from-top-5"><svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-green-700 dark:text-green-300 text-sm">{successMessage}</span></div>)}

      {errors.general && (<div className="mb-4 p-3 bg-destructive/20 border border-destructive/30 rounded-xl flex items-center gap-2 animate-in fade-in-0 slide-in-from-top-5"><AlertTriangle className="h-4 w-4 text-destructive" /><span className="text-destructive text-sm">{errors.general}</span></div>)}

      <div className="text-center mb-8"><h2 id="auth-title" className="text-2xl font-bold mb-2">{authMode === 'login' ? 'Bienvenido de Nuevo' : authMode === 'reset' ? 'Restablecer Contraseña' : 'Crear Cuenta'}</h2><p className="text-muted-foreground">{authMode === 'login' ? 'Inicia sesión en tu cuenta' : authMode === 'reset' ? 'Recupera el acceso a tu cuenta' : 'Crea una nueva cuenta'}</p></div>

      {authMode !== 'reset' && (<div className="flex bg-muted rounded-xl p-1 mb-6"><button onClick={() => setAuthMode('login')} className={cn("flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all", authMode === 'login' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")} type="button">Iniciar Sesión</button><button onClick={() => { setAuthMode('signup'); setRegistrationStep('details'); }} className={cn("flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all", authMode === 'signup' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")} type="button">Registrarse</button></div>)}

      <form onSubmit={handleSubmit}>{renderAuthContent()}</form>

      {authMode !== 'reset' && registrationStep === 'details' && (<div className="text-center mt-6"><p className="text-muted-foreground text-sm">{authMode === 'login' ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}<button type="button" onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="text-primary hover:text-primary/80 font-medium transition-colors">{authMode === 'login' ? 'Regístrate' : 'Inicia sesión'}</button></p></div>)}
    </div>
  );
}
