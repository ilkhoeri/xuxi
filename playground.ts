import { x } from './src';

x;

const buttonType = x.cvx({
  variants: {
    type: {
      button: 'type=button',
      submit: 'type=submit',
      reset: 'type=reset'
    }
  },
  defaultVariants: {
    type: 'button'
  }
});

type ButtonTypeVariant = x.cvxVariants<typeof buttonType>;

const fontSizeVariant = x.cvx({
  assign: { textDecoration: 'underline', fontSize: 14, lineHeight: 90 },
  variants: {
    size: {
      small: { fontSize: 14, lineHeight: 20, fontWeight: 500 },
      smallBold: { fontSize: 14, lineHeight: 20, fontWeight: 700 },
      default: { fontSize: 16, lineHeight: 24, fontWeight: 500 }
    },
    color: {
      cyan: { background: 'var(--cyan-500)', lineHeight: 20, fontWeight: 500 },
      magenta: { background: 'magenta', lineHeight: 20, fontWeight: 700 },
      yellow: { background: '#ffff00', lineHeight: 24, fontWeight: 500 }
    }
  }
});

console.log(fontSizeVariant({ size: 'default', color: 'magenta' }));

const dinamycVariant = x.cvx({
  assign: ['100'],
  variants: {
    size: {
      var: ['200'],
      small: 'small',
      practice: 'practice',
      default: [1, 7, 9]
    },
    fontSize: {
      all: ['300', '400', '500', '600', '700'],
      thin: '300',
      normal: '400',
      medium: '600',
      semibold: '700'
    }
  },
  defaultVariants: {
    size: 'small',
    fontSize: 'medium'
  }
});

console.log(dinamycVariant({ size: 'var', fontSize: 'all' }));
// ["100", "300", "400", "500", "600", "7000"]
// karena `size: 'default'` typenya tidak sama dengan assign maka tidak di masukkan kedalam array
