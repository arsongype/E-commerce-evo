import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiPhone, FiShield } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: 'USER',
      acceptTerms: false,
    },
  })

  const password = watch('password')

  const onSubmit = async (data) => {
    setIsLoading(true)
    const userData = { ...data }
    delete userData.confirmPassword
    delete userData.acceptTerms
    const success = await registerUser(userData)
    setIsLoading(false)
    if (success) {
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <Link to="/">
            <h2 className="text-3xl font-bold text-primary-600">
              Shop<span className="text-gray-900">Ease</span>
            </h2>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Creer un compte
          </h1>
          <p className="mt-2 text-gray-600">
            Rejoignez-nous et profitez d'avantages exclusifs
          </p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-sm p-8 space-y-5"
        >
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Prenom"
              icon={FiUser}
              placeholder="Jean"
              error={errors.firstName?.message}
              {...register('firstName', {
                required: 'Le prenom est requis',
                minLength: {
                  value: 2,
                  message: 'Minimum 2 caracteres',
                },
              })}
            />
            <Input
              label="Nom"
              icon={FiUser}
              placeholder="Dupont"
              error={errors.lastName?.message}
              {...register('lastName', {
                required: 'Le nom est requis',
                minLength: {
                  value: 2,
                  message: 'Minimum 2 caracteres',
                },
              })}
            />
          </div>

          <Input
            label="Email"
            type="email"
            icon={FiMail}
            placeholder="votre@email.com"
            error={errors.email?.message}
            {...register('email', {
              required: 'L\'email est requis',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email invalide',
              },
            })}
          />

          <Input
            label="Telephone"
            type="tel"
            icon={FiPhone}
            placeholder="+33 6 12 34 56 78"
            error={errors.phone?.message}
            {...register('phone', {
              pattern: {
                value: /^(\+33|0)[1-9](\d{2}){4}$/,
                message: 'Numero de telephone invalide',
              },
            })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Type de compte
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition-all ${watch('role') === 'USER' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="radio" value="USER" {...register('role', { required: 'Le type de compte est requis' })} className="sr-only" />
                <FiUser className={`w-6 h-6 ${watch('role') === 'USER' ? 'text-primary-600' : 'text-gray-400'}`} />
                <span className={`text-sm font-medium ${watch('role') === 'USER' ? 'text-primary-700' : 'text-gray-700'}`}>Utilisateur</span>
              </label>
              <label className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition-all ${watch('role') === 'ADMIN' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="radio" value="ADMIN" {...register('role', { required: 'Le type de compte est requis' })} className="sr-only" />
                <FiShield className={`w-6 h-6 ${watch('role') === 'ADMIN' ? 'text-primary-600' : 'text-gray-400'}`} />
                <span className={`text-sm font-medium ${watch('role') === 'ADMIN' ? 'text-primary-700' : 'text-gray-700'}`}>Administrateur</span>
              </label>
            </div>
            {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
          </div>

          <div className="relative">
            <Input
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              icon={FiLock}
              placeholder="Minimum 8 caracteres"
              error={errors.password?.message}
              {...register('password', {
                required: 'Le mot de passe est requis',
                minLength: {
                  value: 8,
                  message: 'Minimum 8 caracteres',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: 'Doit contenir majuscule, minuscule, chiffre et caractere special',
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
            </button>
          </div>

          <div className="relative">
            <Input
              label="Confirmer le mot de passe"
              type={showConfirmPassword ? 'text' : 'password'}
              icon={FiLock}
              placeholder="Confirmez votre mot de passe"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Veuillez confirmer le mot de passe',
                validate: (value) => value === password || 'Les mots de passe ne correspondent pas',
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
            </button>
          </div>

          {/* Password Strength Indicator */}
          <div className="space-y-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-1.5 flex-1 rounded-full ${
                    password?.length >= level * 2
                      ? level <= 2
                        ? 'bg-red-500'
                        : level <= 3
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500">
              Le mot de passe doit contenir au moins 8 caracteres avec majuscule, minuscule, chiffre et caractere special
            </p>
          </div>

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              {...register('acceptTerms', {
                required: 'Vous devez accepter les conditions',
              })}
            />
            <span className="text-sm text-gray-600">
              J'accepte les{' '}
              <Link to="/cgv" className="text-primary-600 hover:text-primary-700">
                conditions d'utilisation
              </Link>{' '}
              et les{' '}
              <Link to="/legal" className="text-primary-600 hover:text-primary-700">
                mentions legales
              </Link>
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
          )}

          <Button
            type="submit"
            fullWidth
            size="lg"
            isLoading={isLoading}
          >
            Creer mon compte
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Ou s'inscrire avec</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" type="button">
              Google
            </Button>
            <Button variant="outline" type="button">
              Facebook
            </Button>
          </div>
        </motion.form>

        <p className="text-center text-sm text-gray-600">
          Deja un compte ?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
            Se connecter
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default RegisterPage
