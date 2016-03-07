export const validateRequiredFields = (optionalFields = []) => 
  (values) => 
    _.mapValues(values, (v, k) => 
      optionalFields.indexOf(k) === -1 && !v && 'Required')
