import { ChangeEvent, ComponentPropsWithoutRef, ElementType, ReactNode, useState } from 'react'

import s from './input.module.scss'

import { CleanInputIcon } from '@/components/assets/icons/CleanInput.tsx'
import { SearchIcon } from '@/components/assets/icons/Search.tsx'
import { WatchPassIcon } from '@/components/assets/icons/WatchPass.tsx'
import { CrossedOutWatchPassIcon } from '@/components/assets/icons/WatchPassCrossedOut.tsx'
import { clsx } from 'clsx';

export type CardsInputProps<T extends ElementType> = {
  as?: T
  label?: string
  required?: boolean
  errorMessage?: string
  value: string
  onInputValueChange?: (value: string) => void
  variant?: 'standard' | 'password' | 'search'
  fullWidth?: boolean
} & ComponentPropsWithoutRef<T>

export const CardsInput = (props: CardsInputProps<any>) => {
  const {
    required,
    value,
    onInputValueChange,
    variant = 'standard',
    fullWidth,
    className,
    as: Component = 'input',
    ...rest
  } = props
  const [hidePass, setHidePass] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')

  const toggleWatchPassword = () => {
    setHidePass(!hidePass)
  }
  const clearInputHandler = () => {
    setInputValue('')
  }

  const onInputValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    if (inputValue.trim() === '') {
      setError('The field is required')
    } else if (inputValue !== '') {
      setError('')
    }
    //just a check that we have the function
    // in case we'll have a changeHandler fnc for the input
    if (onInputValueChange) {
      onInputValueChange(e.currentTarget.value.toString())
    }
  }

  const classNames = {
    inputContainer: clsx(s.inputContainer),
    watchPassButton: clsx(s.watchPassButton, rest.disabled ? s.disabledIcon : ''),
  }

  return (
    <div className={classNames.inputContainer}>
      {/*show and hide password logic
       //TODO should apply Typography for error and label*/}
      {variant === 'password' &&
        (hidePass ? (
          //TODO should wrap these icons into button
          <span
            className={`${s.watchPassButton} ${rest.disabled ? s.disabledIcon : ''}`}
            onClick={toggleWatchPassword}
          >
            <CrossedOutWatchPassIcon />
          </span>
        ) : (
          <span
            className={`${s.watchPassButton} ${rest.disabled ? s.disabledIcon : ''}`}
            onClick={toggleWatchPassword}
          >
            <WatchPassIcon />
          </span>
        ))}

      {variant === 'search' && (
        <div className={s.inputIconsContainer}>
          <span className={`${s.inputSearchIcon} ${rest.disabled ? s.disabledIcon : ''}`}>
            <SearchIcon />
          </span>
          {inputValue && (
            <span
              onClick={clearInputHandler}
              className={`${s.inputCleanFieldIcon} ${rest.disabled ? s.disabledIcon : ''}`}
            >
              <CleanInputIcon />
            </span>
          )}
        </div>
      )}
      <label className={`${s.label} ${rest.disabled ? s.disabledLabel : ''}`}>
        {rest.label}
        <Component
          onBlur={onInputValueChangeHandler}
          required={required}
          value={inputValue}
          onChange={onInputValueChangeHandler}
          type={variant === 'password' && hidePass ? 'password' : 'text'}
          className={`${s[variant]} ${rest.errorMessage ? s.errorInput : ''} ${
            fullWidth ? s.fullWidth : ''
          } ${className}`}
          {...rest}
        />
        {required && error && <p className={s.error}>{error}</p>}
        {rest.errorMessage && <p className={s.error}>{rest.errorMessage}</p>}
      </label>
    </div>
  )
}
