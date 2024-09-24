export const lowercaseFirstLetter = (str) => {
  if (!str) return str; // Check if string is not empty
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export const uppercaseFirstLetter = (str) => {
  if (!str) return str; // Check if string is not empty
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const wrapPromise = (promise) => {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    (res) => {
      status = 'success';
      result = res;
    },
    (err) => {
      status = 'error';
      result = err;
    }
  );

  return {
    read: () => {
      if (status === 'pending') {
        throw suspender; // This makes Suspense show the fallback UI
      } else if (status === 'error') {
        throw result; // This will propagate the error
      } else if (status === 'success') {
        return result; // Return the resolved data
      }
    },
  };
}
