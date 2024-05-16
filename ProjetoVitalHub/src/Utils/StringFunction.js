import { mask, unMask } from 'remask'

export const CpfMask = (data) => mask(unMask(data), ['999.999.999-99'])