import { useRouter } from 'next/router';

import { Length } from '../../../../unitTransfer/length';

export default function Apple() {
  const router = useRouter();
  let length: Length | undefined;
  let error: Error | undefined;
  try {
    length = new Length(router.query);
  } catch (e: unknown) {
    error = e as Error;
  }
  const result = length?.showResult();

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!result) {
    return <div>someting went wrong</div>;
  }
  return (
    <div className="flex flex-col items-center">
      <div className="text-xl inline-block py-10">
        converting units from {result.fromUnit} to {result.toUnit}
      </div>

      <div className="text-sm inline-block">
        {result.fromValue}
        {result.fromUnit} = {result.toValue}
        {result.toUnit}
      </div>
    </div>
  );
}
