import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiAlertCircle
} from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    },
  })

  const onSubmit = async (data) => {
    setErrorMessage('')
    setIsLoading(true)

    try {
      const success = await login(data)
      if (success) {
        navigate('/')
      } else {
        setErrorMessage('Email ou mot de passe incorrect')
        setError('root', {
          type: 'manual',
          message: 'Email ou mot de passe incorrect'
        })
      }
    } catch {
      setErrorMessage('Une erreur est survenue. Veuillez reessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoCredentials = (type) => {
    if (type === 'user') {
      register('email').onChange({ target: { value: 'demo@shopease.fr' } })
      register('password').onChange({ target: { value: 'Demo123!' } })
    } else {
      register('email').onChange({ target: { value: 'admin@shopease.fr' } })
      register('password').onChange({ target: { value: 'Admin123!' } })
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
            Bienvenue !
          </h1>
          <p className="mt-2 text-gray-600">
            Connectez-vous pour acceder a votre compte
          </p>
        </div>

        {/* Error Alert */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3"
            >
              <FiAlertCircle className="text-red-500" />
              <p className="text-sm font-medium">{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-sm p-8 space-y-6"
        >
          <Input
            label="Email"
            type="email"
            icon={FiMail}
            placeholder="votre@email.com"
            error={errors.email?.message}
            onFocus={() => clearErrors('root')}
            {...register('email', {
              required: "L'email est requis",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email invalide',
              },
            })}
          />

          <div className="relative">
            <Input
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              icon={FiLock}
              placeholder="Votre mot de passe"
              error={errors.password?.message}
              onFocus={() => clearErrors('root')}
              {...register('password', {
                required: 'Le mot de passe est requis',
                minLength: {
                  value: 6,
                  message: 'Minimum 6 caracteres',
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

          {/* Demo Credentials */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
              <FiShield className="w-3 h-3" />
              Comptes de demonstration
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemoCredentials('user')}
                className="text-xs p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
              >
                <span className="font-medium text-gray-700">Utilisateur</span>
                <p className="text-gray-500 text-xs">demo@shopease.fr</p>
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('admin')}
                className="text-xs p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
              >
                <span className="font-medium text-gray-700">Administrateur</span>
                <p className="text-gray-500 text-xs">admin@shopease.fr</p>
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                {...register('rememberMe')}
              />
              <span className="text-sm text-gray-600">
                Se souvenir de moi
              </span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <Button
            type="submit"
            fullWidth
            size="lg"
            isLoading={isLoading}
          >
            Se connecter
          </Button>

          {/* Social Login */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Ou continuer avec</span>
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

        {/* Register Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <p className="text-sm text-gray-600">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
              Creer un compte
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LoginPage
