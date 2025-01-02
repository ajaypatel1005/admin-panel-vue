const email = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /\S+@\S+\.\S+/.test(v) || 'Email must be valid',
];

const required = [
  (v: string) => !!v || 'This field is required',

];

const number = [
  (v: string) => !!v || 'This field is required',
  (v: string) => /^\d+$/.test(v) || 'Input must be a number',
];

export { email, required, number }