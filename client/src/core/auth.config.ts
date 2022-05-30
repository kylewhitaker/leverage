import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_jJXm72is2',
    userPoolWebClientId: '3oeoa5ut1g35h3ad52122tlu2g',
  },
});
