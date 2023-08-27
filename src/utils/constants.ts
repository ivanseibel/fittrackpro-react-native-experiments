import { IToastProps } from 'native-base'

export const TOAST_DEFAULT: IToastProps = {
  placement: 'top',
  _description: {
    fontFamily: 'body',
    fontSize: 'md',
  },
  _title: {
    fontFamily: 'heading',
    fontSize: 'lg',
  },
}

export const GENERAL_ERROR_MESSAGE =
  'An error occurred while processing your request. \nPlease try again later.'
